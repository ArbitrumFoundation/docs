import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

import GithubSlugger from 'github-slugger';

export const contentDir = path.join('content', 'docs');
export const publicDir = 'public';

export function toPosix(value) {
  return value.split(path.sep).join('/');
}

// mirrors the fumadocs slug rules: extension dropped, route groups and trailing index removed
export function fileToUrl(relativePath) {
  const segments = toPosix(relativePath)
    .replace(/\.mdx?$/, '')
    .split('/')
    .filter((segment) => !/^\(.+\)$/.test(segment));
  if (segments.at(-1) === 'index') segments.pop();
  return '/' + segments.join('/');
}

function listContentFiles(root) {
  if (!existsSync(root)) return [];
  return readdirSync(root, { recursive: true })
    .map(toPosix)
    .filter((file) => /\.mdx?$/.test(file) && !path.posix.basename(file).startsWith('_'));
}

function stripFrontmatter(source) {
  return source.replace(/^---\r?\n[\s\S]*?\r?\n---[ \t]*(?:\r?\n|$)/, (match) =>
    match.replace(/[^\n]/g, ' ')
  );
}

// blanks code fences, inline code and comments so link patterns never match inside them
export function maskNonProse(source) {
  const lines = stripFrontmatter(source).split('\n');
  let fence = null;
  const masked = lines.map((line) => {
    const marker = /^[ \t]*(`{3,}|~{3,})/.exec(line)?.[1];
    if (fence) {
      if (marker && marker[0] === fence && line.trim() === marker) fence = null;
      return ' '.repeat(line.length);
    }
    if (marker) {
      fence = marker[0];
      return ' '.repeat(line.length);
    }
    return line;
  });
  return masked
    .join('\n')
    .replace(/`[^`\n]*`/g, (match) => ' '.repeat(match.length))
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, (match) => match.replace(/[^\n]/g, ' '))
    .replace(/<!--[\s\S]*?-->/g, (match) => match.replace(/[^\n]/g, ' '));
}

export function expandIncludes(source, repoRoot, fromFile, seen = new Set(), onInclude = () => {}) {
  return source.replace(/<include\b([^>]*)>([\s\S]*?)<\/include>/g, (_, attrs, target) => {
    const relative = target.trim();
    const file = /\bcwd\b/.test(attrs)
      ? path.join(repoRoot, relative)
      : path.resolve(path.dirname(fromFile), relative);
    if (!existsSync(file))
      throw new Error(`${toPosix(path.relative(repoRoot, fromFile))}: missing include ${relative}`);
    if (seen.has(file)) throw new Error(`circular include ${relative}`);
    onInclude(file);
    const nested = new Set(seen).add(file);
    return expandIncludes(readFileSync(file, 'utf8'), repoRoot, file, nested, onInclude);
  });
}

function headingText(raw) {
  return raw
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[*_`~]/g, '')
    .trim();
}

export function collectAnchors(source) {
  const anchors = new Set();
  const slugger = new GithubSlugger();
  for (const line of maskNonProse(source).split('\n')) {
    const heading = /^#{1,6}[ \t]+(.+?)[ \t]*$/.exec(line);
    if (!heading) continue;
    const custom = /\s*\[#([^\]]+)\]$/.exec(heading[1]);
    anchors.add(custom ? custom[1] : slugger.slug(headingText(heading[1])));
  }
  for (const match of source.matchAll(/\bid=["']([^"']+)["']/g)) anchors.add(match[1]);
  return anchors;
}

export function extractLinks(source) {
  const masked = maskNonProse(source);
  const links = [];
  const push = (url, index) => {
    const line = masked.slice(0, index).split('\n').length;
    links.push({ url, line });
  };
  for (const match of masked.matchAll(/\]\(\s*<?([^)\s>]+)>?(?:\s+"[^"]*")?\s*\)/g)) {
    push(match[1], match.index);
  }
  for (const match of masked.matchAll(/^[ \t]*\[(?!\^)[^\]\n]+\]:[ \t]+(\S+)/gm)) {
    push(match[1], match.index);
  }
  for (const match of masked.matchAll(/\b(?:href|to)\s*=\s*(?:"([^"\n]*)"|'([^'\n]*)')/g)) {
    push(match[1] ?? match[2], match.index);
  }
  return links;
}

export function buildIndex(repoRoot) {
  const docsRoot = path.join(repoRoot, contentDir);
  const pages = new Map();
  const units = [];
  const partials = new Map();
  for (const relative of listContentFiles(docsRoot)) {
    const file = path.join(docsRoot, relative);
    const raw = readFileSync(file, 'utf8');
    const url = fileToUrl(relative);
    const expanded = expandIncludes(raw, repoRoot, file, new Set(), (partial) => {
      if (!partials.has(partial)) partials.set(partial, url);
    });
    pages.set(url, { anchors: collectAnchors(expanded) });
    units.push({ rel: toPosix(path.relative(repoRoot, file)), raw, pageUrl: url });
  }
  for (const [file, pageUrl] of partials) {
    units.push({
      rel: toPosix(path.relative(repoRoot, file)),
      raw: readFileSync(file, 'utf8'),
      pageUrl,
    });
  }
  return { repoRoot, pages, units };
}

function isExternal(url) {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(url);
}

export function resolvesToPublicAsset(pathname, repoRoot) {
  if (!pathname.startsWith('/')) return false;
  const root = path.join(repoRoot, publicDir);
  const file = path.resolve(root, `.${decodeURIComponent(pathname)}`);
  const relative = path.relative(root, file);
  if (relative.startsWith('..') || path.isAbsolute(relative)) return false;
  return existsSync(file) && statSync(file).isFile();
}

export function findBrokenLinks(index) {
  const broken = [];
  for (const unit of index.units) {
    for (const { url, line } of extractLinks(unit.raw)) {
      if (isExternal(url)) continue;
      const hashAt = url.indexOf('#');
      const pathname = (hashAt < 0 ? url : url.slice(0, hashAt)).replace(/\?.*$/, '');
      const anchor = hashAt < 0 ? '' : decodeURIComponent(url.slice(hashAt + 1));
      const report = (reason) => broken.push({ rel: unit.rel, line, url, reason });

      if (pathname && !pathname.startsWith('/')) {
        report('use a root relative url such as /dao-constitution');
        continue;
      }
      const targetUrl = pathname ? pathname.replace(/\/$/, '') || '/' : unit.pageUrl;
      const target = index.pages.get(targetUrl);
      if (!target) {
        if (!resolvesToPublicAsset(pathname, index.repoRoot)) report('no page or file at this url');
        continue;
      }
      if (anchor && !target.anchors.has(anchor)) report(`no heading #${anchor} on ${targetUrl}`);
    }
  }
  return broken;
}

import GithubSlugger from 'github-slugger';
import type { Heading, Root } from 'mdast';
import { toString } from 'mdast-util-to-string';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import { parse as parseYaml } from 'yaml';

import { pageUrlFromPath, splitFrontmatter } from './paths.ts';

export { pageUrlFromPath, splitFrontmatter };

export type ValidationContext = {
  path: string;
  create: boolean;
  // every file path on the branch the document is saved to
  repoFiles: ReadonlySet<string>;
  // heading anchors per page url on the published site
  siteAnchors: Readonly<Record<string, readonly string[]>>;
  allowedComponents: ReadonlySet<string>;
  validateFrontmatter?: (data: unknown) => string[];
};

type JsxNode = {
  type: 'mdxJsxFlowElement' | 'mdxJsxTextElement';
  name: string | null;
  attributes: { type: string; name?: string; value?: unknown }[];
  children: unknown[];
  position?: { start: { line: number } };
};

function dirname(path: string) {
  return path.slice(0, path.lastIndexOf('/'));
}

function resolveRelative(from: string, relative: string) {
  const segments = dirname(from).split('/');
  for (const part of relative.split('/')) {
    if (part === '..') segments.pop();
    else if (part !== '.' && part !== '') segments.push(part);
  }
  return segments.join('/');
}

function headingAnchors(tree: Root) {
  const anchors = new Set<string>();
  const slugger = new GithubSlugger();
  visit(tree, 'heading', (heading: Heading) => {
    const text = toString(heading).trim();
    const custom = /\s*\[#([^\]]+)\]$/.exec(text);
    anchors.add(custom ? custom[1] : slugger.slug(text));
  });
  return anchors;
}

function stringAttribute(node: JsxNode, name: string) {
  const attribute = node.attributes.find((item) => item.name === name);
  return typeof attribute?.value === 'string' ? attribute.value : undefined;
}

export function validateDocument(source: string, context: ValidationContext): string[] {
  const problems: string[] = [];
  const { frontmatter, raw, body } = splitFrontmatter(source);
  const pageUrl = pageUrlFromPath(context.path);
  // positions are relative to the body, so shift them past the frontmatter
  const lineOffset = raw.split('\n').length - 1;
  const lineOf = (node: { position?: { start: { line: number } } }) =>
    node.position ? `line ${node.position.start.line + lineOffset}: ` : '';

  if (pageUrl) {
    if (frontmatter === null) {
      problems.push('The page is missing its details block (title and description).');
    } else {
      try {
        const data = parseYaml(frontmatter);
        problems.push(...(context.validateFrontmatter?.(data) ?? []));
      } catch (error) {
        problems.push(`The page details could not be read: ${(error as Error).message}`);
      }
    }

    const clash = [...context.repoFiles].find(
      (file) => file !== context.path && pageUrlFromPath(file) === pageUrl
    );
    if (clash) {
      problems.push(
        `Another page already uses the web address ${pageUrl} (${clash}). Choose a different address.`
      );
    }
  }

  let tree: Root;
  try {
    tree = unified().use(remarkParse).use(remarkMdx).use(remarkGfm).parse(body);
  } catch (error) {
    const message = error as {
      reason?: string;
      line?: number;
      place?: { line?: number; start?: { line: number } };
      message: string;
    };
    const reason = message.reason ?? message.message;
    const at =
      message.line ??
      message.place?.start?.line ??
      message.place?.line ??
      Number(/\((\d+):\d+/.exec(reason)?.[1] ?? 0);
    const line = at ? `line ${at + lineOffset}: ` : '';
    const detail = reason.replace(/\s*\(\d+:\d+(-\d+:\d+)?\)/, '');
    problems.push(
      `The page could not be read. Open the MDX view and check ${line.replace(/: $/, '') || 'the source'}: ${detail}`
    );
    return problems;
  }

  const localAnchors = headingAnchors(tree);

  // the editor always offers heading 1, but the page title is already the top heading
  visit(tree, 'heading', (heading: Heading) => {
    if (heading.depth === 1) {
      problems.push(
        `The heading "${toString(heading).trim().slice(0, 60)}" is a Heading 1. The page title is already the top heading, so change it to Heading 2 or 3.`
      );
    }
  });
  let hasInclude = false;
  const links: { url: string; label: string }[] = [];
  // writers work in the visual view, so name a link by its words rather than a line number
  const describe = (node: unknown, url: string) => {
    const words = toString(node as Root).trim();
    return words ? `The link on "${words.slice(0, 60)}" (${url})` : `An empty link (${url})`;
  };

  visit(tree, (node) => {
    if (node.type === 'mdxjsEsm') {
      problems.push(
        `${lineOf(node)}import and export lines are not supported, remove them in the MDX view.`
      );
    }
    if (node.type === 'link' || node.type === 'definition') {
      const url = (node as { url: string }).url;
      links.push({ url, label: describe(node, url) });
    }
    if (node.type !== 'mdxJsxFlowElement' && node.type !== 'mdxJsxTextElement') return;

    const element = node as unknown as JsxNode;
    const name = element.name ?? '';
    const id = stringAttribute(element, 'id');
    if (id) localAnchors.add(id);

    if (name === 'include') {
      hasInclude = true;
      const target = toString(node).trim();
      const cwd = element.attributes.some((attribute) => attribute.name === 'cwd');
      const file = cwd ? target : resolveRelative(context.path, target);
      if (!context.repoFiles.has(file)) {
        problems.push(
          `A shared content block points to "${target}", which does not exist. Delete the block and add it again from the / menu.`
        );
      }
      return;
    }

    if (/^[A-Z]/.test(name) || name.includes('.')) {
      if (!context.allowedComponents.has(name)) {
        problems.push(
          `The "${name}" block is not available on the site. Remove it or ask a maintainer.`
        );
      }
    }

    for (const attribute of ['href', 'to']) {
      const url = stringAttribute(element, attribute);
      if (url) links.push({ url, label: describe(element, url) });
    }
  });

  for (const { url, label } of links) {
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(url)) continue;
    const hashAt = url.indexOf('#');
    const pathname = (hashAt < 0 ? url : url.slice(0, hashAt)).replace(/\?.*$/, '');
    const anchor = hashAt < 0 ? '' : decodeURIComponent(url.slice(hashAt + 1));

    if (!pathname) {
      if (anchor && !hasInclude && !localAnchors.has(anchor)) {
        problems.push(`${label} points to a heading that is not on this page.`);
      }
      continue;
    }

    if (!pathname.startsWith('/')) {
      const file = /\.mdx?$/.test(pathname) ? resolveRelative(context.path, pathname) : null;
      if (!file || !pageUrlFromPath(file) || !context.repoFiles.has(file)) {
        problems.push(
          `${label} does not point to a page. Remove the link and type [[ to pick the page instead.`
        );
      }
      continue;
    }

    const target = pathname.replace(/\/$/, '') || '/';
    if (context.repoFiles.has(`public${decodeURIComponent(target)}`)) continue;

    const targetExists =
      target === pageUrl || [...context.repoFiles].some((file) => pageUrlFromPath(file) === target);
    if (!targetExists) {
      problems.push(`${label} points to a page that does not exist.`);
      continue;
    }

    const known = target === pageUrl ? localAnchors : context.siteAnchors[target];
    const anchors = known ? new Set(known) : null;
    if (anchor && anchors && !(target === pageUrl && hasInclude) && !anchors.has(anchor)) {
      problems.push(`${label} points to a heading that does not exist on that page.`);
    }
  }

  return problems;
}

export const docsRoot = 'content/docs/';

// mirrors fumadocs slugs: extension dropped, (group) folders and a trailing index removed
export function pageUrlFromPath(path: string): string | null {
  if (!path.startsWith(docsRoot) || !path.endsWith('.mdx')) return null;
  const segments = path
    .slice(docsRoot.length, -'.mdx'.length)
    .split('/')
    .filter((segment) => !/^\(.+\)$/.test(segment));
  if (segments.at(-1) === 'index') segments.pop();
  return '/' + segments.join('/');
}

export function splitFrontmatter(source: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/.exec(source);
  if (!match) return { frontmatter: null, raw: '', body: source };
  return { frontmatter: match[1], raw: match[0], body: source.slice(match[0].length) };
}

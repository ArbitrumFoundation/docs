import assert from 'node:assert/strict';
import { test } from 'node:test';

import { pageUrlFromPath, validateDocument, type ValidationContext } from './validate.ts';

const repoFiles = new Set([
  'content/docs/dao-constitution.mdx',
  'content/docs/(governance-architecture)/fee-distribution.mdx',
  'content/docs/how-tos/vote-dao-proposals.mdx',
  'content/partials/_draft-expectations-partial.mdx',
  'public/assets/report.pdf',
]);

function context(overrides: Partial<ValidationContext> = {}): ValidationContext {
  return {
    path: 'content/docs/how-tos/new-guide.mdx',
    create: true,
    repoFiles: new Set([...repoFiles, 'content/docs/how-tos/new-guide.mdx']),
    siteAnchors: { '/dao-constitution': ['section-1'] },
    allowedComponents: new Set(['Callout', 'Steps', 'Step']),
    ...overrides,
  };
}

const page = (body: string) => `---\ntitle: New guide\n---\n\n${body}\n`;

test('maps content paths to urls', () => {
  assert.equal(
    pageUrlFromPath('content/docs/(governance-architecture)/fee-distribution.mdx'),
    '/fee-distribution'
  );
  assert.equal(pageUrlFromPath('content/docs/how-tos/index.mdx'), '/how-tos');
  assert.equal(pageUrlFromPath('content/partials/_x.mdx'), null);
});

test('a valid page has no problems', () => {
  const body = [
    '<include cwd>content/partials/_draft-expectations-partial.mdx</include>',
    '',
    '## Intro [#intro]',
    '',
    'See [the constitution](/dao-constitution#section-1), [intro](#intro), [report](/assets/report.pdf) and [vote](./vote-dao-proposals.mdx).',
    '',
    '<Callout type="info">Hi</Callout>',
  ].join('\n');
  assert.deepEqual(validateDocument(page(body), context()), []);
});

test('flags blocks the site cannot render', () => {
  const problems = validateDocument(page('<Files>\n  <File name="a" />\n</Files>'), context());
  assert.match(problems.join('\n'), /"Files" block is not available/);
});

test('flags mdx syntax errors with a line number', () => {
  const problems = validateDocument(page('<Callout>\nunclosed'), context());
  assert.match(problems.join('\n'), /could not be read\. Open the MDX view and check line \d+/);
});

test('flags broken links, anchors and includes', () => {
  const body = [
    '[a](/missing) [b](/dao-constitution#nope) [c](dao-constitution) [d](#nowhere)',
    '',
    '<include cwd>content/partials/_missing.mdx</include>',
  ].join('\n');
  const problems = validateDocument(page(body), context()).join('\n');
  assert.match(problems, /The link on "a" \(\/missing\) points to a page that does not exist/);
  assert.match(problems, /The link on "b" \(\/dao-constitution#nope\) points to a heading/);
  assert.match(problems, /The link on "c" \(dao-constitution\) does not point to a page/);
  assert.match(problems, /shared content block points to "content\/partials\/_missing.mdx"/);
});

test('flags a web address that another page already uses', () => {
  const problems = validateDocument(
    page('Hello'),
    context({
      path: 'content/docs/fee-distribution.mdx',
      repoFiles: new Set([...repoFiles, 'content/docs/fee-distribution.mdx']),
    })
  );
  assert.match(problems.join('\n'), /already uses the web address \/fee-distribution/);
});

test('flags import lines and unreadable frontmatter', () => {
  const problems = validateDocument(
    `---\ntitle: a: b: c\n---\n\nimport X from 'y';\n`,
    context({ validateFrontmatter: () => [] })
  ).join('\n');
  assert.match(problems, /details could not be read/);
  assert.match(problems, /import and export lines are not supported/);
});

test('relative links to shared content files are not pages', () => {
  const problems = validateDocument(
    page('[x](../../partials/_draft-expectations-partial.mdx)'),
    context()
  );
  assert.match(problems.join('\n'), /does not point to a page/);
});

test('flags a heading 1 in the body', () => {
  const problems = validateDocument(page('# Big\n\n## Fine'), context());
  assert.equal(problems.length, 1);
  assert.match(problems[0], /"Big" is a Heading 1/);
});

import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { test } from 'node:test';

import { buildIndex, fileToUrl, findBrokenLinks } from './lib/doc-links.mjs';

function write(root, file, content) {
  const target = path.join(root, file);
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, content);
}

function fixture(pages) {
  const root = mkdtempSync(path.join(tmpdir(), 'check-links-'));
  write(root, 'public/assets/report.pdf', '%PDF-1.4');
  write(
    root,
    'content/partials/_shared.mdx',
    '### Shared term [#shared-term]\n\n[self](#shared-term)\n'
  );
  for (const [file, content] of Object.entries(pages)) write(root, file, content);
  return root;
}

function brokenUrls(root) {
  return findBrokenLinks(buildIndex(root)).map((link) => link.url);
}

test('route groups and extensions are dropped from urls', () => {
  assert.equal(fileToUrl('(governance-architecture)/fee-distribution.mdx'), '/fee-distribution');
  assert.equal(fileToUrl('how-tos/vote-dao-proposals.mdx'), '/how-tos/vote-dao-proposals');
});

test('valid page, anchor, asset and partial links pass', () => {
  const root = fixture({
    'content/docs/a.mdx': '## Hello world\n\n### Custom [#custom-id]\n',
    'content/docs/(group)/b.mdx':
      '[a](/a#hello-world) [c](/a#custom-id) [pdf](/assets/report.pdf) <a href="#local">x</a>\n\n## Local [#local]\n\n<include cwd>content/partials/_shared.mdx</include>\n',
  });
  assert.deepEqual(brokenUrls(root), []);
});

test('missing pages, anchors and assets are reported', () => {
  const root = fixture({
    'content/docs/a.mdx': '## Hello\n',
    'content/docs/b.mdx': '[x](/missing) [y](/a#nope) [z](/assets/missing.pdf)\n',
  });
  assert.deepEqual(brokenUrls(root), ['/missing', '/a#nope', '/assets/missing.pdf']);
});

test('relative links are reported', () => {
  const root = fixture({
    'content/docs/a.mdx': '[x](./b) [y](../b.md)\n',
    'content/docs/b.mdx': '## B\n',
  });
  assert.deepEqual(brokenUrls(root), ['./b', '../b.md']);
});

test('links in code are ignored', () => {
  const root = fixture({
    'content/docs/a.mdx': '```md\n[x](/missing)\n```\n\n`[y](/missing)`\n',
  });
  assert.deepEqual(brokenUrls(root), []);
});

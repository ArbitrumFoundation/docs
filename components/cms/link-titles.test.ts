import assert from 'node:assert/strict';
import { test } from 'node:test';

import { nameBareLinks, relativizeSiteLinks } from './link-titles.ts';

const titles = new Map([
  ['/dao-constitution', 'The Constitution of the ArbitrumDAO'],
  ['/dao-glossary#arb', '$ARB'],
]);

test('bare links get the page or term name', () => {
  assert.equal(
    nameBareLinks(
      'See [/dao-constitution](/dao-constitution) and [/dao-glossary#arb](/dao-glossary#arb).',
      titles
    ),
    'See [The Constitution of the ArbitrumDAO](/dao-constitution) and [$ARB](/dao-glossary#arb).'
  );
});

test('links with their own words and code blocks are left alone', () => {
  const source =
    '[the constitution](/dao-constitution)\n\n```md\n[/dao-constitution](/dao-constitution)\n```';
  assert.equal(nameBareLinks(source, titles), source);
});

test('unknown addresses are left alone', () => {
  assert.equal(nameBareLinks('[/nope](/nope)', titles), '[/nope](/nope)');
});

test('links to the live site become root relative', () => {
  assert.equal(
    relativizeSiteLinks(
      '[a](https://docs.arbitrum.foundation/dao-constitution#section-1) [b](https://docs.arbitrum.foundation) [c](https://example.com/x)',
      'https://docs.arbitrum.foundation'
    ),
    '[a](/dao-constitution#section-1) [b](/) [c](https://example.com/x)'
  );
});

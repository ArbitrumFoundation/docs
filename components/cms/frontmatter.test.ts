import assert from 'node:assert/strict';
import { test } from 'node:test';

import { readDetails, writeDetails } from './frontmatter.ts';

const yaml = [
  'title: Why decentralize?',
  'sidebar_label: Why',
  'description: Learn about the rationale behind introducing the $ARB governance',
  '  token, and the important role it plays.',
  'dao_author: dzgoldman',
  'toc_min_heading_level: 3',
].join('\n');

test('changing one field leaves every other line untouched', () => {
  const { details } = readDetails(yaml);
  const next = writeDetails(yaml, { ...details, dao_author: 'dzgoldman, symbolpunk' }, details);
  assert.equal(
    next,
    `---\n${yaml.replace('dao_author: dzgoldman', 'dao_author: dzgoldman, symbolpunk')}\n---\n`
  );
});

test('values that need quoting are quoted', () => {
  const { details } = readDetails(yaml);
  const next = writeDetails(yaml, { ...details, title: 'A: b' }, details);
  assert.match(next, /^---\ntitle: "A: b"\n/);
  assert.equal(readDetails(next.slice(4, -5)).details.title, 'A: b');
});

test('new fields are appended and cleared optional fields are removed', () => {
  const { details } = readDetails(yaml);
  const next = writeDetails(yaml, { ...details, dao_sme: 'fred', sidebar_label: '' }, details);
  assert.doesNotMatch(next, /sidebar_label/);
  assert.match(next, /toc_min_heading_level: 3\ndao_sme: fred\n---\n$/);
});

test('a folded description is replaced as a whole', () => {
  const { details } = readDetails(yaml);
  const next = writeDetails(yaml, { ...details, description: 'Short.' }, details);
  assert.match(next, /\ndescription: Short\.\ndao_author: dzgoldman\n/);
});

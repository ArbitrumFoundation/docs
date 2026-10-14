// writes every page url and its heading anchors for the docs editor's save checks
import { mkdirSync, writeFileSync } from 'node:fs';

import { buildIndex } from './lib/doc-links.mjs';

const index = buildIndex(process.cwd());
const anchors = Object.fromEntries(
  [...index.pages].map(([url, page]) => [url, [...page.anchors].sort()])
);

mkdirSync('.generated', { recursive: true });
writeFileSync('.generated/site-anchors.json', JSON.stringify(anchors, null, 2) + '\n');
console.log(`generate-anchors: ${index.pages.size} pages`);

// fails on broken internal links and anchors, replacing the docusaurus broken link check
import { buildIndex, findBrokenLinks } from './lib/doc-links.mjs';

const index = buildIndex(process.cwd());
const broken = findBrokenLinks(index);

// two files with the same url crash fumadocs with duplicated slugs
for (const duplicate of index.duplicates) {
  broken.push({
    rel: duplicate.files[1],
    line: 1,
    url: duplicate.url,
    reason: `same url as ${duplicate.files[0]}`,
  });
}

if (broken.length === 0) {
  console.log('check-links: no broken internal links');
} else {
  console.error(`check-links: ${broken.length} broken internal link(s)`);
  for (const link of broken) {
    console.error(`  ${link.rel}:${link.line}  ${link.url}  (${link.reason})`);
  }
  process.exit(1);
}

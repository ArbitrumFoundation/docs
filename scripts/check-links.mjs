// fails on broken internal links and anchors, replacing the docusaurus broken link check
import { buildIndex, findBrokenLinks } from './lib/doc-links.mjs';

const broken = findBrokenLinks(buildIndex(process.cwd()));

if (broken.length === 0) {
  console.log('check-links: no broken internal links');
} else {
  console.error(`check-links: ${broken.length} broken internal link(s)`);
  for (const link of broken) {
    console.error(`  ${link.rel}:${link.line}  ${link.url}  (${link.reason})`);
  }
  process.exit(1);
}

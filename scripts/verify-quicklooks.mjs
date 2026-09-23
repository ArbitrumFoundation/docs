// fails when a glossary link points at a term with no entry in public/glossary.json
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const glossary = JSON.parse(readFileSync('./public/glossary.json', 'utf8'));
const roots = ['content/docs', 'content/partials'];

const keys = roots.flatMap((root) =>
  readdirSync(root, { recursive: true })
    .filter((file) => file.endsWith('.mdx'))
    .flatMap((file) => {
      const source = readFileSync(path.join(root, file), 'utf8');
      return [...source.matchAll(/\/dao-glossary#([\w-]+)/g)].map((match) => match[1]);
    })
);

const missing = [...new Set(keys.filter((key) => !glossary[key]))];

if (missing.length === 0) {
  console.log(`verify-quicklooks: all ${new Set(keys).size} glossary terms have tooltips`);
} else {
  console.error(
    `verify-quicklooks: glossary terms missing from public/glossary.json:\n${missing.join('\n')}`
  );
  process.exit(1);
}

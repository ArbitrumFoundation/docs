// fails when a data-quicklook-from key has no entry in public/glossary.json
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const glossary = JSON.parse(readFileSync('./public/glossary.json', 'utf8'));
const roots = ['content/docs', 'content/partials'];

const keys = roots.flatMap((root) =>
  readdirSync(root, { recursive: true })
    .filter((file) => file.endsWith('.mdx'))
    .flatMap((file) => {
      const source = readFileSync(path.join(root, file), 'utf8');
      return [...source.matchAll(/data-quicklook-from=\s*(['"])(.*?)\1/g)].map((match) => match[2]);
    })
);

const missing = [...new Set(keys.filter((key) => !glossary[key]))];

if (missing.length === 0) {
  console.log('verify-quicklooks: all quicklook keys found in glossary');
} else {
  console.error(`verify-quicklooks: keys not found in glossary:\n${missing.join('\n')}`);
  process.exit(1);
}

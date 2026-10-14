// usage: pnpm update-constitution-hash
import { readFileSync, writeFileSync } from 'node:fs';

import { keccak256 } from '@ethersproject/solidity';

const constitution = readFileSync('./content/partials/_constitution-content-partial.mdx', 'utf8');
const constitutionHash = keccak256(['string'], [constitution]);

writeFileSync('./lib/constitution-hash.json', JSON.stringify({ constitutionHash }));

console.log('Constitution hash:');
console.log(constitutionHash);

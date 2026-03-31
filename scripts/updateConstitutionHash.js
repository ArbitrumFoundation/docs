// README: `node ./scripts/updateConstitutionHash`

const fs = require('fs');

const { pack, keccak256, sha256 } = require('@ethersproject/solidity');
const main = async () => {
  const data = await fs.readFileSync(
    './docs/partials/_constitution-content-partial.mdx',
    'utf8'
  );
  // TEMPORARY HACK: undo formatting-only differences introduced by the .md -> .mdx migration
  // so the on-chain constitution hash remains stable. Remove this normalization once the
  // constitution is amended and a new hash is published on-chain.
  const EXPECTED_HASH = '0x263080bed3962d0476fa84fbb32ab81dfff1244e2b145f9864da24353b2f3b05';
  const normalized = data
    .replace(
      '<li>\n                     Constitutional AIP',
      '<li>Constitutional AIP',
    )
    .replace(
      'below formula:',
      'below formula: ',
    )
    .replace(
      '                     </li>\n                     <li>\n                     Non-Constitutional AIP',
      '                     <li>Non-Constitutional AIP',
    )
    .replace(
      '                     </ul>\n                     </li>\n               </ul>',
      '               </ul>',
    );
  const constitutionHash = keccak256(['string'], [normalized]);
  if (constitutionHash !== EXPECTED_HASH) {
    console.error('Constitution content has changed — the normalization hack in this script is no longer needed.');
    console.error('Please remove the TEMPORARY HACK block and hash directly from the raw file content.');
    process.exit(1);
  }
  fs.writeFileSync(
    './src/components/ConstitutionHash/constitutionHash.json',
    JSON.stringify({ constitutionHash })
  );
  return constitutionHash;
};

main().then((res) => {
  console.log('Constitution hash:');
  console.log(res);
});

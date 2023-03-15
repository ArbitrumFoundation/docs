// README: `node ./scripts/updateConstitutionHash`

const fs = require('fs');

const { pack, keccak256, sha256 } = require('@ethersproject/solidity');
const main = async () => {
  const data = await fs.readFileSync(
    './docs/partials/_constitution-content-partial.md',
    'utf8'
  );
  const constitutionHash = keccak256(['string'], [data]);
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

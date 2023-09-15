import React, { useEffect, useState } from 'react';
import constHashJson from '../ConstitutionHash/constitutionHash.json';
import { Contract, JsonRpcProvider } from 'ethers';

const hashDiff = (docsHash: string, chainHash: string) => {
  return [docsHash, chainHash].sort().join(',');
};

const diffToAIP = {
  [hashDiff(
    '0x2498ca4a737c2d06c43799b5ddf5183b6e169359f68bea4b34775751528a2ee1',
    '0x60acde40ad14f4ecdb1bea0704d1e3889264fb029231c9016352c670703b35d6'
  )]: {
    AIP: '6',
    link: 'https://www.tally.xyz/gov/arbitrum/proposal/108413626736577087081818577238162267924459697981830202052718122463860611528602',
  },
};

export const PendingConstitutionNotice = () => {
  const [chainHash, setChainHash] = useState<string>();
  const [docsHash, setDocsHash] = useState<string>();
  const checkConstitutionDiff = async () => {
    const arbOneProvider = new JsonRpcProvider('https://arb1.arbitrum.io/rpc');
    const constitutionHashContract = new Contract(
      '0x1D62fFeB72e4c360CcBbacf7c965153b00260417',
      ['function constitutionHash() view returns(bytes32)'],
      arbOneProvider
    );
    setChainHash(await constitutionHashContract.constitutionHash());
    setDocsHash(constHashJson.constitutionHash);
  };
  useEffect(() => {
    checkConstitutionDiff();
  }, []);

  const AIPInfo = diffToAIP[hashDiff(docsHash, chainHash)];
  const showNotice = docsHash && chainHash && docsHash !== chainHash;
  if (!showNotice) return;
  return (
    <div id="pending-constitution-notice">
      {AIPInfo ? (
        <>
          Note: Displaying pending constitution hash for{' '}
          <a target="_blank" href={AIPInfo.link}>
            AIP {AIPInfo.AIP}
          </a>
          , passed but not yet executed. <br />
          Displayed Constitution hash: {docsHash} <br />
          On-chain hash: {chainHash}{' '}
        </>
      ) : (
        <>
          Note: displayed constitution mismatches with on-chain constitution
          hash: <br />
          Displayed Constitution hash: {docsHash} <br />
          On-chain hash: {chainHash} <br />
          Open an issue{' '}
          <a
            href={`https://github.com/ArbitrumFoundation/docs/issues/new?title=Docs update request: ${
              new URL(window.location.href).pathname
            }&body=Source: ${
              window.location.href
            }%0A%0ARequest: Explanation of constitution hash status. %0A%0APsst, this issue will be closed with a templated response if it isn't a documentation update request.`}
          >
            here
          </a>
        </>
      )}
    </div>
  );
};

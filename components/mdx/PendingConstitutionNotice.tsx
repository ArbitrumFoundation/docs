'use client';

import { useEffect, useState } from 'react';

import constitution from '@/lib/constitution-hash.json';

const rpcUrl = 'https://arb1.arbitrum.io/rpc';
const constitutionHashContract = '0x1D62fFeB72e4c360CcBbacf7c965153b00260417';
// function selector for the constitution hash getter
const constitutionHashSelector = '0xc7d93fd4';

type PendingAip = {
  aip: string;
  link: string;
};

function hashDiff(docsHash: string, chainHash: string) {
  return [docsHash, chainHash].sort().join(',');
}

const diffToAip: Record<string, PendingAip> = {
  [hashDiff(
    '0x2498ca4a737c2d06c43799b5ddf5183b6e169359f68bea4b34775751528a2ee1',
    '0x60acde40ad14f4ecdb1bea0704d1e3889264fb029231c9016352c670703b35d6'
  )]: {
    aip: '6',
    link: 'https://www.tally.xyz/gov/arbitrum/proposal/108413626736577087081818577238162267924459697981830202052718122463860611528602',
  },
};

async function fetchChainHash(): Promise<string> {
  const response = await fetch(rpcUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_call',
      params: [{ to: constitutionHashContract, data: constitutionHashSelector }, 'latest'],
    }),
  });
  const { result } = (await response.json()) as { result?: string };
  if (!result) throw new Error('constitution hash call returned no result');
  return result.toLowerCase();
}

export function PendingConstitutionNotice() {
  const [chainHash, setChainHash] = useState<string>();
  const docsHash = constitution.constitutionHash.toLowerCase();

  useEffect(() => {
    fetchChainHash()
      .then(setChainHash)
      .catch(() => undefined);
  }, []);

  if (!chainHash || chainHash === docsHash) return null;

  const pendingAip = diffToAip[hashDiff(docsHash, chainHash)];
  const issueUrl = new URL('https://github.com/ArbitrumFoundation/docs/issues/new');
  issueUrl.searchParams.set('title', `Docs update request: ${window.location.pathname}`);
  issueUrl.searchParams.set(
    'body',
    `Source: ${window.location.href}\n\nRequest: Explanation of constitution hash status.\n\nPsst, this issue will be closed with a templated response if it isn't a documentation update request.`
  );

  return (
    <div id="pending-constitution-notice">
      {pendingAip ? (
        <>
          Note: Displaying pending constitution hash for{' '}
          <a target="_blank" rel="noreferrer" href={pendingAip.link}>
            AIP {pendingAip.aip}
          </a>
          , passed but not yet executed. <br />
          Displayed Constitution hash: {docsHash} <br />
          On-chain hash: {chainHash}
        </>
      ) : (
        <>
          Note: displayed constitution mismatches with on-chain constitution hash: <br />
          Displayed Constitution hash: {docsHash} <br />
          On-chain hash: {chainHash} <br />
          Open an issue <a href={issueUrl.toString()}>here</a>
        </>
      )}
    </div>
  );
}

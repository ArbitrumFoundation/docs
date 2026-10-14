import { getAddress, isAddress } from '@ethersproject/address';

type ChainID = 1 | 11155111 | 42170 | 421614 | 42161;

const chainIDToExplorerUrlRoot: Record<ChainID, string> = {
  1: 'https://etherscan.io/address',
  11155111: 'https://sepolia.etherscan.io/address',
  42161: 'https://arbiscan.io/address',
  42170: 'https://arbitrum-nova.blockscout.com/address',
  421614: 'https://sepolia.arbiscan.io/address',
};

type AddressExplorerLinkProps = {
  address: string | 503;
  chainID: ChainID;
};

export function AddressExplorerLink({ address, chainID }: AddressExplorerLinkProps) {
  const rootUrl = chainIDToExplorerUrlRoot[chainID];
  if (!rootUrl) throw new Error(`no root url set for chain id ${chainID}`);

  if (address === 503) return <span>soon™️</span>;
  if (!isAddress(address)) throw new Error(`${address} is not an address`);
  if (getAddress(address) !== address) {
    throw new Error(`${address} has invalid checksum; should be ${getAddress(address)}`);
  }

  return (
    <a href={`${rootUrl}/${address}`} target="_blank" rel="noreferrer">
      {address}
    </a>
  );
}

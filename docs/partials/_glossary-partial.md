<dl>
   <dt>ARB</dt>
   <dd data-quicklook-key="arb">Arbitrum’s governance token, an ERC-20 token native to the Arbitrum One chain. Owning $ARB makes you a member of the Arbitrum DAO and gives you the right to participate in Arbitrum’s decentralized governance.</dd>
   <dt>ARB Reverse Gateway</dt>
   <dd data-quicklook-key="arb-reverse-gateway">Contracts for bridging $ARB between Ethereum and Arbitrum One. Since $ARB is native to Arbitrum One, the “reverse” gateway keep the full $ARB supply escrowed in Arbitrum One, and mint or burn the L1 token representation upon deposits/withdrawals (compare to the “standard gateway”, which mints/burns on L2).</dd>
   <dt>Arbitrum Constitution</dt>
   <dd data-quicklook-key="arbitrum-constitution">A document which lays out the rules, procedures, and community values by which the Arbitrum DAO operates. The hash of the canonical constitution is stored at TODO and updatable via governance.</dd>
   <dt>Arbitrum DAO</dt>
   <dd data-quicklook-key="arbitrum-dao">The worldwide community of $ARB token holders and delegates. Governs the Arbitrum One chain, the Arbitrum Nova chain, the Constitution of the Arbitrum DAO, and the Security Council.</dd>
   <dt>Arbitrum Foundation</dt>
   <dd data-quicklook-key="arbitrum-foundation">A legal entity that represents the Arbitrum DAO. Is bound to the rules articulated within the Constitution of the Arbitrum DAO.</dd>
   <dt>Arbitrum Foundation tokens</dt>
   <dd data-quicklook-key="arbitrum-foundation-tokens">$ARB tokens owned by the DAO Treasury</dd>
   <dt>Arbitrum Improvement Proposal</dt>
   <dd data-quicklook-key="arbitrum-improvement-proposal">A governance proposals as outlined in the Arbitrum Constitution.</dd>
   <dt>Claimed airdrop tokens</dt>
   <dd data-quicklook-key="claimed-airdrop-tokens">Tokens claimed from the Token Distributor contract during the claimable airdrop period (TODO: dates / time).</dd>
   <dt>Constitutional proposal</dt>
   <dd data-quicklook-key="constitutional-proposal">A governance proposal with enough significance to require a higher threshold for to pass, i.e., on that: • Modifies the text of the constitution • Installs or modifies software on any governed Arbitrum chain • Takes any action that requires “chain owner” permission on any governed chain</dd>
   <dt>DAO Treasury</dt>
   <dd data-quicklook-key="dao-treasury">Contract on Arbitrum One that contains tokens collectively owned by the Arbitrum DAO.</dd>
   <dt>Delegate</dt>
   <dd data-quicklook-key="delegate">A party that vote in Arbitrum Governance proposals. Could be an $ARB holder or a party to whom votes where delegated from an $ARB holder.</dd>
   <dt>Emergency upgrade</dt>
   <dd data-quicklook-key="emergency-upgrade">A specific type of protocol upgrade used by the Security Council in emergency situations, such as fixing a critical vulnerability.</dd>
   <dt>Governor</dt>
   <dd data-quicklook-key="governor">Core governance contract in which proposals are submitted, voted on by the DAO, and sent off for execution.</dd>
   <dt>Intermediate governance contract  delta contract</dt>
   <dd data-quicklook-key="intermediate-governance-contract---delta-contract">A one-time use contract deployed as part of a governance upgrade; see </dd>
   <dt>Multisignature wallet</dt>
   <dd data-quicklook-key="multisignature-wallet">Aka multi-sig wallet. A wallet that requires multiple private keys to sign transactions. Used by the Security Council to trigger emergency upgrades.</dd>
   <dt>Nonconstitutional proposal</dt>
   <dd data-quicklook-key="non-constitutional-proposal">Any governance proposal that doesn’t meet the criteria to be considered “constitutional”; requires a lower threshold to pass.</dd>
   <dt>Offchain Governance Action</dt>
   <dd data-quicklook-key="off-chain-governance-action">The Constitution of the Arbitrum DAO allows the Arbitrum DAO to take two types of actions: on-chain actions and off-chain actions. On-chain actions are executed as transactions submitted to the Arbitrum DAO’s governance smart contracts. Off-chain actions are actions that are executed without smart contracts. Updating the text of the Constitution of the Arbitrum DAO is an example of an off-chain action.</dd>
   <dt>Onchain Governance Action</dt>
   <dd data-quicklook-key="on-chain-governance-action">The Constitution of the Arbitrum DAO allows the Arbitrum DAO to take two types of actions: on-chain actions and off-chain actions. Off-chain actions are actions that are executed without smart contracts. On-chain actions are executed as transactions submitted to the Arbitrum DAO’s governance smart contracts. Updating the rate of $ARB inflation is an example of an on-chain action.</dd>
   <dt>Proposal Waiting Period</dt>
   <dd data-quicklook-key="proposal-waiting-period">Contract-enforced delay period of roughly 2 weeks that begins after a proposal is accepted, and after which the proposal takes effects. The proposal waiting period is intended to give users the option of opting out an updated (by, e.g., withdrawing their funds).</dd>
   <dt>Protocol governance</dt>
   <dd data-quicklook-key="protocol-governance">A system by which changes to a core protocol are proposed, considered, and enacted.</dd>
   <dt>Security Council</dt>
   <dd data-quicklook-key="security-council">A 12-member council of publicly known entities who hold the private keys to a 12-member multisignature wallet. Members of the council use this wallet to vote on emergency upgrades.</dd>
   <dt>Security Council Election</dt>
   <dd data-quicklook-key="security-council-election">Biannual process by which the DAO can reelect the members of the Security Council.</dd>
   <dt>Timelock</dt>
   <dd data-quicklook-key="timelock">Smart contract which restrict an action from taking place before a specified future time. Used at various stages in the governance proposal process.</dd>
   <dt>Tokenbased governance</dt>
   <dd data-quicklook-key="token-based-governance">A protocol governance system in which voting weigh is proportional to ownership of a governance token.</dd>
   <dt>Unclaimed airdrop tokens</dt>
   <dd data-quicklook-key="unclaimed-airdrop-tokens">Tokens in the Token Distributor airdrop contract not claimed by their potential owners. After [TODO], all unclaimed tokens will be sent to the [TODO: treasury…?]</dd>
   <dt>Votable tokens</dt>
   <dd data-quicklook-key="votable-tokens">$ARB tokens claimed through our airdrop. More precisely, all $ARB tokens in existence, except for: - tokens owned by the Arbitrum DAO - tokens owned by the Arbitrum Foundation - airdrop tokens not yet claimed Votable tokens give their holders voting power in direct proportion to the quantity of tokens held. More $ARB == more voting power.</dd>
   <dt>Voting period</dt>
   <dd data-quicklook-key="voting-period">14-16 period after which a proposal is successfully submitted during the Arbitrum DAO votes on it.</dd>
</dl>

import {Quicklooks} from '@site/src/components/Quicklooks';

<Quicklooks />
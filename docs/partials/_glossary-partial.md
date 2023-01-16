<div class="hidden-glossary">

### $ARB {#arb}
Arbitrum's governance token, an ERC-20 token native to the [Arbitrum One](../dao-glossary.md#arbitrum-one) chain. Owning $ARB makes you a member of the [Arbitrum DAO](../dao-glossary.md#arbitrum-dao) and allows you to participate in Arbitrum's on-chain governance.

### $ARB reverse gateway {#arb-reverse-gateway}
A series of smart contracts responsible for bridging [$ARB](../dao-glossary.md#arb) between Ethereum and [Arbitrum One](../dao-glossary.md#arbitrum-one). The $ARB token is native to Arbitrum One, meaning it's minted within a smart contract that lives on the Arbitrum One chain. The "reverse" gateway keeps the full $ARB supply escrowed in Arbitrum One, and mints or burns the L1 token representation upon deposits/withdrawals. The reverse gateway is often compared to the "standard gateway", which mints/burns on L2.

### $ARB standard gateway {#arb-standard-gateway}
A series of smart contracts responsible for bridging [$ARB](../dao-glossary.md#arb) between Ethereum and [Arbitrum One](../dao-glossary.md#arbitrum-one). The $ARB token is native to Arbitrum One, meaning it's minted within a smart contract that lives on the Arbitrum One chain. The "standard" gateway (todo - follow the pattern within reverse gateway)

### Airdrop {#airdrop}
(see body)

### AnyTrust chain {#anytrust-chain}
An Arbitrum chain that implements the [Arbitrum AnyTrust](../dao-glossary.md#arbitrum-anytrust) protocol, a protocol that significantly reduces transaction costs by using a trusted [Data Availability Committee (DAC)](../dao-glossary.md#data-availability-committee-dac) to expedite Ethereum's [Trustless](../dao-glossary.md#trustless) data availability mechanism. [Arbitrum Nova](../dao-glossary.md#arbitrum-nova) is an example of an AnyTrust chain; [Arbitrum One](../dao-glossary.md#arbitrum-one) is not an AnyTrust chain; it's an [Arbitrum Rollup](../dao-glossary.md#arbitrum-rollup) chain.

### Arbitrum AnyTrust {#arbitrum-anytrust}
An Arbitrum protocol that manages data availability with a permissioned set of parties known as the [Data Availability Committee (DAC)](../dao-glossary.md#data-availability-committee-dac). This protocol reduces transaction fees by introducing an additional trust assumption that expedites Ethereum's [Trustless](../dao-glossary.md#trustless) data availability mechanism. [Arbitrum Nova](../dao-glossary.md#arbitrum-nova) is an example of an AnyTrust chain; [Arbitrum One](../dao-glossary.md#arbitrum-one) is an alternative chain that implements the purely trustless [Arbitrum Rollup](../dao-glossary.md#arbitrum-rollup) protocol without introducing additional trust assumptions.

### Arbitrum chain {#arbitrum-chain}
A [Layer 2 (L2)](../dao-glossary.md#layer-2-l2) EVM-compatible blockchain that inherits Ethereum's trust assumptions. Arbitrum chains come in two forms: [Arbitrum Rollup](../dao-glossary.md#arbitrum-rollup) and [Arbitrum AnyTrust](../dao-glossary.md#arbitrum-anytrust). Arbitrum Rollup is fully [Trustless](../dao-glossary.md#trustless) and doesn't introduce additional security assumptions; [Arbitrum AnyTrust](../dao-glossary.md#arbitrum-anytrust)  is cheaper because of the additional trust assumptions that it introduces (see [Data Availability Committee (DAC)](../dao-glossary.md#data-availability-committee-dac)).

### Arbitrum DAO {#arbitrum-dao}
The worldwide community of [$ARB](../dao-glossary.md#arb) token holders and [Delegate](../dao-glossary.md#delegate)s. Governs the [Arbitrum One](../dao-glossary.md#arbitrum-one) chain, the [Arbitrum Nova](../dao-glossary.md#arbitrum-nova) chain, [The Constitution of the Arbitrum DAO](../dao-glossary.md#the-constitution-of-the-arbitrum-dao), and the [Security Council](../dao-glossary.md#security-council).

### Arbitrum DAO Treasury {#arbitrum-dao-treasury}
A smart contract on the [Arbitrum One](../dao-glossary.md#arbitrum-one) chain that contains tokens collectively owned by the [Arbitrum DAO](../dao-glossary.md#arbitrum-dao).

### Arbitrum Foundation {#arbitrum-foundation}
A legal entity that represents the [Arbitrum DAO](../dao-glossary.md#arbitrum-dao). Is bound to the rules articulated within [The Constitution of the Arbitrum DAO](../dao-glossary.md#the-constitution-of-the-arbitrum-dao).

### Arbitrum Foundation tokens {#arbitrum-foundation-tokens}
[$ARB](../dao-glossary.md#arb) tokens owned by the [Arbitrum DAO Treasury](../dao-glossary.md#arbitrum-dao-treasury).

### Arbitrum Improvement Proposal (AIP) {#arbitrum-improvement-proposal-aip}
A [Governance proposal](../dao-glossary.md#governance-proposal) as defined by [The Constitution of the Arbitrum DAO](../dao-glossary.md#the-constitution-of-the-arbitrum-dao).

### Arbitrum Nova {#arbitrum-nova}
The first [Arbitrum AnyTrust](../dao-glossary.md#arbitrum-anytrust) chain running on Ethereum mainnet. Introduces faster and cheaper transactions; great for gaming and social use-cases. Currently in Beta. (TODO - align on retaining Beta after Governance launch)

### Arbitrum One {#arbitrum-one}
The first [Arbitrum Rollup](../dao-glossary.md#arbitrum-rollup) chain running on Ethereum mainnet. Fully [Trustless](../dao-glossary.md#trustless); inherits Ethereum's base-layer security guarantees without introducing additional trust assumptions; great for decentralized finance and other use-cases that demand [Layer 1 (L1)](../dao-glossary.md#layer-1-l1) trustlessness. (Currently in Beta - TODO).

### Arbitrum Rollup {#arbitrum-rollup}
A [Trustless](../dao-glossary.md#trustless), permissionless Arbitrum [Layer 2 (L2)](../dao-glossary.md#layer-2-l2) protocol that uses Ethereum's base layer for data availability. This protocol is implemented by our [Arbitrum One](../dao-glossary.md#arbitrum-one) chain. 

### Claimable airdrop period {#claimable-airdrop-period}
The time period in which eligible [$ARB](../dao-glossary.md#arb) token recipients are able to claim their tokens. (TODO: dates / time)

### Claimed airdrop tokens {#claimed-airdrop-tokens}
[$ARB](../dao-glossary.md#arb) tokens claimed from the Token distributor contract during the [Claimable airdrop period](../dao-glossary.md#claimable-airdrop-period).

### Constitutional proposal {#constitutional-proposal}
As opposed to Non-constitutional proposal. The stricter of the two types of proposals. Refer to <a href='#todo'>The Constitution of the Arbitrum DAO</a> for a more precise definition. (todo - ensure aligned with constitution - and/or reference constitution - ensure that these are updated because they're wrong - also ensure that we want to use this term - align with @Matt Pearring - could just refer to these as AIPs).

### Data Availability Committee (DAC) {#data-availability-committee-dac}
(see body)

### Decentralized apps (dApps) {#decentralized-apps-dapps}
Apps that combine blockchain-based smart contracts with frontend user interfaces. Arbitrum makes it easy for you to build fast Ethereum dApps that inherit Ethereum's security guarantees while keeping costs low for end-users.

### Delegate {#delegate}
A party that has the ability to vote on Arbitrum [Governance proposal](../dao-glossary.md#governance-proposal)s. Could be an [$ARB](../dao-glossary.md#arb) token holder or someone whom other $ARB token holders have delegated their voting power to.

### Emergency action {#emergency-action}
A specific type of protocol upgrade used by the [Security Council](../dao-glossary.md#security-council) in emergency situations, such as fixing a critical vulnerability. (todo - ensure aligned with constitution)

### Ethereum consensus layer (CL) {#ethereum-consensus-layer-cl}
Facilitates staking, peer-to-peer consensus, block creation, and attestations for Ethereum's [Layer 1 (L1)](../dao-glossary.md#layer-1-l1) network. Powered by consensus-layer clients like [Prysm](../dao-glossary.md#prysm), Teku, and Lighthouse.

### Ethereum execution layer (EL) {#ethereum-execution-layer-el}
Facilitates [Smart contract](../dao-glossary.md#smart-contract) logic and execution for Ethereum's [Layer 1 (L1)](../dao-glossary.md#layer-1-l1)  network. Powered by execution-layer clients like [Geth](../dao-glossary.md#geth), Nethermind, and Besu.

### Geth {#geth}
An execution-layer client that defines the Ethereum state transition function and handles network-layer logic like transaction memory pooling. Arbitrum Nitro  utilizes a fork of Geth to ________. 

### Governance {#governance}
The way that decisions get made. Governance of web2 technologies traditionally depends on a board of directors abiding by trusted social contracts, while governance of web3 technologies depends on Decentralized Autonomous Organizations (DAOs) governed through [Trustless](../dao-glossary.md#trustless) [Smart contract](../dao-glossary.md#smart-contract)s. 

### Governance proposal {#governance-proposal}
A proposal to change some aspect of [Arbitrum DAO](../dao-glossary.md#arbitrum-dao)'s governance protocol. There are two types of Arbitrum DAO governance proposals: [Constitutional proposal](../dao-glossary.md#constitutional-proposal)s and Non-constitutional proposals.

### Governance token {#governance-token}
A particular type of token that allows token-holders to vote on governance proposals. [$ARB](../dao-glossary.md#arb) is an example of a governance token; it allows token-holders to create and vote on [Arbitrum DAO](../dao-glossary.md#arbitrum-dao) [Governance proposal](../dao-glossary.md#governance-proposal)s.

### Governor contract {#governor-contract}
Core governance contract in which proposals are submitted, voted on by the [Arbitrum DAO](../dao-glossary.md#arbitrum-dao), and sent off for execution. (todo - clarify this - what does "and sent off for execution" mean)

### Immutable {#immutable}


### Layer 1 (L1) {#layer-1-l1}
The base protocol and underlying blockchain of the Ethereum network. Responsible for maintaining the integrity of the distributed ledger and executing smart contracts. Contains both Ethereum's execution layer and consensus layers.

### Layer 2 (L2) {#layer-2-l2}
Solutions built on top of Ethereum's [Layer 1 (L1)](../dao-glossary.md#layer-1-l1) base protocol, such as state channels, sidechains, and optimistic rollup protocols. Layer 2 solutions generally aim to increase scalability and reduce the cost of transactions on Ethereum's Layer 1.

### Mechanism design {#mechanism-design}
The process of designing protocols - or mechanisms - that incentivize specific behaviors. Within the context of Ethereum, mechanism design usually refers to mechanisms that attempt to align the incentives of participants in order to achieve particular outcomes in a fair and transparent manner. Developers use Arbitrum to implement mechanism designs within their [Decentralized apps (dApps)](../dao-glossary.md#decentralized-apps-dapps).

### Multisignature wallet {#multisignature-wallet}
A wallet that requires multiple private keys to sign transactions. Used by the [Security Council](../dao-glossary.md#security-council) to trigger [Emergency action](../dao-glossary.md#emergency-action)s. Commonly referred to as "multi-sig wallets".

### Node operator {#node-operator}
Anyone who operates a node in the Ethereum ecosystem. There are many types of nodes: execution-layer nodes, consensus-layer nodes, relayers, and sequencers. TODO (frame Arbitrum's node types).

### Off-chain governance {#offchain-governance}
As opposed to on-chain governance or [Smart contract](../dao-glossary.md#smart-contract) governance. Off-chain governance is carried out through social consensus, relationships, and off-chain proposals. The Ethereum Foundation's EIP mechanism is an example of a social governance protocol.

### Off-chain governance action {#offchain-governance-action}
One of two types of governance actions allowed by [The Constitution of the Arbitrum DAO](../dao-glossary.md#the-constitution-of-the-arbitrum-dao). Off-chain actions are actions that are executed without [Smart contract](../dao-glossary.md#smart-contract)s. Updating the text of the Constitution is an example of an off-chain action. Note that in this example, the governance action is facilitated by on-chain [Constitutional proposal](../dao-glossary.md#constitutional-proposal), while the execution of the action happens off-chain.

### On-chain governance {#onchain-governance}
As opposed to off-chain governance, social governance, or pseudo governance. On-chain governance is governance implemented by immutable [Smart contract](../dao-glossary.md#smart-contract)s that allow DAO members to determine - through the use of [Governance proposal](../dao-glossary.md#governance-proposal)s - how the DAO allocates its resources and updates its protocols. The [Arbitrum DAO](../dao-glossary.md#arbitrum-dao) utilizes on-chain governance.

### On-chain governance action {#onchain-governance-action}
One of two types of governance actions allowed by [The Constitution of the Arbitrum DAO](../dao-glossary.md#the-constitution-of-the-arbitrum-dao). On-chain actions are executed as transactions submitted to the [Arbitrum DAO](../dao-glossary.md#arbitrum-dao)'s governance smart contracts. Updating the rate of [$ARB](../dao-glossary.md#arb)  inflation is an example of an on-chain governance action.

### Optimistic rollup protocol {#optimistic-rollup-protocol}
Optimistic rollup protocols are [Layer 2 (L2)](../dao-glossary.md#layer-2-l2) protocols that are designed to extend the throughput of Ethereum's base layer by offloading computation to off-chain nodes. [Arbitrum Rollup](../dao-glossary.md#arbitrum-rollup) is an optimistic rollup protocol that inherits Ethereum's base-layer security guarantees, bringing us one step closer to resolving the blockchain trilemma.

### Presale {#presale}
Also known as an initial coin offering (ICO). Presales are fundraising events in which a new cryptocurrency project sells a portion of its tokens to early backers. <strong><em>Arbitrum DAO did not and will never engage in a presale.</em></strong>

### Progressive decentralization {#progressive-decentralization}
The process of gradually increasing the decentralization of a system over time. In the context of the [Arbitrum DAO](../dao-glossary.md#arbitrum-dao), progressive decentralization refers to decentralizing the ownership of the chain technology, validators, sequencers, and the [Data Availability Committee (DAC)](../dao-glossary.md#data-availability-committee-dac). Refer to The state of Arbitrum's progressive decentralization for more information (TODO).

### Proposal waiting period {#proposal-waiting-period}
A contract-enforced delay period of roughly two weeks that begins after a [Governance proposal](../dao-glossary.md#governance-proposal) is accepted, and after which the proposal takes effect. The proposal waiting period is intended to give users the option of opting out (for example, by withdrawing their funds).

### Prysm {#prysm}
A consensus-layer client that powers Ethereum [Layer 1 (L1)](../dao-glossary.md#layer-1-l1). Originally created by Prysmatic Labs; acquired by Offchain Labs in 2022.

### Security Council {#security-council}
A 12-member council of publicly known entities who hold the private keys to a 12-member [Multisignature wallet](../dao-glossary.md#multisignature-wallet). Members of the council use this wallet to vote on [Emergency action](../dao-glossary.md#emergency-action)s.

### Security Council election {#security-council-election}
A process by which the [Arbitrum DAO](../dao-glossary.md#arbitrum-dao) can reelect the members of the [Security Council](../dao-glossary.md#security-council). Happens twice a year.

### Seed phrase {#seed-phrase}
Also referred to as "recovery phrase" or "backup phrase". A highly sensitive, deterministic sequence of words that you can use to recover your Ethereum wallet's private keys if you lose your credentials or device.

### Smart contract {#smart-contract}
Self-executing code that's stored and executed on the Ethereum blockchain - either on [Layer 1 (L1)](../dao-glossary.md#layer-1-l1) or [Layer 2 (L2)](../dao-glossary.md#layer-2-l2). Smart contracts let you automate tasks and protocols in a [Trustless](../dao-glossary.md#trustless) manner. The [Arbitrum DAO](../dao-glossary.md#arbitrum-dao) uses smart contracts to trustlessly implement the protocol defined by [The Constitution of the Arbitrum DAO](../dao-glossary.md#the-constitution-of-the-arbitrum-dao).

### The Constitution of the Arbitrum DAO {#the-constitution-of-the-arbitrum-dao}
A formal document that lays out the rules, procedures, and community values by which the [Arbitrum DAO](../dao-glossary.md#arbitrum-dao) operates. The hash of the canonical constitution is stored at TODO and is updatable via governance. The protocol outlined by [The Constitution of the Arbitrum DAO](../dao-glossary.md#the-constitution-of-the-arbitrum-dao) is codified within the [Smart contract](../dao-glossary.md#smart-contract)s that facilitate [Arbitrum DAO](../dao-glossary.md#arbitrum-dao) governance.

### Timelock contract {#timelock-contract}
A smart contract that restricts an action from taking place before a specified future time. Used at various stages in the [Arbitrum DAO](../dao-glossary.md#arbitrum-dao)'s governance proposal process.

### Token-weighted governance {#tokenweighted-governance}
A protocol governance system in which voting weight is proportional to ownership of a governance token. The [Arbitrum DAO](../dao-glossary.md#arbitrum-dao) implements token-weighted governance.

### Trustless {#trustless}
see body

### Unclaimed airdrop tokens {#unclaimed-airdrop-tokens}
Claimable [$ARB](../dao-glossary.md#arb) tokens in the Token distributor contract not claimed by their potential owners. After TODO, all unclaimed tokens will be sent to the TODO.

### Votable tokens {#votable-tokens}
see body

### Voting period {#voting-period}
After a proposal is successfully submitted via Tally, members of the [Arbitrum DAO](../dao-glossary.md#arbitrum-dao) have a certain number of days to debate and vote. This is referred to as the [Voting period](../dao-glossary.md#voting-period), and is currently 14-16 days. The voting period is determined by TODO.


</div>

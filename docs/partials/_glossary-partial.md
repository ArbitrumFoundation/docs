<div class="hidden-glossary">

### $ARB {#arb}
Arbitrum's governance token, an ERC-20 token native to the <a href="/dao-glossary#arbitrum-one">Arbitrum One</a> chain. Owning $ARB makes you a member of the <a href="/dao-glossary#arbitrum-dao">Arbitrum DAO</a> and allows you to participate in Arbitrum's on-chain governance.

### $ARB reverse gateway {#arb-reverse-gateway}
A series of smart contracts responsible for bridging <a href="/dao-glossary#arb">$ARB</a> between <a href="/dao-glossary#arbitrum-one">Arbitrum One</a> and Ethereum. The $ARB token is native to Arbitrum One, meaning it's minted within a smart contract that lives on the Arbitrum One chain. The "reverse" gateway keeps the full $ARB supply escrowed in Arbitrum One, and mints or burns the <a href="/dao-glossary#layer-1-l1">Layer 1 (L1)</a> token representation upon deposits/withdrawals. The reverse gateway is often compared to the <a href="/dao-glossary#standard-token-gateway">Standard Token gateway</a>", which mints/burns on <a href="/dao-glossary#layer-2-l2">Layer 2 (L2)</a>.

### Airdrop {#airdrop}
<p>A mechanism that distributes tokens to qualifying wallet addresses, usually based on on-chain activity. The <a href="/dao-glossary#arbitrum-foundation">Arbitrum Foundation</a> airdrop will distribute <a href="/dao-glossary#arb">$ARB</a> tokens to eligible wallet addresses on TODO according to the airdrop eligibility and distribution criteria specified in our <a href='/airdrop-eligibility-distribution'>overview of airdrop eligibility and specifications</a>.</p>

<p></p>



### AnyTrust chain {#anytrust-chain}
An Arbitrum chain that implements the <a href="/dao-glossary#arbitrum-anytrust-protocol">Arbitrum AnyTrust (protocol)</a> protocol, a protocol that significantly reduces transaction costs by using a trusted <a href="/dao-glossary#data-availability-committee-dac">Data Availability Committee (DAC)</a> to in lieu of Ethereum's <a href="/dao-glossary#trustless">Trustless</a> data availability mechanism. <a href="/dao-glossary#arbitrum-nova">Arbitrum Nova</a> is an example of an AnyTrust chain; <a href="/dao-glossary#arbitrum-one">Arbitrum One</a> is not an AnyTrust chain; it's an <a href="/dao-glossary#arbitrum-rollup-protocol">Arbitrum Rollup (protocol)</a> chain.

### Arbitrum AnyTrust (chain) {#arbitrum-anytrust-chain}
An <a href="/dao-glossary#arbitrum-chain">Arbitrum chain</a> that implements the <a href="/dao-glossary#arbitrum-anytrust-protocol">Arbitrum AnyTrust (protocol)</a>.

### Arbitrum AnyTrust (protocol) {#arbitrum-anytrust-protocol}
An Arbitrum protocol that manages data availability with a permissioned set of parties known as the <a href="/dao-glossary#data-availability-committee-dac">Data Availability Committee (DAC)</a>. This protocol reduces transaction fees by introducing an additional trust assumption for data availability in lieu of Ethereum's <a href="/dao-glossary#trustless">Trustless</a> data availability mechanism. <a href="/dao-glossary#arbitrum-nova">Arbitrum Nova</a> is an example of an AnyTrust chain; <a href="/dao-glossary#arbitrum-one">Arbitrum One</a> is an alternative chain that implements the purely trustless (and more expensive) <a href="/dao-glossary#arbitrum-rollup-protocol">Arbitrum Rollup (protocol)</a>.

### Arbitrum chain {#arbitrum-chain}
A blockchain that runs on the Arbitrum protocol. Arbitrum chains are EVM compatible, and use an underlying L1 (Ethereum) for settlement and for succinct fraud-proofs (as needed).  Arbitrum chains come in two forms: <a href="/dao-glossary#arbitrum-rollup-chain">Arbitrum Rollup (chain)</a> and <a href="/dao-glossary#arbitrum-anytrust-chain">Arbitrum AnyTrust (chain)</a>. 

### Arbitrum Chain owner {#arbitrum-chain-owner}
An entity with the affordance to upgrade Arbitrum core protocol contracts and set various system parameters. Arbitrum One has two chain owners: the Arbitrum DAO and the Security Council.

### Arbitrum DAO {#arbitrum-dao}
The worldwide community of <a href="/dao-glossary#arb">$ARB</a> token holders and <a href="/dao-glossary#delegate">Delegate</a>s. Governs the <a href="/dao-glossary#arbitrum-one">Arbitrum One</a> chain, the <a href="/dao-glossary#arbitrum-nova">Arbitrum Nova</a> chain, <a href="/dao-glossary#the-constitution-of-the-arbitrum-dao">The Constitution of the Arbitrum DAO</a>, and the <a href="/dao-glossary#security-council">Security Council</a>.

### Arbitrum DAO Treasury {#arbitrum-dao-treasury}
A smart contract on the <a href="/dao-glossary#arbitrum-one">Arbitrum One</a> chain that contains tokens collectively controlled by the <a href="/dao-glossary#arbitrum-dao">Arbitrum DAO</a>.

### Arbitrum Foundation {#arbitrum-foundation}
A legal entity that represents the <a href="/dao-glossary#arbitrum-dao">Arbitrum DAO</a>. Is bound to the rules articulated within <a href="/dao-glossary#the-constitution-of-the-arbitrum-dao">The Constitution of the Arbitrum DAO</a>.

### Arbitrum Foundation tokens {#arbitrum-foundation-tokens}
<a href="/dao-glossary#arb">$ARB</a> tokens owned by the <a href="/dao-glossary#arbitrum-dao-treasury">Arbitrum DAO Treasury</a>.

### Arbitrum Improvement Proposal (AIP) {#arbitrum-improvement-proposal-aip}
A <a href="/dao-glossary#governance-proposal">Governance proposal</a> as defined by <a href="/dao-glossary#the-constitution-of-the-arbitrum-dao">The Constitution of the Arbitrum DAO</a>. There are two types of AIPs: <a href="/dao-glossary#constitutional-aip">Constitutional AIP</a>s and <a href="/dao-glossary#nonconstitutional-aip">Non-constitutional AIP</a>s.

### Arbitrum Nitro {#arbitrum-nitro}
Current Arbitrum tech stack; runs a fork of <a href="/dao-glossary#geth">Geth</a> directly on <a href="/dao-glossary#layer-2-l2">Layer 2 (L2)</a> and uses WebAssembly as its underlying VM for fraud proofs.

### Arbitrum Nova {#arbitrum-nova}
The first <a href="/dao-glossary#arbitrum-anytrust-chain">Arbitrum AnyTrust (chain)</a> running on Ethereum mainnet. Introduces cheaper transactions; great for gaming and social use-cases. Implements the <a href="/dao-glossary#arbitrum-anytrust-protocol">Arbitrum AnyTrust (protocol)</a>, not the <a href="/dao-glossary#arbitrum-rollup-protocol">Arbitrum Rollup (protocol)</a> protocol. Currently in Beta. (TODO - align on retaining Beta after Governance launch)

### Arbitrum One {#arbitrum-one}
The first <a href="/dao-glossary#arbitrum-rollup-chain">Arbitrum Rollup (chain)</a> running on Ethereum mainnet. Fully <a href="/dao-glossary#trustless">Trustless</a>; inherits Ethereum's base-layer security guarantees without introducing additional trust assumptions; great for decentralized finance and other use-cases that demand <a href="/dao-glossary#layer-1-l1">Layer 1 (L1)</a> trustlessness. (Currently in Beta - TODO).

### Arbitrum Rollup (chain) {#arbitrum-rollup-chain}
An <a href="/dao-glossary#arbitrum-chain">Arbitrum chain</a> that implements the <a href="/dao-glossary#arbitrum-rollup-protocol">Arbitrum Rollup (protocol)</a>.

### Arbitrum Rollup (protocol) {#arbitrum-rollup-protocol}
A <a href="/dao-glossary#trustless">Trustless</a>, permissionless Arbitrum <a href="/dao-glossary#layer-2-l2">Layer 2 (L2)</a> protocol that uses it's underlying base layer (i.e., Ethereum) for data availability and inherits its security. This protocol is implemented by our <a href="/dao-glossary#arbitrum-one">Arbitrum One</a> chain. 

### Claimable airdrop period {#claimable-airdrop-period}
The time period in which eligible <a href="/dao-glossary#arb">$ARB</a> token recipients are able to claim their tokens. (TODO: dates / time)

### Claimed airdrop tokens {#claimed-airdrop-tokens}
<a href="/dao-glossary#arb">$ARB</a> tokens claimed from the <a href="/dao-glossary#token-distributor-contract">Token Distributor Contract</a> during the <a href="/dao-glossary#claimable-airdrop-period">Claimable airdrop period</a>.

### Constitutional AIP {#constitutional-aip}
As opposed to <a href="/dao-glossary#nonconstitutional-aip">Non-constitutional AIP</a>. The stricter of the two types of proposals. Refer to <a href='#todo'>The Constitution of the Arbitrum DAO</a> for a more precise definition. (todo - ensure aligned with constitution - and/or reference constitution - ensure that these are updated because they're wrong - also ensure that we want to use this term - align with @Matt Pearring - could just refer to these as AIPs).

### DAO-governed chains {#daogoverned-chains}
<p>A permissioned set of parties responsible for enforcing data availability in an <a href="/dao-glossary#arbitrum-anytrust-protocol">Arbitrum AnyTrust (protocol)</a> chain. See <a href="https://medium.com/offchainlabs/introducing-anytrust-chains-cheaper-faster-l2-chains-with-minimal-trust-assumptions-31def59eb8d7">Introducing AnyTrust Chains: Cheaper, Faster L2 Chains with Minimal Trust Assumptions</a> to learn more.</p>



### Data Availability Committee (DAC) {#data-availability-committee-dac}
<p>A permissioned set of parties responsible for enforcing data availability in an <a href="/dao-glossary#arbitrum-anytrust-protocol">Arbitrum AnyTrust (protocol)</a> chain. See <a href="https://medium.com/offchainlabs/introducing-anytrust-chains-cheaper-faster-l2-chains-with-minimal-trust-assumptions-31def59eb8d7">Introducing AnyTrust Chains: Cheaper, Faster L2 Chains with Minimal Trust Assumptions</a> to learn more.</p>



### Decentralized apps (dApps) {#decentralized-apps-dapps}
Apps that combine blockchain-based smart contracts with frontend user interfaces. Arbitrum makes it easy for you to build fast Ethereum dApps that inherit Ethereum's security guarantees while keeping costs low for end-users.

### Delegate {#delegate}
A party that has the ability to vote on Arbitrum <a href="/dao-glossary#governance-proposal">Governance proposal</a>s. Could be an <a href="/dao-glossary#arb">$ARB</a> token holder or someone to whom other $ARB token holders have delegated their voting power.

### Emergency action {#emergency-action}
A specific type of governance action used by the <a href="/dao-glossary#security-council">Security Council</a> in emergency situations, such as fixing a critical vulnerability. As opposed to <a href="/dao-glossary#nonemergency-action">Non-emergency action</a>.

### Ethereum consensus layer (CL) {#ethereum-consensus-layer-cl}
Facilitates staking, peer-to-peer consensus, block creation, and attestations for Ethereum's <a href="/dao-glossary#layer-1-l1">Layer 1 (L1)</a> network. Powered by consensus-layer clients like <a href="/dao-glossary#prysm">Prysm</a>, Teku, and Lighthouse.

### Ethereum execution layer (EL) {#ethereum-execution-layer-el}
Facilitates <a href="/dao-glossary#smart-contract">Smart contract</a> logic and execution for Ethereum's <a href="/dao-glossary#layer-1-l1">Layer 1 (L1)</a>  network. Powered by execution-layer clients like <a href="/dao-glossary#geth">Geth</a>, Nethermind, and Besu.

### Geth {#geth}
An execution-layer client that defines the Ethereum State transition function and handles network-layer logic like transaction memory pooling. <a href="/dao-glossary#arbitrum-nitro">Arbitrum Nitro</a> utilizes a fork of Geth to implement Arbitrum's state transition function.

### Governance {#governance}
The way that decisions get made. Governance of web2 technologies traditionally depends on a board of directors abiding by trusted social contracts, while governance of web3 technologies depends on Decentralized Autonomous Organizations (DAOs) governed through <a href="/dao-glossary#trustless">Trustless</a> <a href="/dao-glossary#smart-contract">Smart contract</a>s. 

### Governance proposal {#governance-proposal}
A proposal to change some aspect of <a href="/dao-glossary#arbitrum-dao">Arbitrum DAO</a>'s governance protocol. There are two types of Arbitrum DAO governance proposals: <a href="/dao-glossary#constitutional-aip">Constitutional AIP</a>s and <a href="/dao-glossary#nonconstitutional-aip">Non-constitutional AIP</a>s.

### Governance token {#governance-token}
A particular type of token that allows token-holders to vote on governance proposals. <a href="/dao-glossary#arb">$ARB</a> is an example of a governance token; it allows token-holders to create and vote on <a href="/dao-glossary#arbitrum-dao">Arbitrum DAO</a> <a href="/dao-glossary#governance-proposal">Governance proposal</a>s.

### Governor contract {#governor-contract}
<p>Internal only? Talking about the contract itself feels "implementation detail" to me</p>

<p></p>



### Immutable {#immutable}
<p>In the context of Ethereum, immutability refers to the inability to change the data recorded in the blockchain. You can think of Ethereum's blockchain as a decentralized, distributed linked-list data structure that stores the entire history of transactions within a globally distributed network of computers running Ethereum client software.<br />
<br />
The client software implements a protocol that stores transaction history within a data structure known as a "block"; blocks are linked to other blocks in chronological order. Because each block contains a cryptographic hash of the previous block, it's extremely difficult to change transaction data after it's been recorded as canonical by the network.<br />
</p>

<p></p>



### Layer 1 (L1) {#layer-1-l1}
The base protocol and underlying blockchain of the Ethereum network. Responsible for maintaining the integrity of the distributed ledger and executing smart contracts. Contains both Ethereum's execution layer and consensus layer.

### Layer 2 (L2) {#layer-2-l2}
Trustless scaling solutions built on top of Ethereum's <a href="/dao-glossary#layer-1-l1">Layer 1 (L1)</a> base protocol, such as state channels,  plasma chains, optimistic rollups, and ZK-rollups. Layer 2 solutions aim to increase scalability and reduce the cost of transactions on Ethereum's Layer 1 without introducing additional trust assumptions.

### Mechanism design {#mechanism-design}
The process of designing protocols - or mechanisms - that incentivize specific behaviors. Within the context of Ethereum, mechanism design usually refers to mechanisms that attempt to align the incentives of participants in order to achieve particular outcomes in a fair and transparent manner. Developers use Arbitrum to implement mechanism designs within their <a href="/dao-glossary#decentralized-apps-dapps">Decentralized apps (dApps)</a>.

### Multisignature wallet {#multisignature-wallet}
A wallet that requires multiple private keys to sign transactions. Used by the <a href="/dao-glossary#security-council">Security Council</a> to trigger <a href="/dao-glossary#emergency-action">Emergency action</a>s. Commonly referred to as "multi-sig wallets".

### Node operator {#node-operator}
Anyone who operates a node in the Ethereum ecosystem. There are many types of nodes: execution-layer nodes, consensus-layer nodes, relayers, and sequencers. TODO (frame Arbitrum's node types) [DG: not so sure what to do w/ this one].

### Non-constitutional AIP {#nonconstitutional-aip}
One of two types of <a href="/dao-glossary#arbitrum-dao">Arbitrum DAO</a> <a href="/dao-glossary#governance-proposal">Governance proposal</a>s (the other being <a href="/dao-glossary#constitutional-aip">Constitutional AIP</a>). Non-constitutional AIPs are those that don't meet the criteria to be considered "constitutional".

### Non-emergency action {#nonemergency-action}
Routine actions taken by the <a href="/dao-glossary#security-council">Security Council</a>, such as software upgrades and maintenance. Emergency actions are activated only after a delay, as opposed to <a href="/dao-glossary#emergency-action">Emergency action</a>.

### Off-chain governance {#offchain-governance}
As opposed to on-chain governance or <a href="/dao-glossary#smart-contract">Smart contract</a> governance. Off-chain governance is carried out through social consensus, and off-chain proposals. The Ethereum Foundation's EIP mechanism is an example of an off-chain governance protocol.

### Off-chain governance action {#offchain-governance-action}
One of two types of governance actions allowed by <a href="/dao-glossary#the-constitution-of-the-arbitrum-dao">The Constitution of the Arbitrum DAO</a>. Off-chain actions are actions that are executed without <a href="/dao-glossary#smart-contract">Smart contract</a>s. An example of an off-chain governance action is taking a "temperature check" on a proposal before submitted it to the <a href="/dao-glossary#governor-contract">Governor contract</a>.  

### On-chain governance {#onchain-governance}
As opposed to off-chain governance, social governance, or pseudo governance. On-chain governance is governance implemented by <a href="/dao-glossary#smart-contract">Smart contract</a>s that allow DAO members to determine - through the use of <a href="/dao-glossary#governance-proposal">Governance proposal</a>s - how the DAO allocates its resources and updates its protocols. The <a href="/dao-glossary#arbitrum-dao">Arbitrum DAO</a> utilizes on-chain governance.

### On-chain governance action {#onchain-governance-action}
One of two types of governance actions allowed by <a href="/dao-glossary#the-constitution-of-the-arbitrum-dao">The Constitution of the Arbitrum DAO</a>. On-chain actions are executed as transactions submitted to the <a href="/dao-glossary#arbitrum-dao">Arbitrum DAO</a>'s governance smart contracts. Updating the rate of <a href="/dao-glossary#arb">$ARB</a>  inflation is an example of an on-chain governance action.

### Optimistic rollup protocol {#optimistic-rollup-protocol}
Optimistic rollup protocols are <a href="/dao-glossary#layer-2-l2">Layer 2 (L2)</a> protocols that are designed to extend the throughput of Ethereum's base layer by using the base later for data availability and offloading computation to off-chain nodes. <a href="/dao-glossary#arbitrum-rollup-protocol">Arbitrum Rollup (protocol)</a> is an optimistic rollup protocol that inherits Ethereum's base-layer security guarantees.

### Presale {#presale}
Also known as an initial coin offering (ICO). Presales are fundraising events in which a new cryptocurrency project sells a portion of its tokens to early backers. <strong><em>Arbitrum DAO did not and will never engage in a presale.</em></strong>

### Progressive decentralization {#progressive-decentralization}
The process of gradually increasing the decentralization of a system over time. In the context of the <a href="/dao-glossary#arbitrum-dao">Arbitrum DAO</a>, and decentrlizing <a href="/dao-glossary#arbitrum-one">Arbitrum One</a> and <a href="/dao-glossary#arbitrum-nova">Arbitrum Nova</a>, progressive decentralization refers to decentralizing the ownership of the chains, validators, sequencers, and the <a href="/dao-glossary#data-availability-committee-dac">Data Availability Committee (DAC)</a>. Refer to The state of Arbitrum's progressive decentralization for more information (TODO Link).

### Proposal waiting period {#proposal-waiting-period}
A contract-enforced delay period of roughly two weeks that begins after a <a href="/dao-glossary#governance-proposal">Governance proposal</a> is accepted, and after which the proposal takes effect. The proposal waiting period is intended to give users the option of opting out (for example, by withdrawing their funds).

### Prysm {#prysm}
A consensus-layer client that powers Ethereum <a href="/dao-glossary#layer-1-l1">Layer 1 (L1)</a>. Originally created by Prysmatic Labs; acquired by Offchain Labs in 2022.

### Security Council {#security-council}
A 12-member council of publicly known entities who hold the private keys to a 12-member <a href="/dao-glossary#multisignature-wallet">Multisignature wallet</a>. Members of the council use this wallet to perform <a href="/dao-glossary#emergency-action">Emergency action</a>s and <a href="/dao-glossary#nonemergency-action">Non-emergency action</a>s.

### Security Council election {#security-council-election}
A process by which the <a href="/dao-glossary#arbitrum-dao">Arbitrum DAO</a> can reelect the members of the <a href="/dao-glossary#security-council">Security Council</a>. Happens twice a year.

### Seed phrase {#seed-phrase}
Also referred to as "recovery phrase" or "backup phrase". A highly sensitive, deterministic sequence of words that you can use to recover your Ethereum wallet's private keys if you lose your credentials or device.

### Smart contract {#smart-contract}
Self-executing code that's stored and executed on the Ethereum blockchain - either on <a href="/dao-glossary#layer-1-l1">Layer 1 (L1)</a> or <a href="/dao-glossary#layer-2-l2">Layer 2 (L2)</a>. Smart contracts let you automate tasks and protocols in a <a href="/dao-glossary#trustless">Trustless</a> manner. The <a href="/dao-glossary#arbitrum-dao">Arbitrum DAO</a> uses smart contracts to trustlessly implement the protocol defined by <a href="/dao-glossary#the-constitution-of-the-arbitrum-dao">The Constitution of the Arbitrum DAO</a>.

### Standard Token gateway {#standard-token-gateway}
<p></p>



### The Constitution of the Arbitrum DAO {#the-constitution-of-the-arbitrum-dao}
A formal document that lays out the rules, procedures, and community values by which the <a href="/dao-glossary#arbitrum-dao">Arbitrum DAO</a> operates. The hash of the canonical constitution is stored at TODO and is updatable via governance. The protocol outlined by <a href="/dao-glossary#the-constitution-of-the-arbitrum-dao">The Constitution of the Arbitrum DAO</a> is codified within the <a href="/dao-glossary#smart-contract">Smart contract</a>s that facilitate <a href="/dao-glossary#arbitrum-dao">Arbitrum DAO</a> governance.

### Timelock contract {#timelock-contract}
A smart contract that restricts an action from taking place before a specified future time. Used at various stages in the <a href="/dao-glossary#arbitrum-dao">Arbitrum DAO</a>'s governance proposal process.

### Token Distributor Contract {#token-distributor-contract}
<a href="/dao-glossary#smart-contract">Smart contract</a> responsible for holding and distribiting <a href="/dao-glossary#arb">$ARB</a> tokens for the initial <a href="/dao-glossary#airdrop">Airdrop</a>.

### Token-weighted governance {#tokenweighted-governance}
A protocol governance system in which voting weight is proportional to ownership of a governance token. The <a href="/dao-glossary#arbitrum-dao">Arbitrum DAO</a> implements token-weighted governance.

### Transparency report {#transparency-report}
A report that explains what actions were taken and why, especially after <a href="/dao-glossary#emergency-action">Emergency action</a>s executed by the <a href="/dao-glossary#security-council">Security Council</a>.

### Trustless {#trustless}
<p>In the context of Ethereum, trustless refers to the ability of a system to operate without reliance on a central authority or intermediary. Instead, users place their trust in math and protocols.<br />
<br />
This is achieved through the use of cryptographic techniques and decentralized consensus mechanisms that let users verify the integrity of network transactions using open-source software. Trustless systems are considered to be more secure and resistant to fraud or tampering because they don't rely on a single point of failure that can be exploited by attackers.</p>

<p></p>



### Unclaimed airdrop tokens {#unclaimed-airdrop-tokens}
Claimable <a href="/dao-glossary#arb">$ARB</a> tokens in the <a href="/dao-glossary#token-distributor-contract">Token Distributor Contract</a> not claimed by their potential owners before. After TODO, all unclaimed tokens will be sent to the <a href="/dao-glossary#arbitrum-dao-treasury">Arbitrum DAO Treasury</a>.

### Votable tokens {#votable-tokens}
<p><a href="/dao-glossary#arb">$ARB</a> tokens claimed through our <a href="/dao-glossary#airdrop">Airdrop</a>. More precisely, all $ARB tokens in existence, except for:</p>

<p></p>

<ul><li>tokens owned by the <a href="/dao-glossary#arbitrum-dao">Arbitrum DAO</a></li>
<li>tokens owned by the <a href="/dao-glossary#arbitrum-foundation">Arbitrum Foundation</a></li>
<li>airdrop tokens not yet claimed</li>
</ul>
<p><br />
Votable tokens give their holders voting power in direct proportion to the quantity of tokens held. More $ARB == more voting power.</p>



### Voting period {#voting-period}
14-16 days after an <a href="/dao-glossary#arbitrum-improvement-proposal-aip">Arbitrum Improvement Proposal (AIP)</a> is successfully submitted during which members of the <a href="/dao-glossary#arbitrum-dao">Arbitrum DAO</a> can vote for or against.<br />



</div>

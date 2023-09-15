## Governance architecture

### What is the Arbitrum Foundation? What is its relationship to the Arbitrum DAO? {#what-is-the-arbitrum-foundation-what-is-its-relationship-to-the-arbitrum-dao}
<p>The Arbitrum Foundation is a company that operates in service of — and is governed by — Arbitrum DAO. For details, see <a href="https://docs.arbitrum.foundation/foundational-documents/transparency-report-initial-foundation-setup#1-foundation-governance-directors">transparency report</a>.</p>

<p></p>



### What's the state of the decentralization of the DAO governed Arbitrum chains? {#whats-the-state-of-the-decentralization-of-the-dao-governed-arbitrum-chains}
<p>Arbitrum chains' state of decentralization comes down to roughly three things: chain ownership, validation, and sequencing. For the <a href="/dao-glossary#daogoverned-chains"><strong>DAO-governed chains</strong></a>, the DAO has the ability to modify the status of these things; for the current status of <a href="/dao-glossary#arbitrum-one">Arbitrum One</a> and <a href="/dao-glossary#arbitrum-nova">Arbitrum Nova</a>, see <a href="https://docs.arbitrum.foundation/state-of-progressive-decentralization">"state of progressive dentralization."</a>. </p>



### Who gets the transaction fees on Arbitrum One and Nova? {#who-gets-the-transaction-fees-on-arbitrum-one-and-nova}
<p>On Arbitrum One, all fee profits are collected by the Arbitrum DAO; a portion of fees are sent to the <a href="/dao-glossary#sequencer">Sequencer</a>, but only to refund the Sequencer the price it pays for posting batches on L1.</p>

<p></p>

<p>Arbitrum Nova works similarly, except a portion of the profits are sent to the <a href="/dao-glossary#data-availability-committee-dac">Data Availability Committee (DAC)</a>. </p>

<p></p>

<p>For more, see "<a href="https://docs.arbitrum.foundation/fee-distribution">fee distribution</a>."</p>

<p></p>



### Will there ever be more than the two current Arbitrum DAO governed chains (Arbitrum One and Nova)? {#will-there-ever-be-more-than-the-two-current-arbitrum-dao-governed-chains-arbitrum-one-and-nova}
<p>It's up to the DAO; the DAO has license to deploy new governed L2 chains via a core <a href="/dao-glossary#governance-proposal">Governance proposal</a>.  </p>

<p></p>



### Why are there there two "governor" contracts, "Core" and "Treasury"? What's the difference? {#why-are-there-there-two-governor-contracts-core-and-treasury-whats-the-difference}
<p>The <a href="/dao-glossary#core-governor">Core Governor</a> handles <a href="/dao-glossary#constitutional-aip">Constitutional AIP</a>s; these can modify core, critical parts of the system, and are executed only after a delay, ensuring users have a window to withdraw before they effectuate. The <a href="/dao-glossary#treasury-governor">Treasury Governor</a> handles non-constitutional changes, like distributing funds out of the <a href="/dao-glossary#arbitrum-dao-treasury">Arbitrum DAO Treasury</a>; these are effectuated faster than core governance proposals.</p>



### Why can't the Arbitrum DAO use social forms of governance like Ethereum? Why does L2 governance need to be on-chain? {#why-cant-the-arbitrum-dao-use-social-forms-of-governance-like-ethereum-why-does-l2-governance-need-to-be-onchain}
<p>Layer 1 chains like Ethereum are ultimately governed by social consensus. L2s like Arbitrum One, by contrast, derive their security from smart contracts on L1; thus, changes to the core system need to made explicitly via on-chain smart contract upgrade. See "<a href="https://docs.arbitrum.foundation/why-governance">Why Governance</a>" for more.</p>

<p></p>



### Where can I find the smart contracts that power Arbitrum DAO's governance mechanisms? {#where-can-i-find-the-smart-contracts-that-power-arbitrum-daos-governance-mechanisms}
<p>See <a href="https://github.com/ArbitrumFoundation/governance">here</a> for the codebase and <a href="https://docs.arbitrum.foundation/deployment-addresses">here</a> for the deployment addresses. </p>

<p></p>



### What is the relationship between Orbit chains and the Arbitrum DAO?  {#what-is-the-relationship-between-orbit-chains-and-the-arbitrum-dao-}
<p><a href="https://docs.arbitrum.io/launch-orbit-chain/orbit-gentle-introduction">Orbit chains</a> are Arbitrum chains that run as <a href="/dao-glossary#child-chain">Child chain</a>s on top of one of the <a href="/dao-glossary#daogoverned-chains"><strong>DAO-governed chains</strong></a>. Orbit chains themselves can be deployed permissionlessly, and are not directly governed by the Arbitrum DAO (the deployer can create an Orbit chain with any governance mechanism or lack thereof that they choose).</p>

<p></p>



### What's the difference between on-chain actions and off-chain actions? {#whats-the-difference-between-onchain-actions-and-offchain-actions}
<p><a href="/dao-glossary#onchain-governance-action">On-chain governance action</a>s are actions that are actuated directly by the governance smart contracts of the <a href="/dao-glossary#arbitrum-dao">Arbitrum DAO</a> as transactions on a blockchain. <a href="/dao-glossary#offchain-governance-action">Off-chain governance action</a>s are actions that are actuated by other means, i.e., updating node software (not smart contracts).</p>

### What does it mean for an ARB voter to "exclude" their votes? Why is this functionality beneficial?   {#what-does-it-mean-for-an-arb-voter-to-exclude-their-votes-why-is-this-functionality-beneficial--}
<p>An $ARB holder can exclude their votes by delegating to a special exclude address (<a href="https://arbiscan.io/address/0x00000000000000000000000000000000000a4b86">0x00000000000000000000000000000000000a4b86</a>). This means their tokens' votes won't count in the denominator for <a href="/dao-glossary#quorum">Quorum</a>  calculation (5% of votable tokens for the <a href="/dao-glossary#core-governor">Core Governor</a>, 3% for the <a href="/dao-glossary#treasury-governor">Treasury Governor</a>). This is useful to prevent "artificially" inflating the quorum requirement for token holder that can't or don't plan on voting. The primary user case for the exclude address is the <a href="/dao-glossary#arbitrum-dao-treasury">Arbitrum DAO Treasury</a>, which is currently the largest single holder of $ARB and is delegated to the exclude address, but any address capable of delegating can opt to delegate to the exclude address as well.</p>

<p></p>



## $ARB token and airdrop

### When does the $ARB airdrop end? {#when-does-the-arb-airdrop-end}
<p>The $ARB airdrop ends at L1 Ethereum block <a href="https://etherscan.io/block/countdown/18208000">18208000</a> (estimated to be 9/24/23).</p>



### What happens to all of the $ARB tokens that don't get claimed in the airdrop? {#what-happens-to-all-of-the-arb-tokens-that-dont-get-claimed-in-the-airdrop}
<p>After the end of the airdrop, unclaimed $ARB tokens gets sent to the DAO; i.e., they get transferred to the <a href="/dao-glossary#arbitrum-dao-treasury">Arbitrum DAO Treasury</a>. </p>

<p></p>



### What are the tokenomics of the ARB token? Is it inflationary?  {#what-are-the-tokenomics-of-the-arb-token-is-it-inflationary-}
<p>$ARB was created with an initial supply of 10 Billion. The DAO can choose to increase the supply by at most 2% per year via a core proposal; March 15, 2024 will be first date on which one of these minting events becomes possible. </p>

<p></p>



### Where can I find a breakdown of the $ARB token eligibility and distribution details? {#where-can-i-find-a-breakdown-of-the-arb-token-eligibility-and-distribution-details}
<p><a href="https://docs.arbitrum.foundation/airdrop-eligibility-distribution">Here.</a></p>

### What purpose does the $ARB token serve? {#what-purpose-does-the-arb-token-serve}
<p>The <a href="/dao-glossary#arb">$ARB</a>  token is the governance token of the <a href="/dao-glossary#arbitrum-dao">Arbitrum DAO</a>. Holders of $ARB can vote (or <a href="/dao-glossary#delegate">Delegate</a> their votes to others) on-chain to enact changes to the <a href="/dao-glossary#daogoverned-chains"><strong>DAO-governed chains</strong></a>, distribute funds from the <a href="/dao-glossary#arbitrum-dao-treasury">Arbitrum DAO Treasury</a>, elect new members of the <a href="/dao-glossary#security-council">Security Council</a>, and more. </p>

### When we say that $ARB is native to the Arbitrum One chain, what does "native" mean? {#when-we-say-that-arb-is-native-to-the-arbitrum-one-chain-what-does-native-mean}
<p>"Native" here means that the $ARB token contract on <a href="/dao-glossary#arbitrum-one">Arbitrum One</a> is the canonical one; this means that supply in the Arbitrum One $ARB contract always represents the total circulating supply. Generally, the experience of bridging or otherwise interacting with $ARB will, from a user perspective, be similar to the UX of using an L1-native token bridged to Arbitrum.  </p>

<p></p>



## Security council

### What is the purpose of the Security Council? {#what-is-the-purpose-of-the-security-council}
<p>The<a href="/dao-glossary#security-council">Security Council</a>'s primary responsibility is to act quickly to fix critical vulnerabilities in <a href="/dao-glossary#daogoverned-chains"><strong>DAO-governed chains</strong></a>. The Security Council can also initiate <a href="/dao-glossary#nonemergency-action">Non-emergency action</a>s.    </p>

<p></p>



### How are members of the Security Council elected? {#how-are-members-of-the-security-council-elected}
<p>Members of the <a href="/dao-glossary#security-council">Security Council</a> are split into two six-member cohorts, one of which is up for on-chain election every six months.</p>

<p>See <a href="https://arbitrumfoundation.medium.com/security-council-elections-101-3cbdee20ca82">here</a> for more info.</p>



### What's the difference between Security Council Emergency Actions and Non-Emergency Actions? {#whats-the-difference-between-security-council-emergency-actions-and-nonemergency-actions}
<p><a href="/dao-glossary#emergency-action">Emergency action</a>s are actions taken by the <a href="/dao-glossary#security-council">Security Council</a> in response to a security emergency, such as a critical vulnerability that could significantly compromise the integrity, confidentiality, or availability of a chain governed by the <a href="/dao-glossary#arbitrum-dao">Arbitrum DAO</a>. They require 9 of the 12 Security Council members to sign, and the are executed immediately.  At the appropriate time, emergency actions are to be followed by a <a href="/dao-glossary#transparency-report">Transparency report</a>. </p>

<p></p>

<p> <a href="/dao-glossary#nonemergency-action">Non-emergency action</a>s are routine actions taken by the Security Council, such as software upgrades and maintenance. They require signatures from 7 of 12 Security Council members. They take effect after a delay of at least 13 days, ensuring users can withdraw their funds prior to execution.</p>

<p>Information about non-emergency actions is to be provided by the Security Council prior to the action being submitted on chain.</p>



### If a member of the Security Council isn't fulfilling their duties, what options does the DAO have?  {#if-a-member-of-the-security-council-isnt-fulfilling-their-duties-what-options-does-the-dao-have-}
<p>If the DAO deems that a member of the <a href="/dao-glossary#security-council">Security Council</a>  isn't adequately fulfilling their duties and needs to be replaced, there are several options, in increasing order of urgency of the situation:</p>

<ol><li>Each seat in the Security Council is up for election once a year; the DAO can wait until the next appropriate election vote the member out then.</li>
<li>At any time, the DAO can submit a proposal to remove a member of the Security Council.</li>
<li>A threshold of 9 members of the Security Council can remove a member without an additional vote or delay.</li>
</ol>
<p></p>



## Governance proposals

### How are AIPs created and voted on? {#how-are-aips-created-and-voted-on}
<p><a href="/dao-glossary#arbitrum-improvement-proposal-aip">Arbitrum Improvement Proposal (AIP)</a>s are created by suggesting them on the <a href="/dao-glossary#arbitrum-dao-governance-forum">Arbitrum DAO governance forum</a> and discussing/debating them for 1 week. AIPs should be accompanied by a <a href="/dao-glossary#snapshot-poll">Snapshot poll</a>, which can only be submitted by an address that can vote at least 0.01% of the <a href="/dao-glossary#votable-tokens">Votable tokens</a>. If an AIP receives sufficient support, it moves on to a voting process, where holders of votable tokens (or the delegates that those holders have delegated their tokens' voting power to) can formally vote on the proposal.</p>

### What are the requirements for submitting a proposal? {#what-are-the-requirements-for-submitting-a-proposal}
<p>Proposal can be submitted by a <a href="/dao-glossary#delegate">Delegate</a> who meets the proposal threshold of 1 million votes; this requirement exists to mitigate spam.</p>

<p></p>



### What determines the "quorum" (minimum votes required) for a governance proposal? {#what-determines-the-quorum-minimum-votes-required-for-a-governance-proposal}
<p>A <a href="/dao-glossary#core-governor">Core Governor</a> requires participation of 5% of the votable tokens; the <a href="/dao-glossary#treasury-governor">Treasury Governor</a> requires 3%. "Votable tokens" here refers to the total $ARB supply, excluding tokens delegated to the <a href="/dao-glossary#exclude-address">Exclude Address</a>.  </p>



### Why is there a delay between a proposal "passing" (getting enough votes) and actually taking effect? Why can't it take effect right away?  {#why-is-there-a-delay-between-a-proposal-passing-getting-enough-votes-and-actually-taking-effect-why-cant-it-take-effect-right-away-}
<p>For <a href="/dao-glossary#core-governor">Core Governor</a> proposals, the delay (at least 13 days) after the voting period end exists to ensure that even after a proposal passes, users have an opportunity to withdraw their funds before the proposal takes effect.</p>

<p></p>



### Why does the DAO have "14-16" days to vote on proposals? What causes this two-day range? {#why-does-the-dao-have-1416-days-to-vote-on-proposals-what-causes-this-twoday-range}
<p>Proposals have a <a href="/dao-glossary#voting-period">Voting period</a> of at least 14 days. When and if <a href="/dao-glossary#quorum">Quorum</a> is reached, delegates are guaranteed to have at least two more days to vote. Thus, if quorum is reached in the day 12  - day 14 range, the voting period ends in the day 14 - day 16 range.</p>

<p></p>



### Where can I see a list of all Arbitrum DAO governance proposals? {#where-can-i-see-a-list-of-all-arbitrum-dao-governance-proposals}
<p>Visit the Tally governance page! <br />
<a href="https://www.tally.xyz/gov/arbitrum">https://www.tally.xyz/gov/arbitrum</a></p>

## Delegation

### Are there any monetary incentives for being a delegate? {#are-there-any-monetary-incentives-for-being-a-delegate}
<p>Nope, just the great feeling of representing the Arbitrum DAO. 😊</p>

### How do I assign my voting power to a delegate? {#how-do-i-assign-my-voting-power-to-a-delegate}
<p>Visit <a href="https://www.tally.xyz/gov/arbitrum/delegates">this page</a>, find the delegate you want to have to represent you, and follow the prompts! <a href="https://forum.arbitrum.io/login">https://forum.arbitrum.io/login</a></p>

### What are the requirements for being a delegate? {#what-are-the-requirements-for-being-a-delegate}
<p>There are none (technically)! You just have to own <a href="/dao-glossary#arb">$ARB</a> and/or appeal to the community on why they should choose you to represent them when voting on proposals in governance.</p>

### How do I become a delegate? {#how-do-i-become-a-delegate}
<p>An Arbitrum DAO delegate is anyone to whom an <a href="/dao-glossary#arb">$ARB</a> holder has delegated votes. So to become a delegate, you can either get an $ARB holder to delegate their votes to you, or, if you hold $ARB, you can delegate votes to yourself. </p>



### Can I delegate my voting power to more than one delegate? {#can-i-delegate-my-voting-power-to-more-than-one-delegate}
<p>Yes; voting power can be split between any number of delegates.</p>


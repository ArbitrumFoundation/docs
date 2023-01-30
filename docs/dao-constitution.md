---
id: dao-constitution
title: The Constitution of the Arbitrum DAO
sidebar_label: The Constitution of the Arbitrum DAO
description: todo:qqq
---


```
todos: 
 - fact check
 - ask questions and add to FAQ
 - continue refining term definitions
```

<div id='constitution'>
<p>This Constitution of the Arbitrum DAO takes effect on the date upon which AIP-1 is posted, located at <a href="#todo">TODO</a>.</p>
<p>Some of the rules and procedures of this Constitution will be enforced directly by smart contracts on a blockchain, and some will not. All rules are equally binding. Actions taken under this Constitution may be on-chain or off-chain actions. On-chain actions are those that are actuated directly by the governance smart contracts of the DAO as transactions on a blockchain. Off-chain actions are those that are actuated by other means.</p>
<p>This Constitution also includes some &quot;recommended guidelines&quot; which are non-binding but strongly recommended as good governance practice.</p>
<p>This Constitution describes the procedures by which it may be amended. For more information regarding the governance framework of the Arbitrum DAO and Arbitrum Foundation, please see AIP-1.</p>
<p><strong>Definitions</strong>:</p>
<ul>
    <li><strong>AIP</strong>: An Arbitrum Improvement Proposal</li>
    <li><strong>AIP-1</strong>: Arbitrum Improvement Proposal - 1: Arbitrum Proposal Framework</li>
    <li><strong>Arbitrum DAO-governed chains</strong>: The Arbitrum One and Arbitrum Nova chains and any additional chains authorized by the Arbitrum DAO</li>
    <li><strong>Votable Tokens</strong>: All $ARB tokens in existence, excluding any tokens held by the Arbitrum Foundation and any unclaimed airdrops</li>
</ul>
<h3 id="section-1-chain-ownership-">Section 1: Chain &quot;ownership&quot;</h3>
<p>This Constitution describes the decision-making framework for the Arbitrum DAO governance of the Arbitrum DAO-governed chains. The DAO may authorize the creation of additional chains using the Arbitrum technology, but each additional chain must be authorized by a corresponding AIP (i.e., no more than one chain may be authorized in each AIP). Any chain that is so authorized must be governed solely by this Constitution and the procedures as described in AIP-1.</p>
<p>The Arbitrum protocol allows each chain to have one or more &quot;chain owners&quot; who have the power to take administrative actions that change a chain&#39;s core protocol and code and/or alter any of its core parameters. The &quot;chain owner&quot; will also have the power to upgrade certain associated Layer 1 contracts. The &quot;chain owner&quot; will control affordances on the chain such as updating the contract implementation of any of Arbitrum&#39;s core protocol <a href="https://developer.arbitrum.io/useful-addresses">Transparent Upgradeable Proxy contracts</a>, and adjusting system parameters via, e.g., setter methods in the <a href="https://github.com/OffchainLabs/nitro/blob/master/contracts/src/precompiles/ArbOwner.sol">ArbOwner</a> precompile.</p>
<p>With the $ARB token generation event and subsequent creation of the Arbitrum DAO having occurred, &quot;owner&quot; privileges on both chains have been given to both the Arbitrum DAO and the Security Council of the Arbitrum Foundation.</p>
<h3 id="section-2-dao-proposals-and-voting-procedures">Section 2: DAO Proposals and Voting Procedures</h3>
<p>The following process governs the rules and procedures by which the Arbitrum DAO may propose, vote on and implement Arbitrum Improvement Proposals (AIPs). No AIP may be in violation of applicable laws, in particular sanctions-related regulations.</p>
<ol>
    <li><strong>Phase 1: Temperature Check (1 week) (Optional but Recommended):</strong> The AIP is suggested on the public forum and discussed/debated for <strong>1 week</strong>. The AIP should be accompanied by a Snapshot poll or other method as determined pursuant to the governance process, which can only be submitted by an address that can vote at least 0.01% of the Votable Tokens. The Snapshot poll runs for 7 days, and is decided by a simple majority with no required participation threshold. An AIP that fails the temperature check should not be submitted for a vote. If an AIP fails the temperature check, or has not undergone a temperature check, as a matter of good governance practice, it is recommended that voters strongly consider voting to reject it.</li>
    <li>
        <p><strong>Phase 2: Formal AIP and call for voting (3 days):</strong> The AIP is submitted via governance contracts on Arbitrum One, with a user interface available on [Tally]. The AIP proposer is required to have an address that contains or is delegated at least 0.1% of the Votable Tokens. All votes controlled by the AIP proposer will be counted as voting in favor of the AIP.</p>
        <p>After 3 days, a voter distribution snapshot will be taken and the voting period will begin; this gives interested parties time to discuss the AIP and gather votes before the voter distribution snapshot is taken.</p>
        <p>Each AIP must be labeled as Constitutional or non-Constitutional.</p>
        <p>A Constitutional AIP is one that:</p>
        <ul>
            <li><strong>Process</strong>: Modifies the text or procedures of this Constitution or AIP-1</li>
            <li><strong>Software update</strong>: Installs or modifies software on any chain</li>
            <li><strong>Core</strong>: Takes any action that requires &quot;chain owner&quot; permission on any chain</li>
        </ul>
        <p>Recommended guideline: DAO members should vote against any AIP that is incorrectly labeled.</p>
        <p>A Non-Constitutional AIP is one that is not considered a &quot;Constitutional AIP&quot; including:</p>
        <ul>
            <li><strong>Funding</strong>: Requests funds/grants or otherwise propose how to spend or allocate funds held by the Arbitrum Foundation</li>
            <li><strong>Informational</strong>: Provides general guidelines or information to the community but does not otherwise propose a new feature or update</li>
        </ul>
        <p>Each AIP must also clearly specify which Arbitrum DAO-governed chain(s) it will affect (this may be specified by code, data, or text, as appropriate for the specific AIP).</p>
        <p>As a recommended guideline, an AIP should include:</p>
        <ul>
            <li>Abstract - Two or three sentences that summarize the AIP.</li>
            <li>Motivation - A statement on why the Arbitrum community should implement the AIP.</li>
            <li>Rationale - An explanation of how the AIP aligns with the Arbitrum community&#39;s mission and guiding values.</li>
            <li>Key Terms (optional) - Definitions of any terms within the proposal that are unique to the proposal, new to the Arbitrum community, and/or industry-specific.</li>
            <li>Specifications - A detailed breakdown of the platforms and technologies that will be used.</li>
            <li>Steps to Implement - The steps to implement the AIP, including associated costs, manpower, and other resources for each step where applicable. For the avoidance of doubt, any AIPs involving transactions with third parties (such as grants) will need to ensure that applicable legal documentation and procedures are also included.</li>
            <li>Timeline - Relevant timing details, including but not limited to start date, milestones, and completion dates.</li>
            <li>Overall Cost - The total cost to implement the AIP.</li>
        </ul>
        <p>As a recommended guideline, the AIP author can add additional fields to any template if necessary to fully communicate the intentions, specifics and implications of the AIP.</p>
        <p>As a recommended guideline, resubmitted AIPs should also include:</p>
        <ul>
            <li>A link to the original AIP;</li>
            <li>Reasons such original AIP was not approved;</li>
            <li>Changes that have been made and why it should now be approved; and</li>
            <li>Any additional fields to any template if necessary to fully communicate the changes made and the intentions, specifics and implications of such resubmitted AIP.</li>
        </ul>
    </li>
    <li>
        <p><strong>Phase 3: DAO votes on AIP, on Arbitrum One (14-16 days): During this Phase 3, the Arbitrum DAO will be able to vote directly on-chain on a submitted AIP.</strong></p>
        <p>An AIP passes if the following 2 conditions are met:</p>
        <ol className="a-b-list">
            <li>More Votable Tokens have casted votes &quot;in favor&quot; than have casted votes &quot;against&quot; (&quot;<strong>Threshold 1</strong>&quot;); and</li>
            <li>
               In the case of a:
               <ul>
                     <li>Constitutional AIP, at least 5% of all Votable Tokens have casted votes &quot;in favor&quot;; or</li>
                     <li>Non-Constitutional AIP, at least 3% of all Votable Tokens have casted votes &quot;in favor&quot; (collectively, &quot;<strong>Threshold 2</strong>&quot;).</li>
               </ul>
            </li>
        </ol>
        <p>The voting period ends 14 days after the start of voting. However, if Threshold 2 was reached within the last 2 days of the 14-day voting period, the voting period will be extended to end 2 days after Threshold 2 was reached.</p>
        <p>If the AIP fails to pass, the process ends after this Phase 3.</p>
        <p>If the AIP passes, then:</p>
        <ul>
            <li>If it is a Constitutional AIP, Phases 4 through 7 below are carried out.</li>
            <li>If it is a Non-Constitutional AIP, Phases 4 through 6 are bypassed and the AIP enters Phase 7 immediately.</li>
        </ul>
    </li>
    <li>
        <p><strong>Phase 4: L2 Waiting Period (3 days):</strong> After an AIP has passed Phase 3, a 3 day waiting period occurs. This gives users who object to the AIP time to initiate withdrawal of their funds or take other action on L2.</p>
    </li>
    <li><p><strong>Phase 5: Initiate and Finalize an L2-to-L1 Message (at least 1 challenge period of the rollup protocol):</strong> After the 3 day waiting period in Phase 4 has passed, an L2-to-L1 message is sent indicating that the AIP was passed. When this message is finalized on L1, anyone can redeem it to complete this step and initiate the next step. This step ensures that the completion of the L2 waiting period will be recognized on L1 after any withdrawals initiated during or soon after the voting period have been recognized on L1.</p></li>
    <li><p><strong>Phase 6: L1 Waiting Period (3 days):</strong> Following the completion of Phase 5, there will be an additional 3 day waiting period. This ensures that users who initiated withdrawals or other L2-to-L1 messages have time to execute them on L1 before the AIP takes effect.</p></li>
    <li><p><strong>Phase 7: Implementation:</strong> The AIP is fully executed and implemented. This may happen on L1 or via a transaction sent from L1 to one or more chains that are governed by the Arbitrum DAO.</p></li>
</ol>
<p>This AIP process as specified will typically require 34 days from the beginning of the temperature check in Phase 1 until an AIP is finally executed in Phase 7 for a Constitutional AIP, or 21 days for a Non-Constitutional AIP. An AIP may optionally specify further delay before its implementation.</p>
<h3 id="section-3-the-security-council">Section 3: The Security Council</h3>
<p>The Security Council is a committee of <strong>12 members who are signers of a multi-sig wallet</strong>, which has powers to perform certain Emergency Actions and Non-Emergency Actions, as delegated to it by the Arbitrum DAO and Arbitrum Foundation, and is responsible for upholding this Arbitrum DAO Constitution. Through the submission, approval and implementation of a Constitutional AIP, the Arbitrum DAO is able to modify the Security Council&#39;s powers or to eliminate the Security Council entirely.</p>
<p>Equivalent &quot;copies&quot; of the Security Council multi-sig contracts (7-of-12, in the case of Non-Emergency Actions, and 9-of-12, in the case of Emergency Actions) exist, one on Ethereum and another on each Arbitrum DAO-governed chain.</p>
<p><strong>Emergency Actions</strong>:</p>
<p>The Security Council has the power to execute any software upgrade or perform other required actions with no delay in order to respond to a security emergency, should one arise (such actions, &quot;<strong>Emergency Actions</strong>&quot;). Performing any Emergency Action requires a <strong>9-of-12 approval</strong> from the Security Council. The Security Council must not use its power to perform Emergency Actions except in a true security emergency, such as a critical vulnerability that could significantly compromise the integrity, confidentiality, or availability of a chain governed by the Arbitrum DAO.</p>
<p>After performing any Emergency Action, the Security Council must issue a full transparency report (at an appropriate time after the security emergency has passed) to explain what was done and why such Emergency Action was justified.</p>
<p>The Arbitrum DAO is able to curtail or eliminate the Security Council&#39;s power to perform Emergency Actions via approval and implementation of a Constitutional AIP.</p>
<p><strong>Non-Emergency Actions</strong>:</p>
<p>The Security Council may also approve and implement routine software upgrades, routine maintenance and other parameter adjustments in a non-emergency setting (such actions, &quot;<strong>Non-Emergency Actions</strong>&quot;), which require a 7-of-12 approval in order to take effect. Any Non-Emergency Action, after approval by the Security Council, will bypass Phases 1 to 3 of the AIP process and instead directly go through Phases 4 to 7 of the AIP process, to provide a delay before any Non-Emergency Action is deployed. The Security Council may optionally specify additional delays before deployment.</p>
<p>The Arbitrum DAO is able to curtail or eliminate the Security Council&#39;s power to perform Non-Emergency Actions via approval and implementation of a Constitutional AIP.</p>
<h3 id="section-4-security-council-elections">Section 4: Security Council Elections</h3>
<p>The Security Council has 12 members, who are divided into a July Cohort of 6 members, and a January Cohort of 6 members. Every year on July 15, 12:00 UTC, an election starts for the 6 July Cohort seats; and every year on January 15, 12:00 UTC, an election starts for the 6 January Cohort seats.</p>
<p>This means that the initial July Cohort will serve an initial term of 6 months, whereas the initial January Cohort will serve an initial term of 1 year.</p>
<p>The initial Security Council Cohorts were determined as follows: the 3 OffChain Labs-affiliated members were randomly split between the Cohorts, with [1] in the July Cohort and [2] in the January Cohort; and the remaining [9] Security Council members were randomly split between the Cohorts, with [5] in the July Cohort and [4] in the January Cohort.</p>
<p>The initial Security Council members, split by cohort, are as follows:</p>
<ul>
    <li>
        July Cohort
        <ul><li>[Name, short 1-2 sentence bio, wallet address]</li></ul>
    </li>
    <li>
        January Cohort
            <ul><li>[Name, short 1-2 sentence bio, wallet address]</li></ul>
    </li>
</ul>
<p>The following timeline governs an election that starts at time T:</p>
<ol>
    <li>From T until T+7 days: Any DAO member may declare their candidacy for the Security Council; provided that a current Security Council member in one cohort may not be a candidate for a seat in the other cohort. To the extent that there are more than six candidates, each eligible candidate must be supported by pledged votes representing at least 0.2% of all Votable Tokens. In the event that fewer than six candidates are supported by pledged votes representing at least 0.2% of all Votable Tokens, the current Security Council members whose seats are up for election may become candidates (as randomly selected out of their Cohort) until there are six candidates.</li>
    <li>From T+7 days until T+28 days: Each DAO member or delegate may vote for any declared candidate. Each token may be cast for one candidate. Votes cast before T+14 days will have 100% weight. Votes cast between T+14 days and T+28 days will have weight based on the time of casting, decreasing linearly with time, with 100% weight at T+14 days, decreasing linearly to 0% weight at T+28 days.</li>
    <li>At T+28 days: The 6 candidates who have received the most votes are elected and immediately join the Council, replacing the Cohort that was up for re-election.</li>
</ol>
<p>As a matter of best practice for maintaining an independent Security Council, no single organization should be overly represented in the Security Council. In particular, there should not be more than 3 candidates associated with a single entity or group of entities being elected to the Security Council, thereby ensuring that there will be no single entity or group of entities able to control or even veto a Security Council vote.</p>
<p>Furthermore, no candidate with conflicts of interest that would prevent them from acting in the best interests of the Arbitrum DAO, Arbitrum DAO-governed chains and/or the Arbitrum Foundation should be elected to the Security Council. Potential conflicts of interest could be, but are not limited to, affiliations with direct Arbitrum competitors, proven histories of exploiting projects and others.</p>
<p>The DAO may approve and implement a Constitutional AIP to change the rules governing future Security Council elections, but the AIP process may not be used to intervene in an ongoing election.</p>
<p>Security Council members may only be removed prior to the end of their terms under two conditions:</p>
<ol>
    <li>At least 10% of all Votable Tokens have casted votes &quot;in favor&quot; of removal and at least 5/6 of all casted votes are &quot;in favor&quot; of removal; or</li>
    <li>At least 9 of the Security Council members vote in favor of removal.</li>
</ol>
<p>The seats of Security Council members who have been removed prior to the end of their respective terms shall remain unfilled until the next election that such seats are up for appointment, unless otherwise replaced prior to such next election by a vote of at least 9 of the Security Council members.</p>
<h3 id="section-5-community-values">Section 5: Community Values</h3>
<p>As the guiding values of the Arbitrum DAO and Arbitrum Foundation, the Arbitrum DAO-governed chains, technology, and community should be:</p>
<ul>
    <li><strong>Ethereum-aligned:</strong> Arbitrum is part of the Ethereum ecosystem, and the Arbitrum community is part of the Ethereum community. Although the Arbitrum DAO makes its own decisions and pursues its own goals, it is deeply aligned with Ethereum and sees itself as an active and constructive participant in the Ethereum community.</li>
    <li><strong>Sustainable:</strong> Arbitrum should be built and operated with an eye to the medium to long term. Decisions about technology, economics, and resource allocation should not value short-term optimization over the longer-term health and thriving of the Arbitrum protocol, technology and community.</li>
    <li><strong>Secure</strong>: Arbitrum is security minded, and safety of the system should be weighed heavily when considering any protocol changes. In particular, Arbitrum One is a proper L2 rollup chain, and as such, derives its security from Ethereum; any changes made to Arbitrum One should preserve this property.</li>
    <li><strong>Socially inclusive:</strong> The community should be open and welcoming to all people who wish to participate constructively. Differences in knowledge, resources, geography, language, and life experience should be seen as opportunities to learn and to grow the community.</li>
    <li><strong>Technically inclusive:</strong> It should remain possible for ordinary people, with ordinary computer systems, to participate as fully as possible in the Arbitrum protocol if they wish to do so.</li>
    <li><strong>User-focused:</strong> The Arbitrum ecosystem should be managed for the benefit of all Arbitrum users.</li>
    <li><strong>Neutral and open:</strong> Arbitrum governance should not pick winners and losers, but should foster open innovation, interoperation, user choice, and healthy competition on Arbitrum chains.</li>
</ul>
</div>



--

TODO: articulate within faqs:

 - Updates to the text of our Constitution must be approved by the Arbitrum DAO through a formal governance proposal. To validate the integrity of the text on this page, see <a href='/how-tos/hash-constitution'>How to hash The Constitution of the Arbitrum DAO</a>
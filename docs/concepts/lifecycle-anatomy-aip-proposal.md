---
id: lifecycle-anatomy-aip-proposal
title: "The lifecycle and anatomy of an Arbitrum Improvement Proposal (AIP)"
sidebar_label: Lifecycle and anatomy of an AIP
description: Learn about the process and infrastructure that supports the Arbitrum Improvement Proposal (AIP) protocol, as defined in the Constitution of the Arbitrum DAO.
voice: Arbitrum DAO
tone: Objective, succinct, precise.
tense: Present - avoid present progressive. Past tense as needed.
person: Second/third - address reader directly as "you" when appropriate, refer to the DAO as the DAO, not as "we".
---

import DraftExpectationsPartial from '@site/docs/partials/_draft-expectations-partial.md'; 

<DraftExpectationsPartial />

An <a data-quicklook-from="arbitrum-improvement-proposal">Arbitrum Improvement Proposal (AIP)</a> is a proposal submitted by a member of the Arbitrum DAO that proposes a change to the Arbitrum ecosystem. There are two types of AIPs: <a data-quicklook-from="constitutional-proposal">Constitutional</a> and <a data-quicklook-from="non-constitutional-proposal">non-Constitutional</a>:

- **Constitutional AIPs** are those that modify the text or procedures of the Constitution or AIP-1, install or modify software on any chain, or take any action that requires "chain owner" permission on any chain. 
- **Non-Constitutional AIPs** are all other AIPs, such as those that request funds/grants or provide general guidelines or information to the community.

In this conceptual overview, we'll evaluate the lifecycle and anatomy of both types.


### The anatomy of an Arbitrum Improvement Proposal (AIP)

import AnatomyAIPPartial from '@site/docs/partials/_anatomy-aip-partial.md'; 

<AnatomyAIPPartial />


### The lifecycle of an Arbitrum Improvement Proposal (AIP)

#### High-level overview

The proposal submission process starts with a temperature check, where the AIP is suggested on the Arbitrum DAO governance forum along with a Snapshot poll. It's discussed/debated for 1 week. If the AIP passes the temperature check, it moves on to the next phase, which is the formal AIP and call for voting. In this phase, the AIP is submitted via governance contracts on Arbitrum One via Tally's user interface. After 3 days, a voter distribution snapshot is taken and the voting period begins.

Each AIP must be labeled as Constitutional or non-Constitutional, and must also clearly specify which Arbitrum DAO-governed chain(s) it will affect. If the AIP passes, it moves through a series of phases that include L2 and L1 waiting periods, and eventually, the implementation of the proposal. This process typically takes 34 days for a Constitutional AIP or 21 days for a Non-Constitutional AIP, but may take longer if specified by the AIP.


#### Phase 1: Temperature Check (optional but recommended)

This is the first phase of the Arbitrum Improvement Proposal (AIP) process. In this phase, the proposed AIP is submitted following the procedure outlined within [How to submit a DAO proposal](../how-tos/create-submit-dao-proposal) and discussed/debated for one week. This is an optional step, but it's recommended as a due-diligence governance best practice.

During this phase, the AIP should be accompanied by a Snapshot poll that helps gauge the interest of Arbitrum DAO members. This poll can only be submitted by an address that can represent at least 0.01% of the votable tokens. The Snapshot poll runs for 7 days and is decided by a simple majority with no required participation threshold. If an AIP fails this temperature check, the original AIP author is encouraged to refrain from proceeding, and voters are encouraged to reject it if the author proceeds. If an AIP proposer decides to skip this step, voters should consider this as a factor in their vote. This step is important as it will allow the community to reflect on its own sentiments towards a proposal before it's formally submitted for an on-chain vote via Tally.


#### Phase 2: Formal AIP and call for voting

In this phase, the AIP is officially submitted via governance smart contracts on the Arbitrum One platform. The proposer of the AIP must have an address that can represent at least 5,000,000 votable tokens. After the AIP is submitted, there's a 3-day period for interested parties to discuss the proposal and gather votes before a voter distribution snapshot is taken. During this phase, the AIP must be labeled as either Constitutional or Non-Constitutional, with specific guidelines for each type of proposal. Additionally, the AIP must clearly specify which Arbitrum DAO-governed chain(s) it will affect. This phase is important as it defines a clear, formal protocol for proposing and voting on AIPs.


#### Phase 3: On-chain DAO vote

todo - friendly 1-3 paragraph summary


#### Phase 4: L2 Waiting Period

todo - friendly 1-3 paragraph summary

#### Phase 5: Initiate and Finalize an L2-to-L1 Message

todo - friendly 1-3 paragraph summary


#### Phase 6: L1 Waiting Period

todo - friendly 1-3 paragraph summary


#### Phase 7: Implementation

todo - friendly 1-3 paragraph summary



### Conclusion

This conceptual overview presents a reader-friendly elaboration upon the process detailed within the Constitution of the Arbitrum DAO. The AIP process is designed to ensure that proposed changes align with the Arbitrum community's mission and guiding values, and that the community has the opportunity to discuss, debate, and vote on proposed changes before they're ultimately implemented.




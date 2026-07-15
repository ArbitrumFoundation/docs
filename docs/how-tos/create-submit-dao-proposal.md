---
id: create-submit-dao-proposal
title: How to submit a DAO proposal
sidebar_label: Submit a DAO proposal
description: Learn how to submit a proposal to the ArbitrumDAO's governance
  forum by using the off-chain governance UI to conduct a temperature check, and
  then to the on-chain governance UI to facilitate an on-chain vote.
dao_author: amarrazza
dao_sme: amarrazza
---
import DraftExpectationsPartial from '@site/docs/partials/_draft-expectations-partial.md'; 

<DraftExpectationsPartial />

In this how-to, you'll learn how to submit an Arbitrum Improvement Proposal (AIP) to the <a data-quicklook-from='arbitrum-dao'>ArbitrumDAO</a>. Familiarity with Arbitrum, DAOs, and Ethereum is expected. Otherwise, this how-to makes no assumptions about your experience with governance protocols.

### Prerequisites

To submit a temperature check using the [off-chain governance UI](https://snapshot.org/#/s:arbitrumfoundation.eth), you must have an Ethereum wallet address with 500,000 votable tokens[^1]; To submit a proposal using the [on-chain governance UI](https://alt.gov.arbitrum.foundation/), you must have an Ethereum wallet address that represents at least 1,000,000 votable tokens. 

If you don't have enough voting power, consider delegating your votes to a delegate who can create a proposal on your behalf[^2].

### Proposal types

There are two types of AIPs: <a data-quicklook-from="constitutional-aip">Constitutional</a> and <a data-quicklook-from="nonconstitutional-aip">non-Constitutional</a>:

* **Constitutional AIPs** are those that modify the text or procedures of the Constitution or AIP-1, install or modify software on any chain, or take any action that requires "chain owner" permission on any chain. 
* **Non-Constitutional AIPs** are all other AIPs, such as those that request funds/grants or provide general guidelines or information to the community.

See [Constitution](../dao-constitution.md) for further details.

### Proposal structure

import AnatomyAIPPartial from '@site/docs/partials/_anatomy-aip-partial.md'; 

<AnatomyAIPPartial />

### Pre-proposal development

Proposals that require code changes should include the code that will be executed when the proposal is passed. This code should handle the data structures, logic, executable data, and execution of the proposal. Refer to [Governance Proposal Lifecycle: Example](https://github.com/ArbitrumFoundation/governance/blob/main/docs/proposal_lifecycle_example.md) for an example.

### Step 1: Conduct a formal temperature check

The [DAO governance forum](https://forum.arbitrum.foundation/) facilitates discussions about ArbitrumDAO and <a data-quicklook-from='governance-proposal'>governance proposals</a> that are submitted by eligible token delegates. To submit your proposal:

1. Go to the [DAO governance forum](https://forum.arbitrum.foundation/).
2. Create a new post with your proposal using the template located [here](./create-submit-dao-proposal#proposal-structure). You can add additional fields to this template to provide more context for your proposal if you'd like.
3. After at least 7 days, navigate to the [off-chain governance UI](https://snapshot.org/#/s:arbitrumfoundation.eth) to create a poll that will gauge the community's interest in your proposal.

   * Connect your wallet.
   * Create a poll that points to your forum post. The poll should run for one week and should be decided by a simple majority.
   * Navigate back to your forum post and share the link to your poll with the community.
4. Allow at least one week for discussion and debate. Iterate on your proposal based on feedback from the community.

If your proposal passes the temperature check, then you can move to the second and final step: an on-chain vote facilitated by the [on-chain governance UI](https://alt.gov.arbitrum.foundation/). Ensure that you've incorporated feedback brought up during relevant forum discussions and temperature checks before proceeding.

### Step 2: Submit your on-chain proposal

If your wallet can represent at least 1,000,000 tokens, you can create an on-chain proposal using the [on-chain governance UI](https://alt.gov.arbitrum.foundation/). 

To submit your proposal:

1. Log in to the [on-chain governance UI](https://alt.gov.arbitrum.foundation/) using the wallet that represents the $ARB tokens.
2. Navigate to the "Proposals" section.
3. Select "+ New Proposal”.
4. Choose which governor you are targeting:

   * **Arbitrum Core**: For <a data-quicklook-from="constitutional-aip">Constitutional</a> Proposals
   * **Arbitrum Treasury**: For <a data-quicklook-from="nonconstitutional-aip">non-Constitutional</a> Proposals
5. Give the proposal a name and description.
6. Add proposal actions to be executed if passed. For example, "transfer n ETH to 0x address".
7. Preview your proposal and submit on-chain.

A proposal passes if two conditions are met: 

1. More votes are cast in favor than against
2. The total number of votes cast in favor (including abstain votes) is at least the following percentage of the delegated tokens:

   * 50% (within the range of 150m to 450m $ARB), for a <a data-quicklook-from="constitutional-aip">Constitutional AIP</a>
   * 40% (within the range of 100m to 300m $ARB), for a <a data-quicklook-from="nonconstitutional-aip">non-Constitutional AIP</a>

If the proposal passes, congratulations! After a delay, the proposal’s actions will be executed on-chain[^3].

If the proposal doesn’t pass, but there's interest in improving and resubmitting it, refer to [How to resubmit your proposal](./resubmit-dao-proposal).

If you have any questions or concerns, visit the [ArbitrumDAO governance forum](https://forum.arbitrum.foundation/).

Welcome to the future of governance!

#### Important notes

1. The <a data-quicklook-from="security-council">Security Council</a> has the power to execute <a data-quicklook-from="emergency-action">emergency actions</a> and <a data-quicklook-from="nonemergency-action">non-emergency actions</a>, as delegated to it by the Constitution. These are unlike traditional AIPs in that they can be approved by the Security Council without going through the above process. See the [Security Council](../concepts/security-council) page for more information.
2. The threshold of support required for a proposal to pass can vary depending on the type of proposal and the quorum requirements specified in the Constitution.
3. You can delegate your voting power[^2] to another address whether or not you have enough tokens to submit on-chain proposals. If you hold any $ARB tokens whatsoever, you can participate in ArbitrumDAO's governance.

[^1]: When we say "an Ethereum wallet address with at least 500,000 votable tokens", we mean that 500,000 or more tokens are delegated to this address. You can delegate the tokens to your own address and other $ARB token holders can delegate to you.
[^2]: Learn how to delegate your votes by visiting [How to delegate your voting power](./select-delegate-voting-power).
[^3]: Refer to [The Constitution of the ArbitrumDAO](../dao-constitution) for additional details and conditions.

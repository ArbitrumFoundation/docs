---
id: create-submit-dao-proposal
title: How to submit a DAO proposal
sidebar_label: Submit a DAO proposal
description: Learn how to submit a proposal to the Arbitrum DAO's governance forum by using Snapshot to conduct a temperature check, and then Tally to facilitate an on-chain vote.
dao_author: amarrazza
dao_sme: amarrazza
---

import DraftExpectationsPartial from '@site/docs/partials/_draft-expectations-partial.md'; 

<DraftExpectationsPartial />

```
 - FINAL-TODO: link audit for forum, tally, and snapshot bits - Matt/Austin?
```

In this how-to, you'll learn how to submit an Arbitrum Improvement Proposal (AIP) to the <a data-quicklook-from='arbitrum-dao'>Arbitrum DAO</a>. Familiarity with Arbitrum, DAOs, and Ethereum is expected. Otherwise, this how-to makes no assumptions about your experience with governance protocols.

### Prerequisites

To submit a temperature check using a <a data-quicklook-from='snapshot-poll'>Snapshot poll</a>, you must have an Ethereum wallet address that represents at least 0.01% of votable tokens[^1]; to submit a proposal on-chain using [Tally](https://tally.xyz/gov/arbitrum), you must have an Ethereum wallet address that represents at least 5,000,000 tokens (about 0.1% of votable tokens).

If you don't have enough voting power, consider delegating your votes to a delegate who can create a proposal on your behalf[^2]. Note that anyone holding $ARB (regardless of the amount) is able to vote on both Snapshot and Tally proposals.


### Proposal types

There are two types of AIPs: <a data-quicklook-from="constitutional-aip">Constitutional</a> and <a data-quicklook-from="nonconstitutional-aip">non-Constitutional</a>:

- **Constitutional AIPs** are those that modify the text or procedures of the Constitution or AIP-1, install or modify software on any chain, or take any action that requires "chain owner" permission on any chain. 
- **Non-Constitutional AIPs** are all other AIPs, such as those that request funds/grants or provide general guidelines or information to the community.

See [Constitution](../dao-constitution.md) for further details.

### Proposal structure

import AnatomyAIPPartial from '@site/docs/partials/_anatomy-aip-partial.md'; 

<AnatomyAIPPartial />

The proposal template is available [here](https://forum.arbitrum.foundation/t/delegation-submission-template/16) (FINAL-TODO).


### Pre-proposal development

Proposals that require code changes should include the code that will be executed when the proposal is passed. This code should handle the data structures, logic, executable data, and execution of the proposal. Refer to [Governance Proposal Lifecyle: Example](https://github.com/OffchainLabs/governance/blob/main/docs/proposal_lifecycle_example.md) for an example.

### Step 1: Conduct a formal temperature check with a Snapshot poll

The [DAO governance forum](https://forum.arbitrum.foundation/) facilitates discussions about Arbitrum DAO and <a data-quicklook-from='governance-proposal'>governance proposals</a> that are submitted by eligible token-holders. To submit your proposal:

1. Go to the [DAO governance forum](https://forum.arbitrum.foundation/).
2. Create a new post with your proposal using the template located [here](https://forum.arbitrum.foundation/t/delegation-submission-template/16). You can add additional fields to this template to provide more context for your proposal if you'd like.
3. Allow at least one week for discussion and debate. Iterate on your proposal based on feedback from the community.
4. Navigate to [Snapshot](https://snapshot.org/#/). This is where you can create a poll that will gauge the community's interest in your proposal.
5. Connect your wallet.
6. Open the Arbitrum DAO Snapshot space.
7. Create a poll that points to your forum post. The poll should run for one week and should be decided by a simple majority.
8. Navigate back to your forum post and share the link to your Snapshot poll with the community.

If your proposal doesn't pass the temperature check, you shouldn't submit it for an on-chain vote. Instead, head back to your forum post and engage with the community to address any concerns that they have.

If your proposal passes the temperature check, then you can move to the second and final step: an on-chain vote facilitated by Tally. Ensure that you've incorporated feedback brought up during relevant forum discussions and temperature checks before proceeding. 

### Step 2: Submit your on-chain proposal using Tally

If your wallet can represent at least 5,000,000 tokens (about 0.1% of votable $ARB tokens), you can create an on-chain proposal using [Tally](https://tally.xyz/gov/arbitrum). 

To submit your proposal on Tally:

 1.	Log in to [Tally](https://tally.xyz/gov/arbitrum) using the wallet that holds your $ARB tokens.
 2.	Navigate to the "explore DAOs" section or click on "My DAOs" within your Tally profile and select one of the following pages:
    - **Arbitrum Constitution**: For Constitutional Proposals
    - **Arbitrum Treasury**: For Non-Constitutional Proposals
3.	Select "Create new proposal"
4.	Give the proposal a name and description (preview image is optional). Ensure that you’re submitting the correct type of proposal to the right DAO page in Tally.
5.	Add proposal actions to be executed if passed. For example, "transfer n ETH to 0x address".
6.	Preview your proposal and either save as a draft or submit on-chain.

A proposal passes if two conditions are met: 

  1. More votes are cast in favor than against
  2. The total number of votes cast in favor is at least the following percentage of the votable tokens:
     1. **5%**, for a <a data-quicklook-from="constitutional-aip">Constitutional AIP</a>
     2. **3%**, for a <a data-quicklook-from="nonconstitutional-aip">non-Constitutional AIP</a>

If the proposal passes, congratulations! After a delay, the proposal’s actions will be executed on-chain[^3].

If the proposal doesn’t pass, but there's interest in improving and resubmitting it, refer to [How to resubmit your proposal](./resubmit-dao-proposal).

This protocol is in its early days and will likely evolve in response to your feedback. If you have any questions or concerns, visit the [Arbitrum DAO governance forum](https://forum.arbitrum.foundation/) or [Discord](https://www.discord.gg/arbitrum).

Welcome to the future of governance!


#### Important notes

 1. The <a data-quicklook-from="security-council">Security Council</a> has the power to execute <a data-quicklook-from="emergency-action">emergency actions</a> and <a data-quicklook-from="nonemergency-action">non-emergency actions</a>, as delegated to it by the Constitution. These are unlike traditional AIPs in that they can be approved by the Security Council without going through the above process. See the [Security Council](../concepts/security-council) page for more information.
 2. The threshold of support required for a proposal to pass can vary depending on the type of proposal and the quorum requirements specified in the Constitution.
 3. You can delegate your voting power[^2] to another address whether or not you have enough tokens to submit on-chain proposals. If you hold any $ARB tokens whatsoever, you can participate in Arbitrum DAO's governance.


[^1]: When we say "an Ethereum wallet address that represents at least 0.01% of votable tokens", we mean that your address must be able to vote at least 0.01% of votable tokens. This voting power can be acquired either by holding $ARB tokens directly or by receiving delegated votes from other $ARB token holders who have decided to delegate their voting power to you.
[^2]: Learn how to delegate your votes by visiting [How to delegate your voting power](./select-delegate-voting-power).
[^3]: Refer to [The Constitution of the Arbitrum DAO](../dao-constitution) for additional details and conditions.
---
id: create-submit-dao-proposal
title: How to submit a DAO proposal
sidebar_label: Submit a DAO proposal
description: todo:qqq
---

import DraftExpectationsPartial from '@site/docs/partials/_draft-expectations-partial.md'; 

<DraftExpectationsPartial />

```
todos: 
 - fact check
 - clean up
 - link to docs
 - wire up quicklooks
 - ask questions and add to FAQ
 - continue refining term definitions
 - reference specific sections of the constitution from each statement, whenever possible
```

In this how-to, you'll learn how to submit proposals to the Arbitrum DAO. Familiarity with Arbitrum, DAOs, Ethereum, and smart contracts is expected. Otherwise, this how-to makes no assumptions about your experience with governance protocols.

### Prerequisites

Before you get started, make sure you have the following:

- An Ethereum wallet that holds at least 0.01% of votable $ARB tokens. This lets you submit and vote on proposals using Snapshot.
- If you're interested in submitting on-chain proposals using Tally, you'll need at least 5,000,000 votes delegated to your wallet address.


### Step 1: Submit your proposal to the DAO governance forum for an informal temperature check

The [DAO governance forum](https://forum.arbitrum.io/) facilitates discussions about Arbitrum DAO and governance proposals that are submitted by eligible token-holders. To submit your proposal:

1. Go to the [DAO governance forum](https://forum.arbitrum.io/).
2. Create a new post with your proposal using the TBD template.
3. Allow at least one week for discussion and debate.

If you feel confident about your proposal after a week's worth of discussion, you can conduct a temperature check via a Snapshot poll. Note that temperature checks can only be created by $ARB token holders who have at least 0.01% of votable $ARB tokens in their wallet. If you don't have enough voting power to create a Snapshot poll, consider asking for support from delegates and/or the rest of the Arbitrum community.

### Step 2: Conduct a formal temperature check with a Snapshot poll

If you have at least 0.01% of votable $ARB tokens, you can create a poll on Snapshot to more formally gauge the community's interest in your proposal. To create a poll on Snapshot:

1. Navigate to [Snapshot](https://snapshot.org/#/).
2. Connect your wallet.
3. Open the Arbitrum DAO Snapshot space.
4. Create a poll that points to your forum post. Your poll should run for one week and should be decided by a simple majority.

Your proposal will pass the temperature check if it receives support from more than 50% of votable tokens. If your proposal doesn't pass the temperature check, don't submit it for an on-chain vote. Instead, head back to your forum post and engage with the community to address any concerns that they have.

If your proposal passes the temperature check, then you can move to the third and final step: an on-chain vote facilitated by Tally. Before proceeding, be sure to incorporate any feedback that you've received. Note that on-chain proposals can only be created by $ARB token holders who have at least TODO:qqq of votable $ARB tokens. If you don't have enough voting power to create an on-chain proposal, TODO.

### Step 3: Submit your on-chain proposal using Tally

If you have at least 5,000,000 votes delegated to your wallet address (todo - connect holding, delegating, and self-delegating), you can create an on-chain proposal using Tally. Ensure that you've incorporated feedback brought up during relevant forum discussions and temperature checks into the your formal on-chain proposal. To submit your proposal on Tally:

 1.	Log in to [Tally](https://www.tally.xyz/) using the wallet that holds your $ARB tokens.
 2.	Navigate to the "explore DAOs" section or click on "My DAOs" within your Tally profile and select one of the following pages:
    - **Arbitrum Constitution**: For Constitutional Proposals
    - **Arbitrum Treasury**: For Non-Constitutional Proposals
3.	Select "Create new proposal"
4.	Give the proposal a name and description (preview image is optional). Ensure that you’re submitting the correct type of proposal to the right DAO page in Tally.
5.	Add proposal actions to be executed if passed. For example, "transfer n ETH to 0x address".
6.	Preview your proposal and either save as a draft or submit on-chain.

A proposal passes if more votes are cast in favor than against (TODO: simple majority?), and if the total number of votes cast in favor is at least the following fraction of the votable tokens:

  1. 5%, for a Constitutional proposal
  2. 3%, for a non-Constitutional proposal

If the proposal passes, congratulations! After a short delay (depending on the proposal), the proposal’s actions will be executed on-chain.

If the proposal doesn’t pass, but there's interest in submitting it, refer to the resubmission guidelines outlined within the Constitution (todo:dedicated doc) and continue iterating on your proposal with the support of forum members.

This system is in its early days and will likely evolve in response to your feedback. Changes made to this process will be facilitated through proposals that follow the above procedue. For any other questions related to proposals, or to get started in the process, visit us on the forum, on Discord, or TODO. 

Welcome to the future of governance!


### Important notes

 1. Note that the Security Council has the power to execute certain Emergency Actions and Non-Emergency Actions, as delegated to it by the Arbitrum DAO and Arbitrum Foundation. Proposals that fall under the category of Non-Emergency Actions can be approved by the Security Council without going through the full AIP process.
 2. The threshold of support required for a proposal to pass can vary depending on the type of proposal and the quorum requirements specified in the Constitution.
 3. You can delegate your voting power to another address whether or not you have enough tokens to submit on-chain proposals. If you hold $ARB tokens, you can still participate in Arbitrum DAO's governance.
 4. The Arbitrum Foundation plays an important role in maintaining the Arbitrum DAO and its protocols - it's responsible for funding and supporting the development of the Arbitrum DAO, and it also has the power to make certain decisions related to the Arbitrum DAO's operations and governance (TODO).



<!-- todos: 
How long are proposals open for voting?
various inline todos
things not specified:
In step 1, the Constitution doesn't specify where the proposal should be submitted. The guide suggests the DAO governance forum, but it is not clear if this is the official place for proposal submissions.
In step 2, the Constitution doesn't specify where proposals need to pass a temperature check before being submitted for an on-chain vote.
In step 3, the Constitution doesn't specify the minimum amount of tokens required to create an on-chain proposal using Tally. Also, it is not specified the percentage of votable tokens required for a proposal to pass.
In step 3, the Constitution doesn't specify what constitutes a vote in favor or against a proposal.
In step 3, the Constitution doesn't specify what types of actions can be included in a proposal.
In step 3, the Constitution doesn't specify the time frame for a proposal to be voted on, and if there is a quorum required for the vote to be valid.
-->
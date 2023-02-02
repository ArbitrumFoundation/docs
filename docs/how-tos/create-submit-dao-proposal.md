---
id: create-submit-dao-proposal
title: How to submit a DAO proposal
sidebar_label: Submit a DAO proposal
description: Learn how to submit a proposal to the Arbitrum DAO's governance forum by using Snapshot to conduct a temperature check, and then Tally to facilitate an on-chain vote.
---

import DraftExpectationsPartial from '@site/docs/partials/_draft-expectations-partial.md'; 

<DraftExpectationsPartial />

```
todos: 
 1. Editing for technical precision and completeness (we are here - once an SME signs off on this "core truth", we can edit for structure / clarity / brevity / consistency - see the gov docs page for details: https://www.notion.so/arbitrum/Governance-docs-46934705e74b4ae096b2fcdb3755aa40)
   - This unblocks other types of editing 
   - Other editorial feedback is welcome of course, but the most important feedback at this point is editing for technical precision and completeness. SME-signoff signals that from the SME's perspective, it looks truthful and complete.
 2. Other things that we need to do (can parallelize, but confidence will increase as we have SME signoffs on technical accuracy and completeness)
   - Editing for structure / clarity / brevity / consistency / metadata
      - Examples of things in this step: logical and patterned sections, consistent formatting, consistency across the corpus, consistent usage of proper nouns, thoughtful SEO-friendly descriptions
   - link to docs (wherever the reader is likely to want to read supporting docs, link to them inline, and wire up "next" and "prev" links at the bottom of each page)
   - wire up quicklooks (wrap first-mentions of key terms in <a data-quicklook-from> tags, and ensure the definitions are in the glossary, signed off by SMEs, and rendered using Glossary CMS)
   - ask questions and add to FAQ (wherever a given reader persona - user, dev, token-holder, delegate, proposal submitter, council member, etc) is likely to have questions, add a question to the FAQ and render it within a FAQs section by using the FAQ CMS publishing pipeline)
   - continue refining term definitions (periodically review the Glossary CMS to drive consistency and clarity through iteration, ideally with continuous peer review and support)
   - reference specific sections of the constitution from each statement, whenever possible (via markdown-not-html-footnotes that connect the statement to the constitution while disarming various forms of skepticism, confusion, and risk)
   - invite peers to help with the long-tail of todos, & peer-review content experience and comment on friction points (right now we determine gov, once the switch is flipped, it will determine us, feels important to get this right for "the spirit of our work" and risk / optics reasons)
   - confidently shift our focus to fun non-gov things together!
   - confirm token threshholds for snapshot and tally
   - to define: snapshot, tally, temperature check
   - do I need to delegate to myself, or is holding tokens enough?
   - the Constitution specifies "0.01% of the Votable Tokens" in both temperature check and Formal AIP call stages. This notion comment (https://www.notion.so/How-to-submit-a-DAO-proposal-84fb3b7995834008a20c15c0457c7cc5?d=4327ca358d554f758ad29c3ae1588e9f) and this google doc (https://docs.google.com/document/d/166Lut45pdwSI6GAGQkcD91wY8mI3rSbWYRiqkP-ThZc/edit) suggest that the threshold is 5,000,000 tokens for raising an on-chain proposal. Which is correct? Opting for Constitution specs for now.
      -A: updated constitution;  5,000,000 for proposal submission is cannon (not that this is deferent than off chain temp-check, which is 0.01%)
   - can I submit an on-chain proposal without having received any delegated votes from anyone other than myself?
      - A: yes; votes are votes, regardless of where they came from
   - why do I need to take the extra step to delegate to myself?
      - A: This is a gas optimization / implementation detail; it should be clear when using Tally. 
   - see Prereqs -> second bullet point
   - why are there different threshholds between Tally and Snapshot?
      - A:  the design different steps have increasingly high bars to pass
   - if I don't have enough tokens to submit my proposal on Snapshot or Tally, what are my options?
      - A: gotta get the votes somehow! 
   - "Your proposal will pass the formal temperature check if it receives support from more than 50% of votable tokens." - is this true? all votable tokens, or just the votable tokens that voted?
      - A: just those that voted
   - template location TODO below
```

In this how-to, you'll learn how to submit an Arbitrum Improvement Proposal (AIP) to the <a data-quicklook-from='arbitrum-dao'>Arbitrum DAO</a>. Familiarity with Arbitrum, DAOs, and Ethereum is expected. Otherwise, this how-to makes no assumptions about your experience with governance protocols.

### Prerequisites

To submit a temperature check using <a data-quicklook-from='snapshot-poll'>Snapshot</a> you must have an Ethereum wallet address that represents at least 0.01% of votable tokens;[^1] to submit a proposal on-chain using [Tally](https://www.tally.xyz/), you must have an Ethereum wallet address that represents at least 5,000,000 tokens (about 0.1% of votable tokens). 

If you don't have enough voting power, consider delegating your votes to a delegate who can create a proposal on your behalf[^2].


### Proposal types

There are two types of AIPs: <a data-quicklook-from="constitutional-aip">Constitutional</a> and <a data-quicklook-from="nonconstitutional-aip">non-Constitutional</a>:

- **Constitutional AIPs** are those that modify the text or procedures of the Constitution or AIP-1, install or modify software on any chain, or take any action that requires "chain owner" permission on any chain. 
- **Non-Constitutional AIPs** are all other AIPs, such as those that request funds/grants or provide general guidelines or information to the community.

See [Constitution](../dao-constitution.md) for further details.

### Proposal structure

Although the proposal template is available [here](https://forum.arbitrum.io/t/delegation-submission-template/16) (TODO: ensure valid link)...


import AnatomyAIPPartial from '@site/docs/partials/_anatomy-aip-partial.md'; 

<AnatomyAIPPartial />



### Step 1: Conduct a formal temperature check with a Snapshot poll

The [DAO governance forum](https://forum.arbitrum.io/) facilitates discussions about Arbitrum DAO and <a data-quicklook-from='governance-proposal'>governance proposals</a> that are submitted by eligible token-holders. To submit your proposal:

1. Go to the [DAO governance forum](https://forum.arbitrum.io/).
2. Create a new post with your proposal using the template located [here](https://forum.arbitrum.io/t/delegation-submission-template/16). You can add additional fields to this template to provide more context for your proposal if you'd like.
3. Navigate to [Snapshot](https://snapshot.org/#/) to create a poll that will gauge the community's interest in your proposal.
4. Connect your wallet.
5. Open the Arbitrum DAO Snapshot space.
6. Create a poll that points to your forum post. Your poll should run for one week and should be decided by a simple majority.
7. Navigate back to your forum post and share the link to your Snapshot poll with the community.
8. Allow at least one week for discussion and debate.

If your proposal doesn't pass the temperature check, don't submit it for an on-chain vote. Instead, head back to your forum post and engage with the community to address any concerns that they have.

If your proposal passes the temperature check, then you can move to the second and final step: an on-chain vote facilitated by Tally. Ensure that you've incorporated feedback brought up during relevant forum discussions and temperature checks before proceeding. 

### Step 2: Submit your on-chain proposal using Tally

If your wallet can represent at least 5,000,000 tokens (about 0.1% of votable $ARB tokens), you can create an on-chain proposal using Tally. 

To submit your proposal on Tally:

 1.	Log in to [Tally](https://www.tally.xyz/) using the wallet that holds your $ARB tokens.
 2.	Navigate to the "explore DAOs" section or click on "My DAOs" within your Tally profile and select one of the following pages:
    - **Arbitrum Constitution**: For Constitutional Proposals
    - **Arbitrum Treasury**: For Non-Constitutional Proposals
3.	Select "Create new proposal"
4.	Give the proposal a name and description (preview image is optional). Ensure that you’re submitting the correct type of proposal to the right DAO page in Tally.
5.	Add proposal actions to be executed if passed. For example, "transfer n ETH to 0x address".
6.	Preview your proposal and either save as a draft or submit on-chain.

A proposal passes if two conditions are met: 

  1. More votes are cast in favor than against
  2. The total number of votes cast in favor is at least the following fraction of the votable tokens:
     1. **5%**, for a <a data-quicklook-from="constitutional-aip">Constitutional proposal</a>
     2. **3%**, for a <a data-quicklook-from="nonconstitutional-aip">non-Constitutional proposal</a>

If the proposal passes, congratulations! After a delay, the proposal’s actions will be executed on-chain[^3].

If the proposal doesn’t pass, but there's interest in improving and resubmitting it, refer to [How to resubmit your proposal](./resubmit-dao-proposal).

This protocol is in its early days and will likely evolve in response to your feedback. If you have any questions, come visit us on the [Arbitrum DAO governance forum](https://forum.arbitrum.io/) or on [Discord](https://www.discord.gg/arbitrum).

Welcome to the future of governance!


#### Important notes

 1. The <a data-quicklook-from="security-council">Security Council</a> has the power to execute <a data-quicklook-from="emergency-action">emergency actions</a> and <a data-quicklook-from="nonemergency-action">non-emergency actions</a>, as delegated to it by the Constitution. These are unlike traditional AIPs in that they can be approved by the Security Council without going through the above process. See the [Security Council](../concepts/security-council) page for more information.
 2. The threshold of support required for a proposal to pass can vary depending on the type of proposal and the quorum requirements specified in the Constitution.
 3. You can delegate your voting power[^2] to another address whether or not you have enough tokens to submit on-chain proposals. If you hold any $ARB tokens whatsoever, you can participate in Arbitrum DAO's governance.


#### Footnotes

[^1]: When we say "an Ethereum wallet address that represents at least 0.01% of votable tokens", we mean that your address must be able to vote at least 0.01% of votable tokens. This voting power can be acquired either by holding $ARB tokens directly or by receiving delegated votes from other $ARB token holders who have decided to delegate their voting power to you.
[^2]: Learn how to delegate your votes by visiting [How to delegate your voting power](./select-delegate-voting-power).
[^3]: Refer to [The Constitution of the Arbitrum DAO](../dao-constitution) for additional details and conditions.
---
id: state-of-progressive-decentralization
title: The state of Arbitrum's progressive decentralization
sidebar_label: State of decentralization
description: todo:qqq
---

import DraftExpectationsPartial from '@site/docs/partials/_draft-expectations-partial.md'; 

<DraftExpectationsPartial />

```
todos: 
 - fact check (we are here - once an SME signs off on the core truth, we can confidently stabilize the beauty of the truth - see the gov docs page for details: https://www.notion.so/arbitrum/Governance-docs-46934705e74b4ae096b2fcdb3755aa40)
 - then continue with...
   - clean up (logical and patterned sections, consistent formatting, consistency across the corpus, thoughtful SEO-friendly descriptions, footnotes wherever just-in-case elaboration would be valuable)
   - link to docs (wherever the reader is likely to want to read supporting docs, link to them inline, and wire up "next" and "prev" links at the bottom of each page)
   - wire up quicklooks (wrap first-mentions of key terms in <a data-quicklook-from> tags, and ensure the definitions are in the glossary, signed off by SMEs, and rendered using Glossary CMS)
   - ask questions and add to FAQ (wherever a given reader persona - user, dev, token-holder, delegate, proposal submitter, council member, etc) is likely to have questions, add a question to the FAQ and render it within a FAQs section by using the FAQ CMS publishing pipeline)
   - continue refining term definitions (periodically review the Glossary CMS to drive consistency and clarity through iteration, ideally with continuous peer review and support)
   - reference specific sections of the constitution from each statement, whenever possible (via markdown-not-html-footnotes that connect the statement to the constitution while disarming various forms of skepticism, confusion, and risk)
   - invite peers to help with the long-tail of todos, & peer-review content experience and comment on friction points (right now we determine gov, once the switch is flipped, it will determine us, feels important to get this right for "the spirit of our work" and risk / optics reasons)
   - confidently shift our focus to fun non-gov things together!
```

<a data-quicklook-from='progressive-decentralization'>Progressive decentralization</a> is the process of gradually increasing the decentralization of a system over time. This document details the current state of progressive decentralization for Arbitrum's Rollup chains (Arbitrum One and Arbitrum Nova).

### The components of Arbitrum's progressive decentralization

The following components determine the degree of decentralization for Arbitrum Rollup chains (Arbitrum One and Arbitrum Nova):

1. **Chain ownership**: todo
2. **Validator ownership**: todo
3. **Sequencer ownership**: todo
4. **Data Availability Committee (DAC) ownership**: todo - applies only to Arbitrum AnyTrust chains like Arbitrum Nova.

Let's evaluate the current status of these components for both Arbitrum One and Arbitrum Nova, beginning with chain ownership.

### 1. Chain ownership

  - **Description**: A chain's owner has the ability to change the protocol in various ways, including upgrading the core smart contracts, setting system parameters, and pausing the system.
  - **Current status**: Governed by Arbitrum DAO. Chain ownership of both Arbitrum One and Arbitrum Nova is under the control of the Arbitrum governance system. The Arbitrum Decentralized Autonomous Organization (DAO), made up of $ARB token-holders and delegates, can carry out chain-owner operations through governance votes. The emergency Security Council can also carry out chain-owner operations, but only in critical emergency situations. The Security Council can act slowly through a 7 of 12 multisig wallet or quickly through a 9 of 12 multisig wallet. The members of the Security Council are elected every six months by the DAO.
  - **Risks**:
    - If 9 of the Security Council members are compromised or behave maliciously, the system and users' funds could be compromised.
    - If a malicious proposal is successfully put through DAO governance, the system's safety could be compromised. In this case, users will have several weeks to withdraw their funds back to Ethereum before the proposal takes effect.
  - **Future**: The role of governance in Arbitrum can be changed by the governance system itself.

### 2. Validator ownership

  - **Description**: Validators are responsible for updating the state of the Arbitrum chain and ensuring that all updates are valid.
  - **Current status**: Permissioned. Validation on both Arbitrum One and Arbitrum Nova is currently allow-listed to X public entities. You can see the list of validators [here](qqq link).
  - **Risks**: If all X Arbitrum validators behave maliciously, the system's safety could be compromised.
  - **Future**: The Arbitrum governance system (see #1) can modify the Validator whitelist, such as by adding or removing members or removing the whitelist entirely.

### 3. Sequencer ownership

  - **Description**: The sequencer is typically responsible for collecting and ordering users' transactions.
  - **Current status**: Centralized. The sequencers for both Arbitrum One and Arbitrum Nova are currently centralized and maintained by Offchain Labs.
  - **Risks**: The sequencer has the ability to delay the inclusion of a user's transaction by up to 24 hours and reorder transactions over short time-horizons. The sequencer cannot compromise the system's safety.
  - **Future**: The Arbitrum governance system (see #1) can elect a new entity as the sequencer, such as a more distributed/decentralized system.

### 4. Data Availability Committee (DAC) ownership

:::note

This applies only to Arbitrum AnyTrust chains like Arbitrum Nova.

:::


  - **Description**: AnyTrust chains like Arbitrum Nova rely on a permissioned committee to store the chain's data and provide it on demand.
  - **Current status**: 7-member committee. The Arbitrum Nova chain has a 7-party DAC, whose members can be seen [here](QQQ link).
  - **Risks**: If 6 of the 7 committee members as well as the Sequencer behave maliciously and collude, the safety of the system can be compromised.
  - **Future**: The Arbitrum governance system (see #1) can change the role of the DAC, such as by adding or removing members or modifying the power it has over the system.


---


**FAQ:**

- todo:qqq, injected from base and linked throughout

---

**Footnotes:**

<a id='footnote-1'>1.</a> See our <a href='https://gas.arbitrum.io/'>gas cost estimator</a> and <a href='https://l2fees.info/'>L2Fees</a> for more information.<br/>
<a id='footnote-2'>2.</a> todo:qqq

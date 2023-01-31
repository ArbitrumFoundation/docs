---
id: sybil-account
title: "Sybil accounts: A conceptual overview"
sidebar_label: Sybil accounts
description: todo:qqq
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
```

### What are Sybil accounts?

In the context of Arbitrum Governance, Sybil accounts are Arbitrum accounts controlled by an entity trying to create the false appearance of being many entities via deceptive on-chain activity in order to unfairly game the <a data-quicklook-from='arb'>$ARB</a> <a data-quicklook-from='airdrop'>airdrop</a>.


### How were Sybil accounts detected prior to the airdrop?

A process called "Sybil hunting" was used to detect and remove Sybil accounts. The process involved creating a graph of all transactions that have taken place on <a data-quicklook-from='arbitrum-one'>Arbitrum One</a>, and then partitioning this graph into different subgraphs. The subgraphs that have a large number of nodes and a high degree of connectivity were considered to be likely Sybil clusters. The accounts within these clusters were collapsed into a single recipient account for the airdrop. Entities explicitly known to by Sybils were also removed; the dataset of these known entities was created with help from our friends at [Nansen](https://www.nansen.ai/) and [Hop](https://hop.exchange/). See [Arbitrum Sybil Hunting](https://github.com/OffchainLabs/arb-sybil/tree/master/v2) for more information. 


### Why is it important to prevent Sybil accounts?

By receiving an outsized share of the $ARB aidrop, Sybil accounts can lead to concentration of voting power and undermine the decentralized nature of the <a data-quicklook-from='arbitrum-dao'>Arbitrum DAO</a>. By preventing Sybil accounts, the Arbitrum DAO is able to ensure that the initial token distribution is as fair as possible.

### Why not use proof-of-personhood? 

Criteria for allotment of the ARB airdrop involves on-chain activity. The ability for users to interact with Arbitrum One permissionlessly and pseudonymously is a fundamental property of the system.  Requiring some sort of identity verification for airdrop-qualification would undermine this core value, and thus wasn't considered.   


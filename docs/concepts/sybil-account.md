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

### What are Sybil accounts?

In the context of the Arbitrum DAO, a Sybil account is a fake or fraudulent account created to manipulate the voting system. These accounts can be used to influence the outcome of elections, or to gain an unfair advantage in decision-making processes. Sybil accounts are a form of centralization that is at odds with the decentralized nature of the Arbitrum DAO.

### How does the Arbitrum DAO detect Sybil accounts?

The Arbitrum DAO uses a process called "Sybil hunting" to detect and remove Sybil accounts. The process involves creating a graph of all transactions that have taken place on the network (?), and then partitioning this graph into different subgraphs. The subgraphs that have a large number of nodes and a high degree of connectivity are considered to be Sybil clusters. The accounts within these clusters are then removed from the voting system (?).

### How does the Arbitrum DAO prevent Sybil accounts?

The Arbitrum DAO uses a combination of techniques to prevent Sybil accounts from being created. One method is to exclude known malicious entities from the voting system. Another method is to use a threshold for the number of connections that an account must have in order to be considered a valid voter. Additionally, the Arbitrum DAO uses a risk management system (?) to ensure that the number of Sybil accounts is kept to a minimum.

### Why is it important to prevent Sybil accounts?

Sybil accounts are a form of centralization that undermines the decentralized nature of the Arbitrum DAO. They can be used to manipulate the outcome of elections, or to gain an unfair advantage in decision-making processes. By preventing Sybil accounts, the Arbitrum DAO is able to ensure that the voting system is fair and that the decisions that are made are representative of the will of the community.

### Why not use proof-of-personhood? 

TODO


## Conclusion

The Arbitrum DAO's Sybil hunting process is an important step in maintaining the integrity of the voting system and ensuring that the decisions that are made are representative of the will of the community. However, it is important to note that this is an ongoing process, and that there is still work to be done.
---
id: dao-vote
title: "Arbitrum DAO votes: A conceptual overview"
sidebar_label: DAO vote
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

The <a data-quicklook-from='arbitrum-dao '>Arbitrum DAO </a>is governed by a protocol that allows <a data-quicklook-from='arb'>$ARB</a> governance token holders to propose and vote on different actions, such as changes to the DAO's [Constitution](../dao-constitution.md) or funding for specific projects. These votes are crucial for making decisions that shape the future of Arbitrum and its technology assets.

### Types of votes

There are two types of votes in the Arbitrum DAO:

1. **Temperature check:** This is a preliminary vote that gauges the community's interest in a proposal before it moves on to the next stage. Temperature checks are conducted on the Snapshot platform and are only open to $ARB token holders who hold at least 0.01% of <a data-quicklook-from='votable-tokens'>votable tokens</a>.

2. **On-chain vote:** If the proposal passes the temperature check, it will move on to an on-chain vote facilitated by Tally. The proposal must receive support from more votable tokens in favor than against; <a data-quicklook-from='constitutional-aip'>constitutional proposals</a> must receive votes from at least 5% of votable tokens; <a data-quicklook-from='nonconstitutional-aip'>non-constitutional proposal</a> must receive votes from at least 3% of votable tokens.

### Voting power

The amount of voting power you have is determined by the number of $ARB tokens you hold. However, you also have the option to grant your voting power to a <a data-quicklook-from='delegate'>delegate</a>, who can vote on your behalf. This is a great option for token holders who may not have the time or resources to actively participate in the DAO's governance.

### Values-based voting

It's important to note that the Arbitrum DAO operates on a set of values outlined in its Constitution. These values include decentralization, security, and scalability. When evaluating proposals, voters should consider whether the proposal aligns with these values and if it's in the best interest of the DAO as a whole.

### Conclusion

Voting is an important aspect of the Arbitrum DAO's governance and allows token holders to make decisions that shape the future of the DAO. By understanding the different types of votes, your voting power, and the values that guide the DAO, you can make informed decisions when voting on proposals.
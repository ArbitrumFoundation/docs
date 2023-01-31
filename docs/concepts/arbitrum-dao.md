---
id: arbitrum-dao
title: "Arbitrum DAO: A conceptual overview"
sidebar_label: Arbitrum DAO
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

The <a data-quicklook-from='arbitrum-dao'>Arbitrum DAO</a> is a decentralized autonomous organization (DAO) built on the Ethereum blockchain. At its core, the Arbitrum DAO is a community-driven <a data-quicklook-from='governance'>governance</a> model that allows <a data-quicklook-from='arb'>$ARB</a> token holders to propose and vote on changes to the organization.

The Arbitrum DAO's governance <a data-quicklook-from='smart-contract'>smart contracts</a> are implemented on the <a data-quicklook-from='arbitrum-one'>Arbitrum One</a> rollup chain, which is a <a data-quicklook-from='layer-2-l2'>Layer 2</a> scaling solution for the Ethereum blockchain. These smart contracts include the DAO's governance token, $ARB. It serves as determines voting weight for Arbitrum DAO proposals; token holders have voting power proportional to the amount of $ARB they hold.

The Arbitrum DAO has a built-in <a data-quicklook-from='arbitrum-dao-treasury'>treasury</a> system ([implemented as a smart contract](https://github.com/OffchainLabs/governance/blob/main/docs/overview.md)); the DAO's treasury is used to fund ongoing development and maintenance of the organization and its technology assets. Token holders can propose and vote on how to use the teasury's funds.

The Arbitrum DAO also has a built-in security mechanism called the <a data-quicklook-from='security-council'>Security Council</a>. The Security Council is a group of entities who are responsible for ensuring the security and integrity of the DAO and its chains. The council can bypass the slow voting process and take fast action in the case of security emergency, as outlined in the Constitution. The members of the Security Council are elected by the DAO via <a data-quicklook-from='security-council-election'>semiannual elections</a>.


Overall, the Arbitrum DAO is a powerful tool for decentralized governance and community-driven management of the Arbitrum ecosystem. By holding $ARB tokens and participating in the governance process, individuals can have a direct impact on the future of Arbitrum and, by extension, Ethereum.
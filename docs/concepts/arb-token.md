---
id: arb-token
title: "The $ARB token: A conceptual overview"
sidebar_label: $ARB token
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

The **$ARB token** is an ERC-20 (todo - glossary) token that's used to participate in the <a data-quicklook-from="arbitrum-dao">Arbitrum DAO's</a> on-chain governance of its technology assets (todo - footnote). The token is minted by a <a data-quicklook-from='smart-contract'>smart contract</a> that lives on <a data-quicklook-from='arbitrum-one'>Arbitrum One</a>, a <a data-quicklook-from='layer-2-l2'>Layer 2</a>  <a data-quicklook-from='arbitrum-rollup-chain'>Arbitrum rollup chain</a>. It's a <a data-quicklook-from='governance-token'>governance token</a> that members of the Arbitrum DAO use to vote on governance proposals (todo).

The **Arbitrum DAO** is a decentralized autonomous organization (todo), or DAO, that's responsible for managing both the governance protocol as defined within the [Constitution](../dao-constitution.md), and the technology assets that the DAO owns. This includes the <a data-quicklook-from='arbitrum-one'>Arbitrum One</a> and <a data-quicklook-from='arbitrum-nova'>Arbitrum Nova</a> chains.

If you own $ARB tokens, you can vote on governance proposals that affect the operation and evolution of the Arbitrum One and Arbitrum Nova chains. This includes proposals for upgrades to the chain, as well as proposals for how to use the funds owned by the <a data-quicklook-from='arbitrum-dao-treasury'>DAO Treasury</a>.

When you vote on an on-chain proposal, you're using your $ARB tokens to signal your support or opposition. The more $ARB tokens you have, the more influence your vote will have. This is because the Arbitrum DAO's smart contracts are implemented such that votes are <a data-quicklook-from='tokenweighted-governance'>token-weighted</a>, meaning that the power of a vote is determined precisely by the number of tokens the voter's wallet represents.

Note that $ARB tokens can be <a data-quicklook-from='delegate'>delegated</a> to other wallets. This means that you can vote using your own $ARB tokens (those in your own wallet), but you can also vote using someone else's $ARB tokens as long as the owner of those tokens has delegated their voting power to you. Delegation is useful for DAO members who don't have time to commit to reviewing and discussing DAO proposals on a regular basis[^1].

In summary, the $ARB token is a special-purpose digital asset that gives its holders the ability to vote on on-chain proposals that affect the operation and evolution of the Arbitrum DAO and the technology assets it owns. Holding $ARB tokens allows you democratically shape the future of the Arbitrum ecosystem alongside other values-aligned and incentives-aligned token holders.


(todo - consistent footnotes headers & formatting throughout)

#### Footnotes

[^1]: See [Delegates and delegation: A conceptual overview](./delegate-delegation) to learn more about this concept. See [How to delegate your voting power](../how-tos/select-delegate-voting-power) to learn how to transfer the voting power of your $ARB tokens to a delegate of your choosing.

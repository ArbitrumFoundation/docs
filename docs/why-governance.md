---
id: why-governance
title: Why decentralize Arbitrum governance with $ARB?
sidebar_label: Why decentralize governance?
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

<a data-quicklook-from="arb">$ARB</a> is the governance token for the Arbitrum ecosystem created on [TODO], roughly [TODO] after <a data-quicklook-from="arbitrum-one">Arbitrum One</a> had been live on mainnet. Here we explain the rationale behind introducing the $ARB <a data-quicklook-from="governance-token">governance token</a> , and how it plays a necessary role in the <a data-quicklook-from="progressive-decentralization">progressive decentralization</a> of the Arbitrum protocol.

### Protocol upgrades and chain ownership

Arbitrum chains like Arbitrum One have a concept of a "<a data-quicklook-from="arbitrum-chain-owner">chain owner</a>." A chain owner isn't strictly part of the [Arbitrum protocol](https://github.com/OffchainLabs/nitro/blob/master/docs/Nitro-whitepaper.pdf), but is rather essentially an administrator of the chain, responsible for managing how changes are made to the system. More specifically, a chain's owner [can modify core system parameters](https://developer.arbitrum.io/arbos/precompiles#ArbOwner), [pause incoming transactions](https://github.com/OffchainLabs/nitro/blob/f1866a8be0deb6209d47319eeeced06c2b16b5a4/contracts/src/bridge/Inbox.sol#L106), and - most importantly - update any of the [contracts that define and enforce the core protocol](https://developer.arbitrum.io/useful-addresses).

It's necessary to have some way to upgrade an Arbitrum chain's core contracts for several reasons. First, planned improvements need to be made to the system. Arbitrum has already gone through several such upgrades (most notably, its evolution to [Arbitrum Nitro](https://developer.arbitrum.io/why-nitro#nitro-vs-classic) from the "Arbitrum Classic" tech stack), and there will likely be more [that we can't even currently anticipate](https://twitter.com/sgoldfed/status/1570262560947183617?s=20&t=R1VBQFAB5BaVUwjs1ur0xQ) as technological progress continues. Additionally, if a critical bug in the Arbitrum codebase is discovered, upgrades may be necessary to fix it. Finally, changes will be necessary to remain compatible with Ethereum as Ethereum undergoes its own hard-fork improvements.

The ability to arbitrarily change how an Arbitrum chain works obviously makes the chain ownership role quite powerful, and thus it can't be taken lightly when considering the decentralization of the Arbitrum technical stack.

### The necessity of L2 on-chain governance

Given the potential vector for centralization that chain ownership introduces, it's worth asking whether we can simply do away with ownership entirely and handle protocol upgrades some other way. Ethereum itself, for example, has no explicit notion of a "chain owner", and yet has gone through numerous upgrades over its ~7 year life span, both to improve the system (new features, better performance, etc.) and to fix critical bugs.

Here though, we get to a crucial difference between Ethereum and Arbitrum: Ethereum is a <a data-quicklook-from='layer-1-l1'>Layer 1 (L1)</a> protocol, and L1 protocols (and in turn, changes to L1 protocols) are ultimately defined by <a data-quicklook-from='offchain-governance'>social consensus</a>. When the community wants to upgrade Ethereum, those running the Ethereum node software install the software upgrade, and if the community at large agrees that the new change represents the "real Ethereum," then it implicitly, inherently, is so. Everyone chooses for themselves whether to adopt the change, and the choice that has critical mass becomes canonical.

<a data-quicklook-from='layer-2-l2'>Layer 2 (L2) </a>protocols like Arbitrum One, however, are fundamentally different in that their rules are ultimately *not* governed implicitly by social consensus, but rather explicitly by L1 smart contracts. For Arbitrum One to upgrade, it isn't enough to simply upgrade the Arbitrum node software; its contracts must upgrade as well, which are controlled not by the social consensus of the Arbitrum community, but by Ethereum itself.

The upshot is that the consensus to upgrade Ethereum can be an informal and off-chain process, whereas the consensus to upgrade Arbitrum must operate through a formal decision process governed by on-chain contracts. In other words, governance.

There's a possible future scenario that would enable Arbitrum chains to upgrade without any explicit ownership: the Ethereum community may someday deem it acceptable to modify L1 consensus in order to upgrade Arbitrum One. That is, Ethereum's social consensus could allow hard forking of the L1 for the sake of particular L2s. L2 chains under this hypothetical arrangement have been deemed "[enshrined rollups](https://twitter.com/apolynya/status/1511623766664966146?s=20&t=u3HjXgi2UFK5kGOXy1_QCA)".

While it's possible that Ethereum's L2s eventually become enshrined in this way, this isn't something we'll see any time in the near future. Such a change to the Ethereum/L2 ecosystem would have to eventuate from wider discussion and debate within the Ethereum community; a decision like this is largely outside of the control of the Arbitrum community. In the meantime, we need a solution that can be implemented today.

So given that we need a path towards protocol upgrades, and that enshrined rollups are (at least currently) off the table, the only viable option remaining, then, is explicit on-chain governance.




### Enter $ARB governance token for decentralized governance

The introduction of the $ARB governance token provides the ability to carry out decentralized protocol upgrades.

Tokens were initially <a data-quicklook-from='airdrop'>airdropped</a> via transparent criteria meant to be as fair as possible [TODO link]. The goal was to spread out ownership to a large set of parties with stake in the Arbitrum ecosystem who are geographically distributed and have diverse backgrounds and affiliations. The chain ownership role is given to this <a data-quicklook-from='arbitrum-dao'>“Arbitrum DAO”</a>, our shorthand for the collective of all holders of the ARB token (and those delegated voting rights by token holders). 

There are two paths through which a protocol upgrade can take place. The first is a **decentralized** upgrade path that allows the DAO (and only the DAO) to carry out every step in the process: proposing an upgrade, publicly debating it, voting on it, and ultimately activating it.

Several important properties are preserved in a decentralized upgrade process, all of which are enforced at the smart contract level:

- No permissioned parties are required at any step; the DAO itself can carry out the entire process.
- The DAO is given time to view a proposal before voting on it and, if it gets to that stage, given sufficient time to vote on it.
- Once a proposal passes, Arbitrum users are given time to withdraw funds from the system, should they disagree with the direction and prefer to opt out.


### Security Council

The second protocol upgrade path doesn't involve the Arbitrum DAO directly. Along this path, a permissioned group of publicly named entities called the <a data-quicklook-from='security-council'>Security Council</a> has the ability to upgrade the protocol directly and without delays in case of emergency.

This is a critically necessary role to protect against emergencies like the discovery of exploitable vulnerabilities, in which case the typical slow governance path is not viable for two reasons:

1. If there's a critical vulnerability that can be exploited, it's counterproductive to broadcast it on the public governance forum before it has been mitigated.
2. The fix to such a vulnerability should go into effect immediately and not have the several week delay of typical governance changes.

The Council is bound by the Arbitrum Constitution to only use its powers when necessary for these sorts of emergencies, and to issue a transparent report when appropriate whenever its powers are used. To keep its council in check, the DAO holds semi-annual elections of its members.

The council can also trigger non-emergency upgrades, such as routine software upgrades and maintenance. These upgrades don't require a DAO vote to pass; they instead go through a delay period before taking effect, giving users time to opt out by withdrawing (as with decentralized DAO upgrades).

For details about both the decentralized governance process and the Security Council's role, see the Arbitrum Constitution [TODO link].


### The future of Arbitrum governance

The initial governance launch provides the community with the tools it needs: a means of decentralized governance, along with a faster, permissioned upgrade path to ensure the system remains safe in case of emergencies. As for how this system will change moving forward, many open questions remain:

- Can the governance process be further decentralized?
- How and when can the Security Council's power be further minimized, or eliminated entirely?

These don't have easy answers and will continue to be the topic of lively discussion within the community as the Arbitrum technology continues to mature, and as the perceived risk profiles of various states of decentralization change along with it. But crucially, the Arbitrum governance system controls *all* aspects of the Arbitrum protocol, including the governance process itself.

With the DAO in control, questions about how governance should evolve over time are no longer under the purview of any one particular entity, but are now in the hands of the Arbitrum community.


---


**FAQ:**

- todo:qqq, injected from base and linked throughout

---

**Footnotes:**

<a id='footnote-1'>1.</a> See our <a href='https://gas.arbitrum.io/'>gas cost estimator</a> and <a href='https://l2fees.info/'>L2Fees</a> for more information.<br/>
<a id='footnote-2'>2.</a> todo:qqq

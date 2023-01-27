---
id: gentle-intro-dao-governance
title: A gentle introduction to Arbitrum DAO
sidebar_label: A gentle introduction
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


**In a nutshell:**

- <a data-quicklook-from='arbitrum-rollup'>Arbitrum Rollup</a> and <a data-quicklook-from='arbitrum-anytrust'>Arbitrum AnyTrust</a> are protocols that make Ethereum transactions faster and cheaper. Developers use Arbitrum One and Arbitrum Nova, the chains that implement these protocols, respectively, to build user-friendly <a data-quicklook-from='decentralized-app-dapp'>decentralized apps</a>.
- Governance of this technology is now being decentralized through the distribution of <a data-quicklook-from='arb'>$ARB</a> governance tokens.
- $ARB tokens can be used to vote on Arbitrum DAO governance proposals, allowing $ARB holders to shape Arbitrum's future together.
- Token holders will be able to delegate voting power to any individual they trust. These individuals are called delegates.
- **To determine your airdrop eligibility**, connect your wallet to the Arbitrum One network on [gov.arbitrum.io](http://gov.arbitrum.io) and follow the prompts. Do this by (todo:qqq).
- **To become an Arbitrum DAO delegate**, review the below material and then **submit your application** (todo:qqq).
- **To build decentralized apps on Arbitrum,** check out the [developer docs](https://developer.arbitrum.io/intro/).

<br />


### Hello! What's Arbitrum again?

Arbitrum is a protocol that makes Ethereum transactions faster and cheaper. Developers use Arbitrum to build user-friendly decentralized apps (dApps) that can take advantage of the scalability benefits of the Arbitrum Rollup and AnyTrust protocols.

Our flagship chain, Arbitrum One, was [launched in 2021](https://offchain.medium.com/introducing-arbitrum-one-our-mainet-beta-ed0e9b63b435). This was quickly followed by the launch of [Arbitrum Nova](https://medium.com/offchainlabs/introducing-nova-arbitrum-anytrust-mainnet-is-open-for-developers-9a54692f345e), a separate [AnyTrust chain](https://medium.com/offchainlabs/introducing-anytrust-chains-cheaper-faster-l2-chains-with-minimal-trust-assumptions-31def59eb8d7) built for ultra low-cost transactions. In August 2022, Arbitrum One was [upgraded to the Arbitrum Nitro stack](https://medium.com/offchainlabs/arbitrum-nitro-one-small-step-for-l2-one-giant-leap-for-ethereum-bc9108047450), bringing a 7-10x upgrade to its scaling capabilities.

Governance of this technology is now being decentralized through the distribution of $ARB governance tokens. $ARB tokens can be used to vote on Arbitrum DAO governance proposals, allowing $ARB holders to collectively shape the future of Arbitrum protocols and chains. Token holders can also delegate their voting power to any individual they trust; these individuals are called delegates.

### What's governance?

Governance is the way that decisions get made. To understand what this means, let's compare traditional web2 governance to web3 governance.

**Web2 technologies** are traditionally built by corporations governed by a board of directors. This board is usually a small group of people elected by shareholders.

When a corporate decision needs to be made, members of the board meet and vote. The board's decision-making protocols aren't always visible to shareholders. Although the board has a fiduciary duty to its shareholders, shareholders must trust the board. This is a sort of _social contract_ expressed as _corporate legalese_ and enforced by _law_.

**Web3 technologies** (like Arbitrum's protocols and chains) are often built by corporations governed _initially_ by a board of directors. Once these technologies achieve product-market fit, the board can gradually decentralize its decision-making authority. This is called [progressive decentralization](./concepts/progressive-decentralization.md). There are three key components to our current step in this process:

1. **DAO formation**: The Arbitrum DAO (decentralized autonomous organization) is a new entity that will own the Arbitrum One chain and Arbitrum Nova chain. This DAO is governed by The Constitution of the Arbitrum DAO, which is a set of rules that describe how the DAO will operate. The Constitution is enshrined within a number of social contracts that are used by the Arbitrum DAO to govern itself and its technology assets.
2. **Governance token launch**: Ownership of governance tokens represents membership within the DAO. Token holders can vote on DAO proposals. Arbitrum's governance token is **$ARB**, and will be distributed to eligible wallet addresses via an upcoming airdrop.
3. **Code**: DAO governance is usually facilitated by a series of open source [smart contracts](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html) that enforce a specific decision-making protocol. These _trustless_ smart contracts are used to gradually replace the traditional board's _trusted_ social contract. Arbitrum DAO uses smart contracts to codify the decision-making protocol articulated within the Constitution of the Arbitrum DAO.

### So $ARB is a token, kind of like $ETH?

Kind of! Let's compare them:

**How $ETH and $ARB are similar**:

- Both are powered by decentralized blockchain technology.
- Both can be owned by any cryptocurrency wallet that supports $ETH.
- Both can be bought, sold, and traded.

**How $ETH and $ARB are different**:

- $ETH is a transactional token, while $ARB is a governance token.
- $ETH is used to pay for transaction fees, while $ARB is not.
- Governance of Arbitrum is facilitated by $ARB and governance smart contracts, while [Ethereum's governance](https://ethereum.org/en/governance/) is handled socially.
- Holding $ARB makes you a partial owner of Arbitrum, while holding $ETH does not make you a partial owner of the Ethereum's protocol.

### Why is this important?

Decentralization of Arbitrum's technology governance represents an important step towards community ownership of Ethereum's scaling technologies, and further aligns our incentives with those of the Ethereum community at large. This is a big deal because it means that the Arbitrum DAO will be able to democratically make decisions that are in the best interest of the Arbitrum and Ethereum communities, rather than having faith in the good will of a small group of people.

### Cool beans. Am I eligible for the airdrop?

If you've used Arbitrum at any time before the the snapshot date (August 31st, 2022 - [block 22207817](https://arbiscan.io/block/22207817) on Arbitrum One), you're probably entitled to some $ARB tokens. The easiest way to find out if you're eligible is to visit [gov.arbitrum.io](http://gov.arbitrum.io/) and follow the prompts.

### How does Arbitrum's governance work?

Governance of the Arbitrum Rollup protocol is driven by two governing bodies: the **Security Council** and the **Arbitrum DAO**.

- The **Security Council** is a 12-member council of publicly known entities elected by members of the Arbitrum DAO. This council is responsible for ensuring Arbitrum's security and performance through the selective application of **emergency actions (todo - consistent proper nouning / labeling - clarify that these are distinct bodies)** if/when necessary.
- The **Arbitrum DAO** is the worldwide community of $ARB token holders and the delegates that they select. The DAO is responsible for governing Arbitrum and its Security Council. The DAO can use constitutional proposals to modify the Security Council's powers, or even to eliminate the Security Council entirely. The Security Council's powers are delegated to the Security Council by the DAO, and are to be exercised in the best interests of the DAO.

### What sorts of decisions is Arbitrum’s Governance System responsible for making?
Most importantly, Arbitrum Governance is in charge of upgrading Arbitrum chains’ core contracts, which define and enforce the Arbitrum protocol. There are several possible motivations behind one of these upgrades: an upgrade could improve the system in some way, like increase its decentralization or optimize its performance and lower fees; an upgrade may also be done to fix some vulnerability that’s discovered. Less critical decisions that affect the Arbitrum ecosystem at large can also be made by Governance. (See “Why Governance” for more).

### Who cares about this stuff?

You can think of our stakeholder groups as a stack of layers. At the top of the stack, we have our **web3 user layer**. All other layers work together to support the web3 user layer:

- **Web3 user layer:** Includes decentralized app (dApp) users - users of web3 applications.
- **Web3 app layer:** Includes all of the dreamers, hackers, and makers who are building decentralized apps and tooling to support dApp development.
- **Layer 2 (L2):** Includes Offchain Labs, Arbitrum DAO, the Arbitrum community, node operators, sequencers, and other Layer-2 builders who are working hard to fulfill Ethereum's [rollup-centric roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698).
- **Layer 1 (L1)**: Includes consensus & execution layers.
  - **Consensus layer (CL):** Includes Prysm and other consensus-layer teams who support Ethereum's beacon chain with consensus-layer client software.
  - **Execution layer (EL):** Includes Geth and other execution-layer teams building execution-layer client software.
- **Research layer:** Includes researchers and protocol engineers who are working on the cutting edge of cryptography, mechanism design, and governance protocols.

### All of these people can govern Arbitrum One and Arbitrum Nova?

Yep! As long as they either hold $ARB or are a delegate.

### What's a delegate again?

A delegate is like an elected representative. $ARB token holders can delegate their voting power to anyone they choose.

### Why would I want to become a delegate?

There are a lot of people who don't have time to actively participate in protocol governance. Delegates help these people by offering to vote on their behalf.

Delegates are a critical component of Arbitrum's decentralization because they allow our token holders to passively participate in the governance of our technology. Although becoming a delegate is a serious responsibility that requires a significant time commitment, it allows you to ensure that Ethereum's values (and those of the delegators who have entrusted you with their voting power) are forever enshrined within our decisions and decision-making protocols.

### I'd like to participate! What are my options?

1. **Select a delegate** to vote on your behalf. Choose this option if you're too busy to regularly vote on Arbitrum DAO proposals. See _How to select a delegate_ (todo:qqq).
2. **Self-delegate** to vote directly on DAO proposals. Great for studious fans of direct democracy. See _Vote on proposals_ (todo:qqq).
3. **Become a delegate** to vote on behalf of token holders who entrust you with their voting power. Great for our most passionate community members. See _How to become a delegate._
4. **Participate in governance discussions** on the [Arbitrum DAO governance forum](https://forum.arbitrum.io/).
5. **Join the community of Arbinauts** on our [Discord](https://discord.gg/arbitrum).

### Why can't I claim my $ARB tokens right now?

We're as excited as you are for the airdrop! We also want to ensure that token recipients and DAO delegates have the best possible experience, so we're using a two-step process:

1. **Call for delegates**. We are here. As delegates are onboarded, we'll get closer to the second, more exciting step…
2. **$ARB airdrop**. At this point, you'll be able to claim $ARB tokens and then use your voting power to shape Arbitrum's future.

This two-step process lets us prepare a smooth airdrop experience for you.

### Wen airdrop?

We're currently targeting todo:qqq for the airdrop - this is when you'll be able to claim your tokens on the [governance portal](http://gov.arbitrum.io) - the same portal used to check eligibility. You'll then be able to select a delegate (link) or delegate to yourself (link).

If this target date changes, we'll update this document and we'll todo:qqq - stay tuned!

### Where can I learn more?

You're in the right place! The following docs elaborate on the finer details of Arbitrum DAO and its underlying governance mechanisms:

- **_Airdrop eligibility and token distribution details_**: Tells you how $ARB eligibility is determined, and how $ARB tokens are being distributed.
- **_Constitution of the Arbitrum DAO_**: The human-readable governance protocol that our DAO's smart contracts implement.
- **_Arbitrum DAO FAQ_**: Frequently asked questions, succinctly answered.
- **_Arbitrum DAO Glossary_**: An index of governance terms and definitions.
- (todo:qqq - index all publishable docs here, make it clear that some of these are stretch docs)

### Where can I ask for help?

 - [Discord](https://discord.gg/arbitrum)
 - [Telegram](https://t.me/arbitrum)
 - [Arbitrum DAO governance forum](https://forum.arbitrum.io/)

### Thank you!

Thank _you_. Developers are using Arbitrum to power the next generation of web experiences partly because of our technology, but mostly because of our community of builders and believers. You're giving us a lot to look forward to.

And to think that we're just getting started! Just over a year ago, it was commonly believed that scaling Ethereum was impossible. Today, Arbitrum powers the world's most popular web3 experiences (check out that [TVL](https://l2beat.com/scaling/tvl/)). Our team is relentlessly reducing the cost of web3 application development while making it easy for our most beloved web2 apps to progressively decentralize.

At the same time, diverse communities are organically emerging from within our app ecosystem. Developers are using Arbitrum to run their experiments across all major app categories, including DeFi, gaming, social, art, and NFTs. Who knows what new categories will emerge as the world's hackers, makers, and dreamers use Arbitrum to tinker at scale.

In 2022 we saw Arbitrum's Nitro upgrade, Ethereum's Merge, our merge with Prysmatic Labs, and the formation of Arbitrum DAO. Without skipping a beat, 2023 has opened with a highly anticipated airdrop and call for delegates.

We're moving fast and meeting needs. The specter of Ethereum's rollup-centric future is upon us. Cheap, fast, and secure transactions are here. New economic games are being unlocked, quietly for now. Thanks for playing! We're looking forward to a bright future ahead as we decentralize Arbitrum, scale Ethereum, and build a better world together. 💙🌱

<br />

---


**FAQ:**

import FaqPartial from '@site/docs/partials/_faq-partial.md';

<div data-faq-origin-slug='gentle-introduction-dao'>
    <FaqPartial />
</div>


---

**Footnotes:**

<a id='footnote-1'>1.</a> See our <a href='https://gas.arbitrum.io/'>gas cost estimator</a> and <a href='https://l2fees.info/'>L2Fees</a> for more information.<br/>
<a id='footnote-2'>2.</a> todo:qqq

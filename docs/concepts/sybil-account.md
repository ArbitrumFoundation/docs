---
id: sybil-account
title: "Sybil accounts: A conceptual overview"
sidebar_label: Sybil accounts
description: Learn about Sybil accounts and how they were detected prior to the $ARB airdrop.
voice: Arbitrum DAO
tone: Objective, succinct, precise.
tense: Present - avoid present progressive. Past tense as needed.
person: Second/third - address reader directly as "you" when appropriate, refer to the DAO as the DAO, not as "we".
dao_author: dzgoldman
dao_sme: dzgoldman
---

import DraftExpectationsPartial from '@site/docs/partials/_draft-expectations-partial.md'; 

<DraftExpectationsPartial />


### What are Sybil accounts?

In the context of Arbitrum Governance, Sybil accounts are Arbitrum accounts controlled by an entity trying to create the false appearance of being many entities via deceptive on-chain activity in order to unfairly game the <a data-quicklook-from='arb'>$ARB</a> <a data-quicklook-from='airdrop'>airdrop</a>.

### How were Sybil accounts detected prior to the airdrop?

A process called "Sybil hunting" was used to detect and remove Sybil accounts. The process involved creating a graph of all transactions that have taken place on <a data-quicklook-from='arbitrum-one'>Arbitrum One</a>, and then partitioning this graph into different subgraphs. The subgraphs that have a large number of nodes and a high degree of connectivity were considered to be likely Sybil clusters. The accounts within these clusters were collapsed into a single recipient account for the airdrop. Entities explicitly known to by Sybils were also removed; the dataset of these known entities was created with help from our friends at [Nansen](https://www.nansen.ai/) and [Hop](https://hop.exchange/). See [Arbitrum Sybil Hunting](https://github.com/OffchainLabs/arb-sybil/tree/master/v2) for more information. 


### Why is it important to prevent Sybil accounts?

By receiving an outsized share of the $ARB aidrop, Sybil accounts can lead to concentration of voting power and undermine the decentralized nature of the <a data-quicklook-from='arbitrum-dao'>Arbitrum DAO</a>. By preventing Sybil accounts, the Arbitrum DAO is able to ensure that the initial token distribution is as fair as possible.

### Why not use proof-of-personhood? 

Criteria for allotment of the $ARB airdrop involves on-chain activity. The ability for users to interact with Arbitrum One permissionlessly and pseudonymously is a fundamental property of the system. Requiring some sort of identity verification for airdrop-qualification would undermine this core value, and thus wasn't considered.


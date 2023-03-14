---
id: new-arb-chains
title: 'Creating New Arbitrum Chains'
sidebar_label: Creating New Arbitrum Chains
description: Understanding how and why new Arbitrum chains will be created
dao_author: dzgoldman
dao_sme: dzgoldman
---

This page will cover the creation of new mainnet Arbitrum Chains — chains beyond the currently-live <a data-quicklook-from='arbitrum-one'>Arbitrum One </a> and <a data-quicklook-from='arbitrum-nova'>Nova</a>. It will discuss how and why new chains may get created, and where the <a data-quicklook-from='arbitrum-dao'>Arbitrum DAO</a> fits in.

### Why Multiple Chains?

Some may ask why the Ethereum ecosystem needs multiple chains at all; wouldn't it be easier to move all activity onto one big <a data-quicklook-from='arbitrum-rollup-chain'>rollup</a> chain, like Arbitrum One?

Despite certain conveniences of concentrating all activity onto a single chain, a multi-chain ecosystem not is just desirable, but _necessary_ for Ethereum's future.

This is true for several reasons:

1. **Better Scalability** While Arbitrum chains help alleviate the scaling bottlenecks of Ethereum, Arbitrum chains themselves hit their own similar scaling bottlenecks (e.g. state grown and congestion limits).
   An ecosystem with multiple chains alleviates these bottlenecks by siloing activity into opt-in environments which manage their own resources separately.
1. **Different Security Models** Different chains can experiment with different security models and take advantage of the trade-offs they offer. This can currently be seen, for example with, Arbitrum One and Arbitrum Nova, the former which offers stronger trust-minimization, and the later which offers lower fees.
1. **Different Execution Environments** Different chains can also experiment with different execution environments. Arbitrum chains are fully EVM compatible; app-specific chains can deliberately have more restrictive smart contract functionality to optimize for better performance.

It's thus crucial that the Arbitrum ecosystem have a strategy for a multi-chain world.

### Terminology Sidenote: L2s, L3s, and Beyond

For the purposes of this page: the term "layer 2" (or L2) will refer to any Arbitrum chain that settles directly onto Ethereum; i.e., a chain with native bridge contracts on Ethereum <a data-quicklook-from='layer-1-l1'>layer 1</a>. "L3s" will refer to Arbitrum chains that settle onto _L2s_. (One can similarly imagine L4s, L5s, and so on.)

### New L2s: Arbitrum DAO Authorized

The Arbitrum DAO can authorize the creation of new L2 chains. New L2 chains are authorized via a constitutional [governance proposal](./how-tos/create-submit-dao-proposal.md); if the proposal passes, a new chain will be created. The DAO can authorize new chains to be among the chains governed by the Arbitrum DAO (i.e., such that the [DAO constitution](./dao-constitution.md) will apply to it as it does currently to Arbitrum One and Nova), or may authorize new chains to governed by other means.

### New L3s: No Authorization Required

For the creation of new _L3s_ that run on top of Arbitrum L2s, no authorization or approval is required at all — not from the Arbitrum DAO or anyone else. L3s (and L4s, L5s, etc.) can be deployed permissionlessly, like any other Arbitrum contracts. This includes L3 chains that use custom modifications to the Arbitrum Nitro codebase, chains that introduce their own novel governance structures, and so on.

This architecture ensures that the community ha some control over how the Arbitrum tech stack is used, while still leaving room to foster the open, permissionless innovation expected from a vibrant web3 ecosystem.

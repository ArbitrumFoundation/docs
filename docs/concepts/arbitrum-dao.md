---
id: arbitrum-dao
title: "Arbitrum DAO: A conceptual overview"
sidebar_label: Arbitrum DAO
description: Learn about the Arbitrum DAO, its governance token, and its built-in treasury and security mechanisms.
voice: Arbitrum DAO
tone: Objective, succinct, precise.
tense: Present - avoid present progressive. Past tense as needed.
person: Second/third - address reader directly as "you" when appropriate, refer to the DAO as the DAO, not as "we".
dao_author: symbolpunk
dao_sme: dzgoldman
---

import DraftExpectationsPartial from '@site/docs/partials/_draft-expectations-partial.md'; 

<DraftExpectationsPartial />

The <a data-quicklook-from='arbitrum-dao'>Arbitrum DAO</a> is a decentralized autonomous organization (DAO) built on the Ethereum blockchain. At its core, the Arbitrum DAO is a community-driven <a data-quicklook-from='governance'>governance</a> mechanism that allows <a data-quicklook-from='arb'>$ARB</a> token holders to propose and vote on changes to the organization and the technologies it governs.

The Arbitrum DAO's governance <a data-quicklook-from='smart-contract'>smart contracts</a> are implemented on the <a data-quicklook-from='arbitrum-one'>Arbitrum One</a> rollup chain, which is a <a data-quicklook-from='layer-2-l2'>Layer 2</a> scaling solution for the Ethereum blockchain. These smart contracts include the DAO's governance token, $ARB. DAO members use $ARB tokens to vote on Arbitrum DAO proposals (<a data-quicklook-from='arbitrum-improvement-proposal-aip'>AIPs</a>). The weight of any given voter's vote is proportional to the amount of $ARB they hold (or represent)[^1].

The Arbitrum DAO has a built-in <a data-quicklook-from='arbitrum-dao-treasury'>treasury</a> system ([implemented as a smart contract](https://github.com/OffchainLabs/governance/blob/main/docs/overview.md)); the DAO's treasury is used to fund ongoing development and maintenance of the organization and its technologies. Token holders can propose and vote on how to use the teasury's funds.

The Arbitrum DAO also has a built-in security mechanism called the <a data-quicklook-from='security-council'>Security Council</a>. The Security Council is a group of entities who are responsible for ensuring the security and integrity of the DAO and its chains. The council can bypass the slow voting process and take fast action in the case of security emergency, as outlined in the Constitution. The members of the Security Council are elected by the DAO via <a data-quicklook-from='security-council-election'>semiannual elections</a>.

Overall, the Arbitrum DAO is a powerful tool that facilitates decentralized governance and community-driven management of the Arbitrum ecosystem. By holding $ARB tokens and participating in the governance process, individuals can have a direct impact on the future of Arbitrum and, by extension, Ethereum.

[^1]: Some DAO members might not have the capacity to actively participate in the governance process. These members can delegate their voting power to other members who are able to actively participate. This mechanism is called "voting delegation". See [Delegates and delegation](./delegate-delegation) to learn more about this concept. If you hold $ARB tokens and want to delegate your voting power, see [How to delegate your voting power](../how-tos/select-delegate-voting-power).

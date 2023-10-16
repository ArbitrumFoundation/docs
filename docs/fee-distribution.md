---
id: fee-distribution
title: Fee Distribution
sidebar_label: Fee Distribution
description: Learn how fees collected on DAO-governed chains are distributed
dao_author: dzgoldman
dao_sme: dzgoldman
---

### Overview

Users pay fees when transacting on <a data-quicklook-from='arbitrum-one'>Arbitrum One</a> and <a data-quicklook-from='arbitrum-nova'>Arbitrum Nova</a> in the chains' native currency, Ether. Fees exist as a spam / denial-of-service prevention measure, as well as a way to pay for the chains' operational and maintenance costs.

Several different things are accounted for when computing a user's transaction fee, as discussed below. One portion of a transaction fee — "the L1 Base Fee" — goes to the entity controlling the chain's Sequencer, which for both chains is the Arbitrum Foundation. This portion of the fee compensates the Sequencer for the costs it pays to post users' transactions on layer 1; i.e., by receiving this fee, the Sequencer / the Arbitrum Foundation breaks even over time, but does not generate profit.

On Arbitrum One, the remainder of a transaction's fee goes directly to the <a data-quicklook-from='arbitrum-dao'>Arbitrum DAO</a>. On Arbitrum Nova, the remainder goes mostly to the DAO, while a portion goes to various third parties running the chain's critial infrastructure (see below).

### Fee Breakdown

The total fee that a user pays for a transaction is computed as the sum of four 4 different components:

| Fee            | Description                                                                                                                                                                                                                                                                                                                                                                                       | Recipient (Arbitrum One)                | Recipient (Nova)                                                           |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | -------------------------------------------------------------------------- |
| L1 Base Fee    | The L1 Base Fee is the estimated cost of L1 calldata a transaction will contribute to a batch. When a batch is posted, the actual cost paid the Sequencer is reported to L2, and the estimated L1 cost adjusts accordingly. This ensures the Sequencer breaks even (i.e., neither profits or operates at a lost) over time. For more info, see [here](https://docs.arbitrum.io/arbos/l1-pricing). | The Sequencer / The Arbitrum Foundation | The Sequencer / The Arbitrum Foundation                                    |
| L2 Base Fee    | The L2 Base Fee pays the minimum L2 gas price for each of unit of L2 gas in a given L2 transaction. This minimum L2 gas price is 0.1 gwei on Arbitrum One and 0.01 gwei on Arbitrum Nova.                                                                                                                                                                                                         | The DAO                                 | 80% to the DAO, remaining 20% to parties running Nova Validators / the DAC |
| L2 Surplus Fee | With sufficient chain congestion, the L2 fee increases above the minimum L2 gas price; the fee paid to cover the difference between the gas price and the minimum gas price for each unit of gas is the L2 Surplus Fee.                                                                                                                                                                           | The DAO                                 | The DAO                                                                    |
| L1 Surplus Fee | Additional fee charged as proportion of L1 base fee, beyond, e.g., the amount strictly necessary for the Sequencer to break even.                                                                                                                                                                                                                                                                 | The DAO                                 | The DAO                                                                    |

For both Arbitrum One and Nova, any of the fee recipients can be updated by the DAO via a [constitutional proposal](./how-tos/create-submit-dao-proposal.md).

### Implementation Details

Fees for each of the four fee-components initially accrue at a distinct [Reward Distributor contract](https://github.com/OffchainLabs/fund-distribution-contracts); at any point, the fees can be distributed to their target recipients by any party via a permissionless contract call. This design allows for ease of distributing fees to multiple parties at different proportions, as well as a means for the DAO to easily change fee recipients.

On Arbitrum One, the fee recipient for "the DAO" is the [Treasury Timelock](https://arbiscan.io/address/0xbfc1feca8b09a5c5d3effe7429ebe24b9c09ef58); the DAO can spend these funds via a [treasury governance proposal](./how-tos/create-submit-dao-proposal.md). For Nova, the DAO's fee recipient is an address accessible via cross-chain messages from a core governance proposal.

For fee distribution contract addresses, see [here](./deployment-addresses.md).

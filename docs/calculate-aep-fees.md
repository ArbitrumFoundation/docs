---
id: calculate-aep-fees
title: 'AEP Fees Formula'
sidebar_label: AEP Fees Formula
description: Information for operators of Arbitrum Chains on how to compute the AEP Fees
dao_author: stonecoldpat
dao_sme: stonecoldpat
---

# Fee Calculation for Arbitrum Expansion Program

All blockchains, including Arbitrum Chains, enable users to create transactions, pay fees, and perform executions on the network. 

## Fees in Arbitrum Chains
In Arbitrum, the chain collects all fees paid by users, and each fee paid is split up to cover different costs associated with the chain. This split includes: 

- `L1BaseFee`: Fees collected to cover the cost to settle the Rollup's transactions on the parent chain (i.e., blob data). 
- `L1SurplusFee`: Surplus funds after covering the cost to settle transactions on the parent chain. 
- `L2BaseFee`: Fees collected to cover the cost of executing transactions based on the L2 gas consumed. 
- `L2SurplusFee`: Surplus fees collected when an Arbitrum chain is congested. 

Note, all transactions fees on Arbitrum Chains are deterministic, based on its initial configuration, activity on the chain, and congestion of the parent chain. The Sequencer cannot tweak or impact the fees in real-time. 

## Calculating Arbitrum Expansion Program fees

The Arbitrum Expansion Program requires an Arbitrum Chain to return 10% of a chain's **Net Protocol Revenue** back to the Arbitrum ecosystem including the ArbitrumDAO and the Arbitrum Protocol Guild. 

Net Protocol Revenue is broadly the difference between (i) gross revenue and (ii) settlement costs, or put another way, the remaining fees after the covering the cost to settle transactions on the Arbitrum chain:

```python
AEP_FEES = [(gross revenue) - (settlement costs)]*0.1
```

As mentioned earlier, we need to split up the costs for consuming L2 gas to execute transactions on the Arbitrum Chain ('chain fees') and the settlement costs for data blobs published on the parent chain ('settlement fees'):

```python
AEP_FEES = [(sequencing revenue + additional revenue) - (settlement costs)]*0.1
```

 Finally, to connect the net protocol revenue with how the fees are collected on an Arbitrum Chain, they are computed using the following formula:

 ```python
AEP_FEES = [(l2BaseFee + l2SurplusFee + l1BaseFee + l1SurplusFee) - (l1BaseFee)]*0.1
```

The motivation is that the ```L1BaseFee``` represents the only on-chain liability for the Arbitrum Chain as this is covers their cost for publishing data blobs on the parent chain. 

All other costs including ```L2BaseFee```, ```L2SurplusFee```, and ```L1SurplusFee``` represents the net revenue for the chain and the AEP aims to capture 10% of the fees collected. 

## Additional Revenue Sources

The Arbitrum Expansion Program allows projects to customize their Arbitrum Chain to suit their business needs. 

These changes may allow projects to generate other sources of revenue. For example, extracting value via transaction ordering policies, collecting fees when users deposit onto the Chain, and other methods that are not necessarily captured by transaction fees on the network. 

The AEP is sufficiently broad to take into account other revenue sources as they arise in the Arbitrum Chain. If your project is seeking non-traditional methods for capturing revenue, then please speak with the Arbitrum Foundation to ensure it is captured appropriate by the Arbitrum Expansion Program.
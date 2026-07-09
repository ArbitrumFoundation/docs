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

Note that all transaction fees on Arbitrum Chains are deterministic, based on their initial configuration, activity on the chain, and congestion of the parent chain. The Sequencer cannot tweak or impact the fees in real-time. 

## Calculating Arbitrum Expansion Program fees

The Arbitrum Expansion Program requires an Arbitrum Chain to return 10% of a chain's **Net Protocol Revenue** back to the Arbitrum ecosystem, including the ArbitrumDAO and the Arbitrum Protocol Guild. 

The Net Protocol Revenue is broadly the difference between (i) gross revenue and (ii) settlement costs, or put another way, the remaining fees after covering the cost to settle transactions on the Arbitrum chain:

```python
AEP_FEES = [(gross revenue) - (settlement costs)]*0.1
```

As mentioned earlier, we need to split up the costs for consuming L2 gas to execute transactions on the Arbitrum Chain ("chain fees") and the settlement costs for data blobs published on the parent chain ("settlement fees"):

```python
AEP_FEES = [(sequencing revenue + additional revenue) - (settlement costs)]*0.1
```

 Finally, to connect the net protocol revenue with how the fees are collected on an Arbitrum Chain, they are computed using the following formula:

 ```python
AEP_FEES = [(l2BaseFee + l2SurplusFee + l1BaseFee + l1SurplusFee) - (l1BaseFee)]*0.1
```

The motivation is that the `L1BaseFee` represents the only on-chain liability for the Arbitrum chain, as it covers the cost of publishing data blobs on the parent chain. 

All other costs, including `L2BaseFee`, `L2SurplusFee`, and `L1SurplusFee`, represent the net revenue for the chain. The AEP aims to capture 10% of the fees collected. 

## Additional Revenue Sources

The Arbitrum Expansion Program allows projects to customize their Arbitrum chains to suit their business needs. 

These changes may allow projects to generate other sources of revenue. For example, extracting value via transaction ordering policies, collecting fees when users deposit onto the chain, and other methods that are not necessarily captured by transaction fees on the network. 

The AEP is sufficiently broad to take into account other revenue sources as they arise in the Arbitrum chain. If your project is seeking non-traditional methods for generating revenue, please consult with the Arbitrum Foundation to ensure the Arbitrum Expansion Program accurately captures it.

## Special cases and exceptions

Certain Arbitrum chain configurations and customizations require special handling of AEP fees. The following is a non-exhaustive list of applicable scenarios and how to ensure AEP compliance. If any of the following cases apply, the recommended approach for fee handling will require manual handling of a portion of or all AEP Fees.

### L2-based custom gas tokens

If you are an L3 or higher chain with a custom gas token, your custom gas token contract might be deployed on L2. If this L2 is not an Arbitrum chain, then the L2 token can't be transferred via the AEP Fee Router, as this would first require bridging down to Ethereum (impossible for L2-based tokens). In this instance, we recommend your chain pay fees in **ETH** by manually sending fees to an **ETH**-configured routing system.

### Non-Ethereum L1

If your Arbitrum chain is deployed on a non-Ethereum L1 (e.g., Solana, BNB Chain), your fees must be manually transferred to a Foundation-controlled address.

### Novel fee-earning customizations

As discussed above in Additional revenue sources, if you have customized your Arbitrum chain to earn revenue through any enshrined component, this revenue must be calculated as part of the AEP fees. In such cases, we recommend engaging with the AF to agree on a revenue model and reporting cadence and then manually send additional fees into the routing system as required.

### Other cases

If you are still determining if your Arbitrum chain configuration applies to the listed or unlisted special cases, we recommend engaging with the Arbitrum Foundation.
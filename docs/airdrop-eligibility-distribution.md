---
id: airdrop-eligibility-distribution
title: $ARB airdrop eligibility and distribution specifications
sidebar_label: Airdrop eligibility and distribution
description: Learn about the $ARB airdrop eligibility and distribution specifications.
dao_author: pearring
dao_sme: pearring
---

import DraftExpectationsPartial from '@site/docs/partials/_draft-expectations-partial.md'; 

<DraftExpectationsPartial />

:::caution THERE IS NO PRESALE

The only official website for the $ARB airdrop is [https://arbitrum.foundation](https://arbitrum.foundation). There is no presale. Don't ever share your seed phrase. When in doubt, [join the Discord](https://discord.gg/arbitrum) to ask for clarification.

:::

<a data-quicklook-from='arb'>$ARB</a> is an ERC-20 <a data-quicklook-from='governance-token'>governance token</a> native to the <a data-quicklook-from='arbitrum-one'>Arbitrum One</a> rollup chain. Token properties at launch:


<table className="small-table">
    <tr>
        <td><strong>Initial supply cap</strong></td>
        <td>10 billion</td>
    </tr>
    <tr>
        <td><strong>Inflation</strong></td>
        <td>Max 2% per year</td>
    </tr>
    <tr>
        <td><strong>Minting/burning mechanism</strong></td>
        <td>L2 smart contract</td>
    </tr>
    <tr>
        <td><strong>Bridgeable to Ethereum L1?</strong></td>
        <td>Yes</td>
    </tr>
    <tr>
        <td><strong>Tokens launch on</strong></td>
        <td>Arbitrum One</td>
    </tr>
    <tr>
        <td><strong>On-chain governance (voting) happens on</strong></td>
        <td>Arbitrum One</td>
    </tr>
    <tr>
        <td><strong>Airdrop snapshot</strong></td>
        <td><a href='https://arbiscan.io/block/58642080'>Block 58642080</a> on Arbitrum One = February 6th, 2023</td>
    </tr>
    <tr>
        <td><strong>Claiming starts</strong></td>
        <td><a href='https://etherscan.io/block/countdown/16890400'>Block 16890400</a> on Ethereum Mainnet = March 23rd, 2023. Please note that $ARB cannot be minted or claimed on the Ethereum Mainnet; it is only minted and claimable on Arbitrum One.</td>
    </tr>
    <tr>
        <td><strong>Claiming ends</strong></td>
        <td><a href='https://etherscan.io/block/countdown/18208000'>Block 18208000</a> on Ethereum Mainnet = September 23rd, 2023 (estimated). Please note that $ARB cannot be minted or claimed on the Ethereum Mainnet; it is only minted and claimable on Arbitrum One.</td>
    </tr>
</table>


#### Initial token allocation & airdrop distribution

<table className="small-table">
    <tr>
        <td><strong>Percentage of initial supply</strong></td>
        <td><strong>Number of tokens</strong></td>
        <td><strong>Allocated to</strong></td>
    </tr>
    <tr>
        <td>42.78%</td>
        <td>4.278 billion</td>
        <td>Arbitrum DAO treasury</td>
    </tr>
    <tr>
        <td>26.94%</td>
        <td>2.694 billion</td>
        <td>Offchain Labs Team and Future Team + Advisors</td>
    </tr>
    <tr>
        <td>17.53%</td>
        <td>1.753 billion</td>
        <td>Offchain Labs investors</td>
    </tr>
    <tr>
        <td>11.62%</td>
        <td>1.162 Billion</td>
        <td><strong>Users</strong> of the Arbitrum platform (via airdrop to user wallet addresses)</td>
    </tr>
    <tr>
        <td>1.13%</td>
        <td>113 million</td>
        <td><strong>DAOs</strong> building apps on Arbitrum (via airdrop to DAO treasury addresses)</td>
    </tr>
</table>


TODO: clarify reader confusion about blocks


### User airdrop eligibility details

Airdrop eligibility is determined by the number of points earned by a user's wallet address. Points are earned by performing **qualifying actions** on the Arbitrum One and Arbitrum Nova rollup chains:

#### Qualifying actions

Qualifying actions on Arbitrum One:

 1. Bridged funds into Arbitrum One
 2. Conducted transactions during two distinct months
 3. Conducted transactions during six distinct months
 4. Conducted transactions during nine months
 5. Conducted more than four transactions or interacted with more than four different smart contracts
 6. Conducted more than ten transactions or interacted with more than ten different smart contracts
 7. Conducted more than 25 transactions or interacted with more than 25 different smart contracts
 8. Conducted more than 100 transactions or interacted with more than 100 different smart contracts
 9. Conducted transactions exceeding in the aggregate $10,000 in value
 10. Conducted transactions exceeding in the aggregate $50,000 in value
 11. Conducted transactions exceeding in the aggregate $250,000 in value
 12. Deposited more than $10,000 of liquidity into Arbitrum 
 13. Deposited more than $50,000 of liquidity into Arbitrum
 14. Deposited more than $250,000 of liquidity into Arbitrum

Qualifying actions on Arbitrum Nova: 

 1. Bridged funds into Arbitrum Nova
 2. Conducted more than three transactions
 3. Conducted more than five transactions
 4. Conducted more than ten transactions



#### Points-to-tokens conversion table

We'll use this table to calculate the precise number of tokens that you're eligible to claim in the next section:

<table className="small-table">
    <tr>
        <td><strong>Points scored</strong></td>
        <td><strong>Airdrop entitlement (will be used in the below calculations)</strong></td>
    </tr>
    <tr>
        <td>Less than 3</td>
        <td>Not eligible</td>
    </tr>
    <tr>
        <td>3</td>
        <td>1,250</td>
    </tr>
    <tr>
        <td>4</td>
        <td>1,750</td>
    </tr>
    <tr>
        <td>5</td>
        <td>2,250</td>
    </tr>
    <tr>
        <td>6</td>
        <td>3,250</td>
    </tr>
    <tr>
        <td>7</td>
        <td>3,750</td>
    </tr>
    <tr>
        <td>8</td>
        <td>4,250</td>
    </tr>
    <tr>
        <td>9</td>
        <td>6,250</td>
    </tr>
    <tr>
        <td>10</td>
        <td>6,750</td>
    </tr>
    <tr>
        <td>11</td>
        <td>7,250</td>
    </tr>
    <tr>
        <td>12 or more</td>
        <td>10,250</td>
    </tr>
</table>

<br />

### Calculate your airdrop eligibility

If you performed any of the above qualifying actions on the Arbitrum One chain *before* Arbitrum Nitro launched on Arbitrum One mainnet (block **#22207817**), your tokens may be weighted. This pre-Nitro weighting is how we reward early adopters of Arbitrum One, but it only applies if you earned at least 3 points before Nitro was launched.

Note that the minimum airdrop entitlement is **625** tokens; the maximum airdrop entitlement is **10,250** tokens. TODO - reconcile the difference between this statement and the above table.

To calculate the number of tokens that you're eligible to claim, first determine which one of the following three scenarios describes your on-chain activity:

 1. All of your qualifying actions occurred **before** Nitro was launched.
 2. All of your qualifying actions occurred **after** Nitro was launched.
 3. You performed qualifying actions **before and after** Nitro was launched.

Scroll to the section that describes your scenario and follow the instructions.

#### Scenario 1: All of your qualifying actions occurred before Nitro was launched.

 1. First, refer to the [qualifying actions section](#qualifying-actions) to determine how many points you earned on Arbitrum One. We'll refer to this as Pre-Nitro `TotalPoints` moving forward.
 2. Use the [point-to-token conversion table](#point-to-token-conversion-table) to convert your `TotalPoints` into your `TokenEntitlement` - the number of tokens that you're entitled to claim.

**Examples:**

| Pre-Nitro `TotalPoints` | `TokenEntitlement` |
| ----------------------- | ------------------ |
| 9                       | 6,250              |
| 13                      | 10,250             |


#### Scenario 2: All of your qualifying actions occurred after Nitro was launched.

 1. First, refer to the [qualifying actions section below](#qualifying-actions) to determine how many points you earned on Arbitrum One and Arbitrum Nova. We'll refer to these as `OnePoints` and `NovaPoints` moving forward, respectively.
 2. Next, we'll make an adjustment to `NovaPoints` based on the value of `OnePoints`:
    1. If `OnePoints` is 4 or more, the maximum value of `NovaPoints` can be 1.
    2. If `OnePoints` is less than 4, the maximum value of `NovaPoints` can be 4 *minus* `OnePoints`.
 3. Next, add `OnePoints` and `NovaPoints` together to determine your total number of points. We'll refer to this as `TotalPoints`.
 4. Finally, use the [point-to-token conversion table](#point-to-token-conversion-table) to convert your `TotalPoints` into your `TokenEntitlement` - the number of tokens that you're entitled to claim.


**Examples:**

| Post-Nitro `OnePoints` | Post-Nitro `NovaPoints` | Post-Nitro `TotalPoints` | `TokenEntitlement` |
| ---------------------- | ----------------------- | ------------------------ | ------------------ |
| 5                      | 4 (gets cut to 1)       | 6                        | 3,250              |
| 2                      | 4 (gets cut to 2)       | 4                        | 1,750              |
| 10                     | 3 (gets cut to 1)       | 11                       | 7,250              |


#### Scenario 3: You performed qualifying actions before and after Nitro was launched.

 1. First, refer to the [qualifying actions section](#qualifying-actions) to determine how many points you earned **before** Arbitrum Nitro launched on Arbitrum One mainnet. We'll refer to this as `OnePointsPre`.
 2. If you performed any qualifying actions on Arbitrum Nova before Nitro was launched, reference the second step of `Scenario 2` above to determine `NovaPointsPre`.
 3. Next, TODO. We'll refer to this total as `PointsPre`.
 4. Use the [point-to-token conversion table](#point-to-token-conversion-table) to convert `PointsPre` into tokens. We'll refer to this total as `TokensPre`.
 5. Then, refer to the [qualifying actions section](https://github.com/ArbitrumFoundation/docs/pull/204#qualifying-actions) to determine how many points you earned **after** Nitro launched on Arbitrum One. We'll refer to this as `OnePointsPost`.
 6. If you performed any qualifying actions on Arbitrum Nova after Nitro was launched, reference the second step of `Scenario 2` above to determine `NovaPointsPost`.
 7. Next, TODO. We'll refer to this total as `PointsPost`.
 8. Use the [point-to-token conversion table](https://github.com/ArbitrumFoundation/docs/pull/204#point-to-token-conversion-table) to convert your `PointsPost` into tokens. We'll refer to this total as `TokensPost`.
 9. Subtract `TokensPre` from `TokensPost`. Divide it by 2 and add it to `TokensPre`. Whatever number is larger between this number and `TokensPost` is your `TokenEntitlement` - the number of tokens that you're entitled to claim.


**Examples:**

| `OnePointsPre` | `NovaPointsPre`   | `PointsPre` | `TokensPre` | `OnePointsPost` | `NovaPointsPost`  | `PointsPost` | `TokensPost` | `TokenEntitlement` |
| -------------- | ----------------- | ----------- | ----------- | --------------- | ----------------- | ------------ | ------------ | ------------------ |
| 5              | 2 (gets cut to 1) | 6           | 3,250       | 5               | 2 (gets cut to 1) | 6            | 3,250        | 3,250              |
| 2              | 2                 | 4           | 1,750       | 7               | 2 (gets cut to 1) | 8            | 4,250        | 4,250              |



TODO - verify that the above is correct


<br />


### User protections

To prevent bots from taking advantage of the airdrop, a number of anti-Sybil rules were established:

 - If an airdrop recipient's wallet transactions have all occurred within a 48-hour period, **one point is subtracted**.
 - If an airdrop recipient's wallet balance is less than .005 ETH, **and** if the wallet hasn't interacted with more than one smart contract, **one point is subtracted**.
 - If an airdrop recipient's wallet address has been identified as a Sybil address during the Hop protocol bounty program **the recipient is disqualified**. 

Refer to [Arbitrum Sybil Hunting](https://github.com/ArbitrumFoundation/sybil-detection) to learn more about the Sybil mitigation methodology. Refer to our [Sybil accounts](./concepts/sybil-account.md) concept document for a conceptual introduction to Sybil accounts.


### DAO airdrop criteria and distribution

A separate distribution was allocated for DAOs that are building applications in the Arbitrum ecosystem, as well as the Protocol Guild, a collective of Ethereum contributors. The distribution of tokens to DAOs was weighted based on a variety of factors, including time projects have been on Arbitrum, TVL of assets on the chain, whether a project was Arbitrum native, and whether project operated with actual on-chain treasuries.

More details will be added around individual DAO allocation shortly.


### Vesting and lockup details

While the user and DAO airdrops will be available in one week, all investor and team tokens are subject to 4 year lockups, with the first unlocks happening in one year and then monthly unlocks for the remaining three years.


### Frequently asked questions

**Q: What if my calculated entitlement doesn't match the number of tokens the website says I'm entitled to claim?**
TODO

**Q: What if my wallet address is not eligible for the airdrop, but I believe it should be?**
TODO
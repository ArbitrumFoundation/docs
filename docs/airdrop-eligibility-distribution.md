---
id: airdrop-eligibility-distribution
title: $ARB airdrop eligibility and distribution specifications
sidebar_label: Airdrop eligibility and distribution
description: Learn about the $ARB airdrop eligibility and distribution specifications.
voice: Arbitrum DAO
tone: Objective, succinct, precise.
tense: Present - avoid present progressive. Past tense as needed.
person: Second/third - address reader directly as "you" when appropriate, refer to the DAO as the DAO, not as "we".
dao_author: pearring
dao_sme: pearring
---

import DraftExpectationsPartial from '@site/docs/partials/_draft-expectations-partial.md'; 

<DraftExpectationsPartial />

```
 - FINAL-TODO: strategy inputs
 - FINAL-TODO: hop protocol bounty program notes below
 - FINAL-TODO: point-to-token numbers
```


:::caution THERE IS NO PRESALE

The only official website for the $ARB airdrop is [https://gov.arbitrum.foundation](https://gov.arbitrum.foundation). There is no presale. Don't ever share your seed phrase. When in doubt, [join the Discord](https://discord.gg/arbitrum) to ask for clarification.

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
        <td><a href='https://arbiscan.io/block/22207817'>Block 22207817</a> on Arbitrum One = August 31, 2022</td>
    </tr>
</table>


### Initial token allocation & airdrop distribution

<table className="small-table">
    <tr>
        <td><strong>Percentage of initial supply</strong></td>
        <td><strong>Number of tokens</strong></td>
        <td><strong>Allocated to</strong></td>
    </tr>
    <tr>
        <td>48%</td>
        <td>4.8 billion</td>
        <td>Arbitrum DAO treasury</td>
    </tr>
    <tr>
        <td>25%</td>
        <td>2.5 billion</td>
        <td>Employees of Offchain Labs (the team that built the initial version of Arbitrum)</td>
    </tr>
    <tr>
        <td>19%</td>
        <td>1.9 billion</td>
        <td>Offchain Labs investors</td>
    </tr>
    <tr>
        <td>6.89%</td>
        <td>689 million</td>
        <td><strong>Users</strong> of the Arbitrum platform (via airdrop to user wallet addresses)</td>
    </tr>
    <tr>
        <td>1.11%</td>
        <td>111 million</td>
        <td><strong>DAOs</strong> building apps on Arbitrum (via airdrop to DAO treasury addresses)</td>
    </tr>
</table>





### User airdrop eligibility details

A points systems was used to determine the number of tokens that airdrop recipients can claim. You earn maximum one point per qualifying action performed before the snapshot date. There were 14 total qualifying actions, so it was possible to earn up to 14 points.

**Qualifying actions:**

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

<br />

**Converting points to tokens:**

<table className="small-table">
    <tr>
        <td><strong>Points earned</strong></td>
        <td><strong>Airdrop entitlement</strong></td>
    </tr>
    <tr>
        <td>Less than 3</td>
        <td>Not eligible</td>
    </tr>
    <tr>
        <td>3</td>
        <td>1,200</td>
    </tr>
    <tr>
        <td>4</td>
        <td>1,700</td>
    </tr>
    <tr>
        <td>5</td>
        <td>2,200</td>
    </tr>
    <tr>
        <td>6</td>
        <td>3,200</td>
    </tr>
    <tr>
        <td>7</td>
        <td>3,700</td>
    </tr>
    <tr>
        <td>8</td>
        <td>4,200</td>
    </tr>
    <tr>
        <td>9</td>
        <td>6,200</td>
    </tr>
    <tr>
        <td>10</td>
        <td>6,700</td>
    </tr>
    <tr>
        <td>11</td>
        <td>7,200</td>
    </tr>
    <tr>
        <td>12 or more</td>
        <td>10,200</td>
    </tr>
</table>

<br />

**User protections:**

To prevent bots from taking advantage of the airdrop, a number of anti-Sybil rules were established:

 - If an airdrop recipient's wallet transactions have all occurred within a 48-hour period, **one point is subtracted**.
 - If an airdrop recipient's wallet balance is less than .01 ETH, **and** if the wallat hasn't interacted with more than one smart contract, **one point is subtracted**.
 - If an airdrop recipient's wallet address has been identified as a Sybil address during the Hop protocol bounty program (FINAL-TODO: footnote), (FINAL-TODO: disqualified?). 
 - If an airdrop recipient's wallet address is part of a parent/children wallet arrangement whereby the parent has funded more than 25 children addresses, all addresses are collapsed into a single user wallet address. 

Refer to [Arbitrum Sybil Hunting](https://github.com/OffchainLabs/arb-sybil/tree/master/v2) to learn more about our Sybil mitigation methodology. Refer to our [Sybil accounts](./concepts/sybil-account.md) concept document for a conceptual introduction to Sybil accounts.
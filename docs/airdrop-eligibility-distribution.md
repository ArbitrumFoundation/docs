---
id: airdrop-eligibility-distribution
title: $ARB airdrop eligibility and distribution specifications
sidebar_label: Airdrop eligibility and distribution
description: todo:qqq
---


<a href='#todo'>$ARB</a> is an ERC-20 token native to Arbitrum One rollup chain. Token properties at launch:


<table class='small-table'>
    <tr>
        <td><strong>Property</strong></td>
        <td><strong>Value</strong></td>
    </tr>
    <tr>
        <td><strong>Initial supply cap</strong></td>
        <td>10 billion</td>
    </tr>
    <tr>
        <td><strong>Inflation</strong></td>
        <td>Max 2% per year <a href='#todo'>[1]</a></td>
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
        <td>Nitro Block = August 31, 2022 at block no. [Insert Number]</td>
    </tr>
</table>


### Initial token allocation & airdrop distribution

<table class='small-table'>
    <tr>
        <td><strong>Percentage of initial supply</strong></td>
        <td><strong>Number of tokens</strong></td>
        <td><strong>Allocated to</strong></td>
    </tr>
    <tr>
        <td><strong>48%</strong></td>
        <td>4.8 billion</td>
        <td>Arbitrum DAO treasury</td>
    </tr>
    <tr>
        <td><strong>25%</strong></td>
        <td>2.5 billion</td>
        <td>Employees of Offchain Labs (the team building Arbitrum)</td>
    </tr>
    <tr>
        <td><strong>19%</strong></td>
        <td>1.9 billion</td>
        <td>Offchain Labs investors</td>
    </tr>
    <tr>
        <td><strong>5%</strong></td>
        <td>500 million</td>
        <td><strong>Users</strong> of the Arbitrum platform (via airdrop to user wallet addresses)</td>
    </tr>
    <tr>
        <td><strong>3%</strong></td>
        <td>300 million</td>
        <td><strong>DAOs</strong> building apps on Arbitrum (via airdrop to DAO treasury addresses)</td>
    </tr>
</table>





### User airdrop eligibility details

We use a points system to determine the number of tokens that airdrop recipients can claim. You earn maximum one point per qualifying action performed before the snapshot date. There are 14 total qualifying actions, so you can earn up to 14 points.

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


**Converting points to tokens:**

<table class='small-table'>
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
        <td>TODO:qqq</td>
    </tr>
    <tr>
        <td>4</td>
        <td>TODO:qqq</td>
    </tr>
    <tr>
        <td>5</td>
        <td>TODO:qqq</td>
    </tr>
    <tr>
        <td>6</td>
        <td>TODO:qqq</td>
    </tr>
    <tr>
        <td>7</td>
        <td>TODO:qqq</td>
    </tr>
    <tr>
        <td>8</td>
        <td>TODO:qqq</td>
    </tr>
    <tr>
        <td>9</td>
        <td>TODO:qqq</td>
    </tr>
    <tr>
        <td>10</td>
        <td>TODO:qqq</td>
    </tr>
    <tr>
        <td>11</td>
        <td>TODO:qqq</td>
    </tr>
    <tr>
        <td>12 or more</td>
        <td>TODO:qqq</td>
    </tr>
</table>


**User protections:**

To prevent bots from taking advantage of the airdrop, we've established a number of anti-sybil rules.

 - If an airdrop recipient's wallet transactions have all occurred within a 48-hour period, **one point is subtracted**.
 - If an airdrop recipient's wallet balance is less than .01 ETH, **and** if the wallat hasn't interacted with more than one smart contract, **one point is subtracted**.
 - If an airdrop recipient's wallet address has been identified as a sybil address during the Hop protocol bounty program (footnote), (todo:qqq - disqualified?). 
 - If an airdrop recipient's wallet address is part of a parent/children wallet arrangement whereby the parent has funded more than 25 children addresses, all addresses are collapsed into a single user wallet address. 

Refer to our <a href='#todo'>Sybil detection</a> documentation for more detailed information. 



### DAO airdrop eligibility details

To qualify for our DAO airdrop, your project's DAO must meet the following five criteria:

 1. The project's DAO must be live (must have deployed a smart contract to an Arbitrum chain? todo:qqq) on Arbitrum on or before the snapshot date.
 2. The project's DAO must have been listed on the Arbitrum portal on or before the snapshot date.
 3. The project's DAO must have an on-chain treasury controlled by the DAO for the benefit of its community.
 4. The project's DAO must agree to invest at least 50% of the airdropped funds into growth on Arbitrum (todo:qqq - how to be more concrete about this?).
 5. The project's DAO must agree to submit a fund utilization report to the Arbitrum DAO on the one-year anniversary of the airdropped token distribution. This report should showcase how the initially distributed funds were used. The Arbitrum DAO reserves the right to burn unvested project DAO tokens via a (todo: type of proposal) if this condition isn't satisfied.


**Distribution structure**

(todo:qqq - clarify these bits before publishing)

 - Vesting schedule
   - 50% vested upfront 
   - 50% vested (quarterly) over the course of one year anniversary - two-year anniversary of distribution.
   - How to lose unvested tokens: 
     - Project no longer supports Arbitrum deployment
     - Project no longer exists 
     - Does not complete mandate of 50% of tokens being used for growing protocol on Arbitrum
 - Lockup: 
   - Immediately released: 25%
   - 9-month anniversary: 25%
   - 1/12 monthly thereafter for the next 12 months
 - Distribution Amounts:
   - Deployed Q4 2021 = 7 points
   - Deployed Q1 2022 = 5 points
   - Deployed Q2 2022 = 3 points
   - Deployed Q3 2022
   - Arbitrum Native = 5 points
   - Arbitrum/Ethereum Native = 3 points
   - Multichain Protocol 
   - More than 1,000,000 transaction = 10 points
   - More than 500,000 transactions = 5 points
   - More than 400,000 transactions = 4 points
   - More than 300,000 transactions = 3 points
   - More than 200,000 transactions = 2 points
   - More than 100,000 transactions
   - More than 5,000 tx/day average = 5 points
   - More than 2,500 tx/day average = 3 points
   - More than 1,000 tx/day average
   - Aggregate Value of transactions is greater than [$1,000,000,000] = 10 points
   - Aggregate Value of transactions is greater than [$500,000,000] = 5 points
   - Aggregate Value of transactions is greater than [$400,000,000] = 4 points
   - Aggregate Value of transactions is greater than [$300,000,000] = 3 points
   - Aggregate Value of transactions is greater than [$200,000,000] = 2 points
   - Aggregate Value of transactions is greater than [$100,000,000]s
   - Average value of recipient DAO’s tokens on Arbitrum is greater than $50M = 5 points
   - Average value of recipient DAOs tokens on Arbitrum is greater than $40M = 4 points
   - Average value of recipient DAOs tokens on Arbitrum is greater than $30M = 3 points
   - Average value of recipient DAOs tokens on Arbitrum is greater than $20M = 2 points
   - Average value of recipient DAOs tokens on Arbitrum is greater than $10Ms





<br/>
<br/>
<br/>

-------


todo

 - add links
 - footnotes

-------


#### Footnotes

<a id='footnote-1'>1.</a> The DAO can adjust this parameter through a todo:qqq proposal.

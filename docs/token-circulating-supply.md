---
id: token-supply
title: What is the token circulating supply?
sidebar_label: Token Circulating Supply
description: Learn about the Arbitrum token circulating supply
dao_author: fred
dao_sme: wat-dis
---

### What is a tokens circulating supply

A token's circulating supply is the amount of coins that are currently available to be transferred and utilized in the network. 

### How can I calculate the Arbitrum token circulating supply

The circulating supply is based on the [initial distribution](airdrop-eligibility-distribution#distribution-post-aips-11-and-12) and the [unlock schedule](airdrop-eligibility-distribution#vesting-and-lockup-details) of the team and investors.
You can calculate the Arbitrum token's current circulating supply with the following formula:

The team, contributor, and investor tokens unlock over a 4 year period, starting from 16 March 2023.
The first unlock starts on 16 March 2024, and continue to unlock on a monthly cadence.

The Arbitrum Foundation tokens also unlock over a 4 year period, starting from 17 April 2023.
The first unlock starts on 17 April 2023, and continue to unlock every second.


### What is the current circulating supply

As of March 7 2024, the above formula results in 1.537 billion tokens total circulating supply.

| Allocated to              | Tokens Allocated | In circulation at March 7 2024|
| ------------------------- | ---------------- | -------------- |
| ArbitrumDAO Treasury [^1]      | 3,528,000,000 | 126,131,267 |
| Team and collaborators    | 2,694,000,000 | 0 |
| Investors                 | 1,753,000,000 | 0 |
| Users of platform (via airdrop)    | 1,162,000,000 | 1,092,551,615 [^2] |
| Arbitrum Foundation                | 750,000,000   | 205,715,264 [^3] |
| DAOs building on Arbitrum (via airdrop) | 113,000,000   | 113,000,000 |
|                           |                  |                 |
| Totals                    | 10,000,000,000 | 1,537,398,145 |

_Note that numbers are rounded for presentation._



On March 17 2024 it is expected that following the above formula the total circulating supply will be 2.654 billion tokens.

| Allocated to              | Tokens Allocated | In circulation at March 17 2024 |
| ------------------------- | ---------------- | -------------- |
| ArbitrumDAO Treasury [^1]      | 3,528,000,000 | 126,131,267  |
| Team and collaborators    | 2,694,000,000 | 673,500,000 [^4] |
| Investors                 | 1,753,000,000 | 438,250,000 [^4] |
| Users of platform (via airdrop)        | 1,162,000,000 | 1,092,551,615 [^2] |
| Arbitrum Foundation                | 750,000,000   | 210,506,502 [^3]  |
| DAOs building on Arbitrum (via airdrop) | 113,000,000   | 113,000,000  |
|                           |                  |                 |
| Totals                    | 10,000,000,000 | 2,653,939,384 |


_Note that numbers are rounded for presentation._

[^1] The Arbitrum DAO treasury is calculated as of March 7 2024 and can be viewed in https://arbiscan.io/token/0x912ce59144191c1204e64559fe8253a0e49e6548?a=0xF3FC178157fb3c87548bAA86F9d24BA38E649B58. The DAO treasury's circulating supply is based on tokens deployed by the DAO delegates in governance proposals.

[^2] Tokens that were not claimed during the airdrop period were sent to the DAO treasury. They are now part of the treasury but here they are presented as tokens in circulation in the User section, for the presentation to consisently show the amount of tokens deployed by the DAO delegates in governance proposals.

[^3] The amount unlocked by the Arbitrum Foundation is based on the 700 million tokens in the vesting contract, plus the 50 million tokens that were initially distributed.

[^4] The team and investor tokens unlocked are calculated as the number seconds in a year divided by 12 from March 16 2024.

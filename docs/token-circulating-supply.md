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

```
Team and Contributor Tokens in Circulation = if (today > 16 march 2024) 1/48 * (months since 16 March 2023) * (2.694 billion) else 0
Investor Tokens in Circulation = if (today > 16 march 2024) 1/48 * (months since 16 March 2023) * (1.753 billion) else 0
Arbitrum Foundation Tokens in Circulation = 50 million + 1/126230400 * (seconds since 17 April 2023) * 700 million

Circulating Supply = Total Tokens - Arbitrum DAO Treasury - Team and Contributor Tokens - Investor Tokens - Arbitrum Foundation Tokens + Team and Contributor Tokens in Circulation + Investor Tokens in Circulation + Arbitrum Foundation Tokens in Circulation
```

_Note that the amount vested by the Arbitrum Foundation is a function of the number of seconds since its start date on 17 April 2023, linearly releasing tokens every second for 4 years (126230400 seconds). The team and investor tokens are also vested linearly but calculated as the number seconds in a year divided by 12 from March 16._

### What is the current circulating supply

As of March 7 2024, the above formula results in 1.538 billion tokens total circulating supply
```
Team and Contributor Tokens in Circulation = 0
Investor Tokens in Circulation = 0
Arbitrum Foundation Tokens in Circulation = 50 million + 1/126230400 * 28080000 * 700 million = 205.715 million

Circulating Supply = 10 billion - 3.471 billion - 2.694 billion - 1.753 billion - 750 million + 0 + 0 + 205.715 million = 1.538 billion
```



On March 17 2024 it is expected that following the above formula the total circulating supply will be 2.654 billion tokens

```
Team and Contributor Tokens in Circulation = 1/48 * 12 * 2.694 billion = 673.5 million
Investor Tokens in Circulation = 1/48 * 12 * 1.753 billion = 438.25 million
Arbitrum Foundation Tokens in Circulation = 50 million + 1/126230400 * 28944000 * 700 million = 210.507 million

Circulating Supply = 10 billion - 3.471 billion - 2.694 billion - 1.753 billion - 750 million + 673.5 million + 438.25 million + 210.507 million = 2.654 billion
```


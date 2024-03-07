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

The circulating supply is based on the [initial distribution](airdrop-eligibility-distribution#distribution-post-aips-11-and-12) and the [unlock schedule](airdrop-eligibility-distribution#vesting-and-lockup-details) of Offchain Labs team and investors.
You can calculate the Arbitrum token's current circulating supply with the following formula:

```
OCL Team Tokens in Circulation = if (today > 16 march 2024) 1/48 * (months since 16 march 2023) * (2.694 billion) else 0
OCL Investor Tokens in Circulation = if (today > 16 march 2024) 1/48 * (months since 16 march 2023) * (1.753 billion) else 0
Arbitrum Foundation Tokens in Circulation = 50 million + 1/48 * (months since 17 April 2023) * 700 million

Circulating Supply = Total Tokens - Arbitrum DAO Treasury - OCL Team Tokens - OCL Investor Tokens - Arbitrum Foundation Tokens + OCL Team Tokens in Circulation + OCL Investor Tokens in Circulation + Arbitrum Foundation Tokens in Circulation
```

### What is the current circulating supply

As of March 7 2024, the above formula results in the following total circulating supply
```
OCL Team Tokens in Circulation = 0
OCL Investor Tokens in Circulation = 0
Arbitrum Foundation Tokens in Circulation = 50 million + 1/48 * 10 * 700 million = 195.83 million

Circulating Supply = 10 billion - 3.471 billion - 2.694 billion - 1.753 billion - 750m + 0 + 0 + 195.83 million = 1.527 billion
```



On March 17 2024 it is expected that following the above formula the total circulating supply will be

```
OCL Team Tokens in Circulation = 1/48 * 12 * 2.694 billion = 673.5 million
OCL Investor Tokens in Circulation = 1/48 * 12 * 1.753 billion = 438.25 million
Arbitrum Foundation Tokens in Circulation = 50 million + 1/48 * 11 * 700 million = 210.416 million

Circulating Supply = 10 billion - 3.471 billion - 2.694 billion - 1.753 billion - 750 million + 673.5 million + 438.25 million + 210.416 million = 2.654 billion
```


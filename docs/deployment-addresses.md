---
id: deployment-addresses
title: DAO Contract Addresses
sidebar_label: Contract addresses
---

import DraftExpectationsPartial from '@site/docs/partials/\_draft-expectations-partial.md';

<DraftExpectationsPartial />

import { AddressExplorerLink as AEL } from '@site/src/components/AddressExplorerLink'

### Token

| Contract             | Chain      | Address                                                                            |
| -------------------- | ---------- | ---------------------------------------------------------------------------------- |
| $ARB Token           | Arb One    | <AEL address = {"0x912CE59144191C1204E64559FE8253a0e49E6548"} chainID= {42161} />  |
| $ARB Token (bridged) | Ethereum   | <AEL address = {"0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1"} chainID = {1} />     |
| $ARB Token (bridged) | Nova       | <AEL address = {"0xf823C3cD3CeBE0a1fA952ba88Dc9EEf8e0Bf46AD"} chainID= {42170} />  |
| $ARB Token (testnet) | Arb Goerli | <AEL address = {"0xF861378B543525ae0C47d33C90C954Dc774Ac1F9"} chainID= {421613} /> |

### Token Distribution

| Contract          | Chain | Address                                                                            |
| ----------------- | ----- | ---------------------------------------------------------------------------------- |
| Token Distributor | 42161 | <AEL address = {"0x67a24CE4321aB3aF51c2D0a4801c3E111D88C9d9"} chainID = {42161} /> |
| DAO Treasury      | 42161 | <AEL address = {"0xF3FC178157fb3c87548bAA86F9d24BA38E649B58"} chainID = {42161} /> |

### Token Bridging

| Contract                  | Chain      | Address                                                                             |
| ------------------------- | ---------- | ----------------------------------------------------------------------------------- |
| $ARB Gateway (Arb1)       | Arb One    | <AEL address = {"0xCaD7828a19b363A2B44717AFB1786B5196974D8E"} chainID = {42161} />  |
| $ARB Gateway (L1)         | Ethereum   | <AEL address = {"0xbbcE8aA77782F13D4202a230d978F361B011dB27"} chainID = {1} />      |
| $ARB Gateway (Nova)       | Nova       | <AEL address = {"0xbf544970E6BD77b21C6492C281AB60d0770451F4"} chainID = {42170} />  |
| $ARB Gateway (L2 testnet) | Arb Goerli | <AEL address = {"0x584d4D9bED1bEb39f02bb51dE07F493D3A5CdaA0"} chainID = {421613} /> |
| $ARB Gateway (L1 testnet) | Goerli     | <AEL address = {"0x33A7991a70AD174822ddfa2618Df9C8f17c04563"} chainID = {5} />      |

### DAO Governance

| Contract                 | Chain    | Address                                                                            |
| ------------------------ | -------- | ---------------------------------------------------------------------------------- |
| Core Governor            | Arb One  | <AEL address = {"0xf07DeD9dC292157749B6Fd268E37DF6EA38395B9"} chainID = {42161} /> |
| Treasury Governor        | Arb One  | <AEL address = {"0x789fC99093B09aD01C34DC7251D0C89ce743e5a4"} chainID = {42161} /> |
| Arb One Upgrade Executor | Arb One  | <AEL address = {"0xCF57572261c7c2BCF21ffD220ea7d1a27D40A827"} chainID = {42161} /> |
| Nova Upgrade Executor    | Nova     | <AEL address = {"0x86a02dD71363c440b21F4c0E5B2Ad01Ffe1A7482"} chainID = {42170} /> |
| L1 Upgrade Executor      | Ethereum | <AEL address = {"0x3ffFbAdAF827559da092217e474760E2b2c3CeDd"} chainID = {1} />     |
| L2 Core Timelock         | Arb One  | <AEL address = {"0x34d45e99f7D8c45ed05B5cA72D54bbD1fb3F98f0"} chainID = {42161} /> |
| L2 Treasury Timelock     | Arb One  | <AEL address = {"0xbFc1FECa8B09A5c5D3EFfE7429eBE24b9c09EF58"} chainID = {42161} /> |
| L1 Timelock              | Ethereum | <AEL address = {"0xE6841D92B0C345144506576eC13ECf5103aC7f49"} chainID = {1} />     |

### Security Council

| Contract                            | Chain    | Address                                                                            |
| ----------------------------------- | -------- | ---------------------------------------------------------------------------------- |
| Security Council (Arb One, 9 of 12) | Arb One  | <AEL address = {"0x3568A44b3E72F5B17a0E14E53fdB7366B3B7Ad13"} chainID = {42161} /> |
| Security Council (Arb One, 7 of 12) | Arb One  | <AEL address = {"0x895c9fc6bcf06e553b54A9fE11D948D67a9B76FA"} chainID = {42161} /> |
| Security Council (L1, 9 of 12)      | Ethereum | <AEL address = {"0x3666a60ff589873ced457a9a8a0aA6F83D708767"} chainID = {1} />     |
| Security Council (Nova, 9 of 12)    | Nova     | <AEL address = {"0x3cA27a792C64a3a81417499AA53786A41812B2cd"} chainID = {42170} /> |

### DAO Constitution

| Contract          | Chain | Address                                                                            |
| ----------------- | ----- | ---------------------------------------------------------------------------------- |
| Constitution Hash | 42161 | <AEL address = {"0x1D62fFeB72e4c360CcBbacf7c965153b00260417"} chainID = {42161} /> |

### Governance Contracts Proxy Admins

| Contract            | Chain | Address                                                                            |
| ------------------- | ----- | ---------------------------------------------------------------------------------- |
| Arb One Proxy Admin | 42161 | <AEL address = {"0xdb216562328215E010F819B5aBe947bad4ca961e"} chainID = {42161} /> |
| Nova Proxy Admin    | 42170 | <AEL address = {"0xf58eA15B20983116c21b05c876cc8e6CDAe5C2b9"} chainID = {42170} /> |
| L1 Proxy Admin      | 1     | <AEL address = {"0x5613AF0474EB9c528A34701A5b1662E3C8FA0678"} chainID = {1} />     |

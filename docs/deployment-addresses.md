---
id: deployment-addresses
title: DAO contract addresses
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
| $ARB Token (testnet) | Arb Sepolia| <AEL address = {"0xF861378B543525ae0C47d33C90C954Dc774Ac1F9"} chainID= {421614} /> |

### Token Distribution

| Contract                         | Chain   | Address                                                                            |
| -------------------------------- | ------- | ---------------------------------------------------------------------------------- |
| Token Distributor\*              | Arb One | <AEL address = {"0x67a24CE4321aB3aF51c2D0a4801c3E111D88C9d9"} chainID = {42161} /> |
| DAO Treasury                     | Arb One | <AEL address = {"0xF3FC178157fb3c87548bAA86F9d24BA38E649B58"} chainID = {42161} /> |
| Foundation Vesting Budget Wallet | Arb One | <AEL address = {"0x15533b77981cDa0F85c4F9a485237DF4285D6844"} chainID = {42161} /> |

_\*Note: the Token Distributor contract was [self-destructed](https://arbiscan.io/tx/0xa2477f2f1d7824501520a88b50835ad283e7472e0fa5e67005452528bf740175) after the end of the aidrop claiming period._

### Token Bridging

| Contract                  | Chain      | Address                                                                             |
| ------------------------- | ---------- | ----------------------------------------------------------------------------------- |
| $ARB Gateway (Arb1)       | Arb One    | <AEL address = {"0xCaD7828a19b363A2B44717AFB1786B5196974D8E"} chainID = {42161} />  |
| $ARB Gateway (L1)         | Ethereum   | <AEL address = {"0xbbcE8aA77782F13D4202a230d978F361B011dB27"} chainID = {1} />      |
| $ARB Gateway (Nova)       | Nova       | <AEL address = {"0xbf544970E6BD77b21C6492C281AB60d0770451F4"} chainID = {42170} />  |
| $ARB Gateway (L2 testnet) | Arb Sepolia| <AEL address = {"0x6e244cD02BBB8a6dbd7F626f05B2ef82151Ab502"} chainID = {421614} /> |
| $ARB Gateway (L1 testnet) | Sepolia    | <AEL address = {"0x98431ddc27633f7315aa2c153233529bb241445a"} chainID = {11155111} />      |

### DAO Governance

| Contract                            | Chain    | Address                                                                            |
| ----------------------------------- | -------- | ---------------------------------------------------------------------------------- |
| Core Governor                       | Arb One  | <AEL address = {"0xf07DeD9dC292157749B6Fd268E37DF6EA38395B9"} chainID = {42161} /> |
| Treasury Governor                   | Arb One  | <AEL address = {"0x789fC99093B09aD01C34DC7251D0C89ce743e5a4"} chainID = {42161} /> |
| Arb One Upgrade Executor            | Arb One  | <AEL address = {"0xCF57572261c7c2BCF21ffD220ea7d1a27D40A827"} chainID = {42161} /> |
| Nova Upgrade Executor               | Nova     | <AEL address = {"0x86a02dD71363c440b21F4c0E5B2Ad01Ffe1A7482"} chainID = {42170} /> |
| L1 Upgrade Executor                 | Ethereum | <AEL address = {"0x3ffFbAdAF827559da092217e474760E2b2c3CeDd"} chainID = {1} />     |
| L2 Core Timelock                    | Arb One  | <AEL address = {"0x34d45e99f7D8c45ed05B5cA72D54bbD1fb3F98f0"} chainID = {42161} /> |
| L2 Treasury Timelock (ETH treasury) | Arb One  | <AEL address = {"0xbFc1FECa8B09A5c5D3EFfE7429eBE24b9c09EF58"} chainID = {42161} /> |
| L1 Timelock                         | Ethereum | <AEL address = {"0xE6841D92B0C345144506576eC13ECf5103aC7f49"} chainID = {1} />     |

### Security Council

| Contract                            | Chain    | Address                                                                            |
| ----------------------------------- | -------- | ---------------------------------------------------------------------------------- |
| Security Council (Arb One, emergency) | Arb One  | <AEL address = {"0x423552c0F05baCCac5Bfa91C6dCF1dc53a0A1641"} chainID = {42161} /> |
| Security Council (Arb One, non emergency) | Arb One  | <AEL address = {"0xADd68bCb0f66878aB9D37a447C7b9067C5dfa941"} chainID = {42161} /> |
| Security Council (L1, emergency)      | Ethereum | <AEL address = {"0xF06E95eF589D9c38af242a8AAee8375f14023F85"} chainID = {1} />     |
| Security Council (Nova, emergency)    | Nova     | <AEL address = {"0xc232ee726E3C51B86778BB4dBe61C52cC07A60F3"} chainID = {42170} /> |

_Note: See ["Security Council Members"](./security-council-members) for addresses of the current members of the Security Council._

### Security Council Elections

| Contract                   | Chain    | Address                                                                            |
| -------------------------- | -------- | ---------------------------------------------------------------------------------- |
| Nominee Election Governor  | Arb One  | <AEL address = {"0x8a1cDA8dee421cD06023470608605934c16A05a0"} chainID = {42161} /> |
| Member Election Governor   | Arb One  | <AEL address = {"0x467923B9AE90BDB36BA88eCA11604D45F13b712C"} chainID = {42161} /> |
| Manager                    | Arb One  | <AEL address = {"0xD509E5f5aEe2A205F554f36E8a7d56094494eDFC"} chainID = {42161} /> |
| Upgrade Exec Route Builder | Arb One  | <AEL address = {"0x7481716f05E315Fc4C4a64E56DcD9bc1D6F24C0a"} chainID = {42161} /> |
| Member Removal Governor    | Arb One  | <AEL address = {"0x6f3a242cA91A119F872f0073BC14BC8a74a315Ad"} chainID = {42161} /> |
| Member Sync Action         | Arb One  | <AEL address = {"0x9BF7b8884Fa381a45f8CB2525905fb36C996297a"} chainID = {42161} /> |
| Member Sync Action         | Ethereum | <AEL address = {"0x9BF7b8884Fa381a45f8CB2525905fb36C996297a"} chainID = {1} />     |
| Member Sync Action         | Nova     | <AEL address = {"0x9BF7b8884Fa381a45f8CB2525905fb36C996297a"} chainID = {42170} /> |

### DAO Constitution

| Contract          | Chain   | Address                                                                            |
| ----------------- | ------- | ---------------------------------------------------------------------------------- |
| Constitution Hash | Arb One | <AEL address = {"0x1D62fFeB72e4c360CcBbacf7c965153b00260417"} chainID = {42161} /> |

### Governance Contracts Proxy Admins

| Contract            | Chain    | Address                                                                            |
| ------------------- | -------- | ---------------------------------------------------------------------------------- |
| Arb One Proxy Admin | Arb One  | <AEL address = {"0xdb216562328215E010F819B5aBe947bad4ca961e"} chainID = {42161} /> |
| Nova Proxy Admin    | Nova     | <AEL address = {"0xf58eA15B20983116c21b05c876cc8e6CDAe5C2b9"} chainID = {42170} /> |
| L1 Proxy Admin      | Ethereum | <AEL address = {"0x5613AF0474EB9c528A34701A5b1662E3C8FA0678"} chainID = {1} />     |

### Fee Distribution

| Contract       | Chain   | Address                                                                            |
| -------------- | ------- | ---------------------------------------------------------------------------------- |
| L1 Base Fee    | Arb One | <AEL address = {"0xE6ec2174539a849f9f3ec973C66b333eD08C0c18"} chainID = {42161} /> |
| L1 Surplus Fee | Arb One | <AEL address = {"0x2E041280627800801E90E9Ac83532fadb6cAd99A"} chainID = {42161} /> |
| L2 Base Fee    | Arb One | <AEL address = {"0xbF5041Fc07E1c866D15c749156657B8eEd0fb649"} chainID = {42161} /> |
| L2 Surplus Fee | Arb One | <AEL address = {"0x32e7AF5A8151934F3787d0cD59EB6EDd0a736b1d"} chainID = {42161} /> |

| Contract       | Chain | Address                                                                            |
| -------------- | ----- | ---------------------------------------------------------------------------------- |
| L1 Base Fee    | Nova  | <AEL address = {"0xc9722CfDDFbC6aF4E77023E8B5Bd87489EFEbf5F"} chainID = {42170} /> |
| L1 Surplus Fee | Nova  | <AEL address = {"0x509386DbF5C0BE6fd68Df97A05fdB375136c32De"} chainID = {42170} /> |
| L2 Base Fee    | Nova  | <AEL address = {"0x9fCB6F75D99029f28F6F4a1d277bae49c5CAC79f"} chainID = {42170} /> |
| L2 Surplus Fee | Nova  | <AEL address = {"0x3B68a689c929327224dBfCe31C1bf72Ffd2559Ce"} chainID = {42170} /> |

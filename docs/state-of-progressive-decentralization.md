---
id: state-of-progressive-decentralization
title: The state of Arbitrum's progressive decentralization
sidebar_label: State of decentralization
description: Learn about the state of Arbitrum's progressive decentralization.
dao_author: dzgoldman
dao_sme: dzgoldman
---

import DraftExpectationsPartial from '@site/docs/partials/\_draft-expectations-partial.md';

<DraftExpectationsPartial />

<a data-quicklook-from='progressive-decentralization'>Progressive decentralization</a> is the process of gradually increasing the decentralization of a system over time. This document details the current state of progressive decentralization for the <a data-quicklook-from='arbitrum-one'>Arbitrum One</a> and <a data-quicklook-from='arbitrum-nova'>Arbitrum Nova</a> chains, the two chains currently governed by the <a data-quicklook-from='arbitrum-dao'>Arbitrum DAO</a>.

### The components of Arbitrum's progressive decentralization

The following components determine the degree of decentralization for Arbitrum One and Arbitrum Nova:

1. **Chain ownership**
2. **Validator ownership**
3. **Sequencer ownership**
4. **Data Availability Committee (DAC) ownership** (applies only to <a data-quicklook-from='arbitrum-anytrust-protocol'>Arbitrum AnyTrust</a> chains like Arbitrum Nova).

Let's evaluate the current status of these components for both Arbitrum One and Arbitrum Nova, beginning with <a data-quicklook-from='arbitrum-chain-owner'>chain ownership</a>.

### 1. Chain ownership

- **Description**: A chain's "owner" has the ability to change the protocol in various ways, including upgrading the core smart contracts, setting system parameters, and pausing the system.
- **Current status**: **Governed by Arbitrum DAO**. Chain ownership of both Arbitrum One and Arbitrum Nova is under the control of the Arbitrum governance system. The Arbitrum Decentralized Autonomous Organization (DAO), made up of <a data-quicklook-from='arb'>$ARB</a> token-holders and <a data-quicklook-from='delegate'>delegates</a>, can carry out chain-owner operations through governance votes. The <a data-quicklook-from='security-council'>Security Council </a> can also carry out chain-owner operations; it can act quickly through a 9 of 12 <a data-quicklook-from='multisignature-wallet'>multisig wallet</a>, but only in critical emergency situations. The Security Council can also act slowly through a 9 of 12 multisig wallet in non-emergency situations to carry out routine and minor upgrades, such as minor bug fixes. The members of the Security Council (split by cohort) are <a data-quicklook-from='security-council-election'>elected</a> every six months by the Arbitrum DAO.
- **Risks**:
  - If 9 of the Security Council members are compromised or behave maliciously, the system and users' funds could be compromised.
  - If a malicious proposal is successfully put through DAO governance, or if 9 of the Security Council members are compromised or behave maliciously, the system's safety could be compromised. In either of these cases, users will have several weeks to withdraw their funds back to Ethereum before the proposal takes effect.
- **Changes To Current Status**: The governance system currently has the ability to alter governance itself.

### 2. Validator ownership

- **Description**: Validators are responsible for confirming the valid state of the <a data-quicklook-from='arbitrum-chain'>Arbitrum chains</a> back on L1.
- **Current status**: **Permissioned** Validation on both Arbitrum One and Arbitrum Nova is currently allow-listed to a committee of public entities. You can see the list of validators [here](#allowlisted-validators). Governance currently has the power to change this status.
- **Risks**: If there is not a single honest active validator, and a malicious validator proposes an invalid state update, the system's safety could be compromised.
- **Changes to Current status**: The Arbitrum governance system (see #1) currently has the power to modify the Validator allow-list, such as by adding or removing members or removing the allow-list entirely.

### 3. Sequencer ownership

- **Description**: The Sequencer is typically responsible for collecting and ordering users' transactions.
- **Current status**: **Centralized**. The Sequencers for both Arbitrum One and Arbitrum Nova are currently maintained by the Arbitrum Foundation. Governance currently has the power to select new Sequencers.
- **Risks**: The Sequencer has the ability to delay the inclusion of a user's transaction by up to 24 hours and reorder transactions over short time-horizons. The Sequencer, however, cannot compromise the system's safety or prevent a transaction from ultimately being executed.
- **Changes to Current status**: The Arbitrum governance system (see #1) currently has the power to elect a new entity as the Sequencer.

### 4. Data Availability Committee (DAC) ownership

:::note

This applies only to Arbitrum AnyTrust chains like Arbitrum Nova.

:::

- **Description**: AnyTrust chains like Arbitrum Nova rely on a permissioned committee to store the chain's data and provide it on demand.
- **Current status**: 6-member committee. The Arbitrum Nova chain has a 6-party DAC, whose members can be seen [here](#data-availability-committee-members). Governance has the ability to remove or add members to the committee.
- **Risks**: If 5 of the 6 committee members in conjunction with the Sequencer behave maliciously and collude, the safety of the system can be compromised.
- **Changes to Current status**: The Arbitrum governance system (see #1) currently has the power to change the DAC, such as by adding or removing members or modifying the power it has over the system.

### Allowlisted validators

import { AddressExplorerLink as AEL } from '@site/src/components/AddressExplorerLink'

These are the current [allowlisted validators](#2-validator-ownership) for every public Arbitrum chain:

#### Arbitrum One

- <AEL address={"0x0fF813f6BD577c3D1cDbE435baC0621BE6aE34B4"} chainID={1} />
- <AEL address={"0x54c0D3d6C101580dB3be8763A2aE2c6bb9dc840c"} chainID={1} />
- <AEL address={"0x56D83349c2B8DCF74d7E92D5b6B33d0BADD52D78"} chainID={1} />
- <AEL address={"0x610Aa279989F440820e14248BD3879B148717974"} chainID={1} />
- <AEL address={"0x6Fb914de4653eC5592B7c15F4d9466Cbd03F2104"} chainID={1} />
- <AEL address={"0x758C6bB08B3ea5889B5cddbdeF9A45b3a983c398"} chainID={1} />
- <AEL address={"0x7CF3d537733F6Ba4183A833c9B021265716cE9d0"} chainID={1} />
- <AEL address={"0x83215480dB2C6A7E56f9E99EF93AB9B36F8A3DD5"} chainID={1} />
- <AEL address={"0xAB1A39332e934300eBCc57B5f95cA90631a347FF"} chainID={1} />
- <AEL address={"0xB0CB1384e3f4a9a9b2447e39b05e10631E1D34B0"} chainID={1} />
- <AEL address={"0xF8D3E1cF58386c92B27710C6a0D8A54c76BC6ab5"} chainID={1} />
- <AEL address={"0xdDf2F71Ab206C0138A8eceEb54386567D5abF01E"} chainID={1} />
- <AEL address={"0xf59caf75e8A4bFBA4e6e07aD86C7E498E4d2519b"} chainID={1} />

#### Arbitrum Nova

- <AEL address={"0x1732BE6738117e9d22A84181AF68C8d09Cd4FF23"} chainID={1} />
- <AEL address={"0x24Ca61c31C7f9Af3ab104dB6B9A444F28e9071e3"} chainID={1} />
- <AEL address={"0x3B0369CAD35d257793F51c28213a4Cf4001397AC"} chainID={1} />
- <AEL address={"0x54c0D3d6C101580dB3be8763A2aE2c6bb9dc840c"} chainID={1} />
- <AEL address={"0x57004b440Cc4eb2FEd8c4d1865FaC907F9150C76"} chainID={1} />
- <AEL address={"0x658e8123722462F888b6fa01a7dbcEFe1D6DD709"} chainID={1} />
- <AEL address={"0xDfB23DFE9De7dcC974467195C8B7D5cd21C9d7cB"} chainID={1} />
- <AEL address={"0xE27d4Ed355e5273A3D4855c8e11BC4a8d3e39b87"} chainID={1} />
- <AEL address={"0xB51EDdfc9A945e2B909905e4F242C4796Ac0C61d"} chainID={1} />

#### Arbitrum Sepolia (testnet)

- <AEL address={"0x8a8f0a24d7e58a76FC8F77bb68C7c902b91e182e"} chainID={11155111} />
- <AEL address={"0x87630025E63A30eCf9Ca9d580d9D95922Fea6aF0"} chainID={11155111} />
- <AEL address={"0xC32B93e581db6EBc50C08ce381143A259B92f1ED"} chainID={11155111} />
- <AEL address={"0x88888Aa374dBDe60d26433E275aD700B65872063"} chainID={11155111} />

### Data Availability Committee members

These are the current members of the 5-of-6 [data availability committee (DAC)](#4-data-availability-committee-dac-ownership) in Arbitrum Nova:

- ConsenSys Software Inc.
- QuickNode, Inc.
- P2P.org
- Google Cloud
- Offchain Labs, Inc.
- Opensea Innovation Labs Private Limited

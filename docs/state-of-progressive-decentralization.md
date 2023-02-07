---
id: state-of-progressive-decentralization
title: The state of Arbitrum's progressive decentralization
sidebar_label: State of decentralization
description: Learn about the state of Arbitrum's progressive decentralization.
voice: Arbitrum DAO
tone: Objective, succinct, precise.
tense: Present - avoid present progressive. Past tense as needed.
person: Second/third - address reader directly as "you" when appropriate, refer to the DAO as the DAO, not as "we".
---

import DraftExpectationsPartial from '@site/docs/partials/_draft-expectations-partial.md'; 

<DraftExpectationsPartial />

<a data-quicklook-from='progressive-decentralization'>Progressive decentralization</a> is the process of gradually increasing the decentralization of a system over time. This document details the current state of progressive decentralization for Arbitrum's chains (<a data-quicklook-from='arbitrum-one'>Arbitrum One</a> and <a data-quicklook-from='arbitrum-nova'>Arbitrum Nova</a>).

### The components of Arbitrum's progressive decentralization

The following components determine the degree of decentralization for Arbitrum Rollup chains (Arbitrum One and Arbitrum Nova):

1. **Chain ownership**:
2. **Validator ownership**:
3. **Sequencer ownership**:
4. **Data Availability Committee (DAC) ownership**: (applies only to <a data-quicklook-from='arbitrum-anytrust-protocol'>Arbitrum AnyTrust</a> chains like Arbitrum Nova).

Let's evaluate the current status of these components for both Arbitrum One and Arbitrum Nova, beginning with <a data-quicklook-from='arbitrum-chain-owner'>chain ownership</a>.

### 1. Chain ownership

  - **Description**: A chain's owner has the ability to change the protocol in various ways, including upgrading the core smart contracts, setting system parameters, and pausing the system.
  - **Current status**: Governed by <a data-quicklook-from='arbitrum-dao'>Arbitrum DAO</a>. Chain ownership of both Arbitrum One and Arbitrum Nova is under the control of the Arbitrum governance system. The Arbitrum Decentralized Autonomous Organization (DAO), made up of <a data-quicklook-from='arb'>$ARB</a> token-holders and <a data-quicklook-from='delegate'>delegates</a>, can carry out chain-owner operations through governance votes. The emergency <a data-quicklook-from='security-council'>Security Council </a> can also carry out chain-owner operations, but only in critical emergency situations. The Security Council can act slowly through a 7 of 12 <a data-quicklook-from='multisignature-wallet'>multisig wallet</a> or quickly through a 9 of 12 multisig wallet. The members of the Security Council are <a data-quicklook-from='security-council-election'>elected</a> every six months by the DAO.
  - **Risks**:
    - If 9 of the Security Council members are compromised or behave maliciously, the system and users' funds could be compromised.
    - If a malicious proposal is successfully put through DAO governance, the system's safety could be compromised. In this case, users will have several weeks to withdraw their funds back to Ethereum before the proposal takes effect.
  - **Future**: The role of governance in Arbitrum can be changed by the governance system itself.

### 2. Validator ownership

  - **Description**: Validators are responsible for updating the state of the <a data-quicklook-from='arbitrum-chain'>Arbitrum chain</a> and ensuring that all updates are valid.
  - **Current status**: Permissioned. Validation on both Arbitrum One and Arbitrum Nova is currently allow-listed to TODO public entities. You can see the list of validators [here](qqq link).
  - **Risks**: If all X Arbitrum validators behave maliciously, the system's safety could be compromised.
  - **Future**: The Arbitrum governance system (see #1) can modify the Validator allow-list, such as by adding or removing members or removing the allow-list entirely.

### 3. Sequencer ownership

  - **Description**: The Sequencer is typically responsible for collecting and ordering users' transactions.
  - **Current status**: Centralized. The Sequencers for both Arbitrum One and Arbitrum Nova are currently centralized and maintained by Offchain Labs.
  - **Risks**: The Sequencer has the ability to delay the inclusion of a user's transaction by up to 24 hours and reorder transactions over short time-horizons. The Sequencer cannot compromise the system's safety.
  - **Future**: The Arbitrum governance system (see #1) can elect a new entity as the Sequencer, such as a more distributed/decentralized system.

### 4. Data Availability Committee (DAC) ownership

:::note

This applies only to Arbitrum AnyTrust chains like Arbitrum Nova.

:::


  - **Description**: AnyTrust chains like Arbitrum Nova rely on a permissioned committee to store the chain's data and provide it on demand.
  - **Current status**: 7-member committee. The Arbitrum Nova chain has a 7-party DAC, whose members can be seen [here](https://developer.arbitrum.io/public-chains#arbitrum-chains-summary).
  - **Risks**: If 6 of the 7 committee members as well as the Sequencer behave maliciously and collude, the safety of the system can be compromised.
  - **Future**: The Arbitrum governance system (see #1) can change the role of the DAC, such as by adding or removing members or modifying the power it has over the system.


---


**FAQ:**

- todo:qqq, injected from base and linked throughout

---

**Footnotes:**

<a id='footnote-1'>1.</a> See our <a href='https://gas.arbitrum.io/'>gas cost estimator</a> and <a href='https://l2fees.info/'>L2Fees</a> for more information.<br/>
<a id='footnote-2'>2.</a> todo:qqq

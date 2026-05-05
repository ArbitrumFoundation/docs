---
id: register-token-via-dao-governance
title: How to register a custom gateway token via Arbitrum DAO governance
sidebar_label: Register a token via DAO governance
description: Learn how to use the standardized RegisterAndSetArbCustomGatewayAction template to author or evaluate a token registration AIP.
dao_author: anegg0
dao_sme: TBD
---

import DraftExpectationsPartial from '@site/docs/partials/_draft-expectations-partial.md'; 

<DraftExpectationsPartial />

Registering a custom token in Arbitrum's [generic-custom gateway](https://docs.arbitrum.io/build-decentralized-apps/token-bridging/configure-token-bridging/setup-generic-custom-gateway) usually requires the parent chain token contract to call `registerCustomL2Token` and `setGateway` itself. When the parent chain token is non-upgradeable or otherwise can't make those calls, registration must go through Arbitrum DAO governance using the privileged `forceRegisterTokenToL2` and `setGateways` paths.

The Arbitrum Foundation publishes a [standardized action contract template](https://forum.arbitrum.foundation/t/announcement-of-standardized-token-registrations-template/29764) — `RegisterAndSetArbCustomGatewayAction` — that wraps both calls in a single privileged action. Using the template is **a helpful utility, not a requirement**, but it gives proposals a known-safe shape and gives delegates a familiar artifact to verify.

## Audience

This how-to serves two participants in the <a data-quicklook-from="arbitrum-improvement-proposal-aip">AIP</a> process:

- **Proposers** — token issuers preparing an AIP to register their token.
- **Delegates and voters** — anyone evaluating a token-registration proposal that appears on [Tally](https://tally.xyz/gov/arbitrum).

For step-by-step issuer-side implementation (deployment dependencies, deposit flows, post-registration validation), see the [companion how-to in the Arbitrum technical docs](https://docs.arbitrum.io/build-decentralized-apps/token-bridging/configure-token-bridging/register-via-dao-governance).

## When this template applies

The template is appropriate when **all** of the following hold:

- The parent chain ERC-20 token is already deployed and **cannot be upgraded** to add the [`ICustomToken`](https://github.com/OffchainLabs/token-bridge-contracts/blob/main/contracts/tokenbridge/ethereum/ICustomToken.sol) methods needed for self-service registration.
- The child chain token contract — implementing [`IArbToken`](https://github.com/OffchainLabs/token-bridge-contracts/blob/main/contracts/tokenbridge/arbitrum/IArbToken.sol) — is already deployed.
- The proposer is willing to author and shepherd a <a data-quicklook-from="constitutional-aip">Constitutional AIP</a> (this action requires "chain owner" permission).

If the parent chain token can be upgraded, the [self-service registration path](https://docs.arbitrum.io/build-decentralized-apps/token-bridging/configure-token-bridging/setup-generic-custom-gateway) is faster and doesn't need a DAO vote.

## What the action contract does

`RegisterAndSetArbCustomGatewayAction` is a one-shot action contract executed by the DAO's `UpgradeExecutor` via the L1 timelock. It performs the two registration calls in a single privileged transaction:

```solidity
// SPDX-License-Identifier: Apache-2.0
pragma solidity 0.8.16;

contract RegisterAndSetArbCustomGatewayAction {
    IL1AddressRegistry public immutable addressRegistry;

    function perform(
        address[] memory _l1Tokens,
        address[] memory _l2Tokens,
        uint256 _maxGasForRegister,
        uint256 _gasPriceBidForRegister,
        uint256 _maxSubmissionCostForRegister,
        uint256 _maxGasForSetGateway,
        uint256 _gasPriceBidForSetGateway,
        uint256 _maxSubmissionCostForSetGateway
    ) external payable {
        // 1. forceRegisterTokenToL2 on the L1 generic-custom gateway
        // 2. setGateways on the L1 gateway router (pointing _l1Tokens at the generic-custom gateway)
    }
}
```

Source: [`RegisterAndSetArbCustomGatewayAction.sol`](https://github.com/ArbitrumFoundation/governance/blob/main/src/gov-action-contracts/token-bridge/RegisterAndSetArbCustomGatewayAction.sol).

Each of the two calls emits a retryable ticket from the parent chain to the child chain. Both retryables are auto-redeemed when the action contract supplies enough submission cost, after which the token is fully registered on both chains.

## How a proposal is constructed

The proposer generates the proposal calldata using [Foundry's `cast`](https://book.getfoundry.sh/getting-started/installation). Save the following as `reg-arb-custom.sh`, set the L1 and L2 token addresses, and run it:

```bash
#!/usr/bin/env bash
set -euo pipefail

# Token addresses (modify these)
L1_TOKEN_ADDRESS="0x000000000000000000000000000000000000dead"
L2_TOKEN_ADDRESS="0x000000000000000000000000000000000000dead"

# Governance constants (do not modify)
readonly L1_ACTION_ADDRESS="0x997668Ee3C575dC060F80B06db0a8B04C9558969"
readonly L1_UPGRADE_EXECUTOR="0x3ffFbAdAF827559da092217e474760E2b2c3CeDd"
readonly L1_TIMELOCK="0xE6841D92B0C345144506576eC13ECf5103aC7f49"
readonly MAX_SUBMISSION_FEE="0.0005"
readonly TOTAL_VALUE="0.001"
readonly DELAY_SECONDS=259200

L1CALL=$(cast calldata \
    "perform(address[],address[],uint256,uint256,uint256,uint256,uint256,uint256)" \
    "[$L1_TOKEN_ADDRESS]" \
    "[$L2_TOKEN_ADDRESS]" \
    0 \
    0 \
    "$(cast to-wei "$MAX_SUBMISSION_FEE")" \
    0 \
    0 \
    "$(cast to-wei "$MAX_SUBMISSION_FEE")")
L1CALLVALUE=$(cast to-wei "$TOTAL_VALUE")
L2CALL=$(cast calldata \
    "execute(address,bytes)" \
    "$L1_ACTION_ADDRESS" \
    "$L1CALL")
PREDECESSOR=$(cast to-bytes32 0x00)
SALT=$(cast keccak \
    "$(cast abi-encode \
        "a(uint256[],address[])" \
        "[1]" \
        "[$L1_ACTION_ADDRESS]")")
FINAL_CALLDATA=$(cast calldata \
    "scheduleBatch(address[],uint256[],bytes[],bytes32,bytes32,uint256)" \
    "[$L1_UPGRADE_EXECUTOR]" \
    "[$L1CALLVALUE]" \
    "[$L2CALL]" \
    "$PREDECESSOR" \
    "$SALT" \
    "$DELAY_SECONDS")

echo "===== Proposal ====="
echo "Target Contract: 0x0000000000000000000000000000000000000064"
echo "Value: 0"
echo "arbSysSendTxToL1Args.l1Timelock: " $L1_TIMELOCK
echo "arbSysSendTxToL1Args.calldata:"
echo "$FINAL_CALLDATA"
```

The script (sourced from the [Foundation's reference gist](https://gist.github.com/gzeoneth/439dedc7bdd971345657a04c266daf00)) prints the four values that go into the Tally proposal:

- **Target contract:** `0x0000000000000000000000000000000000000064` — the [`ArbSys`](https://docs.arbitrum.io/build-decentralized-apps/precompiles/01-overview) precompile
- **Value:** `0`
- **`destination`** (first argument): the L1 Timelock address
- **`data`** (second argument): the encoded calldata that schedules the batched call

For a fully worked example, see the [BORING token registration payload gist](https://gist.github.com/hajnalben/b12cfae78ec88259be8c396c25bab1c2).

## Submitting the proposal

Once the calldata is generated, the rest of the AIP submission process follows the standard flow described in [How to submit a DAO proposal](./create-submit-dao-proposal.md):

1. Forum post for off-chain discussion
2. Snapshot poll for temperature check
3. Tally on-chain proposal targeting `ArbSys.sendTxToL1(destination, data)` with the values from the script
4. Standard voting period and timelock delays as described in the [AIP lifecycle](../concepts/lifecycle-anatomy-aip-proposal.md)

## On-chain execution after the proposal passes

Once the AIP succeeds on Tally, execution proceeds as follows:

1. The Arbitrum Core governance contract calls `ArbSys.sendTxToL1`, queuing a parent chain message from the child chain.
2. After the standard withdrawal delay (~7 days), the L1 outbox executes the message, which calls `scheduleBatch` on the L1 Timelock.
3. After the timelock's 3-day delay (`DELAY_SECONDS = 259200`), anyone can call `executeBatch`, which has the `UpgradeExecutor` invoke `RegisterAndSetArbCustomGatewayAction.perform`.
4. The action contract calls `forceRegisterTokenToL2` on the parent chain generic-custom gateway and `setGateways` on the parent chain gateway router. Each call sends a retryable ticket to the child chain.
5. Both retryables auto-redeem (they're funded by the `MAX_SUBMISSION_FEE` constants), updating the L2 mappings.

When all retryables are redeemed, the token is registered on both chains and bridging through the generic-custom gateway works normally from that point on.

## What delegates should verify

When evaluating a token-registration proposal that uses this template, check the following before voting:

- **L1 token address** in the calldata corresponds to a real, deployed parent chain token contract for the project named in the proposal.
- **L2 token address** corresponds to a deployed child chain contract that implements [`IArbToken`](https://github.com/OffchainLabs/token-bridge-contracts/blob/main/contracts/tokenbridge/arbitrum/IArbToken.sol). The [companion how-to in the Arbitrum technical docs](https://docs.arbitrum.io/build-decentralized-apps/token-bridging/configure-token-bridging/register-via-dao-governance) details the interface requirements.
- **Action contract address** matches `0x997668Ee3C575dC060F80B06db0a8B04C9558969` (or the currently published canonical address — confirm against the [Foundation announcement](https://forum.arbitrum.foundation/t/announcement-of-standardized-token-registrations-template/29764)).
- **Upgrade Executor and L1 Timelock** match the canonical Arbitrum DAO addresses (`0x3ffFbAdAF827559da092217e474760E2b2c3CeDd` and `0xE6841D92B0C345144506576eC13ECf5103aC7f49` respectively).
- **`DELAY_SECONDS`** is `259200` (3 days). Lower delays should be flagged.
- **`PREDECESSOR`** is `bytes32(0)` and **`SALT`** is computed from the standard scheme (as in the script).
- **The forum thread** has had at least one week of off-chain discussion with no unresolved technical concerns.

## Frequently asked questions

### What if the L2 token address is wrong in the proposal?

Registration is one-time and irreversible per parent chain token address — `forceRegisterTokenToL2` reverts on a second attempt. Recovery requires a second AIP with a new action contract that re-registers via different methods. Validate addresses carefully before voting.

### Why does the proposal target the `ArbSys` precompile (`0x...0064`)?

Arbitrum DAO proposals execute on the child chain (Arbitrum One), but the registration calls happen on the parent chain. `ArbSys.sendTxToL1` is the precompile that creates outbound messages from the child chain to the parent chain. The proposal's child chain transaction queues the parent chain call; the L1 Timelock and `UpgradeExecutor` then dispatch it.

### Is the standardized template mandatory?

No. Per the [Foundation announcement](https://forum.arbitrum.foundation/t/announcement-of-standardized-token-registrations-template/29764), the template is a helpful utility, not a requirement. Custom proposals that achieve the same registration result are valid, but reviewers and the Foundation will scrutinize them more closely.

### Is this a Constitutional or non-Constitutional AIP?

It's <a data-quicklook-from="constitutional-aip">Constitutional</a> — the action requires "chain owner" permission to register tokens in the generic-custom gateway. Constitutional AIPs go through the longer 34-day execution path with the full L1 waiting period.

## Resources

- [Forum announcement: Standardized Token Registrations Template](https://forum.arbitrum.foundation/t/announcement-of-standardized-token-registrations-template/29764)
- [`RegisterAndSetArbCustomGatewayAction.sol`](https://github.com/ArbitrumFoundation/governance/blob/main/src/gov-action-contracts/token-bridge/RegisterAndSetArbCustomGatewayAction.sol) (action contract source)
- [Payload generator gist](https://gist.github.com/gzeoneth/439dedc7bdd971345657a04c266daf00)
- [Companion issuer-side how-to (Arbitrum technical docs)](https://docs.arbitrum.io/build-decentralized-apps/token-bridging/configure-token-bridging/register-via-dao-governance)
- [The lifecycle and anatomy of an AIP](../concepts/lifecycle-anatomy-aip-proposal.md)
- [How to submit a DAO proposal](./create-submit-dao-proposal.md)

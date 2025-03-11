---
id: bold-reimbursing-gas-costs
title: "Reimbursing honest party gas costs in Arbtrum BoLD"
sidebar_label: Gas cost reimbursements
description: A specification for how honest parties are reimbursed for gas costs by the Arbitrum Foundation for their active, honest participation in Arbitrum BoLD
dao_author: dlee
dao_sme: mMcGilvrayAlvarez
---

:::note
The details in this page pertain specifically only to Arbitrum One as it is the only Arbitrum DAO-owned chain that has permissionless validation enabled using Arbitrum BoLD.
:::

This document will cover how we reimburse costs for gas to honest parties. The main document describing how we reimburse challenge bonds is [here](./bold-reimbursing-challenge-bonds.md). The document describing how we pay “service fees” to proposers is [here](./bold-reimbursing-service-fees.md). 

We reimburse gas costs offchain for a few reasons:

- The amounts of money involved are going to be smaller than assertion bonds, so there is less risk in using an out-of-band procedure
- The logic required to implement gas reimbursement on-chain would require a lot of extra bookkeeping, as it would require the parent chain to keep track of data about the chain history, including previous transactions interacting with the challenge protocol, the senders of those transactions, and the gas prices they paid.
    - This extra bookkeeping would be expensive and might even outweigh the value of the reimbursement. Depending on where exactly these costs are born, it could either make the entire protocol noticeably more expensive or create a situation where it never makes sense to get reimbursed for gas because you’ll spend almost as much (or more) money to pay for the reimbursement transaction as that transaction would pay out.

### The Basic Idea

Let’s consider a slightly abstracted version of the honest strategy. The honest strategy can be seen as computing, given (the honest party’s view of) the current protocol state, zero or more (distinct) actions are needed to ensure that the honest party wins the challenge. That is, we can view the honest strategy as a function:

$H : ProtoState \rightarrow Set(ProtoAction)$

from a protocol state to a set of actions.

For more details on the strategy that honest parties are expected to adhere to in BoLD (the "honest strategy"), see sections 4.5 and 5.5 in the [BoLD whitepaper](https://arxiv.org/abs/2404.10491).

### The Procedure

Concretely, the reimburser can run the following algorithm. Remember that we are running offchain, and thus are allowed to do heavier-weight computation than possible on-chain. In particular, we can invoke $H$ (the abstract honest strategy) to see what it would do.

We can also check to see if the protocol, including all sub-challenges, is over (i.e., we no longer need to keep looking at protocol actions to see if any more needs reimbursed) at any particular state. Let’s call the function that does this check $C : ProtoState \rightarrow bool$; it returns $true$ if the protocol is over.

When we check for set membership in sets of protocol actions, we need check to see if two actions $A_1$ and $A_2$ are equal as protocol actions. By this, we mean that:

- $A_1$ and $A_2$ are both the same type of action ($CreateRoot$, $Bisect$, $Refine$, $OneStepProve$, or $UpdateTimers$)
- Furthermore, $A_1$ and $A_2$ have the same arguments

:::note
This notion of equality ignores metadata on the transaction such as the sender, nonce, timestamp, etc.
:::

- Let $state : ProtoState := Init$ be initialized to the starting protocol state.
- Let $acts : Stream(ProtoAction)$ be a stream that returns the actions that take place in this run of the protocol, in order; each call to $acts.get()$ will return one action.
- Let $b : bool := C(state)$
- While $b != true$:
  - Let $next : ProtoAction := acts.get()$
  - Let $honest : Set(ProtoAction) := H(state)$
  - If $next \in honest$:
    - $reimburse(next.sender, next.gas\_spent)$
  - $state := executeProtoActionOnState(next, state)$
  - $b := C(state)$

### Why This Is Correct

While the procedure makes intuitive sense, seeing that this works is not entirely trivial. For instance, the concrete honest strategy will submit its moves in some particular order. The moves may get censored, reordered, and/or delayed before being executed on the parent chain. During this time (between the honest party sending the actions and the actions executing), other actions may have occurred, causing the protocol state to change. 

However, the worst that can happen here is that the honest party’s transaction arrives after the same transaction occurs. In this case, we don’t reimburse the honest party whose transaction arrived later, but this is intended behavior (see [reimbursing extra-gas costs](#reimbursing-extra-gas-costs) below).

- Put differently, an honest party’s transaction can fail to be reimbursable if another party’s identical transaction arrives first. (Timer updates, discussed below, slightly complicate the matter, but not by too much).
- Another way to put this is that the honest strategy never attempts to do work that isn’t strictly necessary to confirm the honest root edge. So given that the honest root does get confirmed, *every action that any honest party could have tried to submit, no matter what state they saw at the time, will either be reimbursable or have been front-run by an identical action*.
- Reorgs on the parent chain don’t affect this argument either since if an honest party submits a transaction based on a state that gets reorg’d out, that transaction will also get reorg’d out.

As mentioned above, there is a subtlety around timer updates. Namely, the honest party needs to be careful how they set their “timer target” parameter when updating timers. Recall how this works: when submitting an “update timers” transaction, the sender chooses a “target” value. The timer will be updated unless the currently-stored bottom-up timer is equal to or larger than the target.

For any honest edge $E$ needing to have its timer updated, the correct target can be calculated as follows:

- Let $A$ be the honest root of the challenge (or sub-challenge) currently being fought. ($E$ is a descendant of $A$).
- $A$ is confirmable if $T_{bottomup}(E) + T_{topdown}(E) \geq T_{confirm}$, where
    - $T_{bottomup}(E)$ is $E$’s bottom-up timer (the value whose approximation is being updated by the update timer action)
    - $T_{topdown}(E)$ is the sum of local timers starting from $A$ down to $E$
    - $T_{confirm}$ is the confirmation threshold
- The target value will be the minimum bottom-up timer needed to confirm $E$; that is, $T_{confirm} - T_{topdown}(E)$

:::note
This value doesn’t depend on the current timestamp, so delays and censorship before the execution of the transaction can’t render this target invalid.
:::

If the honest party chooses the correct value (the minimum possible value that leads to the node being confirmable), then only the following situations are possible:

- Frontrun by an identical transaction
    - This means the honest party’s transaction won’t result in a state change and will be relatively cheap. The honest party won’t get reimbursed, but it won’t lose much (relative to how much a state change would cost)
- Frontrun by a transaction with a larger target
    - This larger transaction can only be honest if we are in a sub-challenge and the sub-challenge root and challenge root are both confirmable but not confirmed simultaneously. This example is an edge case, but it is also not a problem. The worst result here is the same as the previous case (the honest party’s transaction is a no-op and doesn’t get reimbursed)

## On Gas Prices

Parties in the protocol may set excessive gas prices when they send transactions; if they do this and get reimbursed for the full cost of their transactions, they can drain funds from the protocol. Therefore, it is intended that the Foundation (or whoever administers the out-of-band reimbursement process) should cap the level of gas price for which they reimburse, depending on what gas prices were at the times when the honest transactions were submitted. This cap must be carefully implemented so that honest parties don’t lose money if gas prices are legitimately high.

## Reimbursing Extra-Gas Costs

<!-- On our page about [reimbursing service fees](./bold-reimbursing-service-fees.md), -->
One might wonder whether it is worth attempting to reimburse gas for transactions that could have resulted from multiple honest parties racing to make some particular protocol move. We call such gas fees *extra gas*. In such a case, only the party whose transaction was run (on the parent chain) first will get reimbursed under the approach outlined so far. Though this seems like an undesirable outcome, the situation is mitigated by the fact that only the first transaction will cause any state change in such cases where there are duplicate transactions. Thus, we would expect the L1 gas fees for any such “extra” transactions beyond the first would be relatively low.

Reimbursing extra gas costs is vulnerable to abuse by dishonest parties who repeatedly make redundant copies of honest moves to try to drain funds from the protocol. Trying to address these avenues for abuse would likely result in extra complexity that we don’t consider worthwhile, given how small we expect these additional costs to be (for honest parties following the honest strategy correctly) anyway.

## Other remarks

As outlined in the now-passed [AIP proposal to request funds to bootstrap the first BoLD validator](https://forum.arbitrum.foundation/t/aip-funds-to-bootstrap-the-first-bold-validator/24506#p-51247-payment-facilitation-final-costs-restrictions-13), all requested funds for the gas fee reimbursement budget gets sent to a multi-sig controlled by the Arbitrum Foundation. After three years, any unspent funds from the gas fee reimbursement budget will return to the Arbitrum DAO. An additional proposal will be forthcoming to help cover Arbitrum's future operational costs. The Arbitrum DAO reserves the right to revoke the Arbitrum Foundation's proposer at any time and return the bonds to the treasury. This policy will be implemented and enforced via the BoLD smart contracts:
* **Withdrawal address**: The funds will get deposited into BoLD, and the withdrawal address will be set to the 'UpgradeExecutor' contract on the parent chain.
* **Triggering withdrawal**: The Arbitrum DAO (via governance) or the Arbitrum Foundation will have the authority to trigger a withdrawal and the funds can only be sent to the pre-established withdrawal address (i.e., the Arbitrum DAO's treasury).

In short, the Arbitrum DAO will have the authority to return the funds to the Arbitrum DAO treasury. This model can be used for future proposals if other entities want to run a proposer on behalf of the Arbitrum DAO.

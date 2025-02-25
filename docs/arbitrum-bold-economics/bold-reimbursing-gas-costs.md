---
id: bold-reimbursing-gas-costs
title: "Reimbursing honest party gas costs in Arbtrum BoLD"
sidebar_label: Gas cost reimbursements
description: A specification for how honest parties are reimbursed for gas costs by the Arbitrum Foundation for their active, honest participation in Arbitrum BoLD
dao_author: dlee
dao_sme: mMcGilvrayAlvarez
---

:::note
The details in this page pertain specifically only to Arbitrum One as it is the only ArbitrumDAO-owned chain that has permissionless validation enabled using Arbitrum BoLD.
:::

This will cover how we reimburse costs for gas to honest parties. The main document describing how we reimburse challenge bonds is [here](./bold-reimbursing-challenge-bonds.md). The document describing how we pay “service fees” to proposers is [here](./bold-reimbursing-service-fees.md). 

We reimburse gas-costs off chain for a few reasons:

- The amounts of money involved are going to be smaller than assertion bonds, so there is less risk in using an out-of-band procedure
- The logic required to implement gas reimbursement on-chain would require a lot of extra bookkeeping, as it would require L1 to keep track of data about the chain history, including previous transactions interacting with the challenge protocol, the senders of those transactions, and the gas prices they paid.
    - This extra bookkeeping would be expensive and might even outweigh the values being reimbursed. Depending on where exactly these costs are born, it could either make the entire protocol noticeably more expensive, or create a situation where it never makes sense to get reimbursed for gas because you’ll spend almost as much (or more) money to pay for the reimbursement transaction as that transaction would pay out.

### The Basic Idea

Let’s consider a slightly abstracted version of the honest strategy. The honest strategy can be seen as computing, given (the honest party’s view of) the current protocol state, zero or more (distinct) actions that need to be performed in order to ensure that the honest party wins the challenge. That is, we can view the honest strategy as a function

*`H : ProtoState -> Set(ProtoAction)`*

from a protocol state to a set of actions.

### The Procedure

Concretely, the reimburser can run the following algorithm. Remember that we are running off-chain, and thus are allowed to do heavier-weight computation than would be possible on-chain. In particular, we are allowed to invoke `H` (the abstract honest strategy) to see what it would do.

We can also check to see if the protocol, including all subchallenges, is over (i.e., we no longer need to keep looking at protocol actions to see if any more need to be reimbursed) at any particular state. Let’s call the function that does this check *`C : ProtoState -> bool`*; it returns `true` iff the protocol is over.

When we check for set membership in sets of protocol actions, we need check to see if two actions `A_1` and `A_2` are equal as protocol actions. By this, we mean that:

- `A_1` and `A_2` are both the same type of action (`CreateRoot`, `Bisect`, `Refine`, `OneStepProve`, or `UpdateTimers`)
- Furthermore, `A_1` and `A_2` have the same arguments

Note that this notion of equality ignores metadata on the transaction such as the sender, nonce, timestamp, etc.

Let `state : ProtoState := Init` be initialized to the starting protocol state.

Let `acts : Stream(ProtoAction)` be a stream that returns the actions that take place in this run of the protocol, in order; each call to `acts.get()` will return one action.

Let `b : bool := C(state)`

While `b != true`:

Let `next : ProtoAction := acts.get()`

Let `honest : Set(ProtoAction) := H(state)`

If `next \in honest`:

`reimburse(next.sender, next.gas\_spent)`

`state := executeProtoActionOnState(next, state)`

`b := C(state)`


### Why This Is Correct

While the procedure makes intuitive sense, it is not completely trivial to see that this works. For instance, the concrete honest strategy will submit its moves in some particular order. The moves may get censored, reordered, and/or delayed before they are executed on L1. During this time (between the honest party sending the actions and the actions being executed), other actions may have been executed, causing the protocol state to change. 

However, it can be shown that the worst that can happen here is that the honest party’s transaction arrives after the same transaction has already happened. In this case, we don’t reimburse the honest party, but this is intended behavior (see “reimbursing extra-gas costs”, below).

- Put differently, the only way that an honest party’s transaction can fail to be reimbursible is if another party’s identical transaction arrives first. (Timer updates, discussed below, complicate the matter slightly, but not by too much).
- Another way to put this is that the honest strategy never attempts to do work that isn’t strictly necessary for the confirmation of the honest root edge. So given that the honest root does get confirmed, *every action that any honest party could have tried to submit, no matter what state they saw at the time, will either be reimbursable, or have been frontrun by an identical action*
- Reorgs on L1 don’t affect this argument either, since if an honest party submits a transaction based on a state that gets reorg’d out, that transaction will also get reorg’d out.

As mentioned above, there is a subtlety around timer-updates. Namely, the honest party needs to be careful how they set their “timer target” parameter when updating timers. Recall how this works: when submitting an “update timers” transaction, the sender chooses a “target” value. The idea is that the timer will be updated, unless the currently-stored bottom-up timer is equal to or larger than the target.

For any honest edge E needing to have its timer updated, the correct target can be calculated as follows:

- Let A be the honest root of the challenge (or subchallenge) currently being fought. (E is a descendant of A).
- A is confirmable if `T_{bottomup}(E) + T_{topdown}(E) \geq T_{confirm}`, where
    - `T_{bottomup}(E)` is E’s bottom-up timer (the value whose approximation is being updated by the update timer action)
    - `T_{topdown}(E)` is the sum of local timers starting from A down to E
    - `T_{confirm}` is the confirmation threshold
- The target value will be the minimum bottom-up timer needed to confirm E; that is, `T_{confirm} - T_{topdown}(E)`
    - Note that this value doesn’t depend on the current timestamp, so delays and censorship before the execution of the transaction can’t render this target invalid.

If the honest party chooses the correct value (the minimum possible value that leads to the node being confirmable), then only the following situations are possible:

- Frontrun by an identical transaction
    - This means the honest party’s transaction won’t result in a state change, and so will be relatively cheap. The honest party won’t get reimbursed, but it won’t lose much (relative to how much a state change would cost)
- Frontrun by a transaction with a larger target
    - This larger transaction can only be honest if we are in a subchallenge and the subchallenge root and challenge root are both confirmable-but-not-confirmed at the same time. This is somewhat of an edge case, but is also not a problem. The worst result here is the same as the previous case (the honest party’s transaction is a no-op and doesn’t get reimbursed)

## On Gas Prices

Parties in the protocol may set excessive gas prices when they send transactions; if they do this, and they get reimbursed for the full cost of their transactions, they can drain funds from the protocol. Therefore, it is likely a good idea to cap the level of gas price for which we reimburse, depending on what current market gas prices are. This needs to be done carefully so that honest parties don’t lose money if gas prices are legitimately high.

## Reimbursing Extra-Gas Costs

On our page about [reimbursing service fees](./bold-reimbursing-service-fees.md), we defined the concept of “extra gas”; that is, gas spent by transactions that could have resulted from multiple honest parties racing to make some particular protocol move. In this procedure, we do not worry about reimbursing this “extra gas”. This means that, when multiple parties race to make a protocol move, only the party whose transaction was run (on L1) first gets reimbursed. This is mitigated by the fact that, in such cases where there are duplicate transactions, only the first one will cause any state change. Thus, we would expect the gas fees for any such “extra” transactions beyond the first would be low.

Reimbursing extra-gas costs is vulnerable to abuse by dishonest parties who repeatedly make redundant copies of honest moves in order to try to drain funds from the protocol. Trying to address these avenues for abuse would likely result in extra complexity that we don’t consider worthwhile given how small we expect these extra costs to be (for genuine honest parties) anyway.

## Other remarks

As outlined in the now-passed [AIP proposal to request funds to bootstrap the first BoLD validator](https://forum.arbitrum.foundation/t/aip-funds-to-bootstrap-the-first-bold-validator/24506#p-51247-payment-facilitation-final-costs-restrictions-13), all requested funds for the gas fee reimbursement budget will be sent to a multi-sig controlled by the Arbitrum Foundation. After 3 years, any unspent funds from the gas fee reimbursement budget will be returned to the ArbitrumDAO and a subsequent proposal will be posted to help cover the future operational costs of Arbitrum. The ArbitrumDAO reserves the right to revoke the Arbitrum Foundation’s proposer at any time and return the bonds back to the treasury. This will be implemented and enforced via the BoLD smart contracts:
* Withdrawal Address. The funds will be deposited into BoLD and the withdrawal address set to the ‘UpgradeExecutor’ contract on L1.
* Triggering Withdrawal. The ArbitrumDAO (via governance) or the Arbitrum Foundation will have the authority to trigger a withdrawal and the funds can only be sent to the pre-established withdrawal address (i.e. the ArbitrumDAO’s treasury).

Put another way, the ArbitrumDAO will have the authority to single-handedly return the funds back to the ArbitrumDAO treasury. This model can be used for future proposals if other entities want to run a proposer on behalf of the ArbitrumDAO.

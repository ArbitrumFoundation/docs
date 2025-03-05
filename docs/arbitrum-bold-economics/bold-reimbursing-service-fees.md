---
id: bold-reimbursing-service-fees
title: "Reimbursing honest party service fees in Arbitrum BoLD"
sidebar_label: Service fee payments
description: A specification for how honest parties are paid services fees by the Arbitrum Foundation for their active, honest participation in Arbitrum BoLD
dao_author: dlee
dao_sme: mMcGilvrayAlvarez
---

:::note
The details in this page pertain specifically only to Arbitrum One as it is the only Arbitrum DAO-owned chain that has permissionless validation enabled using Arbitrum BoLD.
:::

## Introduction

In Arbitrum BoLD, proposing assertions can be permissionless; however, when proposing an assertion, the proposer must place a *bond* associated with the assertion. Further reading on the economics of BoLD and why this is needed can be found in the [Economics of Disputes in Arbitrum BoLD](https://docs.arbitrum.io/how-arbitrum-works/bold/bold-economics-of-disputes). This bond is 3600 `ETH`. While `ETH` are locked up in this way, they are not earning any yield; thus, locking up this `ETH` represents a cost for proposers: the opportunity cost of not earning a yield on their `ETH`.

Service Fees attempt to make honest proposers whole for the opportunity cost they bear while bonded on assertions in recognition that, in doing so, they provide an essential service to Arbitrum and that providing this service is not free for the honest proposers. The idea is simple: we want to reimburse honest proposers for what they could have earned on a safe investment elsewhere. The fee should be in the same currency as the bond (i.e., `ETH`). It should correlate to the annualized income that the parent chain (Ethereum) mainnet staked validators receive over the same period. The yield of being a staker on the parent chain can, of course, this may vary over time, but currently at the time of writing, the estimated annual income for Ethereum mainnet validators is approximately 3% to 4% of their stake (based on [CoinDesk Indices Composite Ether Staking Rate (CESR)](https://indices.coindesk.com/indices/cesr-composite-ether-staking-rate) benchmark and [Rated.Network](https://explorer.rated.network/network?network=mainnet&timeWindow=all&rewardsMetric=average&geoDistType=all&hostDistType=all&soloProDist=stake)). This fee is not a “reward” for the same reasons why the protocol does not reward honest parties with the funds confiscated from a malicious actor (see [FAQ](https://www.notion.so/arbitrumfoundation/Arbitrum-BOLD-FAQ-93210f430a6a470792496be040ac9990) for more details).

There is one important exception to the rule that honest proposers earn service fees. The Arbitrum Foundation currently operates a node that acts as a proposer, using money allocated to it for that purpose by the Arbitrum DAO ([AIP: Funds to bootstrap the first BoLD validator](https://forum.arbitrum.foundation/t/aip-funds-to-bootstrap-the-first-bold-validator/24506)). Since this proposer is ran using the Arbitrum DAO's money as a bond, the Arbitrum Foundation's proposer will not earn service fees for proposing assertions. (It is, of course, still bonded on its assertions and is still subject to slashing if it is dishonest).

## Implementation

In our initial implementation of BoLD, we envision paying honest proposers their service fees as being mediated by the Arbitrum Foundation. However, this calculation of how much in service fees and to whom is logically separate from the decision about who pays these parties their service fees (and how).

:::note
We deal in notional “time units” `u` here, which are likely in practice to be parent chain block times or something similar. The details of what these units represent actually don’t matter very much; we just need a conversion factor `\theta = \frac{u}{year}`
:::

How service fees get calculated:

- Take a time range `[t_{initial}, t_{final})`. This corresponds to the period of time we are going to consider; we will pay out only service fees accrued during this time.
    - `t_{final}` must be some time in the past from the current time `t_{current}`. This is so that we can know “once and for all” which assertions were honest (from BoLD’s viewpoint) and which were not. How far in the past? The worst case is where the last assertion proposed before `t_{final}` resulted in a challenge, which could take up to `2 * p` to resolve (`p` being a challenge period).
    - We might be able to get away with less that `2*p` if we are doing this offchain, since an offchain user can determine which assertions are honest before BoLD knows. These calculated honest assertions could then be used in the DAO proposal. However, we would still require at least that the assertions up to `t_{final}` have gained finality on the parent chain before `t_{current}`.
- Make a list `L` of all honest assertions that were proposed between `t_{initial}` and `t_{final}`. For each such honest assertion `A`, collect the following information:
    - `T(A)`, the time between the creation of `A` and its honest successor assertion (measured in units `u`)
    - `Addr(A)`, the address of the bonder who bonded on `A`
- For each `A` in `L`:
    - For generality, let `B` be the bond amount, and let `R` be the APY used to determine the service fee.
    - Compute the payment amount `M = T(A) * \frac{1}{\theta} * B * R`
        - Example: the parameters described above, using hours as our time unit `u` (so `\theta = \frac{8760\ hour}{year}`, ignoring leap years) this would be:
        - `M = \frac{T(A) * 3600`ETH` * \frac{.05}{year}}{8760 \frac{hour}{year}} = .002055 `ETH` * T(A) * \frac{1}{hour}` (remember that we defined `T(A)` so that it includes its unit (`hour`))
    - Pay `M(A)` to `Addr(A)`

Of course, care must be taken to ensure that this procedure is not called on overlapping time ranges. This would result in paying out the service fees twice for any honest assertion falling into the overlap.

## How Much Does it Cost?

It’s natural to ask how much this mechanism is going to cost the Arbitrum DAO. First, we imagine that the common case might be that the Arbitrum Foundation's proposer is usually the one who proposes blocks. In this case, there is only one proposer (assuming the Arbitrum Foundation is honest and there are no challengers). This is actually one reason we don’t want to make the service fees for proposing blocks too high: we don’t want unnecessary competition between honest proposers trying to make a profit by earning service fees. In this “happy case” (with only Arbitrum Foundation proposing), no service fees need to be paid out.

On the other hand, it could (in the worst case) happen that the Arbitrum Foundation proposer never gets a chance to propose. In this case, other honest parties would be earning 3% APY on their bonds 100% of the time. So, over a year, we would have to pay out 3% * 3600 = 108 `ETH`.

This example is truly the worst case: we are *guaranteed never to have to pay more than the staking rate that the parent chain Ethereum validators get paid for the same period*. **Proof Sketch:** To see this, let’s look retrospectively at states of the challenge protocol, from the perspective of a time after all relevant parent chain blocks have become finalized, and all relevant assertions have either been accepted or rejected (i.e., adjudicated as honest or dishonest). First,, notice that there can only be one bonded honest proposer at that point in time for all points in time.

- Suppose there were two honest proposers some point in time, bonded on two different assertions. Only one bond can exist on any one assertion (including all its predecessor assertions). So, the two honest proposers must be bonded on the same assertion, which is a contradiction.
- Suppose there exists a point in time where we have paid out more than 108 `ETH` during the past year. In the case above (”the Arbitrum Foundation proposer never gets a chance to propose”), there is exactly one honest bonded proposer eligible for the service fee at any point in time. But in this case we pay out only 108 `ETH`. To pay out more we would need to be paying out service fees on more bonds. But since every point in time already has a bond on an honest assertion, the only way to “squeeze in” more bonded value would be to create a situation where two honest parties are bonded on different assertions (as, again, there can only be one bond per assertion) at some point in time. But this contradicts the statement proven above (that there can only be one bonded honest proposer at any point in time).

## Other Remarks

In principle, the calculations involved in determining who should receive service fee payments, and how much they receive, could be done on chain. It would be possible to implement a smart contract that a current or former proposer can call to retrieve they service fee payments they are owed; such a smart contract would probably be feasible from a gas-cost standpoint. For the initial release of BoLD, however, we do not do this due to time constraints. Determining how *often* to pay parties their service fees is not obvious and involves some tradeoffs. This decision will be left up to the Arbitrum Foundation as they are in trust, by the Arbitrum DAO, to make these payments on behalf of the Arbitrum DAO, when necessary. All service fee payments will be manually processed by the Arbitrum Foundation on a periodic basis (weekly or monthly) alongside a requirement that all payments adhere to the Arbitrum Foundation’s compliance process.

As outlined in the approved [AIP proposal to request funds to bootstrap the first BoLD validator](https://forum.arbitrum.foundation/t/aip-funds-to-bootstrap-the-first-bold-validator/24506#p-51247-payment-facilitation-final-costs-restrictions-13), all requested funds for the service fee will be sent to a multi-sig controlled by the Arbitrum Foundation. After three years, any unspent funds from the service fee reimbursement budget will be returned to the Arbitrum DAO and a forthcoming proposal will be posted to help cover the future operational costs of Arbitrum. The Arbitrum DAO reserves the right to revoke the Arbitrum Foundation’s proposer at any time and return the bonds back to the treasury. This will be implemented and enforced via the BoLD smart contracts:
* **Withdrawal address**: The funds will be deposited into BoLD and the withdrawal address set to the ‘UpgradeExecutor’ contract on the parent chain.
* **Triggering withdrawal**: The Arbitrum DAO (via governance) or the Arbitrum Foundation will have the authority to trigger a withdrawal and the funds can only be sent to the pre-established withdrawal address (i.e., the Arbitrum DAO’s treasury).

In short, the Arbitrum DAO will have the authority to single-handedly return the funds back to the Arbitrum DAO treasury. This model can be used for future proposals if other entities want to run a proposer on behalf of the Arbitrum DAO.

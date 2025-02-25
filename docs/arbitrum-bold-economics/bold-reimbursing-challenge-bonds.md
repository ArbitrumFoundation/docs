---
id: bold-reimbursing-challenge-bonds
title: "Reimbursing challenge bonds in Arbitrum BoLD"
sidebar_label: Challenge bond reimbursements
description: A specification for how honest parties are reimbursed for challenge bonds by the Arbitrum Foundation for their active, honest participation in Arbitrum BoLD
dao_author: dlee
dao_sme: mMcGilvrayAlvarez
---

:::note
The details in this page pertain specifically only to Arbitrum One as it is the only ArbitrumDAO-owned chain that has permissionless validation enabled using Arbitrum BoLD.
:::

## The Problem

BoLD guarantees that, within a single challenge period, the correct top-level assertion will be confirmed (as long as there is at least one non-resource-exhausted honest party playing the game). That is, by this point, the on-chain code “knows” which top-level edge is correct and should be reimbursed. However, after the correct top-level assertion is confirmed, if challenge bonds were placed (i.e., when opening subchallenges) during the protocol, the on-chain code still does not “know” which challenge bonds correspond to honest assertions. An additional mechanism must therefore be used to determine which challenge bonds to reimburse.

It is possible to refund challenge bonds “in-band”: that is, in a trustless way that is completely governed by the logic of the BoLD smart contracts. Doing this will require allowing challenges to continue on even after the honest top-level assertion is confirmed, in order to give parties the opportunity to prove that their challenge bonds correspond to correct assertions. Note that this does not change the fact that the top-level edge is guaranteed to be confirmed within a single challenge period. In other words, this adds a new phase of the BoLD challenge game that takes place after confirmation of a toplevel edge: *reimbursement disputes*, where parties continue (essentially) playing the challenge game in order to prove that their challenge bonds, rather than rival challenge bonds, should be reimbursed.

In this document we outline a candidate procedure for doing this. This procedure will consist of:

- Some (minor) changes to the on-chain smart contracts implementing BoLD, enabling them to adjudicate reimbursement disputes correctly.
- Some (somewhat minor) changes to the honest strategy, in order to ensure that parties following the strategy can get reimbursed for their honest challenge bonds

## A Naive Approach

The idea here is simple. Let `L` be the number of subchallenge levels. Once the top-level (level `L`) assertion in a challenge is confirmed, we take all the outstanding subchallenges of level `L-1` and turn each into a toplevel challenge of a new BoLD game (in which there are now `L-1` levels). These new games run concurrently, and don’t inherit timers from the top-level challenge game. It’s clear that (subject to the standard assumptions of BoLD) this approach works: for each subchallenge, the correct edge will be confirmed (enabling reimbursement), and we can then apply this approach recursively to handle subchallenges at level `L-2`, and so on. (There is a slight subtlety here, as we would also need to ensure that subchallenges at level `L-2` that were made in the initial level-`L` dispute game are included in the `L-2` dispute game, along with subchallenges at level `L-2` that appeared during the `L-1` reimbursement-dispute subchallenges.)

First, let’s consider a naive way to adjudicate reimbursement disputes, at the cost of a larger-than-optimal time bound on how long reimbursement disputes can run for. Then we show how to improve this to get a more acceptable bound.

This is clearly wasteful, though, as by treating each subchallenge level as its own, new BoLD game, we are essentially giving the adversary an entirely new censorship budget for each game. This would lead to a total maximum delay (before all reimbursements can be adjudicated) of `2*T*L`, where `L` is the number of subchallenge levels, and `T` is the confirmation threshold.

Also, and maybe counterintuitively, implementing this might be a heavier lift from an engineering point of view, as it would require a mechanism for converting subchallenge disputes into entire new BoLD games.

## A Better Approach

Instead we can treat a reimbursement dispute as a sub-game of BoLD, keeping the timers from the parent dispute. This setting is not quite the same as BoLD at the root level, though, as the honest party may “arrive late”. For example, suppose we have a two-level challenge, with 2 levels of bisection at the outer level (`L = 2`) and 2 levels of bisection at the inner level (`L = 1`). Suppose an adversary creates a dishonest toplevel assertion `A'_2`, and then immediately bisects all the way down to create an assertion at level 1, `A'_1`, using `C_1` units of censorship in the process. All of this happens before the honest party can do anything.

Now, it is *almost* the case that we can treat `A'_1` the same as if it were a top-level assertion in a separate challenge game, with `A'_1`’s presumptive timer starting at the moment it was created. However, unlike in a top-level challenge game, the honest party cannot immediately submit a valid move to create `A_1`, an honest assertion that rivals `A'_1` and stops its clock. This is because the honest party must first create an honest assertion `A_2`, and bisect it until it reaches a terminal node. *Only at this point* is the honest party in a position to create `A_1`; in that sense, at the creation time of `A'_1`, the honest party is “behind” where it would be if `A'_1` were a toplevel challenge edge, and will “arrive late”.

How late will it arrive? In this case, the honest party will be able to create `A_1` at time no later than `\delta * 2 + C_1` (that is, the amount of nominal delay to bisect down to the point of being able to create `A_1`, plus the amount of censorship that was consumed before creating `A'_1`). In general, if `C_i` is the censorship consumed until the creation of the honest assertion rivaling the dishonest assertion at level `i`, and `D_i` is the nominal delay required for the honest party to bisect down to level `i` (starting from level `L`), the honest party will be able to create a rival assertion at level `i` in no less than `C_i + D_i`.

Using this insight allows us to preserve the timers that were built up during the resolution of the top-level (level-`L`) assertion during reimbursement disputes at level `L-1`; and we can iterate this insight to enable us to (more generally) use timers built up in disputes of assertions at levels `j>i` in disputes on assertions at level `i`. The details of how this works will be described next.

The bottom line is that this reuse of timers can give us a better bound on the time it takes to resolve a reimbursement dispute at level `i` (relative to the naive approach); namely, `T * (L+1)`.

### On-Chain Changes

At a high level, we don’t believe any on-chain changes are in fact needed to facilitate the "better approach" to reimbursement, assuming the on-chain code already has facilities for allowing challenges to continue after the top-level edge is confirmed. (See below for an important caveat to this, if we are rewarding bonded honest parties for getting an edge confirmed beyond just giving them their bond and gas back).

### Honest Strategy Changes

Currently, the honest strategy will stop defending an (honest) edge when the weight of its path to the toplevel (level-`L`) root assertion is at least `T`. In order to enable reimbursement under this approach, for an edge *at subchallenge level `i`*, the honest party instead will need to keep defending an edge until the weight of that edge’s path to the honest root assertion *at level `i`* is at least `T`.

The honest strategy will, of course, also have to change to continue playing (relevant) subchallenges at level `i-1` after the confirmation of an assertion at level `i`. We don’t think that the logic by which the honest party chooses which edges to bisect, refine, and recalculate timers on, and when, needs to change.

### Correctness

Note that the correctness of this procedure depends on the idea that *it’s OK to reimburse adversaries for bonds on irrelevant assertions*. This should be OK, because there are two types of subchallenges:

- Subchallenges where honest parties participate. In such subchallenges, honest parties will win, and so no adversary will get reimbursed
- Subchallenges where no honest parties participate. In such subchallenges, the honest party doesn’t care about the outcome (i.e., the subchallenge is irrelevant from the point of view of determining the correctness of any honest assertion). In this case, one adversarial assertion will win and the rest will be slashed. The best case for the adversary here is that they have an unrivaled irrelevant assertion, in which case they will get their bond back and break even.

However, note that this depends crucially on *not rewarding the bonded proposers on assertions beyond the amount needed to reimburse them.* In the presence of such rewards, the situation becomes more complicated, as we need to prevent the confirmation of even irrelevant assertions, since the adversary can actually make money by confirming such assertions. It should be possible to do this by requiring the “claim reimbursement” operation (in the on-chain code) to take a proof that the supplied edge being reimbursed can trace a path all the way up the tree back to an honest root assertion. However, this requires on-chain changes and would add complexity.

### More Details

Here are some more details on how the honest strategy should work. Terminology in this section follows the [BoLD whitepaper](https://arxiv.org/abs/2404.10491) (nodes, protocol graph, etc). We assume here that we are using explicit bottom-up timer updates moves (note: Research needs to review the precise logic used in the implementation for these moves)

In the paper, we defined an honest path as one that starts at the honest root, traverses only correctly constructed refinement nodes, and ends at a node either no children at all or a terminal node with only incorrectly constructed refinement nodes as children. We also defined the honest tree to be the tree obtained by combining all of these honest paths. This definition is a bit too broad for our purposes, as it can include nodes that were not added by the honest strategy. To deal with this, we recursively define the notion of an **essential** node (which is always either a root or a refinement node in the honest tree).  We say the honest root is essential.  We say a refinement node *w* in the honest tree is essential if it satisfies  the following property: 

- Let *`v`* be the parent of *w* in the honest tree, which is a terminal node
- Let *`u`* be the closest ancestor of *`v`* in the honest tree that is either a root or a refinement node
- Then *`u`* is essential and the weight of the path from *u* to *`v`* is less than *`T`*

The idea is that the honest party should never make a move that create non-essential refinement nodes, but if it does create an essential refinement node, it expects to be reimbursed for it.

With this definition, we can state precisely which nodes the honest party should defend. Namely, the honest party should issue a bisection, refine, or prove move on a node *v* provided:

- *`v`* is node in the honest tree with no children in the honest tree
- *`v`* is rivaled
- if *`u`* is the closest ancestor of *v* in the honest tree that is either a root or a refinement node, then
    - *`u`* is essential, and
    - the weight of the path from *`u`* to *`v`* is less than *`T`*

That completes the description of the honest strategy with regards to choosing which nodes to defend.  The honest party also needs to issue explicit bottom-up timer update moves. 

Let *v* be an essential node. Let us say a path *`P`* starting at *v* is **essential** if it traverses only essential refinement nodes and ends at a node either no children at all or a terminal node with only incorrectly constructed or non-essential refinement nodes as children. We say *`v`* is **confirmable** if all essential paths starting at *P* have weight at least *`T`*. Equivalently, we can define the **essential bottom-up timer** for *`v`* so that it takes that max only over essential refinement nodes. 

At the point in time when any essential node becomes confirmable, the honest party should immediately initiate issuing the required explicit bottom-up timer update moves so that the node will eventually be *explicitly* confirmed.

Note that the confirmation threshold *`T`* used to confirm essential refinement nodes must be the same as that used to confirm the root node.

**Variation 1.** Optionally, we can add moves to the protocol so that in order to actually trigger a reimbursement, a party must supply a path from the root to that node that only traverses *explicitly confirmed* refinement nodes. This will (mostly) prevent an adversary from getting reimbursed for bonds on irrelevant refinement nodes (i.e., nodes that do not rival essential refinement nodes). It is not clear if adding this feature adds any benefit from an economic-security perspective — certainly, we do not need to slash the bonds on such irrelevant refinement nodes to reimburse for gas, but we do need to be careful not to offer any rewards either. 

**Variation 2.** Note that even with this feature, it is still possible for an adversary to extend some essential paths to create refinement nodes at lower levels that are not correctly constructed (let alone essential). To prevent this, the L1 protocol would need to additionally compute path weights (which it can do, in principle) to *check that not only are all refinement nodes in the path explicitly confirmed, but essential*. 

Note that unlike explicit bottom-up timer update moves, these reimbursement requests can in principle be submitted at any time.

The above is an attempt to state as precisely as possible the logic that the honest strategy. It is not a suggested implementation. Such an implementation would likely have to be carefully designed with appropriate data structures. For example, for each node that is the tip in an honest path,  we may wish to track the weight of the path from each of that node’s essential ancestors (so in an *L* level bold, we need to track *L* such weights). We may also wish to maintain some kind of heap data structure for each essential node, so that we can quickly detect when it becomes confirmable.

***Watch out!*** As already stated, the above is meant to describe the complete logic of the honest strategy. It is important that this logic is strictly adhered to and that certain tempting “optimizations” are not implemented. For example, without reimbursement, all parties can stop defending nodes as soon as the root is explicitly confirmed. This obviously does not work any more in this regime. However, consider the following situation. There is a path from honest root to a level `L` terminal node `v`, which is rivaled, and this path has weight just below the threshold `T`. The honest strategy says to refine `v`, and some honest party may actually start to do this and submits a move to add an essential child `w` of `v`. However, before `w` is posted, the adversary might get a frenemy `w`’ of `w` posted, and with a little delay and/or luck, the honest root could get confirmed before w is posted. Naively, an honest party looking at this situation might think it is safe to “walk away” from the protocol, but it is not: `w` likely will eventually get posted (no way to stop it), and `w` should be defended to ensure the bond on `w` gets reimbursed.

The lesson is this: *when it comes to the decision of defending nodes, the honest strategy should take into account only the information in the protocol graph itself, and should not pay any attention to what nodes have or have not been explicitly confirmed.*


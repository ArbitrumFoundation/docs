---
id: bold-reimbursing-challenge-bonds
title: "Reimbursing challenge bonds in Arbitrum BoLD"
sidebar_label: Challenge bond reimbursements
description: A specification for how honest parties are reimbursed for challenge bonds by the Arbitrum Foundation for their active, honest participation in Arbitrum BoLD
dao_author: dlee
dao_sme: mMcGilvrayAlvarez
---

:::note
The details on this page pertain only to Arbitrum One, as it is the only Arbitrum DAO-owned chain with permissionless validation enabled using Arbitrum BoLD.
:::

## The problem

BoLD guarantees that, within a single challenge period, the correct top-level assertion will be confirmed (as long as there is at least one non-resource-exhausted honest party playing the game). By this point, the onchain code "knows" which top-level edge is correct and should be reimbursed. However, after the correct top-level assertion is confirmed, if challenge bonds were placed (i.e., when opening sub-challenges) during the protocol, the onchain code still does not "know" which challenge bonds correspond to honest assertions. Additional methods must be employed to determine which challenge bonds we should reimburse.

We have chosen an approach that allows us to refund challenge bonds "in-band," meaning in a trustless manner governed by the logic of the BoLD smart contracts. Doing this will require allowing challenges to continue, including after the honest top-level assertion receives confirmation, to enable parties to prove that their challenge bonds correspond to correct assertions.

:::note
This "in-band" refund does not change the fact that the top-level edge is guaranteed confirmation within a single challenge period. In other words, this adds a new phase of the BoLD challenge game that takes place after confirmation of a top-level edge:
*Reimbursement disputes* where parties continue (essentially) playing the challenge game to prove that their challenge bonds, rather than rival challenge bonds, should be reimbursed.
::: 

In this document, we outline a procedure for doing this. We followed this procedure when implementing bold reimbursements for in-band challenges in BoLD. Let's begin by assuming we have a version of BoLD (smart contracts and honest client implementation) that can correctly resolve and reimburse top-level assertion bonds. To implement in-band reimbursements for challenge bonds, we need to make some minor changes to the honest strategy to ensure that parties following the strategy can get reimbursed for their honest challenge bonds.

## What challenge bonds *should* be refunded?

Recall that BoLD, as deployed on Arbitrum One and Nova, is "multi-level". When making top-level assertions, the asserter only commits to the chain's state after each block, rather than committing to the state after each instruction (as this would be too expensive to compute). When bisecting a top-level assertion, the protocol can eventually reach a dispute over a single block. At this point, players are required in the dispute game to fill in the "missing" intermediate states that the chain passes through during block execution by creating a sub-challenge assertion. This construction of leaving out states that get filled in later, after further bisection iterations, allows us to split the block bisection game into multiple levels.

The asserter must post a *challenge bond* when creating a sub-challenge assertion. This challenge bond is necessary to deter specific resource exhaustion attacks, wherein an adversary creates many challenge assertions to overwhelm honest parties. We want to ensure that challenge bonds are returned only to parties that follow the honest strategy correctly.

Exactly which bonds are to be reimbursed is formalized in the definition of "essential" challenge edges (see below), but we give an intuition for it here.

- If a challenge assertion $C$ agrees with the winning top-level assertion, and needs to post to ensure the top-level assertion's victory, then we reimburse $C$'s bond (and say $C$ is *essential*).
- Recursively, if a challenge assertion $D$ needs to post to ensure the victory of another challenge assertion $C$, and $C$ is essential, then we reimburse $D$ (and also say that $D$ is necessary).

## A naive approach

First, let's consider a naive way to adjudicate reimbursement disputes at the cost of a larger-than-optimal time bound on how long reimbursement disputes can run. Then, we show how to improve this to get a more acceptable bound.

The idea here is simple. Let $L$ be the number of sub-challenge levels. Once the top-level (i.e., level $L$) assertion in a challenge is confirmed, we take all the outstanding sub-challenges of level $L-1$ and turn each into a top-level challenge of a new BoLD game (in which there are now $L-1$ levels). These new games run concurrently and don't inherit timers from the top-level challenge game. It's clear that (subject to the standard assumptions of BoLD) this approach works: for each sub-challenge, the correct edge will be confirmed (enabling reimbursement), and we can then apply this approach recursively to handle sub-challenges at level $L-2$, and so on.

:::note
There is a slight subtlety here, as we would also need to ensure that sub-challenges at level $L-2$ made in the initial level $L$ dispute game are included in the $L-2$ dispute game, along with sub-challenges at level $L-2$ that appeared during the $L-1$ reimbursement-dispute sub-challenges.
:::

This approach is wasteful because it treats each sub-challenge level as a new BoLD game. By doing so, we are giving the adversary an entirely new censorship budget for each game. This new budget would lead to a maximum delay (before all reimbursements get adjudicated) of $2\cdot{}T\cdot{}L$, where $L$ is the number of sub-challenge levels, and $T$ is the confirmation threshold.

## A better approach

Instead, we can treat a reimbursement dispute as a sub-game of BoLD, keeping the timers from the parent dispute. However, this setting differs from BoLD at the root level, as the honest party may "arrive late." For example, we have a two-level challenge, with two levels of bisection at the outer level ($L = 2$) and two levels of bisection at the inner level ($L = 1$). Suppose an adversary creates a dishonest top-level assertion $A'_2$ and immediately bisects down to create an assertion at level 1, $A'_1$, using $C_1$ censorship units. All of this happens before the honest party can do anything.

Now, it is *almost* the case that we can treat $A'_1$ the same as if it were a top-level assertion in a separate challenge game, with $A'_1$’s timer starting at the moment of creation. However, unlike in a top-level challenge game, the honest party cannot immediately submit a valid move to create $A_1$, an honest assertion that rivals $A'_1$ and stops its clock. The reason is that the honest party must first create an honest assertion $A_2$, and bisect it until it reaches a terminal node. *Only at this point* is the honest party in a position to create $A_1$; in that sense, at the creation time of $A'_1$, the honest party is "behind" where it would be if $A'_1$ were a top-level challenge edge, and will "arrive late."

How late will it arrive? In this case, the honest party will be able to create $A_1$ at time no later than $\delta \cdot{} 2 + C_1$ (that is, the amount of nominal delay to bisect down to the point of being able to create $A_1$, plus the amount of censorship consumed before creating $A'_1$). In general, if $C_i$ is the censorship consumed until the creation of the honest assertion rivaling the dishonest assertion at level $i$, and $D_i$ is the nominal delay required for the honest party to bisect down to level $i$ (starting from level $L$), the honest party will need to be allowed no less than $C_i + D_i$ to create a rival assertion at level $i$.

This insight allows us to preserve the timers generated during resolving the top-level (level-$L$) assertion during reimbursement disputes at level $L-1$. We can iterate this insight to enable us to (more generally) use timers built up in disputes of assertions at levels $j>i$ in disputes on assertions at level $i$. 

<!-- Mario: I think this bound may be looser than needed. I am not sure if we are actually taking full advantage of the fact that censorship can't be "reused" between levels. Also this explanation is still pretty handwavy. -->
The bottom line is that this reuse of timers can give us a better bound on the time it takes to resolve a reimbursement dispute at level $i$ (relative to the naive approach); namely, $T \cdot (L+1)$. This bound comes from the fact that we must wait at least $T$ regardless of whether there is a challenge. In the event of a challenge, we imagine all challenges at each level happening simultaneously, but challenges at level $i$ will need to account for the fact that the honest party "arrives late"; this means they will need to allow an extra $(L - i + 1) \cdot T$ to allow the honest party enough time to "arrive". Since we think of the challenges as happening simultaneously, the entire protocol ends when the last individual challenge ends. The latest this can happen is if the challenge at level 1 takes its maximum time; that is, $L \cdot T$. Adding this back into the $T$ that we need to allow regardless, gives us $T \cdot (L + 1)$.

### Honest strategy changes

For a BoLD challenge without reimbursement of mini-stakes, it would be sufficient for the honest strategy to stop defending an (honest) edge when the weight of its path to the top level (level-$L$) root assertion is at least $T$. To enable reimbursement, though, we need something more than this. In particular, for an edge *at the sub-challenge level $i$*, the honest party instead will need to keep defending an edge until the weight of that edge's path to the honest root assertion *at level $i$* is at least $T$.

The honest strategy will also have to change to continue playing (relevant) sub-challenges at level $i-1$ after confirmation of an assertion at level $i$. 

### Correctness

The correctness of this procedure depends on the idea that *it's OK to reimburse adversaries for bonds on irrelevant assertions*. This idea should be OK because there are two types of sub-challenges:

- Sub-challenges where honest parties participate. In such sub-challenges, honest parties will win so that no adversary will receive reimbursement.
- Sub-challenges where no honest parties participate. In such sub-challenges, the honest party doesn't care about the outcome (i.e., the sub-challenge is irrelevant in determining the correctness of any honest assertion). In this case, one adversarial assertion will win, and the remaining will get slashed. The best case for the adversary here is that they have an unrivaled irrelevant assertion, in which case, they will get their bond back and break even.

However, note that this depends on *not rewarding the bonded proposers on assertions beyond the amount needed to reimburse them.* In the presence of such rewards, the situation becomes more complicated, as we need to prevent the confirmation of even irrelevant assertions since the adversary can make money by confirming such assertions. It should be possible to do this by requiring the "claim reimbursement" operation (in the onchain code) to take a proof that the supplied edge reimbursement can trace a path up the tree back to an honest root assertion. However, this requires onchain changes and would add complexity; it is not included in the implementation (we do not envision giving extra rewards to players making challenge bonds, beyond the gas they spend and the bond itself).

### More details

Here are some more details on how the honest strategy should work. Terminology in this section follows the [BoLD whitepaper](https://arxiv.org/abs/2404.10491) (nodes, protocol graph, etc.). We assume here that we are using explicit bottom-up timer update moves. 

In the paper, we defined an honest path as one that starts at the honest root, traverses only correctly constructed refinement nodes, and ends at a node with no children or a terminal node with only incorrectly constructed refinement nodes as children. We also defined the honest tree as obtained by combining all these honest paths. This definition is too broad for our purposes, as it can include nodes not added by the honest strategy. To deal with this, we recursively define the notion of an **essential** node (always either a root or a refinement node in the honest tree). We say the honest root is essential. We say a refinement node $w$ in the honest tree is essential if it satisfies the following property: 

- Let $v$ be the parent of $w$ in the honest tree, which is a terminal node
- Let $u$ be the closest ancestor of $v$ in the honest tree that is either a root or a refinement node
- Then, if $u$ is essential and the weight of the path from $u$ to $v$ is less than $T$, we say that $w$ is essential

The idea is that the honest party should never make a move that creates non-essential refinement nodes, but if it does create an essential refinement node, it expects a reimbursement.

With this definition, we can state precisely which nodes the honest party should defend. Namely, the honest party should issue a bisection, refine, or prove move on a node $v$ provided *all* of the following hold:

- $v$ is a node in the honest tree with no children in the honest tree
- $v$ is rivaled
- If $u$ is the closest ancestor of $v$ in the honest tree that is either a root or a refinement node, then
    - $u$ is essential, and
    - the weight of the path from $u$ to $v$ is less than $T$

That completes the description of the honest strategy for choosing which nodes to defend. The honest party also needs to issue explicit bottom-up timer update moves. 

Let $v$ be an essential node. A path $P$ starting at $v$ is **essential** if it traverses only essential refinement nodes. It ends at a node with either no children or a terminal node with only incorrectly constructed or non-essential refinement nodes as children. We say $v$ is **confirmable** if all essential paths starting at $P$ have at least $T$ weight. We can define the **essential bottom-up timer** for $v$ to take that max only over essential refinement nodes. 

At the point in time when any essential node becomes confirmable, the honest party should immediately initiate issuing the required explicit bottom-up timer update moves so that the node will eventually be *explicitly* confirmed.

:::note		
The confirmation threshold $T$ used to confirm essential refinement nodes must be the same as that used to verify the root node.
:::

:::warning
As already stated, the intention above is to describe the complete logic of the honest strategy. The logic must be strictly followed to achieve this outcome. For example, without reimbursement, all parties can stop defending nodes once the root is explicitly confirmed. This optimization does not work anymore in this regime. 

For example, consider the following situation: there is a path from the honest root to a level $L$ terminal node $v$, which becomes disputed, and this path has weight just below the threshold $T$. The honest strategy says to refine $v$. Some honest parties may start to do this and submit a move to add an essential child $w$ of $v$, However, before $w$ posts, the adversary might get a frenemy $w$ of $w$ posted (a frenemy edge agrees with the honest edge at its start and end commitments, but disagrees on intermediate states), and with a little delay and/or luck, the honest root could get confirmed before $w$ posts. An honest party looking at this situation might think it is safe to "walk away" from the protocol. Still, it is not: $w$ will likely eventually get posted (there is no way to stop it), and $w$ should get defended to ensure the bond on $w$ gets reimbursed.

The lesson is this: *When deciding to defend nodes, the honest strategy should only consider the information in the protocol graph itself. It should ignore whether nodes have received explicit confirmation or not.*
:::


---
id: dao-comprehension-check
title: "Arbitrum DAO: Comprehension check"
sidebar_label: Comprehension check
description: Self-assess your understanding of the Arbitrum DAO and its governance mechanisms.
dao_author: symbolpunk
dao_sme: dzgoldman
---

import DraftExpectationsPartial from '@site/docs/partials/_draft-expectations-partial.md'; 

<DraftExpectationsPartial />

Review the following scenarios to test your comprehension of the different components of the Arbitrum DAO protocol, such as the Security Council, AIPs, on-chain and off-chain actions. By exercising your understanding of these scenarios, you'll be better equipped to confidently navigate the process, technology, and governance proposals that support the Arbitrum DAO.

### Scenario 1: You have an idea that you'd like to propose to the Arbitrum DAO

#### What's the first step you should take?

The first step is to submit the idea as an <a data-quicklook-from='arbitrum-improvement-proposal-aip'>Arbitrum Improvement Proposal (AIP)</a> on the public [Arbitrum DAO governance forum](https://forum.arbitrum.foundation/). This discussion should be accompanied by an informal temperature check poll using Snapshot. This poll will run for 1 week while the AIP is discussed/debated. You'll then perform a more formal temperature check on [Tally](https://tally.xyz/gov/arbitrum).

This procedure is referred to as the Temperature Check phase within the [Constitution](dao-constitution.md) and is technically optional, but it's strongly recommended as a due-diligence governance best practice. Although the process for submitting an AIP to the governance forum isn't explicitly outlined in the Constitution, the Constitution does specify that the DAO may approve and implement AIPs to change the rules governing the system. See [How to submit a DAO proposal](./how-tos/create-submit-dao-proposal) for more detailed instructions on how to submit an AIP.


### Scenario 2: A security emergency arises on one of the Arbitrum DAO-governed chains

#### How can the DAO respond to the security emergency?

The <a data-quicklook-from='security-council'>Security Council</a> is a committee of 12 democratically elected members who are signers of a multi-sig wallet. This committee is afforded by the Arbitrum DAO the power to perform <a data-quicklook-from='emergency-action'>emergency actions</a> and <a data-quicklook-from='nonemergency-action'>non-emergency actions</a>, as delegated to it by the Arbitrum DAO and The Arbitrum Foundation, and is responsible for upholding the [Constitution of the Arbitrum DAO](dao-constitution.md). 

In this scenario, the Security Council should handle the emergency immediately by either implementing the required software upgrade or performing whatever other mitigating action is required in order to remedy the situation on behalf of the DAO and its members. This type of Security Council action is known as an emergency action and requires a 9-of-12 approval from the Security Council to execute. 

The Security Council shouldn't use its power to perform emergency actions except in a true security emergency, such as a critical vulnerability that could significantly compromise the integrity, confidentiality, or availability of a chain governed by the Arbitrum DAO. After performing an emergency action, the Security Council must issue a full <a data-quicklook-from='transparency-report'>transparency report</a> to explain what was done and why the emergency action was justified. Notable details:

- The Arbitrum DAO is able to modify the Security Council's powers or to eliminate the Security Council entirely through the submission, approval and implementation of a <a data-quicklook-from='constitutional-aip'>Constitutional AIP</a>.
- The Arbitrum DAO is able to curtail or eliminate the Security Council's power to perform emergency actions via approval and implementation of a Constitutional AIP.
- The Security Council may also approve and implement routine software upgrades, routine maintenance and other parameter adjustments in a non-emergency setting (such actions are referred to as "non-emergency actions"), which require a 9-of-12 approval in order to take effect.
- Equivalent "copies" of the Security Council multi-sig contracts (9-of-12, in the case of non-emergency actions, and 9-of-12, in the case of emergency actions) exist, one on Ethereum and another on each Arbitrum DAO-governed chain.
- Any non-emergency action, after approval by the Security Council, will bypass Phases 1 to 3 of the AIP process and instead directly go through Phases 4 to 7 of the AIP process, to provide a delay before any non-emergency action is deployed. The Security Council may optionally specify additional delays before deployment.


### Scenario 3: You want to propose a change to the system parameters of one of the Arbitrum DAO-governed chains

#### What process should be followed to implement this change?

The process for proposing and implementing changes to system parameters is as follows:

1. Submit the proposal as an Arbitrum Improvement Proposal (AIP) on the public forum, which will be discussed and debated for 1 week (Temperature Check phase).
2. The AIP moves to a voting phase, where token holders can vote on the proposal.
3. If the proposal passes the vote, it moves to a delay period before implementation.
4. After the delay period, the change can be implemented by the chain owner(s) through a transaction on the blockchain.

Note that the Security Council may also approve and implement routine software upgrades, maintenance and other parameter adjustments in a non-emergency setting. This bypasses Phases 1 to 3 of the AIP process and goes directly through Phases 4 to 7. This is done to prevent routine upgrades and maintenance from being delayed or filibustered by the temperature check, voting, and delay phases of the AIP process.


### Scenario 4: You want to propose a change to the Constitution of the Arbitrum DAO

#### What process should be followed to implement this change?

The process for proposing and implementing changes to the Constitution is as described in the Constitution itself. It involves submitting the proposal as an AIP, and then going through the same voting and delay phases as any other proposal. The proposal must pass with a supermajority (see: [Constitution](dao-constitution.md)) of votable tokens being voted in favor of the change. Changes to the Constitution must also be ratified by the Security Council with a 9-of-12 approval in order to take effect.


### Scenario 5: You want to become a member of the Security Council

#### How can you become a member of the Security Council?

The Security Council has 12 members, who are divided into two cohorts of 6 members each. Every 6 months, an election occurs. Refer to the [Constitution](dao-constitution.md) for more details on the election process.

### Scenario 6: You want to upgrade the Arbitrum One chain

#### What process should be followed to execute this upgrade?

The process for upgrading the Arbitrum One chain involves submitting a proposal as an AIP and going through the same voting and delay phases as any other proposal. The proposal must pass with a supermajority (see: [Constitution](dao-constitution.md)) of votable tokens being voted in favor of the change. The upgrade must also be approved by the Security Council with a 9-of-12 approval in order to take effect. The chain owner(s) will then perform the upgrade by updating the contract implementation of any of Arbitrum's core protocol [Transparent Upgradeable Proxy contracts](https://developer.arbitrum.io/useful-addresses), and adjusting system parameters (for example: through `setter` methods in the [ArbOwner precompile](https://github.com/OffchainLabs/nitro/blob/master/contracts/src/precompiles/ArbOwner.sol)).

It's important to note that the upgrade should be thoroughly tested and reviewed by the community and experts in the field before being proposed and implemented. Any upgrade should also be compliant with the applicable laws, in particular sanctions-related regulations.


### Scenario 7: You want to create a new Arbitrum chain.

#### What do you need to do next?

It depends! If you want to create a new L3 chain, you can simply go ahead and deploy it. If you want to create a new L2 chain, you need to [submit a proposal](./how-tos/create-submit-dao-proposal) to have the chain approved & authorized the Arbitrum DAO. (See [New Chains](new-arb-chains.md).)


### Scenario 8: The Arbitrum DAO experiences a season of voter apathy.

#### Will this prevent work from being done on the chains that the Arbitrum DAO owns?

 No, voter apathy won't prevent work from being done on the chains that the Arbitrum DAO owns. The Constitution allows for <a data-quicklook-from='nonemergency-action'>non-emergency actions</a> to be taken, which don't require the approval of token holders. The Security Council has the power to perform emergency actions with a 9-of-12 approval, which can be used to address critical issues that cannot wait for voter approval. While voter participation is important for the proper functioning of the DAO, the Constitution has built-in mechanisms to ensure that work can continue to be done even in the event of low voter turnout.

Note that voter apathy could have an impact on the governance of the DAO, and certain decisions and actions might not be as representative of the community's collective will if voter turnout is low.


### Scenario 9: You've claimed $ARB tokens, but you don't have time to actively participate in Arbitrum DAO's governance.

#### What options do you have?

If you've claimed $ARB tokens but don't have time to actively participate in the Arbitrum DAO's governance, you have a few options:

1. You can delegate your tokens' voting power to another member of the community who you trust to make decisions that align with your interests. See [How to delegate your voting power](./how-tos/select-delegate-voting-power.md) for more information.
2. You can hold onto your $ARB tokens and vote when you have the time, but please note that some important decisions may have already been made.
3. You can sell or transfer your $ARB tokens to another member of the community who is more active.

While participating in governance is an important aspect of being a DAO member, it's not mandatory. As long as you hold $ARB tokens, you can participate in the Arbitrum DAO's governance protocol, but there aren't any consequences if you decide to not participate.


### Scenario 10: You want to propose a change to the way that unclaimed airdropped $ARB tokens are distributed

#### What's the process for proposing and implementing this change?

The process for proposing and implementing changes to the distribution of unclaimed airdropped $ARB tokens involves submitting a proposal as an AIP and going through the same voting and delay phases as any other proposal. The proposal must pass with a supermajority of votable tokens being voted in favor of the change. Additionally, the change must also be approved by the Security Council with a 9-of-12 approval in order to take effect. The distribution of unclaimed airdropped $ARB tokens should be thoroughly evaluated and reviewed by the community and experts in the field before being proposed and implemented.


### Scenario 11: A governance proposal passes that you voted against.

#### What options do you have?

If a governance proposal passes that you voted against, you have a few options:

 1. You can accept the outcome and continue to participate in the DAO. 
 2. You can engage in further discussions and debates on the community forum to express your dissenting opinion and try to sway others to your point of view. 
 3. You can propose a new AIP that addresses the issues you have with the proposal that passed and try to get it passed through the voting process. 
 4. You can choose to disengage from the DAO altogether and sell your votable tokens before the proposal takes effect. This is facilitated by the time delay between the proposal passing and the proposal taking effect.


### Conclusion

This comprehension check has been provided as an optional study aid that token holders and prospective delegates are encouraged to periodically review, share, and build upon. If you have any questions or concerns, visit the [Arbitrum DAO governance forum](https://forum.arbitrum.foundation/) or [Discord](https://www.discord.gg/arbitrum).

---
id: public-preview-content
title: Public preview content
sidebar_label: Public preview content
description: Learn about the public preview content pattern used by the ArbitrumDAO.
dao_author: symbolpunk
dao_sme: symbolpunk
---
import DraftExpectationsPartial from '@site/docs/partials/_draft-expectations-partial.md'; 

Every ArbitrumDAO governance document (excluding the [Constitution](../dao-constitution)) is initially published with the following "public preview" disclaimer:

<DraftExpectationsPartial />

This disclaimer is used to **set expectations** and to **invite feedback** from readers like you. Whenever there's evidence that a given document is meeting readers' needs, its public preview disclaimer is lifted. When a document's public preview disclaimer is lifted, it's considered "validated", but it's still subject to change based on reader feedback.

### What types of documents does this apply to?

This pattern applies to all ArbitrumDAO governance documents that are published here on the ArbitrumDAO docs portal, excluding [The Constitution of the ArbitrumDAO](../dao-constitution.md). Examples include:

* Conceptual documentation

  * [Delegates and delegation](./delegate-delegation.md)
  * [Lifecycle and anatomy of an AIP](./lifecycle-anatomy-aip-proposal.md)
* How-to documentation

  * [Apply to become a delegate](../how-tos/apply-become-delegate.md)
  * [Submit an AIP](../how-tos/create-submit-dao-proposal.md)

### How do you know when a public preview document is ready to have its disclaimer lifted?

In general, a document is considered validated if it's 1) frequently viewed, 2) has a low bounce rate, and 3) doesn't have any open issues on GitHub/[Discord](https://discord.gg/arbitrum). This heuristic isn't supported by precise thresholds; it's an informal and experimental process. This document will be updated if the process changes.

### Does this mechanism apply to The Constitution of the ArbitrumDAO?

No. The private preview content pattern does **not** apply to [The Constitution of the ArbitrumDAO](../dao-constitution.md).

### What's the difference between a draft and a public preview?

Readers generally interpret drafts as "not ready for public consumption". ArbitrumDAO's public preview documentation is ready for public consumption with the caveat that it still needs to be measured, validated, and optimized.

### Does this mean that the ArbitrumDAO isn't committed to its governance documentation?

No. The ArbitrumDAO is committed to its governance docs, just not in exactly the same way that it's committed to the Constitution:

* **The Constitution** is the ArbitrumDAO's highest-order governance document. It's the only document that's subject to the formal governance proposal mechanism. In order for the Constitution to change, a proposal must be submitted to the ArbitrumDAO and approved by a majority of the ArbitrumDAO's voting power. This is a formal process that only the ArbitrumDAO can initiate and execute.
* **Other governance documents** are derived from a combination of 1) the Constitution and 2) reader feedback. These docs frequently change via traditional pull requests issued against the governance docs repository. This is an informal, continuous, iterative process that anyone can participate in.

### Is the governance protocol itself in public preview?

No. This disclaimer applies only to the documents that display it. It doesn't apply to the protocol; it doesn't apply to the Constitution; it doesn't apply to the smart contracts; it doesn't apply to the DAO. The ArbitrumDAO's governance protocol is in production. Some of the ArbitrumDAO's governance documentation is in public preview; those docs are marked with the same `PUBLIC PREVIEW DOCUMENT` disclaimer that you see at the top of this page.

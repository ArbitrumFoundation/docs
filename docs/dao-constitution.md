---
id: dao-constitution
title: The Amended Constitution of the Arbitrum DAO
sidebar_label: The Constitution of the Arbitrum DAO
description: Read "The Constitution of the Arbitrum DAO", the ultimate governing document of the Arbitrum DAO. Arbitrum DAO's smart contracts implement the protocols described in this document.
---

import ConstitutionPartial from '@site/docs/partials/_constitution-content-partial.md';
import { ConstitutionHash  } from '@site/src/components/ConstitutionHash'
import { PendingConstitutionNotice  } from '@site/src/components/PendingConstitutionNotice'


<PendingConstitutionNotice/>
<div id='constitution'>
<ConstitutionPartial/>
</div>


### Constitution hash

<code><b><ConstitutionHash/></b></code>

<br/><br/>

To compute this hash yourself, you can clone [ArbitrumFoundation/docs](https://github.com/ArbitrumFoundation/docs) to your local machine and run `yarn update-constitution-hash` from the root directory of the repo. Alternatively, you can install [Node.js](https://nodejs.org/en/), navigate to the `docs` folder, and run `node ./scripts/updateConstitutionHash.js`.

This will use the `keccak256` method from the [@ethersproject/solidity](https://github.com/ethers-io/ethers.js#readme) project to compute the hash of the Constitution's markdown source code, located in [`/ArbitrumFoundation/docs/blob/main/docs/partials/_constitution-content-partial.md`](https://github.com/ArbitrumFoundation/docs/blob/main/docs/partials/_constitution-content-partial.md).


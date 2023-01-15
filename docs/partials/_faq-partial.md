<h3 class="faq-section-title">Airdrop</h3>
<dl class="definition-list">
<dt data-displayed-on='dao-glossary'>Am I eligible for the airdrop?</dt>
<dd data-displayed-on='dao-glossary'>As of the date of this publication, airdrop criteria, recipients, and amounts have been finalized and will in no way be altered prior to airdrop, with the exception of removing any further sybil accounts discovered. You can check the details here (link to landing page). You can check the official eligibility requirements here (link to token landing page), we know that not everyone that has used Arbitrum will be eligible to claim their share in governance, and it wasn't an easy decision to make considering the number of Sybils that were present. Nonetheless, it was determined to be the best balance we found between the number of active users and share in governance.</dd>
<dt data-displayed-on='dao-glossary'>Will there be multiple airdrops?</dt>
<dd data-displayed-on='dao-glossary'>No, this will be the only airdrop.</dd>
</dl>
<h3 class="faq-section-title">Governance architecture</h3>
<dl class="definition-list">
<dt data-displayed-on='dao-glossary'>[Demo] Where can I find the smart contracts that power Arbitrum DAO's governance mechanisms?</dt>
<dd data-displayed-on='dao-glossary'><p>Candidate target output schema:</p>

<p></p>

```html
<!-- pulled from getAllFAQs().groupBy(s => s["FAQ section"]).forEach(s => { s.key }) --><br />
<h3 class="faq-section-title">Governance smart contracts</h3><br />
<br />
<dl class="definition-list"><br />
	<!-- keys pulled from ["Target document slugs"] --><br />
  <dt data-displayed-on='dao-glossary,gentle-intro-arbitrum-dao'>Where can I find the smart contracts that power Arbitrum DAO's governance mechanisms?</dt><br />
  <!-- content pulled from page body --><br />
  <dd>Candidate target output schema: [...] Glossary path?</dd><br />
</dl><br />
<!-- see below for details / rationale -->
```
<p></p>

<p></p>

<ul><li>Envisioning this HTML being generated into <code>_faq.md</code>, and then we can follow the glossary CMS pattern of embedding this partial into all docs, & hiding everything irrelevant. </li>
<li>differences between this & glossary CMS:<ul><li>some of the embedded FAQs would be visible on some of the pages (glossary hides all, depending on Quicklooks widget to consume & reveal).</li>
<li>grouping & ordering</li>
<li>pulling <code>dd</code> content from page body instead of page property<ul><li>FAQ answers tend to contain more structure & media than glossary definitions, will need to figure out<ul><li>how to convert Notion page body into HTML (we could get this for free via notion API response…) &</li>
<li>how to handle media (eventually)…</li></ul>

</li></ul>

</li></ul>

</li>
<li>pattern allows the script to reflect on page slug and hide all FAQs that don't have the slug within <code>data-displayed-on</code></li>
<li>this makes it ez for some of the more context-specific FAQs to be visible on interior pages (how-tos etc), but not visible in root page</li>
<li>for now, FAQ authors can assume that "sections" are only displayed on root faq, can use CSS to hide section HTML from other interior pages</li>
<li>considerations that come to mind:<ul><li>rename <code>Quicklooks</code> component into <code>InjectContentFromNotion</code> & parameterize, so github action passes parameters to determine which code flow to use?<ul><li>Might want to keep the column definitions in the script for now, so if we update Notion schema, don't need Github action permissions to reconcile</li>
<li>So the only parameter is to choose between FAQ path and Glossary path?</li></ul>

</li>
</ul>
<p></p>

</li>
</ul>
<p></p>

</dd>
</dl>
<h3 class="faq-section-title">Delegation</h3>
<dl class="definition-list">
<dt data-displayed-on='dao-glossary'>Can delegates submit themselves for elections? How does this work under the hood?</dt>
<dd data-displayed-on='dao-glossary'><p>delegate that wants to submit themselves for election - this is controlled by a governor contract? unclear right now - would have to be voted on, not security council, doesn't fit within normal governor etc etc.</p>

<p></p>

</dd>
</dl>

<!--todo: https://developers.google.com/search/docs/appearance/structured-data/faqpage -->
<!--we're using HTML here to make it easy to filter for specific FAQs using topic tags. We could break this up into multiple partials of pure-markdown FAQs grouped by topic and selectively embed those partials, but because we end up using HTML anyways to handle advanced formatting, quicklooks, footnotes, etc, this seems like a sensible way to start.-->
<!--we can easily make these questions linkable too - we'll handle that as the core content stabilizes -->
<!--an example of using topic tags is below - imagine stashing these FAQs in the FAQs app in Content OS, and then using a small piece of code to build this HTML for us. This would let you (& Mehdi / Mahsa) maintain our FAQs using Notion as a single-source-of-truth CMS, without having to think about git/markdown - this makes that possible. -->
<!--why are we using definition lists? 1) it feels more semantically appropriate when compared to the alternatives 2) it makes it easy to format FAQ & Glossary using the same CSS 3) it lets us reuse some of the Notion -> GitHub code that we use for the Glossary -->


### Section title

<dl class="definition-list">
  <dt>Question 1?</dt>
  <dd data-topics="foo,bar">Answer 1.</dd>
  
  <dt>Question 2?</dt>
  <dd>Answer 2.</dd>
  
  <dt>Question 3?</dt>
  <dd>Answer 3.</dd>
</dl>

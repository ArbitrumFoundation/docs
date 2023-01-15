import { lookupProject, lookupProjectFAQ, lookupProjectDefinitions } from './notion'
import type { Definition, FAQ, PageObjectProperty } from './notion'
import { stripCurlyQuotes, renderBlocks, renderRichTexts, formatGlossaryTermKey } from './format'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import fs from 'fs'

function renderDefinition(definition: PageObjectProperty): string {
  if (definition.type != 'rich_text') {
    throw new Error('Expected definition')
  }
  return renderRichTexts(definition.rich_text)
}

function formatDefinitions(definitions: Definition[]) {
  // sort the array alphabetically by term
  definitions.sort((a, b) => a.term.localeCompare(b.term))

  const htmlArray = definitions.map(item => {
    // strip curlies
    const curliesStripped = stripCurlyQuotes(item.term);
    // remove all non-alphanumeric, non-space, and non-parentheses characters except for "$" and "-" from term
    const formattedTerm = curliesStripped.replace(/[^a-z0-9\s$-()-]/gi, '');
    // remove all non-alphanumeric and non-space characters, convert to lowercase, and replace spaces with hyphens
    // replace all attribute values surrounded by single quotes with double quotes
    const dashDelimitedTermKey = formatGlossaryTermKey(item.term)
    const definition = renderDefinition(item.definition)
    return `### ${formattedTerm} {#${dashDelimitedTermKey}}\n${definition}\n\n`
  })

  // wrap the HTML strings in a <dl> element with a class of "hidden-glossary-list"
  return `<div class="hidden-glossary">\n\n${htmlArray.join('')}\n</div>\n`
}

function organizeFAQ(questions: FAQ[]): Record<string, FAQ[]> {
  let sections: Record<string, FAQ[]> = {}
  for (let question of questions) {
    if (!sections[question.section]) {
      sections[question.section] = []
    }
    sections[question.section].push(question)
  }
  for (let section in sections) {
    sections[section].sort((question1, question2): number => question1.order - question2.order)
  }
  return sections
}

function renderFAQ(faq: FAQ): string {
  let {question, answer} = faq
  if (faq.blocks.length > 0) {
    answer = renderBlocks(faq.blocks)
  }
  let out = ''
  out += `<dt data-displayed-on='dao-glossary'>${stripCurlyQuotes(question)}</dt>\n`
  out += `<dd data-displayed-on='dao-glossary'>${stripCurlyQuotes(answer)}</dd>\n`
  return out
}

function renderFAQs(faqs: FAQ[]): string {
  return`<dl class="definition-list">\n${faqs.map(renderFAQ).join('')}</dl>\n`
}

function renderSections(sections: Record<string, FAQ[]>): string {
  let out = ''
  for (let section in sections) {
      out += `<h3 class="faq-section-title">${stripCurlyQuotes(section)}</h3>\n`
      out += renderFAQs(sections[section])
  }
  return out
}

async function main() {
  const governanceProject = await lookupProject('Governance docs')

  const faqs = await lookupProjectFAQ(governanceProject)
  const sections = organizeFAQ(faqs)
  const sectionsHTML = renderSections(sections)

  const definitions = await lookupProjectDefinitions(governanceProject)
  const definitionsHTML = formatDefinitions(definitions)

  fs.writeFileSync('../docs/partials/_glossary-partial.md', definitionsHTML)
  fs.writeFileSync('../docs/partials/_faq-partial.md', sectionsHTML)
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })

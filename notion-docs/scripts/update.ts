import { lookupProject, lookupProjectFAQ, lookupProjectDefinitions } from './notion'
import type { Definition, FAQ, PageObjectProperty } from './notion'
import type { LinkableTerms } from './format'
import { stripCurlyQuotes, renderBlocks, renderRichTexts, formatGlossaryTermKey, validDefinitionToPublish, DefinitionValidity } from './format'
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import fs from 'fs'

interface RenderedDefinition {
  term: string
  definition: string
  key: string
}

function renderDefinition(def: Definition, linkableTerms: LinkableTerms): RenderedDefinition {
  const term = renderRichTexts(def.term, linkableTerms)
  // remove all non-alphanumeric, non-space, and non-parentheses characters except for "$" and "-" from term
  const formattedTerm = term.replace(/[^a-z0-9\s$-()-]/gi, '');
  // remove all non-alphanumeric and non-space characters, convert to lowercase, and replace spaces with hyphens
  // replace all attribute values surrounded by single quotes with double quotes
  const dashDelimitedTermKey = formatGlossaryTermKey(def.term, linkableTerms)

  let renderedDef = renderBlocks(def.blocks, linkableTerms)
  if (renderedDef.length == 0) {
    renderedDef = renderRichTexts(def.definition, linkableTerms)
  }
  return {
    term: formattedTerm,
    definition: renderedDef,
    key: dashDelimitedTermKey,
  }
}

function formatDefinitions(definitions: Definition[], linkableTerms: LinkableTerms) {
  const renderedDefs = definitions.map(def => renderDefinition(def, linkableTerms))
  // sort the array alphabetically by term
  renderedDefs.sort((a, b) => a.term.localeCompare(b.term))

  const htmlArray = renderedDefs.map(item => {
    return `### ${item.term} {#${item.key}}\n${item.definition}\n\n`
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

function renderFAQ(faq: FAQ, linkableTerms: LinkableTerms): string {
  let {question, answer} = faq
  let renderedAnswer = renderBlocks(faq.blocks, linkableTerms)
  if (renderedAnswer.length == 0) {
    renderedAnswer = renderRichTexts(answer, linkableTerms)
  }
  return `### ${question}\n${renderedAnswer}\n\n`
}

function renderSections(sections: Record<string, FAQ[]>, linkableTerms: LinkableTerms): string {
  let out = ''
  for (let section in sections) {
      out += `## ${stripCurlyQuotes(section)}\n\n`
      out += sections[section].map(faq => renderFAQ(faq, linkableTerms)).join('')
  }
  return out
}

async function main() {
  const governanceProject = await lookupProject('Governance docs')
  console.log("Looking up FAQs")
  const faqs = await lookupProjectFAQ(governanceProject)
  console.log("Looking up Glossary")
  let definitions = await lookupProjectDefinitions(governanceProject)
  console.log("Rendering contents")
  const linkableTerms: LinkableTerms = {}
  for (let definition of definitions) {
    linkableTerms[definition.pageId] = {
      text: renderRichTexts(definition.term, linkableTerms),
      anchor: formatGlossaryTermKey(definition.term, linkableTerms),
      page: '/dao-glossary',
      valid: validDefinitionToPublish(definition, governanceProject),
      notionURL: definition.url,
    }
  }
  const sections = organizeFAQ(faqs)
  const sectionsHTML = renderSections(sections, linkableTerms)
  const publishedDefinitions = definitions.filter(def => validDefinitionToPublish(def, governanceProject) == DefinitionValidity.Valid)
  const definitionsHTML = formatDefinitions(publishedDefinitions, linkableTerms)
  fs.writeFileSync('../docs/partials/_glossary-partial.md', definitionsHTML)
  fs.writeFileSync('../docs/partials/_faq-partial.md', sectionsHTML)
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exitCode = 1
  })

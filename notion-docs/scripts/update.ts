import type { LinkableTerms } from './format'

import { lookupProject } from './notion'
import { renderRichTexts, validDefinitionToPublish, DefinitionValidity } from './format'
import { formatGlossaryTermKey, lookupGlossaryTerms, renderDefinition } from './glossary'
import { lookupProjectFAQ, organizeFAQ, renderFAQ } from './faq'

import type { FAQ } from './faq'
import type { Definition } from './glossary'

import fs from 'fs'

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

function renderSections(sections: Record<string, FAQ[]>, linkableTerms: LinkableTerms): string {
  let out = ''
  for (let section in sections) {
      out += `## ${section}\n\n`
      out += sections[section]
        .map(faq => renderFAQ(faq, linkableTerms))
        .map(faq => {
          return `### ${faq.question}\n${faq.answer}\n\n`
        }).join('')
  }
  return out
}

async function main() {
  const governanceProject = await lookupProject('Governance docs')
  console.log("Looking up FAQs")
  const faqs = await lookupProjectFAQ(governanceProject)
  console.log("Looking up Glossary")
  let definitions = await lookupGlossaryTerms()
  console.log("Rendering contents")
  const linkableTerms: LinkableTerms = {}
  for (let definition of definitions) {
    linkableTerms[definition.pageId] = {
      text: renderRichTexts(definition.term, linkableTerms),
      anchor: formatGlossaryTermKey(definition.term),
      page: '/dao-glossary',
      valid: validDefinitionToPublish(definition, governanceProject),
      notionURL: definition.url,
    }
  }
  const sections = organizeFAQ(faqs)
  const sectionsHTML = renderSections(sections, linkableTerms)
  const publishedDefinitions = definitions.filter(def => {
    return validDefinitionToPublish(def, governanceProject) == DefinitionValidity.Valid
  })
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

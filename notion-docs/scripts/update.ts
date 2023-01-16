import { Client } from '@notionhq/client'
import { lookupProject } from './project'
import { lookupGlossaryTerms, renderDefinition } from './glossary'
import { lookupFAQs, organizeFAQ, renderFAQ } from './faq'
import { renderRichTexts, formatAnchor, DefinitionValidity } from './format'
import dotenv from 'dotenv'

import type { FAQ } from './faq'
import type { Definition } from './glossary'
import type { LinkableTerms } from './format'

import fs from 'fs'

dotenv.config()

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

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

export function validDefinitionToPublish(def: Definition, project: string): DefinitionValidity {
  if (def.status != '4 - Continuously publishing' && def.status != '2 - Pending peer review') {
    return DefinitionValidity.NotReady
  }
  if (def.publishable != 'Publishable') {
    return DefinitionValidity.NotPublishable
  }
  if (!def.projects.has(project)) {
    return DefinitionValidity.WrongProject
  }
  return DefinitionValidity.Valid
}

async function main() {
  const governanceProject = await lookupProject(notion, 'Governance docs')
  console.log("Looking up FAQs")
  const faqs = await lookupFAQs(notion, {
    filter: {
      and: [
        {
          property: 'Project(s)',
          relation: {
            contains: governanceProject,
          },
        },
        {
          property: 'Status',
          status: {
            does_not_equal: '1 - Drafting',
          },
        },
        {
          property: 'Publishable?',
          select: {
            equals: 'Publishable',
          },
        },
      ],
    },
  })
  console.log("Looking up Glossary")
  let definitions = await lookupGlossaryTerms(notion, {})
  console.log("Rendering contents")
  const linkableTerms: LinkableTerms = {}
  for (let definition of definitions) {
    linkableTerms[definition.pageId] = {
      text: renderRichTexts(definition.term, {}),
      anchor: formatAnchor(definition.term),
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

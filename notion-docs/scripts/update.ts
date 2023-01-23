import { Client } from '@notionhq/client'
import {
  lookupProject,
  lookupGlossaryTerms,
  lookupFAQs,
  organizeFAQ,
  DefinitionValidity,
  renderKnowledgeItem,
  handleRenderError,
  knowledgeItemValidity,
} from '../src'
import dotenv from 'dotenv'

import type {
  FAQ,
  Definition,
  KnowledgeItem,
  LinkableTerms,
  RenderedKnowledgeItem,
} from '../src'

import fs from 'fs'

dotenv.config()

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

function printItem(item: RenderedKnowledgeItem): string {
  return `### ${item.title} {#${item.key}}\n${item.text}\n\n`
}

function formatDefinitions(
  definitions: Definition[],
  linkableTerms: LinkableTerms
) {
  const renderedDefs = definitions.map(def =>
    renderKnowledgeItem(def, linkableTerms)
  )
  // sort the array alphabetically by term
  renderedDefs.sort((a, b) => a.title.localeCompare(b.title))

  const htmlArray = renderedDefs.map(printItem)

  // wrap the HTML strings in a <dl> element with a class of "hidden-glossary-list"
  return `<div class="hidden-glossary">\n\n${htmlArray.join('')}\n</div>\n`
}

function renderSections(
  sections: Record<string, FAQ[]>,
  linkableTerms: LinkableTerms
): string {
  let out = ''
  for (const section in sections) {
    out += `## ${section}\n\n`
    out += sections[section]
      .map(faq => renderKnowledgeItem(faq, linkableTerms))
      .map(printItem)
      .join('')
  }
  return out
}

async function generateFiles() {
  const governanceProject = await lookupProject(notion, 'Governance docs')
  console.log('Looking up FAQs')
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
          property: 'Publishable?',
          select: {
            equals: 'Publishable',
          },
        },
      ],
    },
  })
  console.log('Looking up Glossary')
  const definitions = await lookupGlossaryTerms(notion, {})
  console.log('Rendering contents')
  const linkableTerms: LinkableTerms = {}
  const addItems = (items: KnowledgeItem[], page: string) => {
    for (const item of items) {
      linkableTerms[item.pageId] = {
        text: item.title,
        anchor: item.title,
        page: page,
        valid: knowledgeItemValidity(item, governanceProject),
        notionURL: item.url,
      }
    }
  }
  const isValid = (item: KnowledgeItem) => {
    return (
      knowledgeItemValidity(item, governanceProject) ==
      DefinitionValidity.Valid
    )
  }

  addItems(definitions, '/dao-glossary')
  addItems(faqs, '/dao-faq')
  const publishedFAQs = faqs.filter(isValid)
  const publishedDefinitions = definitions.filter(isValid)
  const sections = organizeFAQ(publishedFAQs)
  const sectionsHTML = renderSections(sections, linkableTerms)
  const definitionsHTML = formatDefinitions(publishedDefinitions, linkableTerms)
  fs.writeFileSync('../docs/partials/_glossary-partial.md', definitionsHTML)
  fs.writeFileSync('../docs/partials/_faq-partial.md', sectionsHTML)
}

async function main() {
  try {
    await generateFiles()
  } catch (e: unknown) {
    if (await handleRenderError(e, notion)) {
      process.exit(1)
    }
    throw e
  }
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })

import { Client } from '@notionhq/client'
import {
  lookupProject,
  lookupGlossaryTerms,
  lookupFAQs,
  handleRenderError,
  recordValidity,
  renderGlossary,
  renderGlossaryJSON,
  renderFAQs,
} from '@offchainlabs/notion-docs-generator'
import dotenv from 'dotenv'

import type { KnowledgeItem, LinkableTerms, LinkValidity } from '@offchainlabs/notion-docs-generator'

import fs from 'fs'

dotenv.config()

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

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
  const validity = (item: KnowledgeItem): LinkValidity => {
    return recordValidity(item, governanceProject)
  }
  const addItems = (items: KnowledgeItem[], page: string) => {
    for (const item of items) {
      linkableTerms[item.pageId] = {
        text: item.title,
        anchor: item.title,
        page: page,
        valid: validity(item),
        notionURL: item.url,
      }
    }
  }
  const isValid = (item: KnowledgeItem) => {
    return validity(item) == 'Valid'
  }

  addItems(definitions, '/dao-glossary')
  addItems(faqs, '/dao-faq')
  const publishedFAQs = faqs.filter(isValid)
  const publishedDefinitions = definitions.filter(isValid)
  const definitionsHTML = `\n\n${renderGlossary(
    publishedDefinitions,
    linkableTerms
  )}\n`
  const glossaryJSON = renderGlossaryJSON(publishedDefinitions, linkableTerms)
  fs.writeFileSync('../docs/partials/_glossary-partial.md', definitionsHTML)
  fs.writeFileSync('../static/glossary.json', glossaryJSON)
  fs.writeFileSync(
    '../docs/partials/_faq-partial.md',
    renderFAQs(publishedFAQs, linkableTerms)
  )
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

import { Client } from '@notionhq/client'
import {
  lookupProject,
  lookupGlossaryTerms,
  lookupFAQs,
  handleRenderError,
  knowledgeItemValidity,
  renderGlossary,
  renderFAQs,
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
  const isValid = (item: KnowledgeItem): LinkValidity => {
    return knowledgeItemValidity(item, governanceProject)
  }
  const addItems = (items: KnowledgeItem[], page: string) => {
    for (const item of items) {
      linkableTerms[item.pageId] = {
        text: item.title,
        anchor: item.title,
        page: page,
        valid: isValid(item),
        notionURL: item.url,
      }
    }
  }
  const isValid = (item: KnowledgeItem) => {
    return (
      isValid(item) ==
      'Valid'
    )
  }

  addItems(definitions, '/dao-glossary')
  addItems(faqs, '/dao-faq')
  const publishedFAQs = faqs.filter(isValid)
  const publishedDefinitions = definitions.filter(isValid)
  const definitionsHTML = `<div class="hidden-glossary">\n\n${renderGlossary(publishedDefinitions, linkableTerms)}\n</div>\n`
  fs.writeFileSync('../docs/partials/_glossary-partial.md', definitionsHTML)
  fs.writeFileSync('../docs/partials/_faq-partial.md', renderFAQs(publishedFAQs, linkableTerms))
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

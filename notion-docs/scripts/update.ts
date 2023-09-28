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
  FAQ,
} from '@offchainlabs/notion-docs-generator'
import dotenv from 'dotenv'

import type {
  KnowledgeItem,
  LinkableTerms,
  LinkValidity,
} from '@offchainlabs/notion-docs-generator'

import fs from 'fs'

dotenv.config()

const RETRY_TIME_SECONDS = 15
const SLEEP_TIME_SECONDS = 3

const tryLookupFaqs = async (
  notion: Client,
  query: any,
  retries = 3
): Promise<FAQ[]> => {
  try {
    return await lookupFAQs(notion, query)
  } catch (err: any) {
    if (err.status === 502) {
      console.log('502 FAQ error')
      const retriesLeft = retries - 1
      if (retriesLeft <= 0)
        throw new Error('Error looking up FAQs: no more retries')
      console.log(
        `Waiting ${RETRY_TIME_SECONDS} seconds and retrying; ${retriesLeft} retries left`
      )
      await sleep(RETRY_TIME_SECONDS * 1000)
      console.log('Retrying:')
      return tryLookupFaqs(notion, query, retriesLeft)
    }
    throw err
  }
}

const tryLookupGlossary = async (
  notion: Client,
  query: any,
  retries = 3
): Promise<KnowledgeItem[]> => {
  try {
    return await lookupGlossaryTerms(notion, query)
  } catch (err: any) {
    if (err.status === 502) {
      console.log('502 Glossary error')
      const retriesLeft = retries - 1
      if (retriesLeft <= 0)
        throw new Error('Error looking up Glossary: no more retries')
      console.log(
        `Waiting ${RETRY_TIME_SECONDS} seconds and retrying; ${retriesLeft} retries left`
      )
      await sleep(RETRY_TIME_SECONDS * 1000)
      console.log('Retrying:')
      return tryLookupGlossary(notion, query, retriesLeft)
    }
    throw err
  }
}
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})
const sleep = (delay: number) =>
  new Promise(resolve => setTimeout(resolve, delay))

async function generateFiles() {
  console.log('Looking up project')
  const governanceProject = await lookupProject(notion, 'Governance docs')
  await sleep(SLEEP_TIME_SECONDS * 1000)
  console.log('Looking up FAQs')
  const faqs = await tryLookupFaqs(notion, {
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

  await sleep(SLEEP_TIME_SECONDS * 1000)
  console.log('Looking up Glossary')
  const definitions = await tryLookupGlossary(notion, {
    filter: {
      property: 'Publishable?',
      select: {
        equals: 'Publishable',
      },
    },
  })

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

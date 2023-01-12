import dotenv from 'dotenv'

import { Client, isFullPage, isFullBlock } from '@notionhq/client'
import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'

dotenv.config()

const projectDatabaseId = 'f96a33aa166046d1b323a553344e5ac4'
const glossaryDatabaseId = '3bad2594574f476f917d8080a6ec5ce7'
const faqDatabaseId = 'a8a9af20f33d4cc1b32bbd2be8459733'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export interface Definition {
  term: string
  definition: string
}

export interface FAQ {
  section: string
  question: string
  answer: string
  order: number
}

export async function lookupProject(name: string): Promise<string> {
  const fullOrPartialPages = await notion.databases.query({
    database_id: projectDatabaseId,
    filter: {
      property: 'Project name',
      rich_text: {
        equals: name,
      },
    },
  })

  for (const page of fullOrPartialPages.results) {
    return page.id
  }
  throw new Error('Project not found')
}

export async function lookupProjectDefinitions(
  projectId: string
): Promise<Definition[]> {
  const fullOrPartialPages = await notion.databases.query({
    database_id: glossaryDatabaseId,
    filter: {
      and: [
        {
          property: 'Project(s)',
          relation: {
            contains: projectId,
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
  const results = fullOrPartialPages.results
  const definitions: Definition[] = []
  for (const page of results) {
    if (!isFullPage(page)) {
      throw new Error('Found non-full page')
      continue
    }

    const title = page.properties['Term']
    if (title.type != 'title') {
      throw new Error('Expected title')
    }

    const definition = page.properties['Definition (HTML)']
    if (definition.type != 'rich_text') {
      throw new Error('Expected definition')
    }
    definitions.push({
      term: title.title[0].plain_text,
      definition: definition.rich_text[0].plain_text,
    })
  }
  return definitions
}

function renderRichText(texts: RichTextItemResponse[]): string {
  let out = '<p>'
  for (let text of texts) {
    if (text.type != 'text') {
      throw new Error('unsupported rich text type')
    }
    if (text.text.link) {
      out += ` <a href='${text.text.link.url}'>${text.text.content}</a> `
    } else {
      out += text.text.content.replace('\n', '</p><p>')
    }
  }
  out += '</p>'
  return out
}

export async function lookupProjectFAQ(
  projectId: string
): Promise<FAQ[]> {
  const fullOrPartialPages = await notion.databases.query({
    database_id: faqDatabaseId,
    filter: {
      and: [
        {
          property: 'Project(s)',
          relation: {
            contains: projectId,
          },
        },
        {
          property: 'Status',
          status: {
            equals: '4 - Continuously publishing',
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
  const results = fullOrPartialPages.results
  const faqs: FAQ[] = []
  for (const page of results) {
    if (!isFullPage(page)) {
      throw new Error('Found non-full page')
      continue
    }

    const question = page.properties['Question']
    if (question.type != 'title') {
      throw new Error('Expected title')
    }

    const answer = page.properties['Short answer (HTML)']
    if (answer.type != 'rich_text') {
      throw new Error('Expected definition')
    }

    const section = page.properties['FAQ section']
    if (section.type != 'select') {
      throw new Error('Expected select')
    }
    if (!section.select) {
      throw new Error("All questions must have sections")
    }

    const order = page.properties['FAQ order index']
    if (order.type != 'number') {
      throw new Error('Expected number')
    }
    if (!order.number) {
      throw new Error('All questions must have an order')
    }

    faqs.push({
      section: section.select.name,
      question: question.title[0].plain_text,
      answer: renderRichText(answer.rich_text),
      order: order.number,
    })
  }
  return faqs
}
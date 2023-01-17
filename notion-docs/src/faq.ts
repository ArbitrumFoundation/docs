import { Client } from '@notionhq/client'
import { queryDatabaseWithBlocks } from './notion'

import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import type { Page } from './notion'
import type { KnowledgeItem } from './format'

const faqDatabaseId = 'a8a9af20f33d4cc1b32bbd2be8459733'

export interface FAQ extends KnowledgeItem {
  section: string
  order: number
}

const isFAQ = (item: FAQ | undefined): item is FAQ => {
  return Boolean(item)
}

function parseFAQPage(page: Page): FAQ | undefined {
  const properties = page.page.properties
  const question = properties['Question']
  if (question.type != 'title') {
    throw new Error('Expected title')
  }

  const answer = properties['Short answer (HTML)']
  if (answer.type != 'rich_text') {
    throw new Error('Expected definition')
  }

  const section = properties['FAQ section']
  if (section.type != 'select') {
    throw new Error('Expected select')
  }
  if (!section.select) {
    throw new Error('All questions must have faq section')
  }

  const order = properties['FAQ order index']
  if (order.type != 'number') {
    throw new Error('Expected number')
  }
  if (!order.number) {
    console.warn(`Ignoring question without order: ${page.page.url}`)
    return undefined
  }

  return {
    pageId: page.page.id,
    section: section.select.name,
    title: question.title,
    text: answer.rich_text,
    order: order.number,
    blocks: page.blocks,
    url: page.page.url,
  }
}

export async function lookupFAQs(
  client: Client,
  query: Omit<QueryDatabaseParameters, 'database_id'>
): Promise<FAQ[]> {
  const pages = await queryDatabaseWithBlocks(client, {
    database_id: faqDatabaseId,
    ...query,
  })
  return pages.map(parseFAQPage).filter(isFAQ)
}

export function organizeFAQ(questions: FAQ[]): Record<string, FAQ[]> {
  const sections: Record<string, FAQ[]> = {}
  for (const question of questions) {
    if (!sections[question.section]) {
      sections[question.section] = []
    }
    sections[question.section].push(question)
  }
  for (const section in sections) {
    sections[section].sort(
      (question1, question2): number => question1.order - question2.order
    )
  }
  return sections
}

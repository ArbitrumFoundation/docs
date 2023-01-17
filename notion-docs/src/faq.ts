import { Client } from '@notionhq/client'
import { queryDatabaseWithBlocks } from './notion'
import { parseItemPage } from './item'

import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import type { Page } from './notion'
import type { KnowledgeItem } from './item'

const faqDatabaseId = 'a8a9af20f33d4cc1b32bbd2be8459733'

export interface FAQ extends KnowledgeItem {
  section: string
  order: number
}

const isFAQ = (item: FAQ | undefined): item is FAQ => {
  return Boolean(item)
}

function parseFAQPage(page: Page): FAQ | undefined {
  const item = parseItemPage(page, 'Question', 'Short answer (HTML)')
  const properties = page.page.properties
  
  const section = properties['FAQ section']
  if (section.type != 'select') {
    throw new Error('Expected select')
  }
  if (!section.select) {
    console.warn(`Ignoring question without section: ${page.page.url}`)
    return undefined
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
    ...item,
    section: section.select.name,
    order: order.number,
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

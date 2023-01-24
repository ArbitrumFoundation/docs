import { Client } from '@notionhq/client'
import { queryDatabaseWithBlocks } from './notion'
import { parseItemPage, printItem, renderKnowledgeItem } from './item'

import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import type { Page } from './notion'
import type { KnowledgeItem } from './item'
import type { LinkableTerms } from './format'

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

function organizeFAQ(questions: FAQ[]): Map<string, FAQ[]> {
  const sections = new Map<string, FAQ[]>()
  for (const question of questions) {
    if (!sections.has(question.section)) {
      sections.set(question.section, [])
    }
    sections.get(question.section)?.push(question)
  }
  for (const [, faqs] of sections) {
    faqs.sort(
      (question1, question2): number => question1.order - question2.order
    )
  }
  return sections
}

export function renderSimpleFAQs(
  faqs: FAQ[],
  linkableTerms: LinkableTerms
): string {
  return faqs
    .map(faq => renderKnowledgeItem(faq, linkableTerms))
    .map(printItem)
    .join('')
}

export function renderFAQs(
  allFAQs: FAQ[],
  linkableTerms: LinkableTerms
): string {
  const sections = organizeFAQ(allFAQs)
  if (sections.size > 1) {
    let out = ''
    for (const [section, faqs] of sections) {
      out += `## ${section}\n\n${renderSimpleFAQs(faqs, linkableTerms)}`
    }
    return out
  } else {
    return renderSimpleFAQs(allFAQs, linkableTerms)
  }
}

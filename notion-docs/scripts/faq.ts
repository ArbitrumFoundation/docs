import { Client } from '@notionhq/client'
import { queryDatabaseWithBlocks } from './notion'
import { renderBlocks, renderRichTexts } from './format'

import type { RichTextItemResponse, QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import type { Block, Page } from './notion'
import type { LinkableTerms } from './format'

const faqDatabaseId = 'a8a9af20f33d4cc1b32bbd2be8459733'

export interface FAQ {
  section: string
  question: RichTextItemResponse[]
  answer: RichTextItemResponse[]
  order: number
  blocks: Block[]
}

interface RenderedFAQ {
  question: string
  answer: string
}

const isFAQ = (item: FAQ | undefined): item is FAQ => {
  return !!item
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
    throw new Error("All questions must have faq section")
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
    section: section.select.name,
    question: question.title,
    answer: answer.rich_text,
    order: order.number,
    blocks: page.blocks,
  }
}

export async function lookupFAQs(client: Client, query: Omit<QueryDatabaseParameters, 'database_id'>): Promise<FAQ[]> {
  const pages = await queryDatabaseWithBlocks(client, {
    database_id: faqDatabaseId,
    ...query,
  })
  return pages.map(parseFAQPage).filter(isFAQ)
}

export function organizeFAQ(questions: FAQ[]): Record<string, FAQ[]> {
  let sections: Record<string, FAQ[]> = {}
  for (let question of questions) {
    if (!sections[question.section]) {
      sections[question.section] = []
    }
    sections[question.section].push(question)
  }
  for (let section in sections) {
    sections[section].sort((question1, question2): number => question1.order - question2.order)
  }
  return sections
}

export function renderFAQ(faq: FAQ, linkableTerms: LinkableTerms): RenderedFAQ {
  let renderedAnswer = renderBlocks(faq.blocks, linkableTerms)
  if (renderedAnswer.length == 0) {
    renderedAnswer = renderRichTexts(faq.answer, linkableTerms)
  }
  return {
    question: renderRichTexts(faq.question, linkableTerms),
    answer: renderedAnswer,
  }
}

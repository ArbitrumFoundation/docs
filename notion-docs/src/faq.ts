import { Client } from '@notionhq/client'
import { queryDatabaseWithBlocks } from './notion'

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
  const properties = page.page.properties
  const question = properties['Question']
  if (question.type != 'title') {
    throw new Error('Expected title')
  }

  const answer = properties['Short answer (HTML)']
  if (answer.type != 'rich_text') {
    throw new Error('Expected definition')
  }

  const status = properties['Status']
  if (status.type != 'status') {
    throw new Error('Expected status to be status')
  }

  const publishable = properties['Publishable?']
  if (publishable.type != 'select') {
    throw new Error('Expected Publishable? to be select')
  }

  const projectsProp = properties['Project(s)']
  if (projectsProp.type != 'relation') {
    throw new Error('Expected Project(s) to be a relation')
  }
  const projectRelation = projectsProp.relation
  const projects = new Set<string>()
  for (const project of projectRelation) {
    projects.add(project.id)
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
    status: status.status?.name,
    publishable: publishable.select?.name,
    order: order.number,
    url: page.page.url,
    projects: projects,
    blocks: page.blocks,
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

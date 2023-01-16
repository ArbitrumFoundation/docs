import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import { Block, Page, queryDatabase } from './notion'

const faqDatabaseId = 'a8a9af20f33d4cc1b32bbd2be8459733'

export interface FAQ {
  section: string
  question: string
  answer: RichTextItemResponse[]
  order: number
  blocks: Block[]
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
    question: question.title[0].plain_text,
    answer: answer.rich_text,
    order: order.number,
    blocks: page.blocks,
  }
}

export async function lookupProjectFAQ(
  projectId: string
): Promise<FAQ[]> {
  const pages = await queryDatabase({
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
  return pages.map(parseFAQPage).filter(isFAQ)
}

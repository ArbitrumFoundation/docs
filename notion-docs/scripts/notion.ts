import dotenv from 'dotenv'

import { Client, isFullPage, isFullBlock, collectPaginatedAPI } from '@notionhq/client'
import { RichTextItemResponse, GetPageResponse, PageObjectResponse, BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { stripCurlyQuotes } from './format'

dotenv.config()

const projectDatabaseId = 'f96a33aa166046d1b323a553344e5ac4'
const glossaryDatabaseId = '3bad2594574f476f917d8080a6ec5ce7'
const faqDatabaseId = 'a8a9af20f33d4cc1b32bbd2be8459733'


type RecordValue<T extends Record<any,any>> = T extends Record<any,infer U>  ? U: never;
export type PageObjectProperty = RecordValue<PageObjectResponse['properties']>

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export interface Definition {
  pageId: string
  term: RichTextItemResponse[]
  definition: RichTextItemResponse[]
  status: string | undefined
  publishable: string | undefined
  url: string
  projects: Set<string>
}

export interface FAQ {
  section: string
  question: string
  answer: RichTextItemResponse[]
  order: number
  blocks: Block[]
}

export interface Block {
  block: BlockObjectResponse
  children: Block[]
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
  const results = await collectPaginatedAPI(notion.databases.query, {
    database_id: glossaryDatabaseId,
  })
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
      throw new Error('Expected definition to be rich text')
    }

    const status = page.properties['Status']
    if (status.type != 'status') {
      throw new Error('Expected status to be status')
    }

    const publishable = page.properties['Publishable?']
    if (publishable.type != 'select') {
      throw new Error('Expected Publishable? to be select')
    }

    const projectsProp = page.properties['Project(s)']
    if (projectsProp.type != 'relation') {
      throw new Error('Expected Project(s) to be a relation')
    }
    const projectRelation = projectsProp.relation
    const projects = new Set<string>()
    for (let project of projectRelation) {
      projects.add(project.id)
    }

    definitions.push({
      pageId: page.id,
      term: title.title,
      definition: definition.rich_text,
      status: status.status?.name,
      publishable: publishable.select?.name,
      url: page.url,
      projects: projects,
    })
  }
  return definitions
}

function resolvePages(pages: GetPageResponse[]): PageObjectResponse[] {
  const fullPages = []
  for (let page of pages) {
    if (!isFullPage(page)) {
      throw new Error('Found non-full page')
    }
    fullPages.push(page)
  }
  return fullPages
}

async function parseFAQPage(page: PageObjectResponse): Promise<FAQ | undefined> {
  const blocks = await getBlockChildren(page.id)
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
    throw new Error("All questions must have faq section")
  }

  const order = page.properties['FAQ order index']
  if (order.type != 'number') {
    throw new Error('Expected number')
  }
  if (!order.number) {
    console.warn(`Ignoring question without order: ${page.url}`)
    return undefined
  }

  return {
    section: section.select.name,
    question: question.title[0].plain_text,
    answer: answer.rich_text,
    order: order.number,
    blocks: blocks,
  }
}

const isFAQ = (item: FAQ | undefined): item is FAQ => {
  return !!item
}

export async function lookupProjectFAQ(
  projectId: string
): Promise<FAQ[]> {
  const pages = await collectPaginatedAPI(notion.databases.query, {
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
  const parsedPages = await Promise.all(resolvePages(pages).map(parseFAQPage))
  return parsedPages.filter(isFAQ)
}

export async function getBlockChildren(block_id: string): Promise<Block[]> {
  const blocks = await notion.blocks.children.list({block_id})
  let fullBlocks: Block[] = []
  for (let block of blocks.results) {
    if (!isFullBlock(block)) {
      console.log("non full", block)
      throw new Error('Found non-full block')
    }
    let children: Block[] = []
    if (block.has_children) {
      children = await getBlockChildren(block.id)
    }
    fullBlocks.push({block, children})
  }
  return fullBlocks
}

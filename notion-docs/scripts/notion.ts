import dotenv from 'dotenv'

import { Client, isFullPage, isFullBlock, collectPaginatedAPI } from '@notionhq/client'
import { PageObjectResponse, BlockObjectResponse, QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'

dotenv.config()

const projectDatabaseId = 'f96a33aa166046d1b323a553344e5ac4'

type RecordValue<T extends Record<any,any>> = T extends Record<any,infer U>  ? U: never;
export type PageObjectProperty = RecordValue<PageObjectResponse['properties']>

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export interface Page {
  page: PageObjectResponse
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

export async function queryDatabase(params: QueryDatabaseParameters): Promise<Page[]> {
  const pages = await collectPaginatedAPI(notion.databases.query, params)
  const fullPages: PageObjectResponse[] = []
  for (let page of pages) {
    if (!isFullPage(page)) {
      throw new Error('Found non-full page')
    }
    fullPages.push(page)
  }
  const children = await Promise.all(fullPages.map((page) => { return getBlockChildren(page.id) }))
  return fullPages.map((page, i) => {
    return {
      page: page,
      blocks: children[i],
    }
  })
}

async function getBlockChildren(block_id: string): Promise<Block[]> {
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

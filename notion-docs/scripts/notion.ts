import dotenv from 'dotenv'

import { Client, isFullPage, isFullBlock, collectPaginatedAPI } from '@notionhq/client'
import { PageObjectResponse, BlockObjectResponse, QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'

dotenv.config()

const notion = new Client({
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

export async function queryDatabase(params: QueryDatabaseParameters): Promise<PageObjectResponse[]> {
  const pages = await collectPaginatedAPI(notion.databases.query, params)
  const fullPages: PageObjectResponse[] = []
  for (let page of pages) {
    if (!isFullPage(page)) {
      throw new Error('Found non-full page')
    }
    fullPages.push(page)
  }
  return fullPages
}

export async function queryDatabaseWithBlocks(params: QueryDatabaseParameters): Promise<Page[]> {
  const fullPages = await queryDatabase(params)
  const children = await Promise.all(fullPages.map((page) => { return getBlockChildren(notion, page.id) }))
  return fullPages.map((page, i) => {
    return {
      page: page,
      blocks: children[i],
    }
  })
}

async function getBlockChildren(client: Client, block_id: string): Promise<Block[]> {
  const blocks = await client.blocks.children.list({block_id})
  let fullBlocks: Block[] = []
  for (let block of blocks.results) {
    if (!isFullBlock(block)) {
      console.log("non full", block)
      throw new Error('Found non-full block')
    }
    let children: Block[] = []
    if (block.has_children) {
      children = await getBlockChildren(client, block.id)
    }
    fullBlocks.push({block, children})
  }
  return fullBlocks
}

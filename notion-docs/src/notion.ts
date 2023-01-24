import {
  Client,
  isFullPage,
  isFullBlock,
  collectPaginatedAPI,
} from '@notionhq/client'
import {
  PageObjectResponse,
  BlockObjectResponse,
  QueryDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints'

export interface Page {
  page: PageObjectResponse
  blocks: Block[]
}

export interface Block {
  block: BlockObjectResponse
  children: Block[]
}

export async function queryDatabase(
  client: Client,
  params: QueryDatabaseParameters
): Promise<PageObjectResponse[]> {
  const pages = await collectPaginatedAPI(client.databases.query, params)
  const fullPages: PageObjectResponse[] = []
  for (const page of pages) {
    if (!isFullPage(page)) {
      throw new Error('Found non-full page')
    }
    fullPages.push(page)
  }
  return fullPages
}

export async function queryDatabaseWithBlocks(
  client: Client,
  params: QueryDatabaseParameters
): Promise<Page[]> {
  const fullPages = await queryDatabase(client, params)
  const children = await Promise.all(
    fullPages.map(page => {
      return getBlockChildren(client, page.id)
    })
  )
  return fullPages.map((page, i) => {
    return {
      page: page,
      blocks: children[i],
    }
  })
}

export async function getPageWithBlocks(
  client: Client,
  pageId: string
): Promise<Page> {
  const page = await client.pages.retrieve({page_id: pageId})
  if (!isFullPage(page)) {
      throw new Error('Found non-full page')
    }
  return {
    page: page,
    blocks: await getBlockChildren(client, page.id),
  }
}

async function getBlockChildren(
  client: Client,
  block_id: string
): Promise<Block[]> {
  const blocks = await client.blocks.children.list({ block_id })
  const fullBlocks: Block[] = []
  for (const block of blocks.results) {
    if (!isFullBlock(block)) {
      console.log('non full', block)
      throw new Error('Found non-full block')
    }
    let children: Block[] = []
    if (block.has_children) {
      children = await getBlockChildren(client, block.id)
    }
    fullBlocks.push({ block, children })
  }
  return fullBlocks
}

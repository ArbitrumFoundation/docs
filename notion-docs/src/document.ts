import { Client } from '@notionhq/client'
import { getPageWithBlocks, queryDatabaseWithBlocks } from './notion'
import { parseRecordPage } from './record'
import { printItem, renderKnowledgeItem } from './item'
import { formatAnchor, renderBlock, renderRichTexts, RenderMode } from './format'

import type { QueryDatabaseParameters, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import type { Block, Page } from './notion'
import type { Record } from './record'
import type { LinkableTerms } from './format'

const documentDatabaseId = '485a6344453640fca30507f4d4210a47'

export interface Document extends Record {
  slug: RichTextItemResponse[]
}

const isDocument = (item: Document | undefined): item is Document => {
  return Boolean(item)
}

function parseDocumentPage(page: Page): Document | undefined {
  const record = parseRecordPage(page, 'Title')
  const properties = page.page.properties

  const slug = properties['Published slug']
  if (slug.type != 'rich_text') {
    throw new Error('Expected slug to be rich text')
  }

  return {
    ...record,
    slug: slug.rich_text,
  }
}

export async function lookupDocument(client: Client, pageId: string): Promise<Document> {
  const page = await getPageWithBlocks(client, pageId)
  const parsedPage = parseDocumentPage(page)
  if (!parsedPage) {
  	throw new Error("Expected valid page")
  }
  return parsedPage
}

export async function lookupDocuments(
  client: Client,
  query: Omit<QueryDatabaseParameters, 'database_id'>
): Promise<Document[]> {
  const pages = await queryDatabaseWithBlocks(client, {
    database_id: documentDatabaseId,
    ...query,
  })
  return pages.map(parseDocumentPage).filter(isDocument)
}

function renderDocBlocks(
  blocks: Block[],
  linkableTerms: LinkableTerms
): string {
  let out = ''
  let prevType: string | undefined
  let i = 0
  for (const block of blocks) {
    const renderedBlock = renderBlock(
      block,
      linkableTerms,
      prevType,
      i == blocks.length - 1
    )
    out += renderedBlock
    out += '\n'
    prevType = block.block.type
    i++
  }
  return out
}

export function renderDocument(doc: Document, linkableTerms: LinkableTerms): string {
	let out = ''
  let prevType: string | undefined
  let i = 0
  let inMetadata = false
  for (const block of doc.blocks) {
  	if (i == 0 && block.block.type == 'divider') {
  		out += '---\n'
  		inMetadata = true
  		i++
  		continue
  	}
  	if (inMetadata) {
  		if (block.block.type == 'divider') {
	  		out += '---\n'
	  		inMetadata = false
	  		i++
	  		continue
	  	}
  		if (block.block.type != 'paragraph') {
  			throw new Error(`Can only have paragraph in metadata but found type ${block.block.type}`)
  		}
  		out += renderRichTexts(block.block.paragraph.rich_text, linkableTerms, RenderMode.Plain)
  		out += '\n'
  		i++
  		continue
  	}
    const renderedBlock = renderBlock(
      block,
      linkableTerms,
      prevType,
      i == doc.blocks.length - 1
    )
    out += renderedBlock
    out += '\n'
    prevType = block.block.type
    i++
  }
  return out
}


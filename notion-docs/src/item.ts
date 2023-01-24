import { Client, isFullPage } from '@notionhq/client'
import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import {
  LinkableTerms,
  renderRichTexts,
  RenderMode,
  formatAnchor,
  renderBlocks,
  MissingPageError,
} from './format'
import { parseRecordPage } from './record'
import type { Record } from './record'
import type { Block, Page } from './notion'

export interface KnowledgeItem extends Record {
  text: RichTextItemResponse[]
}

export interface RenderedKnowledgeItem {
  title: string
  text: string
  key: string
}

export function renderKnowledgeItem(
  item: KnowledgeItem,
  linkableTerms: LinkableTerms
): RenderedKnowledgeItem {
  try {
    const title = renderRichTexts(
      item.title,
      linkableTerms,
      RenderMode.Markdown
    )
    const dashDelimitedKey = formatAnchor(item.title, linkableTerms)

    let renderedText = renderBlocks(item.blocks, linkableTerms)
    if (renderedText.length == 0) {
      renderedText = `<p>${renderRichTexts(
        item.text,
        linkableTerms,
        RenderMode.HTML
      )}</p>`
    }
    return {
      title: title,
      text: renderedText,
      key: dashDelimitedKey,
    }
  } catch (e) {
    throw new RenderKnowledgeItemError(item, e)
  }
}

export function printItem(item: RenderedKnowledgeItem): string {
  return `### ${item.title} {#${item.key}}\n${item.text}\n\n`
}

export class RenderKnowledgeItemError extends Error {
  constructor(public item: KnowledgeItem, public error: any) {
    super('Failed rendering item')
    this.name = 'RenderKnowledgeItemError'
  }
}

export async function handleRenderError(
  e: unknown,
  client: Client
): Promise<boolean> {
  if (!(e instanceof RenderKnowledgeItemError)) {
    return false
  }
  console.error(`Error while rendering item: ${e.item.url}`)
  const wrappedError = e.error
  if (!(wrappedError instanceof MissingPageError)) {
    return false
  }
  const page = await client.pages.retrieve({ page_id: wrappedError.page })
  if (!isFullPage(page)) {
    console.error(`Failed due to missing page ${page.id} which is unaccessable`)
  } else {
    console.error(
      `Failed due to missing page ${page.id} at url ${page.url} being unaccessable`
    )
  }
  return true
}

export function parseItemPage(
  page: Page,
  titleTerm: string,
  textTerm: string
): KnowledgeItem {
  const record = parseRecordPage(page, titleTerm)
  const properties = page.page.properties
  
  const definition = properties[textTerm]
  if (definition.type != 'rich_text') {
    throw new Error('Expected text term to be rich text')
  }

  return {
    ...record,
    text: definition.rich_text,
  }
}

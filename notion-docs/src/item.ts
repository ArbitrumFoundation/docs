import { Client, isFullPage } from '@notionhq/client'
import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import {
  LinkableTerms,
  renderRichTexts,
  RenderMode,
  formatAnchor,
  renderBlocks,
  MissingPageError,
  LinkValidity,
} from './format'
import type { Block, Page } from './notion'

export interface KnowledgeItem {
  pageId: string
  url: string
  title: RichTextItemResponse[]
  text: RichTextItemResponse[]
  blocks: Block[]
  status: string | undefined
  publishable: string | undefined
  projects: Set<string>
}

export interface RenderedKnowledgeItem {
  title: string
  text: string
  key: string
}

export function knowledgeItemValidity(
  item: KnowledgeItem,
  project: string
): LinkValidity {
  if (
    item.status != '4 - Continuously publishing' &&
    item.status != '2 - Pending peer review'
  ) {
    return { reason: 'item not yet marked as ready' }
  }
  if (item.publishable != 'Publishable') {
    return { reason: 'item not marked as publishable' }
  }
  if (!item.projects.has(project)) {
    return { reason: 'item is from incorrect project' }
  }
  return 'Valid'
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
  const properties = page.page.properties
  const title = properties[titleTerm]
  if (title.type != 'title') {
    throw new Error('Expected title')
  }

  const definition = properties[textTerm]
  if (definition.type != 'rich_text') {
    throw new Error('Expected text term to be rich text')
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

  return {
    pageId: page.page.id,
    title: title.title,
    text: definition.rich_text,
    status: status.status?.name,
    publishable: publishable.select?.name,
    url: page.page.url,
    projects: projects,
    blocks: page.blocks,
  }
}

import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import { Client, isFullPage } from '@notionhq/client'
import type { Block } from './notion'

export type LinkableTerms = Record<string, Reference>

export interface Item {
  pageId: string
  url: string
  title: RichTextItemResponse[]
  text: RichTextItemResponse[]
  blocks: Block[]
}

export interface RenderedItem {
  title: string
  text: string
  key: string
}

export enum DefinitionValidity {
  Valid,
  NotReady,
  NotPublishable,
  WrongProject,
}

enum RenderMode {
  HTML,
  Markdown,
  Plain,
}

export function renderItem(
  item: Item,
  linkableTerms: LinkableTerms
): RenderedItem {
  try {
    const title = renderRichTexts(
      item.title,
      linkableTerms,
      RenderMode.Markdown
    )
    const dashDelimitedKey = formatAnchor(item.title, linkableTerms)

    let renderedText = renderBlocks(item.blocks, linkableTerms)
    if (renderedText.length == 0) {
      renderedText = renderRichTexts(item.text, linkableTerms, RenderMode.HTML)
    }
    return {
      title: title,
      text: renderedText,
      key: dashDelimitedKey,
    }
  } catch (e) {
    throw new RenderItemError(item, e)
  }
}

interface Reference {
  text: RichTextItemResponse[]
  anchor: RichTextItemResponse[] | undefined
  page: string
  valid: DefinitionValidity
  notionURL: string
}

function stripCurlyQuotes(input: string): string {
  return input
    .replaceAll(/[\u2018\u2019]/g, "'")
    .replaceAll(/[\u201C\u201D]/g, '"')
}

function formatAnchor(
  text: RichTextItemResponse[],
  linkableTerms: LinkableTerms
) {
  // Safe to render without links since glossary terms can't have links
  return renderRichTexts(text, linkableTerms, RenderMode.Plain)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, '')
    .split(' ')
    .join('-')
}

export class MissingPageError extends Error {
  constructor(public page: string) {
    super(`Link to unsupported page: ${page}`)
    this.name = 'MissingPageError'
  }
}

export class RenderItemError extends Error {
  constructor(public item: Item, public error: any) {
    super('Failed rendering item')
    this.name = 'RenderItemError'
  }
}

export async function handleRenderError(
  e: unknown,
  client: Client
): Promise<boolean> {
  if (!(e instanceof RenderItemError)) {
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

function renderLink(
  text: string,
  url: string,
  anchor: string,
  renderMode: RenderMode
): string {
  switch (renderMode) {
    case RenderMode.HTML:
      return `<a href="${url}${anchor}">${text}</a>`
    case RenderMode.Markdown:
      return `[${text}](${url}${anchor})`
    case RenderMode.Plain:
      return text
  }
}

function renderPageLink(
  page: string,
  linkableTerms: LinkableTerms,
  renderMode: RenderMode
): string {
  const link = linkableTerms[page]
  if (!link) {
    throw new MissingPageError(page)
  }
  const text = renderRichTexts(link.text, linkableTerms, RenderMode.HTML)
  if (link.valid != DefinitionValidity.Valid) {
    console.warn(
      `Ignoring link to doc with reason ${DefinitionValidity[link.valid]}: ${
        link.notionURL
      }`
    )
    return text
  }
  let anchor = ''
  if (link.anchor) {
    anchor = `#${formatAnchor(link.anchor, linkableTerms)}`
  }
  return renderLink(text, link.page, anchor, renderMode)
}

function renderRichText(
  res: RichTextItemResponse,
  linkableTerms: LinkableTerms,
  renderMode: RenderMode,
  startOfLine: boolean
): string {
  switch (res.type) {
    case 'text': {
      let text = stripCurlyQuotes(res.text.content)
      if (res.text.link) {
        text = renderLink(text, res.text.link.url, '', renderMode)
      }
      if (res.annotations.code) {
        switch (renderMode) {
          case RenderMode.HTML:
            if (startOfLine) {
              text = `<code>{'${text}'}</code>`
            } else {
              text = `<code>${text}</code>`
            }
            break
          case RenderMode.Markdown:
            text = `\`${text}\``
            break
          case RenderMode.Plain:
            break
        }
      }
      if (renderMode == RenderMode.HTML) {
        text = text.replaceAll('\n', '<br />\n')
      }
      return text
    }
    case 'mention': {
      const mention = res.mention
      switch (mention.type) {
        case 'user': {
          const user = mention.user
          if ('type' in user) {
            return `@${user.name}`
          } else {
            throw new Error(`Unhandled user: ${user}`)
          }
        }
        case 'page':
          return renderPageLink(mention.page.id, linkableTerms, renderMode)
        default:
          throw new Error(`Unhandled mention type: ${mention.type}`)
      }
    }
    default:
      throw new Error(`Unhandled rich text type: ${res.type}`)
  }
}

function renderRichTexts(
  texts: RichTextItemResponse[],
  linkableTerms: LinkableTerms,
  renderMode: RenderMode
): string {
  let out = ''
  for (const text of texts) {
    let startOfLine = false
    if (out.length == 0 || out.slice(-1) == '\n') {
      startOfLine = true
    }
    out += renderRichText(text, linkableTerms, renderMode, startOfLine)
  }
  return out
}

function renderBlock(
  block: Block,
  linkableTerms: LinkableTerms,
  prevType?: string,
  last = false
): string {
  const blockResponse = block.block
  let prefix = ''
  let postfix = ''
  if (prevType != blockResponse.type) {
    if (prevType == 'numbered_list_item') {
      prefix = '</ol>\n'
    }
    if (prevType == 'bulleted_list_item') {
      prefix = '</ul>\n'
    }
    if (blockResponse.type == 'numbered_list_item') {
      prefix += '<ol>'
    }
    if (blockResponse.type == 'bulleted_list_item') {
      prefix += '<ul>'
    }
  }
  if (last) {
    if (blockResponse.type == 'numbered_list_item') {
      postfix += '</ol>\n'
    }
    if (blockResponse.type == 'bulleted_list_item') {
      postfix += '</ul>\n'
    }
  }

  let child = ''
  if (block.children.length > 0) {
    child = renderBlocks(block.children, linkableTerms)
  }
  const renderRich = (text: RichTextItemResponse[]): string => {
    return `${renderRichTexts(text, linkableTerms, RenderMode.HTML)}${child}`
  }
  const body = (() => {
    switch (blockResponse.type) {
      case 'paragraph': {
        const text = renderRich(blockResponse.paragraph.rich_text)
        return `<p>${text}</p>\n`
      }
      case 'numbered_list_item': {
        const text = renderRich(blockResponse.numbered_list_item.rich_text)
        return `<li>${text}</li>`
      }
      case 'bulleted_list_item': {
        const text = renderRich(blockResponse.bulleted_list_item.rich_text)
        return `<li>${text}</li>`
      }
      case 'code': {
        const text = renderRich(blockResponse.code.rich_text)
        return `\`\`\`${blockResponse.code.language}\n${text}\n\`\`\``
      }
      case 'link_to_page': {
        const link = blockResponse.link_to_page
        switch (link.type) {
          case 'page_id':
            return renderPageLink(link.page_id, linkableTerms, RenderMode.HTML)
          default:
            throw new Error(`Unhandled link_to_page type: ${link.type}`)
        }
      }
      default:
        console.log(blockResponse)
        throw new Error(`Found block of unknown type ${blockResponse.type}`)
    }
  })()
  return `${prefix}${body}${postfix}`
}

function renderBlocks(blocks: Block[], linkableTerms: LinkableTerms): string {
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

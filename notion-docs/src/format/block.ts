import { renderRichTexts } from './text'
import { RenderMode } from './format'
import { renderPageLink } from './link'

import type { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import type { Block } from '../notion'
import type { LinkableTerms } from './link'

export function renderBlock(
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
  const renderRich = (text: RichTextItemResponse[]): string => {
    let child = ''
    if (block.children.length > 0) {
      child = renderBlocks(block.children, linkableTerms)
    }
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
      case 'divider': {
        return '<hr />'
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
      case 'heading_1': {
        type Heading = typeof blockResponse.heading_1 & {is_toggleable?: boolean}
        const heading = blockResponse.heading_1 as Heading
        if (!!heading.is_toggleable) {
          return ''
        }
        const text = renderRich(heading.rich_text)
        return `\n# ${text}`
      }
      case 'heading_2': {
        type Heading = typeof blockResponse.heading_2 & {is_toggleable?: boolean}
        const heading = blockResponse.heading_2 as Heading
        if (!!heading.is_toggleable) {
          return ''
        }
        const text = renderRich(heading.rich_text)
        return `\n## ${text}`
      }
      case 'heading_3': {
        type Heading = typeof blockResponse.heading_3 & {is_toggleable?: boolean}
        const heading = blockResponse.heading_3 as Heading
        if (!!heading.is_toggleable) {
          return ''
        }
        const text = renderRich(heading.rich_text)
        return `\n### ${text}`
      }
      case 'divider': {

      }
      default: {
        console.log(blockResponse)
        throw new Error(`Found block of unknown type ${blockResponse.type}`)
      }
    }
  })()
  return `${prefix}${body}${postfix}`
}

export function renderBlocks(
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

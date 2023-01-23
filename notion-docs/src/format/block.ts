import { renderRichTexts } from './text'
import { RenderMode } from './format'
import { renderPageLink } from './link'

import type { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import type { Block } from '../notion'
import type { LinkableTerms} from './link'

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
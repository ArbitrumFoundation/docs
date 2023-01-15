import { RichTextItemResponse, BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type { Block, Definition } from './notion'

interface Reference {
  text: string
  anchor: string | undefined
  page: string
}
export type LinkableTerms = Record<string, Reference>

export function stripCurlyQuotes(input: string): string {
  return input
  .replaceAll(/[\u2018\u2019]/g, "'")
  .replaceAll(/[\u201C\u201D]/g, '"');
}

export function formatGlossaryTermKey(term: string) {
  return stripCurlyQuotes(term)
      .toLowerCase()
      .replace(/[^a-z0-9\s]/gi, '')
      .split(' ')
      .join('-')
}

export function renderRichText(res: RichTextItemResponse, linkableTerms: LinkableTerms, startOfLine=true): string {
  switch (res.type) {
  case 'text':
    let text = stripCurlyQuotes(res.text.content)
    if (res.text.link) {
      text = `<a href='${res.text.link.url}'>${text}</a>`
    }
    if (res.annotations.code) {
      if (startOfLine) {
        text = `<code>{'${text}'}</code>`
      } else {
        text = `<code>${text}</code>`
      }
    }
    return text.replaceAll('\n','<br />\n')
  case 'mention':
    const mention = res.mention
    switch (mention.type) {
    case 'user':
      const user = mention.user
      if ("type" in user) {
        return `@${user.name}`
      } else {
        throw new Error(`Unhandled user: ${user}`)
      }
    case 'page':
      const link = linkableTerms[mention.page.id]
      if (!link) {
        throw new Error(`Link to unsupported page ${mention.page.id}`)
      }
      let anchor = ''
      if (link.anchor) {
        anchor = `#${link.anchor}`
      }
      return `[${link.text}](${link.page}${anchor})`
    default:
      throw new Error(`Unhandled mention type: ${mention.type}`)
    }
    
  default:
    throw new Error(`Unhandled rich text type: ${res.type}`)
  }
}

export function renderRichTexts(texts: RichTextItemResponse[], linkableTerms: LinkableTerms): string {
  let out = ''
  for (let text of texts) {
    let startOfLine = false
    if (out.length == 0 || out.slice(-1) == "\n") {
      startOfLine = true
    }
    out += renderRichText(text, linkableTerms, startOfLine)
  }
  return out
}

export function renderBlock(block: Block, prevType?: string, last=false): string {
  const blockResponse = block.block
  let prefix = ''
  let postfix = ''
  if (prevType == 'numbered_list_item' && blockResponse.type != 'numbered_list_item') {
    prefix = '</ol>\n'
  }
  if (prevType == 'bulleted_list_item' && blockResponse.type != 'bulleted_list_item') {
    prefix = '</ul>\n'
  }
  if (prevType != 'numbered_list_item' && blockResponse.type == 'numbered_list_item') {
    prefix += '<ol>'
  }
  if (prevType != 'bulleted_list_item' && blockResponse.type == 'bulleted_list_item') {
    prefix += '<ul>'
  }
  if (last && blockResponse.type == 'numbered_list_item') {
    postfix += '</ol>\n'
  }
  if (last && blockResponse.type == 'bulleted_list_item') {
    postfix += '</ul>\n'
  }
  let child = ''
  if (block.children.length > 0) {
    child = renderBlocks(block.children)
  }
  let body = (() => {
    switch (blockResponse.type) {
    case 'paragraph':
      return `<p>${renderRichTexts(blockResponse.paragraph.rich_text, {})}${child}</p>\n`
    case 'numbered_list_item':
      return `<li>${renderRichTexts(blockResponse.numbered_list_item.rich_text, {})}${child}</li>`
    case 'bulleted_list_item':
      return `<li>${renderRichTexts(blockResponse.bulleted_list_item.rich_text, {})}${child}</li>`
    case 'code':
      return `\`\`\`${blockResponse.code.language}\n${renderRichTexts(blockResponse.code.rich_text, {})}${child}\n\`\`\``
    default:
      console.log(blockResponse)
      throw new Error(`Found block of unknown type ${blockResponse.type}`)
    }
  })()
  return `${prefix}${body}${postfix}`
}


export function renderBlocks(blocks: Block[]): string {
  let out = ''
  let prevType: string | undefined
  let i = 0
  for (let block of blocks) {
    const renderedBlock = renderBlock(block, prevType, i == blocks.length - 1)
    out += renderedBlock
    out += '\n'
    prevType = block.block.type
    i++
  }
  return out
}

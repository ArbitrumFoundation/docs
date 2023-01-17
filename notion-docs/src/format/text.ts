import { RenderMode } from './format'
import { renderLink, renderPageLink } from './link'

import type { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import type { LinkableTerms} from './link'

function stripCurlyQuotes(input: string): string {
  return input
    .replaceAll(/[\u2018\u2019]/g, "'")
    .replaceAll(/[\u201C\u201D]/g, '"')
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

export function renderRichTexts(
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
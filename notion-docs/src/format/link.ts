import { RenderMode } from './format'
import { renderRichTexts } from './text'

import type { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'

export type LinkableTerms = Record<string, Reference>

export interface LinkFailureReason {
  reason: string
}

export type LinkValidity = 'Valid' | LinkFailureReason

interface Reference {
  text: RichTextItemResponse[]
  anchor: RichTextItemResponse[] | undefined
  page: string
  valid: LinkValidity
  notionURL: string
}

export function formatAnchor(
  text: RichTextItemResponse[],
  linkableTerms: LinkableTerms
) {
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

export function renderLink(
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

export function renderPageLink(
  page: string,
  linkableTerms: LinkableTerms,
  renderMode: RenderMode
): string {
  const link = linkableTerms[page]
  if (!link) {
    throw new MissingPageError(page)
  }
  const text = renderRichTexts(link.text, linkableTerms, RenderMode.HTML)
  if (link.valid != 'Valid') {
    console.warn(
      `Ignoring link to doc with reason: ${link.valid.reason}: ${link.notionURL}`
    )
    return text
  }
  let anchor = ''
  if (link.anchor) {
    anchor = `#${formatAnchor(link.anchor, linkableTerms)}`
  }
  return renderLink(text, link.page, anchor, renderMode)
}

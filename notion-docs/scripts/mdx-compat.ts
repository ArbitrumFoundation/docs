// rewrites notion generator output so it parses as mdx v3 under fumadocs

const blockTags = ['p', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote']
const listTags = ['ol', 'ul']

function convertHeadingIds(text: string): string {
  return text.replace(/^(#{1,6} .*?)\s*\{#([^}]+)\}\s*$/gm, '$1 [#$2]')
}

function joinMultilineBlocks(text: string): string {
  const pattern = new RegExp(
    `<(${blockTags.join('|')})(\\s[^>]*)?>([\\s\\S]*?)</\\1>`,
    'g'
  )
  return text.replace(pattern, (match: string) =>
    match.includes('\n') ? match.replace(/\s*\n\s*/g, ' ') : match
  )
}

function isolateListTags(text: string): string {
  const open = new RegExp(`<(${listTags.join('|')})>\\s*<li`, 'g')
  const close = new RegExp(`</li>\\s*</(${listTags.join('|')})>`, 'g')
  return text
    .replace(open, (_: string, tag: string) => `<${tag}>\n<li`)
    .replace(close, (_: string, tag: string) => `</li>\n</${tag}>`)
}

export function toMdxCompatible(text: string): string {
  return isolateListTags(joinMultilineBlocks(convertHeadingIds(text)))
}

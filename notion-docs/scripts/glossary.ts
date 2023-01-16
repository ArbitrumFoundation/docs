import { Client } from '@notionhq/client'
import { renderRichTexts, renderBlocks } from './format'
import { queryDatabaseWithBlocks } from './notion'

import type { RichTextItemResponse, QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import type { Block, Page } from './notion'
import type { LinkableTerms } from './format'

const glossaryDatabaseId = '3bad2594574f476f917d8080a6ec5ce7'

export interface Definition {
  pageId: string
  term: RichTextItemResponse[]
  definition: RichTextItemResponse[]
  status: string | undefined
  publishable: string | undefined
  url: string
  projects: Set<string>
  blocks: Block[]
}

interface RenderedDefinition {
  term: string
  definition: string
  key: string
}

const isDefinition = (item: Definition | undefined): item is Definition => {
  return !!item
}

export function formatGlossaryTermKey(term: RichTextItemResponse[]) {
  // Safe to render without links since glossary terms can't have links
  return renderRichTexts(term, {})
      .toLowerCase()
      .replace(/[^a-z0-9\s]/gi, '')
      .split(' ')
      .join('-')
}

function parseGlossaryPage(page: Page): Definition | undefined {
  const properties = page.page.properties
  const title = properties['Term']
  if (title.type != 'title') {
    throw new Error('Expected title')
  }

  const definition = properties['Definition (HTML)']
  if (definition.type != 'rich_text') {
    throw new Error('Expected definition to be rich text')
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
  for (let project of projectRelation) {
    projects.add(project.id)
  }

  return {
    pageId: page.page.id,
    term: title.title,
    definition: definition.rich_text,
    status: status.status?.name,
    publishable: publishable.select?.name,
    url: page.page.url,
    projects: projects,
    blocks: page.blocks
  }
}

export async function lookupGlossaryTerms(client: Client, query: Omit<QueryDatabaseParameters, 'database_id'>): Promise<Definition[]> {
  const pages = await queryDatabaseWithBlocks(client, {
    database_id: glossaryDatabaseId,
    ...query,
  })
  return pages.map(parseGlossaryPage).filter(isDefinition)
}

export function renderDefinition(def: Definition, linkableTerms: LinkableTerms): RenderedDefinition {
  const term = renderRichTexts(def.term, linkableTerms)
  // remove all non-alphanumeric, non-space, and non-parentheses characters except for "$" and "-" from term
  const formattedTerm = term.replace(/[^a-z0-9\s$-()-]/gi, '');
  // remove all non-alphanumeric and non-space characters, convert to lowercase, and replace spaces with hyphens
  // replace all attribute values surrounded by single quotes with double quotes
  const dashDelimitedTermKey = formatGlossaryTermKey(def.term)

  let renderedDef = renderBlocks(def.blocks, linkableTerms)
  if (renderedDef.length == 0) {
    renderedDef = renderRichTexts(def.definition, linkableTerms)
  }
  return {
    term: formattedTerm,
    definition: renderedDef,
    key: dashDelimitedTermKey,
  }
}

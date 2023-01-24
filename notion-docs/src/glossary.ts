import { Client } from '@notionhq/client'
import { queryDatabaseWithBlocks } from './notion'
import { parseItemPage, printItem, renderKnowledgeItem } from './item'

import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import type { Page } from './notion'
import type { KnowledgeItem } from './item'
import type { LinkableTerms } from './format'

const glossaryDatabaseId = '3bad2594574f476f917d8080a6ec5ce7'

export type Definition = KnowledgeItem

const isDefinition = (item: Definition | undefined): item is Definition => {
  return Boolean(item)
}

function parseGlossaryPage(page: Page): Definition | undefined {
  return parseItemPage(page, 'Term', 'Definition (HTML)')
}

export async function lookupGlossaryTerms(
  client: Client,
  query: Omit<QueryDatabaseParameters, 'database_id'>
): Promise<Definition[]> {
  const pages = await queryDatabaseWithBlocks(client, {
    database_id: glossaryDatabaseId,
    ...query,
  })
  return pages.map(parseGlossaryPage).filter(isDefinition)
}

export function renderGlossary(
  definitions: Definition[],
  linkableTerms: LinkableTerms
) {
  const renderedDefs = definitions.map(def =>
    renderKnowledgeItem(def, linkableTerms)
  )
  // sort the array alphabetically by term
  renderedDefs.sort((a, b) => a.title.localeCompare(b.title))

  return renderedDefs.map(printItem).join('')
}

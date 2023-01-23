import { Client } from '@notionhq/client'
import { queryDatabaseWithBlocks } from './notion'
import { parseItemPage } from './item'

import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import type { Page } from './notion'
import type { KnowledgeItem } from './item'

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

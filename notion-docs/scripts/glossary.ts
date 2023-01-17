import { Client } from '@notionhq/client'
import { queryDatabaseWithBlocks } from './notion'

import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import type { Page } from './notion'
import type { LinkableTerms, Item } from './format'

const glossaryDatabaseId = '3bad2594574f476f917d8080a6ec5ce7'

export interface Definition extends Item {
  pageId: string
  status: string | undefined
  publishable: string | undefined
  projects: Set<string>
}

interface RenderedDefinition {
  term: string
  definition: string
  key: string
}

const isDefinition = (item: Definition | undefined): item is Definition => {
  return !!item
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
    title: title.title,
    text: definition.rich_text,
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

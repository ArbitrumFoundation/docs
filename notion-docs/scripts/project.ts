import { Client } from '@notionhq/client'
import { queryDatabase } from './notion'

const projectDatabaseId = 'f96a33aa166046d1b323a553344e5ac4'

export async function lookupProject(client: Client, name: string): Promise<string> {
  const pages = await queryDatabase(client, {
    database_id: projectDatabaseId,
    filter: {
      property: 'Project name',
      rich_text: {
        equals: name,
      },
    },
  })

  for (let page of pages) {
    return page.id
  }
  throw new Error('Project not found')
}
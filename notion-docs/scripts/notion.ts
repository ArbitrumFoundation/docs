import dotenv from 'dotenv'

import { Client } from '@notionhq/client'

dotenv.config()

export const projectDatabaseId = 'f96a33aa166046d1b323a553344e5ac4'
export const glossaryDatabaseId = '3bad2594574f476f917d8080a6ec5ce7'

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

export async function lookupProject(name: string): Promise<string> {
  const fullOrPartialPages = await notion.databases.query({
    database_id: projectDatabaseId,
    filter: {
      property: 'Project name',
      rich_text: {
        equals: name,
      },
    },
  })

  for (const page of fullOrPartialPages.results) {
    return page.id
  }
  throw new Error('Project not found')
}
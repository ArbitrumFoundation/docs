import { Client, isFullPage } from '@notionhq/client'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

const projectDatabaseId = 'f96a33aa166046d1b323a553344e5ac4'
const glossaryDatabaseId = '3bad2594574f476f917d8080a6ec5ce7'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

interface Definition {
  term: string
  definition: string
}

async function lookupProject(name: string): Promise<string> {
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

async function lookupProjectDefinitions(
  projectId: string
): Promise<Definition[]> {
  const fullOrPartialPages = await notion.databases.query({
    database_id: glossaryDatabaseId,
    filter: {
      and: [
        {
          property: 'Project(s)',
          relation: {
            contains: projectId,
          },
        },
        {
          property: 'Status',
          status: {
            equals: '4 - Continuously publishing',
          },
        },
        {
          property: 'Publishable?',
          select: {
            equals: 'Publishable',
          },
        },
      ],
    },
  })
  const results = fullOrPartialPages.results
  const definitions: Definition[] = []
  for (const page of results) {
    if (!isFullPage(page)) {
      throw new Error('Found non-full page')
      continue
    }

    const title = page.properties['Term']
    if (title.type != 'title') {
      throw new Error('Expected title')
    }

    const definition = page.properties['Glossary definition']
    if (definition.type != 'rich_text') {
      throw new Error('Expected definition')
    }
    definitions.push({
      term: title.title[0].plain_text,
      definition: definition.rich_text[0].plain_text,
    })
  }
  return definitions
}

function formatDefinitions(definitions: Definition[]) {
  // sort the array alphabetically by term
  definitions.sort((a, b) => a.term.localeCompare(b.term))

  const htmlArray = definitions.map(item => {
    // remove all non-alphanumeric and non-space characters except for "$" from term
    const formattedTerm = item.term.replace(/[^a-z0-9\s$]/gi, '')
    // remove all non-alphanumeric and non-space characters except for "$", convert to lowercase, and replace spaces with hyphens
    const termKey = item.term
      .toLowerCase()
      .replace(/[^a-z0-9\s]/gi, '')
      .split(' ')
      .join('-')
    // replace all attribute values surrounded by curly single quotes with double quotes
    const definition = item.definition.replace(/’/g, "'")
    return `\n  <dt>${formattedTerm}</dt>\n  <dd data-quicklook-key="${termKey}">${definition}</dd>`
  })

  // wrap the HTML strings in a <dl> element with a class of "definition-list hidden-definition-list"
  return `<dl class="definition-list hidden-definition-list">${htmlArray.join('')}\n</dl>`
}

async function main() {
  const governanceProject = await lookupProject('Governance docs')
  const definitions = await lookupProjectDefinitions(governanceProject)
  const definitionsHTML = formatDefinitions(definitions)
  fs.writeFileSync('../docs/partials/_glossary-partial.md', definitionsHTML)
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
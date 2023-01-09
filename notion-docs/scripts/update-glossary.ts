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
            does_not_equal: '1 - Drafting',
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

    const definition = page.properties['Definition (HTML)']
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

function stripCurlyQuotes(input: string): string {
  return input
  .replace(/[\u2018\u2019]/g, "'")
  .replace(/[\u201C\u201D]/g, '"');
}

function formatDefinitions(definitions: Definition[]) {
  // sort the array alphabetically by term
  definitions.sort((a, b) => a.term.localeCompare(b.term))

  const htmlArray = definitions.map(item => {
    // strip curlies
    const curliesStripped = stripCurlyQuotes(item.term);
    // remove all non-alphanumeric, non-space, and non-parentheses characters except for "$" and "-" from term
    const formattedTerm = curliesStripped.replace(/[^a-z0-9\s$-()-]/gi, '');
    // remove all non-alphanumeric and non-space characters, convert to lowercase, and replace spaces with hyphens
    const dashDelimitedTermKey = stripCurlyQuotes(item.term)
      .toLowerCase()
      .replace(/[^a-z0-9\s]/gi, '')
      .split(' ')
      .join('-')
    // replace all attribute values surrounded by single quotes with double quotes
    const definition = item.definition.replace(/’/g, "'")
    return `\n  <dt>${formattedTerm}</dt>\n  <dd data-quicklook-key="${dashDelimitedTermKey}">${definition}</dd>`
  })

  // wrap the HTML strings in a <dl> element with a class of "hidden-glossary-list"
  return `<dl class="definition-list hidden-definition-list">${htmlArray.join(
    ''
  )}\n</dl>`
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

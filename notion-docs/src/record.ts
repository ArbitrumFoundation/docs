import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import { LinkValidity } from './format'
import type { Block, Page } from './notion'

export interface Record {
  pageId: string
  url: string
  title: RichTextItemResponse[]
  blocks: Block[]
  status: string | undefined
  publishable: string | undefined
  projects: Set<string>
}

export function recordValidity(
  record: Record,
  project: string
): LinkValidity {
  if (
    record.status != '4 - Continuously publishing' &&
    record.status != '2 - Pending peer review'
  ) {
    return { reason: 'page not yet marked as ready' }
  }
  if (record.publishable != 'Publishable') {
    return { reason: 'page not marked as publishable' }
  }
  if (!record.projects.has(project)) {
    return { reason: 'page is from incorrect project' }
  }
  return 'Valid'
}

export function parseRecordPage(
  page: Page,
  titleTerm: string,
): Record {
  const properties = page.page.properties
  const title = properties[titleTerm]
  if (title.type != 'title') {
    throw new Error('Expected title')
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
  for (const project of projectRelation) {
    projects.add(project.id)
  }

  return {
    pageId: page.page.id,
    title: title.title,
    status: status.status?.name,
    publishable: publishable.select?.name,
    url: page.page.url,
    projects: projects,
    blocks: page.blocks,
  }
}

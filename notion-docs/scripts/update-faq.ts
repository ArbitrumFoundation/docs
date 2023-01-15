import { lookupProject, lookupProjectFAQ } from './notion'
import type { FAQ } from './notion'
import { stripCurlyQuotes, renderBlocks } from './format'

import fs from 'fs'

function organizeFAQ(questions: FAQ[]): Record<string, FAQ[]> {
  let sections: Record<string, FAQ[]> = {}
  for (let question of questions) {
    if (!sections[question.section]) {
      sections[question.section] = []
    }
    sections[question.section].push(question)
  }
  for (let section in sections) {
    sections[section].sort((question1, question2): number => question1.order - question2.order)
  }
  return sections
}

function renderFAQ(faq: FAQ): string {
  let {question, answer} = faq
  if (faq.blocks.length > 0) {
    answer = renderBlocks(faq.blocks)
  }
  let out = ''
  out += `<dt data-displayed-on='dao-glossary'>${stripCurlyQuotes(question)}</dt>\n`
  out += `<dd data-displayed-on='dao-glossary'>${stripCurlyQuotes(answer)}</dd>\n`
  return out
}

function renderFAQs(faqs: FAQ[]): string {
  return`<dl class="definition-list">\n${faqs.map(renderFAQ).join('')}</dl>\n`
}

function renderSections(sections: Record<string, FAQ[]>): string {
  let out = ''
  for (let section in sections) {
      out += `<h3 class="faq-section-title">${stripCurlyQuotes(section)}</h3>\n`
      out += renderFAQs(sections[section])
  }
  return out
}

async function main() {
  const governanceProject = await lookupProject('Governance docs')
  const faqs = await lookupProjectFAQ(governanceProject)
  const sections = organizeFAQ(faqs)
  const sectionsHTML = renderSections(sections)
  fs.writeFileSync('../docs/partials/_faq-partial.md', sectionsHTML)
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })

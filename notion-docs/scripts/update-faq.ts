import { lookupProject, lookupProjectFAQ } from './notion'
import type { FAQ } from './notion'

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

function renderFAQs(faqs: FAQ[]): string {
  let out = '<dl class="definition-list">\n'
  for (let faq of faqs) {
    out += `<dt data-displayed-on='dao-glossary'>${faq.question}</dt>\n`
    out += `<dd data-displayed-on='dao-glossary'>${faq.answer}</dd>\n`
  }
  out += '</dl>\n'
  return out
}

function renderSections(sections: Record<string, FAQ[]>): string {
  let out = ''
  for (let section in sections) {
      out += `<h3 class="faq-section-title">${section}</h3>\n`
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

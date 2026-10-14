export const previewNoticePath = 'content/partials/_draft-expectations-partial.mdx';

const sharedContentNames: Record<string, string> = {
  '_draft-expectations-partial.mdx': 'Public preview notice',
  '_faq-partial.mdx': 'FAQs',
  '_glossary-partial.mdx': 'Glossary',
  '_anatomy-aip-partial.mdx': 'Anatomy of an AIP',
  '_constitution-content-partial.mdx': 'Constitution text',
};

export function sharedContentName(path: string) {
  return sharedContentNames[path.slice(path.lastIndexOf('/') + 1)] ?? 'Shared content';
}

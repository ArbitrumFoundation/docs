import 'server-only';

import siteAnchors from '@/.generated/site-anchors.json';
import { docsPageSchema } from '@/lib/frontmatter-schema';
import { allowedComponentNames } from '@/lib/mdx-component-names';

import { validateDocument } from './validate';

const fieldLabels: Record<string, string> = {
  title: 'Title',
  description: 'Description',
  sidebar_label: 'Sidebar label',
  dao_author: 'Author',
  dao_sme: 'Subject matter expert',
};

function validateFrontmatter(data: unknown) {
  const result = docsPageSchema.safeParse(data ?? {});
  if (result.success) return [];
  return result.error.issues.map((issue) => {
    const field = String(issue.path[0] ?? '');
    return `${fieldLabels[field] ?? field}: ${issue.message.toLowerCase()}.`;
  });
}

export function checkDocument(input: {
  path: string;
  content: string;
  create: boolean;
  repoFiles: ReadonlySet<string>;
}) {
  return validateDocument(input.content, {
    ...input,
    siteAnchors,
    allowedComponents: allowedComponentNames,
    validateFrontmatter,
  });
}

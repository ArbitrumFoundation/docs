import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

import { AddressExplorerLink } from '@/components/mdx/AddressExplorerLink';
import { ConstitutionHash } from '@/components/mdx/ConstitutionHash';
import { Mermaid } from '@/components/mdx/Mermaid';
import { PendingConstitutionNotice } from '@/components/mdx/PendingConstitutionNotice';
import { TrackedLink } from '@/components/mdx/TrackedLink';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    AddressExplorerLink,
    AEL: AddressExplorerLink,
    ConstitutionHash,
    Mermaid,
    PendingConstitutionNotice,
    TrackedLink,
    ...components,
  };
}

export const useMDXComponents = getMDXComponents;

import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

import { AddressExplorerLink } from '@/components/mdx/AddressExplorerLink';
import { ConstitutionHash } from '@/components/mdx/ConstitutionHash';
import { Mermaid } from '@/components/mdx/Mermaid';
import { PendingConstitutionNotice } from '@/components/mdx/PendingConstitutionNotice';
import { TrackedLink } from '@/components/mdx/TrackedLink';
import type { SiteComponentName } from '@/lib/mdx-component-names';

const siteComponents = {
  AddressExplorerLink,
  AEL: AddressExplorerLink,
  ConstitutionHash,
  Mermaid,
  PendingConstitutionNotice,
  TrackedLink,
} satisfies Record<SiteComponentName, unknown>;

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Accordion,
    Accordions,
    Step,
    Steps,
    Tab,
    Tabs,
    ...siteComponents,
    ...components,
  };
}

export const useMDXComponents = getMDXComponents;

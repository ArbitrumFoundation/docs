import {
  emptyComponent,
  fumadocsUiComponents,
  type FileProvider,
  type UiComponentSpec,
} from '@fumadocs-editor/ui';

import glossary from '@/public/glossary.json';
import { pageUrlFromPath } from '@/lib/cms/paths';
import { allowedComponentNames } from '@/lib/mdx-component-names';

import { includeSpec } from './include-spec';

const stepSpec = fumadocsUiComponents.find((spec) => spec.name === 'Step');

// the built in steps block starts with real "Step one" text that typing appends to, so start empty
function withEmptyFirstStep(spec: UiComponentSpec): UiComponentSpec {
  if (spec.name !== 'Steps' || !stepSpec) return spec;
  return {
    ...spec,
    insert: (specs) => ({
      ...emptyComponent(spec, specs),
      content: [emptyComponent(stepSpec, specs)],
    }),
  };
}

// only offer blocks the site can render, so the slash menu cannot break a deploy
export const editorComponents = [
  ...fumadocsUiComponents
    .filter((spec) => allowedComponentNames.has(spec.name))
    .map(withEmptyFirstStep),
  includeSpec,
];

// feeds the [[ link picker with page urls and glossary terms
export function createFileProvider(repoPaths: string[]): FileProvider {
  const pages = repoPaths
    .map(pageUrlFromPath)
    .filter((url): url is string => Boolean(url))
    .sort();
  const terms = Object.keys(glossary).map((key) => `/dao-glossary#${key}`);
  return { list: async () => [...pages, ...terms] };
}

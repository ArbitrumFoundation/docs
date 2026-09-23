'use client';

import {
  emptyComponent,
  fumadocsUiComponents,
  type ComponentRenderProps,
  type UiComponentSpec,
} from '@fumadocs-editor/ui';
import { Share2 } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';

import { previewNoticePath, sharedContentName } from '@/lib/cms/shared-content';

// the path region is rendered inside a non editable wrapper so a stray keystroke cannot break it
function SharedContent({ children }: ComponentRenderProps) {
  const pathRef = useRef<HTMLSpanElement>(null);
  const [name, setName] = useState('Shared content');

  useLayoutEffect(() => {
    setName(sharedContentName(pathRef.current?.textContent?.trim() ?? ''));
  }, [children]);

  return (
    <div
      contentEditable={false}
      className="flex items-center gap-2 rounded-sm border border-dashed bg-fd-muted px-3 py-2 text-sm"
    >
      <Share2 className="size-4 shrink-0 text-fd-primary" />
      <span className="font-medium">{name}</span>
      <span className="text-xs text-fd-muted-foreground">
        shared content, edit it from the Shared content section
      </span>
      <span ref={pathRef} className="sr-only">
        {children}
      </span>
    </div>
  );
}

const builtInclude = fumadocsUiComponents.find((spec) => spec.name === 'include');

export const includeSpec: UiComponentSpec = {
  ...builtInclude!,
  label: 'Public preview notice',
  props: [],
  render: SharedContent,
  insert: (specs) => {
    const component = emptyComponent(includeSpec, specs, [
      { type: 'mdxJsxAttribute', name: 'cwd', value: null },
    ]);
    const region = component.content?.[0];
    if (region) region.content = [{ type: 'text', text: previewNoticePath }];
    return component;
  },
};

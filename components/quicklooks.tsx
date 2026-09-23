'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';

import glossary from '@/public/glossary.json';

type GlossaryEntry = { title: string; text: string };

const terms = glossary as Record<string, GlossaryEntry>;

// any link to a glossary term gets a tooltip with its definition
const glossaryLinkPrefix = '/dao-glossary#';

export function Quicklooks() {
  const pathname = usePathname();

  useEffect(() => {
    const instances = tippy(`a[href^="${glossaryLinkPrefix}"]`, {
      trigger: 'mouseenter focus',
      duration: [100, 200],
      theme: 'light-border',
      allowHTML: true,
      interactive: true,
      content: (reference) => {
        const key = (reference.getAttribute('href') ?? '').slice(glossaryLinkPrefix.length);
        const term = terms[key];
        if (!term) {
          console.warn(`no quicklook entry found for ${key}`);
          return '';
        }
        return term.text;
      },
    });
    return () => {
      for (const instance of instances) instance.destroy();
    };
  }, [pathname]);

  return null;
}

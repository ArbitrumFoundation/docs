import React, { useEffect } from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import Tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';

export const Quicklooks = () => {
  // todo:qqq - document usage of this component for nontechnical content contributors
  const isBrowser = useIsBrowser();

  useEffect(() => {
    if (!isBrowser) {
      return;
    }
    Tippy('a[data-quicklook-from]:not([data-quicklook-enabled])', {
      trigger: 'mouseenter',
      duration: [100, 200],
      theme: 'light-border',
      allowHTML: true,
      interactive: true,
      content: (reference) => {
        reference.setAttribute('data-quicklook-enabled', 'true');
        let contentSourceKey = reference.getAttribute('data-quicklook-from');
        let termItem = document.getElementById(contentSourceKey)
        if (!termItem) {
          return undefined
        }
        let defItem = termItem.nextElementSibling
        let def = document.createElement('div')
        while (defItem && defItem.tagName != 'H3') {
          def.appendChild(defItem.cloneNode(true))
          defItem = defItem.nextElementSibling
        }
        return def
      },
    });
  }, [isBrowser]);

  return <></>;
};

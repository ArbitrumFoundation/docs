import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';

export const Quicklooks = () => {
  // todo:qqq - document usage of this component for nontechnical content contributors
  let renderQuicklooks = function () {
    Tippy('a[data-quicklook-from]:not([data-quicklook-enabled])', {
      trigger: 'mouseenter',
      duration: [100, 200],
      theme: 'light-border',
      allowHTML: true,
      content: (reference) => {
        try {
          reference.setAttribute('data-quicklook-enabled', true);
          let contentSourceKey = reference.getAttribute('data-quicklook-from');
          let sourceContentElement = document.querySelectorAll(`[data-quicklook-key="${contentSourceKey}"]`)[0];
          let html = sourceContentElement.innerHTML;
          return html;
        } catch (e) {
          return null;
        }
      }
    });
  };
  
  return (
    <BrowserOnly>
      {() => {
        renderQuicklooks();
        return;
      }}
    </BrowserOnly>
  )
};

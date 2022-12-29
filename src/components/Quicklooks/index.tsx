import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';

export const Quicklooks = () => {
  // todo:qqq - document usage of this component for nontechnical content contributors
  let renderQuicklooks = function () {
    Tippy('a[data-quicklook-from]', {
      trigger: 'mouseenter',
      duration: [100, 200],
      theme: 'light-border',
      allowHTML: true,
      content: (reference) => {
        let contentSourceKey = reference.getAttribute('data-quicklook-from');
        let sourceContentElement = document.querySelectorAll(`[data-quicklook-key="${contentSourceKey}"]`)[0];
        let html = sourceContentElement.innerHTML;
        return html;
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

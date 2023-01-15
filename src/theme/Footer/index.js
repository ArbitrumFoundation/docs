import React from 'react';
import Footer from '@theme-original/Footer';
import GlossaryPartial from '@site/docs/partials/_glossary-partial.md';
import {Quicklooks} from '@site/src/components/Quicklooks';

export default function FooterWrapper(props) {
  return (
    <>
      <GlossaryPartial />
      <Quicklooks />
      <Footer {...props} />
    </>
  );
}

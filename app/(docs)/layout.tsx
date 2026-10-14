import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';

import { Footer } from '@/components/footer';
import { Quicklooks } from '@/components/quicklooks';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <DocsLayout {...baseOptions()} tree={source.pageTree}>
        {children}
      </DocsLayout>
      <Footer />
      <Quicklooks />
    </>
  );
}

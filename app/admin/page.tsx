import type { Metadata } from 'next';

import { CmsApp } from '@/components/cms/cms-app';

export const metadata: Metadata = {
  title: 'Docs editor',
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <CmsApp />;
}

import { RootProvider } from 'fumadocs-ui/provider/next';
import 'katex/dist/katex.css';
import type { Metadata } from 'next';
import { Suspense, type ReactNode } from 'react';

import { PostHogPageView } from '@/components/providers/posthog-provider';
import { siteName, siteUrl } from '@/lib/site';

import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: `%s | ${siteName}`,
    default: siteName,
  },
  icons: {
    icon: '/img/favicon.ico',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider theme={{ hotKey: false }}>{children}</RootProvider>
        <Suspense fallback={null}>
          <PostHogPageView />
        </Suspense>
      </body>
    </html>
  );
}

'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { initializePostHog, isUntrackedPath, trackPageView } from '@/lib/analytics';

/**
 * Initializes PostHog and sends a $pageview on every route change.
 *
 * Renders nothing and must sit beside the page, inside its own Suspense boundary.
 * Wrapping `children` instead would put the whole page behind useSearchParams's
 * client-side bailout and leave the prerendered HTML empty.
 */
export function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || isUntrackedPath(pathname)) {
      return;
    }

    // Here rather than in a mount effect, so a visit that starts on /admin and
    // then moves to the docs is still initialized.
    initializePostHog();

    // searchParams is a dependency only so a query-string change counts as a new
    // pageview. The SDK reads the URL itself, with ad click IDs masked.
    trackPageView();
  }, [pathname, searchParams]);

  return null;
}

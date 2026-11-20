'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { initializePostHog, trackPageView } from '@/lib/analytics';

/** The CMS editor is staff-only, so its sessions stay out of reader analytics. */
const isUntrackedPath = (pathname: string): boolean =>
  pathname === '/admin' || pathname.startsWith('/admin/');

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

    const search = searchParams?.toString();
    trackPageView({
      url: search ? `${pathname}?${search}` : pathname,
      pathname,
      search_params: searchParams ? Object.fromEntries(searchParams.entries()) : {},
    });
  }, [pathname, searchParams]);

  return null;
}

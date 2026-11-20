'use client';

import type { ReactNode } from 'react';

import { trackEvent } from '@/lib/analytics';

type TrackedLinkProps = {
  href: string;
  trackedEvent?: string;
  children: ReactNode;
};

export function TrackedLink({ href, trackedEvent, children }: TrackedLinkProps) {
  return (
    <a
      href={href}
      onClick={() => {
        if (trackedEvent) trackEvent('tracked_link_clicked', { name: trackedEvent, href });
      }}
    >
      {children}
    </a>
  );
}

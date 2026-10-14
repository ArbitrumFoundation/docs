'use client';

import type { ReactNode } from 'react';

declare global {
  interface Window {
    fathom?: { trackEvent: (name: string) => void };
  }
}

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
        if (trackedEvent) window.fathom?.trackEvent(trackedEvent);
      }}
    >
      {children}
    </a>
  );
}

// @vitest-environment jsdom
// @vitest-environment-options {"url": "https://docs.arbitrum.foundation/foundation-documents?gclid=CLICKID123&fbclid=FB456&q=hello"}
/**
 * Runs the helpers the site calls (initializePostHog, trackPageView, trackEvent)
 * against the real posthog-js SDK and inspects the events after `before_send`.
 * analytics.sdk.spec.ts captures on named instances directly, so it cannot see
 * properties these helpers add. This file has its own default instance because
 * `posthog.init` only takes effect once per module.
 */
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import posthog from 'posthog-js';
import type { CaptureResult } from 'posthog-js';
import { initializePostHog, isUntrackedPath, trackEvent, trackPageView } from './analytics';

const RAW_CLICK_IDS = ['CLICKID123', 'FB456'];

const createStorage = () => {
  const store = new Map<string, string>();
  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => void store.set(key, value),
    removeItem: (key: string) => void store.delete(key),
    clear: () => store.clear(),
  };
};

let sent: CaptureResult[] = [];

describe('analytics helpers with the real SDK', () => {
  beforeAll(() => {
    vi.stubGlobal('localStorage', createStorage());
    vi.stubGlobal('sessionStorage', createStorage());
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('{}', { status: 200 }))
    );
    vi.spyOn(XMLHttpRequest.prototype, 'send').mockImplementation(() => {});
    process.env.NEXT_PUBLIC_POSTHOG_KEY = 'phc_helpers_test';

    initializePostHog();
    posthog.on('eventCaptured', (event: CaptureResult) => {
      sent.push(event);
    });
  });

  beforeEach(() => {
    sent = [];
  });

  afterAll(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('sends a pageview with ad click IDs masked', () => {
    trackPageView();

    const view = sent.find((event) => event.event === '$pageview');
    expect(view).toBeDefined();
    const properties = view?.properties ?? {};

    expect(properties.$pathname).toBe('/foundation-documents');
    expect(properties.$current_url).toContain('gclid=<masked>');
    expect(properties.$current_url).toContain('fbclid=<masked>');
    // Other query parameters stay readable.
    expect(properties.$current_url).toContain('q=hello');

    const payload = JSON.stringify(properties);
    for (const id of RAW_CLICK_IDS) {
      expect(payload).not.toContain(id);
    }
  });

  it('stays quiet when a route change initializes again', () => {
    // posthog-js answers a repeat init on the default instance with a bare
    // console.warn, and PostHogPageView calls initializePostHog on every route change.
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    initializePostHog();
    trackPageView();

    expect(warn).not.toHaveBeenCalled();
    expect(sent.filter((event) => event.event === '$pageview')).toHaveLength(1);
    warn.mockRestore();
  });

  it('sends tracked_link_clicked with the link name and href', () => {
    trackEvent('tracked_link_clicked', {
      name: 'download 2025 Transparency Report',
      href: '/assets/ArbitrumFoundationTransparencyReport2025.pdf',
    });

    const click = sent.find((event) => event.event === 'tracked_link_clicked');
    expect(click).toBeDefined();
    const properties = click?.properties ?? {};

    expect(properties.name).toBe('download 2025 Transparency Report');
    expect(properties.href).toBe('/assets/ArbitrumFoundationTransparencyReport2025.pdf');
    expect(properties.distinct_id).toBe('$posthog_cookieless');
    expect(properties.$process_person_profile).toBe(false);

    const payload = JSON.stringify(properties);
    for (const id of RAW_CLICK_IDS) {
      expect(payload).not.toContain(id);
    }
  });
});

describe('isUntrackedPath', () => {
  it('excludes the CMS editor and everything under it', () => {
    expect(isUntrackedPath('/admin')).toBe(true);
    expect(isUntrackedPath('/admin/')).toBe(true);
    expect(isUntrackedPath('/admin/content/docs/page.mdx')).toBe(true);
  });

  it('tracks docs pages, including ones that only start with the same letters', () => {
    expect(isUntrackedPath('/')).toBe(false);
    expect(isUntrackedPath('/foundation-documents')).toBe(false);
    expect(isUntrackedPath('/administrator-guide')).toBe(false);
  });
});

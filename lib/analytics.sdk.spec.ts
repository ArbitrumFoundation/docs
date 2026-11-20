// @vitest-environment jsdom
/**
 * Runs the real posthog-js SDK against the production config, with the network
 * stubbed out, and inspects the final payloads after `before_send`. The unit
 * tests in analytics.test.ts mock the SDK, so they cannot catch properties the
 * SDK adds on its own (page-leave scroll depth, for example).
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import posthog from 'posthog-js';
import type { CaptureResult, PostHog } from 'posthog-js';
import {
  POSTHOG_CONFIG,
  POSTHOG_DEVICE_PROPERTY_DENYLIST,
  POSTHOG_DEVICE_PROPERTY_PATTERN,
  POSTHOG_SCROLL_PROPERTY_DENYLIST,
} from './analytics';

/** Minimal Storage stand-in; vitest's jsdom exposes no window.localStorage on Node 26. */
const createStorage = () => {
  const store = new Map<string, string>();
  return {
    store,
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => void store.set(key, value),
    removeItem: (key: string) => void store.delete(key),
    clear: () => store.clear(),
  };
};

const SCROLL_KEYS = POSTHOG_SCROLL_PROPERTY_DENYLIST;

const VIEWPORT_KEYS = ['$viewport_height', '$viewport_width', '$screen_height', '$screen_width'];

let sent: CaptureResult[];
let localStore: ReturnType<typeof createStorage>;
let sessionStore: ReturnType<typeof createStorage>;
let instanceCounter = 0;

/** Initialise a fresh named instance; `posthog.init` is a no-op when re-run on the default one. */
const initRealSdk = (): PostHog => {
  const configured = POSTHOG_CONFIG.before_send;
  const chain = Array.isArray(configured) ? configured : configured ? [configured] : [];
  const record = (event: CaptureResult | null) => {
    if (event) sent.push(event);
    return event;
  };
  const instance = posthog.init(
    'phc_sdk_test',
    { ...POSTHOG_CONFIG, before_send: [...chain, record] },
    `sdk-test-${instanceCounter++}`
  );
  if (!instance) throw new Error('posthog.init returned no instance');
  return instance;
};

const nextTick = () => new Promise((resolve) => setTimeout(resolve, 20));

describe('posthog-js with the production config', () => {
  beforeEach(() => {
    sent = [];
    localStore = createStorage();
    sessionStore = createStorage();
    vi.stubGlobal('localStorage', localStore);
    vi.stubGlobal('sessionStorage', sessionStore);
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response('{}', { status: 200 }))
    );
    vi.spyOn(XMLHttpRequest.prototype, 'send').mockImplementation(() => {});
    Object.defineProperty(navigator, 'sendBeacon', {
      value: vi.fn(() => true),
      configurable: true,
    });
    // Simulate a 900px-tall viewport on a 3000px document. jsdom has no layout,
    // so these are the values the SDK's scroll manager would otherwise read.
    Object.defineProperty(document.documentElement, 'clientHeight', {
      value: 900,
      configurable: true,
    });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 3000,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('sends a pageview with no device, browser, OS, screen or locale properties', () => {
    const instance = initRealSdk();

    instance.capture('$pageview');

    const view = sent.find((event) => event.event === '$pageview');
    expect(view).toBeDefined();
    const properties = view?.properties ?? {};

    // Sanity check that the SDK really did build a full event before filtering.
    expect(properties.$lib).toBe('web');
    expect(properties.$pathname).toBe('/');
    expect(properties.distinct_id).toBe('$posthog_cookieless');
    expect(properties.$process_person_profile).toBe(false);
    expect(properties.$geoip_disable).toBe(true);

    // Cookieless ingestion hashes IP + user agent + host and drops events that
    // lack the user agent, so it has to survive the denylist and before_send.
    expect(properties.$cookieless_mode).toBe(true);
    expect(typeof properties.$raw_user_agent).toBe('string');
    expect(properties.$raw_user_agent).not.toBe('');

    for (const key of [...POSTHOG_DEVICE_PROPERTY_DENYLIST, ...POSTHOG_SCROLL_PROPERTY_DENYLIST]) {
      expect(properties).not.toHaveProperty(key);
    }
    expect(
      Object.keys(properties).filter((key) => POSTHOG_DEVICE_PROPERTY_PATTERN.test(key))
    ).toEqual([]);
    expect(properties).not.toHaveProperty('$set');
    expect(properties).not.toHaveProperty('$set_once');
  });

  it('leaves no data in cookies, localStorage or sessionStorage', async () => {
    const instance = initRealSdk();

    instance.capture('$pageview');
    await nextTick();
    instance.capture('$pageleave');
    await nextTick();

    expect(sent.length).toBeGreaterThanOrEqual(2);
    expect(document.cookie).toBe('');
    // The SDK's toolbar extension probes localStorage on init by writing a `test`
    // key and removing it straight away; nothing may remain once init has finished.
    expect([...localStore.store.keys()]).toEqual([]);
    expect([...sessionStore.store.keys()]).toEqual([]);
  });

  it('does not disclose the viewport height through page-leave scroll properties', async () => {
    const instance = initRealSdk();

    instance.capture('$pageview');
    // The SDK samples scroll position on the tick after a pageview and again on
    // scroll/resize; with scroll properties enabled either path exposes clientHeight.
    await nextTick();
    window.dispatchEvent(new Event('scroll'));
    window.dispatchEvent(new Event('resize'));
    instance.capture('$pageleave');

    const leave = sent.find((event) => event.event === '$pageleave');
    expect(leave).toBeDefined();
    const properties = leave?.properties ?? {};

    // The event still describes the previous pageview, so the assertion is exercising
    // the code path that would have attached scroll depth.
    expect(properties.$prev_pageview_pathname).toBe('/');
    expect(properties).toHaveProperty('$prev_pageview_duration');

    for (const key of [...SCROLL_KEYS, ...VIEWPORT_KEYS]) {
      expect(properties).not.toHaveProperty(key);
    }
    expect(JSON.stringify(properties)).not.toContain('900');
  });

  it('keeps a subsequent pageview free of scroll and viewport properties', async () => {
    const instance = initRealSdk();

    instance.capture('$pageview');
    await nextTick();
    instance.capture('$pageview');

    const second = sent.filter((event) => event.event === '$pageview')[1];
    expect(second).toBeDefined();
    for (const key of [...SCROLL_KEYS, ...VIEWPORT_KEYS]) {
      expect(second?.properties).not.toHaveProperty(key);
    }
  });
});

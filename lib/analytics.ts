/**
 * PostHog analytics for the Arbitrum DAO docs site.
 *
 * Privacy posture (GDPR), same as arbitrum-hackerhouse (`lib/analytics.ts`):
 * - Cookieless mode: PostHog leaves no data in cookies, localStorage or sessionStorage.
 *   Visitors are counted via a daily-rotating hash computed on PostHog's servers.
 *   (The SDK's toolbar extension still probes localStorage on init by writing a
 *   `test` key and deleting it immediately; no config option disables that probe.)
 * - No person profiles are created and identify() is intentionally not exposed.
 * - Device, browser, OS, screen, timezone and language properties are stripped both
 *   via `property_denylist` and a `before_send` filter.
 * - User-Agent Client Hints are not requested (`disableDeviceModel`), and ad-network
 *   click IDs are masked out of captured URLs (`mask_personal_data_properties`).
 * - Scroll-depth measurement is off: its raw pixel values include the scrolling
 *   element's clientHeight, which would disclose the viewport height on $pageleave.
 * - GeoIP enrichment is disabled per event via `$geoip_disable`.
 * - Do Not Track is not treated as an opt-out. Cookieless mode already stores no
 *   identifier, and posthog-js ignores `respect_dnt` when `cookieless_mode` is
 *   "always" (`is_capturing()` returns true before consent is consulted).
 *
 * Two PostHog project settings must also be enabled by hand:
 * 1. Web analytics > "Cookieless server hash mode" (otherwise events are dropped).
 * 2. Data capture > "Discard client IP data" ($ip is attached server-side).
 */
import posthog from 'posthog-js';
import type { BeforeSendFn, PostHogConfig } from 'posthog-js';

/** Custom events this site sends, besides $pageview and $pageleave. */
export type AnalyticsEventType = 'tracked_link_clicked';

/**
 * Device, locale and timezone properties PostHog collects by default. They are
 * dropped client-side before any event leaves the browser.
 */
export const POSTHOG_DEVICE_PROPERTY_DENYLIST: readonly string[] = [
  // Hardware and screen
  '$device',
  '$device_type',
  '$device_model',
  '$screen_height',
  '$screen_width',
  '$viewport_height',
  '$viewport_width',
  // OS and browser fingerprint
  '$os',
  '$os_name',
  '$os_version',
  '$browser',
  '$browser_version',
  '$browser_type',
  // Locale and timezone
  '$browser_language',
  '$browser_language_prefix',
  '$timezone',
  '$timezone_offset',
];

/**
 * Scroll-depth values PostHog attaches to $pageleave and the following $pageview.
 * Their raw pixel values embed the viewport height (scrollY + clientHeight).
 * `disable_scroll_properties` stops them at source; this is the backstop.
 */
export const POSTHOG_SCROLL_PROPERTY_DENYLIST: readonly string[] = [
  '$prev_pageview_last_scroll',
  '$prev_pageview_last_scroll_percentage',
  '$prev_pageview_max_scroll',
  '$prev_pageview_max_scroll_percentage',
  '$prev_pageview_last_content',
  '$prev_pageview_last_content_percentage',
  '$prev_pageview_max_content',
  '$prev_pageview_max_content_percentage',
];

/**
 * Catches device properties a future posthog-js may add under a family we already
 * deny above, so the denylist does not silently go stale on SDK upgrades.
 * Deliberately excludes `raw_user_agent` (required for the cookieless hash) and
 * `geoip` (`$geoip_disable` is a flag we send).
 */
export const POSTHOG_DEVICE_PROPERTY_PATTERN = /^\$(?:screen|viewport|device|os|browser|timezone)/;

/**
 * Runs last, after property_denylist and after $set/$set_once are built.
 * Must never throw: posthog-js drops the event entirely if it does.
 */
export const sanitizePostHogEvent: BeforeSendFn = (event) => {
  if (!event?.properties) {
    return event;
  }

  for (const key of Object.keys(event.properties)) {
    if (POSTHOG_DEVICE_PROPERTY_PATTERN.test(key)) {
      delete event.properties[key];
    }
  }

  return event;
};

/**
 * Shared PostHog configuration. Exported so tests can assert the privacy posture.
 */
export const POSTHOG_CONFIG: Partial<PostHogConfig> = {
  // US Cloud ingestion host. Set NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com for EU Cloud.
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',

  // Cookieless: no cookies, no localStorage, no sessionStorage.
  cookieless_mode: 'always',
  persistence: 'memory',
  disable_persistence: true,
  person_profiles: 'never',

  // Device information is never captured; the user agent stays for the cookieless hash.
  property_denylist: [...POSTHOG_DEVICE_PROPERTY_DENYLIST, ...POSTHOG_SCROLL_PROPERTY_DENYLIST],
  before_send: sanitizePostHogEvent,
  // Do not request User-Agent Client Hints, which the SDK uses to derive $device_model.
  disableDeviceModel: true,
  // Mask ad-network click IDs (gclid, fbclid, ...) inside captured URLs.
  mask_personal_data_properties: true,

  // Manual, explicit tracking only.
  autocapture: false,
  capture_pageview: false,
  capture_pageleave: true,
  // Never measure scroll position; the values would leak the viewport height.
  disable_scroll_properties: true,

  // Features that persist state or ship extra device data are off.
  disable_session_recording: true,
  disable_surveys: true,
  disable_web_experiments: true,
  disable_external_dependency_loading: true,
  capture_performance: false,
  capture_heatmaps: false,
  capture_dead_clicks: false,
  advanced_disable_flags: true,
  advanced_disable_toolbar_metrics: true,

  loaded: (instance) => {
    // Ask PostHog not to derive location from the request IP.
    instance.register({ $geoip_disable: true });
    // Dev-only console logging. Note: debug mode writes a `ph_debug` key to
    // localStorage, which is why it is limited to local development.
    if (process.env.NODE_ENV === 'development') {
      instance.debug();
    }
  },
};

/**
 * Initialize the PostHog client. PostHogPageView calls this on every route
 * change, so it must be a no-op once the SDK is loaded: posthog-js answers a
 * repeat init on the default instance with a console.warn.
 */
export const initializePostHog = () => {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY && !posthog.__loaded) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, POSTHOG_CONFIG);
  }
};

/**
 * Track custom events
 */
export const trackEvent = (
  eventName: AnalyticsEventType,
  properties?: Record<string, string | number | boolean | null | undefined>
) => {
  if (typeof window !== 'undefined') {
    posthog.capture(eventName, properties);
  }
};

/** The CMS editor is staff-only, so its sessions stay out of reader analytics. */
export const isUntrackedPath = (pathname: string): boolean =>
  pathname === '/admin' || pathname.startsWith('/admin/');

/**
 * Track page views.
 *
 * Takes no properties on purpose. The SDK reads the URL itself and masks ad click
 * IDs in it; a caller-supplied $current_url or query string would override that
 * masking and send the raw values.
 */
export const trackPageView = () => {
  if (typeof window !== 'undefined') {
    posthog.capture('$pageview');
  }
};

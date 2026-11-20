// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { CaptureResult } from 'posthog-js';

const { init, register, debug } = vi.hoisted(() => ({
  init: vi.fn(),
  register: vi.fn(),
  debug: vi.fn(),
}));

vi.mock('posthog-js', () => ({
  default: { init, capture: vi.fn(), reset: vi.fn() },
}));

import {
  POSTHOG_CONFIG,
  POSTHOG_DEVICE_PROPERTY_DENYLIST,
  POSTHOG_DEVICE_PROPERTY_PATTERN,
  POSTHOG_SCROLL_PROPERTY_DENYLIST,
  initializePostHog,
  sanitizePostHogEvent,
} from './analytics';

const makeEvent = (properties: Record<string, unknown>): CaptureResult =>
  ({
    uuid: 'test-uuid',
    event: '$pageview',
    properties,
  }) as CaptureResult;

describe('PostHog privacy configuration', () => {
  beforeEach(() => {
    init.mockClear();
    register.mockClear();
    process.env.NEXT_PUBLIC_POSTHOG_KEY = 'phc_test';
  });

  it('runs in cookieless mode with no browser persistence', () => {
    expect(POSTHOG_CONFIG.cookieless_mode).toBe('always');
    expect(POSTHOG_CONFIG.persistence).toBe('memory');
    expect(POSTHOG_CONFIG.disable_persistence).toBe(true);
    expect(POSTHOG_CONFIG).not.toHaveProperty('cross_subdomain_cookie');
  });

  it('never creates person profiles', () => {
    expect(POSTHOG_CONFIG.person_profiles).toBe('never');
  });

  it('denylists every device, browser, OS, screen and locale property', () => {
    const required = [
      '$browser',
      '$browser_version',
      '$browser_language',
      '$os',
      '$os_version',
      '$device_type',
      '$screen_width',
      '$screen_height',
      '$viewport_width',
      '$viewport_height',
      '$timezone',
    ];
    for (const key of required) {
      expect(POSTHOG_CONFIG.property_denylist).toContain(key);
    }
    expect(POSTHOG_CONFIG.property_denylist).toEqual([
      ...POSTHOG_DEVICE_PROPERTY_DENYLIST,
      ...POSTHOG_SCROLL_PROPERTY_DENYLIST,
    ]);
  });

  it('keeps the user agent, which the cookieless server hash requires', () => {
    // PostHog ingestion drops cookieless events without $raw_user_agent and
    // deletes the property after computing the daily hash.
    expect(POSTHOG_CONFIG.property_denylist).not.toContain('$raw_user_agent');
    expect(POSTHOG_DEVICE_PROPERTY_PATTERN.test('$raw_user_agent')).toBe(false);
  });

  it("uses the portal's sanitizer and masking options", () => {
    expect(POSTHOG_CONFIG.before_send).toBe(sanitizePostHogEvent);
    expect(POSTHOG_CONFIG.disableDeviceModel).toBe(true);
    expect(POSTHOG_CONFIG.mask_personal_data_properties).toBe(true);
  });

  it('disables features that store state or ship device data', () => {
    expect(POSTHOG_CONFIG.autocapture).toBe(false);
    expect(POSTHOG_CONFIG.disable_scroll_properties).toBe(true);
    expect(POSTHOG_CONFIG.disable_session_recording).toBe(true);
    expect(POSTHOG_CONFIG.disable_surveys).toBe(true);
    expect(POSTHOG_CONFIG.capture_heatmaps).toBe(false);
    expect(POSTHOG_CONFIG.capture_dead_clicks).toBe(false);
    expect(POSTHOG_CONFIG.capture_performance).toBe(false);
    expect(POSTHOG_CONFIG.advanced_disable_flags).toBe(true);
  });

  it('does not claim Do Not Track support the SDK cannot honour in cookieless mode', () => {
    // posthog-js short-circuits is_capturing() to true when cookieless_mode is
    // "always", so respect_dnt would be inert. Leave it out rather than imply it works.
    expect(POSTHOG_CONFIG).not.toHaveProperty('respect_dnt');
  });

  it('passes the privacy config to posthog.init and disables GeoIP on load', () => {
    initializePostHog();

    expect(init).toHaveBeenCalledTimes(1);
    const [key, config] = init.mock.calls[0];
    expect(key).toBe('phc_test');
    expect(config).toBe(POSTHOG_CONFIG);

    config.loaded({ register, debug });
    expect(register).toHaveBeenCalledWith({ $geoip_disable: true });
    // NODE_ENV is "test" under vitest, so dev-only debug logging stays off.
    expect(debug).not.toHaveBeenCalled();
  });

  it('does not initialise without a project key', () => {
    delete process.env.NEXT_PUBLIC_POSTHOG_KEY;
    initializePostHog();
    expect(init).not.toHaveBeenCalled();
  });
});

describe('sanitizePostHogEvent', () => {
  it('removes every denylisted device, browser and timezone property', () => {
    const properties = Object.fromEntries(
      POSTHOG_DEVICE_PROPERTY_DENYLIST.map((key) => [key, 'value'])
    );

    const result = sanitizePostHogEvent(makeEvent({ ...properties, $current_url: 'x' }));

    expect(result?.properties).toEqual({ $current_url: 'x' });
  });

  it('removes properties in a denied family that are not listed explicitly', () => {
    const result = sanitizePostHogEvent(
      makeEvent({
        $device_id: null,
        $browser_type: 'browser',
        $screen_dpi: 2,
        $lib: 'web',
      })
    );

    expect(result?.properties).toEqual({ $lib: 'web' });
  });

  it('keeps properties cookieless mode and page analytics rely on', () => {
    const properties = {
      $current_url: 'https://docs.arbitrum.foundation/?gclid=<masked>',
      $pathname: '/',
      $host: 'docs.arbitrum.foundation',
      $raw_user_agent: 'Mozilla/5.0',
      $cookieless_mode: true,
      $geoip_disable: true,
      $lib: 'web',
      $lib_version: '1.427.3',
      distinct_id: '$posthog_cookieless',
      custom_property: 'kept',
    };

    const result = sanitizePostHogEvent(makeEvent({ ...properties }));

    expect(result?.properties).toEqual(properties);
  });

  it('returns the input unchanged when there is nothing to sanitize', () => {
    // The SDK's type says the event is never null; the sanitizer tolerates it anyway.
    expect(sanitizePostHogEvent(null as unknown as CaptureResult)).toBeNull();

    const withoutProperties = { uuid: 'u', event: 'e' } as CaptureResult;
    expect(sanitizePostHogEvent(withoutProperties)).toBe(withoutProperties);
  });
});

describe('POSTHOG_DEVICE_PROPERTY_PATTERN', () => {
  it('covers every entry in the explicit device denylist', () => {
    for (const key of POSTHOG_DEVICE_PROPERTY_DENYLIST) {
      expect(POSTHOG_DEVICE_PROPERTY_PATTERN.test(key), key).toBe(true);
    }
  });

  it('does not match unrelated PostHog properties', () => {
    for (const key of [
      '$current_url',
      '$pathname',
      '$referrer',
      '$raw_user_agent',
      '$geoip_disable',
      '$lib',
    ]) {
      expect(POSTHOG_DEVICE_PROPERTY_PATTERN.test(key), key).toBe(false);
    }
  });
});

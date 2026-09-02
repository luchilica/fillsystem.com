// Captures Google Ads click identifiers and UTM/ad parameters from the landing
// URL and persists them in sessionStorage. The form reads them at submission
// time, so navigating away from the landing page doesn't lose attribution data.

const STORAGE_KEY = "fs_ads_tracking";

const TRACKED_PARAMS = [
  "gclid", "gbraid", "wbraid",
  "utm_source", "utm_medium", "utm_campaign", "utm_adgroup",
  "utm_term", "utm_content",
  "matchtype", "device", "network",
];

export interface AdsTrackingParams {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_adgroup?: string;
  utm_term?: string;
  utm_content?: string;
  matchtype?: string;
  device?: string;
  network?: string;
  landing_page?: string;
  first_touch?: string;
}

export function captureAdsParams(): void {
  if (typeof window === "undefined") return;

  const url = new URLSearchParams(window.location.search);
  const found: Record<string, string> = {};
  let hasAdsParam = false;

  for (const key of TRACKED_PARAMS) {
    const val = url.get(key);
    if (val) {
      found[key] = val;
      hasAdsParam = true;
    }
  }

  if (!hasAdsParam) return;

  found.landing_page = window.location.pathname;
  found.first_touch = new Date().toISOString();

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {
    // sessionStorage unavailable
  }
}

export function getAdsTrackingParams(): AdsTrackingParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

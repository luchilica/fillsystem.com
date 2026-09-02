// Analytics and ads tracking abstraction.
//
// GA4 and Google Ads load ONLY after consent, never in preview, and only when
// their respective env vars are set. Until all gates pass, every export is a
// no-op. No analytics library is bundled — gtag.js loads from the CDN.
//
// Consent Mode v2: defaults are set to "denied" for all four signals before any
// Google script loads, then updated to "granted" when the visitor accepts.

import { ANALYTICS_ENABLED, hasAnalyticsConsent } from "./consent";

const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "";
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";
const GOOGLE_ADS_CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL || "";

const GA4_SCRIPT_ID = "ga4-script";
const GADS_SCRIPT_ID = "gads-script";

const PII_KEY_FRAGMENTS = [
  "email",
  "name",
  "company",
  "challenge",
  "phone",
  "password",
];

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type AnalyticsEvent =
  | "cta_click"
  | "nav_anchor_click"
  | "faq_item_open"
  | "service_card_open"
  | "form_start"
  | "form_submit_attempt"
  | "form_validation_error"
  | "form_submit_success"
  | "form_submit_error";

// ---------------------------------------------------------------------------
// gtag bootstrap — creates the dataLayer stub without loading any script
// ---------------------------------------------------------------------------

function ensureGtag(): void {
  if (typeof window === "undefined") return;
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer!.push(args);
  };
}

// ---------------------------------------------------------------------------
// Consent Mode v2
// ---------------------------------------------------------------------------

export function setConsentDefaults(): void {
  if (typeof window === "undefined") return;
  ensureGtag();
  window.gtag!("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_personalization: "denied",
    ad_user_data: "denied",
    wait_for_update: 500,
  });
}

export function updateConsentGranted(): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "granted",
    ad_personalization: "granted",
    ad_user_data: "granted",
  });
}

export function updateConsentDenied(): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_personalization: "denied",
    ad_user_data: "denied",
  });
}

// ---------------------------------------------------------------------------
// Gate checks
// ---------------------------------------------------------------------------

export function isAnalyticsReady(): boolean {
  return (
    ANALYTICS_ENABLED &&
    GA4_MEASUREMENT_ID !== "" &&
    hasAnalyticsConsent()
  );
}

export function isAdsConfigured(): boolean {
  return GOOGLE_ADS_ID !== "" && GOOGLE_ADS_CONVERSION_LABEL !== "";
}

// ---------------------------------------------------------------------------
// GA4
// ---------------------------------------------------------------------------

export function loadGA4(): void {
  if (!isAnalyticsReady()) return;
  if (typeof window === "undefined") return;
  if (document.getElementById(GA4_SCRIPT_ID)) return;

  ensureGtag();

  const script = document.createElement("script");
  script.id = GA4_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.gtag!("js", new Date());
  window.gtag!("config", GA4_MEASUREMENT_ID, {
    send_page_view: true,
    cookie_flags: "SameSite=Lax;Secure",
  });
}

export function unloadGA4(): void {
  if (typeof window === "undefined") return;

  document.getElementById(GA4_SCRIPT_ID)?.remove();
  document.getElementById(GADS_SCRIPT_ID)?.remove();

  if (window.gtag) {
    try {
      updateConsentDenied();
    } catch {
      /* silent */
    }
  }

  window.dataLayer = [];
  delete window.gtag;
}

// ---------------------------------------------------------------------------
// Google Ads
// ---------------------------------------------------------------------------

export function loadGoogleAds(): void {
  if (!GOOGLE_ADS_ID) return;
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;

  ensureGtag();

  // gtag.js is shared — only load a second script if GA4 didn't already load one
  if (
    !document.getElementById(GA4_SCRIPT_ID) &&
    !document.getElementById(GADS_SCRIPT_ID)
  ) {
    const script = document.createElement("script");
    script.id = GADS_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
    document.head.appendChild(script);
    window.gtag!("js", new Date());
  }

  window.gtag!("config", GOOGLE_ADS_ID, {
    allow_enhanced_conversions: true,
  });
}

// Fire a Google Ads conversion. Enhanced Conversions: gtag hashes the email
// client-side before sending it to Google.
export function trackConversion(email?: string): void {
  if (!GOOGLE_ADS_ID || !GOOGLE_ADS_CONVERSION_LABEL) return;
  if (typeof window === "undefined" || !window.gtag) return;

  if (email) {
    window.gtag("set", "user_data", {
      email: email.trim().toLowerCase(),
    });
  }

  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}`,
  });
}

// ---------------------------------------------------------------------------
// GA4 event tracking
// ---------------------------------------------------------------------------

function sanitizeParams(
  params: Record<string, string>,
): Record<string, string> {
  const safe: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    const lower = key.toLowerCase();
    if (PII_KEY_FRAGMENTS.some((fragment) => lower.includes(fragment))) continue;
    safe[key] = value;
  }
  return safe;
}

export function trackEvent(
  event: AnalyticsEvent,
  params?: Record<string, string>,
): void {
  try {
    if (!isAnalyticsReady() || typeof window === "undefined" || !window.gtag) {
      return;
    }
    window.gtag("event", event, params ? sanitizeParams(params) : {});
  } catch {
    /* silent */
  }
}

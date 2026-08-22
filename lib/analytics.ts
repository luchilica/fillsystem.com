// Analytics abstraction. GA4 loads ONLY after consent, never in preview, and
// only when a Measurement ID is provided. Until all gates pass, every export is
// a no-op. No analytics library is bundled — gtag.js loads from the CDN at
// activation. Spec: docs/optimization.md (Analytics), docs/development-plan.md
// (Этап 12). Analytics must never throw into the app — all failures are silent.

import { ANALYTICS_ENABLED, hasAnalyticsConsent } from "./consent";

// The only NEXT_PUBLIC_ value — gtag.js runs client-side. EMPTY in preview
// (env var unset), which keeps the gate closed. Never hardcode an ID.
const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || "";

const GA4_SCRIPT_ID = "ga4-script";

// Param keys containing any of these substrings are dropped before sending.
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

// All gates must pass before GA4 may load or any event may be sent.
// Preview check: GA4_MEASUREMENT_ID is empty in preview (env var unset),
// so the empty-string gate handles it without needing the server-only siteConfig.
export function isAnalyticsReady(): boolean {
  return (
    ANALYTICS_ENABLED &&
    GA4_MEASUREMENT_ID !== "" &&
    hasAnalyticsConsent()
  );
}

export function loadGA4(): void {
  if (!isAnalyticsReady()) return;
  if (typeof window === "undefined") return;
  if (window.gtag) return; // already loaded

  const script = document.createElement("script");
  script.id = GA4_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  const gtag = (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA4_MEASUREMENT_ID, {
    send_page_view: true,
    cookie_flags: "SameSite=Lax;Secure",
  });

  // Basic Consent Mode. This function only runs after consent is confirmed, so
  // default-denied is updated to granted immediately.
  gtag("consent", "default", { analytics_storage: "denied" });
  gtag("consent", "update", { analytics_storage: "granted" });
}

export function unloadGA4(): void {
  if (typeof window === "undefined" || !window.gtag) return;

  try {
    window.gtag("consent", "update", { analytics_storage: "denied" });
  } catch {
    /* silent — analytics must never break the site */
  }

  document.getElementById(GA4_SCRIPT_ID)?.remove();
  window.dataLayer = [];
  delete window.gtag;
}

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
      return; // no-op until activated + consented
    }
    window.gtag("event", event, params ? sanitizeParams(params) : {});
  } catch {
    /* silent — analytics must never break the site */
  }
}

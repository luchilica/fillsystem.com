// Cookie-consent preference storage + activation flag.
// Infrastructure for future GA4 activation (development-plan.md → Этап 8 consent
// foundation, Этап 12 analytics activation). NO analytics is loaded from here.

export type ConsentPreference = "accepted" | "declined" | null;

export const CONSENT_STORAGE_KEY = "opsfield_analytics_consent";

// Same-tab change notification. The `storage` event only fires in *other* tabs,
// so we broadcast our own event whenever the stored preference changes, letting
// the banner (an external-store subscriber) re-read it.
export const CONSENT_CHANGE_EVENT = "opsfield:consent-change";

// Master switch for ANALYTICS (GA4 loading + event tracking).
// Requires NEXT_PUBLIC_GA4_MEASUREMENT_ID to be set in Vercel env vars.
export const ANALYTICS_ENABLED = true;

// Whether the consent UI (banner + footer reopener) is shown. Decoupled from
// ANALYTICS_ENABLED on purpose: we capture the visitor's choice now while GA4
// stays dormant — showing the banner must NOT imply analytics is live. When GA4
// is activated later (flip ANALYTICS_ENABLED + set the id + production), the
// already-stored "accepted" choice makes it load; "declined" keeps it off.
export const CONSENT_UI_ENABLED = true;

export function getConsentPreference(): ConsentPreference {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    // localStorage unavailable (SSR, private mode, blocked) — treat as no choice.
    return null;
  }
}

function notifyConsentChange(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

export function setConsentPreference(pref: "accepted" | "declined"): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, pref);
  } catch {
    // Fail silently — consent simply will not persist this session.
  }
  notifyConsentChange();
}

export function clearConsentPreference(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // Fail silently.
  }
  notifyConsentChange();
}

export function hasAnalyticsConsent(): boolean {
  return getConsentPreference() === "accepted";
}

// External-store subscription for useSyncExternalStore: re-read on same-tab
// changes and on cross-tab `storage` events.
export function subscribeConsent(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

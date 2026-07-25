"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Link } from "@/i18n/navigation";
import { Cookie } from "lucide-react";
import Button from "@/components/ui/Button";
import {
  CONSENT_UI_ENABLED,
  getConsentPreference,
  setConsentPreference,
  subscribeConsent,
} from "@/lib/consent";
import { useT } from "@/i18n/useT";
import styles from "./CookieConsent.module.css";

// Cookie consent — floating card shown on first entry until a choice is stored.
// Non-modal (does not block the page). Analytics (GA4) is loaded elsewhere and
// stays dormant until ANALYTICS_ENABLED is flipped; here we only capture the
// choice. Storage is binary ("accepted"/"declined"); the Manage panel's analytics
// toggle maps on -> accepted, off -> declined.
export default function CookieConsent() {
  const t = useT();
  const bannerRef = useRef<HTMLDivElement>(null);
  const [manage, setManage] = useState(false);
  const [analytics, setAnalytics] = useState(false); // opt-in, default OFF

  // Visibility from an external store (localStorage + change events) — no
  // setState-in-effect, no hydration mismatch. Server snapshot keeps it hidden
  // during SSR; the client snapshot is read immediately after mount.
  const preference = useSyncExternalStore(
    subscribeConsent,
    () => (CONSENT_UI_ENABLED ? getConsentPreference() : "declined"),
    () => "declined" as const,
  );

  const show = CONSENT_UI_ENABLED && preference === null;

  useEffect(() => {
    if (show)
      bannerRef.current
        ?.querySelector<HTMLElement>("button, a[href]")
        ?.focus();
  }, [show]);

  if (!show) return null;

  const choose = (pref: "accepted" | "declined") => setConsentPreference(pref);

  return (
    <div
      ref={bannerRef}
      className={styles.banner}
      role="dialog"
      aria-modal="false"
      aria-label={t("Cookie Preferences")}
      aria-describedby="cookie-consent-desc"
    >
      <div className={styles.card}>
        <div className={styles.head}>
          <span className={styles.icon} aria-hidden="true">
            <Cookie size={22} />
          </span>
          <div className={styles.headText}>
            <p className={styles.title}>{t("We use cookies")}</p>
            <p id="cookie-consent-desc" className={styles.text}>
              {t(
                "We use necessary cookies to run the site and optional analytics cookies to understand how it's used.",
              )}{" "}
              <Link href="/cookie-policy" className={styles.policyLink}>
                {t("Cookie Policy")}
              </Link>
            </p>
          </div>
        </div>

        {manage && (
          <div className={styles.panel}>
            <div className={styles.row}>
              <div className={styles.rowText}>
                <span className={styles.rowTitle}>{t("Necessary")}</span>
                <span className={styles.rowDesc}>
                  {t("Required for the site to work.")}
                </span>
              </div>
              <span className={styles.alwaysActive}>{t("Always active")}</span>
            </div>
            <div className={styles.row}>
              <div className={styles.rowText}>
                <span className={styles.rowTitle}>{t("Analytics")}</span>
                <span className={styles.rowDesc}>
                  {t(
                    "Helps us understand how the site is used (Google Analytics). Off by default.",
                  )}
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={analytics}
                aria-label={t("Analytics")}
                className={`${styles.switch} ${analytics ? styles.switchOn : ""}`}
                onClick={() => setAnalytics((v) => !v)}
              >
                <span className={styles.knob} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        <div className={styles.actions}>
          {!manage && (
            <button
              type="button"
              className={styles.linkBtn}
              onClick={() => setManage(true)}
            >
              {t("Manage preferences")}
            </button>
          )}
          <div className={styles.actionButtons}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => choose("declined")}
            >
              {t("Reject all")}
            </Button>
            {manage ? (
              <Button
                type="button"
                variant="primary"
                onClick={() => choose(analytics ? "accepted" : "declined")}
              >
                {t("Save preferences")}
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                onClick={() => choose("accepted")}
              >
                {t("Accept all")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

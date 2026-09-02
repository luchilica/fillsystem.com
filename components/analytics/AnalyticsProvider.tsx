"use client";

import { useEffect } from "react";
import {
  isAnalyticsReady,
  loadGA4,
  loadGoogleAds,
  unloadGA4,
  setConsentDefaults,
  updateConsentGranted,
  updateConsentDenied,
} from "@/lib/analytics";
import {
  ANALYTICS_ENABLED,
  CONSENT_CHANGE_EVENT,
  hasAnalyticsConsent,
} from "@/lib/consent";
import { captureAdsParams } from "@/lib/ads-tracking";

export default function AnalyticsProvider() {
  useEffect(() => {
    // Consent Mode v2 defaults must be set before any Google script loads
    setConsentDefaults();

    // Persist gclid / UTM / ad params from landing URL into sessionStorage
    captureAdsParams();

    if (!ANALYTICS_ENABLED) return;

    if (hasAnalyticsConsent()) {
      updateConsentGranted();
      if (isAnalyticsReady()) loadGA4();
      loadGoogleAds();
    }

    const onConsentChange = () => {
      if (hasAnalyticsConsent()) {
        updateConsentGranted();
        if (isAnalyticsReady()) loadGA4();
        loadGoogleAds();
      } else {
        updateConsentDenied();
        unloadGA4();
      }
    };

    window.addEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
    return () =>
      window.removeEventListener(CONSENT_CHANGE_EVENT, onConsentChange);
  }, []);

  return null;
}

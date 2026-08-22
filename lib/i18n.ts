import type { Metadata } from "next";
import {
  LOCALE_META,
  DEFAULT_LOCALE,
  INDEXABLE_LOCALES,
  type Locale,
} from "@/i18n/locales";
import { siteConfig } from "@/lib/site-config";

// Absolute URL for a locale + site-relative path ("/" or "/privacy-policy").
// English (no prefix) keeps the trailing slash on "/" to match what Next emits.
export function localizedUrl(locale: Locale, path: string): string {
  const prefix = LOCALE_META[locale].prefix;
  if (path === "/") return prefix ? `${siteConfig.url}${prefix}` : `${siteConfig.url}/`;
  return `${siteConfig.url}${prefix}${path}`;
}

// Canonical + hreflang alternates. Only indexable (published) locales enter the
// hreflang cluster; pilots are excluded per docs/multilingual.md. Non-indexable
// pages get a canonical but no hreflang to avoid contradicting noindex. x-default
// → English root.
export function alternatesFor(locale: Locale, path: string): Metadata["alternates"] {
  if (!LOCALE_META[locale].indexable) {
    return { canonical: localizedUrl(locale, path) };
  }
  const languages: Record<string, string> = {};
  for (const l of INDEXABLE_LOCALES) {
    languages[LOCALE_META[l].htmlLang] = localizedUrl(l, path);
  }
  languages["x-default"] = localizedUrl(DEFAULT_LOCALE, path);
  return { canonical: localizedUrl(locale, path), languages };
}

// index only when this is a published locale and not a preview deployment.
export function robotsFor(locale: Locale): Metadata["robots"] {
  if (siteConfig.isPreview) return { index: false, follow: false };
  return LOCALE_META[locale].indexable
    ? { index: true, follow: true, "max-image-preview": "large" as const, "max-snippet": -1, "max-video-preview": -1 }
    : { index: false, follow: true };
}

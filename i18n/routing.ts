import { defineRouting } from "next-intl/routing";
import { LOCALES, DEFAULT_LOCALE } from "./locales";

// next-intl routing. `as-needed` keeps the default locale (en-US) at the root
// with no prefix; the other locales get short, custom prefixes (/es, /ru,
// ) decoupled from their BCP-47 codes. `localeDetection: false` means no
// automatic redirect by Accept-Language/cookie (docs/multilingual.md rule) — the
// URL is the single source of truth.
export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localeDetection: false,
  localePrefix: {
    mode: "as-needed",
    prefixes: {
      "es-US": "/es",
      "ru-US": "/ru",
    },
  },
});

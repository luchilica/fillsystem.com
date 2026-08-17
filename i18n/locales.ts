// Locale registry — single source of truth for the site's languages.
// URL slugs are decoupled from BCP-47 codes per docs/multilingual.md (e.g. the
// "es-US" locale is served at "/es"). English is the default (served at the
// root with no prefix) and the only indexable/published locale for now; es/ru/
// zh ship as noindex AI-draft pilots (enabled=false until translated + reviewed).
export const LOCALES = ["en-US", "es-US", "ru-US", "zh-Hans"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en-US";

export interface LocaleMeta {
  /** Native label for the language switcher menu. */
  label: string;
  /** Short code shown inside the circular switcher toggle. */
  short: string;
  /** BCP-47 tag for <html lang> and hreflang. */
  htmlLang: string;
  /** Open Graph locale (underscored). */
  ogLocale: string;
  /** URL prefix ("" for the default locale, served at root). */
  prefix: string;
  /** Included in the sitemap + hreflang cluster (published, not a pilot). */
  indexable: boolean;
  /** Shown in the language switcher (a published equivalent exists). */
  enabled: boolean;
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  "en-US": {
    label: "English",
    short: "EN",
    htmlLang: "en-US",
    ogLocale: "en_US",
    prefix: "",
    indexable: true,
    enabled: true,
  },
  "es-US": {
    label: "Español",
    short: "ES",
    htmlLang: "es",
    ogLocale: "es_US",
    prefix: "/es",
    indexable: false,
    enabled: true,
  },
  "ru-US": {
    label: "Русский",
    short: "RU",
    htmlLang: "ru",
    ogLocale: "ru_RU",
    prefix: "/ru",
    indexable: false,
    enabled: true,
  },
  "zh-Hans": {
    label: "简体中文",
    short: "中",
    htmlLang: "zh-Hans",
    ogLocale: "zh_CN",
    prefix: "/zh-hans",
    indexable: false,
    enabled: true,
  },
};

export const ENABLED_LOCALES = LOCALES.filter((l) => LOCALE_META[l].enabled);
export const INDEXABLE_LOCALES = LOCALES.filter((l) => LOCALE_META[l].indexable);

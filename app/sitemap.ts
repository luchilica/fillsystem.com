import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { BLOG_POSTS } from "@/components/blog/blogData";
import {
  INDEXABLE_LOCALES,
  LOCALE_META,
  DEFAULT_LOCALE,
  type Locale,
} from "@/i18n/locales";

function localizedUrl(locale: Locale, path: string): string {
  const prefix = LOCALE_META[locale].prefix;
  if (path === "/") return prefix ? `${siteConfig.url}${prefix}` : `${siteConfig.url}`;
  return `${siteConfig.url}${prefix}${path}`;
}

function alternatesFor(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of INDEXABLE_LOCALES) {
    languages[LOCALE_META[l].htmlLang] = localizedUrl(l, path);
  }
  languages["x-default"] = localizedUrl(DEFAULT_LOCALE, path);
  return languages;
}

function multilingualEntry(
  path: string,
  lastModified: Date,
): MetadataRoute.Sitemap {
  return INDEXABLE_LOCALES.map((locale) => ({
    url: localizedUrl(locale, path),
    lastModified,
    alternates: { languages: alternatesFor(path) },
  }));
}

const SITE_LAST_UPDATED = new Date("2026-08-22");

export default function sitemap(): MetadataRoute.Sitemap {
  if (siteConfig.isPreview) return [];

  const pages: MetadataRoute.Sitemap = [
    ...multilingualEntry("/", SITE_LAST_UPDATED),
    ...multilingualEntry("/about", SITE_LAST_UPDATED),
    ...multilingualEntry("/services", SITE_LAST_UPDATED),
    ...multilingualEntry("/services/business-diagnostic", SITE_LAST_UPDATED),
    ...multilingualEntry("/services/revops-crm-consulting", SITE_LAST_UPDATED),
    ...multilingualEntry("/services/ai-process-automation", SITE_LAST_UPDATED),
    ...multilingualEntry("/services/it-risk-security", SITE_LAST_UPDATED),
    ...multilingualEntry("/services/advisory-power-hour", SITE_LAST_UPDATED),
    ...multilingualEntry("/services/addon-tool-build", SITE_LAST_UPDATED),
    ...multilingualEntry("/services/process-operations", SITE_LAST_UPDATED),
    ...multilingualEntry("/services/extended-diagnostic", SITE_LAST_UPDATED),
    ...multilingualEntry("/o1-visa-readiness", SITE_LAST_UPDATED),
    ...multilingualEntry("/contact", SITE_LAST_UPDATED),
    ...multilingualEntry("/blog", SITE_LAST_UPDATED),
  ];

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.flatMap((post) =>
    multilingualEntry(
      `/blog/${post.slug}`,
      new Date(post.date + "T00:00:00"),
    ),
  );

  const legal: MetadataRoute.Sitemap = [
    ...multilingualEntry("/privacy-policy", SITE_LAST_UPDATED),
    ...multilingualEntry("/terms-of-use", SITE_LAST_UPDATED),
    ...multilingualEntry("/cookie-policy", SITE_LAST_UPDATED),
  ];

  return [...pages, ...blogEntries, ...legal];
}

import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { BLOG_POSTS, POST_BLOG, POST_RESOURCES } from "@/components/blog/blogData";
import {
  INDEXABLE_LOCALES,
  BLOG_LOCALES,
  LOCALE_META,
  DEFAULT_LOCALE,
  type Locale,
} from "@/i18n/locales";

function localizedUrl(locale: Locale, path: string): string {
  const prefix = LOCALE_META[locale].prefix;
  if (path === "/") return prefix ? `${siteConfig.url}${prefix}` : `${siteConfig.url}`;
  return `${siteConfig.url}${prefix}${path}`;
}

function alternatesFor(path: string, locales = INDEXABLE_LOCALES): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[LOCALE_META[l].htmlLang] = localizedUrl(l, path);
  }
  languages["x-default"] = localizedUrl(DEFAULT_LOCALE, path);
  return languages;
}

function multilingualEntry(
  path: string,
  lastModified: Date,
  locales = INDEXABLE_LOCALES,
): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: localizedUrl(locale, path),
    lastModified,
    alternates: { languages: alternatesFor(path, locales) },
  }));
}

const PAGE_DATES: Record<string, string> = {
  "/":                                "2026-08-17",
  "/about":                           "2026-08-22",
  "/services":                        "2026-08-22",
  "/services/business-diagnostic":    "2026-08-22",
  "/services/revops-crm-consulting":  "2026-08-22",
  "/services/ai-process-automation":  "2026-08-22",
  "/services/it-risk-security":       "2026-08-22",
  "/services/advisory-power-hour":    "2026-08-22",
  "/services/addon-tool-build":       "2026-08-22",
  "/services/process-operations":     "2026-08-22",
  "/services/extended-diagnostic":    "2026-08-22",
  "/o1-visa-readiness":               "2026-08-22",
  "/contact":                         "2026-08-22",
  "/case-studies":                    "2026-08-22",
  "/blog":                            "2026-08-22",
  "/resources":                       "2026-08-23",
  "/privacy-policy":                  "2026-08-22",
  "/terms-of-use":                    "2026-08-22",
  "/cookie-policy":                   "2026-08-22",
};

function pageDate(path: string): Date {
  const d = PAGE_DATES[path];
  return d ? new Date(d + "T00:00:00") : new Date("2026-08-22");
}

export default function sitemap(): MetadataRoute.Sitemap {
  if (siteConfig.isPreview) return [];

  const pages: MetadataRoute.Sitemap = Object.keys(PAGE_DATES).flatMap(
    (path) => multilingualEntry(path, pageDate(path)),
  );

  const blogEntries: MetadataRoute.Sitemap = POST_BLOG.flatMap((post) =>
    multilingualEntry(
      `/blog/${post.slug}`,
      new Date((post.dateModified ?? post.date) + "T00:00:00"),
      BLOG_LOCALES,
    ),
  );

  const resourceEntries: MetadataRoute.Sitemap = POST_RESOURCES.flatMap((post) =>
    multilingualEntry(
      `/resources/${post.slug}`,
      new Date((post.dateModified ?? post.date) + "T00:00:00"),
      BLOG_LOCALES,
    ),
  );

  return [...pages, ...blogEntries, ...resourceEntries];
}

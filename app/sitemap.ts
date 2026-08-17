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
  changeFrequency: "monthly" | "weekly" | "yearly",
  priority: number,
): MetadataRoute.Sitemap {
  return INDEXABLE_LOCALES.map((locale) => ({
    url: localizedUrl(locale, path),
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages: alternatesFor(path) },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  if (siteConfig.isPreview) return [];

  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    ...multilingualEntry("/", now, "monthly", 1),
    ...multilingualEntry("/about", now, "monthly", 0.8),
    ...multilingualEntry("/services", now, "monthly", 0.9),
    ...multilingualEntry("/services/business-diagnostic", now, "monthly", 0.85),
    ...multilingualEntry("/services/revops-crm-consulting", now, "monthly", 0.85),
    ...multilingualEntry("/services/ai-process-automation", now, "monthly", 0.85),
    ...multilingualEntry("/services/it-risk-security", now, "monthly", 0.85),
    ...multilingualEntry("/services/advisory-power-hour", now, "monthly", 0.8),
    ...multilingualEntry("/services/addon-tool-build", now, "monthly", 0.8),
    ...multilingualEntry("/services/process-operations", now, "monthly", 0.85),
    ...multilingualEntry("/o1-visa-readiness", now, "monthly", 0.7),
    ...multilingualEntry("/blog", now, "weekly", 0.7),
  ];

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.flatMap((post) =>
    multilingualEntry(
      `/blog/${post.slug}`,
      new Date(post.date + "T00:00:00"),
      "monthly",
      0.75,
    ),
  );

  const legal: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.url}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/terms-of-use`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/cookie-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  return [...pages, ...blogEntries, ...legal];
}

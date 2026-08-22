import { siteConfig } from "@/lib/site-config";
import { LOCALE_META, type Locale } from "@/i18n/locales";

function locUrl(locale: Locale | undefined, path: string): string {
  if (!locale) return `${siteConfig.url}${path}`;
  const prefix = LOCALE_META[locale].prefix;
  return `${siteConfig.url}${prefix}${path}`;
}

function homeUrl(locale: Locale | undefined): string {
  if (!locale) return siteConfig.url;
  const prefix = LOCALE_META[locale].prefix;
  return prefix ? `${siteConfig.url}${prefix}` : siteConfig.url;
}

export default function BreadcrumbJsonLd({
  title,
  path,
  parent,
  locale,
}: {
  title: string;
  path: string;
  parent?: { title: string; path: string };
  locale?: Locale;
}) {
  const items: { "@type": string; position: number; name: string; item: string }[] = [
    { "@type": "ListItem", position: 1, name: siteConfig.name, item: homeUrl(locale) },
  ];
  if (parent) {
    items.push({ "@type": "ListItem", position: 2, name: parent.title, item: locUrl(locale, parent.path) });
  }
  items.push({ "@type": "ListItem", position: items.length + 1, name: title, item: locUrl(locale, path) });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

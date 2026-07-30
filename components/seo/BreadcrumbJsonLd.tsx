import { siteConfig } from "@/lib/site-config";

export default function BreadcrumbJsonLd({
  title,
  path,
  parent,
}: {
  title: string;
  path: string;
  parent?: { title: string; path: string };
}) {
  const items: { "@type": string; position: number; name: string; item: string }[] = [
    { "@type": "ListItem", position: 1, name: siteConfig.name, item: siteConfig.url },
  ];
  if (parent) {
    items.push({ "@type": "ListItem", position: 2, name: parent.title, item: `${siteConfig.url}${parent.path}` });
  }
  items.push({ "@type": "ListItem", position: items.length + 1, name: title, item: `${siteConfig.url}${path}` });

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

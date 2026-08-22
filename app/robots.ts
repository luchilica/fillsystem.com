import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { siteConfig } from "@/lib/site-config";

const CANONICAL_HOST = "www.fillsystem.com";

export default async function robots(): Promise<MetadataRoute.Robots> {
  if (siteConfig.isPreview) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  const headersList = await headers();
  const host = headersList.get("host") ?? "";

  if (host && host !== CANONICAL_HOST) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: "GPTBot", allow: "/", disallow: "/api/" },
      { userAgent: "ChatGPT-User", allow: "/", disallow: "/api/" },
      { userAgent: "ClaudeBot", allow: "/", disallow: "/api/" },
      { userAgent: "PerplexityBot", allow: "/", disallow: "/api/" },
      { userAgent: "Applebot-Extended", allow: "/", disallow: "/api/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}

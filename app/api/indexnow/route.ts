import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";
import { BLOG_POSTS } from "@/components/blog/blogData";

const INDEX_NOW_KEY = "fillsystem2026indexnow";

const STATIC_PATHS = [
  "/",
  "/about",
  "/services",
  "/services/business-diagnostic",
  "/services/revops-crm-consulting",
  "/services/ai-process-automation",
  "/services/process-operations",
  "/services/it-risk-security",
  "/services/addon-tool-build",
  "/services/advisory-power-hour",
  "/o1-visa-readiness",
  "/blog",
];

export async function POST() {
  if (siteConfig.isPreview) {
    return NextResponse.json({ error: "Not available in preview" }, { status: 403 });
  }

  const blogPaths = BLOG_POSTS.map((p) => `/blog/${p.slug}`);
  const allUrls = [...STATIC_PATHS, ...blogPaths].map(
    (path) => `${siteConfig.url}${path}`
  );

  const body = {
    host: new URL(siteConfig.url).host,
    key: INDEX_NOW_KEY,
    keyLocation: `${siteConfig.url}/${INDEX_NOW_KEY}.txt`,
    urlList: allUrls,
  };

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return NextResponse.json({
    status: res.status,
    submitted: allUrls.length,
  });
}

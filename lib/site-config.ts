// Centralized site configuration. Pure server module — never imported by a
// client component, so SITE_MODE / SITE_URL never reach the client bundle.
// No NEXT_PUBLIC_ prefix; reads process.env only (no .env file access).

export type SiteMode = "preview" | "production";

export interface SiteConfig {
  name: string;
  mode: SiteMode;
  url: string;
  isPreview: boolean;
  locale: string;
}

const SITE_MODE: SiteMode =
  process.env.SITE_MODE === "production" ? "production" : "preview";

function resolveSiteUrl(): string {
  if (process.env.SITE_URL) return process.env.SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

// Strip trailing slash(es) so getCanonicalUrl controls the final slash.
function normalizeUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

export const siteConfig: SiteConfig = {
  name: "Fill System",
  mode: SITE_MODE,
  url: normalizeUrl(resolveSiteUrl()),
  isPreview: SITE_MODE !== "production",
  locale: "en-US",
};

// Returns an absolute URL for a site-relative path, e.g. getCanonicalUrl("/")
// → "https://host/". Leading slash is normalized so callers can pass "/path"
// or "path".
export function getCanonicalUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalizedPath}`;
}

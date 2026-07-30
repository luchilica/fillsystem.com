import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next 16 renamed `middleware` → `proxy`; the file lives at the project root.
// next-intl's proxy resolves the locale from the URL prefix (no auto-redirect,
// since localeDetection is off) and rewrites short prefixes (/es) to the full
// locale segment internally.
export default createMiddleware(routing);

export const config = {
  // Run on all pathnames except API, Next internals, the metadata image routes
  // (opengraph-image / twitter-image), and any file with an extension.
  matcher: "/((?!api|_next|_vercel|opengraph-image|twitter-image|apple-icon|.*\\..*).*)",
};

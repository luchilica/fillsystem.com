import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const CANONICAL_HOST = "www.fillsystem.com";

const BLOG_TO_RESOURCES = new Set([
  "test-speech-recognition-real-business-calls",
  "choose-embedding-model-enterprise-rag",
  "ai-agents-are-not-automation",
  "evaluate-ai-agent-before-production",
  "mcp-vs-a2a-enterprise-ai-agents",
  "ai-governance-mid-market-b2b",
]);

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname !== pathname.toLowerCase()) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 301);
  }

  const blogMatch = pathname.match(/^(?:\/es|\/ru)?\/blog\/([a-z0-9-]+)$/);
  if (blogMatch && BLOG_TO_RESOURCES.has(blogMatch[1])) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace("/blog/", "/resources/");
    return NextResponse.redirect(url, 301);
  }

  const response = intlMiddleware(request);

  const host = request.headers.get("host") ?? "";
  if (host && host !== CANONICAL_HOST) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: "/((?!api|_next|_vercel|opengraph-image|twitter-image|apple-icon|fillsystem2026indexnow|.*\\..*).*)",
};

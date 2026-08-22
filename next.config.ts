import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Preview isolation: on any non-production deployment, send X-Robots-Tag:
// noindex, nofollow on every route as defense-in-depth alongside meta robots.
// Production sends no such header.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://*.googletagmanager.com https://*.google-analytics.com https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.google-analytics.com https://*.googletagmanager.com",
  "font-src 'self'",
  "connect-src 'self' https://*.google-analytics.com https://*.googletagmanager.com",
  "frame-src https://challenges.cloudflare.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
  },
  async headers() {
    const imageCache = {
      source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico)",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    };
    const corsApi = {
      source: "/api/:path*",
      headers: [
        { key: "Access-Control-Allow-Origin", value: "https://www.fillsystem.com" },
        { key: "Access-Control-Allow-Methods", value: "POST, OPTIONS" },
        { key: "Access-Control-Allow-Headers", value: "Content-Type" },
      ],
    };

    if (process.env.SITE_MODE === "production") {
      return [imageCache, corsApi, { source: "/:path*", headers: securityHeaders }];
    }

    return [
      imageCache,
      corsApi,
      {
        source: "/:path*",
        headers: [
          ...securityHeaders,
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);

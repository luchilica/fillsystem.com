import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Mulish, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import SkipLink from "@/components/layout/SkipLink";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/analytics/CookieConsent";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";
import AnalyticsClickTracker from "@/components/analytics/AnalyticsClickTracker";
import { siteConfig } from "@/lib/site-config";
import { routing } from "@/i18n/routing";
import { LOCALE_META, type Locale } from "@/i18n/locales";

// v2 brand face — Mulish, weight-driven hierarchy (600 headings/emphasis,
// 500 lead text, 400 body). Self-hosted by next/font (no third-party font
// requests). Exposed as --font-sans.
const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

// v2 mono — JetBrains Mono for eyebrows, data labels, badges, form labels and
// metric readouts. Exposed as --font-mono.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = { themeColor: "#2551D2" };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: "Opsfield Systems",
      template: "%s | Opsfield Systems",
    },
    description: "Diagnostic-first IT & business consulting.",
    // Sitewide share-preview image. Declared explicitly (not left to the
    // opengraph-image.tsx file convention alone) because pages that set their own
    // `openGraph`/`twitter` in generateMetadata were shipping HTML with no
    // og:image tag — so Telegram/Slack/LinkedIn had nothing to render. metadataBase
    // resolves "/opengraph-image" to an absolute HTTPS URL.
    openGraph: {
      siteName: siteConfig.name,
      locale: LOCALE_META[locale as Locale]?.ogLocale || "en_US",
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/opengraph-image"],
    },
  };
}

// Statically render all known locales.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={LOCALE_META[locale as Locale].htmlLang}>
      <body className={`${mulish.variable} ${jetbrainsMono.variable}`}>
        <NextIntlClientProvider>
          <SkipLink />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <CookieConsent />
          <AnalyticsProvider />
          <AnalyticsClickTracker />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

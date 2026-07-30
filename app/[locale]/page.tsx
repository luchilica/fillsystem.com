// 11 top-level landing sections in the order fixed by docs/sitemap.md.
// Section 9 (Business & IT Diagnostic) holds the nested #diagnostic-request-form;
// the form body itself arrives in the next Stage 4 prompt.

import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/lib/site-config";
import { LOCALE_META, type Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor, localizedUrl } from "@/lib/i18n";
import JsonLd from "@/components/seo/JsonLd";
import Hero from "@/components/sections/Hero";
import ProblemSection from "@/components/sections/ProblemSection";
import WhatWeDiagnose from "@/components/sections/WhatWeDiagnose";
import ServicesGrid from "@/components/sections/ServicesGrid";
import AIProcessAutomation from "@/components/sections/AIProcessAutomation";
import HowDiagnosticWorks from "@/components/sections/HowDiagnosticWorks";
import DiagnosticScenarios from "@/components/sections/DiagnosticScenarios";
import WhyOpsfield from "@/components/sections/WhyOpsfield";
import DeliveryModel from "@/components/sections/DeliveryModel";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import BusinessITDiagnostic from "@/components/sections/BusinessITDiagnostic";

// Homepage metadata. Title + description are verbatim from docs/texts.md →
// "Page: Diagnostic-First IT & Business Consulting". OG/Twitter image tags are
// supplied by app/opengraph-image.tsx + app/twitter-image.tsx (file convention).
const TITLE = "B2B IT & Operations Development";
const DESCRIPTION =
  "Fill System diagnoses process, CRM, data and IT bottlenecks for B2B companies with 50-250 employees before you commit to tools, hires or vendors.";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: alternatesFor(loc, "/"),
    robots: robotsFor(loc),
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: localizedUrl(loc, "/"),
      type: "website",
      siteName: siteConfig.name,
      locale: LOCALE_META[loc].ogLocale,
      // Explicit so the shared homepage always carries og:image (this object
      // otherwise shadows the sitewide default in layout.tsx).
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Fill System: Diagnostic-First IT & Business Development",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
      images: ["/opengraph-image"],
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <JsonLd locale={locale as "en-US" | "es-US" | "ru-US" | "zh-Hans"} />

      {/* 1 */}
      <section id="hero" className="section">
        <Hero />
      </section>

      {/* 2 */}
      <section id="problem-section" className="section">
        <ProblemSection />
      </section>

      {/* 3 */}
      <section id="what-we-diagnose" className="section">
        <WhatWeDiagnose />
      </section>

      {/* 3b — priced areas of work; funnels back to the diagnostic form */}
      <section id="areas-of-work" className="section">
        <ServicesGrid />
      </section>

      {/* 4 */}
      <section id="ai-process-automation" className="section">
        <AIProcessAutomation />
      </section>

      {/* 5 */}
      <section id="how-the-diagnostic-works" className="section">
        <HowDiagnosticWorks />
      </section>

      {/* 6 */}
      <section id="proof-examples" className="section">
        <DiagnosticScenarios />
      </section>

      {/* 7 */}
      <section id="why-fill-system" className="section">
        <WhyOpsfield />
      </section>

      {/* 8 */}
      <section id="delivery-model" className="section">
        <DeliveryModel />
      </section>

      {/* 9 — composite conversion section; form is a nested target */}
      <section id="business-it-diagnostic" className="section">
        <BusinessITDiagnostic />
      </section>

      {/* 10 */}
      <section id="faq" className="section">
        <FAQ />
      </section>

      {/* 11 */}
      <section id="final-cta" className="section">
        <FinalCTA />
      </section>
    </>
  );
}

import { siteConfig } from "@/lib/site-config";
import { LOCALE_META, type Locale } from "@/i18n/locales";
import { FAQ_ITEMS, faqAnswerText } from "@/components/sections/faqData";

const HOME_TITLE = "B2B IT & Operations Consulting - Diagnostic-First | Fill System";
const HOME_DESCRIPTION =
  "B2B companies with 50-250 employees use Fill System to diagnose process, CRM, data, and IT bottlenecks before committing to tools, hires, or implementation. Request a free diagnostic.";

function pageUrl(locale: Locale): string {
  const prefix = LOCALE_META[locale].prefix;
  return prefix ? `${siteConfig.url}${prefix}` : siteConfig.url;
}

export default function JsonLd({ locale = "en-US" }: { locale?: Locale }) {
  const home = siteConfig.url;
  const localeHome = pageUrl(locale);
  const organizationId = `${home}#organization`;
  const websiteId = `${home}#website`;
  const serviceUrl = `${home}#business-it-diagnostic`;
  const lang = LOCALE_META[locale].htmlLang;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.name,
        url: home,
        logo: `${home}/logo.png`,
        foundingDate: "2021",
        description:
          "Diagnostic-first IT and operations consulting for B2B companies with 50-250 employees.",
        disambiguatingDescription:
          "B2B IT and operations consulting firm based in California, USA. Not affiliated with fillsystems.it (Italy) or Fill System HVAC (South Korea).",
        founder: { "@id": `${home}#igor-saevets` },
        sameAs: [
          "https://www.linkedin.com/in/igorsaevets",
          "https://growcluster.com/",
        ],
        areaServed: { "@type": "Country", name: "United States" },
        contactPoint: {
          "@type": "ContactPoint",
          email: "hello@fillsystem.com",
          contactType: "customer service",
          availableLanguage: ["English", "Russian", "Spanish"],
        },
        address: {
          "@type": "PostalAddress",
          addressRegion: "CA",
          addressCountry: "US",
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: siteConfig.name,
        url: home,
        publisher: { "@id": organizationId },
        inLanguage: lang,
      },
      {
        "@type": "WebPage",
        "@id": localeHome,
        name: HOME_TITLE,
        description: HOME_DESCRIPTION,
        url: localeHome,
        isPartOf: { "@id": websiteId },
        inLanguage: lang,
      },
      {
        "@type": "Service",
        "@id": serviceUrl,
        name: "Business & IT Diagnostic",
        description:
          "A complimentary 30-45 minute diagnostic conversation to identify process, data, CRM, and IT system bottlenecks in B2B companies.",
        serviceType: "Diagnostic-first IT and business development",
        provider: { "@id": organizationId },
        areaServed: { "@type": "Country", name: "United States" },
        url: `${home}/services/business-diagnostic`,
        offers: [
          {
            "@type": "Offer",
            name: "Primary Diagnostic",
            price: "0",
            priceCurrency: "USD",
            description: "Complimentary 30-45 minute fit review",
          },
          {
            "@type": "Offer",
            name: "Advisory Power Hour",
            price: "350",
            priceCurrency: "USD",
            description:
              "A focused working session with a senior advisor on one specific decision or problem.",
          },
          {
            "@type": "Offer",
            name: "Extended Diagnostic",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: "1400",
              priceCurrency: "USD",
            },
            description:
              "A structured, documented diagnosis of processes, systems, and risks.",
          },
          {
            "@type": "Offer",
            name: "Add-on Tool Build",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: "1100",
              priceCurrency: "USD",
            },
            description:
              "A single focused build: Telegram bot, landing page, or email campaign.",
          },
          {
            "@type": "Offer",
            name: "IT Risk & Security",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: "2100",
              priceCurrency: "USD",
            },
            description:
              "Focused review of accounts, access, data handling, and single points of failure.",
          },
          {
            "@type": "Offer",
            name: "Process & Operations",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: "3700",
              priceCurrency: "USD",
            },
            description:
              "Operating model design: clarified ownership, documented workflows, removed duplication.",
          },
          {
            "@type": "Offer",
            name: "AI & Process Automation",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: "4100",
              priceCurrency: "USD",
            },
            description:
              "Workflow automation where it pays off: tool connections, decision logic, documentation.",
          },
          {
            "@type": "Offer",
            name: "RevOps: CRM, Data & Reporting",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: "5100",
              priceCurrency: "USD",
            },
            description:
              "CRM structure cleanup, reporting rules, and revenue data flow.",
          },
          {
            "@type": "Offer",
            name: "O-1 Readiness Support",
            price: "2700",
            priceCurrency: "USD",
            description:
              "Evidence structuring for O-1 extraordinary-ability visa cases.",
          },
        ],
      },
      {
        "@type": "HowTo",
        "@id": `${home}#how-it-works`,
        name: "How the Business & IT Diagnostic Works",
        description:
          "From operating symptoms to a clear next step in three stages.",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Review",
            text: "We review workflows, systems, CRM usage, reporting, automation, and decision bottlenecks.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Map & Score",
            text: "We map likely root causes and score fixes by impact, effort, risk, dependency, and business value.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Recommend",
            text: "You receive a clear next step: audit, assessment, roadmap, advisory, implementation support, pause, or no-fit.",
          },
        ],
      },
      {
        "@type": "Person",
        "@id": `${home}#igor-saevets`,
        name: "Igor Saevets",
        jobTitle: "Founder & CEO",
        description:
          "Serial entrepreneur and IT operations advisor with 10+ companies founded across the US and Europe. EB-1A green card holder. Leads diagnostic methodology and operating model design at Fill System.",
        worksFor: { "@id": organizationId },
        url: "https://www.linkedin.com/in/igorsaevets",
        sameAs: ["https://www.linkedin.com/in/igorsaevets"],
      },
      {
        "@type": "FAQPage",
        "@id": `${localeHome}#faq`,
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faqAnswerText(item),
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

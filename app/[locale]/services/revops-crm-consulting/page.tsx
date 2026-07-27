import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getT } from "@/i18n/t";
import { siteConfig } from "@/lib/site-config";
import { LOCALE_META, type Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor, localizedUrl } from "@/lib/i18n";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import Button from "@/components/ui/Button";
import PlusMark from "@/components/ui/PlusMark";
import { Check } from "lucide-react";
import styles from "./RevOpsCrm.module.css";

const TITLE = "RevOps & CRM Consulting for B2B | Opsfield Systems";
const DESCRIPTION =
  "CRM audit, pipeline optimization, reporting cleanup, and data flow architecture for B2B teams using HubSpot, Salesforce, and Pipedrive. From $4,900.";

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
    alternates: alternatesFor(loc, "/services/revops-crm-consulting"),
    robots: robotsFor(loc),
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: localizedUrl(loc, "/services/revops-crm-consulting"),
      type: "website",
      siteName: siteConfig.name,
      locale: LOCALE_META[loc].ogLocale,
    },
  };
}

const PROBLEMS = [
  {
    title: "Inconsistent metric definitions",
    description:
      "Sales, marketing, and finance define the same metrics differently. Dashboard numbers don't match.",
  },
  {
    title: "Pipeline leakage",
    description:
      "Leads fall between handoff points. No SLA, no shared visibility, no accountability.",
  },
  {
    title: "Disconnected data sources",
    description:
      "Multiple tools feeding the same dashboard with conflicting data.",
  },
  {
    title: "Manual reconciliation",
    description:
      "Teams spending hours each week fixing reports instead of using them.",
  },
  {
    title: "CRM workarounds",
    description:
      "People work around the CRM instead of in it because the structure doesn't match reality.",
  },
  {
    title: "Migration uncertainty",
    description:
      "Considering Salesforce to HubSpot (or vice versa) but unsure what to move, what to clean, what to rebuild.",
  },
] as const;

const INCLUDED = [
  {
    title: "CRM structure audit",
    description: "Data model review, field cleanup, deduplication logic.",
  },
  {
    title: "Pipeline & stage review",
    description:
      "Stage definitions, conversion criteria, handoff rules.",
  },
  {
    title: "Reporting definitions",
    description:
      "Unified metric definitions across sales, marketing, operations.",
  },
  {
    title: "Data source consolidation",
    description: "Identify and resolve conflicting data feeds.",
  },
  {
    title: "Core integrations",
    description:
      "Review and repair connections between CRM, marketing, finance tools.",
  },
  {
    title: "Dashboard & reporting rules",
    description:
      "Build or fix dashboards that leadership can trust.",
  },
] as const;

const ENVIRONMENTS = [
  "HubSpot",
  "Salesforce",
  "Pipedrive",
  "Looker",
  "Monday",
  "Notion",
  "QuickBooks",
  "Zapier",
  "Make",
] as const;

const FAQ = [
  {
    question: "Do I need to switch CRMs?",
    answer:
      "Not necessarily. Most engagements focus on fixing the CRM you already have. We recommend migration only when the current platform fundamentally cannot support your process.",
  },
  {
    question: "Can you help migrate from Salesforce to HubSpot?",
    answer:
      "Yes. CRM migration is a common outcome of the RevOps diagnostic. We map your current data model, pipeline logic, and integrations before recommending a migration path.",
  },
  {
    question: "How long does a RevOps audit take?",
    answer:
      "3-6 weeks depending on the number of CRM objects, integrations, and stakeholders. The first step is always the free diagnostic.",
  },
  {
    question:
      "What if our CRM is fine but reporting is broken?",
    answer:
      "That is one of the most common scenarios. Reporting issues often trace back to inconsistent field definitions or disconnected data sources, not the CRM itself.",
  },
] as const;

export default async function RevOpsCrmConsulting({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getT();
  const loc = locale as Locale;
  const home = siteConfig.url;
  const pageUrl = localizedUrl(loc, "/services/revops-crm-consulting");

  // Three-level breadcrumb: Home > Services > RevOps & CRM Consulting
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: siteConfig.name,
        item: home,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: localizedUrl(loc, "/services"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "RevOps & CRM Consulting",
        item: pageUrl,
      },
    ],
  };

  // Service JSON-LD specific to this service page.
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageUrl,
        name: TITLE,
        description: DESCRIPTION,
        url: pageUrl,
        isPartOf: { "@id": `${home}#website` },
        inLanguage: LOCALE_META[loc].htmlLang,
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "RevOps & CRM Consulting",
        description:
          "CRM audit, pipeline optimization, reporting cleanup, and data flow architecture for B2B teams.",
        serviceType: "RevOps and CRM consulting",
        provider: { "@id": `${home}#organization` },
        areaServed: { "@type": "Country", name: "United States" },
        url: pageUrl,
        offers: {
          "@type": "Offer",
          name: "RevOps Engagement",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: "4900",
            priceCurrency: "USD",
          },
          description:
            "RevOps engagements start from $4,900 for a lean 25-50 person team. Scope and cost set by the free diagnostic.",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: FAQ.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* 1 -- Hero */}
      <section className={`section ${styles.heroSection}`}>
        <div className="container">
          <h1>{t("RevOps & CRM Consulting for B2B")}</h1>
          <p className={`lead ${styles.lead}`}>
            {t(
              "Make your CRM, pipeline, and reporting tell the truth again. We clean up CRM structure, reporting rules, and revenue data flow so your numbers are trustworthy and your team stops working around the system.",
            )}
          </p>
        </div>
      </section>

      {/* 2 -- The Problem */}
      <section className={`section ${styles.darkSection}`}>
        <PlusMark size={160} className={styles.darkPlusTop} />
        <PlusMark size={90} className={styles.darkPlusBottom} />
        <div className="container">
          <h2>{t("Common CRM & RevOps Problems We Diagnose")}</h2>
          <div className={styles.problemGrid}>
            {PROBLEMS.map((problem) => (
              <div key={problem.title} className={styles.problemCard}>
                <h3 className={styles.problemTitle}>{t(problem.title)}</h3>
                <p className={styles.problemDesc}>{t(problem.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 -- What's Included */}
      <section className="section">
        <div className="container">
          <h2>{t("What a RevOps Engagement Covers")}</h2>
          <ul className={styles.includedList}>
            {INCLUDED.map((item) => (
              <li key={item.title} className={styles.includedItem}>
                <span className={styles.checkIcon} aria-hidden="true">
                  <Check size={14} strokeWidth={2.5} />
                </span>
                <div>
                  <h3 className={styles.includedTitle}>{t(item.title)}</h3>
                  <p className={styles.includedDesc}>{t(item.description)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 -- Environments */}
      <section className={`section ${styles.brandSection}`}>
        <PlusMark size={160} className={styles.brandPlusTop} />
        <PlusMark size={90} className={styles.brandPlusBottom} />
        <div className="container">
          <h2>{t("CRM Environments We Work With")}</h2>
          <div className={styles.envTags}>
            {ENVIRONMENTS.map((env) => (
              <span key={env} className={styles.envTag}>
                {env}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 5 -- Pricing */}
      <section className="section">
        <div className="container">
          <h2>{t("Pricing")}</h2>
          <div className={styles.pricingCard}>
            <p className={styles.pricingPrice}>
              {t("From $4,900")}
            </p>
            <p className={styles.pricingBody}>
              {t(
                "RevOps engagements start from $4,900 for a lean 25-50 person team. The exact scope and cost are set by the free diagnostic - you never pay before scope is agreed in writing.",
              )}
            </p>
            <p className={styles.pricingTimeline}>
              {t(
                "Timeline: 3-6 weeks depending on the number of systems, data sources, and stakeholders involved.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 6 -- FAQ */}
      <section className="section">
        <div className="container">
          <div className={styles.faqSection}>
            <PlusMark size={160} className={styles.faqPlusTop} />
            <PlusMark size={90} className={styles.faqPlusBottom} />
            <h2>{t("RevOps Consulting FAQ")}</h2>
            <div className={styles.faqList}>
              {FAQ.map((item) => (
                <div key={item.question} className={styles.faqItem}>
                  <h3 className={styles.faqQuestion}>{t(item.question)}</h3>
                  <p className={styles.faqAnswer}>{t(item.answer)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7 -- CTA */}
      <section className={`section ${styles.ctaSection}`}>
        <div className="container">
          <Button
            href="/#diagnostic-request-form"
            variant="primary"
            icon
            data-request-type="RevOps: CRM, Data & Reporting"
          >
            {t("Start With a Free CRM & RevOps Diagnostic")}
          </Button>
        </div>
      </section>
    </>
  );
}

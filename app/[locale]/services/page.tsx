import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Plus } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { getT } from "@/i18n/t";
import { siteConfig } from "@/lib/site-config";
import { LOCALE_META, type Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor, localizedUrl } from "@/lib/i18n";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import Button from "@/components/ui/Button";
import PlusMark from "@/components/ui/PlusMark";
import styles from "./ServicesHub.module.css";

const TITLE = "B2B Consulting Services & Pricing | Opsfield Systems";
const DESCRIPTION =
  "IT diagnostics, RevOps consulting, CRM audits, AI automation, and process optimization for B2B companies with 50-250 employees. Transparent pricing, diagnostic-first approach.";

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
    alternates: alternatesFor(loc, "/services"),
    robots: robotsFor(loc),
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: localizedUrl(loc, "/services"),
      type: "website",
      siteName: siteConfig.name,
      locale: LOCALE_META[loc].ogLocale,
    },
  };
}

// Service definitions for the hub cards.
const SERVICES = [
  {
    id: "primary-diagnostic",
    title: "Primary Diagnostic",
    description:
      "A complimentary 30-45 minute fit review to frame the problem and identify bottlenecks.",
    price: "Free",
    priceFree: true,
    highlight: true,
    href: "/services/business-diagnostic",
    external: false,
  },
  {
    id: "advisory-power-hour",
    title: "Advisory Power Hour",
    description:
      "Bring one concrete problem. Leave with expert direction in 60 minutes.",
    price: "$200",
    priceFree: false,
    highlight: false,
    href: "/services/advisory-power-hour",
    external: false,
  },
  {
    id: "extended-diagnostic",
    title: "Extended Diagnostic",
    description:
      "A documented diagnosis of processes, systems, and risks.",
    price: "from $1,200",
    priceFree: false,
    highlight: false,
    href: "/services/business-diagnostic",
    external: false,
  },
  {
    id: "addon-tool",
    title: "Add-on Tool Build",
    description:
      "A focused build: Telegram bot, landing page, or email campaign.",
    price: "from $900",
    priceFree: false,
    highlight: false,
    href: "/services/addon-tool-build",
    external: false,
  },
  {
    id: "it-risk",
    title: "IT Risk & Security",
    description:
      "Review of accounts, access, data handling, and single points of failure.",
    price: "from $1,900",
    priceFree: false,
    highlight: false,
    href: "/services/it-risk-security",
    external: false,
  },
  {
    id: "process-operations",
    title: "Process & Operations",
    description:
      "Redesign handoffs, approvals, and ownership for growing teams.",
    price: "from $3,500",
    priceFree: false,
    highlight: false,
    href: "/services/process-operations",
    external: false,
  },
  {
    id: "automation",
    title: "AI & Process Automation",
    description:
      "Remove manual, repetitive work where it actually pays off.",
    price: "from $3,900",
    priceFree: false,
    highlight: false,
    href: "/services/ai-process-automation",
    external: false,
  },
  {
    id: "revops",
    title: "RevOps: CRM, Data & Reporting",
    description:
      "Make your CRM, pipeline, and reporting trustworthy again.",
    price: "from $4,900",
    priceFree: false,
    highlight: false,
    href: "/services/revops-crm-consulting",
    external: false,
  },
  {
    id: "o1-readiness",
    title: "O-1 Readiness Support",
    description:
      "Structure the evidence behind an O-1 extraordinary-ability case.",
    price: "$2,500",
    priceFree: false,
    highlight: false,
    href: "/o1-visa-readiness",
    external: false,
  },
] as const;

const STEPS = [
  {
    name: "Review",
    description: "We review workflows, systems, and bottlenecks.",
  },
  {
    name: "Map & Score",
    description: "We map root causes and score by impact and effort.",
  },
  {
    name: "Recommend",
    description: "You receive a clear next step.",
  },
] as const;

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getT();
  const loc = locale as Locale;
  const home = siteConfig.url;
  const pageUrl = localizedUrl(loc, "/services");

  // Service JSON-LD scoped to this page.
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
        "@id": `${pageUrl}#services`,
        name: "B2B Consulting Services",
        description:
          "Diagnostic-first IT and business consulting for B2B companies with 50-250 employees.",
        serviceType: "IT and business consulting",
        provider: { "@id": `${home}#organization` },
        areaServed: { "@type": "Country", name: "United States" },
        url: pageUrl,
        offers: [
          {
            "@type": "Offer",
            name: "Primary Diagnostic",
            price: "0",
            priceCurrency: "USD",
            description:
              "Complimentary 30-45 minute fit review to frame the problem and identify bottlenecks.",
          },
          {
            "@type": "Offer",
            name: "Advisory Power Hour",
            price: "200",
            priceCurrency: "USD",
            description:
              "Bring one concrete problem. Leave with expert direction in 60 minutes.",
          },
          {
            "@type": "Offer",
            name: "Extended Diagnostic",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: "1200",
              priceCurrency: "USD",
            },
            description:
              "A documented diagnosis of processes, systems, and risks.",
          },
          {
            "@type": "Offer",
            name: "Add-on Tool Build",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: "900",
              priceCurrency: "USD",
            },
            description:
              "A focused build: Telegram bot, landing page, or email campaign.",
          },
          {
            "@type": "Offer",
            name: "IT Risk & Security",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: "1900",
              priceCurrency: "USD",
            },
            description:
              "Review of accounts, access, data handling, and single points of failure.",
          },
          {
            "@type": "Offer",
            name: "Process & Operations",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: "3500",
              priceCurrency: "USD",
            },
            description:
              "Redesign handoffs, approvals, and ownership for growing teams.",
          },
          {
            "@type": "Offer",
            name: "AI & Process Automation",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: "3900",
              priceCurrency: "USD",
            },
            description:
              "Remove manual, repetitive work where it actually pays off.",
          },
          {
            "@type": "Offer",
            name: "RevOps: CRM, Data & Reporting",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: "4900",
              priceCurrency: "USD",
            },
            description:
              "Make your CRM, pipeline, and reporting trustworthy again.",
          },
          {
            "@type": "Offer",
            name: "O-1 Readiness Support",
            price: "2500",
            priceCurrency: "USD",
            description:
              "Evidence structuring for O-1 extraordinary-ability visa cases.",
          },
        ],
      },
    ],
  };

  return (
    <>
      <BreadcrumbJsonLd title={t("Services")} path="/services" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* 1 — Hero */}
      <section className={`section ${styles.heroSection}`}>
        <div className="container">
          <h1>{t("B2B Consulting Services & Pricing")}</h1>
          <p className={`lead ${styles.lead}`}>
            {t(
              "Every engagement starts with a free diagnostic. You only pay once scope is agreed in writing.",
            )}
          </p>
        </div>
      </section>

      {/* 2 — Service cards */}
      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {SERVICES.map((service) => (
              <article
                key={service.id}
                className={`${styles.card} ${service.highlight ? styles.cardHighlight : ""}`}
              >
                <div className={styles.cardHead}>
                  <h2 className={styles.cardTitle}>{t(service.title)}</h2>
                  <span
                    className={`${styles.price} ${service.priceFree ? styles.priceFree : ""}`}
                  >
                    {t(service.price)}
                  </span>
                </div>
                <p className={styles.cardDesc}>{t(service.description)}</p>
                <Link href={service.href} className={styles.cardLink}>
                  {t(service.priceFree ? "Request a diagnostic" : "Learn more")}
                  <Plus size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — How it works */}
      <section className={`section ${styles.stepsSection}`}>
        <div className="container">
          <h2 className={styles.stepsTitle}>
            {t("How Every Engagement Starts")}
          </h2>
          <div className={styles.steps}>
            {STEPS.map((step, i) => (
              <div key={step.name} className={styles.step}>
                <span className={styles.stepNumber}>{i + 1}</span>
                <h3 className={styles.stepName}>{t(step.name)}</h3>
                <p className={styles.stepDesc}>{t(step.description)}</p>
              </div>
            ))}
          </div>
          <Link href="/#how-the-diagnostic-works" className={styles.stepsLink}>
            {t("See the full diagnostic process")}
            <Plus size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* 4 — CTA */}
      <section className={`section ${styles.ctaSection}`}>
        <div className="container">
          <div className={styles.ctaBlock}>
            <PlusMark size={180} className={styles.ctaPlusTop} />
            <PlusMark size={100} className={styles.ctaPlusBottom} />
            <h2>{t("Start With a Free Diagnostic")}</h2>
            <div className={styles.ctaActions}>
              <Button variant="on-brand" href="/#diagnostic-request-form" icon>
                {t("Request a Diagnostic")}
              </Button>
              <Link href="/about">
                <Button variant="on-brand-outline">
                  {t("Learn About Our Team")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

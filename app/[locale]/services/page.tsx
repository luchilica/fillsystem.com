import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import {
  Stethoscope,
  Zap,
  FileSearch,
  Wrench,
  ShieldCheck,
  Workflow,
  Bot,
  BarChart3,
  Award,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { getT } from "@/i18n/t";
import { siteConfig } from "@/lib/site-config";
import { LOCALE_META, type Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor, localizedUrl } from "@/lib/i18n";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import Button from "@/components/ui/Button";
import PlusMark from "@/components/ui/PlusMark";
import styles from "./ServicesHub.module.css";

const TITLE = "B2B Development Services & Pricing";
const DESCRIPTION =
  "IT diagnostics, RevOps, CRM audits, AI automation & process optimization for B2B companies (50-250 employees). Transparent pricing.";

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

const SERVICES: {
  id: string;
  title: string;
  description: string;
  price: string;
  priceFree: boolean;
  highlight: boolean;
  href: string;
  Icon: LucideIcon;
}[] = [
  {
    id: "primary-diagnostic",
    title: "Primary Diagnostic",
    description:
      "A complimentary 30-45 minute fit review to frame the problem and identify bottlenecks.",
    price: "Free",
    priceFree: true,
    highlight: true,
    href: "/services/business-diagnostic",
    Icon: Stethoscope,
  },
  {
    id: "advisory-power-hour",
    title: "Advisory Power Hour",
    description:
      "Bring one concrete problem. Leave with expert direction in 60 minutes.",
    price: "from $350",
    priceFree: false,
    highlight: false,
    href: "/services/advisory-power-hour",
    Icon: Zap,
  },
  {
    id: "extended-diagnostic",
    title: "Extended Diagnostic",
    description:
      "A documented diagnosis of processes, systems, and risks.",
    price: "from $1,400",
    priceFree: false,
    highlight: false,
    href: "/services/business-diagnostic",
    Icon: FileSearch,
  },
  {
    id: "addon-tool",
    title: "Add-on Tool Build",
    description:
      "A focused build: Telegram bot, landing page, or email campaign.",
    price: "from $1,100",
    priceFree: false,
    highlight: false,
    href: "/services/addon-tool-build",
    Icon: Wrench,
  },
  {
    id: "it-risk",
    title: "IT Risk & Security",
    description:
      "Review of accounts, access, data handling, and single points of failure.",
    price: "from $2,100",
    priceFree: false,
    highlight: false,
    href: "/services/it-risk-security",
    Icon: ShieldCheck,
  },
  {
    id: "process-operations",
    title: "Process & Operations",
    description:
      "Redesign handoffs, approvals, and ownership for growing teams.",
    price: "from $3,700",
    priceFree: false,
    highlight: false,
    href: "/services/process-operations",
    Icon: Workflow,
  },
  {
    id: "automation",
    title: "AI & Process Automation",
    description:
      "Remove manual, repetitive work where it actually pays off.",
    price: "from $4,100",
    priceFree: false,
    highlight: false,
    href: "/services/ai-process-automation",
    Icon: Bot,
  },
  {
    id: "revops",
    title: "RevOps: CRM, Data & Reporting",
    description:
      "Make your CRM, pipeline, and reporting trustworthy again.",
    price: "from $5,100",
    priceFree: false,
    highlight: false,
    href: "/services/revops-crm-consulting",
    Icon: BarChart3,
  },
  {
    id: "o1-readiness",
    title: "O-1 Readiness Support",
    description:
      "Structure the evidence behind an O-1 extraordinary-ability case.",
    price: "from $2,700",
    priceFree: false,
    highlight: false,
    href: "/o1-visa-readiness",
    Icon: Award,
  },
];

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
        name: "B2B Development Services",
        description:
          "Diagnostic-first IT and business development for B2B companies with 50-250 employees.",
        serviceType: "IT and business development",
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
            price: "350",
            priceCurrency: "USD",
            description:
              "Bring one concrete problem. Leave with expert direction in 60 minutes.",
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
              "A documented diagnosis of processes, systems, and risks.",
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
              "A focused build: Telegram bot, landing page, or email campaign.",
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
              "Review of accounts, access, data handling, and single points of failure.",
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
              "Redesign handoffs, approvals, and ownership for growing teams.",
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
              "Remove manual, repetitive work where it actually pays off.",
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
              "Make your CRM, pipeline, and reporting trustworthy again.",
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
          <h1>{t("B2B Development Services & Pricing")}</h1>
          <p className={`lead ${styles.lead}`}>
            {t(
              "Every engagement starts with a free diagnostic. You only pay once scope is agreed in writing.",
            )}
          </p>
        </div>
      </section>

      {/* 2 — Service cards (dark ink background) */}
      <section className={`section ${styles.darkSection}`}>
        <PlusMark size={200} className={styles.darkPlusTop} />
        <PlusMark size={110} className={styles.darkPlusBottom} />
        <div className="container">
          <h2 className={styles.sectionHeading}>{t("Our Services")}</h2>
          <div className={styles.grid}>
            {SERVICES.map((service) => (
              <article
                key={service.id}
                className={`${styles.card} ${service.highlight ? styles.cardHighlight : ""}`}
              >
                <div className={styles.cardHead}>
                  <span className={styles.cardIcon} aria-hidden="true">
                    <service.Icon size={20} />
                  </span>
                  <span
                    className={`${styles.price} ${service.priceFree ? styles.priceFree : ""}`}
                  >
                    {t(service.price)}
                  </span>
                </div>
                <h2 className={styles.cardTitle}>{t(service.title)}</h2>
                <p className={styles.cardDesc}>{t(service.description)}</p>
                <Link href={service.href} className={styles.cardLink}>
                  {t(service.priceFree ? "Request a diagnostic" : "Learn more")}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — How it works (brand blue) */}
      <section className={`section ${styles.brandSection}`}>
        <PlusMark size={160} className={styles.brandPlusTop} />
        <PlusMark size={90} className={styles.brandPlusBottom} />
        <div className="container">
          <h2>{t("How Every Engagement Starts")}</h2>
          <div className={styles.steps}>
            {STEPS.map((step, i) => (
              <div key={step.name} className={styles.step}>
                <span className={styles.stepNumber}>{i + 1}</span>
                <h3 className={styles.stepName}>{t(step.name)}</h3>
                <p className={styles.stepDesc}>{t(step.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — CTA */}
      <section className={`section ${styles.ctaDark}`}>
        <PlusMark size={180} className={styles.ctaPlusTop} />
        <PlusMark size={100} className={styles.ctaPlusBottom} />
        <div className="container">
          <h2 className={styles.ctaHeading}>
            {t("Start With a Free Diagnostic")}
          </h2>
          <p className={styles.ctaLead}>
            {t(
              "30-45 minutes. No commitment. You get a clear next step.",
            )}
          </p>
          <div className={styles.ctaActions}>
            <Button href="/#diagnostic-request-form" variant="on-brand" icon>
              {t("Request a Diagnostic")}
            </Button>
            <Button href="/about" variant="on-brand-outline">
              {t("About Our Team")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

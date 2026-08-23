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
import { SERVICE_DEFS } from "@/lib/services";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import Button from "@/components/ui/Button";
import PlusMark from "@/components/ui/PlusMark";
import styles from "./ServicesHub.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getT();
  const title = t("B2B Consulting Services & Pricing");
  const description = t("IT diagnostics, RevOps, CRM audits, AI automation & process optimization for B2B companies (50-250 employees). Transparent pricing.");
  return {
    title,
    description,
    alternates: alternatesFor(loc, "/services"),
    robots: robotsFor(loc),
    openGraph: {
      title: `${title} | Fill System`,
      description,
      url: localizedUrl(loc, "/services"),
      type: "website",
      siteName: siteConfig.name,
      locale: LOCALE_META[loc].ogLocale,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fill System Services - B2B IT & Operations Consulting" }],
    },
  };
}

// Service id → Lucide icon (display-only, not part of shared data).
const ICON_MAP: Record<string, LucideIcon> = {
  "primary-diagnostic": Stethoscope,
  "advisory-power-hour": Zap,
  "extended-diagnostic": FileSearch,
  "addon-tool": Wrench,
  "it-risk": ShieldCheck,
  "process-operations": Workflow,
  "automation": Bot,
  "revops": BarChart3,
  "o1-readiness": Award,
};

const SERVICES = SERVICE_DEFS.map((def) => ({
  id: def.id,
  title: def.title,
  description: def.description,
  price: def.free ? "Free" : `from $${def.basePrice.toLocaleString("en-US")}`,
  priceFree: def.free,
  highlight: def.free,
  href: def.href,
  Icon: ICON_MAP[def.id],
}));

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

  const pageTitle = t("B2B Consulting Services & Pricing");
  const pageDescription = t("IT diagnostics, RevOps, CRM audits, AI automation & process optimization for B2B companies (50-250 employees). Transparent pricing.");

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${home}#organization`,
        name: siteConfig.name,
        url: home,
      },
      {
        "@type": "WebPage",
        "@id": pageUrl,
        name: pageTitle,
        description: pageDescription,
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
        offers: SERVICE_DEFS.filter((def) => !def.standalone).map((def) => {
          if (def.free || def.fixed) {
            return {
              "@type": "Offer" as const,
              name: def.title,
              price: String(def.basePrice),
              priceCurrency: "USD",
              description: def.description,
            };
          }
          return {
            "@type": "Offer" as const,
            name: def.title,
            priceSpecification: {
              "@type": "PriceSpecification" as const,
              minPrice: String(def.basePrice),
              priceCurrency: "USD",
            },
            description: def.description,
          };
        }),
      },
    ],
  };

  return (
    <>
      <BreadcrumbJsonLd title={t("Services")} path="/services" locale={locale as Locale} />
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
          <p>
            {t(
              "We work with B2B companies between 50 and 250 employees - SaaS, professional services, logistics, manufacturing, and multi-location operators. All prices below are base prices for teams of approximately 50 employees. Larger teams may see adjusted pricing based on the number of systems, workflows, and stakeholders involved.",
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

      {/* 4 — What to expect */}
      <section className="section">
        <div className="container">
          <h2>{t("What to expect")}</h2>
          <p>
            {t(
              "The initial diagnostic conversation takes 30-45 minutes and is complimentary. If the diagnostic identifies a clear next step, we provide a fixed-scope proposal with defined deliverables and pricing before any commitment. Paid engagements are scoped individually based on what the diagnostic uncovers.",
            )}
          </p>
          <p>
            {t(
              "Most diagnostic and advisory work is remote-first. We work with environments using HubSpot, Salesforce, Pipedrive, Asana, Monday, Notion, QuickBooks, Zapier, Make, and related business tools. On-site work in California is available when the scope requires it.",
            )}
          </p>
          <p>
            {t(
              "We do not offer guaranteed ROI projections, staff augmentation, SaaS license reselling, or implementation-only work without a diagnostic phase. If the diagnostic shows no engagement is needed, we say so - a no-fit decision is a valid outcome.",
            )}
          </p>
        </div>
      </section>

      {/* 5 — CTA */}
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

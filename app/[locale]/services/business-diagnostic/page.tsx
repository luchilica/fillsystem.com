import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import PlusMark from "@/components/ui/PlusMark";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/locales";
import { LOCALE_META } from "@/i18n/locales";
import { alternatesFor, robotsFor, localizedUrl } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { getT } from "@/i18n/t";
import styles from "./BusinessDiagnostic.module.css";

const TITLE =
  "Business & IT Diagnostic for B2B Teams | Opsfield Systems";
const DESCRIPTION =
  "Free 30-45 minute diagnostic for B2B companies with 50-250 employees. We map process, CRM, data flow, and IT bottlenecks before you commit budget to tools, hires, or implementation.";

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
    alternates: alternatesFor(loc, "/services/business-diagnostic"),
    robots: robotsFor(loc),
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: localizedUrl(loc, "/services/business-diagnostic"),
      type: "website",
      siteName: siteConfig.name,
      locale: LOCALE_META[loc].ogLocale,
    },
  };
}

// Review items for the "What We Review" grid.
const REVIEW_ITEMS = [
  {
    title: "Workflows & handoffs",
    description:
      "Who owns what, where work stalls, which approvals add friction.",
  },
  {
    title: "CRM & data flow",
    description:
      "How data moves between teams, tools, and reports.",
  },
  {
    title: "Reporting & dashboards",
    description: "Whether your numbers tell the truth.",
  },
  {
    title: "Automation state",
    description:
      "What is automated, what should be, what should not.",
  },
  {
    title: "IT & access risk",
    description:
      "Single points of failure, access gaps, data handling.",
  },
  {
    title: "Decision bottlenecks",
    description:
      "Where decisions wait for information that already exists.",
  },
] as const;

// Expanded process steps.
const STEPS = [
  {
    name: "Review",
    description:
      "We review workflows, systems, CRM usage, reporting, automation, and decision bottlenecks. The first 30-45 minutes are complimentary and carry no obligation.",
  },
  {
    name: "Map & Score",
    description:
      "We map likely root causes and score fixes by impact, effort, risk, dependency, and business value. This produces a bottleneck list, priority matrix, and risk notes.",
  },
  {
    name: "Recommend",
    description:
      "You receive a clear next step: extended audit, assessment, roadmap, advisory, implementation support, pause, or no-fit. A no-fit decision is a valid outcome.",
  },
] as const;

// Diagnostic output items.
const OUTPUT_ITEMS = [
  { text: "Problem summary", extended: false },
  { text: "Root-cause hypotheses", extended: false },
  { text: "Fit / no-fit decision", extended: false },
  { text: "Bottleneck map", extended: true },
  { text: "Priority matrix", extended: true },
  { text: "Written roadmap recommendation", extended: true },
] as const;

// FAQ entries.
const FAQ_ITEMS = [
  {
    question: "Is the first conversation really free?",
    answer:
      "Yes. The primary diagnostic is a complimentary 30-45 minute fit review. No obligation, no hidden costs. Paid engagements start only after a separate written proposal.",
  },
  {
    question: "What do I need to prepare?",
    answer:
      "Nothing specific. We ask questions about your current workflows, tools, and pain points. No system access is needed for the initial conversation.",
  },
  {
    question: "How quickly can we start?",
    answer:
      "Most diagnostics are scheduled within a few business days of the request.",
  },
  {
    question: "What if you find nothing wrong?",
    answer:
      "Then we tell you. A no-fit decision is a valid and common outcome. We will not manufacture problems to justify an engagement.",
  },
] as const;

export default async function BusinessDiagnosticPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getT();
  const loc = locale as Locale;
  const home = siteConfig.url;
  const pageUrl = localizedUrl(loc, "/services/business-diagnostic");

  // 3-level breadcrumb: Home > Services > Business Diagnostic
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
        name: "Business Diagnostic",
        item: pageUrl,
      },
    ],
  };

  // Service JSON-LD for this specific service.
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: "Business & IT Diagnostic",
    description: DESCRIPTION,
    serviceType: "IT and business diagnostic",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: home,
    },
    areaServed: { "@type": "Country", name: "United States" },
    url: pageUrl,
    offers: [
      {
        "@type": "Offer",
        name: "Primary Diagnostic",
        price: "0",
        priceCurrency: "USD",
        description:
          "Complimentary 30-45 minute fit review. Problem framing and fit decision.",
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
          "1-2 week documented process and systems map with prioritized bottleneck list, risk matrix, and written roadmap.",
      },
    ],
  };

  // FAQPage JSON-LD for the FAQ section.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      {/* Section 1 — Hero */}
      <section className={`section ${styles.heroSection}`}>
        <div className="container">
          <h1>
            {t("Business & IT Diagnostic for B2B Teams")}
          </h1>
          <p className={`lead ${styles.lead}`}>
            {t(
              "A structured first step before another tool, hire, or implementation project. The first conversation is complimentary.",
            )}
          </p>
        </div>
      </section>

      {/* Section 2 — What We Review */}
      <section className={`section ${styles.darkSection}`}>
        <PlusMark size={160} className={styles.darkPlusTop} />
        <PlusMark size={90} className={styles.darkPlusBottom} />
        <div className="container">
          <h2>{t("What We Review")}</h2>
          <div className={styles.reviewGrid}>
            {REVIEW_ITEMS.map((item) => (
              <div key={item.title} className={styles.reviewItem}>
                <h3 className={styles.reviewItemTitle}>
                  {t(item.title)}
                </h3>
                <p className={styles.reviewItemDesc}>
                  {t(item.description)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — How the Diagnostic Process Works */}
      <section className={`section ${styles.stepsSection}`}>
        <div className="container">
          <h2>{t("How the Diagnostic Process Works")}</h2>
          <div className={styles.steps}>
            {STEPS.map((step, i) => (
              <div key={step.name} className={styles.step}>
                <span className={styles.stepNumber}>{i + 1}</span>
                <h3 className={styles.stepName}>{t(step.name)}</h3>
                <p className={styles.stepDesc}>
                  {t(step.description)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Diagnostic Output */}
      <section className={`section ${styles.brandSection}`}>
        <PlusMark size={160} className={styles.brandPlusTop} />
        <PlusMark size={90} className={styles.brandPlusBottom} />
        <div className="container">
          <h2>{t("Diagnostic Output")}</h2>
          <ul className={styles.outputList}>
            {OUTPUT_ITEMS.map((item) => (
              <li key={item.text} className={styles.outputItem}>
                <span className={styles.outputBullet} aria-hidden="true" />
                <span>
                  {t(item.text)}
                  {item.extended && (
                    <span className={styles.outputExtended}>
                      {" "}
                      {t("(if extended)")}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section 5 — Free vs Extended Diagnostic */}
      <section className="section">
        <div className="container">
          <h2>{t("Free Diagnostic vs. Extended Diagnostic")}</h2>
          <div className={styles.comparisonGrid}>
            {/* Primary Diagnostic */}
            <div
              className={`${styles.comparisonCard} ${styles.comparisonCardHighlight}`}
            >
              <div className={styles.comparisonHeader}>
                <h3 className={styles.comparisonTitle}>
                  {t("Primary Diagnostic")}
                </h3>
                <span
                  className={`${styles.comparisonPrice} ${styles.comparisonPriceFree}`}
                >
                  {t("Free")}
                </span>
              </div>
              <div className={styles.comparisonMeta}>
                <span className={styles.comparisonMetaItem}>
                  {t("30-45 minutes")}
                </span>
              </div>
              <ul className={styles.comparisonFeatures}>
                <li className={styles.comparisonFeature}>
                  <span className={styles.checkmark} aria-hidden="true">
                    +
                  </span>
                  <span>{t("Problem framing")}</span>
                </li>
                <li className={styles.comparisonFeature}>
                  <span className={styles.checkmark} aria-hidden="true">
                    +
                  </span>
                  <span>{t("Fit / no-fit decision")}</span>
                </li>
                <li className={styles.comparisonFeature}>
                  <span className={styles.checkmark} aria-hidden="true">
                    +
                  </span>
                  <span>{t("No obligation")}</span>
                </li>
              </ul>
            </div>

            {/* Extended Diagnostic */}
            <div className={styles.comparisonCard}>
              <div className={styles.comparisonHeader}>
                <h3 className={styles.comparisonTitle}>
                  {t("Extended Diagnostic")}
                </h3>
                <span
                  className={`${styles.comparisonPrice} ${styles.comparisonPricePaid}`}
                >
                  {t("from $1,200")}
                </span>
              </div>
              <div className={styles.comparisonMeta}>
                <span className={styles.comparisonMetaItem}>
                  {t("1-2 weeks")}
                </span>
              </div>
              <ul className={styles.comparisonFeatures}>
                <li className={styles.comparisonFeature}>
                  <span className={styles.checkmark} aria-hidden="true">
                    +
                  </span>
                  <span>{t("Documented process & systems map")}</span>
                </li>
                <li className={styles.comparisonFeature}>
                  <span className={styles.checkmark} aria-hidden="true">
                    +
                  </span>
                  <span>{t("Prioritized bottleneck list")}</span>
                </li>
                <li className={styles.comparisonFeature}>
                  <span className={styles.checkmark} aria-hidden="true">
                    +
                  </span>
                  <span>{t("Risk matrix")}</span>
                </li>
                <li className={styles.comparisonFeature}>
                  <span className={styles.checkmark} aria-hidden="true">
                    +
                  </span>
                  <span>{t("Written roadmap")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 — FAQ */}
      <section className="section">
        <div className="container">
          <div className={styles.faqSection}>
            <PlusMark size={160} className={styles.faqPlusTop} />
            <PlusMark size={90} className={styles.faqPlusBottom} />
            <h2>{t("Diagnostic FAQ")}</h2>
            <div className={styles.faqList}>
              {FAQ_ITEMS.map((faq) => (
                <div key={faq.question} className={styles.faqItem}>
                  <h3 className={styles.faqQuestion}>
                    {t(faq.question)}
                  </h3>
                  <p className={styles.faqAnswer}>{t(faq.answer)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 7 — CTA */}
      <section className={`section ${styles.ctaSection}`}>
        <div className="container">
          <div className={styles.ctaBlock}>
            <PlusMark size={180} className={styles.ctaPlusTop} />
            <PlusMark size={100} className={styles.ctaPlusBottom} />
            <h2>
              {t("Request a Business & IT Diagnostic")}
            </h2>
            <p className={styles.ctaLead}>
              {t(
                "The first diagnostic conversation is complimentary. We frame the problem, identify bottlenecks, and tell you whether a paid engagement is warranted.",
              )}
            </p>
            <div className={styles.ctaActions}>
              <Button
                href="/#diagnostic-request-form"
                variant="on-brand"
                icon
              >
                {t("Request a Diagnostic")}
              </Button>
              <Button href="/services" variant="on-brand-outline">
                {t("See All Services")}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

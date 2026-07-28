import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getT } from "@/i18n/t";
import { siteConfig } from "@/lib/site-config";
import { LOCALE_META, type Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor, localizedUrl } from "@/lib/i18n";
import Button from "@/components/ui/Button";
import PlusMark from "@/components/ui/PlusMark";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { Link } from "@/i18n/navigation";
import { Check } from "lucide-react";
import styles from "./ITRiskSecurity.module.css";

const TITLE = "IT Risk & Security Audit for B2B Companies";
const DESCRIPTION =
  "Focused IT risk review for B2B companies: account access, data handling, single points of failure, and a prioritized fix list. From $2,100.";

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
    alternates: alternatesFor(loc, "/services/it-risk-security"),
    robots: robotsFor(loc),
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: localizedUrl(loc, "/services/it-risk-security"),
      type: "website",
      siteName: siteConfig.name,
      locale: LOCALE_META[loc].ogLocale,
    },
  };
}

const REVIEW_ITEMS = [
  {
    title: "Account & access review",
    description:
      "Who has access to what, where are shared credentials, and what happens when someone leaves.",
  },
  {
    title: "Data handling risks",
    description:
      "How sensitive data moves between tools, who can export it, and where it is stored.",
  },
  {
    title: "Single points of failure",
    description:
      "The systems, accounts, and people that would halt operations if unavailable.",
  },
  {
    title: "Backup & recovery",
    description:
      "Whether critical data and configurations can be restored, and how long that takes.",
  },
  {
    title: "Vendor & integration risk",
    description:
      "Third-party tools with broad access, outdated integrations, and shadow IT.",
  },
  {
    title: "Compliance readiness",
    description:
      "Basic posture review against SOC 2, GDPR, or industry requirements relevant to your business.",
  },
] as const;

const DELIVERABLES = [
  "Risk register with severity ratings",
  "Prioritized fix list (effort vs. impact)",
  "Access matrix (who has access to what)",
  "Single points of failure map",
  "90-day remediation roadmap",
] as const;

const FAQ = [
  {
    question: "Is this a penetration test?",
    answer:
      "No. This is an operational risk review focused on access, data handling, and failure points - not a technical exploitation test. If you need a pen test, we can recommend a partner.",
  },
  {
    question: "Do you handle compliance certifications?",
    answer:
      "We review your posture against frameworks like SOC 2 or GDPR, but we do not issue certifications. The audit output helps you prepare for a formal certification process.",
  },
  {
    question: "What access do you need?",
    answer:
      "For the initial diagnostic, no access is needed. For the full audit, we request read-only access to admin consoles, user lists, and integration settings. We never request write access.",
  },
  {
    question: "How often should we do this?",
    answer:
      "At minimum annually, or after major changes: new tools, team restructuring, M&A, or a security incident.",
  },
] as const;

export default async function ITRiskSecurity({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getT();
  const loc = locale as Locale;
  const home = siteConfig.url;
  const pageUrl = localizedUrl(loc, "/services/it-risk-security");

  // Three-level breadcrumb: Home > Services > IT Risk & Security
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
        name: "IT Risk & Security",
        item: pageUrl,
      },
    ],
  };

  // Service JSON-LD + FAQPage for this service page.
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
        name: "IT Risk & Security Audit",
        description:
          "Focused IT risk review for B2B companies: account access, data handling, single points of failure, and a prioritized fix list.",
        serviceType: "IT risk and security audit",
        provider: { "@id": `${home}#organization` },
        areaServed: { "@type": "Country", name: "United States" },
        url: pageUrl,
        offers: {
          "@type": "Offer",
          name: "IT Risk & Security Audit",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: "2100",
            priceCurrency: "USD",
          },
          description:
            "IT Risk & Security audits start from $2,100 for a lean 25-50 person team. Scope and cost set by the free diagnostic.",
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
          <h1>{t("IT Risk & Security Audit for B2B")}</h1>
          <p className={`lead ${styles.lead}`}>
            {t(
              "See where your data, access, and systems put the business at risk. A focused review scaled to a small company, not an enterprise compliance framework.",
            )}
          </p>
        </div>
      </section>

      {/* 2 -- What We Review */}
      <section className={`section ${styles.darkSection}`}>
        <PlusMark size={160} className={styles.darkPlusTop} />
        <PlusMark size={90} className={styles.darkPlusBottom} />
        <div className="container">
          <h2>{t("What the IT Risk Audit Covers")}</h2>
          <div className={styles.reviewGrid}>
            {REVIEW_ITEMS.map((item) => (
              <div key={item.title} className={styles.reviewCard}>
                <h3 className={styles.reviewTitle}>{t(item.title)}</h3>
                <p className={styles.reviewDesc}>{t(item.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 -- What You Receive */}
      <section className="section">
        <div className="container">
          <h2>{t("Audit Output")}</h2>
          <ul className={styles.deliverablesList}>
            {DELIVERABLES.map((item) => (
              <li key={item} className={styles.deliverableItem}>
                <span className={styles.checkIcon} aria-hidden="true">
                  <Check size={14} strokeWidth={2.5} />
                </span>
                <p className={styles.deliverableText}>{t(item)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 -- Who This Is For */}
      <section className={`section ${styles.brandSection}`}>
        <PlusMark size={160} className={styles.brandPlusTop} />
        <PlusMark size={90} className={styles.brandPlusBottom} />
        <div className="container">
          <h2>{t("Who This Audit Is For")}</h2>
          <div className={styles.audienceBlock}>
            <p className={styles.audienceText}>
              {t(
                "B2B companies with 25-250 employees that have grown faster than their IT controls. You have SaaS tools, remote team members, integrations, and data flowing between systems - but no dedicated security team reviewing it.",
              )}
            </p>
            <p className={styles.audienceText}>
              {t(
                "This is not a penetration test or a compliance certification. It is a practical, plain-language review of where your business is exposed and what to fix first.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 5 -- Pricing */}
      <section className="section">
        <div className="container">
          <h2>{t("Pricing")}</h2>
          <div className={styles.pricingCard}>
            <p className={styles.pricingPrice}>
              {t("From $2,100")}
            </p>
            <p className={styles.pricingBody}>
              {t(
                "IT Risk & Security audits start from $2,100 for a lean 25-50 person team. The exact scope is set by the free diagnostic.",
              )}
            </p>
            <p className={styles.pricingTimeline}>
              {t(
                "Timeline: 1-3 weeks depending on the number of systems, integrations, and team members.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 6 -- FAQ */}
      <section className="section">
        <div className="container">
          <h2>{t("IT Security Audit FAQ")}</h2>
          <FaqAccordion
            items={FAQ.map((item) => ({
              question: t(item.question),
              answer: t(item.answer),
            }))}
          />
        </div>
      </section>

      {/* 7 -- CTA */}
      <section className={`section ${styles.ctaDark}`}>
        <PlusMark size={180} className={styles.ctaPlusTop} />
        <PlusMark size={100} className={styles.ctaPlusBottom} />
        <div className="container">
          <h2 className={styles.ctaHeading}>{t("Review Your IT Risk")}</h2>
          <p className={styles.ctaLead}>{t("Access, data handling, failure points. One focused review.")}</p>
          <div className={styles.ctaActions}>
            <Button href="/#diagnostic-request-form" variant="on-brand" icon data-request-type="IT Risk & Security">
              {t("Start With a Free IT Risk Review")}
            </Button>
            <Link href="/services">
              <Button variant="on-brand-outline">{t("See All Services")}</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

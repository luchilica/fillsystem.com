import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getT } from "@/i18n/t";
import { siteConfig } from "@/lib/site-config";
import { LOCALE_META, type Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor, localizedUrl } from "@/lib/i18n";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import Button from "@/components/ui/Button";
import { Check, X } from "lucide-react";
import PlusMark from "@/components/ui/PlusMark";
import { Link } from "@/i18n/navigation";
import styles from "./O1Readiness.module.css";

const TITLE =
  "O-1 Visa Readiness Support";
const DESCRIPTION =
  "Structure evidence for an O-1 extraordinary-ability case. Publication strategy, portfolio architecture, and recommendation coordination.";

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
    alternates: alternatesFor(loc, "/o1-visa-readiness"),
    robots: robotsFor(loc),
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: localizedUrl(loc, "/o1-visa-readiness"),
      type: "website",
      siteName: siteConfig.name,
      locale: LOCALE_META[loc].ogLocale,
    },
  };
}

const WE_DO = [
  "Evidence & criteria mapping",
  "Publication & visibility strategy",
  "Portfolio & profile architecture",
  "Recommendation letter coordination",
  "Expert positioning & thought leadership plan",
] as const;

const WE_DONT = [
  "Legal advice",
  "Petition filing",
  "Immigration law interpretation",
  "Attorney selection",
  "USCIS communication",
] as const;

const O1_CRITERIA = [
  "Awards or prizes for excellence",
  "Membership in associations requiring outstanding achievement",
  "Published material about the applicant",
  "Judging the work of others",
  "Original contributions of major significance",
  "Authorship of scholarly articles",
  "Employment in a critical or essential capacity",
  "High salary or remuneration",
] as const;

const STEPS = [
  {
    label: "Profile assessment",
    description:
      "We review your background against the 8 criteria and identify which 3+ are strongest.",
  },
  {
    label: "Evidence building",
    description:
      "We help create the missing pieces: publication strategy, speaking engagements, portfolio structure, recommendation coordination.",
  },
  {
    label: "Package handover",
    description:
      "You receive an organized evidence package ready for your immigration attorney to use in the petition.",
  },
] as const;

const FAQ = [
  {
    question: "Are you immigration attorneys?",
    answer:
      "No. We help structure evidence and build your professional profile. All legal work - petition drafting, filing, USCIS communication - is handled by qualified immigration attorneys.",
  },
  {
    question: "Can you guarantee O-1 approval?",
    answer:
      "No one can guarantee approval. What we do is maximize the strength of your evidence portfolio so your attorney has the best material to work with.",
  },
  {
    question: "Do I need to have publications already?",
    answer:
      "Not necessarily. Part of our work is helping you develop a publication and visibility strategy. Many successful O-1 applicants start building their public profile 6–12 months before filing.",
  },
  {
    question: "Do you recommend immigration attorneys?",
    answer:
      "We coordinate with qualified immigration counsel but do not make attorney recommendations. If you already have an attorney, we work with them directly.",
  },
] as const;

export default async function O1VisaReadiness({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getT();
  const loc = locale as Locale;
  const home = siteConfig.url;
  const pageUrl = localizedUrl(loc, "/o1-visa-readiness");

  // Two-level breadcrumb: Home > O-1 Visa Readiness
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
        name: "O-1 Visa Readiness",
        item: pageUrl,
      },
    ],
  };

  // Service JSON-LD + FAQPage for this page.
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
        name: "O-1 Visa Readiness Support",
        description:
          "Structure the evidence behind an O-1 extraordinary-ability case. Publication strategy, portfolio architecture, recommendation coordination.",
        serviceType: "O-1 visa evidence preparation",
        provider: { "@id": `${home}#organization` },
        areaServed: { "@type": "Country", name: "United States" },
        url: pageUrl,
        offers: {
          "@type": "Offer",
          name: "O-1 Readiness Support",
          price: "2500",
          priceCurrency: "USD",
          description:
            "Fixed-price engagement for O-1 visa evidence preparation and portfolio building.",
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
          <h1>{t("O-1 Visa Readiness Support")}</h1>
          <p className={`lead ${styles.lead}`}>
            {t(
              "For IT professionals and founders exploring the O-1 visa path. We help structure the evidence of extraordinary ability - publications, portfolio, recommendations, expert positioning. We work alongside qualified immigration counsel.",
            )}
          </p>
        </div>
      </section>

      {/* 2 -- What We Do vs. What We Don't */}
      <section className={`section ${styles.darkSection}`}>
        <PlusMark className={styles.darkPlusTop} size={120} />
        <PlusMark className={styles.darkPlusBottom} size={80} />
        <div className="container">
          <h2>{t("What This Service Covers")}</h2>
          <div className={styles.scopeGrid}>
            <div className={styles.scopeCard}>
              <h3 className={styles.scopeTitle}>{t("What we do")}</h3>
              <ul className={styles.scopeList}>
                {WE_DO.map((item) => (
                  <li key={item} className={styles.scopeItem}>
                    <span className={styles.checkIcon} aria-hidden="true">
                      <Check size={14} strokeWidth={2.5} />
                    </span>
                    <span>{t(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.scopeCard}>
              <h3 className={styles.scopeTitle}>{t("What we don’t do")}</h3>
              <ul className={styles.scopeList}>
                {WE_DONT.map((item) => (
                  <li key={item} className={styles.scopeItem}>
                    <span className={styles.xIcon} aria-hidden="true">
                      <X size={14} strokeWidth={2.5} />
                    </span>
                    <span>{t(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className={styles.disclaimer}>
            {t(
              "We are not immigration attorneys. All legal work is performed by qualified counsel. Our role is to prepare the evidence portfolio that supports the legal case.",
            )}
          </p>
        </div>
      </section>

      {/* 3 -- The O-1 Criteria */}
      <section className="section">
        <div className="container">
          <h2>{t("O-1A Extraordinary Ability: What USCIS Looks For")}</h2>
          <ol className={styles.criteriaList}>
            {O1_CRITERIA.map((item) => (
              <li key={item} className={styles.criteriaItem}>
                {t(item)}
              </li>
            ))}
          </ol>
          <p className={styles.criteriaNote}>
            {t(
              "You need to meet at least 3 of 8 criteria. We help identify which criteria are strongest for your profile and build the evidence for each.",
            )}
          </p>
        </div>
      </section>

      {/* 4 -- How It Works */}
      <section className={`section ${styles.brandSection}`}>
        <PlusMark className={styles.brandPlusTop} size={120} />
        <PlusMark className={styles.brandPlusBottom} size={80} />
        <div className="container">
          <h2>{t("How O-1 Readiness Works")}</h2>
          <div className={styles.stepsGrid}>
            {STEPS.map((step, i) => (
              <div key={step.label} className={styles.stepCard}>
                <span className={styles.stepNumber}>{i + 1}</span>
                <h3 className={styles.stepLabel}>{t(step.label)}</h3>
                <p className={styles.stepDesc}>{t(step.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 -- Pricing */}
      <section className="section">
        <div className="container">
          <h2>{t("Pricing")}</h2>
          <div className={styles.pricingCard}>
            <p className={styles.pricingPrice}>{t("$2,500")}</p>
            <p className={styles.pricingBody}>
              {t(
                "O-1 Readiness Support is a fixed-price engagement at $2,500. Timeline is ongoing and case-dependent - most initial assessments take 2–3 weeks, with evidence building extending over 2–6 months depending on what needs to be created.",
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
            <h2>{t("O-1 Readiness FAQ")}</h2>
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
      <section className={`section ${styles.ctaDark}`}>
        <PlusMark size={180} className={styles.ctaPlusTop} />
        <PlusMark size={100} className={styles.ctaPlusBottom} />
        <div className="container">
          <h2 className={styles.ctaHeading}>{t("Structure Your O-1 Case")}</h2>
          <p className={styles.ctaLead}>{t("Evidence mapping, portfolio review, recommendation coordination.")}</p>
          <div className={styles.ctaActions}>
            <Button href="/#diagnostic-request-form" variant="on-brand" icon data-request-type="O-1 Readiness Support">
              {t("Ask About O-1 Readiness")}
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

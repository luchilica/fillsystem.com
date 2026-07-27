import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getT } from "@/i18n/t";
import { siteConfig } from "@/lib/site-config";
import { LOCALE_META, type Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor, localizedUrl } from "@/lib/i18n";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import Button from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { Check } from "lucide-react";
import styles from "./AdvisoryHour.module.css";

const TITLE =
  "Advisory Power Hour - $200 Expert Session | Opsfield Systems";
const DESCRIPTION =
  "Bring one concrete B2B problem — CRM, process, automation, or IT. Leave with expert direction in 60 minutes. $200, no scoping, no wait.";

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
    alternates: alternatesFor(loc, "/services/advisory-power-hour"),
    robots: robotsFor(loc),
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: localizedUrl(loc, "/services/advisory-power-hour"),
      type: "website",
      siteName: siteConfig.name,
      locale: LOCALE_META[loc].ogLocale,
    },
  };
}

const STEPS = [
  {
    number: "1",
    title: "Book",
    description: "Pick a time that works. No pre-qualification, no forms.",
  },
  {
    number: "2",
    title: "Prepare",
    description:
      "Write down the one problem you want direction on. Send it ahead so we start sharp.",
  },
  {
    number: "3",
    title: "Session",
    description:
      "60 minutes of focused, expert conversation. We diagnose, pressure-test, and recommend.",
  },
  {
    number: "4",
    title: "Act",
    description:
      "You leave with session notes, concrete recommendations, and a clear next step.",
  },
] as const;

const TOPICS = [
  "CRM architecture decisions",
  "Process bottleneck triage",
  "Automation feasibility",
  "Tool selection guidance",
  "Integration approach",
  "Data flow questions",
] as const;

const DELIVERABLES = [
  "Session notes",
  "Concrete recommendations",
  "Clear direction",
] as const;

const FAQ = [
  {
    question: "Can I book multiple sessions?",
    answer:
      "Yes. Some clients book a Power Hour every quarter to pressure-test a decision before committing. Each session is priced independently.",
  },
  {
    question: "What if I need more than 60 minutes?",
    answer:
      "If the problem is bigger than a single session, we will tell you. The next step is usually an Extended Diagnostic to properly scope the work.",
  },
  {
    question: "How do I prepare?",
    answer:
      "Write down the one problem you want direction on. The more specific, the more useful the session. Send it when you book so we can prepare on our side.",
  },
] as const;

export default async function AdvisoryPowerHour({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getT();
  const loc = locale as Locale;
  const home = siteConfig.url;
  const pageUrl = localizedUrl(loc, "/services/advisory-power-hour");

  // Three-level breadcrumb: Home > Services > Advisory Power Hour
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
        name: "Advisory Power Hour",
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
        name: "Advisory Power Hour",
        description:
          "Bring one concrete B2B problem — CRM, process, automation, or IT. Leave with expert direction in 60 minutes.",
        serviceType: "Expert advisory session",
        provider: { "@id": `${home}#organization` },
        areaServed: { "@type": "Country", name: "United States" },
        url: pageUrl,
        offers: {
          "@type": "Offer",
          name: "Advisory Power Hour",
          price: "200",
          priceCurrency: "USD",
          description:
            "$200 per session. 60 minutes. No long-term commitment.",
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
          <span className="kicker">{t("Advisory")}</span>
          <h1>{t("Advisory Power Hour")}</h1>
          <p className={`lead ${styles.lead}`}>
            {t(
              "Bring one concrete problem. Leave with expert direction in 60 minutes.",
            )}
          </p>
        </div>
      </section>

      {/* 2 -- How It Works */}
      <section className="section">
        <div className="container">
          <h2>{t("How the Power Hour Works")}</h2>
          <div className={styles.stepsGrid}>
            {STEPS.map((step) => (
              <div key={step.title} className={styles.stepCard}>
                <span className={styles.stepNumber}>{step.number}</span>
                <h3 className={styles.stepTitle}>{t(step.title)}</h3>
                <p className={styles.stepDesc}>{t(step.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 -- Topics We Cover */}
      <section className="section">
        <div className="container">
          <h2>{t("Topics We Cover")}</h2>
          <ul className={styles.topicsList}>
            {TOPICS.map((item) => (
              <li key={item} className={styles.topicItem}>
                <span className={styles.checkIcon} aria-hidden="true">
                  <Check size={14} strokeWidth={2.5} />
                </span>
                <p className={styles.topicText}>{t(item)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 -- What You Receive */}
      <section className="section">
        <div className="container">
          <h2>{t("What You Receive")}</h2>
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

      {/* 5 -- Pricing */}
      <section className="section">
        <div className="container">
          <h2>{t("Pricing")}</h2>
          <div className={styles.pricingCard}>
            <p className={styles.pricingPrice}>{t("$200")}</p>
            <p className={styles.pricingBody}>
              {t(
                "$200 per session. 60 minutes. No long-term commitment.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 6 -- FAQ */}
      <section className="section">
        <div className="container">
          <h2>{t("Power Hour FAQ")}</h2>
          <div className={styles.faqList}>
            {FAQ.map((item) => (
              <div key={item.question} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{t(item.question)}</h3>
                <p className={styles.faqAnswer}>{t(item.answer)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 -- CTA */}
      <section className={`section ${styles.ctaSection}`}>
        <div className="container">
          <h2>{t("Book a Power Hour")}</h2>
          <p className={styles.ctaLead}>
            {t(
              "Pick a time, send your question, and get expert direction in a single session.",
            )}
          </p>
          <div className={styles.ctaActions}>
            <Button
              href="/#diagnostic-request-form"
              variant="primary"
              icon
              data-request-type="Advisory Power Hour"
            >
              {t("Book a Power Hour")}
            </Button>
            <Link href="/services">
              <Button variant="secondary">
                {t("See All Services")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

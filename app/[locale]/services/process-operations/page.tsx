import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getT } from "@/i18n/t";
import { siteConfig } from "@/lib/site-config";
import { LOCALE_META, type Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor, localizedUrl } from "@/lib/i18n";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import Button from "@/components/ui/Button";
import { Check } from "lucide-react";
import PlusMark from "@/components/ui/PlusMark";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { Link } from "@/i18n/navigation";
import styles from "./ProcessOps.module.css";

const TITLE =
  "Process & Operations Consulting for B2B | Opsfield Systems";
const DESCRIPTION =
  "Redesign handoffs, approvals, and ownership for growing B2B teams. Operating model design sized for 25–250 employees. From $3,500.";

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
    alternates: alternatesFor(loc, "/services/process-operations"),
    robots: robotsFor(loc),
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: localizedUrl(loc, "/services/process-operations"),
      type: "website",
      siteName: siteConfig.name,
      locale: LOCALE_META[loc].ogLocale,
    },
  };
}

const PROBLEMS = [
  {
    title: "Undocumented workflows",
    description:
      "Critical processes live in people’s heads, not in writing. When someone is out, the work stalls.",
  },
  {
    title: "Ownership gaps between teams",
    description:
      "No one is clearly responsible for the handoff between sales and delivery, or between support and engineering.",
  },
  {
    title: "Duplicated work across departments",
    description:
      "Two teams maintain the same data, run similar reports, or solve the same problem in different tools.",
  },
  {
    title: "Approval bottlenecks",
    description:
      "Everything routes through one or two people. Decisions stall when they are unavailable.",
  },
  {
    title: "Inconsistent handoffs",
    description:
      "Work arrives incomplete, context is lost between stages, and downstream teams have to chase information.",
  },
  {
    title: "Scaling friction",
    description:
      "Processes that worked for 15 people break at 50. Adding headcount does not fix the underlying workflow.",
  },
] as const;

const DELIVERABLES = [
  "Target operating model",
  "Documented core workflows",
  "Ownership & handoff map",
  "Rollout checklist",
] as const;

const FAQ = [
  {
    question: "Is this a reorganization?",
    answer:
      "No. We clarify who owns what, not who reports to whom. The output is an operating model, not an org chart.",
  },
  {
    question: "Do you need access to our tools?",
    answer:
      "We review tool usage to understand how work flows, but the focus is on process, not software. Read-only access to key systems is helpful but not mandatory.",
  },
  {
    question: "Can this work remotely?",
    answer:
      "Yes. Most engagements are remote-first. We work through structured interviews, async reviews, and video sessions.",
  },
] as const;

export default async function ProcessOperations({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getT();
  const loc = locale as Locale;
  const home = siteConfig.url;
  const pageUrl = localizedUrl(loc, "/services/process-operations");

  // Three-level breadcrumb: Home > Services > Process & Operations
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
        name: "Process & Operations",
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
        name: "Process & Operations Consulting",
        description:
          "Redesign handoffs, approvals, and ownership for growing B2B teams. Operating model design sized for 25–250 employees.",
        serviceType: "Process and operations consulting",
        provider: { "@id": `${home}#organization` },
        areaServed: { "@type": "Country", name: "United States" },
        url: pageUrl,
        offers: {
          "@type": "Offer",
          name: "Process & Operations Consulting",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: "3500",
            priceCurrency: "USD",
          },
          description:
            "Process & Operations engagements start from $3,500. 2–4 weeks. Scope set by the free diagnostic.",
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
      <BreadcrumbJsonLd title="Process & Operations" path="/services/process-operations" />
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
          <h1>{t("Process & Operations Consulting for B2B")}</h1>
          <p className={`lead ${styles.lead}`}>
            {t(
              "Redesign the handoffs, approvals, and ownership that slow a growing team down.",
            )}
          </p>
        </div>
      </section>

      {/* 2 -- Common Process Problems */}
      <section className={`section ${styles.darkSection}`}>
        <PlusMark className={styles.darkPlusTop} size={120} />
        <PlusMark className={styles.darkPlusBottom} size={80} />
        <div className="container">
          <h2>{t("Common Process Problems")}</h2>
          <div className={styles.problemGrid}>
            {PROBLEMS.map((item) => (
              <div key={item.title} className={styles.problemCard}>
                <h3 className={styles.problemTitle}>{t(item.title)}</h3>
                <p className={styles.problemDesc}>{t(item.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 -- Engagement Deliverables */}
      <section className="section">
        <div className="container">
          <h2>{t("Engagement Deliverables")}</h2>
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

      {/* 4 -- Who It's For */}
      <section className={`section ${styles.brandSection}`}>
        <PlusMark className={styles.brandPlusTop} size={120} />
        <PlusMark className={styles.brandPlusBottom} size={80} />
        <div className="container">
          <h2>{t("Who This Is For")}</h2>
          <div className={styles.audienceBlock}>
            <p className={styles.audienceText}>
              {t(
                "B2B companies with 25–250 employees that have outgrown their original processes. You have more teams, more tools, and more complexity - but the processes were designed for a 10-person company.",
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
            <p className={styles.pricingPrice}>{t("From $3,500")}</p>
            <p className={styles.pricingBody}>
              {t(
                "From $3,500. 2–4 weeks. Scope set by the free diagnostic.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 6 -- FAQ */}
      <section className="section">
        <div className="container">
          <h2>{t("Process & Operations FAQ")}</h2>
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
          <h2 className={styles.ctaHeading}>{t("Redesign How You Work")}</h2>
          <p className={styles.ctaLead}>{t("Clarified ownership, documented workflows, removed duplication.")}</p>
          <div className={styles.ctaActions}>
            <Button href="/#diagnostic-request-form" variant="on-brand" icon data-request-type="Process & Operations">
              {t("Request a Process Diagnostic")}
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

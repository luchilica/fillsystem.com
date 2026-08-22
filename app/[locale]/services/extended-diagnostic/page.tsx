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
import styles from "./ExtendedDiagnostic.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getT();
  const title = t("Extended Diagnostic - Documented Process & Systems Audit");
  const description = t("Structured, documented diagnosis of your processes, systems, and risks. Written roadmap and prioritized fix list. From $1,400.");
  return {
    title,
    description,
    alternates: alternatesFor(loc, "/services/extended-diagnostic"),
    robots: robotsFor(loc),
    openGraph: {
      title: `${title} | Fill System`,
      description,
      url: localizedUrl(loc, "/services/extended-diagnostic"),
      type: "website",
      siteName: siteConfig.name,
      locale: LOCALE_META[loc].ogLocale,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

const DELIVERABLES = [
  {
    title: "Documented process & systems map",
    description:
      "A visual and written map of how work actually flows through your tools, teams, and handoffs - not how it is supposed to work, but how it does.",
  },
  {
    title: "Prioritized bottleneck list",
    description:
      "Every friction point ranked by business impact: what slows you down the most and what to fix first.",
  },
  {
    title: "Risk & priority matrix",
    description:
      "A structured view of operational risks across systems, access, data, and process - rated by severity and effort to resolve.",
  },
  {
    title: "Written roadmap",
    description:
      "A sequenced plan of what to fix, build, or change - with clear priorities, dependencies, and estimated effort.",
  },
] as const;

const STEPS = [
  {
    title: "Kickoff & access",
    description:
      "We align on scope, grant read-only access to relevant systems, and schedule stakeholder interviews.",
  },
  {
    title: "Discovery & mapping",
    description:
      "We interview key team members, review tools and workflows, and document how processes actually run.",
  },
  {
    title: "Analysis & synthesis",
    description:
      "We identify bottlenecks, risks, and gaps - then prioritize them by impact and effort.",
  },
  {
    title: "Report & roadmap delivery",
    description:
      "You receive a written diagnostic report with the process map, bottleneck list, risk matrix, and a sequenced roadmap.",
  },
] as const;

const FAQ = [
  {
    question: "How is this different from the free diagnostic?",
    answer:
      "The free diagnostic is a 30-45 minute fit call: we frame the problem and decide if a paid engagement makes sense. The extended diagnostic is a 1-2 week documented engagement that produces a written report, process map, and prioritized roadmap.",
  },
  {
    question: "What access do you need?",
    answer:
      "Read-only access to the tools your team uses daily: project management, CRM, communication, and any integrations. We never request write access. The exact list is agreed during the kickoff.",
  },
  {
    question: "Can we start with the extended diagnostic directly?",
    answer:
      "We always begin with the free fit call to make sure the engagement is the right fit. If it is, we scope the extended diagnostic based on what we learn. The fit call takes 30 minutes and costs nothing.",
  },
  {
    question: "What happens after we receive the report?",
    answer:
      "The roadmap is yours to execute however you choose. Many clients engage us to implement the top-priority items - but there is no obligation. The report stands on its own as a decision-making tool.",
  },
  {
    question: "How does pricing scale with team size?",
    answer:
      "The $1,400 base is for a lean team of around 25-50 people. Larger teams require more interviews, more systems to review, and more complexity to map - so the price scales accordingly. The exact scope and cost are set during the free diagnostic.",
  },
] as const;

export default async function ExtendedDiagnostic({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getT();
  const loc = locale as Locale;
  const home = siteConfig.url;
  const pageUrl = localizedUrl(loc, "/services/extended-diagnostic");

  // Three-level breadcrumb: Home > Services > Extended Diagnostic
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
        name: "Extended Diagnostic",
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
        name: t("Extended Diagnostic - Documented Process & Systems Audit"),
        description: t("Structured, documented diagnosis of your processes, systems, and risks. Written roadmap and prioritized fix list. From $1,400."),
        url: pageUrl,
        isPartOf: { "@id": `${home}#website` },
        inLanguage: LOCALE_META[loc].htmlLang,
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Extended Diagnostic",
        description:
          "Structured, documented diagnosis of your processes, systems, and risks. Written roadmap and prioritized fix list.",
        serviceType: "Business process and systems diagnostic",
        provider: { "@id": `${home}#organization` },
        areaServed: { "@type": "Country", name: "United States" },
        url: pageUrl,
        offers: {
          "@type": "Offer",
          name: "Extended Diagnostic",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: "1400",
            priceCurrency: "USD",
          },
          description:
            "Extended diagnostics start from $1,400 for a lean 25-50 person team. Scope and cost set by the free diagnostic.",
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
          <h1>{t("Extended Diagnostic")}</h1>
          <p className={`lead ${styles.lead}`}>
            {t(
              "Go deeper: a documented diagnosis for when you need to be sure before you invest. The full picture the free fit call only points at.",
            )}
          </p>
          <span className={styles.heroPrice}>{t("From $1,400")}</span>
        </div>
      </section>

      {/* 2 -- What You Get */}
      <section className={`section ${styles.darkSection}`}>
        <PlusMark size={160} className={styles.darkPlusTop} />
        <PlusMark size={90} className={styles.darkPlusBottom} />
        <div className="container">
          <h2>{t("What You Get")}</h2>
          <div className={styles.delivGrid}>
            {DELIVERABLES.map((item) => (
              <div key={item.title} className={styles.delivCard}>
                <h3 className={styles.delivTitle}>{t(item.title)}</h3>
                <p className={styles.delivDesc}>{t(item.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 -- When to Choose This */}
      <section className={`section ${styles.brandSection}`}>
        <PlusMark size={160} className={styles.brandPlusTop} />
        <PlusMark size={90} className={styles.brandPlusBottom} />
        <div className="container">
          <h2>{t("When to Choose the Extended Diagnostic")}</h2>
          <div className={styles.whenBlock}>
            <p className={styles.whenText}>
              {t(
                "The free diagnostic tells you whether there is a problem worth solving and whether we are the right fit. The extended diagnostic tells you exactly what the problems are, where they live, and what to do about them.",
              )}
            </p>
            <p className={styles.whenText}>
              {t(
                "Choose this when you need a documented basis for a budget decision, a board presentation, or a vendor selection. When the stakes are high enough that acting on intuition is not enough.",
              )}
            </p>
            <p className={styles.whenText}>
              {t(
                "For teams that want more certainty before committing budget: a structured, documented diagnosis of your processes, systems, and risks.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 4 -- How It Works */}
      <section className="section">
        <div className="container">
          <h2>{t("How It Works")}</h2>
          <ol className={styles.stepsList}>
            {STEPS.map((step, i) => (
              <li key={step.title} className={styles.stepItem}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {i + 1}
                </span>
                <div className={styles.stepContent}>
                  <h3>{t(step.title)}</h3>
                  <p>{t(step.description)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 -- Pricing */}
      <section className="section">
        <div className="container">
          <h2>{t("Pricing")}</h2>
          <div className={styles.pricingCard}>
            <p className={styles.pricingPrice}>
              {t("From $1,400")}
            </p>
            <p className={styles.pricingBody}>
              {t(
                "Extended diagnostics start from $1,400 for a lean 25-50 person team. The exact scope and cost are set by the free diagnostic call.",
              )}
            </p>
            <p className={styles.pricingTimeline}>
              {t(
                "Timeline: 1-2 weeks depending on team size, number of systems, and complexity of processes.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 6 -- FAQ */}
      <section className="section">
        <div className="container">
          <h2>{t("Extended Diagnostic FAQ")}</h2>
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
          <h2 className={styles.ctaHeading}>{t("Get the Full Picture")}</h2>
          <p className={styles.ctaLead}>{t("Processes, systems, risks. One documented diagnosis.")}</p>
          <div className={styles.ctaActions}>
            <Button href="/#diagnostic-request-form" variant="on-brand" icon data-request-type="Extended Diagnostic">
              {t("Start With a Free Diagnostic")}
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

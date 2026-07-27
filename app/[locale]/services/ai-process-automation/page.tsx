import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getT } from "@/i18n/t";
import { siteConfig } from "@/lib/site-config";
import { LOCALE_META, type Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor, localizedUrl } from "@/lib/i18n";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import Button from "@/components/ui/Button";
import PlusMark from "@/components/ui/PlusMark";
import { Link } from "@/i18n/navigation";
import styles from "./AIAutomation.module.css";

const TITLE =
  "AI & Process Automation Consulting for B2B | Opsfield Systems";
const DESCRIPTION =
  "Workflow automation, CRM automation, document processing, and AI readiness for B2B teams. We automate only where it pays off. From $3,900.";

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
    alternates: alternatesFor(loc, "/services/ai-process-automation"),
    robots: robotsFor(loc),
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: localizedUrl(loc, "/services/ai-process-automation"),
      type: "website",
      siteName: siteConfig.name,
      locale: LOCALE_META[loc].ogLocale,
    },
  };
}

const AUTOMATIONS = [
  {
    title: "Workflow automation",
    description:
      "Eliminate manual handoffs, approvals, and routing between teams and tools.",
  },
  {
    title: "CRM automation",
    description:
      "Auto-assign leads, trigger follow-ups, update pipeline stages, sync fields.",
  },
  {
    title: "Document processing",
    description:
      "Extract, classify, and route documents without manual data entry.",
  },
  {
    title: "Lead scoring",
    description:
      "Score and prioritize leads based on behavior, fit, and engagement signals.",
  },
  {
    title: "Reporting automation",
    description:
      "Generate and distribute reports on schedule instead of manually.",
  },
  {
    title: "AI readiness assessment",
    description:
      "Evaluate where AI adds real value vs. where it adds complexity.",
  },
] as const;

const PROCESS_STEPS = [
  {
    title: "Diagnostic",
    description:
      "We start with the business process diagnostic to identify automation opportunities — not the other way around.",
  },
  {
    title: "Opportunity shortlist",
    description:
      "We rank each opportunity by effort, impact, and risk. Only the ones with clear payback make the list.",
  },
  {
    title: "Build & handover",
    description:
      "We build the automations, connect your tools, document everything, and hand it over. You own it.",
  },
] as const;

const TOOLS = [
  "Zapier",
  "Make",
  "HubSpot Workflows",
  "Salesforce Flow",
  "n8n",
  "Custom API integrations",
  "Python scripts",
  "GPT/LLM integrations",
] as const;

const FAQ = [
  {
    question: "Do you build custom AI models?",
    answer:
      "No. We integrate proven tools (GPT, Claude, existing ML services) into your workflows. Custom model training is almost never cost-effective for teams under 250 people.",
  },
  {
    question: "What if automation breaks?",
    answer:
      "Every automation we build includes error handling, logging, and documentation. We hand over monitoring access so your team can manage it independently.",
  },
  {
    question: "Can you automate our specific workflow?",
    answer:
      "Probably, but we will not know until the diagnostic. Some workflows should be fixed before they are automated — automating a broken process just breaks it faster.",
  },
  {
    question: "How much time will automation actually save?",
    answer:
      "It depends on the process. We estimate savings during the diagnostic and only recommend automation when the projected ROI justifies the cost.",
  },
] as const;

export default async function AIProcessAutomation({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getT();
  const loc = locale as Locale;
  const home = siteConfig.url;
  const pageUrl = localizedUrl(loc, "/services/ai-process-automation");

  // Three-level breadcrumb: Home > Services > AI & Process Automation
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
        name: "AI & Process Automation",
        item: pageUrl,
      },
    ],
  };

  // Service JSON-LD + FAQPage structured data.
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
        name: "AI & Process Automation Consulting",
        description:
          "Workflow automation, CRM automation, document processing, and AI readiness for B2B teams.",
        serviceType: "AI and process automation consulting",
        provider: { "@id": `${home}#organization` },
        areaServed: { "@type": "Country", name: "United States" },
        url: pageUrl,
        offers: {
          "@type": "Offer",
          name: "AI & Process Automation Engagement",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: "3900",
            priceCurrency: "USD",
          },
          description:
            "AI & Process Automation engagements start from $3,900 for a lean 25-50 person team. Scope and cost set by the free diagnostic.",
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
          <h1>{t("AI & Process Automation Consulting for B2B")}</h1>
          <p className={`lead ${styles.lead}`}>
            {t(
              "Remove the manual, repetitive work — but only where it actually pays off. Starting from the diagnostic, we automate the workflows with real payback.",
            )}
          </p>
        </div>
      </section>

      {/* 2 -- What We Automate */}
      <section className={`section ${styles.darkSection}`}>
        <PlusMark size={160} className={styles.darkPlusTop} />
        <PlusMark size={90} className={styles.darkPlusBottom} />
        <div className="container">
          <h2>{t("What We Automate")}</h2>
          <div className={styles.automateGrid}>
            {AUTOMATIONS.map((item) => (
              <div key={item.title} className={styles.automateCard}>
                <h3 className={styles.automateTitle}>{t(item.title)}</h3>
                <p className={styles.automateDesc}>{t(item.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 -- Our Process */}
      <section className="section">
        <div className="container">
          <h2>{t("From Diagnostic to Automation")}</h2>
          <div className={styles.processSteps}>
            {PROCESS_STEPS.map((step) => (
              <div key={step.title} className={styles.processStep}>
                <h3 className={styles.processTitle}>{t(step.title)}</h3>
                <p className={styles.processDesc}>{t(step.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 -- Tools & Environments */}
      <section className={`section ${styles.brandSection}`}>
        <PlusMark size={160} className={styles.brandPlusTop} />
        <PlusMark size={90} className={styles.brandPlusBottom} />
        <div className="container">
          <h2>{t("Tools We Work With")}</h2>
          <div className={styles.envTags}>
            {TOOLS.map((tool) => (
              <span key={tool} className={styles.envTag}>
                {tool}
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
            <p className={styles.pricingPrice}>{t("From $3,900")}</p>
            <p className={styles.pricingBody}>
              {t(
                "AI & Process Automation engagements start from $3,900 for a lean 25-50 person team. Scope and pricing are always set by the free diagnostic first.",
              )}
            </p>
            <p className={styles.pricingTimeline}>
              {t(
                "Timeline: 2-5 weeks depending on the number of workflows, integrations, and tools involved.",
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
            <h2>{t("AI & Automation FAQ")}</h2>
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
          <div className={styles.ctaBlock}>
            <PlusMark size={180} className={styles.ctaPlusTop} />
            <PlusMark size={100} className={styles.ctaPlusBottom} />
            <h2>{t("Assess Your Automation Opportunities")}</h2>
            <p className={styles.ctaLead}>
              {t(
                "The first conversation is complimentary. We review your processes and identify where automation will actually pay off.",
              )}
            </p>
            <div className={styles.ctaActions}>
              <Button
                href="/#diagnostic-request-form"
                variant="on-brand"
                icon
                data-request-type="AI & Process Automation"
              >
                {t("Request an Automation Assessment")}
              </Button>
              <Link href="/services">
                <Button variant="on-brand-outline">
                  {t("See All Services")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

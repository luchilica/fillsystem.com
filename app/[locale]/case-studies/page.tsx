import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Info, Search, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
import { LOCALE_META, type Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor, localizedUrl } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { getT } from "@/i18n/t";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import Button from "@/components/ui/Button";
import PlusMark from "@/components/ui/PlusMark";
import styles from "./page.module.css";

// Scenario data — mirrors DiagnosticScenarios.tsx on the homepage.
// Anonymized, illustrative. Not verified case studies or testimonials.
type Scenario = {
  id: string;
  client: string;
  environment: string[];
  situation: string;
  found: string;
  delivered: (t: (s: string) => string) => ReactNode;
};

const SCENARIOS: Scenario[] = [
  {
    id: "scenario-1",
    client: "B2B services firm (≈80 employees)",
    environment: ["HubSpot"],
    situation:
      "Inbound leads were falling between marketing and sales: no defined handoff owner, no SLA, and 3 duplicate CRM fields creating confusion.",
    found:
      "4 undocumented handoff points across 2 teams with no shared visibility.",
    delivered: (t) => (
      <>
        {t(
          "Handoff process reduced from 5 steps to 2. Single ownership assigned per lead stage. Estimated revenue at risk from dropped handoffs:",
        )}{" "}
        <span className={styles.metric}>$180K-$240K</span>{" "}
        {t("annually. 30-day cleanup priority list adopted by both teams.")}
      </>
    ),
  },
  {
    id: "scenario-2",
    client: "Scaling SaaS team (≈120 employees)",
    environment: ["Salesforce", "Looker"],
    situation:
      "Leadership did not trust dashboard numbers because 3 departments used different definitions for the same metrics.",
    found:
      "7 inconsistent metric definitions and 2 disconnected data sources feeding the same dashboard.",
    delivered: (t) => (
      <>
        {t(
          "Unified reporting definitions document covering 7 previously inconsistent metrics. Data-source consolidation plan projected to remove",
        )}{" "}
        <span className={styles.metric}>{t("40+ hours/month")}</span>{" "}
        {t(
          "of manual reconciliation. BI roadmap prioritized by stakeholder impact with 90-day execution timeline.",
        )}
      </>
    ),
  },
  {
    id: "scenario-3",
    client: "Multi-location operator (≈200 employees)",
    environment: ["Monday", "Zapier", "spreadsheets"],
    situation:
      "4 locations running different approval workflows with 6 overlapping tools and no shared process documentation.",
    found:
      "11 manual approval steps that could be reduced to 4 with workflow consolidation.",
    delivered: (t) => (
      <>
        {t("Bottleneck map identified an estimated")}{" "}
        <span className={styles.metric}>$320K</span>{" "}
        {t(
          "in annual labor cost tied to manual approvals. Automation backlog ranked by effort and impact. 90-day roadmap adopted by operations leadership with projected 60% reduction in approval cycle time.",
        )}
      </>
    ),
  },
];

const ROWS = [
  { key: "situation", label: "Situation", Icon: Info },
  { key: "found", label: "Diagnostic found", Icon: Search },
  { key: "delivered", label: "Delivered", Icon: CheckCircle2 },
] as const;

const pad = (i: number) => String(i + 1).padStart(2, "0");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getT();
  const title = t("Diagnostic Case Studies - B2B Operations Examples");
  const description = t(
    "See how Fill System diagnostics uncover hidden bottlenecks in B2B operations, CRM handoffs, and approval workflows.",
  );
  return {
    title,
    description,
    alternates: alternatesFor(loc, "/case-studies"),
    robots: robotsFor(loc),
    openGraph: {
      title: `${title} | Fill System`,
      description,
      url: localizedUrl(loc, "/case-studies"),
      type: "website",
      siteName: siteConfig.name,
      locale: LOCALE_META[loc].ogLocale,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Fill System - Diagnostic Case Studies",
        },
      ],
    },
  };
}

export default async function CaseStudies({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getT();

  return (
    <>
      <BreadcrumbJsonLd
        title="Case Studies"
        path="/case-studies"
        locale={locale as Locale}
      />

      {/* Hero */}
      <section className={`section ${styles.heroSection}`}>
        <div className="container">
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">{t("Home")}</Link>
            <span className={styles.breadcrumbSep} aria-hidden="true">
              /
            </span>
            <span aria-current="page">{t("Case Studies")}</span>
          </nav>

          <h1>{t("Diagnostic Results: B2B Case Examples")}</h1>
          <p className={`lead ${styles.lead}`}>
            {t(
              "Illustrative scenarios showing how a structured diagnostic uncovers bottlenecks, quantifies waste, and produces an actionable roadmap.",
            )}
          </p>
        </div>
      </section>

      {/* Scenario cards */}
      <section className="section">
        <div className="container">
          <div className={styles.scenarioList}>
            {SCENARIOS.map((scenario, i) => (
              <article
                key={scenario.id}
                id={scenario.id}
                className={styles.scenarioCard}
              >
                <span className={styles.ghostNum} aria-hidden="true">
                  {pad(i)}
                </span>

                <div className={styles.cardHeader}>
                  <span className={styles.scenarioLabel}>
                    {t("Scenario")} {pad(i)}
                  </span>
                  <h2 className={styles.clientName}>{t(scenario.client)}</h2>
                </div>

                <div className={styles.envTags}>
                  {scenario.environment.map((env) => (
                    <span key={env} className={styles.envTag}>
                      {env}
                    </span>
                  ))}
                </div>

                <p className={styles.disclaimer}>
                  {t(
                    "Illustrative scenario - not a specific client engagement",
                  )}
                </p>

                <ol className={styles.timeline}>
                  {ROWS.map((row) => (
                    <li
                      key={row.key}
                      className={`${styles.step} ${styles[row.key]}`}
                    >
                      <span className={styles.node}>
                        <row.Icon size={16} aria-hidden="true" />
                      </span>
                      <div>
                        <span className={styles.stepLabel}>
                          {t(row.label)}
                        </span>
                        <p className={styles.stepText}>
                          {row.key === "delivered"
                            ? scenario.delivered(t)
                            : t(scenario[row.key])}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`section ${styles.ctaSection}`}>
        <PlusMark size={180} className={styles.ctaPlusTop} />
        <PlusMark size={100} className={styles.ctaPlusBottom} />
        <div className="container">
          <h2 className={styles.ctaHeading}>
            {t("See What a Diagnostic Finds in Your Operations")}
          </h2>
          <p className={styles.ctaLead}>
            {t(
              "The first conversation is free. We map your bottlenecks and tell you if a paid engagement makes sense.",
            )}
          </p>
          <div className={styles.ctaActions}>
            <Button
              href="/#diagnostic-request-form"
              variant="on-brand"
              icon
            >
              {t("Request a Free Diagnostic")}
            </Button>
            <Button href="/services" variant="on-brand-outline">
              {t("See Our Services")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

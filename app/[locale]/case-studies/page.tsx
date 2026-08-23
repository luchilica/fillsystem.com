import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Info, Search, CheckCircle2, Stethoscope, BarChart3, Route } from "lucide-react";
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

const PROCESS_STEPS = [
  {
    Icon: Stethoscope,
    title: "Review",
    description:
      "We review workflows, systems, CRM usage, reporting, and decision bottlenecks across the organization.",
  },
  {
    Icon: BarChart3,
    title: "Map & score",
    description:
      "We map root causes and score fixes by impact, effort, risk, dependency, and business value.",
  },
  {
    Icon: Route,
    title: "Recommend",
    description:
      "You receive a clear next step: roadmap, advisory, implementation support, pause, or no-fit.",
  },
];

const STATS = [
  { num: "50-250", label: "Employee range" },
  { num: "30-90", label: "Day roadmaps" },
  { num: "$180K+", label: "Risks identified" },
  { num: "60%", label: "Cycle reduction" },
];

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

      {/* 1 — Hero (paper) */}
      <section className={`section ${styles.heroSection}`}>
        <div className="container">
          <h1>{t("Diagnostic Results: B2B Case Examples")}</h1>
          <p className={`lead ${styles.lead}`}>
            {t(
              "Illustrative scenarios showing how a structured diagnostic uncovers bottlenecks, quantifies waste, and produces an actionable roadmap.",
            )}
          </p>
        </div>
      </section>

      {/* 2 — Process (dark ink — matches About's approach section) */}
      <section className={`section ${styles.processSection}`}>
        <PlusMark size={180} className={styles.darkPlusTop} />
        <PlusMark size={100} className={styles.darkPlusBottom} />
        <div className="container">
          <h2>{t("How Every Diagnostic Works")}</h2>
          <div className={styles.processGrid}>
            {PROCESS_STEPS.map((step) => (
              <div key={step.title} className={styles.processCard}>
                <span className={styles.processIcon} aria-hidden="true">
                  <step.Icon size={20} />
                </span>
                <h3 className={styles.processTitle}>{t(step.title)}</h3>
                <p className={styles.processDesc}>{t(step.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Scenario cards (paper) */}
      <section className="section">
        <div className="container">
          <h2>{t("What diagnostics find")}</h2>
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
                  <h3 className={styles.clientName}>{t(scenario.client)}</h3>
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

      {/* 4 — Stats (brand blue — matches About's stats section) */}
      <section className={`section ${styles.statsSection}`}>
        <PlusMark size={160} className={styles.brandPlusTop} />
        <PlusMark size={90} className={styles.brandPlusBottom} />
        <div className="container">
          <h2>{t("Typical diagnostic scope")}</h2>
          <div className={styles.statsGrid}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.statCard}>
                <p className={styles.statNum}>{s.num}</p>
                <p className={styles.statLabel}>{t(s.label)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — CTA (dark ink) */}
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

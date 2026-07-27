"use client";

import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { ArrowRight, Info, Search, CheckCircle2 } from "lucide-react";
import { useT } from "@/i18n/useT";
import styles from "./DiagnosticScenarios.module.css";

// Copy from docs/texts.md → "Diagnostic Scenarios". Anonymized + illustrative.
// Presented as an interactive switcher: a scenario list on the left, a detailed
// Situation → Diagnostic found → Delivered panel on the right. Every panel is
// rendered (inactive ones visually hidden, never display:none) so all scenario
// copy stays in the served HTML for crawlers.
// Do not present as verified case studies, metrics, logos or testimonials.
type Scenario = {
  client: string;
  environment: string[];
  situation: string;
  found: string;
  delivered: (t: (s: string) => string) => ReactNode;
};

const SCENARIOS: Scenario[] = [
  {
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

export default function DiagnosticScenarios() {
  const t = useT();
  const [active, setActive] = useState(0);
  const panelsRef = useRef<HTMLDivElement>(null);

  // On mobile the panel sits below the selector list — bring it into view when
  // a scenario is picked (offset for the sticky header). Desktop shows the panel
  // beside the list, so no scroll there.
  const selectScenario = (i: number) => {
    setActive(i);
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(max-width: 1023px)").matches) return;
    const el = panelsRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const y = el.getBoundingClientRect().top + window.scrollY - 84;
    window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="container">
      <h2 className={styles.intro}>
        {t("Diagnostic Results: B2B Case Examples")}
      </h2>

      <div className={styles.switcher}>
        {/* Selector list */}
        <div
          className={styles.tabs}
          role="tablist"
          aria-label={t("Diagnostic scenarios")}
        >
          {SCENARIOS.map((s, i) => {
            const selected = i === active;
            return (
              <button
                key={i}
                type="button"
                role="tab"
                id={`scenario-tab-${i}`}
                aria-selected={selected}
                aria-controls={`scenario-panel-${i}`}
                className={`${styles.tab} ${selected ? styles.tabActive : ""}`}
                onClick={() => selectScenario(i)}
              >
                <span className={styles.tabNum}>
                  {t("Scenario")} · {pad(i)}
                </span>
                <span className={styles.tabClient}>{t(s.client)}</span>
                <span className={styles.tabEnvs}>
                  {s.environment.map((e) => (
                    <span key={e} className={styles.tabEnv}>
                      {e}
                    </span>
                  ))}
                </span>
              </button>
            );
          })}
        </div>

        {/* Panels — all rendered; inactive ones visually hidden (in DOM for SEO). */}
        <div className={styles.panels} ref={panelsRef}>
          {SCENARIOS.map((s, i) => {
            const selected = i === active;
            return (
              <article
                key={i}
                role="tabpanel"
                id={`scenario-panel-${i}`}
                aria-labelledby={`scenario-tab-${i}`}
                aria-hidden={!selected}
                className={`${styles.panel} ${selected ? styles.panelActive : ""}`}
              >
                <span className={styles.ghostNum} aria-hidden="true">
                  {pad(i)}
                </span>

                <div className={styles.panelHead}>
                  <h3 className={styles.panelClient}>{t(s.client)}</h3>
                  <div className={styles.envs}>
                    {s.environment.map((e) => (
                      <span key={e} className={styles.env}>
                        {e}
                      </span>
                    ))}
                  </div>
                </div>

                <ol className={styles.timeline}>
                  {ROWS.map((r) => (
                    <li key={r.key} className={`${styles.step} ${styles[r.key]}`}>
                      <span className={styles.node}>
                        <r.Icon size={16} aria-hidden="true" />
                      </span>
                      <div className={styles.stepBody}>
                        <span className={styles.stepLabel}>{t(r.label)}</span>
                        <p className={styles.stepText}>
                          {r.key === "delivered"
                            ? s.delivered(t)
                            : t(s[r.key])}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
            );
          })}
        </div>
      </div>

      <p className={styles.note}>
        {t(
          "Scenarios are anonymized composites. Figures are illustrative and reflect the type of impact diagnostic work typically identifies.",
        )}
      </p>

      <div className={styles.cta}>
        <a href="#diagnostic-request-form" className={styles.textLink}>
          {t("Request a Diagnostic for Your Team")}
          <ArrowRight size={20} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

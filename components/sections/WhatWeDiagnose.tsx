import {
  GitBranch,
  Layers,
  Workflow,
  FileText,
  Shield,
  BarChart3,
  Compass,
  Plus,
} from "lucide-react";
import Card from "@/components/ui/Card";
import { getT } from "@/i18n/t";
import styles from "./WhatWeDiagnose.module.css";

// Copy from docs/texts.md → "What We Diagnose": two diagnostic areas + the shared
// Output list (as a "You receive" bar). v2 block edition. No per-card outputs/CTAs
// are invented. (O-1 Readiness Support lives only in Areas of Work / form / FAQ.)
const AREAS = [
  {
    title: "Processes",
    Icon: GitBranch,
    tone: "paper",
    description:
      "Handoffs, approvals, ownership gaps, duplicated work, undocumented workflows.",
  },
  {
    title: "Revenue, data & systems",
    Icon: Layers,
    tone: "paper",
    description:
      "CRM, RevOps, dashboards, reporting rules, integrations, automation, AI readiness, IT risk.",
  },
] as const;

const OUTPUTS = [
  { label: "Process map", Icon: Workflow },
  { label: "System map", Icon: Layers },
  { label: "Bottleneck list", Icon: FileText },
  { label: "Risk notes", Icon: Shield },
  { label: "Priority matrix", Icon: BarChart3 },
  { label: "Roadmap recommendation", Icon: Compass },
];

export default async function WhatWeDiagnose() {
  const t = await getT();
  return (
    <div className="container">
      <h2 className={styles.intro}>
        {t(
          "Process, CRM & IT System Diagnostics for B2B",
        )}
      </h2>

      <div className={styles.top}>
        <div className={styles.areas}>
          {AREAS.map(({ title, Icon, tone, description }) => (
            <Card key={title} tone={tone} soft>
              <div className={styles.card}>
                <span className={styles.cardIcon}>
                  <Icon size={26} aria-hidden="true" />
                </span>
                <div>
                  <h3 className={styles.cardTitle}>{t(title)}</h3>
                  <p className={styles.cardDesc}>{t(description)}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className={styles.output}>
          <p className={styles.outputLabel}>{t("What you receive")}</p>
          <ul className={styles.outputGrid}>
            {OUTPUTS.map(({ label, Icon }) => (
              <li key={label} className={styles.outputCard}>
                <span className={styles.outputIcon}>
                  <Icon size={16} aria-hidden="true" />
                </span>
                <span className={styles.outputName}>{t(label)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.cta}>
        <a href="#how-the-diagnostic-works" className={styles.textLink}>
          {t("See How the Diagnostic Works")}
          <Plus size={20} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

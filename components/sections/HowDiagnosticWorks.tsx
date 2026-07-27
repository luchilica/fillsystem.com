import { Fragment } from "react";
import { Search, Gauge, Signpost, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { getT } from "@/i18n/t";
import styles from "./HowDiagnosticWorks.module.css";

// Copy from docs/texts.md → "How the Diagnostic Works". v2 numbered step columns
// (step 2 featured), each with a title + corner icon. CTA "Start With a
// Diagnostic" → form (generic) per sitemap.md.
const STEPS = [
  {
    title: "Review",
    Icon: Search,
    text: "We review workflows, systems, CRM usage, reporting, automation, and decision bottlenecks.",
  },
  {
    title: "Map & score",
    Icon: Gauge,
    text: "We map likely root causes and score fixes by impact, effort, risk, dependency, and business value.",
  },
  {
    title: "Recommend",
    Icon: Signpost,
    text: "You receive a clear next step: audit, assessment, roadmap, advisory, implementation support, pause, or no-fit.",
  },
];

export default async function HowDiagnosticWorks() {
  const t = await getT();
  return (
    <div className="container">
      <h2 className={styles.intro}>
        {t("How Our B2B Diagnostic Process Works")}
      </h2>

      <ol className={styles.steps}>
        {STEPS.map(({ title, Icon, text }, i) => (
          <Fragment key={i}>
            <li
              className={`${styles.step} ${i === 1 ? styles.stepFeatured : ""}`}
            >
              <div className={styles.stepTop}>
                <span className={styles.number} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.stepIcon}>
                  <Icon size={22} aria-hidden="true" />
                </span>
              </div>
              <p className={styles.stepTitle}>{t(title)}</p>
              <p className={styles.stepText}>{t(text)}</p>
            </li>
            {i < STEPS.length - 1 && (
              <li className={styles.stepArrow} aria-hidden="true">
                <ArrowRight size={22} />
              </li>
            )}
          </Fragment>
        ))}
      </ol>

      <Button
        href="#diagnostic-request-form"
        variant="primary"
        
        className={styles.cta}
      >
        {t("Start With a Diagnostic")}
      </Button>
    </div>
  );
}

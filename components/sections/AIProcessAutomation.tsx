import { Fragment } from "react";
import Button from "@/components/ui/Button";
import PlusMark from "@/components/ui/PlusMark";
import { getT } from "@/i18n/t";
import styles from "./AIProcessAutomation.module.css";

// Copy from docs/texts.md → "AI & Process Automation". v2 ink block edition.
// CTA routing from docs/sitemap.md → "CTA → Request Type Routing".
const SCOPE = [
  "Workflow automation",
  "CRM automation",
  "Document processing",
  "Lead scoring",
  "Reporting automation",
  "AI readiness",
];

// Process-to-automation flow (docs/texts.md → "Flow") as a connected-dot pathway
// (deliberately NOT the numbered step cards used by "How It Works").
const FLOW = [
  "Diagnostic",
  "Automation opportunity",
  "Roadmap or limited scope",
] as const;

export default async function AIProcessAutomation() {
  const t = await getT();
  return (
    <div className="container">
      <PlusMark size={220} className={styles.plusTop} />
      <PlusMark size={120} className={styles.plusBottom} />

      <div className={styles.inner}>
        <h2 className={styles.heading}>
          {t("From diagnostic to implementation: AI & Process Automation.")}
        </h2>
        <p className={`lead ${styles.text}`}>
          {t("When the diagnostic identifies a clear automation opportunity,")}{" "}
          Opsfield Systems{" "}
          {t(
            "can help turn findings into a practical automation roadmap or limited implementation scope.",
          )}
        </p>

        <ol className={styles.flow} aria-label={t("From diagnostic to automation")}>
          {FLOW.map((label, i) => (
            <Fragment key={label}>
              <li className={styles.stage}>
                <span className={styles.stageDot} aria-hidden="true" />
                <span className={styles.stageLabel}>{t(label)}</span>
              </li>
              {i < FLOW.length - 1 && (
                <li className={styles.connector} aria-hidden="true" />
              )}
            </Fragment>
          ))}
        </ol>

        <div className={styles.scopeBox}>
          <p className={styles.scopeLabel}>{t("Scope")}</p>
          <ul className={styles.scope}>
            {SCOPE.map((item) => (
              <li key={item} className={styles.scopeItem}>
                {t(item)}
              </li>
            ))}
          </ul>
        </div>

        <blockquote className={styles.principle}>
          {t("We automate the right process, not the loudest request.")}
        </blockquote>

        <Button
          href="#diagnostic-request-form"
          variant="on-brand"
          icon
          className={styles.cta}
          data-request-type="AI & Process Automation"
        >
          {t("Assess Automation Opportunities")}
        </Button>
      </div>
    </div>
  );
}

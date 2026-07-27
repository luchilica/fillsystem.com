import { Fragment } from "react";
import { Check, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { getT } from "@/i18n/t";
import styles from "./WhyOpsfield.module.css";

// Copy from docs/texts.md → "Why Opsfield Systems" (comparison table).
// CTA → form with data-request-type "Business & IT Diagnostic" per sitemap.md.
const PAIRS = [
  {
    others: "SaaS integrator → picks a platform",
    opsfield: "Maps your process and data flow",
  },
  {
    others: "Automation agency → automates existing workflow",
    opsfield: "Checks if the workflow should exist",
  },
  {
    others: "Internal hire → builds what is requested",
    opsfield: "Diagnoses what is actually needed",
  },
  {
    others: "Dev agency → writes code to spec",
    opsfield: "Reviews whether the spec solves the problem",
  },
];

export default async function WhyOpsfield() {
  const t = await getT();
  return (
    <div className="container">
      <h2 className={styles.intro}>{t("Why Opsfield Systems")}</h2>
      <p className={`lead ${styles.text}`}>
        {t(
          "The difference is what gets validated before budget, tools, or implementation are committed.",
        )}
      </p>

      <div className={styles.table}>
        <div className={`${styles.head} ${styles.headOthers}`}>
          {t("What others do first")}
        </div>
        <div className={`${styles.head} ${styles.headOpsfield}`}>
          {t("What Opsfield does first")}
        </div>
        {PAIRS.map((pair, i) => (
          <Fragment key={i}>
            <div className={`${styles.cell} ${styles.cellOthers}`}>
              <span className={styles.nodeX} aria-hidden="true">
                <X size={15} strokeWidth={2.75} />
              </span>
              <span>{t(pair.others)}</span>
            </div>
            <div className={`${styles.cell} ${styles.cellOpsfield}`}>
              <span className={styles.nodeCheck} aria-hidden="true">
                <Check size={15} strokeWidth={2.75} />
              </span>
              <span>{t(pair.opsfield)}</span>
            </div>
          </Fragment>
        ))}
      </div>

      <div className={styles.cta}>
        <Button
          href="#diagnostic-request-form"
          variant="primary"
          icon
          data-request-type="Business & IT Diagnostic"
        >
          {t("Validate the Decision Before You Implement")}
        </Button>
      </div>
    </div>
  );
}

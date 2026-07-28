"use client";

import { useState } from "react";
import DiagnosticForm from "@/components/ui/DiagnosticForm";
import PlusMark from "@/components/ui/PlusMark";
import { Link } from "@/i18n/navigation";
import { useT } from "@/i18n/useT";
import styles from "./BusinessITDiagnostic.module.css";

// Copy from docs/texts.md → "Business & IT Diagnostic" (Offer, Before You Commit,
// What Happens After You Submit). One composite section; only #diagnostic-request-form
// is an anchor. v2 block layout: ink output panel + paper cards + bordered form.
const OUTPUT = [
  "Problem summary",
  "Root-cause hypotheses",
  "Fit / no-fit decision",
  "Path to audit, assessment, roadmap, advisory, or implementation",
];

const REVIEW = [
  "Diagnostic question framework",
  "Priority matrix structure",
  "Roadmap structure",
  "Example deliverables",
];

// Compact post-submit steps (condensed labels, per conversion-friction pass).
const POST_SUBMIT = [
  "Review your submission",
  "Advisor confirms fit",
  "Fixed-scope proposal",
];

export default function BusinessITDiagnostic() {
  const t = useT();
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <div className="container">
      <h2 className={styles.intro}>
        {t(
          "Request a Business & IT Diagnostic"
        )}
      </h2>
      <p className={`lead ${styles.lead}`}>
        {t(
          "The first diagnostic conversation is a complimentary 30-45 minute fit review to frame the problem and identify likely bottleneck areas. Paid engagements begin only after a separate written proposal with defined scope and pricing."
        )}
      </p>

      <div className={styles.grid}>
        {/* Left column — context sidebar (sticky on desktop) */}
        <div className={styles.aside}>
          <div className={styles.outputPanel}>
            <p className={styles.outputLabel}>{t("Diagnostic output")}</p>
            <ul className={styles.outputList}>
              {OUTPUT.map((o, i) => (
                <li key={o} className={styles.outputItem}>
                  <span className={styles.outputNum}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{t(o)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.card}>
            <p className={styles.stepsLabel}>
              {t("What happens after you submit")}
            </p>
            <ol className={styles.afterList}>
              {POST_SUBMIT.map((text, i) => (
                <li key={i} className={styles.afterItem}>
                  <span className={styles.afterNum} aria-hidden="true">
                    {i + 1}
                  </span>
                  <span>{t(text)}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>{t("Before You Commit")}</h3>
            <p className={styles.muted}>
              {t("Evaluate the approach before any paid engagement.")}
            </p>
            <button
              type="button"
              className={styles.detailsToggle}
              aria-expanded={detailsOpen}
              aria-controls="before-you-commit-details"
              onClick={() => setDetailsOpen((o) => !o)}
            >
              {detailsOpen ? t("Hide details") : t("See review details +")}
            </button>

            {/* Collapsed by default — stays in the DOM (max-height:0) for SEO. */}
            <div
              id="before-you-commit-details"
              className={`${styles.collapse} ${
                detailsOpen ? "" : styles.collapseClosed
              }`}
            >
              <p className={styles.reviewLabel}>{t("Review assets")}</p>
              <ul className={styles.chips}>
                {REVIEW.map((r) => (
                  <li key={r} className={styles.chip}>
                    {t(r)}
                  </li>
                ))}
              </ul>
              <p className={styles.muted}>
                {t(
                  "No full system access is required for the initial fit review. Deeper access starts only after scope and NDA are agreed."
                )}
              </p>
              {/* Privacy note — verbatim from docs/texts.md → "Before You Commit";
                  Risk-Reduction Panel spec requires a privacy notice + Privacy
                  Policy link inside the panel. */}
              <p className={`${styles.muted} ${styles.privacyNote}`}>
                {t("By submitting the form, you acknowledge our")}{" "}
                <Link href="/privacy-policy">Privacy Policy</Link>
                {t(
                  ". We use your information to evaluate fit and contact you about your diagnostic request."
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Right column — the form */}
        <div className={styles.main}>
          <div id="diagnostic-request-form" className={styles.formPanel}>
            <div className={styles.formHeader}>
              <span className={styles.formHeaderTitle}>
                <PlusMark size={20} className={styles.formPlus} />
                {t("Diagnostic Request")}
              </span>
              <span className={styles.formBadge}>
                {t("Complimentary 30-45 min fit review")}
              </span>
            </div>
            <div className={styles.formBody}>
              <DiagnosticForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

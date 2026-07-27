import Button from "@/components/ui/Button";
import HeroSummary from "@/components/ui/HeroSummary";
import { getT } from "@/i18n/t";
import styles from "./Hero.module.css";

// All copy from docs/texts.md → "Hero". Do not alter wording.
export default async function Hero() {
  const t = await getT();
  return (
    <div className={`container ${styles.hero}`}>
      <div className={styles.content}>
        <h1 className={styles.headline}>
          {t("Diagnostic-First IT & Business")}{" "}
          <span className={styles.accentWord}>{t("Consulting")}</span>
        </h1>

        {/* Semantically a paragraph, visually a lead. */}
        <p className={`lead ${styles.subtitle}`}>
          {t(
            "Opsfield Systems helps B2B teams find where operations, CRM, data flow, automation, and IT systems are slowing execution."
          )}
        </p>

        <div className={styles.actions}>
          <Button
            href="#diagnostic-request-form"
            variant="primary"
            icon
            data-request-type="Business & IT Diagnostic"
          >
            {t("Request a Business & IT Diagnostic")}
          </Button>
          <Button href="#areas-of-work" variant="secondary">
            {t("See our services")}
          </Button>
        </div>

        {/* Trust stats — reformats the boutique-advisory / ICP trust line. */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <p className={styles.statNum}>4-6</p>
            <p className={styles.statCap}>{t("Active clients at a time")}</p>
          </div>
          <div className={styles.stat}>
            <p className={styles.statNum}>50-250</p>
            <p className={styles.statCap}>{t("Employees · best fit")}</p>
          </div>
          <div className={styles.stat}>
            <p className={styles.statNum}>{t("5+ yrs")}</p>
            <p className={styles.statCap}>{t("Boutique advisory")}</p>
          </div>
        </div>
      </div>

      <div className={styles.visual}>
        <HeroSummary />
      </div>
    </div>
  );
}

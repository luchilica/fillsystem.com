import Image from "next/image";
import Button from "@/components/ui/Button";
import { getT } from "@/i18n/t";
import styles from "./ProblemSection.module.css";

// Copy from docs/texts.md → "Problem Section". Full-fill brand block (v2):
// left-aligned problem statement over an atmospheric duotone photo (a tangle of
// wires) blended into the brand blue — mirrors Final CTA. The root-cause
// enumeration lives in the next section (What We Diagnose), not repeated here.
export default async function ProblemSection() {
  const t = await getT();
  return (
    <div className="container">
      {/* Atmospheric tangle photo, anchored right and blended into the brand
          blue (screen), with a left→right scrim so the heading keeps contrast.
          The 100vw trick escapes the container padding. Decorative (alt=""). */}
      <div className={styles.bg} aria-hidden="true">
        <Image
          src="/photos/problem.jpg"
          alt="B2B team reviewing operational bottlenecks"
          fill
          sizes="(min-width: 1200px) 1200px, 100vw"
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAHAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAT/xAAcEAACAgIDAAAAAAAAAAAAAAAAAQIDBCERMTL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AjxrKlQ1KK5XrXZFoAD//2Q=="
          className={styles.bgImg}
        />
      </div>

      <div className={styles.block}>
        <h2 className={styles.heading}>
          {t("Why B2B Operations Stall Before the Tools Do")}
        </h2>
        <p className={`lead ${styles.text}`}>
          {t(
            "Usually it's the handoffs, ownership, and data flow between teams that slow growth, long before the tools do."
          )}
        </p>
        <Button
          href="#diagnostic-request-form"
          variant="on-brand"
          icon
          className={styles.cta}
          data-request-type="Business & IT Diagnostic"
        >
          {t("Diagnose the Operating Bottleneck")}
        </Button>
      </div>
    </div>
  );
}

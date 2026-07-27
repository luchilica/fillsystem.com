import Image from "next/image";
import Button from "@/components/ui/Button";
import PlusMark from "@/components/ui/PlusMark";
import { getT } from "@/i18n/t";
import styles from "./FinalCTA.module.css";

// Copy from docs/texts.md → "Final CTA". v2 full-fill brand block with + motifs.
// CTA routing from docs/sitemap.md. Does not repeat the Hero positioning.
export default async function FinalCTA() {
  const t = await getT();
  return (
    <div className="container">
      {/* Atmospheric silhouette band, faded into the brand blue on the text side
          so the heading stays high-contrast. Decorative (alt=""). */}
      <div className={styles.bg} aria-hidden="true">
        <Image
          src="/photos/final-cta.jpg"
          alt="Business team planning next steps after diagnostic"
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAANAAoDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAQIEBv/EACIQAAEDAgYDAAAAAAAAAAAAAAEAAhIDBBETFCJS0WGRkv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwBzRsg6GyRqxAiOlRo7Tiz5HSz7ar5zJJdIHHyjmP5O9oP/2Q=="
          className={styles.bgImg}
        />
      </div>

      <PlusMark size={260} className={styles.plusTop} />
      <PlusMark size={140} className={styles.plusBottom} />

      <div className={styles.inner}>
        <h2 className={styles.heading}>
          {t("Start With a Free Diagnostic")}
        </h2>
        <p className={`lead ${styles.text}`}>
          {t("Clarify the bottleneck and risk level before committing budget.")}
        </p>

        <div className={styles.actions}>
          <Button
            href="#diagnostic-request-form"
            variant="on-brand"
            icon
            data-request-type="Business & IT Diagnostic"
          >
            {t("Request a Business & IT Diagnostic")}
          </Button>
          <Button
            href="#how-the-diagnostic-works"
            variant="on-brand-outline"
          >
            {t("See How the Diagnostic Works")}
          </Button>
        </div>
      </div>
    </div>
  );
}

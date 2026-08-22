import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import CookieConsentReopener from "@/components/analytics/CookieConsentReopener";
import { Link } from "@/i18n/navigation";
import { getT } from "@/i18n/t";
import styles from "./Footer.module.css";

// Copy, labels and targets from docs/texts.md + docs/sitemap.md → "Footer".
const COMPANY_LINKS = [
  { label: "About", href: "/about/" },
  { label: "Services", href: "/services/" },
  { label: "Blog", href: "/blog/" },
  { label: "Scenarios", href: "/case-studies" },
  { label: "Contact", href: "/#diagnostic-request-form" },
];

const GET_STARTED_LINKS = [
  { label: "Request Diagnostic", href: "/#diagnostic-request-form" },
  { label: "How It Works", href: "/#how-the-diagnostic-works" },
  { label: "FAQ", href: "/#faq" },
];

// Legal links are real page routes, not anchors.
const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

function LinkGroup({
  title,
  links,
  extra,
  t,
}: {
  title: string;
  links: { label: string; href: string }[];
  extra?: ReactNode;
  t: (en: string) => string;
}) {
  return (
    <div>
      <p className={styles.groupTitle}>{t(title)}</p>
      <ul className={styles.linkList}>
        {links.map((link) => (
          <li key={link.href + link.label}>
            {link.href.startsWith("#") ? (
              <a href={link.href} className={styles.link}>
                {t(link.label)}
              </a>
            ) : (
              <Link href={link.href} className={styles.link}>
                {t(link.label)}
              </Link>
            )}
          </li>
        ))}
        {extra && <li>{extra}</li>}
      </ul>
    </div>
  );
}

export default async function Footer() {
  const t = await getT();
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* CTA panel */}
        <div className={`${styles.ctaPanel} print-hide`}>
          <p className={styles.ctaText}>
            {t("See what each engagement includes, and what it costs.")}
          </p>
          <Button href="/services" variant="on-brand">
            {t("See Our Services")}
          </Button>
        </div>

        {/* Positioning */}
        <p className={styles.positioning}>
          {t(
            "Fill System: senior-led IT and business advisory for B2B companies facing process, data, and system complexity."
          )}
        </p>

        {/* Link groups */}
        <div className={styles.columns}>
          <LinkGroup title="Company" links={COMPANY_LINKS} t={t} />
          <LinkGroup title="Get Started" links={GET_STARTED_LINKS} t={t} />
          <LinkGroup
            title="Legal"
            links={LEGAL_LINKS}
            extra={<CookieConsentReopener className={styles.link} />}
            t={t}
          />
        </div>

        {/* Copyright + direct contact */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2026 Fill System. California, USA.
          </p>
          <p className={styles.contact}>
            {t("Questions or issues?")}{" "}
            <a href="mailto:hello@fillsystem.com" className={styles.contactLink}>
              hello@fillsystem.com
            </a>
            <span className={styles.responseTime}>
              {t("Email-only - we respond within 24 hours")}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

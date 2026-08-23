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
  { label: "Technical Resources", href: "/resources/" },
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

        {/* Social links */}
        <div className={styles.social}>
          <a
            href="https://www.linkedin.com/company/fillsystem"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="LinkedIn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="https://www.crunchbase.com/organization/fillsystem"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Crunchbase"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M21.6 0H2.4A2.4 2.4 0 0 0 0 2.4v19.2A2.4 2.4 0 0 0 2.4 24h19.2a2.4 2.4 0 0 0 2.4-2.4V2.4A2.4 2.4 0 0 0 21.6 0zm-3.75 18.34a5.48 5.48 0 0 1-3.09.94 5.3 5.3 0 0 1-4.58-2.56 5.26 5.26 0 0 1 0-5.44 5.3 5.3 0 0 1 4.58-2.56c1.12 0 2.2.35 3.09.94v-.82h1.73v9.62h-1.73v-.12zm-8.32.18H6.34V5.48h3.19v4.81a4.7 4.7 0 0 0-2.56-.76 5.22 5.22 0 0 0-4.53 2.56 5.26 5.26 0 0 0 0 5.44A5.22 5.22 0 0 0 6.97 20.1c.96 0 1.87-.27 2.56-.76v.18z" />
            </svg>
          </a>
          <a
            href="https://clutch.co/profile/fillsystem"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Clutch"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18.53c-3.6 0-6.53-2.93-6.53-6.53S8.4 5.47 12 5.47c2.07 0 3.92.97 5.11 2.48l-2.57 1.49A3.47 3.47 0 0 0 12 8.07a3.93 3.93 0 0 0 0 7.86 3.47 3.47 0 0 0 2.54-1.37l2.57 1.49A6.48 6.48 0 0 1 12 18.53z" />
            </svg>
          </a>
        </div>

        {/* Copyright + direct contact */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2026 Fill System LLC. California, USA.
          </p>
          <p className={styles.contact}>
            {t("Questions or issues?")}{" "}
            <a href="mailto:oxfordconstruction.ca@gmail.com" className={styles.contactLink}>
              oxfordconstruction.ca@gmail.com
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

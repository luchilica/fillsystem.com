import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import Button from "@/components/ui/Button";
import CookieConsentReopener from "@/components/analytics/CookieConsentReopener";
import { LOCALE_META, type Locale } from "@/i18n/locales";
import { getT } from "@/i18n/t";
import styles from "./Footer.module.css";

// Copy, labels and targets from docs/texts.md + docs/sitemap.md → "Footer".
const COMPANY_LINKS = [
  { label: "About", href: "/about/" },
  { label: "Services", href: "/services/" },
  { label: "Results", href: "/#proof-examples" },
  { label: "Contact", href: "/#diagnostic-request-form" },
];

const GET_STARTED_LINKS = [
  { label: "Request Diagnostic", href: "/#diagnostic-request-form" },
  { label: "How It Works", href: "/#how-the-diagnostic-works" },
  { label: "Pricing", href: "/#areas-of-work" },
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
  hrefPrefix = "",
}: {
  title: string;
  links: { label: string; href: string }[];
  extra?: ReactNode;
  t: (en: string) => string;
  hrefPrefix?: string;
}) {
  return (
    <div>
      <h3 className={styles.groupTitle}>{t(title)}</h3>
      <ul className={styles.linkList}>
        {links.map((link) => (
          <li key={link.href + link.label}>
            <a
              href={link.href.startsWith("#") ? link.href : `${hrefPrefix}${link.href}`}
              className={styles.link}
            >
              {t(link.label)}
            </a>
          </li>
        ))}
        {extra && <li>{extra}</li>}
      </ul>
    </div>
  );
}

export default async function Footer() {
  const t = await getT();
  const locale = (await getLocale()) as Locale;
  const prefix = LOCALE_META[locale].prefix;
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* CTA panel */}
        <div className={`${styles.ctaPanel} print-hide`}>
          <p className={styles.ctaText}>
            {t("See what each engagement includes, and what it costs.")}
          </p>
          <Button href="#areas-of-work" variant="on-brand">
            {t("See Our Services")}
          </Button>
        </div>

        {/* Positioning */}
        <p className={styles.positioning}>
          {t(
            "Opsfield Systems: senior-led IT and business advisory for B2B companies facing process, data, and system complexity."
          )}
        </p>

        {/* Link groups */}
        <div className={styles.columns}>
          <LinkGroup title="Company" links={COMPANY_LINKS} t={t} hrefPrefix={prefix} />
          <LinkGroup title="Get Started" links={GET_STARTED_LINKS} t={t} hrefPrefix={prefix} />
          <LinkGroup
            title="Legal"
            links={LEGAL_LINKS}
            extra={<CookieConsentReopener className={styles.link} />}
            t={t}
            hrefPrefix={prefix}
          />
        </div>

        {/* Copyright + direct contact */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2026 Opsfield Systems. California, USA.
          </p>
          <p className={styles.contact}>
            {t("Questions or issues?")}{" "}
            <a href="mailto:opsfieldsystems@gmail.com" className={styles.contactLink}>
              opsfieldsystems@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LOCALE_META, type Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor, localizedUrl } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { getT } from "@/i18n/t";
import { Mail, Shield, ExternalLink } from "lucide-react";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import BusinessITDiagnostic from "@/components/sections/BusinessITDiagnostic";
import styles from "./Contact.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getT();
  const title = t("Contact Us");
  const description = t(
    "Get in touch with Fill System. Request a complimentary business diagnostic or reach us directly."
  );
  return {
    title,
    description,
    alternates: alternatesFor(loc, "/contact"),
    robots: robotsFor(loc),
    openGraph: {
      title: `${title} | Fill System`,
      description,
      url: localizedUrl(loc, "/contact"),
      type: "website",
      siteName: siteConfig.name,
      locale: LOCALE_META[loc].ogLocale,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Contact Fill System" }],
    },
  };
}

const CONTACT_CHANNELS = [
  {
    Icon: Mail,
    title: "Email",
    detail: "hello@fillsystem.com",
    href: "mailto:hello@fillsystem.com",
  },
  {
    Icon: Shield,
    title: "Privacy Requests",
    detail: "privacy@fillsystem.com",
    href: "mailto:privacy@fillsystem.com",
  },
  {
    Icon: ExternalLink,
    title: "LinkedIn",
    detail: "Igor Saevets",
    href: "https://www.linkedin.com/in/igorsaevets",
  },
];

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getT();

  return (
    <>
      <BreadcrumbJsonLd
        title="Contact"
        path="/contact"
        locale={locale as Locale}
      />

      {/* Hero */}
      <section className={`section ${styles.heroSection}`}>
        <div className="container">
          <h1>{t("Contact Us")}</h1>
          <p className={`lead ${styles.lead}`}>
            {t(
              "Have a question or ready to start? Reach out directly or request a complimentary diagnostic below."
            )}
          </p>
        </div>
      </section>

      {/* Diagnostic form */}
      <section id="diagnostic-request-form" className="section">
        <BusinessITDiagnostic />
      </section>

      {/* Contact info */}
      <section className="section">
        <div className="container">
          <h2>{t("Other Ways to Reach Us")}</h2>
          <div className={styles.contactInfo}>
            {CONTACT_CHANNELS.map((ch) => (
              <div key={ch.title} className={styles.infoCard}>
                <span className={styles.infoIcon} aria-hidden="true">
                  <ch.Icon size={20} />
                </span>
                <p className={styles.infoTitle}>{t(ch.title)}</p>
                <p className={styles.infoDetail}>
                  <a
                    href={ch.href}
                    target={ch.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      ch.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {ch.detail}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

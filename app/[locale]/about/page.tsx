import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { getT } from "@/i18n/t";
import styles from "./About.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  return {
    title: "About Opsfield Systems | B2B IT & Operations Consulting",
    description:
      "Founded by Igor Saevets, Opsfield Systems delivers diagnostic-first IT and business consulting for B2B companies with 50-250 employees. Meet the team and learn our approach.",
    alternates: alternatesFor(loc, "/about"),
    robots: robotsFor(loc),
  };
}

// Person JSON-LD for Igor Saevets — richer than the homepage snippet.
function PersonJsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Igor Saevets",
    jobTitle: "Managing Partner",
    description:
      "Serial entrepreneur with 10+ companies founded across the US and Europe. EB-1A green card holder. Leads diagnostic methodology and operating model design at Opsfield Systems.",
    url: `${siteConfig.url}/about`,
    sameAs: ["https://linkedin.com/in/igorsaevets"],
    worksFor: {
      "@type": "Organization",
      name: "Opsfield Systems",
      url: siteConfig.url,
    },
    knowsAbout: [
      "IT consulting",
      "business operations",
      "diagnostic methodology",
      "operating model design",
      "CRM architecture",
      "enterprise software",
      "cloud migrations",
      "digital transformation",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
    />
  );
}

export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getT();

  return (
    <>
      <BreadcrumbJsonLd title="About" path="/about" />
      <PersonJsonLd />

      {/* Section 1 — Hero / Intro */}
      <section className={`section ${styles.heroSection}`}>
        <div className="container">
          <h1>{t("About Opsfield Systems")}</h1>
          <p className={`lead ${styles.lead}`}>
            {t(
              "Diagnostic-first IT and business consulting for B2B companies navigating process, CRM, data flow, and automation complexity."
            )}
          </p>
        </div>
      </section>

      {/* Section 2 — Our Approach */}
      <section className="section">
        <div className="container">
          <div className={styles.approach}>
            <h2>{t("Diagnostic-First: Validate Before You Implement")}</h2>
            <p>
              {t(
                "Most consulting starts with a solution. We start with a diagnosis. Before recommending tools, hires, or implementation projects, we map how your business actually operates — processes, data flow, systems, handoffs — and identify where execution breaks down."
              )}
            </p>
            <p>
              {t(
                "This approach protects you from committing budget to the wrong problem. The diagnostic output — bottleneck map, priority matrix, risk notes, roadmap — gives you a decision framework, not a sales pitch."
              )}
            </p>
            <p>
              {t(
                "If the diagnostic shows no engagement is needed, we say so. A no-fit decision is a valid outcome."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — Team */}
      <section className="section">
        <div className="container">
          <h2>{t("Team")}</h2>

          <div className={styles.teamGrid}>
            {/* Igor Saevets — Managing Partner */}
            <article className={styles.teamCard}>
              <div className={styles.teamCardHead}>
                <span className={styles.avatar} aria-hidden="true">
                  IS
                </span>
                <div>
                  <h3 className={styles.cardName}>
                    <a
                      href="https://linkedin.com/in/igorsaevets"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.nameLink}
                    >
                      Igor Saevets
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  </h3>
                  <p className={styles.cardRole}>{t("Managing Partner")}</p>
                  <p className={styles.cardRole}>
                    {t("Operating model & diagnostic lead")}
                  </p>
                </div>
              </div>
              <p className={styles.cardBio}>
                {t(
                  "Serial entrepreneur with 10+ companies founded across the US and Europe. EB-1A green card holder, recognized for extraordinary ability in business and technology. Leads diagnostic methodology and operating model design at Opsfield Systems."
                )}
              </p>
              <p className={styles.cardBioExtended}>
                {t(
                  "Before Opsfield, Igor founded business incubators, startup accelerators, and prototyping centers, mentoring 150+ entrepreneurs and contributing to entrepreneurship legislation. His background spans enterprise software, cloud migrations, and cross-border digital transformation."
                )}
              </p>
            </article>

            {/* Solution Architect (unnamed) */}
            <article className={styles.teamCard}>
              <div className={styles.teamCardHead}>
                <span className={styles.avatar} aria-hidden="true">
                  SA
                </span>
                <div>
                  <h3 className={styles.cardName}>{t("Solution Architect")}</h3>
                  <p className={styles.cardRole}>
                    {t("CRM / RevOps & data flow")}
                  </p>
                </div>
              </div>
              <p className={styles.cardBio}>
                {t(
                  "Responsible for CRM architecture, RevOps pipeline design, data flow mapping, integrations, automation design, and implementation risk review."
                )}
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Section 4 — By the Numbers */}
      <section className="section">
        <div className="container">
          <h2>{t("By the Numbers")}</h2>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <p className={styles.statNum}>10+</p>
              <p className={styles.statLabel}>{t("Companies founded")}</p>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statNum}>150+</p>
              <p className={styles.statLabel}>{t("Entrepreneurs mentored")}</p>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statNum}>4-6</p>
              <p className={styles.statLabel}>
                {t("Active clients at a time")}
              </p>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statNum}>50-250</p>
              <p className={styles.statLabel}>{t("Employees — best fit")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — CTA */}
      <section className={`section ${styles.ctaSection}`}>
        <div className="container">
          <h2>{t("Start With a Free Diagnostic")}</h2>
          <p className={styles.ctaText}>
            {t(
              "The first diagnostic conversation is complimentary. We frame the problem, identify bottlenecks, and tell you whether a paid engagement is warranted."
            )}
          </p>
          <div className={styles.ctaActions}>
            <Button
              href="/#diagnostic-request-form"
              variant="primary"
              icon
            >
              {t("Request a Business & IT Diagnostic")}
            </Button>
            <Button href="/#areas-of-work" variant="secondary">
              {t("See Our Services")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

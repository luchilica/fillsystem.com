import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/ui/Button";
import PlusMark from "@/components/ui/PlusMark";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { setRequestLocale } from "next-intl/server";
import { LOCALE_META, type Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor, localizedUrl } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { getT } from "@/i18n/t";
import {
  Stethoscope,
  ShieldCheck,
  FileCheck,
} from "lucide-react";
import styles from "./About.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getT();
  const title = t("About Us - B2B IT & Operations Consulting");
  const description = t("Founded by Igor Saevets, Fill System delivers diagnostic-first IT and operations consulting for B2B companies with 50-250 employees.");
  return {
    title,
    description,
    alternates: alternatesFor(loc, "/about"),
    robots: robotsFor(loc),
    openGraph: {
      title: `${title} | Fill System`,
      description,
      url: localizedUrl(loc, "/about"),
      type: "website",
      siteName: siteConfig.name,
      locale: LOCALE_META[loc].ogLocale,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Fill System - B2B IT & Operations Consulting" }],
    },
  };
}

function PersonJsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Igor Saevets",
    jobTitle: "Founder & CEO",
    description:
      "Serial entrepreneur with 10+ companies founded across the US and Europe. EB-1A green card holder. Leads diagnostic methodology and operating model design at Fill System.",
    url: `${siteConfig.url}/about`,
    sameAs: ["https://www.linkedin.com/in/igorsaevets"],
    worksFor: {
      "@type": "Organization",
      name: "Fill System",
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

const PRINCIPLES: {
  Icon: typeof Stethoscope;
  title: string;
  description: string;
}[] = [
  {
    Icon: Stethoscope,
    title: "Diagnosis Before Action",
    description:
      "We map how your business operates - processes, data flow, systems, handoffs - before recommending any changes.",
  },
  {
    Icon: ShieldCheck,
    title: "Protect Your Budget",
    description:
      "The diagnostic gives you a bottleneck map, priority matrix, and roadmap - a decision framework, not a sales pitch.",
  },
  {
    Icon: FileCheck,
    title: "No-Fit Is Valid",
    description:
      "If the diagnostic shows no engagement is needed, we say so. A no-fit decision is a valid outcome.",
  },
];

const TEAM = [
  {
    name: "Igor Saevets",
    initials: "IS",
    photo: "/photos/igor-saevets.jpg",
    photoIsLogo: false,
    title: "Founder & CEO",
    subtitle: "Operating model & diagnostic lead",
    link: "https://www.linkedin.com/in/igorsaevets",
    isLinkedIn: true,
    bio: "Serial entrepreneur with 10+ companies founded across the US and Europe. EB-1A green card holder, recognized for extraordinary ability in business and technology. Leads diagnostic methodology and operating model design at Fill System.",
    bioExtended:
      "Before Fill System, Igor founded business incubators, startup accelerators, and prototyping centers, mentoring 150+ entrepreneurs and contributing to entrepreneurship legislation. He has built enterprise software, led cloud migrations, and run cross-border tech projects.",
  },
  {
    name: "GrowCluster",
    initials: "GC",
    photo: "/photos/growcluster.png",
    photoIsLogo: true,
    title: "Technology Partner",
    subtitle: "International Association of IT Specialists",
    link: "https://growcluster.com/",
    isLinkedIn: false,
    bio: "International IT professionals community providing certified talent, mentorship, and industry expertise for project teams and consulting work.",
    bioExtended:
      "GrowCluster brings together 200+ vetted IT specialists across software engineering, cloud infrastructure, cybersecurity, and data engineering. Members contribute to Fill System engagements as domain experts, implementation leads, and technical reviewers.",
  },
];

const STATS = [
  { num: "10+", label: "Companies founded" },
  { num: "150+", label: "Entrepreneurs mentored" },
  { num: "4-6", label: "Active clients at a time" },
  { num: "50-250", label: "Employees · best fit" },
];

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
      <BreadcrumbJsonLd title="About" path="/about" locale={locale as Locale} />
      <PersonJsonLd />

      {/* 1 - Hero */}
      <section className={`section ${styles.heroSection}`}>
        <div className="container">
          <h1>{t("About Fill System")}</h1>
          <p className={`lead ${styles.lead}`}>
            {t(
              "Diagnostic-first IT and business development for B2B companies dealing with process, CRM, data flow, and automation problems.",
            )}
          </p>
          <p className={styles.heroBody}>
            {t(
              "Fill System was founded in 2021 in California by Igor Saevets after a decade of building and advising technology companies across the US and Europe. The pattern was always the same: companies between 50 and 250 employees hit a wall where the processes that worked at 20 people start breaking - undocumented handoffs, CRM data nobody trusts, automation layered on top of broken workflows. We built Fill System to diagnose those problems before anyone commits budget to fixing them.",
            )}
          </p>
        </div>
      </section>

      {/* 2 - Approach (dark ink, principle cards) */}
      <section className={`section ${styles.approachSection}`}>
        <PlusMark size={180} className={styles.darkPlusTop} />
        <PlusMark size={100} className={styles.darkPlusBottom} />
        <div className="container">
          <h2>{t("Our Diagnostic-First Approach")}</h2>
          <div className={styles.principleGrid}>
            {PRINCIPLES.map((p) => (
              <div key={p.title} className={styles.principleCard}>
                <span className={styles.principleIcon} aria-hidden="true">
                  <p.Icon size={20} />
                </span>
                <h3 className={styles.principleTitle}>{t(p.title)}</h3>
                <p className={styles.principleDesc}>{t(p.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 - How the diagnostic works */}
      <section className="section">
        <div className="container">
          <h2>{t("How the diagnostic works")}</h2>
          <p className={`lead ${styles.lead}`}>
            {t(
              "Every engagement begins with a structured review, not a sales pitch. The diagnostic separates problem definition from solution delivery so you never pay for implementation before the problem is validated.",
            )}
          </p>
          <p>
            {t(
              "In the first 30-45 minutes, we review your workflows, systems, CRM usage, reporting, automation, and decision bottlenecks. We then map likely root causes and score fixes by impact, effort, risk, dependency, and business value. You receive a clear next step: audit, assessment, roadmap, advisory, implementation support, pause, or no-fit.",
            )}
          </p>
          <p>
            {t(
              "A no-fit decision is a valid outcome. If the diagnostic shows that the problem does not justify a paid engagement, or that you need a different kind of help, we say so. The diagnostic is complimentary because we need to understand the problem before we can estimate whether we are the right team to solve it.",
            )}
          </p>
          <h3>{t("Who we work with")}</h3>
          <p>
            {t(
              "Our strongest fit is a B2B company with 50-250 employees facing cross-functional process or system complexity, weak visibility across CRM or SaaS tools, unclear automation or AI priorities, or a high-impact migration or integration decision that needs independent review. We work across industries including SaaS, professional services, logistics, manufacturing, and multi-location operators.",
            )}
          </p>
          <p>
            {t(
              "We are usually not the right fit for pre-revenue startups, companies under 30 employees, engagements that need a full-time embedded team, or implementation-only work without a diagnostic phase.",
            )}
          </p>
        </div>
      </section>

      {/* 4 - Team */}
      <section className="section">
        <div className="container">
          <h2>{t("Team")}</h2>
          <div className={styles.teamGrid}>
            {TEAM.map((member) => (
              <article key={member.initials} className={styles.teamCard}>
                <div className={styles.teamCardHead}>
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={`${member.name} - ${member.title} at Fill System`}
                      width={member.photoIsLogo ? 182 : 56}
                      height={member.photoIsLogo ? 55 : 56}
                      className={member.photoIsLogo ? styles.avatarLogo : styles.avatarPhoto}
                    />
                  ) : (
                    <span className={styles.avatar} aria-hidden="true">
                      {member.initials}
                    </span>
                  )}
                  <div>
                    <h3 className={styles.cardName}>
                      <a
                        href={member.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.nameLink}
                      >
                        {member.name}
                        {member.isLinkedIn && (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        )}
                      </a>
                    </h3>
                    <p className={styles.cardRole}>{t(member.title)}</p>
                    <p className={styles.cardRole}>{t(member.subtitle)}</p>
                  </div>
                </div>

                <p className={styles.cardBio}>{t(member.bio)}</p>
                {member.bioExtended && (
                  <p className={styles.cardBioExtended}>
                    {t(member.bioExtended)}
                  </p>
                )}

              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4 - Stats (brand blue) */}
      <section className={`section ${styles.statsSection}`}>
        <PlusMark size={160} className={styles.brandPlusTop} />
        <PlusMark size={90} className={styles.brandPlusBottom} />
        <div className="container">
          <h2>{t("By the Numbers")}</h2>
          <div className={styles.statsGrid}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.statCard}>
                <p className={styles.statNum}>{s.num}</p>
                <p className={styles.statLabel}>{t(s.label)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 - CTA (dark ink, full-width) */}
      <section className={`section ${styles.ctaDark}`}>
        <PlusMark size={180} className={styles.ctaPlusTop} />
        <PlusMark size={100} className={styles.ctaPlusBottom} />
        <div className="container">
          <h2 className={styles.ctaHeading}>
            {t("Start With a Free Diagnostic")}
          </h2>
          <p className={styles.ctaLead}>
            {t(
              "The first conversation is free. We find the bottlenecks and tell you if a paid engagement makes sense.",
            )}
          </p>
          <div className={styles.ctaActions}>
            <Button
              href="/#diagnostic-request-form"
              variant="on-brand"
              icon
            >
              {t("Request a Diagnostic")}
            </Button>
            <Button href="/services" variant="on-brand-outline">
              {t("See Our Services")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

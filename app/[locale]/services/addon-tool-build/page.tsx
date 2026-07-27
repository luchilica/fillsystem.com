import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getT } from "@/i18n/t";
import { siteConfig } from "@/lib/site-config";
import { LOCALE_META, type Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor, localizedUrl } from "@/lib/i18n";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import Button from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { Check } from "lucide-react";
import PlusMark from "@/components/ui/PlusMark";
import styles from "./AddonTool.module.css";

const TITLE =
  "Add-on Tool Build: Bot, Landing Page, or Email | Opsfield Systems";
const DESCRIPTION =
  "Pick one quick win — a Telegram bot, landing page, or email campaign. Scoped small, shipped fast. From $900.";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: alternatesFor(loc, "/services/addon-tool-build"),
    robots: robotsFor(loc),
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: localizedUrl(loc, "/services/addon-tool-build"),
      type: "website",
      siteName: siteConfig.name,
      locale: LOCALE_META[loc].ogLocale,
    },
  };
}

const BUILD_OPTIONS = [
  {
    title: "Telegram Bot",
    description:
      "Notifications, commands, and integrations. Connected to your existing systems.",
  },
  {
    title: "Landing Page",
    description:
      "Conversion-focused, analytics-ready, A/B testable. Designed to perform.",
  },
  {
    title: "Email Campaign",
    description:
      "Sequences, templates, and automation. Wired into your CRM or mailing tool.",
  },
] as const;

const INCLUDED = [
  "Design & build",
  "Launch & handover",
  "Basic analytics",
  "Documentation",
] as const;

const FAQ = [
  {
    question: "Can I pick more than one?",
    answer:
      "Yes. Each tool is priced separately. We can run them in parallel or sequence depending on your priorities.",
  },
  {
    question: "Do I need the diagnostic first?",
    answer:
      "Recommended but not required for add-ons. If you already know what you need, we can scope directly.",
  },
  {
    question: "What tech stack?",
    answer:
      "It depends on your existing tools. We work with what you have — no forced migrations. We will recommend a stack during the scoping call.",
  },
] as const;

export default async function AddonToolBuild({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getT();
  const loc = locale as Locale;
  const home = siteConfig.url;
  const pageUrl = localizedUrl(loc, "/services/addon-tool-build");

  // Three-level breadcrumb: Home > Services > Add-on Tool Build
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: siteConfig.name,
        item: home,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: localizedUrl(loc, "/services"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Add-on Tool Build",
        item: pageUrl,
      },
    ],
  };

  // Service JSON-LD + FAQPage for this service page.
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageUrl,
        name: TITLE,
        description: DESCRIPTION,
        url: pageUrl,
        isPartOf: { "@id": `${home}#website` },
        inLanguage: LOCALE_META[loc].htmlLang,
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Add-on Tool Build",
        description:
          "Pick one quick win — a Telegram bot, landing page, or email campaign. Scoped small, shipped fast.",
        serviceType: "Software tool build",
        provider: { "@id": `${home}#organization` },
        areaServed: { "@type": "Country", name: "United States" },
        url: pageUrl,
        offers: {
          "@type": "Offer",
          name: "Add-on Tool Build",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: "900",
            priceCurrency: "USD",
          },
          description:
            "Add-on tool builds start from $900 for a lean team. 1-2 weeks delivery.",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: FAQ.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* 1 -- Hero */}
      <section className={`section ${styles.heroSection}`}>
        <div className="container">
          <h1>{t("Add-on Tool Build")}</h1>
          <p className={`lead ${styles.lead}`}>
            {t(
              "Pick one quick win. We build it and hand it over.",
            )}
          </p>
        </div>
      </section>

      {/* 2 -- What We Build */}
      <section className={`section ${styles.darkSection}`}>
        <PlusMark className={styles.darkPlusTop} size={120} />
        <PlusMark className={styles.darkPlusBottom} size={80} />
        <div className="container">
          <h2>{t("Choose One")}</h2>
          <div className={styles.buildGrid}>
            {BUILD_OPTIONS.map((item) => (
              <div key={item.title} className={styles.buildCard}>
                <h3 className={styles.buildTitle}>{t(item.title)}</h3>
                <p className={styles.buildDesc}>{t(item.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 -- What's Included */}
      <section className="section">
        <div className="container">
          <h2>{t("What’s Included")}</h2>
          <ul className={styles.includedList}>
            {INCLUDED.map((item) => (
              <li key={item} className={styles.includedItem}>
                <span className={styles.checkIcon} aria-hidden="true">
                  <Check size={14} strokeWidth={2.5} />
                </span>
                <p className={styles.includedText}>{t(item)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 -- Pricing */}
      <section className={`section ${styles.brandSection}`}>
        <PlusMark className={styles.brandPlusTop} size={120} />
        <PlusMark className={styles.brandPlusBottom} size={80} />
        <div className="container">
          <h2>{t("Pricing")}</h2>
          <div className={styles.pricingCard}>
            <p className={styles.pricingPrice}>{t("From $900")}</p>
            <p className={styles.pricingBody}>
              {t(
                "From $900 for a lean team. 1–2 weeks delivery.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 5 -- FAQ */}
      <section className="section">
        <div className="container">
          <div className={styles.faqSection}>
            <PlusMark size={160} className={styles.faqPlusTop} />
            <PlusMark size={90} className={styles.faqPlusBottom} />
            <h2>{t("Add-on Build FAQ")}</h2>
            <div className={styles.faqList}>
              {FAQ.map((item) => (
                <div key={item.question} className={styles.faqItem}>
                  <h3 className={styles.faqQuestion}>{t(item.question)}</h3>
                  <p className={styles.faqAnswer}>{t(item.answer)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6 -- CTA */}
      <section className={`section ${styles.ctaSection}`}>
        <div className="container">
          <div className={styles.ctaBlock}>
            <h2>{t("Discuss a Tool Build")}</h2>
            <p className={styles.ctaLead}>
              {t(
                "Tell us what you need built. We will scope it, price it, and ship it.",
              )}
            </p>
            <div className={styles.ctaActions}>
              <Button
                href="/#diagnostic-request-form"
                variant="on-brand"
                icon
                data-request-type="Add-on Tool Build"
              >
                {t("Discuss a Tool Build")}
              </Button>
              <Link href="/services">
                <Button variant="on-brand-outline">
                  {t("See All Services")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

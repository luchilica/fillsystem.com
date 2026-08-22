import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getT } from "@/i18n/t";
import { siteConfig } from "@/lib/site-config";
import { LOCALE_META, type Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor, localizedUrl } from "@/lib/i18n";
import Button from "@/components/ui/Button";
import { Check } from "lucide-react";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import PlusMark from "@/components/ui/PlusMark";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { Link } from "@/i18n/navigation";
import styles from "./AddonTool.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getT();
  const title = t("Add-on Tool Build: Bot, Page, or Email");
  const description = t("Pick one quick win - a Telegram bot, landing page, or email campaign. Scoped small, shipped fast. From $1,100.");
  return {
    title,
    description,
    alternates: alternatesFor(loc, "/services/addon-tool-build"),
    robots: robotsFor(loc),
    openGraph: {
      title: `${title} | Fill System`,
      description,
      url: localizedUrl(loc, "/services/addon-tool-build"),
      type: "website",
      siteName: siteConfig.name,
      locale: LOCALE_META[loc].ogLocale,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Add-on Tool Build - Fill System" }],
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
      "It depends on your existing tools. We work with what you have - no forced migrations. We will recommend a stack during the scoping call.",
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

  // Service JSON-LD + FAQPage for this service page.
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${home}#organization`,
        name: siteConfig.name,
        url: home,
      },
      {
        "@type": "WebPage",
        "@id": pageUrl,
        name: t("Add-on Tool Build: Bot, Page, or Email"),
        description: t("Pick one quick win - a Telegram bot, landing page, or email campaign. Scoped small, shipped fast. From $1,100."),
        url: pageUrl,
        isPartOf: { "@id": `${home}#website` },
        inLanguage: LOCALE_META[loc].htmlLang,
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Add-on Tool Build",
        description:
          "Pick one quick win - a Telegram bot, landing page, or email campaign. Scoped small, shipped fast.",
        serviceType: "Software tool build",
        provider: { "@id": `${home}#organization` },
        areaServed: { "@type": "Country", name: "United States" },
        url: pageUrl,
        offers: {
          "@type": "Offer",
          name: "Add-on Tool Build",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: "1100",
            priceCurrency: "USD",
          },
          description:
            "Add-on tool builds start from $1,100 for a lean team. 1-2 weeks delivery.",
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
      <BreadcrumbJsonLd
        title="Add-on Tool Build"
        path="/services/addon-tool-build"
        parent={{ title: "Services", path: "/services" }}
        locale={locale as Locale}
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
            <p className={styles.pricingPrice}>{t("From $1,100")}</p>
            <p className={styles.pricingBody}>
              {t(
                "From $1,100 for a lean team. 1-2 weeks delivery.",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* 5 -- FAQ */}
      <section className="section">
        <div className="container">
          <h2>{t("Add-on Build FAQ")}</h2>
          <FaqAccordion
            items={FAQ.map((item) => ({
              question: t(item.question),
              answer: t(item.answer),
            }))}
          />
        </div>
      </section>

      {/* 6 -- CTA */}
      <section className={`section ${styles.ctaDark}`}>
        <PlusMark size={180} className={styles.ctaPlusTop} />
        <PlusMark size={100} className={styles.ctaPlusBottom} />
        <div className="container">
          <h2 className={styles.ctaHeading}>{t("Build Something Specific")}</h2>
          <p className={styles.ctaLead}>{t("One deliverable. Fixed scope. No ongoing retainer.")}</p>
          <div className={styles.ctaActions}>
            <Button href="/#diagnostic-request-form" variant="on-brand" icon data-request-type="Add-on Tool Build">
              {t("Discuss a Tool Build")}
            </Button>
            <Link href="/services">
              <Button variant="on-brand-outline">{t("See All Services")}</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { LOCALE_META, type Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor, localizedUrl } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { getT } from "@/i18n/t";
import { Link } from "@/i18n/navigation";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import Button from "@/components/ui/Button";
import PlusMark from "@/components/ui/PlusMark";
import { BLOG_POSTS } from "@/components/blog/blogData";
import styles from "./BlogListing.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  return {
    title: "B2B Operations & IT Consulting Blog",
    description:
      "Expert insights on B2B operations, CRM audits, RevOps, process optimization, and IT diagnostics from the Fill System team.",
    alternates: alternatesFor(loc, "/blog"),
    robots: robotsFor(loc),
    openGraph: {
      title: "B2B Operations & IT Consulting Blog",
      description:
        "Expert insights on B2B operations, CRM audits, RevOps, process optimization, and IT diagnostics from the Fill System team.",
      url: localizedUrl(loc, "/blog"),
      type: "website",
      siteName: siteConfig.name,
      locale: LOCALE_META[loc].ogLocale,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getT();

  return (
    <>
      <BreadcrumbJsonLd title="Blog" path="/blog" />

      {/* Hero */}
      <section className={`section ${styles.heroSection}`}>
        <div className="container">
          <h1>{t("B2B Operations & IT Consulting Blog")}</h1>
          <p className={`lead ${styles.lead}`}>
            {t(
              "Practical guides on RevOps, CRM, and IT diagnostics for B2B teams."
            )}
          </p>
        </div>
      </section>

      {/* Cards — dark ink background */}
      <section className={`section ${styles.darkSection}`}>
        <PlusMark size={200} className={styles.darkPlusTop} />
        <PlusMark size={110} className={styles.darkPlusBottom} />
        <div className="container">
          <div className={styles.grid}>
            {BLOG_POSTS.map((post) => (
              <article key={post.slug} className={styles.card}>
                {post.heroImage && (
                  <Link
                    href={`/blog/${post.slug}`}
                    className={styles.cardImageLink}
                  >
                    <Image
                      src={post.heroImage}
                      alt={post.heroAlt || ""}
                      width={600}
                      height={315}
                      className={styles.cardImage}
                    />
                  </Link>
                )}

                <div className={styles.cardBody}>
                  <h2 className={styles.cardTitle}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className={styles.cardTitleLink}
                    >
                      {t(post.title)}
                    </Link>
                  </h2>

                  <p className={styles.cardDesc}>{t(post.description)}</p>

                  <div className={styles.cardFooter}>
                    <span className={styles.authorName}>
                      {post.author.name}
                    </span>
                    <time className={styles.cardDate} dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — dark ink */}
      <section className={`section ${styles.ctaDark}`}>
        <PlusMark size={180} className={styles.ctaPlusTop} />
        <PlusMark size={100} className={styles.ctaPlusBottom} />
        <div className="container">
          <h2 className={styles.ctaHeading}>
            {t("Have a Question About Your Systems?")}
          </h2>
          <p className={styles.ctaLead}>
            {t(
              "The first conversation is free. We find the bottlenecks and tell you if a paid engagement makes sense."
            )}
          </p>
          <div className={styles.ctaActions}>
            <Button href="/#diagnostic-request-form" variant="on-brand" icon>
              {t("Request a Diagnostic")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

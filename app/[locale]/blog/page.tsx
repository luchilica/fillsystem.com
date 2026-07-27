import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor } from "@/lib/i18n";
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
    title: "Blog | Opsfield Systems",
    description:
      "Expert insights on B2B operations, CRM audits, RevOps, process optimization, and IT diagnostics from the Opsfield Systems team.",
    alternates: alternatesFor(loc, "/blog"),
    robots: robotsFor(loc),
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
          <h1>{t("Blog")}</h1>
          <p className={`lead ${styles.lead}`}>
            {t(
              "Practical guides on RevOps, CRM, and IT diagnostics for B2B teams."
            )}
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {BLOG_POSTS.map((post) => (
              <article key={post.slug} className={styles.card}>
                <div className={styles.cardMeta}>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className={styles.metaDot} aria-hidden="true">
                    &middot;
                  </span>
                  <span>{post.readTime}</span>
                </div>

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
                  <span className={styles.authorName}>{post.author.name}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className={styles.readLink}
                  >
                    {t("Read article")}
                  </Link>
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
            <Link href="/services">
              <Button variant="on-brand-outline">
                {t("See Our Services")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

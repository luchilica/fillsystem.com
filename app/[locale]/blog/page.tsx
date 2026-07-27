import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor } from "@/lib/i18n";
import { getT } from "@/i18n/t";
import { Link } from "@/i18n/navigation";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
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

/** Format ISO date to "Jul 27, 2026". */
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
              "Expert insights on B2B operations, RevOps, CRM, and IT diagnostics."
            )}
          </p>
        </div>
      </section>

      {/* Listing */}
      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {BLOG_POSTS.map((post) => (
              <article key={post.slug} className={styles.card}>
                <h2 className={styles.cardTitle}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className={styles.cardTitleLink}
                  >
                    {t(post.title)}
                  </Link>
                </h2>

                <p className={styles.cardDescription}>
                  {t(post.description)}
                </p>

                <div className={styles.cardFooter}>
                  <span className={styles.cardMeta}>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span className={styles.metaDot} aria-hidden="true">
                      &middot;
                    </span>
                    <span>{post.readTime}</span>
                    <span className={styles.metaDot} aria-hidden="true">
                      &middot;
                    </span>
                    <span>{post.author.name}</span>
                  </span>

                  <Link
                    href={`/blog/${post.slug}`}
                    className={styles.readLink}
                  >
                    {t("Read article")} &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

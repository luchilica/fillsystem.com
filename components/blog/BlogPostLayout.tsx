import type { ReactNode } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";
import { LOCALE_META, type Locale } from "@/i18n/locales";
import { Link } from "@/i18n/navigation";
import { getT } from "@/i18n/t";
import { BLOG_POSTS } from "@/components/blog/blogData";
import styles from "./BlogPostLayout.module.css";

interface BlogPostLayoutProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  heroImage?: string;
  heroAlt?: string;
  locale?: string;
  author: {
    name: string;
    title: string;
    linkedin?: string;
  };
  children: ReactNode;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={direction === "right" ? styles.arrowRight : undefined}
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function ArticleJsonLd({
  slug,
  title,
  description,
  date,
  author,
  heroImage,
  locale,
}: {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: { name: string; title: string; linkedin?: string };
  heroImage?: string;
  locale?: string;
}) {
  const loc = (locale ?? "en-US") as Locale;
  const prefix = LOCALE_META[loc]?.prefix ?? "";
  const lang = LOCALE_META[loc]?.htmlLang ?? "en-US";
  const articleUrl = `${siteConfig.url}${prefix}/blog/${slug}`;
  const home = siteConfig.url;

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  const isRoleAsName = author.title === "Fill System" || author.title === siteConfig.name;
  const authorJobTitle = isRoleAsName ? `${author.name} at ${siteConfig.name}` : author.title;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${home}#organization`,
        name: siteConfig.name,
        url: home,
      },
      {
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        url: articleUrl,
        mainEntityOfPage: { "@id": articleUrl },
        headline: title,
        description,
        datePublished: date,
        dateModified: post?.dateModified ?? date,
        inLanguage: lang,
        ...(heroImage ? { image: `${siteConfig.url}${heroImage}` } : {}),
        author: {
          "@type": "Person",
          ...(author.name === "Igor Saevets" ? { "@id": `${home}#igor-saevets` } : {}),
          name: author.name,
          jobTitle: authorJobTitle,
          ...(author.linkedin ? { sameAs: [author.linkedin] } : {}),
        },
        publisher: { "@id": `${home}#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function BlogPostLayout({
  slug,
  title,
  description,
  date,
  readTime,
  heroImage,
  heroAlt,
  author,
  locale,
  children,
}: BlogPostLayoutProps) {
  const t = await getT();
  const displayDate = new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const postIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const currentPost = postIndex >= 0 ? BLOG_POSTS[postIndex] : null;
  const prevPost =
    postIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[postIndex + 1] : null;
  const nextPost = postIndex > 0 ? BLOG_POSTS[postIndex - 1] : null;

  return (
    <>
      <ArticleJsonLd
        slug={slug}
        title={title}
        description={description}
        date={date}
        author={author}
        heroImage={heroImage}
        locale={locale}
      />

      <article>
        <section className="section">
          <div className="container">
            <div className={styles.articleWrap}>
              <Link href="/blog" className={styles.backLink}>
                <ArrowIcon direction="left" />
                {t("Back to Blog")}
              </Link>

              {heroImage && (
                <div className={styles.heroImageWrap}>
                  <Image
                    src={heroImage}
                    alt={heroAlt || ""}
                    width={1200}
                    height={630}
                    className={styles.heroImage}
                    priority
                  />
                </div>
              )}

              <header className={styles.header}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.meta}>
                  <span className={styles.authorInitial} aria-hidden="true">
                    {initials(author.name)}
                  </span>
                  <div className={styles.metaText}>
                    <span className={styles.authorName}>
                      {author.linkedin ? (
                        <a
                          href={author.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.authorNameLink}
                        >
                          {author.name}
                          <LinkedInIcon />
                        </a>
                      ) : (
                        author.name
                      )}
                    </span>
                    <div className={styles.metaDetails}>
                      <time dateTime={date}>{displayDate}</time>
                      <span className={styles.metaDot} aria-hidden="true">
                        &middot;
                      </span>
                      <span>{readTime}</span>
                    </div>
                  </div>
                </div>
              </header>

              <hr className={styles.divider} />

              <div className={styles.body}>{children}</div>

              {(prevPost || nextPost) && (
                <nav
                  className={styles.pagination}
                  aria-label={t("Article navigation")}
                >
                  {prevPost ? (
                    <Link
                      href={`/blog/${prevPost.slug}`}
                      className={styles.paginationLink}
                    >
                      <span className={styles.paginationLabel}>
                        <ArrowIcon direction="left" /> {t("Previous")}
                      </span>
                      <span className={styles.paginationTitle}>
                        {t(prevPost.title)}
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {nextPost ? (
                    <Link
                      href={`/blog/${nextPost.slug}`}
                      className={`${styles.paginationLink} ${styles.paginationNext}`}
                    >
                      <span className={styles.paginationLabel}>
                        {t("Next")} <ArrowIcon direction="right" />
                      </span>
                      <span className={styles.paginationTitle}>
                        {t(nextPost.title)}
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}
                </nav>
              )}

              <aside className={styles.authorBox}>
                <span className={styles.authorBoxInitial} aria-hidden="true">
                  {initials(author.name)}
                </span>
                <div className={styles.authorBoxContent}>
                  <h3>{author.name}</h3>
                  <p className={styles.authorBoxRole}>{author.title}</p>
                  {author.linkedin && (
                    <a
                      href={author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.authorBoxLink}
                    >
                      <LinkedInIcon size={14} />
                      {t("Connect on LinkedIn")}
                    </a>
                  )}
                </div>
              </aside>

              <div className={styles.cta}>
                <h2>{t(currentPost?.ctaHeading ?? "Need help with this?")}</h2>
                <p className={styles.ctaText}>
                  {t(
                    "Request a free diagnostic and get a clear picture of what to fix first - no commitment, no sales pitch."
                  )}
                </p>
                <div className={styles.ctaActions}>
                  <Button
                    href="/#diagnostic-request-form"
                    variant="primary"
                    icon
                  >
                    {t("Request a Free Diagnostic")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}

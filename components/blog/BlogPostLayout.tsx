import type { ReactNode } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { siteConfig } from "@/lib/site-config";
import { Link } from "@/i18n/navigation";
import styles from "./BlogPostLayout.module.css";

interface BlogPostLayoutProps {
  title: string;
  description: string;
  date: string;
  readTime: string;
  heroImage?: string;
  heroAlt?: string;
  author: {
    name: string;
    title: string;
    linkedin?: string;
  };
  children: ReactNode;
}

/** Extract initials from a full name, e.g. "Igor Saevets" -> "IS". */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/** Format an ISO date string to a human-readable form, e.g. "Jul 27, 2026". */
function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** LinkedIn icon — inline SVG to avoid external deps. */
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

/** Article structured data (JSON-LD). */
function ArticleJsonLd({
  title,
  description,
  date,
  author,
}: {
  title: string;
  description: string;
  date: string;
  author: { name: string; title: string; linkedin?: string };
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.title,
      ...(author.linkedin ? { sameAs: [author.linkedin] } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function BlogPostLayout({
  title,
  description,
  date,
  readTime,
  heroImage,
  heroAlt,
  author,
  children,
}: BlogPostLayoutProps) {
  const displayDate = formatDate(date);

  return (
    <>
      {/* Breadcrumb JSON-LD (3-level: Home > Blog > Article) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: siteConfig.name,
                item: siteConfig.url,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: `${siteConfig.url}/blog`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: title,
              },
            ],
          }),
        }}
      />

      <ArticleJsonLd
        title={title}
        description={description}
        date={date}
        author={author}
      />

      <article>
        <section className="section">
          <div className="container">
            {/* Back to blog */}
            <Link href="/blog" className={styles.backLink}>
              &larr; Back to Blog
            </Link>

            {/* Hero image */}
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

            {/* Article header */}
            <header className={styles.header}>
              <h1 className={styles.title}>{title}</h1>

              <div className={styles.meta}>
                <time dateTime={date}>{displayDate}</time>
                <span className={styles.metaDot} aria-hidden="true">
                  &middot;
                </span>
                <span>{readTime}</span>
              </div>

              <div className={styles.byline}>
                <span className={styles.authorInitial} aria-hidden="true">
                  {initials(author.name)}
                </span>
                <div className={styles.authorMeta}>
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
                  <span className={styles.authorTitle}>{author.title}</span>
                </div>
              </div>
            </header>

            {/* Article body */}
            <div className={styles.body}>{children}</div>

            {/* Author bio box */}
            <aside className={styles.authorBox}>
              <span className={styles.authorBoxInitial} aria-hidden="true">
                {initials(author.name)}
              </span>
              <div className={styles.authorBoxContent}>
                <h3>{author.name}</h3>
                <p className={styles.authorBoxRole}>{author.title}</p>
                <p className={styles.authorBoxBio}>
                  {author.name} leads diagnostic methodology and operating model
                  design at {siteConfig.name}. With 10+ companies founded across
                  the US and Europe, he brings a systems-level perspective to
                  every engagement.
                </p>
                {author.linkedin && (
                  <a
                    href={author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.authorBoxLink}
                  >
                    <LinkedInIcon size={14} />
                    Connect on LinkedIn
                  </a>
                )}
              </div>
            </aside>

            {/* Bottom CTA */}
            <div className={styles.cta}>
              <h2>Need help with this?</h2>
              <p className={styles.ctaText}>
                Request a free diagnostic and get a clear picture of what to fix
                first - no commitment, no sales pitch.
              </p>
              <div className={styles.ctaActions}>
                <Button href="/#diagnostic-request-form" variant="primary" icon>
                  Request a Free Diagnostic
                </Button>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}

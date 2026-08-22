import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor } from "@/lib/i18n";
import { getT } from "@/i18n/t";
import { Link } from "@/i18n/navigation";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { BLOG_POSTS } from "@/components/blog/blogData";

const post = BLOG_POSTS.find((p) => p.slug === "revops-for-small-teams")!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = await getT();
  const title = t(post.seoTitle ?? post.title);
  const description = t(post.metaDescription ?? post.description);
  return {
    title,
    description,
    alternates: alternatesFor(loc, `/blog/${post.slug}`),
    robots: robotsFor(loc),
    openGraph: {
      type: "article",
      title: `${title} | Fill System`,
      description,
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author.name],
      images: post.heroImage
        ? [{ url: post.heroImage, width: 1200, height: 630, alt: t(post.heroAlt ?? post.title) }]
        : [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

export default async function RevOpsForSmallTeams({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getT();

  return (
    <>
      <BreadcrumbJsonLd title={t(post.seoTitle ?? post.title)} path={`/blog/${post.slug}`} parent={{ title: "Blog", path: "/blog" }} locale={locale as Locale} />
    <BlogPostLayout
      slug={post.slug}
      locale={locale}
      title={t(post.title)}
      description={t(post.description)}
      date={post.date}
      readTime={post.readTime}
      author={post.author}
      heroImage={post.heroImage}
      heroAlt={post.heroAlt}
    >
      {/* -- Intro ------------------------------------------------- */}
      <p>
        {t(
          "If you run a B2B company with around 50 people, you have probably heard the term \"RevOps\" and wondered whether it applies to you. The short answer: yes, but not in the way most content on the internet describes it. You do not need a VP of Revenue Operations. You do not need a dedicated RevOps team. You do not need a six-figure tech stack overhaul. What you need is clarity on three things: where your revenue data lives, how leads move from marketing to sales, and who is responsible for keeping your CRM accurate."
        )}
      </p>
      <p>
        {t(
          "RevOps at a 50-person company is not a department. It is a practice. It is the discipline of making sure that the people who generate leads, the people who close deals, and the people who manage accounts are working from the same data, following the same process, and using the same definitions. When that alignment breaks down -- and at 50 people, it is starting to break down -- everything downstream suffers: forecasts, pipeline visibility, handoffs, and ultimately revenue."
        )}
      </p>
      <p>
        {t(
          "This article is a starting point. It covers what RevOps actually means at your scale, the three things to fix first, what you can safely ignore for now, and when it makes sense to bring in outside help."
        )}
      </p>

      {/* -- What RevOps Actually Means at 50 People --------------- */}
      <h2>{t("What RevOps Actually Means at 50 People")}</h2>
      <p>
        {t(
          "At enterprise scale, RevOps is a function -- a team that owns the systems, data, and processes that connect marketing, sales, and customer success. They manage the CRM, build dashboards, define pipeline stages, enforce data standards, and run the tech stack. At 50 people, you do not have that team. You might have one ops person who splits time between marketing ops and sales enablement. You might have a founder who still logs into the CRM to check pipeline. You might have no one explicitly assigned to this work at all."
        )}
      </p>
      <p>
        {t(
          "That does not mean you do not have revenue operations. It means your revenue operations are happening informally, carried by the habits and spreadsheets of individual contributors rather than by a designed system. The VP of Sales tracks deals one way. Marketing measures leads another way. Customer success has its own onboarding tracker that does not connect to either. Everyone has data. No one has the same data."
        )}
      </p>
      <p>
        {t(
          "RevOps at 50 people is the practice of recognizing this fragmentation and fixing the most critical pieces -- not all of it, not all at once, but the pieces that directly affect your ability to forecast revenue, qualify leads consistently, and hand off customers without dropping them. It is not about building a perfect system. It is about building an honest one."
        )}
      </p>
      <p>
        {t(
          "The difference between a company that \"does RevOps\" and one that does not is not headcount or tooling. It is whether someone has sat down and answered three questions: Where is our single source of truth for pipeline numbers? How does a lead get from marketing to sales? Who is responsible for making sure CRM data is clean? If you cannot answer all three clearly, that is where you start."
        )}
      </p>

      {/* -- The 3 Things to Fix First ----------------------------- */}
      <h2>{t("The 3 Things to Fix First")}</h2>
      <p>
        {t(
          "You can read dozens of articles about RevOps maturity models, technology stacks, and organizational design. Most of it is written for companies ten times your size. At 50 people, your RevOps roadmap fits on a sticky note. Fix these three things first, and you will have a foundation that actually supports growth."
        )}
      </p>

      <h3>{t("1. One Source of Truth for Pipeline Numbers")}</h3>
      <p>
        {t(
          "This is the most important thing to get right, and it is usually the most broken. The test is simple: if you ask your CEO, your VP of Sales, and your Head of Marketing \"what is our pipeline worth right now?\" -- do they give the same number? At most 50-person companies, they do not. Sales pulls a number from the CRM. Marketing pulls a number from their automation tool. The CEO has a spreadsheet from last week's board prep that shows something different. Three numbers, three definitions of what counts as \"pipeline,\" and a meeting that devolves into arguing about data instead of strategy."
        )}
      </p>
      <p>
        {t(
          "Fixing this does not require new software. It requires a decision. Pick one system as the source of truth for pipeline data -- usually your CRM -- and make it the only system that matters for revenue reporting. Define what counts as a \"deal\" in your pipeline, what the stages mean, and when a deal is real versus aspirational. Write it down. Make sure everyone who touches pipeline data understands and follows the same definitions. This is not glamorous work, but it is the single most impactful thing you can do for revenue visibility."
        )}
      </p>

      <h3>{t("2. One Clear Handoff Process Between Marketing and Sales")}</h3>
      <p>
        {t(
          "At 50 people, the marketing-to-sales handoff is probably informal. A marketer pings a sales rep on Slack. Someone adds a note to a contact record. A lead sits in a \"new\" status for three days until someone notices. The handoff works when volume is low and everyone sits in the same room. It breaks when you grow, when people work remotely, or when lead volume exceeds what tribal knowledge can handle."
        )}
      </p>
      <p>
        {t(
          "You need a defined process for what happens when a lead becomes \"sales-ready.\" This does not need to be complex. At its simplest: marketing marks a lead as qualified in the CRM (using agreed-upon criteria), the CRM notifies the assigned sales rep, and the sales rep has a defined SLA for follow-up (e.g., first contact within 24 hours). That is it. No elaborate lead scoring model. No AI-powered routing. Just a clear handoff with a clear owner and a clear timeline."
        )}
      </p>
      <p>
        {t(
          "The criteria for \"sales-ready\" should be defined jointly by marketing and sales -- not by marketing alone, and not by sales alone. If marketing defines it without sales input, you get leads that sales ignores because they do not meet their actual qualification bar. If sales defines it without marketing input, you get criteria so narrow that barely any leads qualify. The definition should be a shared agreement, reviewed quarterly, and adjusted based on what is actually converting."
        )}
      </p>

      <h3>{t("3. One Person Who Owns CRM Hygiene")}</h3>
      <p>
        {t(
          "CRM data decays faster than most people realize. Contacts change jobs. Companies merge or rename. Deals stall and no one updates the stage. Custom fields accumulate as one-off additions and never get cleaned up. At a 50-person company, no one's job description says \"maintain CRM data quality.\" So no one does it, and six months later your CRM is a graveyard of stale records, duplicate contacts, and pipeline numbers that no one trusts."
        )}
      </p>
      <p>
        {t(
          "You need one person -- not a team, one person -- who is accountable for CRM hygiene. This person does not need to be a full-time ops hire. It can be an existing team member who takes on the responsibility with a clear mandate and a small weekly time allocation. Their job is to run a weekly data quality check, flag records that need updating, enforce field standards, and be the person everyone goes to when something in the CRM looks wrong."
        )}
      </p>
      <p>
        {t(
          "A weekly 30-minute CRM hygiene review catches more problems than a quarterly \"cleanup project\" ever will. The goal is not perfection. The goal is that when someone pulls a pipeline report, the numbers reflect reality within a reasonable margin. If your CRM data is more than a week old in any material way, your reports are fiction."
        )}
      </p>

      {/* -- What You Can Skip (For Now) --------------------------- */}
      <h2>{t("What You Can Skip (For Now)")}</h2>
      <p>
        {t(
          "One of the biggest traps for small teams is trying to implement enterprise RevOps practices before the fundamentals are in place. If you have not nailed the three basics above, none of the following will help you. In fact, they will actively hurt by consuming time and attention that should go to the foundation."
        )}
      </p>
      <p>
        <strong>{t("Advanced lead scoring.")}</strong>{" "}
        {t(
          "Lead scoring works when you have enough data to build a model and enough volume to validate it. At 50 people with a few hundred leads per month, you do not have the statistical base to make lead scoring meaningful. Your sales team can review leads manually faster than you can build, calibrate, and maintain a scoring model. Skip it until your lead volume makes manual review impossible."
        )}
      </p>
      <p>
        <strong>{t("Multi-touch attribution.")}</strong>{" "}
        {t(
          "Attribution modeling is valuable when you have multiple channels generating significant volume and you need to understand which channels drive the best outcomes. At your scale, you probably have two or three channels that matter, and your team already knows which ones are working. Spend your time improving those channels instead of building an attribution model to confirm what you already know."
        )}
      </p>
      <p>
        <strong>{t("Custom dashboards for every stakeholder.")}</strong>{" "}
        {t(
          "You need one pipeline dashboard that everyone trusts. Not a marketing dashboard, a sales dashboard, a CS dashboard, and an executive dashboard -- each pulling different data and telling different stories. Build one dashboard with one set of numbers. When everyone looks at the same data, alignment happens naturally. Custom views for different roles can come later, after you have a shared foundation."
        )}
      </p>
      <p>
        {t(
          "These capabilities matter. They just do not matter yet. The companies that get RevOps right at scale are the ones that built a clean foundation at 50 people, not the ones that tried to skip ahead to sophistication."
        )}
      </p>

      {/* -- When to Bring in Help --------------------------------- */}
      <h2>{t("When to Bring in Help")}</h2>
      <p>
        {t(
          "Most 50-person companies can handle the three fundamentals internally -- if they have someone with the time, authority, and willingness to do the work. But there are situations where outside help makes the difference between actually fixing the problem and just talking about it for another quarter."
        )}
      </p>
      <p>
        {t(
          "The clearest signal is repetition. If you have tried to fix your pipeline definitions and they keep drifting back to ambiguity, or you have attempted a CRM cleanup that reverted within two months, or you have defined a handoff process that no one follows -- the problem is not effort. It is usually a combination of competing priorities (everyone agrees it matters, but no one has time) and a lack of outside perspective (the team is too close to the system to see what is broken)."
        )}
      </p>
      <p>
        {t(
          "An external advisor brings two things your team does not have: dedicated focus and pattern recognition from working across multiple companies. They have seen what \"good\" looks like at your stage. They know which fixes stick and which ones require ongoing enforcement. And they can make recommendations without the internal politics that make it hard for a team member to say \"this process is broken and here is why.\""
        )}
      </p>
      <p>
        <Link href="/services/revops-crm-consulting">
          {t("Our RevOps and CRM consulting engagements")}
        </Link>{" "}
        {t(
          "are designed for exactly this situation -- B2B teams that know something is broken but need a structured approach to fix it. We start with a diagnostic, not a pitch. If the fix is something your team can handle internally, we will tell you that."
        )}
      </p>
      <p>
        {t(
          "RevOps at 50 people is not complicated. It is just easy to deprioritize in favor of things that feel more urgent. But the companies that take the time to get the fundamentals right -- one source of truth, one handoff process, one person who owns data quality -- are the ones that scale without the revenue operations chaos that makes growth painful. Start small. Start now. Fix the three things that matter most, and build from there."
        )}
      </p>
      <p>
        <strong>
          <Link href="/#diagnostic-request-form">
            {t("Request a free diagnostic")}
          </Link>
        </strong>
      </p>
    </BlogPostLayout>
    </>
  );
}

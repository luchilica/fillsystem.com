import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor } from "@/lib/i18n";
import { getT } from "@/i18n/t";
import { Link } from "@/i18n/navigation";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { BLOG_POSTS } from "@/components/blog/blogData";

const post = BLOG_POSTS.find((p) => p.slug === "process-debt-growing-b2b")!;

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
      modifiedTime: post.dateModified || post.date,
      authors: [post.author.name],
      tags: [post.category],
      images: post.heroImage
        ? [{ url: post.heroImage, width: 1200, height: 630, alt: t(post.heroAlt ?? post.title) }]
        : [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

export default async function ProcessDebtGrowingB2B({
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
          "Every B2B company that grows past 50 employees hits a wall that has nothing to do with product, market, or talent. The wall is operational. Processes that worked when 12 people sat in one room stop working when 60 people are spread across three teams, two time zones, and a dozen tools. The symptoms are familiar: approvals that take a week, tasks that fall between departments, the same data entered three times by three people who each think the other two are wrong."
        )}
      </p>
      <p>
        {t(
          "This is process debt. Like technical debt, it accumulates invisibly. Nobody creates it on purpose. It is the natural byproduct of a company that scaled its headcount faster than its operating model. And like technical debt, the interest compounds: every undocumented handoff, every unclear ownership boundary, every duplicated workflow costs a little more each month until the total drag on execution becomes impossible to ignore."
        )}
      </p>
      <p>
        {t(
          "The dangerous thing about process debt is that it looks like other problems. Slow execution looks like a hiring problem. Missed deadlines look like a project management problem. Cross-team friction looks like a culture problem. In most of the B2B companies we diagnose, these symptoms trace back to the same root cause: the company outgrew its processes and never rebuilt them."
        )}
      </p>

      {/* -- What Is Process Debt? -------------------------------- */}
      <h2>{t("What is process debt?")}</h2>
      <p>
        {t(
          "Process debt is the gap between how work actually flows through your organization and how it needs to flow for your current size, structure, and complexity. It is not the absence of process. It is the accumulation of workarounds, undocumented decisions, and inherited habits that made sense at a previous stage of growth but now create friction at the current one."
        )}
      </p>
      <p>
        {t(
          "At 15 people, you do not need a documented approval process because the CEO is in the room and decisions happen in real time. At 60 people, you have three layers of management, and \"just ask Maria\" is no longer a process. Maria is in four meetings. The person who needs approval does not know which Maria. And the decision sits in someone's Slack queue for three days."
        )}
      </p>
      <p>
        {t(
          "Process debt shows up in three forms. First, undocumented processes: work gets done, but nobody has written down how, so every new hire reinvents the wheel and every handoff is a negotiation. Second, duplicated processes: two teams solve the same problem independently because neither knows the other exists, or because the handoff between them is so broken that it is faster to do the work twice. Third, orphaned processes: workflows that were designed for a previous org structure, a previous tool, or a previous strategy, and are still running on autopilot because nobody remembers why they exist."
        )}
      </p>

      {/* -- The 50-Person Threshold ------------------------------ */}
      <h2>{t("Why 50 employees is the breaking point")}</h2>
      <p>
        {t(
          "The 50-person threshold is not arbitrary. It is the point where three things happen simultaneously. First, the company adds its second management layer: team leads who were individual contributors six months ago are now coordinating work across people, and they are making process decisions without a shared framework. Second, the number of cross-team dependencies outgrows the ability to manage them informally. Two teams can coordinate over lunch. Five teams cannot. Third, institutional knowledge starts to concentrate: the original employees carry context that newer hires do not have, and that context gap shows up as errors, delays, and repeated mistakes."
        )}
      </p>
      <p>
        {t(
          "The math is straightforward. In a team of 10, there are 45 possible communication paths. At 50, there are 1,225. At 100, there are 4,950. You cannot manage that many connections through hallway conversations and tribal knowledge. You need structure. Not bureaucracy. Structure: documented workflows, clear ownership, defined handoff points, and agreed rules for how decisions get made when the decision-maker is not in the room."
        )}
      </p>
      <p>
        {t(
          "Companies that cross the 50-person line without restructuring their processes do not slow down all at once. They slow down incrementally. Each new hire adds a little more friction. Each new team creates a few more coordination gaps. The effect is cumulative, and by the time leadership notices, the company is operating at 60-70% of its potential throughput without anyone being able to point to a single cause."
        )}
      </p>

      {/* -- 6 Symptoms ------------------------------------------- */}
      <h2>{t("6 symptoms of process debt in a growing B2B company")}</h2>

      <h3>{t("1. The Same Question Gets Answered Three Different Ways")}</h3>
      <p>
        {t(
          "Ask three people how a client onboarding works and you get three different answers. Not because they are wrong, but because each of them learned from a different person at a different time. The process mutated as it was passed down, and now three parallel versions coexist. This is process fragmentation, and it is the earliest visible symptom of process debt."
        )}
      </p>
      <p>
        {t(
          "The cost is not just confusion. It is inconsistent client experience, unpredictable delivery timelines, and an inability to identify where things break because there is no shared baseline to compare against."
        )}
      </p>

      <h3>{t("2. Approvals Take Longer Than the Work Itself")}</h3>
      <p>
        {t(
          "A proposal takes two hours to write and five days to approve. A new vendor takes a week to evaluate and three weeks to get through procurement. A scope change that affects two teams requires six meetings to align. If your approval processes consistently take longer than the work they gate, the process is not protecting quality. It is protecting itself."
        )}
      </p>
      <p>
        {t(
          "In most cases, the approval chain reflects a previous risk posture that no one has revisited. The CEO approved every expense when there were 20 people. The company now has 80 people and the CEO still approves every expense over $500. The bottleneck is not malicious. It is inherited."
        )}
      </p>

      <h3>{t("3. New Hires Take 3-6 Months to Become Productive")}</h3>
      <p>
        {t(
          "Extended ramp time is a direct proxy for process documentation quality. If your new hires need three months of shadowing to figure out how things work, it is because the knowledge lives in people's heads, not in the system. They are not slow learners. They are navigating an undocumented maze."
        )}
      </p>
      <p>
        {t(
          "Measure it: track time-to-first-independent-deliverable for every role. If the number is trending up as you grow, you have a documentation deficit that compounds with every hire."
        )}
      </p>

      <h3>{t("4. Cross-Team Projects Require a Dedicated Coordinator")}</h3>
      <p>
        {t(
          "When every project that spans two or more teams requires a project manager to manually chase updates, schedule syncs, and resolve ambiguities, the issue is not a lack of project managers. The issue is that the interfaces between your teams are undefined. Nobody knows what Team A is supposed to deliver to Team B, in what format, by when, and what happens when it is late or incomplete."
        )}
      </p>
      <p>
        {t(
          "Well-designed processes make cross-team coordination automatic. If coordination requires a full-time human mediator, the handoff rules either do not exist or are so unclear that everyone defaults to meetings."
        )}
      </p>

      <h3>{t("5. The Company Runs Differently When One Person Is Absent")}</h3>
      <p>
        {t(
          "If operations degrade noticeably when a specific individual is on vacation, sick, or in a full-day offsite, that individual is a single point of failure. This is not a testament to their importance. It is a structural risk. Their knowledge, their decision-making authority, or their informal coordination role has not been distributed or documented."
        )}
      </p>
      <p>
        {t(
          "Test this: identify the five people whose absence would cause the most disruption. For each, ask: could someone else perform their role for two weeks with no preparation? If the answer is no, you have five undocumented, person-dependent processes that are one resignation away from breaking."
        )}
      </p>

      <h3>{t("6. Every Process Discussion Starts With \"It Depends\"")}</h3>
      <p>
        {t(
          "\"How do we handle escalations?\" It depends. \"What is the pricing approval workflow?\" It depends. \"Who decides whether we take on a new client?\" It depends on who you ask. When every process question is answered contextually rather than structurally, there is no process. There is a collection of judgment calls that happen to produce consistent results only because the same people have been making them for years."
        )}
      </p>
      <p>
        {t(
          "This works until those people leave. Or until the volume of decisions exceeds their bandwidth. Or until a new hire, applying their own judgment, makes a decision that contradicts the unwritten rules and nobody catches it until the client calls."
        )}
      </p>

      {/* -- Root Causes ------------------------------------------- */}
      <h2>{t("Root causes: why process debt accumulates")}</h2>
      <p>
        {t(
          "Understanding why process debt forms is the only way to prevent it from re-accumulating after you fix it. There are three structural drivers."
        )}
      </p>
      <p>
        <strong>{t("Speed over structure.")}</strong>{" "}
        {t(
          "In early-stage companies, moving fast is a survival advantage. Documenting processes feels like bureaucracy. But there is a difference between moving fast and moving without a record. The companies that scale well are the ones that document as they go, not the ones that retroactively try to reverse-engineer their processes after they break."
        )}
      </p>
      <p>
        <strong>{t("Org changes without process changes.")}</strong>{" "}
        {t(
          "Every reorg, every new team, every management hire changes the flow of work. But most companies update the org chart without updating the operating model. The new VP of Customer Success arrives, draws new reporting lines, and nobody rewrites the handoff between sales and CS. The old process assumed a flat structure. The new org has a hierarchy. The handoff is now mismatched, and deals fall through the gap."
        )}
      </p>
      <p>
        <strong>{t("Tool adoption without process redesign.")}</strong>{" "}
        {t(
          "Buying a project management tool does not fix a broken process. It digitizes it. If the approval workflow is unclear in person, moving it to Asana does not make it clearer. It makes it unclear in Asana. Most tool-first implementations fail not because the tool is wrong but because the process it automates was never designed correctly in the first place."
        )}
      </p>

      {/* -- What to Do ------------------------------------------- */}
      <h2>{t("How to diagnose and fix process debt")}</h2>
      <p>
        {t(
          "Process debt is fixable. It requires three things: a map of how work actually flows (not how it is supposed to flow), a prioritization of which gaps cost the most, and a decision about what to formalize versus what to leave flexible."
        )}
      </p>
      <p>
        <strong>{t("Step 1: Map the real process.")}</strong>{" "}
        {t(
          "Walk through your three or four most critical workflows end-to-end, with the people who actually do the work. Not the managers, not the tool owners, the practitioners. Ask them: where does the work start, who touches it, what decisions get made, where does it get stuck, and where does it end. You will discover steps that nobody planned, workarounds that have become permanent, and handoffs that exist in theory but not in practice."
        )}
      </p>
      <p>
        <strong>{t("Step 2: Score by impact and effort.")}</strong>{" "}
        {t(
          "Not every process gap deserves a fix. Some are minor friction that your team has learned to work around. Others cost real money, real time, or real quality. Score each gap by impact (revenue, client experience, employee time) and effort (how hard is it to fix). Fix the high-impact, low-effort gaps first. They build momentum and demonstrate that process improvement produces results, not just meetings."
        )}
      </p>
      <p>
        <strong>{t("Step 3: Document, assign, review.")}</strong>{" "}
        {t(
          "For each process you formalize, assign an owner. Not a committee. A person. That person is responsible for keeping the documentation current, enforcing the process, and proposing changes when the business outgrows it. Schedule a quarterly review. Process documentation that is never reviewed becomes stale within six months and misleading within a year."
        )}
      </p>

      {/* -- Service Cross-Links ---------------------------------- */}
      <h2>{t("When to bring in outside help")}</h2>
      <p>
        {t(
          "Internal process audits work when the team has the time, the objectivity, and the cross-functional perspective to do them well. In practice, the people who know the processes best are the least objective about their quality, and the people with the authority to change them are the least available to map them."
        )}
      </p>
      <p>
        {t(
          "If your team is spending more time coordinating work than doing it, if new hires are taking months to ramp, or if cross-team projects routinely stall at handoff points, a structured external diagnostic can cut through the noise. It identifies what is actually broken, quantifies the cost, and delivers a priority-ranked fix list that your team can execute."
        )}
      </p>
      <p>
        {t("Our")}{" "}
        <Link href="/services/process-operations">
          {t("Process & Operations consulting")}
        </Link>{" "}
        {t(
          "starts with exactly this kind of diagnostic. We map your real workflows, identify ownership gaps and bottleneck points, and deliver an operating model your team can follow. For teams that need a quicker validation,"
        )}{" "}
        <Link href="/services/business-diagnostic">
          {t("the free primary diagnostic")}
        </Link>{" "}
        {t(
          "frames the problem in 30-45 minutes and tells you whether a deeper engagement is warranted."
        )}
      </p>
      <p>
        {t(
          "Process debt does not fix itself. But the fix does not have to be a six-month transformation program either. Start with a map. Identify the three most expensive gaps. Fix them. Then move to the next three."
        )}
      </p>
      <p>
        <strong>
          <Link href="/#diagnostic-request-form">
            {t("Request a free diagnostic")}
          </Link>
        </strong>{" "}
        {t(
          "and find out where your operating model is costing you the most."
        )}
      </p>
    </BlogPostLayout>
    </>
  );
}

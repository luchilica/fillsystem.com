import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getT } from "@/i18n/t";
import type { Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor } from "@/lib/i18n";
import { BLOG_POSTS } from "@/components/blog/blogData";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { Link } from "@/i18n/navigation";

const post = BLOG_POSTS.find(
  (p) => p.slug === "crm-pipeline-leaking-revenue"
)!;

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
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

export default async function CrmPipelineLeakingRevenuePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getT();

  return (
    <>
      <BreadcrumbJsonLd title={t(post.seoTitle ?? post.title)} path={`/blog/${post.slug}`} parent={{ title: "Blog", path: "/blog" }} />
    <BlogPostLayout
      slug={post.slug}
      title={t(post.title)}
      description={t(post.description)}
      date={post.date}
      readTime={post.readTime}
      author={post.author}
      heroImage={post.heroImage}
      heroAlt={post.heroAlt}
    >
      {/* ----- Intro ----- */}
      <p>
        Pipeline leakage is one of those problems that stays invisible until
        someone finally measures it. You can have strong reps, a good product,
        and a healthy top-of-funnel - and still watch revenue targets slip
        quarter after quarter.
      </p>
      <p>
        When that happens, the first instinct is to blame sales performance.
        Fire the bottom 10%. Hire a new VP. Rewrite the pitch deck. But in
        most of the B2B teams we audit, the real problem is structural:
        handoffs that nobody owns, data gaps that make forecasting fiction,
        automation holes that let leads decay before anyone touches them.
      </p>
      <p>
        Pipeline leakage is the revenue that exists in your CRM but never
        converts - not because the deals were unwinnable, but because
        your system failed to move them forward. It is the difference between
        a sales problem and a systems problem. And it is almost always
        fixable once you know where to look.
      </p>
      <p>
        Here are the seven patterns we find in nearly every RevOps audit we
        run. If you recognize three or more, your pipeline has a structural
        leak.
      </p>

      <hr />

      {/* ----- What Pipeline Leakage Actually Means ----- */}
      <h2>{t("What Pipeline Leakage Actually Means")}</h2>
      <p>
        Before we get into the signs, let&rsquo;s define what we&rsquo;re
        actually talking about. Pipeline leakage is not the same as a low win
        rate. A low win rate means you are losing deals you compete for.
        Pipeline leakage means deals that <strong>should</strong> convert
        never get the chance to compete at all.
      </p>
      <p>
        It shows up in three forms:
      </p>
      <ul>
        <li>
          <strong>Deals that stall and die quietly.</strong> They were real
          opportunities with budget and intent, but the process failed them.
          A handoff was missed. A follow-up never happened. The deal sat in a
          stage for six weeks and nobody noticed until the prospect went cold.
        </li>
        <li>
          <strong>Revenue that lives in the pipeline but never closes.</strong>{" "}
          The forecast says $2M. Leadership plans on $2M. But $600K of that
          is zombie pipeline - deals with no activity in 45+ days, stale
          close dates pushed forward three times, or contacts who stopped
          responding weeks ago.
        </li>
        <li>
          <strong>Leads that enter the system and disappear.</strong> Marketing
          delivers MQLs. Sales says they never saw them. The leads exist in
          the CRM, technically, but nobody picked them up, nobody qualified
          them, and nobody followed through.
        </li>
      </ul>
      <p>
        The core question is simple: <strong>is your pipeline accurate, and
        is your process moving deals through it efficiently?</strong> If the
        answer to either is no, you are leaking revenue.
      </p>

      <hr />

      {/* ----- Sign 1 ----- */}
      <h2>{t("1. Leads Sit in \"New\" Stage for More Than 48 Hours")}</h2>
      <p>
        Pull a report on the average time a lead spends in your first
        pipeline stage - the one labeled &ldquo;New&rdquo; or
        &ldquo;Incoming&rdquo; or whatever you call it. If the median is
        above 48 hours, you have a pickup problem.
      </p>
      <p>
        This is one of the most common leaks we find. Leads arrive from the
        website, from events, from outbound sequences - and they sit.
        Nobody picks them up because there are no assignment rules. There is
        no SLA. There is no alert. The lead decays in silence.
      </p>
      <p>
        Research on B2B response times is consistent: the probability of
        qualifying a lead drops dramatically after the first hour. By the
        time your rep gets around to it 72 hours later, the prospect has
        already talked to your competitor, lost interest, or forgotten they
        filled out the form.
      </p>
      <p>
        <strong>What to check:</strong> Run a time-to-first-touch report on
        your last 100 inbound leads. If more than 25% of them waited longer
        than 24 hours for any human contact, your assignment and alerting
        system is broken.
      </p>
      <p>
        <strong>Fix direction:</strong> Implement round-robin lead assignment
        with a fallback rule (if the assigned rep doesn&rsquo;t touch it
        within 4 hours, it escalates or reassigns). Add SLA alerting in
        Slack or email. Make first-touch time a visible metric on your team
        dashboard.
      </p>

      {/* ----- Sign 2 ----- */}
      <h2>{t("2. Your Team Uses a Spreadsheet Alongside the CRM")}</h2>
      <p>
        Ask your reps a simple question: &ldquo;Where do you actually track
        your deals?&rdquo; If the answer involves Excel, Google Sheets, a
        Notion board, or a sticky-note system, your CRM has a usability
        problem - and your data has an accuracy problem.
      </p>
      <p>
        Reps don&rsquo;t use spreadsheets because they love spreadsheets.
        They use them because the CRM views don&rsquo;t match how they
        actually sell. Maybe the pipeline stages don&rsquo;t reflect their
        real workflow. Maybe there are 14 required fields on a deal record
        and they need three. Maybe the board view is cluttered with deals
        from other teams and they can&rsquo;t find their own.
      </p>
      <p>
        When reps maintain a parallel tracking system, two things happen.
        First, the CRM data goes stale - deals get updated in the
        spreadsheet but not in the system. Second, management reports based
        on CRM data become fiction. You are making forecast decisions on
        information that is days or weeks behind reality.
      </p>
      <p>
        <strong>What to check:</strong> Look at CRM adoption rate and
        last-login dates for each rep. Check export frequency - if
        multiple reps export their pipeline to CSV every Monday, that is a
        red flag. Ask directly: &ldquo;Do you track anything outside the
        CRM?&rdquo;
      </p>
      <p>
        <strong>Fix direction:</strong> Simplify CRM views ruthlessly. Reduce
        required fields to the minimum that actually drives reporting. Match
        stage definitions to how your reps describe their own sales process
        - not how the VP of Sales imagines it should work. If the CRM
        is harder to use than a spreadsheet, the spreadsheet will always win.
      </p>

      {/* ----- Sign 3 ----- */}
      <h2>{t("3. Marketing and Sales Define \"Qualified\" Differently")}</h2>
      <p>
        Marketing says they delivered 200 MQLs last quarter. Sales says they
        got maybe 40 real leads. The MQL-to-SQL conversion rate is either
        embarrassingly low or hotly disputed depending on who you ask. Sound
        familiar?
      </p>
      <p>
        This is a definition problem, not a performance problem. When
        marketing defines &ldquo;qualified&rdquo; as &ldquo;downloaded a
        whitepaper and has more than 50 employees&rdquo; but sales defines
        &ldquo;qualified&rdquo; as &ldquo;has budget, has a project, and
        wants to talk this quarter,&rdquo; every lead that crosses from
        marketing to sales enters a trust gap. Sales stops trusting the
        leads. Marketing stops trusting the feedback. Both teams build
        workarounds instead of fixing the root cause.
      </p>
      <p>
        The revenue impact is direct. Good leads get deprioritized because
        reps assume all MQLs are low quality. Bad leads get worked because
        nobody set up scoring to separate signal from noise.
      </p>
      <p>
        <strong>What to check:</strong> Ask marketing and sales to
        independently write down what &ldquo;qualified&rdquo; means. Compare
        the two documents. If they don&rsquo;t match - or if no
        document exists at all - that is the root of your conversion
        problem. Also check: do you have a lead scoring model? When was the
        last time it was calibrated?
      </p>
      <p>
        <strong>Fix direction:</strong> Run a joint definition workshop.
        Marketing and sales agree on a single set of qualification criteria,
        written down, with specific observable triggers (not vague intent
        signals). Build or recalibrate a lead scoring model that reflects
        these criteria. Revisit quarterly.
      </p>

      {/* ----- Sign 4 ----- */}
      <h2>{t("4. Deals Stall in the Same Pipeline Stage")}</h2>
      <p>
        Open your pipeline and look at stage distribution. If one stage
        holds a disproportionate number of deals - say, 40% of your
        total pipeline value sits in &ldquo;Proposal Sent&rdquo; or
        &ldquo;Evaluation&rdquo; - you have a bottleneck that is
        silently killing revenue.
      </p>
      <p>
        If more than 15% of your deals have been in the same stage for over
        30 days with no logged activity, those are not active deals. They are
        pipeline decoration. They inflate your forecast, distort your
        conversion metrics, and consume mindshare without producing revenue.
      </p>
      <p>
        The root cause is usually one of three things: the stage is too
        broad (it covers multiple distinct activities), the exit criteria are
        unclear (nobody knows what &ldquo;done&rdquo; means for that stage),
        or the stage requires an action that nobody owns (like legal review
        or technical validation that has no assigned driver).
      </p>
      <p>
        <strong>What to check:</strong> Run a stage duration distribution
        report. Look at the median and 90th percentile time-in-stage for
        each step. Then pull a deal aging report - how many deals have
        been static for more than 21 days? If the aging report shows a
        concentration in one stage, that stage is your bottleneck.
      </p>
      <p>
        <strong>Fix direction:</strong> Split the overloaded stage into two
        or three discrete steps with clear exit criteria. Assign ownership
        for each stage transition. Set up automated alerts when a deal
        exceeds the expected time-in-stage - for example, if your
        median proposal-to-close time is 14 days, flag any deal that hits
        21.
      </p>

      {/* ----- Sign 5 ----- */}
      <h2>{t("5. You Have More Than One Pipeline Doing the Same Job")}</h2>
      <p>
        Go to your CRM settings and count the pipelines. Now ask: how many
        of them are actively used? And how many cover the same deal type?
      </p>
      <p>
        We regularly audit CRMs that have four, five, even eight pipelines
        - half of which are duplicates or near-duplicates created by
        different teams at different times. One was built by the original
        sales team. Another was created when the new manager joined and
        didn&rsquo;t like the old one. A third was an experiment that nobody
        archived. The result is fragmented data: deals of the same type live
        in different pipelines with different stages, different fields, and
        different reporting.
      </p>
      <p>
        When pipeline data is fragmented, forecasting becomes guesswork.
        You cannot get an accurate conversion rate for a deal type when half
        the deals of that type are in Pipeline A and the other half are in
        Pipeline B with completely different stage definitions. You cannot
        compare rep performance when they are working in different systems.
      </p>
      <p>
        <strong>What to check:</strong> List every pipeline in the CRM.
        For each, note the deal type it covers, the number of active deals,
        and who uses it. If two or more pipelines cover the same deal type,
        you have fragmentation.
      </p>
      <p>
        <strong>Fix direction:</strong> Consolidate to one pipeline per deal
        type. Migrate active deals from the duplicate pipelines into the
        canonical one (with field mapping and stage re-assignment). Archive
        the rest. Set a governance rule: new pipelines require ops approval.
      </p>

      {/* ----- Sign 6 ----- */}
      <h2>{t("6. Nobody Trusts the Forecast")}</h2>
      <p>
        Here is the acid test: when leadership needs the revenue forecast
        for next quarter, do they pull it from the CRM - or do they
        ask each rep to email their &ldquo;real&rdquo; numbers?
      </p>
      <p>
        If the CRM forecast is routinely discounted, overridden, or
        supplemented with a separate spreadsheet-based forecast, the CRM has
        a trust problem. And that trust problem has a data root cause.
      </p>
      <p>
        The usual culprits: deal amounts entered inconsistently (some reps
        enter annual contract value, others enter monthly, others enter
        &ldquo;best guess&rdquo;). Close dates pushed forward every month
        without consequence - a deal that was supposed to close in
        March is now set for August, with no notes explaining why. Win
        probability is either not used at all, left at the default, or
        manually overridden based on gut feeling rather than stage-calibrated
        data.
      </p>
      <p>
        The cost is not just inaccurate forecasting. It is the cascade of
        bad decisions that follow: hiring plans based on phantom revenue,
        marketing budgets allocated against pipeline that will never close,
        board projections that miss by 30%.
      </p>
      <p>
        <strong>What to check:</strong> Compare your CRM forecast vs. actual
        closed revenue for the last four quarters. If the variance is
        consistently above 20%, your forecast is unreliable. Then audit the
        data: what percentage of deals have a close date in the past? How
        many deals have been pushed more than twice?
      </p>
      <p>
        <strong>Fix direction:</strong> Enforce deal amount standards (pick
        one: ACV or TCV, and make it mandatory). Build auto-decay logic for
        stale close dates - if a deal&rsquo;s close date passes without
        activity, automatically push it out and flag it. Calibrate win
        probabilities by stage using your historical data, not intuition.
        Make the forecast a living number that the system maintains, not a
        spreadsheet that a manager assembles every Friday.
      </p>

      {/* ----- Sign 7 ----- */}
      <h2>{t("7. Closed-Lost Deals Have No Reason")}</h2>
      <p>
        Pull your closed-lost deals from the last two quarters. What
        percentage have a loss reason attached? And of those that do, how
        many say &ldquo;Other&rdquo; or &ldquo;N/A&rdquo;?
      </p>
      <p>
        If more than 30% of your closed-lost deals have no loss reason
        - or a generic one - you are flying blind on why you
        lose. Every closed-lost deal is a data point. In aggregate, they tell
        you whether you are losing on price, timing, competition, product
        fit, or process. Without that data, you are guessing at strategy.
      </p>
      <p>
        The reason this field stays empty is almost always the same: it is
        not required, or the dropdown has 25 options that nobody reads.
        Reps close the deal, mark it lost, and move on. The field is
        optional, so they skip it. Nobody follows up.
      </p>
      <p>
        <strong>What to check:</strong> Run a report on closed-lost deals
        with a loss reason vs. without. Then look at the quality of the
        reasons themselves. If &ldquo;Other&rdquo; accounts for more than
        20% of your loss reasons, your dropdown is not useful.
      </p>
      <p>
        <strong>Fix direction:</strong> Make loss reason a required field on
        stage change to Closed-Lost. Limit the dropdown to 5&ndash;7
        specific options that reflect your actual loss patterns: Lost to
        Competitor, Budget Cut, Timing / Not Now, Chose to Build In-House,
        No Decision Made, Champion Left, Poor Fit. Do not include
        &ldquo;Other.&rdquo; If &ldquo;Other&rdquo; is an option, it
        becomes the default answer and you learn nothing.
      </p>

      <hr />

      {/* ----- What to Do Next ----- */}
      <h2>{t("What to Do If You Recognized 3 or More Signs")}</h2>
      <p>
        If three or more of these patterns describe your team, you do not
        have a sales problem. You have a systems problem. And the good news
        about systems problems is that they are fixable without replacing
        your people or your CRM.
      </p>
      <p>
        These are not isolated issues. They compound. Leads that sit too
        long feed into a forecast nobody trusts. Spreadsheet workarounds
        mean loss reasons never get captured. Misaligned qualification
        criteria cause deals to stall in stages that are too broad. The
        leaks connect.
      </p>
      <p>
        A structured CRM audit maps all seven areas systematically: lead
        routing, adoption, qualification alignment, stage design, pipeline
        architecture, forecast accuracy, and loss-reason capture. It
        identifies which leaks are costing you the most, in what order to
        fix them, and what the expected impact of each fix is.
      </p>
      <p>
        At Fill System, our{" "}
        <Link href="/services/revops-crm-consulting">
          RevOps &amp; CRM consulting
        </Link>{" "}
        engagements start with exactly this kind of diagnostic. We map your
        pipeline end-to-end, quantify the leakage at each stage, and deliver
        a prioritized fix list - not a 60-page report, but an
        actionable plan you can start executing immediately.
      </p>
      <p>
        If your team is hitting the numbers despite these issues, you are
        leaving margin on the table. If your team is missing the numbers,
        these issues are probably why.
      </p>
      <p>
        <strong>
          <Link href="/#diagnostic-request-form">
            Request a free diagnostic
          </Link>
        </strong>{" "}
        and find out where your pipeline is leaking - and what it is
        costing you per quarter.
      </p>
    </BlogPostLayout>
    </>
  );
}

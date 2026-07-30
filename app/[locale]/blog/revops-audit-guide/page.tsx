import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor } from "@/lib/i18n";
import { getT } from "@/i18n/t";
import { Link } from "@/i18n/navigation";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { BLOG_POSTS } from "@/components/blog/blogData";

const post = BLOG_POSTS.find((p) => p.slug === "revops-audit-guide")!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  return {
    title: post.seoTitle ?? post.title,
    description: post.metaDescription ?? post.description,
    alternates: alternatesFor(loc, `/blog/${post.slug}`),
    robots: robotsFor(loc),
    openGraph: {
      type: "article",
      publishedTime: post.date,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

export default async function RevOpsAuditGuide({
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
      {/* ── Intro ────────────────────────────────────────────── */}
      <p>
        {t(
          "A RevOps audit is a structured review of how your revenue operations actually work -not how they were designed to work, not how your CRM vendor says they should work, but how data, deals, and decisions move through your organization day to day. For B2B teams between 50 and 250 employees, this distinction matters more than you think. You are large enough that tribal knowledge has stopped scaling, but small enough that a dedicated ops team is still a luxury. The cracks show up as dashboards no one trusts, pipeline stages that mean different things to different people, and quarterly forecasts built on gut feel instead of clean data."
        )}
      </p>
      <p>
        {t(
          "There are a few moments when an audit becomes urgent. After a growth spurt -when you have doubled headcount and your CRM config is still built for a team of twelve. Before a CRM migration -because migrating garbage produces expensive garbage in a new system. When your VP of Sales and your Head of Marketing cannot agree on the number of qualified leads last quarter, and both can pull a dashboard that proves their point. Or when a new operations hire arrives, opens the CRM, and the first question they ask is \"who built this and why?\""
        )}
      </p>
      <p>
        {t(
          "This guide walks you through a complete RevOps audit framework. It covers the six areas you need to inspect, gives you a practical checklist you can start using today, and explains what to do with the findings. If you have ever suspected that your revenue operations are held together by a combination of Zapier, spreadsheets, and one person who remembers how things work -this is where you start."
        )}
      </p>

      {/* ── What Is a RevOps Audit? ──────────────────────────── */}
      <h2>{t("What Is a RevOps Audit?")}</h2>
      <p>
        {t(
          "A RevOps audit is a systematic examination of your CRM configuration, pipeline definitions, reporting infrastructure, data integrations, ownership rules, and automation workflows. It looks at how these components interact with each other and whether they collectively produce accurate, actionable information for your revenue team."
        )}
      </p>
      <p>
        {t(
          "This is not the same thing as a \"CRM cleanup.\" A CRM cleanup usually means deduplicating contacts, archiving dead deals, and fixing a few broken fields. That is housekeeping. An audit is an inspection of the entire revenue operations stack: the data model, the process logic, the reporting layer, and the integrations that connect them. A CRM cleanup is mopping the floor. An audit is checking whether the plumbing is connected correctly."
        )}
      </p>
      <p>
        {t(
          "An audit should be led by someone who can look at the system with fresh eyes -ideally an operations person who was not the one who built the current setup, or an external advisor who has audited similar stacks before. The person who configured your CRM three years ago is not the right person to evaluate it objectively. They will defend decisions that made sense at the time but no longer serve the business. You need someone who will ask \"why does this field exist?\" without already knowing the answer."
        )}
      </p>

      {/* ── The 6 Pillars of a RevOps Audit ──────────────────── */}
      <h2>{t("The 6 Pillars of a RevOps Audit")}</h2>
      <p>
        {t(
          "Every RevOps audit should cover six interconnected areas. Skip one and you will end up with a partial picture -fixing pipeline stages while ignoring the data model, or cleaning up automations without checking whether the handoff rules still make sense."
        )}
      </p>

      {/* Pillar 1 */}
      <h3>{t("1. CRM Data Model")}</h3>
      <p>
        {t(
          "Start with the foundation: your objects, fields, and custom properties. The data model is where most CRM debt accumulates. Every new initiative adds fields. Every departing admin leaves behind custom properties that no one remembers creating. Over time, you end up with a system where the schema tells you more about the company's history than its current operations."
        )}
      </p>
      <p>
        {t(
          "If your HubSpot instance has 47 custom contact properties and your sales team actively uses 12 of them, the other 35 are noise. They slow down form creation, confuse new reps, and create ambiguity in reporting. Worse, some of those abandoned fields may still be referenced by workflows or integrations -they are not just clutter, they are potential failure points."
        )}
      </p>
      <p>
        {t(
          "The audit should answer: Which fields are actually populated? Which are referenced by automations or reports? Do sales, marketing, and customer success use the same fields for the same concepts, or does each team have its own \"lead source\" field with its own picklist values? Are there duplicate or near-duplicate properties that capture the same information in slightly different ways?"
        )}
      </p>

      {/* Pillar 2 */}
      <h3>{t("2. Pipeline Stages and Conversion Criteria")}</h3>
      <p>
        {t(
          "Your pipeline stages should represent clear, mutually exclusive phases of a deal lifecycle with defined entry and exit criteria. In practice, most B2B pipelines have at least one \"catch-all\" stage -usually something like \"In Progress\" or \"Nurturing\" -where deals go to stall. These stages are where pipeline accuracy goes to die."
        )}
      </p>
      <p>
        {t(
          "Look at stage-to-stage conversion rates. If 80% of deals that enter your \"Proposal Sent\" stage eventually close, that stage is well-defined -it represents a real commitment threshold. If your \"Qualified\" stage has a 15% conversion rate to the next stage and deals sit there for an average of 90 days, that stage is not a stage. It is a parking lot."
        )}
      </p>
      <p>
        {t(
          "The audit should verify: Are stage definitions documented anywhere? Can a new sales rep read the definition and correctly assign a deal to a stage without asking a colleague? Are there deals that have been in the same stage for more than twice the average cycle time? Do reps skip stages or move deals backward, and if so, is that tracked?"
        )}
      </p>

      {/* Pillar 3 */}
      <h3>{t("3. Reporting and Metric Definitions")}</h3>
      <p>
        {t(
          "Here is a test: ask your Head of Marketing and your VP of Sales to independently define \"MQL.\" If you get two different answers, your reporting infrastructure has a metric definition problem. This is more common than anyone admits. Organizations routinely operate with multiple competing definitions of core metrics -MQL, SQL, pipeline value, win rate, revenue -each embedded in different dashboards, each telling a slightly different story."
        )}
      </p>
      <p>
        {t(
          "The audit should catalog every dashboard and report that informs a business decision. For each one, document: What data source does it pull from? What filters are applied? How are key metrics calculated? Then compare. If your marketing dashboard shows 200 MQLs last month and your sales dashboard shows 140, the gap is not a rounding error -it is a structural disagreement about what counts as qualified."
        )}
      </p>
      <p>
        {t(
          "Pay special attention to revenue metrics. If you ask three people \"what was our revenue last quarter\" and get three different numbers, the problem is not math. It is that \"revenue\" means booked ARR to finance, closed-won deal value to sales, and recognized revenue to the CFO. The audit should map every definition of every metric and flag where they diverge."
        )}
      </p>

      {/* Pillar 4 */}
      <h3>{t("4. Data Sources and Integrations")}</h3>
      <p>
        {t(
          "Most B2B companies between 50 and 250 employees have between 8 and 15 tools that feed data into or pull data from the CRM. Marketing automation, form builders, enrichment tools, billing systems, customer support platforms, analytics -each one has an integration, and each integration is a potential point of failure."
        )}
      </p>
      <p>
        {t(
          "The audit should map every integration: what tool connects, which direction data flows, what triggers the sync, and when someone last verified that it works correctly. That last question is the critical one. Zapier automations and Make scenarios can break silently. An API key expires, a field gets renamed, a picklist value changes -and the integration starts dropping records or writing to the wrong fields without anyone noticing for weeks."
        )}
      </p>
      <p>
        {t(
          "Check for bidirectionality problems. If your enrichment tool updates a contact record in the CRM, and the CRM syncs that change back to your marketing platform, and the marketing platform sends it back to the CRM -you have a sync loop. These create phantom activity, inflate engagement metrics, and make it nearly impossible to determine the true source of a data change."
        )}
      </p>

      {/* Pillar 5 */}
      <h3>{t("5. Handoff and Ownership Rules")}</h3>
      <p>
        {t(
          "A lead enters your system. Marketing nurtures it. At some point, it becomes \"sales-ready\" and gets handed off. Sales works it, closes the deal, and hands the customer to CS for onboarding. That is the theory. In practice, the handoff between marketing and sales is where most B2B leads go to die."
        )}
      </p>
      <p>
        {t(
          "The audit should document the ownership model at every stage of the revenue lifecycle. Who owns a lead before it is qualified? Who owns it during qualification? What happens when a deal is marked closed-lost -does it go back to marketing, sit in a graveyard, or disappear entirely? Is there a documented SLA between marketing and sales that specifies response time for new MQLs? Is there an equivalent SLA between sales and customer success for new customer onboarding?"
        )}
      </p>
      <p>
        {t(
          "Ambiguous ownership is one of the most expensive problems in B2B operations. When no one clearly owns a lead, two things happen: either multiple people work it simultaneously (wasting effort and confusing the prospect) or no one works it at all (and a qualified lead rots in the CRM). The audit should identify every point where ownership is unclear or undocumented."
        )}
      </p>

      {/* Pillar 6 */}
      <h3>{t("6. Automation Rules")}</h3>
      <p>
        {t(
          "Automation is the most dangerous part of any CRM setup. Not because automation is bad -it is essential -but because automations accumulate, interact, and conflict in ways that are nearly impossible to predict without a systematic review."
        )}
      </p>
      <p>
        {t(
          "Start by building an inventory. List every active workflow, sequence, trigger, and automation rule across your entire stack -CRM, marketing automation, support platform, everything. For each one, document: what triggers it, what it does, when it was created, and who created it. You will almost certainly find automations that no one remembers building. These are not harmless relics. They are executing logic that may contradict your current processes."
        )}
      </p>
      <p>
        {t(
          "Look for conflicts. A common example: marketing has an automation that sets lifecycle stage to \"MQL\" when a lead hits a scoring threshold, and sales has a workflow that sets lifecycle stage based on deal creation. If both fire on the same record, the result depends on timing -and timing-dependent data is unreliable data. The audit should map every automation that writes to the same fields and flag potential conflicts."
        )}
      </p>
      <p>
        {t(
          "Finally, check the last review date. If the answer is \"never\" or \"we are not sure,\" that is a finding in itself. Automations should be reviewed at least quarterly, and any automation that touches pipeline data, lead routing, or lifecycle stage assignment should be reviewed after every significant process change."
        )}
      </p>

      {/* ── RevOps Audit Checklist ───────────────────────────── */}
      <h2>{t("RevOps Audit Checklist")}</h2>
      <p>
        {t(
          "Use this checklist as a starting point for your own audit. Each item should have a clear owner, a due date, and a documented finding."
        )}
      </p>

      <ol>
        <li>
          <strong>{t("CRM Data Model")}</strong>
          <ul>
            <li>{t("List all custom objects and custom properties")}</li>
            <li>{t("Identify fields with less than 10% fill rate")}</li>
            <li>{t("Flag duplicate or near-duplicate properties")}</li>
            <li>{t("Verify that picklist values are current and standardized")}</li>
            <li>{t("Confirm that sales, marketing, and CS share field definitions")}</li>
          </ul>
        </li>
        <li>
          <strong>{t("Pipeline Configuration")}</strong>
          <ul>
            <li>{t("Document entry and exit criteria for every stage")}</li>
            <li>{t("Calculate stage-to-stage conversion rates")}</li>
            <li>{t("Identify stages where average dwell time exceeds 2x the overall cycle")}</li>
            <li>{t("Check for deals stuck in a single stage for more than 90 days")}</li>
            <li>{t("Verify that stage skip and backward movement is tracked")}</li>
          </ul>
        </li>
        <li>
          <strong>{t("Reporting and Metrics")}</strong>
          <ul>
            <li>{t("Catalog all active dashboards and recurring reports")}</li>
            <li>{t("Document the calculation method for MQL, SQL, pipeline value, win rate, and revenue")}</li>
            <li>{t("Compare metric definitions across teams for inconsistencies")}</li>
            <li>{t("Verify that all dashboards pull from the same data sources")}</li>
            <li>{t("Identify reports that no one uses but are still running")}</li>
          </ul>
        </li>
        <li>
          <strong>{t("Integrations and Data Flow")}</strong>
          <ul>
            <li>{t("Map every tool that reads from or writes to the CRM")}</li>
            <li>{t("Document the direction, trigger, and frequency of each integration")}</li>
            <li>{t("Test each integration to confirm it is still functioning")}</li>
            <li>{t("Check for sync loops or bidirectional conflicts")}</li>
            <li>{t("Verify API key expiration dates and error handling")}</li>
          </ul>
        </li>
        <li>
          <strong>{t("Handoffs and Ownership")}</strong>
          <ul>
            <li>{t("Document who owns a lead or account at each lifecycle stage")}</li>
            <li>{t("Verify that marketing-to-sales SLA exists and is enforced")}</li>
            <li>{t("Verify that sales-to-CS handoff process is documented")}</li>
            <li>{t("Identify leads or accounts with no clear owner")}</li>
            <li>{t("Check that closed-lost leads have a defined re-engagement path")}</li>
          </ul>
        </li>
        <li>
          <strong>{t("Automations")}</strong>
          <ul>
            <li>{t("Inventory all active workflows, sequences, and triggers")}</li>
            <li>{t("Identify automations with unknown or departed creators")}</li>
            <li>{t("Flag automations that write to the same fields")}</li>
            <li>{t("Check for automations that have not been reviewed in 6+ months")}</li>
            <li>{t("Test critical automations end-to-end with a sample record")}</li>
          </ul>
        </li>
      </ol>

      {/* ── Common Findings ──────────────────────────────────── */}
      <h2>{t("Common Findings: What Every Audit Uncovers")}</h2>
      <p>
        {t(
          "After running audits across dozens of B2B revenue stacks, certain patterns appear so consistently that you should expect to find them. If your audit does not surface at least three of these, you probably did not look hard enough."
        )}
      </p>
      <p>
        <strong>{t("Inconsistent metric definitions.")}</strong>{" "}
        {t(
          "Marketing and sales define the same metric differently. \"Pipeline value\" means weighted forecast to one team and total deal amount to another. MQL thresholds were set two years ago and never updated. Win rate is calculated against different denominators depending on who is presenting. This is the single most common finding, and it undermines every downstream decision."
        )}
      </p>
      <p>
        <strong>{t("Orphaned fields and dead properties.")}</strong>{" "}
        {t(
          "Custom properties that were created for a campaign that ended eighteen months ago, a sales play that was retired, or an integration that was decommissioned. They are still in the system, still showing up in forms and filters, and occasionally still being populated by automations that reference them. In a typical audit, 30-50% of custom properties are no longer actively used."
        )}
      </p>
      <p>
        <strong>{t("Stale automations running in the background.")}</strong>{" "}
        {t(
          "Workflows that were built for a specific initiative, never turned off, and are now executing logic that conflicts with current processes. The most dangerous ones are the ones that still work -they produce incorrect data without triggering any errors, so no one notices until a forecast is off or a lead is routed to the wrong team."
        )}
      </p>
      <p>
        <strong>{t("Undocumented handoffs.")}</strong>{" "}
        {t(
          "The process for moving a lead from marketing to sales exists in someone's head but not in any written document or system configuration. When that person goes on vacation, the handoff breaks. When they leave the company, the handoff disappears. Even when they are present, the lack of documentation means there is no way to measure SLA compliance or identify where leads are getting stuck."
        )}
      </p>
      <p>
        <strong>{t("Shadow pipelines.")}</strong>{" "}
        {t(
          "Spreadsheets, Notion databases, or personal Trello boards that reps use to track deals because the CRM pipeline does not match their workflow. If your reps are maintaining a separate system alongside the CRM, the CRM data is incomplete by definition. The audit should ask: do reps trust the pipeline enough to use it as their primary deal tracker? If the answer is no, fixing the CRM is not enough -you need to understand why they built a shadow system and address the root cause."
        )}
      </p>

      {/* ── What to Do After the Audit ────────────────────────── */}
      <h2>{t("What to Do After the Audit")}</h2>
      <p>
        {t(
          "An audit produces findings. Findings are not a fix. The most common mistake teams make after an audit is trying to fix everything at once -rewriting the data model, rebuilding automations, migrating to new tools, and redesigning the pipeline all in the same quarter. This is how audit projects stall and die."
        )}
      </p>
      <p>
        {t(
          "Instead, prioritize by impact and effort. A two-by-two matrix works well here: plot each finding by how much it affects data accuracy or revenue visibility (impact) and how much work it takes to fix (effort). High-impact, low-effort fixes go first. These are usually things like aligning metric definitions, decommissioning stale automations, or documenting handoff SLAs. They do not require new tools or major CRM reconfiguration."
        )}
      </p>
      <p>
        {t(
          "Medium-impact findings that require significant effort -like restructuring your pipeline stages or rebuilding your integration layer -should be scoped as dedicated projects with timelines, owners, and success criteria. Do not try to squeeze them into someone's spare cycles."
        )}
      </p>
      <p>
        {t(
          "Low-impact findings go on a backlog. Review them quarterly. Some will become irrelevant as higher-priority fixes change the system around them. Others will escalate as the business evolves."
        )}
      </p>
      <p>
        {t(
          "If your team does not have the bandwidth or the specialized knowledge to execute the remediation plan, that is a legitimate finding in itself. A clean diagnosis with a clear priority list is more valuable than an incomplete fix. Consider bringing in an external partner who specializes in RevOps implementation -someone who can take the audit findings and turn them into a configured, tested, documented system."
        )}
      </p>
      <p>
        <Link href="/services/revops-crm-consulting">
          {t("Learn more about our RevOps and CRM consulting services")}
        </Link>
        {t(
          " -we help B2B teams turn audit findings into working systems."
        )}
      </p>

      {/* ── When to Hire an External Auditor ──────────────────── */}
      <h2>{t("When to Hire an External Auditor")}</h2>
      <p>
        {t(
          "Not every team needs outside help to run an audit. If you have an experienced ops person who did not build the current system and has the time to do the work thoroughly, an internal audit can work well. But there are situations where an external auditor is worth the investment."
        )}
      </p>
      <p>
        <strong>{t("When your team built the system.")}</strong>{" "}
        {t(
          "The people who configured the CRM, designed the pipeline, and built the automations are the worst people to audit their own work. Not because they are incompetent -because they are too close. They will unconsciously defend past decisions, overlook workarounds they have internalized, and underestimate the severity of problems they have been living with. An external auditor has no history with the system and no ego invested in its current state."
        )}
      </p>
      <p>
        <strong>{t("When a migration is on the table.")}</strong>{" "}
        {t(
          "If you are considering moving from Salesforce to HubSpot, from HubSpot to Salesforce, or from either to something else -audit first, migrate second. A pre-migration audit tells you what is worth bringing over, what should be left behind, and what needs to be redesigned rather than replicated. Migrating without an audit means you are paying to move problems from one platform to another."
        )}
      </p>
      <p>
        <strong>{t("When leadership has lost trust in the numbers.")}</strong>{" "}
        {t(
          "If your executive team no longer trusts the dashboards, that erosion of confidence is itself a business problem. It means decisions are being made on intuition instead of data, forecasts are treated as fiction, and the ops team is constantly fielding \"where did you get that number?\" questions instead of doing strategic work. An external audit provides a credible, independent assessment that can restore trust -or confirm that the distrust is warranted and quantify the gap."
        )}
      </p>
      <p>
        <strong>{t("When you need a decision framework, not just a list of problems.")}</strong>{" "}
        {t(
          "Internal teams often struggle with prioritization after an audit because every finding feels urgent to the person who sits closest to it. An external auditor brings pattern recognition from working across multiple companies -they know which findings are genuinely critical and which ones can wait, because they have seen the consequences of both."
        )}
      </p>
      <p>
        {t(
          "If any of this sounds like your situation, start with a free diagnostic. We will review your current setup, identify the highest-impact issues, and tell you whether a full audit is warranted -no commitment, no sales pitch."
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

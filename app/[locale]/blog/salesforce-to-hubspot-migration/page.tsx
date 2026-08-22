import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor } from "@/lib/i18n";
import { getT } from "@/i18n/t";
import { Link } from "@/i18n/navigation";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { BLOG_POSTS } from "@/components/blog/blogData";

const post = BLOG_POSTS.find(
  (p) => p.slug === "salesforce-to-hubspot-migration"
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
      modifiedTime: post.date,
      authors: [post.author.name],
      images: post.heroImage
        ? [{ url: post.heroImage, width: 1200, height: 630, alt: t(post.heroAlt ?? post.title) }]
        : [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

export default async function SalesforceToHubspotMigration({
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
          "Every year, thousands of B2B teams evaluate a move from Salesforce to HubSpot. The reasons are consistent: Salesforce licensing costs have climbed past the point of ROI for mid-market teams, the admin overhead requires a dedicated specialist most 50-200 person companies cannot justify, and the sales reps who are supposed to live in the CRM spend more time fighting it than using it. HubSpot's pitch is compelling -simpler UI, marketing and sales on one platform, lower total cost of ownership. For many teams, the pitch is accurate."
        )}
      </p>
      <p>
        {t(
          "But the migration itself is where things break. CRM vendors will tell you the switch takes four to six weeks. In practice, a Salesforce-to-HubSpot migration for a B2B team with 20,000+ contact records, custom objects, and a dozen integrations takes three to six months when done properly -and twelve or more months when done poorly. The difference is not the tooling. It is whether you treat the migration as a data transfer or as an operational redesign."
        )}
      </p>
      <p>
        {t(
          "This guide covers the full migration lifecycle: the pre-migration audit that most teams skip, a five-phase execution roadmap, the five mistakes that consistently cost teams months of rework, and an honest assessment of when the switch actually makes sense. If you are actively evaluating a CRM migration, this is the framework your team needs before touching a single record."
        )}
      </p>

      {/* -- Before You Start: The Pre-Migration Audit ------------- */}
      <h2>{t("Before You Start: The Pre-Migration Audit")}</h2>
      <p>
        {t(
          "The most expensive mistake in any CRM migration happens before the migration begins: teams start moving data without fully understanding what they have. A Salesforce org that has been in production for three or more years accumulates layers of configuration debt -custom fields nobody uses, automation rules that conflict with each other, reports built on objects that were deprecated two admins ago. Migrating all of this into HubSpot does not give you a clean start. It gives you someone else's mess in a new interface."
        )}
      </p>
      <p>
        {t(
          "The pre-migration audit produces the document that governs every subsequent decision. It is not optional. Here is what it covers."
        )}
      </p>

      <h3>{t("Map Your Current Salesforce Data Model")}</h3>
      <p>
        {t(
          "Start with a complete inventory of every object in your Salesforce org -standard and custom. For each object, document the fields (name, type, picklist values, formula logic), the record count, and the relationships to other objects. A typical mid-market Salesforce org has 15-30 custom objects and 200-400 custom fields across Accounts, Contacts, Opportunities, and custom objects. You need to know exactly how many you have before you can decide which ones to migrate."
        )}
      </p>
      <p>
        {t(
          "Pay special attention to field types that do not translate directly. Salesforce formula fields, roll-up summaries, and record types have no 1:1 equivalent in HubSpot. Multi-select picklists migrate as semicolon-delimited strings unless you handle the conversion explicitly. Lookup relationships between custom objects require HubSpot's custom object associations, which have their own limitations on association labels and cardinality."
        )}
      </p>

      <h3>{t("Identify What Is Actually Used vs. What Is Legacy")}</h3>
      <p>
        {t(
          "Run field-level usage reports. Salesforce's Field Trip app (AppExchange) or a metadata API export can show you which fields have been populated in the last 90 days. In most orgs, 30-50% of custom fields have zero or near-zero population rates. These are fields someone created for a project that ended, a report that was abandoned, or an integration that was decommissioned. They do not need to migrate."
        )}
      </p>
      <p>
        {t(
          "Do the same analysis for reports and dashboards. Export the list from Setup > Reports, check last-run dates, and flag anything that has not been viewed in six months. The average Salesforce org has 150-300 reports. Fewer than half are actively used. Migrating report logic that nobody reads wastes weeks of rebuilding effort in HubSpot."
        )}
      </p>

      <h3>{t("Document Custom Automations and Integrations")}</h3>
      <p>
        {t(
          "Catalog every automation: Flows, Process Builders, Workflow Rules, Apex triggers, and scheduled jobs. For each, document the trigger condition, the actions performed, and the business process it supports. This is where migrations get expensive -a team with 40-60 Flows in Salesforce cannot simply recreate them in HubSpot workflows. The automation models are fundamentally different. Salesforce Flows can execute complex branching logic with multiple DML operations; HubSpot workflows are event-driven and linear by comparison."
        )}
      </p>
      <p>
        {t(
          "List every integration connected to Salesforce: marketing automation, billing (Stripe, Zuora), CPQ, support (Zendesk, Intercom), data enrichment (ZoomInfo, Clearbit), and custom API connections. For each integration, note the sync direction (one-way or bidirectional), the fields synced, and the frequency. This inventory becomes your integration rebuild checklist in Phase 3."
        )}
      </p>
      <p>
        {t(
          "The output of this audit is a single document -your migration spec. It lists every object, field, automation, report, and integration, marked as migrate, rebuild, or deprecate. Without this document, your migration is guesswork."
        )}
      </p>

      {/* -- The 5-Phase Migration Roadmap ------------------------- */}
      <h2>{t("The 5-Phase Migration Roadmap")}</h2>
      <p>
        {t(
          "With the audit complete, the migration follows five phases. Skipping or compressing any phase is how teams end up six months behind schedule with data they cannot trust."
        )}
      </p>

      <h3>{t("Phase 1: Data Model Mapping")}</h3>
      <p>
        {t(
          "Map every Salesforce object to its HubSpot equivalent. Standard objects translate relatively cleanly: Accounts become Companies, Contacts stay Contacts, Opportunities become Deals, Cases become Tickets. But the details matter. Salesforce Accounts support a parent-child hierarchy natively; HubSpot company associations require a different approach. Salesforce Opportunity Products map to HubSpot Line Items, but pricing models (recurring vs. one-time, quantity-based discounts) may need custom properties."
        )}
      </p>
      <p>
        {t(
          "Custom objects are the biggest challenge. HubSpot's custom objects (available on Enterprise tier) support up to 10 custom object definitions with up to 250 properties each. If your Salesforce org has 25 custom objects, you have a problem -some will need to be consolidated, some reimagined as custom properties on standard objects, and some may not migrate at all. This is where the migration becomes an operational redesign, not just a data transfer."
        )}
      </p>
      <p>
        {t(
          "Create a field mapping spreadsheet: Salesforce field name, field type, HubSpot field name, HubSpot field type, transformation logic (if any), and migration priority. For a typical mid-market org, this spreadsheet has 200-500 rows. It is the single most important artifact of the migration."
        )}
      </p>

      <h3>{t("Phase 2: Data Cleaning")}</h3>
      <p>
        {t(
          "Clean the data before it moves, not after. Deduplication alone can reduce your contact database by 10-25%. Use Salesforce's built-in duplicate management or tools like Cloudingo or DemandTools to merge duplicates based on email, company domain, and phone number combinations. Set merge rules that preserve the most recent activity dates and the richest field data."
        )}
      </p>
      <p>
        {t(
          "Normalize field values. If your \"Industry\" picklist has \"SaaS\", \"SAAS\", \"Software as a Service\", and \"Software/SaaS\" as separate values, consolidate them before migration. Run the same normalization on job titles (\"VP Sales\" vs. \"Vice President of Sales\" vs. \"VP, Sales\"), country fields (\"US\" vs. \"USA\" vs. \"United States\"), and any other picklist or text field with inconsistent formatting. This work is tedious but prevents months of reporting headaches in HubSpot."
        )}
      </p>
      <p>
        {t(
          "Archive stale records. Contacts who have not engaged in 18+ months, deals closed-lost more than two years ago, accounts with no associated contacts or activity -move these to an archive before migration. You can always import archived records later if needed, but migrating 80,000 contacts when only 35,000 are actively worked costs time and inflates your HubSpot contact tier pricing."
        )}
      </p>

      <h3>{t("Phase 3: Integration Inventory and Rebuild Plan")}</h3>
      <p>
        {t(
          "Take the integration list from your audit and categorize each connection into one of three buckets. Native HubSpot integration: HubSpot has a built-in connector (Slack, Zoom, Google Workspace, Stripe, QuickBooks). These are the easiest -install the integration, configure the field mappings, test. API-based integration: the tool has an API and HubSpot's API supports the required operations, but there is no pre-built connector. You will need custom middleware (Zapier, Make, Workato, or custom code) to bridge the gap. Rebuild required: the integration relied on Salesforce-specific features (Apex callouts, Platform Events, Change Data Capture) and needs to be re-architected for HubSpot's webhook and workflow-based model."
        )}
      </p>
      <p>
        {t(
          "For each integration, estimate the rebuild effort. A native HubSpot connector takes 1-2 hours to configure. An API-based bridge takes 1-3 days. A full rebuild can take 1-4 weeks depending on complexity. Multiply these estimates across your integration inventory to get a realistic timeline for Phase 3 alone -for a team with 12-15 integrations, this phase typically takes 4-8 weeks."
        )}
      </p>

      <h3>{t("Phase 4: Migration Execution")}</h3>
      <p>
        {t(
          "Execute the data migration in a specific order. Companies (Accounts) first -they are the parent objects that everything else associates to. Contacts second -associated to their companies. Deals (Opportunities) third -associated to both companies and contacts. Activities (tasks, calls, emails, notes) fourth -associated to the records they belong to. Custom objects last -after the standard object associations are verified."
        )}
      </p>
      <p>
        {t(
          "For the actual transfer, you have three options. HubSpot's native CSV import works for simple, low-volume migrations (under 10,000 records per object) with straightforward field mappings. Third-party migration tools like Trujay (now Import2), Coefficient, or Insycle handle more complex scenarios -they maintain relationships between records, support custom object mapping, and can run incremental syncs. For large orgs (50,000+ records, complex custom objects, many-to-many relationships), custom migration scripts using the Salesforce Bulk API and HubSpot's Batch API give you full control over transformation logic, error handling, and retry mechanisms."
        )}
      </p>
      <p>
        {t(
          "Run the migration in a HubSpot sandbox first. Verify record counts, spot-check field values, test association integrity, and confirm that calculated properties produce correct results. Only after the sandbox migration passes validation should you execute against production. Plan the production cutover for a Friday evening or weekend -you need 24-48 hours of parallel running before Monday morning when the sales team logs in."
        )}
      </p>

      <h3>{t("Phase 5: Post-Migration Validation")}</h3>
      <p>
        {t(
          "Validation is not a single check -it is a structured process that runs for two to four weeks after cutover. Start with record count reconciliation: compare the number of companies, contacts, deals, and custom object records in Salesforce against HubSpot. The numbers will not match exactly (duplicates removed, stale records archived), but you need to account for every discrepancy."
        )}
      </p>
      <p>
        {t(
          "Field mapping verification comes next. Pull a random sample of 50-100 records from each major object and compare field values side by side. Check date fields (timezone conversions are a common source of off-by-one errors), currency fields (multi-currency orgs need careful handling), and picklist fields (values that did not match HubSpot's property options get silently dropped)."
        )}
      </p>
      <p>
        {t(
          "Test every automation. Create test records that trigger each workflow and verify the actions fire correctly -email sends, task creation, deal stage changes, Slack notifications. Automation failures after migration are the number one source of post-cutover fires because they are invisible until a rep notices a missing task or a customer does not receive an expected email."
        )}
      </p>
      <p>
        {t(
          "Run a parallel operation period. Keep Salesforce active (read-only) for 2-4 weeks while the team works in HubSpot. When someone says \"this number doesn't look right in HubSpot,\" you can cross-reference against Salesforce to determine whether the issue is a migration error or a HubSpot configuration gap. Cancel your Salesforce contract only after the parallel period ends and all validation checks pass."
        )}
      </p>

      {/* -- The 5 Mistakes That Cost Teams Months ----------------- */}
      <h2>{t("The 5 Mistakes That Cost Teams Months")}</h2>
      <p>
        {t(
          "After supporting CRM migrations across multiple B2B organizations, these are the five patterns that consistently turn a three-month project into a twelve-month ordeal."
        )}
      </p>

      <h3>{t("1. Migrating Everything Instead of What Is Used")}</h3>
      <p>
        {t(
          "Teams default to \"migrate everything just in case.\" This feels safe but is the opposite. Every unused field you migrate is a field you need to map, validate, and maintain in HubSpot. Every stale record you transfer inflates your contact tier and costs real money -HubSpot's pricing is contact-based, and moving 80,000 dead contacts into a system optimized for 30,000 active ones means you are paying for storage of records no one will touch. The audit's migrate/deprecate classification exists to prevent this. Use it."
        )}
      </p>

      <h3>{t("2. Skipping the Data Cleaning Phase")}</h3>
      <p>
        {t(
          "\"We will clean it up after we migrate\" is the most expensive sentence in CRM operations. Dirty data in Salesforce becomes dirty data in HubSpot, except now it is harder to trace because the original context (who created it, which integration pushed it, why it has conflicting values) is lost in the transfer. A contact with three duplicate records in Salesforce becomes three duplicate records in HubSpot -plus the association confusion that comes with deals and activities split across the duplicates. Clean before you move, not after."
        )}
      </p>

      <h3>
        {t("3. Rebuilding Automations 1:1 Instead of Redesigning")}
      </h3>
      <p>
        {t(
          "Your Salesforce automations were built for Salesforce's data model, trigger architecture, and execution model. Recreating them identically in HubSpot produces workflows that fight the platform instead of working with it. A Salesforce Flow that updates three related objects in a single transaction needs to become multiple HubSpot workflows with enrollment triggers -trying to force it into a single workflow creates fragile, hard-to-debug automation. The migration is an opportunity to simplify. Most teams find that 60% of their Salesforce automations can be consolidated into fewer, cleaner HubSpot workflows."
        )}
      </p>

      <h3>{t("4. Not Testing with Real Users Before Cutover")}</h3>
      <p>
        {t(
          "Technical validation catches data errors. User testing catches workflow errors. Your sales reps do not care whether the record count reconciles -they care whether they can find their accounts, see their deal history, and complete their daily workflow without extra steps. Run a pilot with 3-5 power users for one full week in the HubSpot sandbox. Give them real scenarios: \"Find your top 10 accounts by revenue. Create a new deal. Log a call. Run your weekly pipeline report.\" The issues they surface -missing views, unintuitive navigation, broken bookmarks, permissions gaps -are things no technical test will catch."
        )}
      </p>

      <h3>{t("5. Underestimating the Reporting Rebuild")}</h3>
      <p>
        {t(
          "Salesforce reports and HubSpot reports are architecturally different. Salesforce reports are SQL-like queries against the object model with cross-object joins, summary formulas, and matrix groupings. HubSpot reports use a visual builder that is simpler but less flexible -certain multi-object reports that were straightforward in Salesforce require custom report builder (Enterprise), calculated properties, or even external BI tools in HubSpot. Budget 2-4 weeks solely for rebuilding your top 20 reports and dashboards, and accept that some reports will need to be reimagined rather than recreated."
        )}
      </p>

      {/* -- When the Switch Makes Sense --------------------------- */}
      <h2>{t("Salesforce vs. HubSpot: When the Switch Makes Sense")}</h2>
      <p>
        {t(
          "Not every team should migrate. The decision depends on your team's size, complexity, and operational priorities. Here is an honest breakdown."
        )}
      </p>

      <h3>{t("HubSpot Wins")}</h3>
      <p>
        {t(
          "HubSpot is the stronger choice for marketing-heavy B2B teams that want sales and marketing on a single platform without middleware. If your deal structure is relatively simple (one pipeline, straightforward stages, standard quoting), HubSpot's deal management is more than capable and significantly easier for reps to use. Teams that value usability over configurability -where rep adoption matters more than admin flexibility -consistently report higher CRM usage rates after switching to HubSpot. The total cost of ownership is typically 40-60% lower than Salesforce for teams under 200 users, especially when you factor in admin labor and AppExchange add-ons."
        )}
      </p>

      <h3>{t("Salesforce Wins")}</h3>
      <p>
        {t(
          "Salesforce remains the right choice for organizations with complex multi-object data models (10+ custom objects with deep relationships), heavy CPQ requirements, or enterprise compliance mandates (FedRAMP, SOC 2 Type II with specific audit trail requirements). If your sales process involves complex approval chains, territory management, or revenue recognition rules that require custom Apex logic, Salesforce's depth of customization is hard to replicate. Teams with a dedicated Salesforce admin who actively maintains the org get more value from the platform than teams where CRM is everyone's side project."
        )}
      </p>

      <h3>{t("Sometimes Neither: The Problem Is Process")}</h3>
      <p>
        {t(
          "Here is the uncomfortable truth that neither vendor will tell you: if your pipeline is broken, your data is dirty, and your team does not follow a consistent sales process, switching CRMs will not fix anything. You will spend six months and $50,000-$150,000 migrating to a new platform, only to find the same problems in a different interface. Before committing to a migration, ask whether the issue is actually the CRM -or whether it is undefined deal stages, no data entry standards, missing SLAs between marketing and sales, and reports that no one built correctly in the first place. Fix the process first. Then decide if the tooling needs to change."
        )}
      </p>

      {/* -- How We Help ------------------------------------------- */}
      <h2>{t("How We Help With CRM Migrations")}</h2>
      <p>
        {t(
          "At Fill System, we do not start with the migration. We start with the diagnostic. Before any data moves, we map your current Salesforce configuration -objects, fields, automations, integrations, and reporting -and deliver a structured assessment of what should migrate, what should be rebuilt, and what should be retired. This is the pre-migration audit that most teams skip and most agencies do not offer."
        )}
      </p>
      <p>
        {t(
          "The diagnostic output becomes your migration spec: a field mapping document, an integration rebuild plan, an automation redesign checklist, and a realistic timeline based on your actual data complexity -not a vendor estimate based on averages. Whether you execute the migration internally, with an agency, or with our team, you start from a position of clarity instead of guesswork."
        )}
      </p>
      <p>
        {t(
          "Our RevOps and CRM consulting practice covers the full migration lifecycle. You can learn more about our approach on our "
        )}
        <Link href="/services/revops-crm-consulting">
          {t("RevOps & CRM consulting page")}
        </Link>
        {t(
          ", or request a free diagnostic to get a clear picture of your current state before committing to any migration plan."
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

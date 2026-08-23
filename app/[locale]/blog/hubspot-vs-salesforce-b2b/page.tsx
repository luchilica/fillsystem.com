import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor } from "@/lib/i18n";
import { getT } from "@/i18n/t";
import { Link } from "@/i18n/navigation";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { BLOG_POSTS } from "@/components/blog/blogData";

const post = BLOG_POSTS.find((p) => p.slug === "hubspot-vs-salesforce-b2b")!;

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

export default async function HubSpotVsSalesforceB2B({
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
          "The honest answer to \"HubSpot or Salesforce?\" is \"it depends.\" That is not a cop-out -- it is the only responsible answer when both platforms can technically do the job, and the right choice depends entirely on your team, your deal structure, and what you are actually going to use. Most comparison articles rank features side by side as if choosing a CRM is like choosing a phone plan. It is not. A CRM is an operating system for your revenue team, and the \"best\" one is the one your team will actually use correctly."
        )}
      </p>
      <p>
        {t(
          "This article is written for B2B services companies -- consultancies, agencies, managed services, professional services firms -- with teams between 20 and 200 people. If you sell physical products, run an e-commerce operation, or have 2,000 sales reps, this is not your guide. For mid-market B2B services, the HubSpot vs. Salesforce decision comes down to a handful of factors that have nothing to do with feature checklists and everything to do with how your team operates."
        )}
      </p>
      <p>
        {t(
          "We have helped companies migrate in both directions -- from Salesforce to HubSpot and from HubSpot to Salesforce -- and we have also helped companies realize that they did not need to migrate at all. Here is the framework we use."
        )}
      </p>

      {/* -- When HubSpot Wins ------------------------------------- */}
      <h2>{t("When HubSpot wins")}</h2>
      <p>
        {t(
          "HubSpot is the better choice in several specific scenarios. If multiple of these describe your situation, HubSpot is probably where you should be."
        )}
      </p>
      <p>
        <strong>{t("Marketing-heavy teams.")}</strong>{" "}
        {t(
          "If your growth model depends on content marketing, inbound lead generation, email nurturing, and marketing automation, HubSpot's native integration between CRM and marketing tools is a genuine advantage. Salesforce can do all of this with Pardot or Marketing Cloud, but the integration is bolted on rather than built in. HubSpot's marketing-to-sales handoff is smooth because it was designed as a single system from the start. If marketing and sales alignment is your primary operational challenge, HubSpot removes a layer of integration complexity."
        )}
      </p>
      <p>
        <strong>{t("Simpler deal structures.")}</strong>{" "}
        {t(
          "If your sales process follows a relatively linear path -- lead comes in, gets qualified, has a discovery call, receives a proposal, closes or does not -- HubSpot handles this elegantly. The deal pipeline is intuitive, the stages are easy to configure, and reporting is straightforward. You do not need a Salesforce admin to build a basic pipeline view."
        )}
      </p>
      <p>
        <strong>{t("Teams that value usability over customization.")}</strong>{" "}
        {t(
          "HubSpot is easier to learn, easier to use, and easier to maintain. This matters more than most people admit. A CRM that your team actually uses with 90% of its features is infinitely more valuable than a CRM with 100% of the features you theoretically need but only 40% adoption. If your sales reps are not technical, if you do not have a dedicated CRM admin, or if your previous CRM attempts have failed due to low adoption -- usability should be your primary criterion."
        )}
      </p>
      <p>
        <strong>{t("Companies under 100 people.")}</strong>{" "}
        {t(
          "At this size, you probably do not need the customization depth that Salesforce provides, and you definitely do not want to pay for it. HubSpot's free and Starter tiers let you run a functional CRM without a significant financial commitment, and the Professional tier provides more than enough capability for most B2B services companies at this scale. The total cost of ownership -- including admin time, training, and maintenance -- is materially lower."
        )}
      </p>
      <p>
        <strong>{t("Tighter budgets.")}</strong>{" "}
        {t(
          "This is not just about license costs. Salesforce requires ongoing admin work, often requires a consultant for non-trivial customizations, and has an ecosystem of paid add-ons that can inflate costs quickly. HubSpot's pricing is more predictable, and you can do more without external help. For a 50-person company, the annual total cost difference can be significant -- not just in licenses, but in the operational overhead of running the platform."
        )}
      </p>

      {/* -- When Salesforce Wins ---------------------------------- */}
      <h2>{t("When Salesforce wins")}</h2>
      <p>
        {t(
          "Salesforce is the better choice in different scenarios. If multiple of these describe your situation, Salesforce is probably the right call -- even with the higher cost and complexity."
        )}
      </p>
      <p>
        <strong>{t("Complex multi-object pipelines.")}</strong>{" "}
        {t(
          "If your deals involve multiple stakeholders across multiple accounts, if you track opportunities against parent companies with subsidiary relationships, or if your pipeline has branches and parallel tracks rather than a single linear flow -- Salesforce's object model handles this complexity natively. HubSpot can be stretched to accommodate complex relationships, but it starts to feel like a workaround rather than a designed solution. When your data model requires many-to-many relationships between custom objects, Salesforce is built for that."
        )}
      </p>
      <p>
        <strong>{t("Heavy customization needs.")}</strong>{" "}
        {t(
          "Salesforce's customization capabilities are genuinely deeper than HubSpot's. Custom objects, custom record types, complex validation rules, approval workflows, formula fields that reference across objects, advanced role hierarchies -- if you need these, Salesforce delivers them without workarounds. The question is whether you actually need them or whether you are building complexity because you can."
        )}
      </p>
      <p>
        <strong>{t("Enterprise compliance requirements.")}</strong>{" "}
        {t(
          "If your clients require SOC 2 reports about your CRM, if you operate in regulated industries that mandate specific data handling procedures, or if you need granular field-level security and audit trails -- Salesforce's compliance infrastructure is more mature. HubSpot has improved significantly in this area, but Salesforce has a decade head start in enterprise compliance features."
        )}
      </p>
      <p>
        <strong>{t("Large sales teams with territory management.")}</strong>{" "}
        {t(
          "Once you have more than 20-30 sales reps with defined territories, quota management, and complex commission structures, Salesforce's built-in territory management and CPQ (Configure, Price, Quote) capabilities become genuinely valuable. HubSpot can handle territory assignment, but the native tooling is not as deep. If territory management is a core operational requirement, Salesforce has the edge."
        )}
      </p>
      <p>
        <strong>{t("Existing Salesforce ecosystem investments.")}</strong>{" "}
        {t(
          "If your company already uses other Salesforce products (Service Cloud, Tableau, Slack with Salesforce integrations, MuleSoft), or if your key business partners and clients operate on Salesforce and expect data exchange through Salesforce-native integrations -- the switching cost is real and the ecosystem advantages are tangible. Moving to HubSpot means rebuilding those integrations, and some may not have equivalent functionality."
        )}
      </p>

      {/* -- When Neither Is the Problem --------------------------- */}
      <h2>{t("When neither is the problem")}</h2>
      <p>
        {t(
          "Here is the part most CRM comparison articles leave out: sometimes the problem is not the platform. We have worked with companies that migrated from Salesforce to HubSpot expecting their pipeline visibility issues to disappear, only to discover the same problems in the new system within six months. We have seen the reverse migration produce the same result. The CRM changed. The problems did not."
        )}
      </p>
      <p>
        {t(
          "There are clear signals that the issue is process, not tooling."
        )}
      </p>
      <p>
        <strong>{t("Same complaints after switching CRMs.")}</strong>{" "}
        {t(
          "If your team complained about data quality in Salesforce and now complains about data quality in HubSpot, the problem is not the CRM. It is that no one owns data quality as a responsibility. Changing platforms does not create accountability. It just resets the clock on technical debt."
        )}
      </p>
      <p>
        <strong>{t("Low adoption regardless of platform.")}</strong>{" "}
        {t(
          "If sales reps did not log activities in the old CRM and they are not logging activities in the new one, the issue is not the interface. It is usually a combination of unclear expectations, no consequences for non-compliance, and a system that does not obviously make their job easier. No CRM solves an adoption problem that is rooted in culture and management."
        )}
      </p>
      <p>
        <strong>{t("Data quality issues that follow you.")}</strong>{" "}
        {t(
          "Duplicate records, incomplete contact information, inconsistent naming conventions, stale deals sitting in the pipeline -- these problems are portable. They will move with you to any platform because they are caused by a lack of data governance, not by a software limitation. If you migrate without fixing the underlying governance issues, you are paying migration costs to achieve the same mess in a new interface."
        )}
      </p>
      <p>
        {t(
          "If any of these sound familiar, pause the migration conversation. Fix the process first. A well-run CRM on either platform will outperform a poorly run CRM on the \"better\" platform every time."
        )}
      </p>

      {/* -- The Migration Decision Framework ---------------------- */}
      <h2>{t("The migration decision framework")}</h2>
      <p>
        {t(
          "If you are seriously considering a switch, answer these five questions before making a decision. Write down the answers. Share them with your team. The exercise itself is often more valuable than the conclusion."
        )}
      </p>
      <p>
        <strong>{t("1. What does your team actually use?")}</strong>{" "}
        {t(
          "Pull usage data from your current CRM. How many reps log in daily? Which features do they actually use versus which features you are paying for? If your team uses 30% of Salesforce's capabilities, you might be paying for complexity you do not need. Conversely, if your team is constantly hitting HubSpot's limits and building workarounds, you might need Salesforce's depth."
        )}
      </p>
      <p>
        <strong>{t("2. What are you paying for that you do not use?")}</strong>{" "}
        {t(
          "Add up the total cost of your current setup: licenses, add-ons, consultant fees, admin time, training. Compare it to the features your team actually uses. Many companies discover they are paying enterprise prices for startup usage. This calculation alone can change the decision."
        )}
      </p>
      <p>
        <strong>{t("3. What integrations would break?")}</strong>{" "}
        {t(
          "List every tool that connects to your CRM. For each one, check whether the integration exists on the target platform and whether it provides equivalent functionality. The most common migration surprise is discovering that a critical integration either does not exist, works differently, or requires a paid middleware tool to replicate."
        )}
      </p>
      <p>
        <strong>{t("4. How clean is your current data?")}</strong>{" "}
        {t(
          "If your current CRM has significant data quality issues, migration is an opportunity to clean house -- but only if you budget the time and effort for it. Migrating dirty data to a new platform just gives you dirty data in a different interface. Plan for a data cleanup phase before the migration, and define clear quality standards for what gets moved and what gets archived."
        )}
      </p>
      <p>
        <strong>{t("5. What is the real cost of switching?")}</strong>{" "}
        {t(
          "Migration cost is not just the migration service fee. It includes: retraining your team, rebuilding reports and dashboards, reconfiguring automations, re-establishing integrations, the productivity dip during the transition period, and the opportunity cost of months spent on infrastructure instead of revenue-generating activity. For a 50-person company, a CRM migration typically takes 2-4 months of significant operational distraction. Make sure the benefits justify that investment."
        )}
      </p>

      {/* -- Our Recommendation ------------------------------------ */}
      <h2>{t("Our recommendation")}</h2>
      <p>
        {t(
          "Before you decide to switch CRMs, audit what you have. Most of the time, the problems that are driving the migration conversation -- unreliable data, poor adoption, inconsistent processes, dashboards no one trusts -- are problems that will follow you to the new platform unless you fix them first."
        )}
      </p>
      <p>
        {t(
          "Start with a structured review of your current CRM setup: the data model, the pipeline configuration, the reporting layer, the integrations, and the processes that connect them. Understand what is working, what is broken, and what is broken because of the platform versus what is broken because of how the platform is being used. That distinction is critical. If the problem is configuration and process, fix those first -- it is faster, cheaper, and less disruptive than a migration. If the problem is genuinely the platform -- if you have outgrown its capabilities or if the total cost of ownership is unjustifiable for your needs -- then migrate, but migrate with clean data, clear requirements, and realistic expectations."
        )}
      </p>
      <p>
        <Link href="/services/revops-crm-consulting">
          {t("Our RevOps and CRM consulting practice")}
        </Link>{" "}
        {t(
          "helps B2B companies make this decision with data instead of gut feel. We start with a diagnostic of your current setup and give you an honest assessment of whether you need a new platform, a better configuration of your existing one, or a process fix that does not require any software changes at all."
        )}
      </p>
      <p>
        {t(
          "The best CRM for your company is not the one with the most features or the best reviews. It is the one your team will use consistently, that produces data you can trust, and that supports the processes you actually follow. Sometimes that means HubSpot. Sometimes that means Salesforce. Sometimes that means staying where you are and fixing what is broken. The only way to know is to look at your situation honestly -- and that starts with an audit, not a vendor demo."
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

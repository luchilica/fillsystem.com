import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor } from "@/lib/i18n";
import { getT } from "@/i18n/t";
import { Link } from "@/i18n/navigation";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { BLOG_POSTS } from "@/components/blog/blogData";

const post = BLOG_POSTS.find((p) => p.slug === "it-risk-b2b-what-to-check")!;

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

export default async function ITRiskB2BWhatToCheck({
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
          "Most B2B companies between 50 and 250 employees do not have a security incident on their risk register. They have a collection of things nobody has checked: admin accounts that belong to former employees, API keys stored in a shared Google Doc, a billing system that only one person knows how to operate, and a backup process that has never been tested."
        )}
      </p>
      <p>
        {t(
          "This is not negligence. It is the natural result of growing a company without a dedicated IT risk function. When you are 15 people, the founder's Gmail is the IT department. When you are 80 people, you have SaaS contracts across four departments, customer data in three systems, and access credentials scattered across personal password managers, browser autofill, and sticky notes. Nobody planned this architecture. It just happened."
        )}
      </p>
      <p>
        {t(
          "The problem is not that these risks exist. Every company has them. The problem is that nobody owns them. There is no inventory of what systems are running, who has access, where data flows, or what breaks if a single person or a single vendor disappears. And until someone maps those risks, they compound quietly until a password reset locks out the entire sales team, a decommissioned employee's account sends invoices to a client, or a ransomware email finds the one inbox without MFA."
        )}
      </p>

      {/* -- What Counts as IT Risk -------------------------------- */}
      <h2>{t("What IT risk actually means for a B2B company")}</h2>
      <p>
        {t(
          "IT risk is not the same as cybersecurity. Cybersecurity is one layer. IT risk covers everything that can disrupt your ability to operate: systems that fail, data that is lost or corrupted, access that is compromised, knowledge that is concentrated in one person, vendors that disappear, and controls that exist on paper but not in practice."
        )}
      </p>
      <p>
        {t(
          "For B2B companies in the 50-250 employee range, IT risk is mostly not about sophisticated attacks. It is about operational fragility. The database that is not backed up. The admin credentials that are shared on Slack. The integration that stopped syncing three weeks ago and nobody noticed. The vendor contract that auto-renewed for a tool nobody uses. These are not dramatic failures. They are the slow accumulation of unmanaged risk that eventually produces a dramatic failure."
        )}
      </p>
      <p>
        {t(
          "The distinction matters because it changes what you check. Enterprise security frameworks focus on threat actors, network perimeters, and compliance certifications. A mid-market B2B company needs to start with a more basic question: do we know what we have, who can access it, and what happens if it goes down?"
        )}
      </p>

      {/* -- 6 Areas ---------------------------------------------- */}
      <h2>{t("6 IT risk areas every growing B2B company should audit")}</h2>

      <h3>{t("1. Access and Account Sprawl")}</h3>
      <p>
        {t(
          "Pull a list of every user account across your critical systems: CRM, billing, cloud infrastructure, email, file storage, project management. Now compare that list against your current employee roster. If there are accounts that belong to people who left the company months ago, you have an access sprawl problem."
        )}
      </p>
      <p>
        {t(
          "This is the single most common IT risk finding in mid-market B2B companies. Former employees retain active accounts because nobody owns the offboarding checklist, or the checklist covers HR and payroll but not SaaS systems. A former sales rep still has access to your CRM. A former developer still has deployment keys. A former contractor still has access to the client portal."
        )}
      </p>
      <p>
        {t(
          "The fix is straightforward but requires discipline: maintain a single access register that maps every person to every system. When someone leaves, deactivate every account on the same day. When someone changes roles, review and adjust their permissions. If you cannot produce this register right now, that is your first audit finding."
        )}
      </p>

      <h3>{t("2. Single Points of Failure")}</h3>
      <p>
        {t(
          "A single point of failure is any system, process, or person whose absence would disrupt operations with no immediate fallback. In growing B2B companies, the most dangerous single points of failure are not technical. They are human."
        )}
      </p>
      <p>
        {t(
          "The person who manages the billing system. The engineer who deployed the integration. The office manager who has the admin credentials for the domain registrar. The accountant who is the only signer on the bank account. If any of these people are unavailable for a week, can someone else perform their function? If the answer is \"not really,\" each one is a risk that compounds with time."
        )}
      </p>
      <p>
        {t(
          "Technical single points of failure matter too: a single cloud region with no failover, a database with no tested backup, a DNS provider where the credentials are in one person's 1Password vault. The audit should identify every critical system and ask: who else can operate this, and where are the credentials documented?"
        )}
      </p>

      <h3>{t("3. Shadow IT: Tools Nobody Approved")}</h3>
      <p>
        {t(
          "Shadow IT is every tool, service, and system that your team uses without formal approval, procurement, or oversight. It is the marketing intern's Canva account that holds all your brand assets. It is the sales team's unofficial Notion database that tracks pipeline activity outside the CRM. It is the developer's personal AWS account that runs a production microservice."
        )}
      </p>
      <p>
        {t(
          "Shadow IT is not a malicious act. It happens because official procurement is slow, official tools are clunky, and people need to get work done. But each unapproved tool creates risk: data leaves your controlled environment, credentials are managed outside your security perimeter, and when the person who set up the tool leaves, nobody knows it exists until something breaks."
        )}
      </p>
      <p>
        {t(
          "The audit approach: ask every department head to list the tools their team uses. Then compare against your official SaaS inventory and corporate card statements. The gap between those two lists is your shadow IT footprint. It is usually larger than anyone expects."
        )}
      </p>

      <h3>{t("4. Data Handling and Backup Verification")}</h3>
      <p>
        {t(
          "\"We back up everything\" is the most common answer to the backup question, and it is almost never accurate. The follow-up questions are: what exactly is backed up, how often, to where, and when was the last time you tested a restore? If any of those answers involve silence or uncertainty, your backup is a theory, not a fact."
        )}
      </p>
      <p>
        {t(
          "SaaS applications are a particular blind spot. Companies assume that because their CRM or project management tool is \"in the cloud,\" the data is automatically backed up and recoverable. This is often true for disaster recovery at the vendor level, but it does not protect against user error, accidental mass deletions, API misconfigurations, or vendor policy changes. If a rep accidentally deletes 500 contacts from HubSpot, can you restore them? How quickly? From where?"
        )}
      </p>
      <p>
        {t(
          "The audit should also check data classification. Not every piece of data deserves the same protection. Client contracts, financial records, and personally identifiable information need stronger controls than internal meeting notes. But most mid-market companies have never classified their data, so everything gets the same (usually minimal) level of protection."
        )}
      </p>

      <h3>{t("5. Vendor and Third-Party Risk")}</h3>
      <p>
        {t(
          "Your risk surface extends to every vendor that touches your data, your systems, or your client experience. A typical B2B company with 100 employees has 40-60 active SaaS subscriptions. Each one is a dependency. If Zapier goes down, do your automations fail silently? If your email provider has an outage, can your team still communicate with clients? If your payment processor changes its terms, are you locked in?"
        )}
      </p>
      <p>
        {t(
          "Vendor risk is not just about reliability. It is about control. Review your top 10 vendors by criticality: who has access to your data, what are their security certifications, what happens to your data if you cancel the contract, and what is the contractual notice period? The answers will tell you whether you are a customer or a hostage."
        )}
      </p>
      <p>
        {t(
          "Pay special attention to concentration risk: if multiple critical processes depend on the same vendor, a single outage can cascade across your entire operation. If your CRM, marketing automation, and customer success platform are all from the same vendor, you have a concentration risk that no SLA can fully mitigate."
        )}
      </p>

      <h3>{t("6. Authentication and Credential Hygiene")}</h3>
      <p>
        {t(
          "Multi-factor authentication is the single most effective risk reduction measure available to any organization, and it is still not enforced universally in most mid-market B2B companies. Check every critical system: CRM, email, cloud infrastructure, banking, domain management. If MFA is not enabled on all of them, enable it today. This is not an audit finding to prioritize later. It is an urgent fix."
        )}
      </p>
      <p>
        {t(
          "Beyond MFA, check credential hygiene. Are passwords shared via Slack or email? Are there generic \"admin@company\" accounts that multiple people use? Are API keys and service credentials stored in environment variables, or in a plain-text file on someone's laptop? Is there a company-standard password manager, and does everyone actually use it?"
        )}
      </p>
      <p>
        {t(
          "The audit should also check for credential rotation. How often are critical passwords changed? When was the last time someone rotated the API keys for your production integrations? If the answer is \"when they were first created,\" every key is a liability that gets riskier with time."
        )}
      </p>

      {/* -- Priority Framework ----------------------------------- */}
      <h2>{t("How to prioritize IT risk findings")}</h2>
      <p>
        {t(
          "An IT risk audit produces a list of findings. Some are urgent. Some are important but not immediate. Some are nice-to-have improvements. The challenge is distinguishing between them without either panicking over everything or dismissing everything."
        )}
      </p>
      <p>
        {t(
          "Use a simple three-tier framework based on blast radius and likelihood. Tier 1 (fix this week): findings where an incident is probable and the impact would affect clients, revenue, or legal exposure. Former employee accounts with active access, no MFA on financial systems, unencrypted client data. Tier 2 (fix this quarter): findings where the risk is real but the probability is lower or the impact is contained. Shadow IT tools, untested backups, vendor concentration. Tier 3 (track and review): findings that represent technical debt rather than active risk. Password rotation schedules, documentation gaps, minor compliance improvements."
        )}
      </p>
      <p>
        {t(
          "The most expensive mistake is treating every finding as Tier 1. When everything is urgent, nothing is. The second most expensive mistake is treating nothing as Tier 1. Start with the findings that could cause harm this month, and work outward."
        )}
      </p>

      {/* -- Audit Checklist -------------------------------------- */}
      <h2>{t("IT risk audit quick checklist")}</h2>
      <p>
        {t(
          "Use this as a starting point. Each question should have a documented answer and a named owner."
        )}
      </p>
      <ul>
        <li>{t("Can you produce a current list of every user account across all critical systems?")}</li>
        <li>{t("Do all accounts belong to current employees in their current roles?")}</li>
        <li>{t("Is MFA enabled on every system that touches client data or financial transactions?")}</li>
        <li>{t("Can someone other than the original administrator operate each critical system?")}</li>
        <li>{t("Do you have a tested backup for your CRM, file storage, and financial data?")}</li>
        <li>{t("When was the last time you tested a restore from backup?")}</li>
        <li>{t("Is there a complete inventory of SaaS tools used across all departments?")}</li>
        <li>{t("Are API keys and service credentials stored in a managed vault, not in code or chat?")}</li>
        <li>{t("Is there a written offboarding checklist that includes SaaS account deactivation?")}</li>
        <li>{t("Do you know your top 5 vendors by criticality and their data retention policies?")}</li>
      </ul>
      <p>
        {t(
          "If more than three of these questions made you pause, your IT risk posture needs attention."
        )}
      </p>

      {/* -- Service Cross-Links ---------------------------------- */}
      <h2>{t("Getting help with an IT risk audit")}</h2>
      <p>
        {t(
          "Internal audits can cover ground quickly when someone on the team has the time and the technical breadth to check every system, every access list, and every vendor contract. In practice, IT risk audits get deferred because the people who could run them are the same people who are busy keeping the systems running."
        )}
      </p>
      <p>
        {t(
          "If your company has grown past the point where one person can hold the full picture of what systems exist, who has access, and what breaks if something fails, an external audit can surface risks that are invisible from the inside. Not because your team is unaware of them, but because they have normalized them."
        )}
      </p>
      <p>
        {t("Our")}{" "}
        <Link href="/services/it-risk-security">
          {t("IT Risk & Security audit")}
        </Link>{" "}
        {t(
          "reviews access controls, data handling, single points of failure, vendor dependencies, and credential hygiene. The output is a prioritized fix list with clear owners and timelines, not a compliance checkbox report. For teams that are not sure whether a full audit is needed,"
        )}{" "}
        <Link href="/services/business-diagnostic">
          {t("the free primary diagnostic")}
        </Link>{" "}
        {t(
          "frames the risk landscape in 30-45 minutes and identifies the areas that need immediate attention."
        )}
      </p>
      <p>
        {t(
          "IT risk does not announce itself. It accumulates until something breaks. The cost of an audit is a fraction of the cost of the incident it prevents."
        )}
      </p>
      <p>
        <strong>
          <Link href="/#diagnostic-request-form">
            {t("Request a free diagnostic")}
          </Link>
        </strong>{" "}
        {t(
          "and find out where your IT risk posture has gaps."
        )}
      </p>
    </BlogPostLayout>
    </>
  );
}

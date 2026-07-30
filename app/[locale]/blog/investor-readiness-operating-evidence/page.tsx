import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor } from "@/lib/i18n";
import { getT } from "@/i18n/t";
import { Link } from "@/i18n/navigation";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import { BLOG_POSTS } from "@/components/blog/blogData";

const post = BLOG_POSTS.find(
  (p) => p.slug === "investor-readiness-operating-evidence"
)!;

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
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

export default async function InvestorReadiness({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getT();

  return (
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
      {/* -- Intro ------------------------------------------------- */}
      <p>
        {t(
          "A strong idea can earn attention. A polished pitch deck can earn a meeting."
        )}
      </p>
      <p>
        {t(
          "Neither one is enough to carry an investor through diligence."
        )}
      </p>
      <p>
        {t(
          "Once the conversation becomes serious, the business behind the presentation starts to matter more than the presentation itself. Investors begin looking at how the company acquires customers, defines revenue, manages delivery, produces reports, controls risk, and turns additional capital into measurable operating progress."
        )}
      </p>
      <p>{t("At that point, the question is no longer:")}</p>
      <blockquote>
        <p>{t("Is this an interesting idea?")}</p>
      </blockquote>
      <p>{t("It becomes:")}</p>
      <blockquote>
        <p>
          {t(
            "Is there enough reliable evidence to justify taking the next risk?"
          )}
        </p>
      </blockquote>
      <p>
        {t(
          "For a scaling B2B company, investor readiness is therefore not only a fundraising task. It is an operating-system test."
        )}
      </p>
      <p>
        {t(
          "Before approaching investors, a company should be able to demonstrate seven things: the customer problem is supported by evidence; Revenue and core metrics can be reconciled; Customer acquisition is becoming repeatable; Delivery does not depend entirely on the founder; Processes, ownership, and systems can support growth; Material risks are understood rather than hidden; and The use of funds is connected to specific operating milestones."
        )}
      </p>
      <p>{t("A pitch deck tells the story.")}</p>
      <p>
        {t(
          "Operating evidence shows whether the story can survive contact with reality."
        )}
      </p>

      {/* -- An idea is only the first hypothesis ------------------- */}
      <h2>{t("An idea is only the first hypothesis")}</h2>
      <p>
        {t(
          "Every company begins with assumptions: a problem exists; a specific customer experiences it; the customer will pay for a solution; the company can acquire that customer economically; the solution can be delivered consistently; and the model can expand without breaking operations."
        )}
      </p>
      <p>
        {t(
          "The idea itself is not the problem. Treating the idea as proven is."
        )}
      </p>
      <p>
        {t(
          "A strong founder can explain not only what the company believes, but also: which assumptions have been tested; what evidence supports them; which assumptions remain uncertain; what changed after contradictory evidence appeared; and what the company will test next."
        )}
      </p>
      <p>{t("This is a more credible signal than confidence alone.")}</p>
      <p>
        {t(
          "Confidence describes the founder's emotional position. Evidence describes the state of the business."
        )}
      </p>

      {/* -- Evidence that the problem is real ---------------------- */}
      <h2>{t("Evidence that the problem is real")}</h2>
      <p>
        {t(
          "Customer interest is not the same as problem validation."
        )}
      </p>
      <p>
        {t(
          "Prospects may praise a concept and still refuse to buy it. Existing customers may purchase for reasons different from those described in the deck. Usage may concentrate around one feature while the company continues investing in another."
        )}
      </p>
      <p>
        {t(
          "Before an investor conversation, the company should be able to show how it knows the problem matters."
        )}
      </p>
      <p>
        {t(
          "Useful evidence may include recurring customer complaints; current manual workarounds; time or money already spent on alternatives; paid pilots; product usage; renewal or expansion behavior; reasons customers buy; reasons customers leave; and situations in which the product is not a fit."
        )}
      </p>
      <p>{t("The last point matters.")}</p>
      <p>
        {t(
          "A company that knows where its product does not work often appears more credible than one claiming that every business is a potential customer."
        )}
      </p>

      <h3>{t("A useful test")}</h3>
      <blockquote>
        <p>
          {t(
            "Can the team distinguish customer enthusiasm from purchasing behavior?"
          )}
        </p>
      </blockquote>
      <p>
        {t(
          "If the answer is no, the company may have market interest without validated demand."
        )}
      </p>

      {/* -- Revenue quality, not only revenue growth --------------- */}
      <h2>{t("Revenue quality, not only revenue growth")}</h2>
      <p>
        {t(
          "A growing top-line number can conceal weak operating visibility."
        )}
      </p>
      <p>
        {t(
          "For example, different systems may use different definitions of: booked revenue; recurring revenue; recognized revenue; pipeline value; renewals; active customers; gross margin; and churn."
        )}
      </p>
      <p>
        {t(
          "If CRM, billing, accounting, and management reporting produce conflicting numbers, investors may not know which version of the business to trust."
        )}
      </p>
      <p>
        {t(
          "This does not automatically mean fraud or poor management. It often means the company grew faster than its reporting rules."
        )}
      </p>
      <p>{t("But the risk remains.")}</p>
      <p>
        {t(
          "Before diligence, leadership should know which system is the source of truth for each core metric; who owns each definition; how numbers are reconciled; where estimates are used; which figures are still unreliable; and what is being done to correct them."
        )}
      </p>
      <p>{t("The goal is not to present perfect numbers.")}</p>
      <p>
        {t(
          "The goal is to present numbers that can be explained and reproduced."
        )}
      </p>

      {/* -- A revenue process that is becoming repeatable ---------- */}
      <h2>{t("A revenue process that is becoming repeatable")}</h2>
      <p>
        {t(
          "Founder-led sales can be an effective way to validate demand. It becomes a risk when it remains the only reliable way to close business."
        )}
      </p>
      <p>
        {t(
          "Investors may examine whether customer acquisition depends on: the founder's personal network; one large customer; one referral partner; one paid channel; undocumented sales judgment; custom pricing for every deal; and manual follow-up outside the CRM."
        )}
      </p>
      <p>
        {t(
          "A repeatable revenue process does not require the company to have solved every acquisition problem. It requires the company to understand how opportunities actually move."
        )}
      </p>
      <p>
        {t("At minimum, the business should be able to map:")}
      </p>
      <blockquote>
        <p>
          {t(
            "Lead source - qualification - ownership - sales stage - proposal - close - onboarding - expansion or renewal"
          )}
        </p>
      </blockquote>
      <p>
        {t(
          "For each transition, leadership should know what triggers the handoff; who owns the next action; what information must be present; how long the step normally takes; where prospects most often stall; and which exceptions require human judgment."
        )}
      </p>
      <p>
        {t(
          "Without this map, adding salespeople or marketing spend may scale confusion rather than revenue."
        )}
      </p>

      {/* -- An operating model that can work without constant founder intervention */}
      <h2>
        {t(
          "An operating model that can work without constant founder intervention"
        )}
      </h2>
      <p>
        {t(
          "A founder can compensate for weak processes during the early stage."
        )}
      </p>
      <p>
        {t(
          "They answer every escalation, approve every exception, rescue delayed projects, remember every customer promise, and connect information that is fragmented across systems."
        )}
      </p>
      <p>
        {t(
          "This can make the company appear more organized than it is."
        )}
      </p>
      <p>
        {t(
          "The problem becomes visible when growth adds more customers, employees, products, and decisions."
        )}
      </p>
      <p>
        {t(
          "Common signs of founder-dependent operations include approvals waiting for one person; undocumented customer commitments; employees asking the founder how standard work should be handled; critical information stored in private messages; different teams following different versions of the same process; and no clear owner for cross-functional handoffs."
        )}
      </p>
      <p>{t("Capital does not automatically solve this problem.")}</p>
      <p>
        {t(
          "Hiring more people into an unclear operating model can increase coordination cost, approval queues, and duplicated work."
        )}
      </p>
      <p>
        {t(
          "Before raising, leadership should identify critical decisions that still depend on the founder; processes that exist only as tribal knowledge; recurring exceptions; unclear ownership; and roles that would fail if one employee left."
        )}
      </p>
      <p>
        {t(
          "This does not mean the founder must leave daily operations. It means the company should understand where the founder is creating unique value and where they are compensating for missing structure."
        )}
      </p>

      {/* -- Systems and data that support the operating model ------ */}
      <h2>{t("Systems and data that support the operating model")}</h2>
      <p>
        {t(
          "Investors do not need every company to have an enterprise technology stack."
        )}
      </p>
      <p>
        {t(
          "They do need confidence that the business can track customers; measure pipeline; deliver consistently; control access; produce credible reports; retain operational knowledge; integrate new employees; and manage critical dependencies."
        )}
      </p>
      <p>
        {t(
          "The relevant question is not whether the company uses Salesforce, HubSpot, spreadsheets, or custom software."
        )}
      </p>
      <p>
        {t(
          "The relevant question is whether the systems represent how the company actually works."
        )}
      </p>
      <p>{t("A basic systems review should identify:")}</p>
      <table>
        <thead>
          <tr>
            <th>{t("Area")}</th>
            <th>{t("What to verify")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>{t("CRM")}</strong></td>
            <td>{t("Pipeline stages, ownership, required data and reporting definitions")}</td>
          </tr>
          <tr>
            <td><strong>{t("Finance")}</strong></td>
            <td>{t("Reconciliation between contracts, invoices, cash and reported revenue")}</td>
          </tr>
          <tr>
            <td><strong>{t("Delivery")}</strong></td>
            <td>{t("Capacity, workload, commitments and customer status")}</td>
          </tr>
          <tr>
            <td><strong>{t("Integrations")}</strong></td>
            <td>{t("Which systems exchange data and how failures are detected")}</td>
          </tr>
          <tr>
            <td><strong>{t("Access")}</strong></td>
            <td>{t("Who controls critical accounts, API keys and administrative permissions")}</td>
          </tr>
          <tr>
            <td><strong>{t("Documentation")}</strong></td>
            <td>{t("Whether essential knowledge remains usable when employees change")}</td>
          </tr>
          <tr>
            <td><strong>{t("Reporting")}</strong></td>
            <td>{t("Whether management dashboards can be reproduced from source data")}</td>
          </tr>
        </tbody>
      </table>
      <p>{t("A modern interface does not create operating maturity.")}</p>
      <p>{t("Reliable information flow does.")}</p>

      {/* -- Risks that are visible before the investor discovers them */}
      <h2>
        {t("Risks that are visible before the investor discovers them")}
      </h2>
      <p>
        {t(
          "An investor does not expect a growing company to have no risks."
        )}
      </p>
      <p>
        {t(
          "A claim of having no meaningful risks can itself become a warning signal."
        )}
      </p>
      <p>
        {t(
          "Mature preparation means leadership can explain: what might fail; what would trigger the failure; what the business impact would be; who owns the risk; what mitigation already exists; and what additional capital would change."
        )}
      </p>
      <p>{t("A simple risk register may include:")}</p>
      <table>
        <thead>
          <tr>
            <th>{t("Risk")}</th>
            <th>{t("Evidence")}</th>
            <th>{t("Potential impact")}</th>
            <th>{t("Current mitigation")}</th>
            <th>{t("Owner")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>{t("Customer concentration")}</strong></td>
            <td>{t("High share of revenue from one account")}</td>
            <td>{t("Revenue volatility")}</td>
            <td>{t("Expansion of qualified pipeline")}</td>
            <td>{t("CEO")}</td>
          </tr>
          <tr>
            <td><strong>{t("Founder-dependent sales")}</strong></td>
            <td>{t("Most major deals require founder involvement")}</td>
            <td>{t("Limited sales scalability")}</td>
            <td>{t("Documented qualification and handoff process")}</td>
            <td>{t("Head of Sales")}</td>
          </tr>
          <tr>
            <td><strong>{t("Reporting inconsistency")}</strong></td>
            <td>{t("CRM and finance use different revenue definitions")}</td>
            <td>{t("Low confidence in forecasts")}</td>
            <td>{t("Metric reconciliation project")}</td>
            <td>{t("Finance lead")}</td>
          </tr>
          <tr>
            <td><strong>{t("Critical system ownership")}</strong></td>
            <td>{t("One employee controls integrations and credentials")}</td>
            <td>{t("Operational interruption")}</td>
            <td>{t("Access review and documentation")}</td>
            <td>{t("Operations lead")}</td>
          </tr>
        </tbody>
      </table>
      <p>
        {t(
          "The purpose of this table is not to make the company look risk-free."
        )}
      </p>
      <p>
        {t(
          "It is to show that management understands the business it is asking investors to fund."
        )}
      </p>

      {/* -- A use-of-funds plan connected to operating milestones -- */}
      <h2>
        {t("A use-of-funds plan connected to operating milestones")}
      </h2>
      <p>
        {t(
          "\"Hire more people and spend more on marketing\" is a budget category, not an investment thesis."
        )}
      </p>
      <p>{t("A credible use-of-funds plan explains the causal chain:")}</p>
      <blockquote>
        <p>
          {t(
            "Capital - capability - operating change - measurable milestone - reduced business risk"
          )}
        </p>
      </blockquote>
      <p>{t("For example:")}</p>
      <table>
        <thead>
          <tr>
            <th>{t("Weak explanation")}</th>
            <th>{t("Stronger explanation")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>{t("Hire salespeople")}</strong></td>
            <td>{t("Add sales capacity after qualification criteria, pipeline stages, and ownership are standardized")}</td>
          </tr>
          <tr>
            <td><strong>{t("Increase marketing")}</strong></td>
            <td>{t("Scale the channel only after source attribution and conversion definitions are reliable")}</td>
          </tr>
          <tr>
            <td><strong>{t("Build AI features")}</strong></td>
            <td>{t("Validate the workflow, data quality, error cost, and human-review requirements before implementation")}</td>
          </tr>
          <tr>
            <td><strong>{t("Upgrade the CRM")}</strong></td>
            <td>{t("Correct the process and data model before approving migration")}</td>
          </tr>
          <tr>
            <td><strong>{t("Hire operations staff")}</strong></td>
            <td>{t("Define decision rights and process ownership before adding coordination capacity")}</td>
          </tr>
        </tbody>
      </table>
      <p>{t("The critical question is:")}</p>
      <blockquote>
        <p>
          {t(
            "What becomes true after the capital is spent that is not true today?"
          )}
        </p>
      </blockquote>
      <p>
        {t(
          "If the answer is only \"we will be bigger,\" the plan is incomplete."
        )}
      </p>

      {/* -- A practical operating-evidence self-assessment --------- */}
      <h2>{t("A practical operating-evidence self-assessment")}</h2>
      <p>
        {t(
          "Use the following score only as an internal preparation tool. It is not an investor rating and does not predict fundraising success."
        )}
      </p>
      <p>
        {t(
          "Score each category: 0 - Undocumented: the answer depends on individual memory or opinion; 1 - Partially defined: the company understands the issue, but evidence or ownership is inconsistent; and 2 - Reproducible: definitions, evidence, owners, and source data are documented."
        )}
      </p>
      <table>
        <thead>
          <tr>
            <th>{t("Category")}</th>
            <th>{t("Score 0-2")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{t("Customer-problem evidence")}</td>
            <td />
          </tr>
          <tr>
            <td>{t("Revenue and metric reliability")}</td>
            <td />
          </tr>
          <tr>
            <td>{t("Repeatability of customer acquisition")}</td>
            <td />
          </tr>
          <tr>
            <td>{t("Process and ownership clarity")}</td>
            <td />
          </tr>
          <tr>
            <td>{t("System and data reliability")}</td>
            <td />
          </tr>
          <tr>
            <td>{t("Risk visibility")}</td>
            <td />
          </tr>
          <tr>
            <td>{t("Use-of-funds logic")}</td>
            <td />
          </tr>
          <tr>
            <td><strong>{t("Total")}</strong></td>
            <td><strong>{t("/14")}</strong></td>
          </tr>
        </tbody>
      </table>

      <h3>{t("How to interpret the result")}</h3>
      <p>
        <strong>{t("0-5: Narrative-led")}</strong>
      </p>
      <p>
        {t(
          "The fundraising story depends heavily on confidence and future assumptions. Core evidence should be developed before broad outreach."
        )}
      </p>
      <p>
        <strong>{t("6-10: Partially evidenced")}</strong>
      </p>
      <p>
        {t(
          "The company has real signals but may face problems during diligence because metrics, ownership, or systems are inconsistent."
        )}
      </p>
      <p>
        <strong>{t("11-14: Operationally explainable")}</strong>
      </p>
      <p>
        {t(
          "The company can reproduce much of the evidence behind its story. Remaining risks should still be disclosed and tested."
        )}
      </p>
      <p>{t("A high score does not guarantee investment.")}</p>
      <p>{t("A low score does not mean the company is uninvestable.")}</p>
      <p>
        {t(
          "The score identifies where an investor conversation may expose uncertainty that management has not yet structured."
        )}
      </p>

      {/* -- Five red flags to resolve before the first serious meeting */}
      <h2>
        {t(
          "Five red flags to resolve before the first serious meeting"
        )}
      </h2>

      <h3>
        {t(
          "The number changes depending on who opens the dashboard"
        )}
      </h3>
      <p>
        {t(
          "This usually indicates conflicting definitions, data sources, filters, or reporting dates."
        )}
      </p>

      <h3>
        {t(
          "Only one person knows how a critical process works"
        )}
      </h3>
      <p>
        {t(
          "That person may be an expert. They are also a single point of failure."
        )}
      </p>

      <h3>
        {t(
          "The growth plan assumes that more people will fix an unclear process"
        )}
      </h3>
      <p>
        {t(
          "Additional headcount often increases the cost of unclear ownership."
        )}
      </p>

      <h3>
        {t(
          "The use-of-funds plan is disconnected from current bottlenecks"
        )}
      </h3>
      <p>
        {t(
          "Capital should address a validated constraint, not a generic growth ambition."
        )}
      </p>

      <h3>
        {t(
          "The investor identifies a material risk before management mentions it"
        )}
      </h3>
      <p>
        {t(
          "The risk itself may be acceptable. The lack of visibility is harder to explain."
        )}
      </p>

      {/* -- What to prepare before investor outreach --------------- */}
      <h2>{t("What to prepare before investor outreach")}</h2>
      <p>
        {t("A practical preparation package may include:")}{" "}
        <strong>{t("Problem and evidence summary.")}</strong>{" "}
        {t(
          "What has been validated, what remains uncertain, and what changed after customer feedback."
        )}
      </p>
      <p>
        <strong>{t("Metric-definition register.")}</strong>{" "}
        {t(
          "Clear definitions, source systems, owners, and reconciliation rules for core numbers."
        )}
      </p>
      <p>
        <strong>{t("Revenue-process map.")}</strong>{" "}
        {t(
          "Acquisition channels, qualification, pipeline stages, handoffs, onboarding, and renewal."
        )}
      </p>
      <p>
        <strong>{t("Operating-model map.")}</strong>{" "}
        {t(
          "Major decisions, process owners, recurring exceptions, and founder dependencies."
        )}
      </p>
      <p>
        <strong>{t("Critical-systems map.")}</strong>{" "}
        {t(
          "CRM, finance, delivery, reporting, integrations, permissions, and system ownership."
        )}
      </p>
      <p>
        <strong>{t("Risk register.")}</strong>{" "}
        {t(
          "Material commercial, operational, technological, and organizational risks."
        )}
      </p>
      <p>
        <strong>{t("Use-of-funds dependency map.")}</strong>{" "}
        {t(
          "Which bottleneck each investment addresses and which milestone should follow."
        )}
      </p>
      <p>
        <strong>{t("Prioritized remediation roadmap.")}</strong>{" "}
        {t(
          "What must be fixed before outreach, during diligence, and after financing."
        )}
      </p>
      <p>
        {t(
          "These materials do more than support fundraising."
        )}
      </p>
      <p>
        {t(
          "They help management determine whether the business is ready to absorb additional capital without amplifying existing weaknesses."
        )}
      </p>

      {/* -- Capital is a multiplier ------------------------------- */}
      <h2>{t("Capital is a multiplier")}</h2>
      <p>
        {t(
          "Investment can accelerate a repeatable customer-acquisition system."
        )}
      </p>
      <p>{t("It can also accelerate an unreliable one.")}</p>
      <p>{t("It can expand a clear operating model.")}</p>
      <p>
        {t(
          "It can also add more people, tools, and approvals to a system that nobody fully understands."
        )}
      </p>
      <p>
        {t(
          "The strongest preparation is therefore not a more confident presentation. It is a business whose central claims can be traced to customers, contracts, processes, systems, and reproducible data."
        )}
      </p>
      <p>{t("An idea can begin the conversation.")}</p>
      <p>
        {t("Operating evidence gives the conversation somewhere to go.")}
      </p>

      {/* -- Before entering diligence ----------------------------- */}
      <h2>{t("Before entering diligence")}</h2>
      <p>
        {t(
          "If your leadership team cannot determine whether the main readiness gap is in revenue reporting, process ownership, CRM structure, system risk, or operational capacity, begin with a"
        )}{" "}
        <Link href="/#diagnostic-request-form">
          {t("Business & IT Diagnostic")}
        </Link>
        {t(".")}
      </p>
      <p>
        {t(
          "The objective is not to manufacture a better fundraising story."
        )}
      </p>
      <p>
        {t(
          "It is to identify which parts of the story the business can already prove - and which parts still require operational work. Our"
        )}{" "}
        <Link href="/services/process-operations">
          {t("Process & Operations consulting")}
        </Link>{" "}
        {t("and")}{" "}
        <Link href="/services/revops-crm-consulting">
          {t("RevOps & CRM consulting")}
        </Link>{" "}
        {t(
          "help B2B teams turn operational gaps into documented, investor-ready evidence."
        )}
      </p>
      <p>
        <strong>
          <Link href="/#diagnostic-request-form">
            {t("Request a Business & IT Diagnostic")}
          </Link>
        </strong>
      </p>
      <p>
        <em>
          {t(
            "This article provides general business and operational information. It does not constitute investment, legal, financial, accounting, or tax advice."
          )}
        </em>
      </p>
    </BlogPostLayout>
  );
}

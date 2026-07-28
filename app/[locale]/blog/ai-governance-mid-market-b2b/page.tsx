import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor } from "@/lib/i18n";
import { getT } from "@/i18n/t";
import { Link } from "@/i18n/navigation";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import { BLOG_POSTS } from "@/components/blog/blogData";

const post = BLOG_POSTS.find((p) => p.slug === "ai-governance-mid-market-b2b")!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  return {
    title: "AI Governance for Mid-Market B2B Companies | Opsfield Systems",
    description:
      "Build a practical AI governance model covering ownership, data, vendors, evaluation, approvals, incidents, and model changes - without enterprise bureaucracy.",
    alternates: alternatesFor(loc, "/blog/ai-governance-mid-market-b2b"),
    robots: robotsFor(loc),
  };
}

export default async function AIGovernanceMidMarket({
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
          "Most growing companies make one of two AI-governance mistakes."
        )}
      </p>
      <p>
        {t(
          "The first is to create almost no governance."
        )}
      </p>
      <p>
        {t(
          "Employees open individual AI accounts, upload documents, connect browser extensions, generate customer communications, and automate work without a shared inventory or review process."
        )}
      </p>
      <p>
        {t(
          "The second is to copy an enterprise governance framework designed for a global regulated organization."
        )}
      </p>
      <p>
        {t(
          "A committee is created. Every experiment requires several approvals. Documentation grows faster than implementation. Teams eventually bypass the process because it cannot support normal operating speed."
        )}
      </p>
      <p>
        {t("Neither approach is effective.")}
      </p>
      <p>
        {t(
          "A B2B company with 50-250 employees does not need a thirty-person AI council."
        )}
      </p>
      <p>
        {t(
          "It does need to know: which AI systems are being used; who owns each system; which data enters it; what decisions or actions it affects; how it was tested; which failures require escalation; and what happens when the model, vendor, or workflow changes."
        )}
      </p>
      <p>
        <strong>
          {t(
            "AI governance is not a document that says employees should use AI responsibly. It is the operating system through which the company approves, controls, measures, changes, and retires AI use cases."
          )}
        </strong>
      </p>
      <p>
        {t(
          "A practical minimum governance model contains ten controls: an inventory of AI systems and use cases; one accountable business owner per system; risk classification based on impact and autonomy; rules for data and vendor use; defined evaluation before production; permissions and human-approval boundaries; monitoring of quality, cost, and incidents; an escalation and shutdown process; change control for models, prompts, tools, and data; and periodic review and retirement of obsolete systems."
        )}
      </p>
      <p>
        {t(
          "NIST structures AI risk management around four functions:"
        )}{" "}
        <strong>{t("Govern, Map, Measure, and Manage")}</strong>
        {t(
          ". Its framework is voluntary and designed to be adaptable to organizations of different sizes and sectors. The Generative AI Profile extends that approach with attention to governance, pre-deployment testing, provenance, and incident disclosure."
        )}{" "}
        (
        <a
          href="https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("NIST Publications")}
        </a>
        )
      </p>
      <p>
        {t(
          "For a mid-market company, these principles should be translated into lightweight operating controls rather than copied as a large compliance program."
        )}
      </p>

      {/* -- Start with an inventory ------------------------------ */}
      <h2>{t("Start with an inventory")}</h2>
      <p>
        {t(
          "A company cannot govern systems it does not know exist."
        )}
      </p>
      <p>
        {t(
          "The inventory should include more than centrally purchased platforms. It should cover embedded AI inside existing SaaS; employee-created assistants; API-based automations; customer-facing chat or search; AI-generated reporting; agents connected to business tools; document-processing workflows; scoring and recommendation systems; and experimental pilots using company information."
        )}
      </p>

      <h3>{t("What the inventory should contain")}</h3>
      <table>
        <thead>
          <tr>
            <th>{t("Field")}</th>
            <th>{t("What to record")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>{t("System or use case")}</strong></td>
            <td>{t("What the AI does")}</td>
          </tr>
          <tr>
            <td><strong>{t("Business owner")}</strong></td>
            <td>{t("Who is accountable for the outcome")}</td>
          </tr>
          <tr>
            <td><strong>{t("Technical owner")}</strong></td>
            <td>{t("Who operates or supports it")}</td>
          </tr>
          <tr>
            <td><strong>{t("Users")}</strong></td>
            <td>{t("Employees, customers, vendors, or the public")}</td>
          </tr>
          <tr>
            <td><strong>{t("Provider and model")}</strong></td>
            <td>{t("Which external or internal components are used")}</td>
          </tr>
          <tr>
            <td><strong>{t("Data")}</strong></td>
            <td>{t("What information is sent, retrieved, stored, or generated")}</td>
          </tr>
          <tr>
            <td><strong>{t("Output")}</strong></td>
            <td>{t("Draft, recommendation, decision, or autonomous action")}</td>
          </tr>
          <tr>
            <td><strong>{t("Integrations")}</strong></td>
            <td>{t("Systems the AI can read or change")}</td>
          </tr>
          <tr>
            <td><strong>{t("Risk tier")}</strong></td>
            <td>{t("Operational impact if it is wrong or unavailable")}</td>
          </tr>
          <tr>
            <td><strong>{t("Approval status")}</strong></td>
            <td>{t("Pilot, restricted production, production, suspended")}</td>
          </tr>
          <tr>
            <td><strong>{t("Last review")}</strong></td>
            <td>{t("When the system was last reassessed")}</td>
          </tr>
          <tr>
            <td><strong>{t("Fallback")}</strong></td>
            <td>{t("How the process operates without the AI")}</td>
          </tr>
        </tbody>
      </table>
      <p>
        {t("A spreadsheet may be sufficient initially.")}
      </p>
      <p>
        {t(
          "The value comes from ownership and review, not from purchasing a governance platform."
        )}
      </p>

      {/* -- Classify the use case --------------------------------- */}
      <h2>{t("Classify the use case, not only the model")}</h2>
      <p>
        {t(
          "The same model can create very different levels of risk."
        )}
      </p>
      <p>
        {t(
          "Using an LLM to rewrite an internal meeting note is not equivalent to using it to approve a refund; rank job applicants; change customer entitlements; send contractual language; modify financial records; and provide customer-specific advice."
        )}
      </p>
      <p>{t("Risk depends on the complete use case:")}</p>
      <blockquote>
        <strong>
          {t(
            "Model + data + user + decision + integration + autonomy + consequence"
          )}
        </strong>
      </blockquote>

      <h3>{t("A proportionate risk model")}</h3>
      <table>
        <thead>
          <tr>
            <th>{t("Tier")}</th>
            <th>{t("Typical use")}</th>
            <th>{t("Minimum control")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>{t("Tier 1: Assistive")}</strong></td>
            <td>{t("Internal drafts, brainstorming, non-sensitive summarization")}</td>
            <td>{t("Approved tools, basic data rules, employee accountability")}</td>
          </tr>
          <tr>
            <td><strong>{t("Tier 2: Operational support")}</strong></td>
            <td>{t("Classification, search, routing, customer-response drafts")}</td>
            <td>{t("Named owner, evaluation set, logging, human review")}</td>
          </tr>
          <tr>
            <td><strong>{t("Tier 3: Material recommendation")}</strong></td>
            <td>{t("Pricing recommendations, qualification, financial or contractual analysis")}</td>
            <td>{t("Formal approval, documented evidence, restricted access, recurring testing")}</td>
          </tr>
          <tr>
            <td><strong>{t("Tier 4: Autonomous high-impact action")}</strong></td>
            <td>{t("Payments, access changes, binding communication, employment or safety-critical action")}</td>
            <td>{t("Executive risk acceptance, strong technical controls, explicit human approval or prohibition")}</td>
          </tr>
        </tbody>
      </table>
      <p>
        {t(
          "The classification should consider impact of an incorrect result; reversibility; number of affected people or records; data sensitivity; degree of autonomy; visibility of failure; dependence on third parties; and ability to fall back to a manual process."
        )}
      </p>
      <p>
        {t(
          "A high-performing model does not make a high-impact use case low-risk."
        )}
      </p>

      {/* -- Assign one business owner ----------------------------- */}
      <h2>{t("Assign one business owner")}</h2>
      <p>{t("The AI team may build the solution.")}</p>
      <p>{t("IT may operate the infrastructure.")}</p>
      <p>{t("Security may assess technical controls.")}</p>
      <p>{t("A vendor may provide the model.")}</p>
      <p>
        {t(
          "None of these automatically owns the business result."
        )}
      </p>
      <p>
        {t(
          "For every system, one person should be accountable for intended use; success criteria; acceptable error; exception handling; approval rules; user training; incident response; continued business value; and the decision to change or stop the system."
        )}
      </p>

      <h3>{t("In practice")}</h3>
      <p>
        {t(
          "For an AI system that qualifies leads:"
        )}{" "}
        <strong>{t("Sales Operations")}</strong>{" "}
        {t("may own the business outcome;")}{" "}
        <strong>{t("IT")}</strong>{" "}
        {t("may own platform access;")}{" "}
        <strong>{t("Security")}</strong>{" "}
        {t("may review permissions;")}{" "}
        <strong>{t("Data or RevOps")}</strong>{" "}
        {t("may own the evaluation dataset; and")}{" "}
        <strong>{t("The vendor")}</strong>{" "}
        {t("may operate the underlying model.")}
      </p>
      <p>
        {t(
          "But one named business owner must decide what \"qualified\" means and accept responsibility for the resulting process."
        )}
      </p>
      <p>
        {t(
          "\"AI owns the decision\" is never an accountability model."
        )}
      </p>

      {/* -- Establish data-handling rules -------------------------- */}
      <h2>{t("Establish data-handling rules")}</h2>
      <p>
        {t(
          "Employees frequently interpret an approved AI tool as approval to enter any company information into it."
        )}
      </p>
      <p>{t("These are separate decisions.")}</p>
      <p>
        {t(
          "The policy should distinguish public information; ordinary internal information; confidential business information; personal information; customer-controlled information; credentials and secrets; and legally restricted or contractually protected information."
        )}
      </p>
      <p>
        {t(
          "For each category, state whether it may be entered manually; uploaded; retrieved through an integration; retained in logs; used to improve a provider's services; processed only under a separate agreement; and prohibited entirely."
        )}
      </p>
      <p>
        {t(
          "The policy must also reflect what the system actually does."
        )}
      </p>
      <p>
        {t(
          "A chatbot used through a browser and an API integration connected to a CRM may have different data flows even when they use the same provider."
        )}
      </p>

      {/* -- Vendor review ----------------------------------------- */}
      <h2>{t("Vendor review is more than reading the security page")}</h2>
      <p>
        {t(
          "A provider's marketing material does not replace due diligence."
        )}
      </p>
      <p>{t("The review should address:")}</p>
      <table>
        <thead>
          <tr>
            <th>{t("Area")}</th>
            <th>{t("Question")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>{t("Data flow")}</strong></td>
            <td>{t("What data leaves the company and where does it go?")}</td>
          </tr>
          <tr>
            <td><strong>{t("Retention")}</strong></td>
            <td>{t("How long are inputs, outputs, files, and logs retained?")}</td>
          </tr>
          <tr>
            <td><strong>{t("Training and improvement")}</strong></td>
            <td>{t("Under which product terms may data be used?")}</td>
          </tr>
          <tr>
            <td><strong>{t("Subprocessors")}</strong></td>
            <td>{t("Which other parties participate?")}</td>
          </tr>
          <tr>
            <td><strong>{t("Access")}</strong></td>
            <td>{t("Can provider personnel access customer data?")}</td>
          </tr>
          <tr>
            <td><strong>{t("Security")}</strong></td>
            <td>{t("What controls and independent assessments exist?")}</td>
          </tr>
          <tr>
            <td><strong>{t("Model changes")}</strong></td>
            <td>{t("Can behavior change without customer approval?")}</td>
          </tr>
          <tr>
            <td><strong>{t("Availability")}</strong></td>
            <td>{t("What happens when the service fails or rate-limits requests?")}</td>
          </tr>
          <tr>
            <td><strong>{t("Portability")}</strong></td>
            <td>{t("Can prompts, outputs, configurations, and source data be exported?")}</td>
          </tr>
          <tr>
            <td><strong>{t("Termination")}</strong></td>
            <td>{t("What happens to data and workflows when the contract ends?")}</td>
          </tr>
        </tbody>
      </table>
      <p>
        {t(
          "Not every low-risk tool requires a months-long procurement process."
        )}
      </p>
      <p>
        {t(
          "But high-impact systems should not enter production because a vendor gave a convincing demonstration."
        )}
      </p>

      {/* -- Define success before the pilot ----------------------- */}
      <h2>{t("Define success before the pilot")}</h2>
      <p>
        {t(
          "A pilot without acceptance criteria usually produces an ambiguous result."
        )}
      </p>
      <p>
        {t(
          "Participants say: the outputs looked useful; the model felt intelligent; several tasks were faster; and some responses needed correction."
        )}
      </p>
      <p>
        {t(
          "None of these statements supports a production decision."
        )}
      </p>
      <p>
        {t(
          "Define the business task; the baseline; the evaluation dataset; required quality; prohibited failures; human-review effort; latency; operating cost; escalation criteria; pilot duration; and production decision rule."
        )}
      </p>

      <h3>{t("What to measure")}</h3>
      <table>
        <thead>
          <tr>
            <th>{t("Metric")}</th>
            <th>{t("What it shows")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>{t("Task success rate")}</strong></td>
            <td>{t("Percentage of business tasks completed correctly")}</td>
          </tr>
          <tr>
            <td><strong>{t("Human correction rate")}</strong></td>
            <td>{t("How often employees must repair the output")}</td>
          </tr>
          <tr>
            <td><strong>{t("Escalation rate")}</strong></td>
            <td>{t("How often the system cannot complete the task safely")}</td>
          </tr>
          <tr>
            <td><strong>{t("Unsupported-claim rate")}</strong></td>
            <td>{t("Frequency of statements not grounded in approved evidence")}</td>
          </tr>
          <tr>
            <td><strong>{t("Prohibited-action rate")}</strong></td>
            <td>{t("Whether the system crosses policy boundaries")}</td>
          </tr>
          <tr>
            <td><strong>{t("Cost per completed task")}</strong></td>
            <td>{t("Full AI and review cost per useful outcome")}</td>
          </tr>
          <tr>
            <td><strong>{t("Cycle-time reduction")}</strong></td>
            <td>{t("Whether the business process actually became faster")}</td>
          </tr>
          <tr>
            <td><strong>{t("Failure visibility")}</strong></td>
            <td>{t("Whether incorrect results are detected before impact")}</td>
          </tr>
        </tbody>
      </table>
      <p>
        {t(
          "A system that saves ten minutes but creates twelve minutes of review has not automated the task."
        )}
      </p>
      <p>{t("It has relocated the work.")}</p>

      {/* -- Human oversight --------------------------------------- */}
      <h2>{t("Human oversight must be operational")}</h2>
      <p>
        {t(
          "\"Human-in-the-loop\" often appears in governance documents without specifying how the human participates."
        )}
      </p>
      <p>
        {t(
          "A functioning review model answers: who reviews; which actions they review; what evidence they see; what constitutes approval; whether parameters may change after approval; what happens when the reviewer does not respond; how urgent cases are escalated; and how review quality is measured."
        )}
      </p>
      <p>
        {t(
          "OWASP's agent-security guidance recommends explicit approval for high-impact or irreversible actions, action previews, risk-based autonomy boundaries, audit trails, interruption, and rollback capabilities."
        )}{" "}
        (
        <a
          href="https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("OWASP Cheat Sheet Series")}
        </a>
        )
      </p>

      <h3>{t("Oversight that exists only on paper")}</h3>
      <blockquote>
        {t(
          "A manager reviews AI decisions when necessary."
        )}
      </blockquote>

      <h3>{t("Oversight that works in practice")}</h3>
      <blockquote>
        {t(
          "Refund recommendations above $250 require approval from the account owner. The approval view must show the customer, amount, source transaction, policy rule, supporting evidence, and exact execution parameters. Approval expires after two hours and cannot be reused if the amount or recipient changes."
        )}
      </blockquote>
      <p>
        {t("The second model can be implemented and audited.")}
      </p>
      <p>{t("The first cannot.")}</p>

      {/* -- Separate recommendation from execution ---------------- */}
      <h2>{t("Separate recommendation from execution")}</h2>
      <p>
        {t(
          "For material operations, the AI should not be the only component deciding and executing the action."
        )}
      </p>
      <p>{t("A safer pattern is:")}</p>
      <ol>
        <li>{t("AI analysis")}</li>
        <li>{t("Structured proposed action")}</li>
        <li>{t("Policy and schema validation")}</li>
        <li>{t("Human or deterministic approval")}</li>
        <li>{t("Restricted execution service")}</li>
        <li>{t("Audit event")}</li>
      </ol>
      <p>{t("This creates independent control points.")}</p>
      <p>
        {t(
          "It also prevents a prompt, retrieved document, or model error from directly becoming a production action."
        )}
      </p>
      <p>
        {t("The system prompt should guide behavior.")}
      </p>
      <p>
        {t(
          "It should not serve as the sole authorization mechanism."
        )}
      </p>

      {/* -- Log enough to investigate ----------------------------- */}
      <h2>{t("Log enough to investigate - but not everything")}</h2>
      <p>
        {t(
          "Governance requires traceability, but indiscriminate logging creates another risk."
        )}
      </p>
      <p>
        {t(
          "Useful records may include use case and task ID; user and agent identity; model and configuration version; approved data sources; retrieved references; selected operation; structured parameters; approval; output status; latency; cost; error; and escalation or override."
        )}
      </p>
      <p>
        {t(
          "Do not automatically store: credentials; complete confidential documents; sensitive customer data; unrestricted prompt histories; and unnecessary personal information."
        )}
      </p>
      <p>
        {t(
          "Logs should make an incident reconstructable without becoming an uncontrolled duplicate of the company's sensitive data."
        )}
      </p>

      {/* -- Prepare for incidents --------------------------------- */}
      <h2>{t("Prepare for incidents before production")}</h2>
      <p>
        {t(
          "An AI incident is not limited to a security breach."
        )}
      </p>
      <p>
        {t(
          "It may include repeated incorrect customer communications; inappropriate data exposure; unexpected autonomous actions; material reporting errors; systematic bias in routing or scoring; uncontrolled cost; model degradation; unavailable vendor service; and corrupted memory or retrieval sources."
        )}
      </p>
      <p>
        {t(
          "The response plan should define who receives the alert; who may suspend the system; how credentials and integrations are revoked; how affected records are identified; whether actions can be reversed; who communicates with customers or partners; what evidence must be preserved; and what conditions allow the system to return."
        )}
      </p>
      <p>
        {t(
          "The NIST Generative AI Profile treats incident disclosure and lifecycle risk management as important parts of responsible deployment rather than post-project administrative work."
        )}{" "}
        (
        <a
          href="https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("NIST Publications")}
        </a>
        )
      </p>

      {/* -- Govern changes ---------------------------------------- */}
      <h2>{t("Govern changes, not only initial launch")}</h2>
      <p>
        {t(
          "An AI system can change without the business workflow appearing to change."
        )}
      </p>
      <p>
        {t(
          "Performance may be affected by: a different model version; a changed system prompt; a new tool; modified permissions; a revised knowledge base; a new embedding or reranking model; changes to business definitions; provider-side updates; new user groups; and expanded autonomy."
        )}
      </p>
      <p>
        {t(
          "Every material change should answer: Does the risk tier change? Must the evaluation suite be rerun? Are previous approvals still valid? Did the data flow change? Did the cost model change? Can the previous version be restored?"
        )}
      </p>
      <p>
        {t(
          "A production approval applies to a tested configuration - not to every future system that carries the same name."
        )}
      </p>

      {/* -- A workable governance model --------------------------- */}
      <h2>{t("A workable governance model")}</h2>
      <p>
        {t(
          "A mid-market organization does not need a large permanent committee."
        )}
      </p>
      <p>{t("It needs clear roles.")}</p>
      <table>
        <thead>
          <tr>
            <th>{t("Role")}</th>
            <th>{t("Responsibility")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>{t("Executive sponsor")}</strong></td>
            <td>{t("Sets risk tolerance and resolves high-impact decisions")}</td>
          </tr>
          <tr>
            <td><strong>{t("Business owner")}</strong></td>
            <td>{t("Owns the process, outcome, and continued value")}</td>
          </tr>
          <tr>
            <td><strong>{t("Technical owner")}</strong></td>
            <td>{t("Operates the system, integrations, versions, and fallback")}</td>
          </tr>
          <tr>
            <td><strong>{t("Security/privacy reviewer")}</strong></td>
            <td>{t("Reviews access, data flow, vendors, and incident controls")}</td>
          </tr>
          <tr>
            <td><strong>{t("Evaluator or data owner")}</strong></td>
            <td>{t("Maintains test cases, evidence, and performance thresholds")}</td>
          </tr>
          <tr>
            <td><strong>{t("Human reviewer")}</strong></td>
            <td>{t("Approves or corrects defined classes of output")}</td>
          </tr>
          <tr>
            <td><strong>{t("Users")}</strong></td>
            <td>{t("Follow approved-use rules and report failures")}</td>
          </tr>
        </tbody>
      </table>
      <p>
        {t(
          "One person may perform several roles in a smaller organization."
        )}
      </p>
      <p>
        {t("The responsibilities should still be explicit.")}
      </p>

      {/* -- How approval should work ------------------------------ */}
      <h2>{t("How approval should work")}</h2>
      <ol>
        <li>{t("Use-case request")}</li>
        <li>{t("Business owner and expected value")}</li>
        <li>{t("Risk classification")}</li>
        <li>{t("Data and vendor review")}</li>
        <li>{t("Limited pilot")}</li>
        <li>{t("Evaluation against acceptance criteria")}</li>
        <li>{t("Restricted production approval")}</li>
        <li>{t("Monitoring and periodic review")}</li>
        <li>{t("Expansion, remediation, suspension, or retirement")}</li>
      </ol>
      <p>
        {t(
          "Low-risk internal uses can pass through this process quickly."
        )}
      </p>
      <p>
        {t(
          "High-impact autonomous systems require more evidence and stronger controls."
        )}
      </p>
      <p>
        {t("Governance should be proportional - not optional.")}
      </p>

      {/* -- Shortcuts that create hidden risk --------------------- */}
      <h2>{t("Shortcuts that create hidden risk")}</h2>

      <h3>
        {t(
          "\"Everyone already uses AI, so banning it is unrealistic\""
        )}
      </h3>
      <p>{t("Correct diagnosis, wrong conclusion.")}</p>
      <p>
        {t(
          "A complete prohibition often drives usage underground. The stronger response is to provide approved tools, clear data rules, and a route for evaluating new use cases."
        )}
      </p>

      <h3>{t("\"The vendor handles governance\"")}</h3>
      <p>
        {t("The vendor may govern its platform.")}
      </p>
      <p>
        {t(
          "It does not own: your process; your data classification; your employee behavior; your integrations; your customer commitments; your approval policy; and your business consequences."
        )}
      </p>

      <h3>
        {t("\"We will add governance after the pilot\"")}
      </h3>
      <p>
        {t(
          "Pilots frequently gain access to production data and systems before being formally called production."
        )}
      </p>
      <p>
        {t(
          "At minimum, ownership, data restrictions, evaluation, credentials, and shutdown must exist before the pilot begins."
        )}
      </p>

      <h3>
        {t("\"The employee reviews every output\"")}
      </h3>
      <p>
        {t(
          "Review does not create control when: the employee does not see the evidence; review time is not budgeted; the action occurs before review; reviewers routinely accept outputs without checking; and accountability remains unclear."
        )}
      </p>

      <h3>{t("\"We have an AI policy\"")}</h3>
      <p>
        {t(
          "A policy that is not connected to inventory, approvals, testing, monitoring, and incidents is a statement of intent - not an operating system."
        )}
      </p>

      {/* -- 30-day minimum implementation plan -------------------- */}
      <h2>{t("A 30-day minimum implementation plan")}</h2>
      <table>
        <thead>
          <tr>
            <th>{t("Period")}</th>
            <th>{t("Deliverable")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>{t("Week 1")}</strong></td>
            <td>{t("Inventory current systems, employee tools, pilots, agents, and embedded AI features")}</td>
          </tr>
          <tr>
            <td><strong>{t("Week 2")}</strong></td>
            <td>{t("Assign owners, classify risk, document data flows and vendor dependencies")}</td>
          </tr>
          <tr>
            <td><strong>{t("Week 3")}</strong></td>
            <td>{t("Define evaluation, approval, access, logging, incident, and change requirements by tier")}</td>
          </tr>
          <tr>
            <td><strong>{t("Week 4")}</strong></td>
            <td>{t("Review highest-risk systems, suspend unsupported uses, approve remediation roadmap")}</td>
          </tr>
        </tbody>
      </table>
      <p>
        {t("The expected result is not a large policy library.")}
      </p>
      <p>
        {t(
          "It is an inventory; a risk map; named ownership; a minimum control standard; a prioritized remediation backlog; and a repeatable approval process."
        )}
      </p>

      {/* -- Where governance creates ROI -------------------------- */}
      <h2>{t("Where governance creates ROI")}</h2>
      <p>
        {t(
          "Governance is often treated only as a risk cost."
        )}
      </p>
      <p>
        {t(
          "Done correctly, it also reduces operating waste by preventing: duplicate AI purchases; endless pilots; uncontrolled API consumption; manual review that eliminates expected savings; vendor lock-in; repeated integration work; deployment of use cases with no measurable value; and incidents that require expensive remediation."
        )}
      </p>
      <p>
        {t("The economic objective is not maximum control.")}
      </p>
      <p>
        {t("It is")}{" "}
        <strong>
          {t(
            "the least expensive control model that keeps the system inside the company's acceptable risk and performance boundaries"
          )}
        </strong>
        {t(".")}
      </p>

      {/* -- What the decision comes down to ----------------------- */}
      <h2>{t("What the decision comes down to")}</h2>
      <p>
        {t(
          "Do not begin by writing a forty-page AI policy."
        )}
      </p>
      <p>
        {t(
          "Begin with five questions: Which AI systems are already influencing work? Which business outcomes do they affect? Who owns those outcomes? What evidence proves that each system is useful and acceptably controlled? Which use cases should be expanded, repaired, restricted, or stopped?"
        )}
      </p>
      <p>
        {t(
          "AI governance should make good systems easier to scale and weak systems easier to reject."
        )}
      </p>
      <p>
        {t(
          "It should not exist to make experimentation impossible."
        )}
      </p>
      <p>
        <strong>
          {t(
            "For a 50-250-person B2B company, the minimum viable governance model is an inventory, risk classification, clear ownership, controlled data and permissions, measurable evaluation, incident readiness, and disciplined change management."
          )}
        </strong>
      </p>
    </BlogPostLayout>
  );
}

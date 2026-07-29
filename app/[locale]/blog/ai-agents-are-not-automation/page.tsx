import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor } from "@/lib/i18n";
import { getT } from "@/i18n/t";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import { BLOG_POSTS } from "@/components/blog/blogData";
import { Link } from "@/i18n/navigation";

const post = BLOG_POSTS.find((p) => p.slug === "ai-agents-are-not-automation")!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  return {
    title:
      "AI Agents Are Not Automation: B2B Readiness",
    description:
      "Learn what processes, permissions, controls, data, and approval rules must exist before an AI agent can safely act inside your business.",
    alternates: alternatesFor(loc, "/blog/ai-agents-are-not-automation"),
    robots: robotsFor(loc),
    openGraph: {
      type: "article",
    },
  };
}

export default async function AIAgentsNotAutomation({
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
      {/* -- Intro -------------------------------------------------- */}
      <p>
        {t(
          "A traditional automation follows instructions."
        )}
      </p>
      <p>
        {t(
          "When a form is submitted, create a CRM record. When an invoice is paid, update the account status. When a contract reaches its renewal date, notify the account manager."
        )}
      </p>
      <p>
        {t(
          "An AI agent works differently."
        )}
      </p>
      <p>
        {t(
          "It may interpret an objective, decide which information it needs, select tools, choose a sequence of actions, evaluate intermediate results, and change its approach before completing the task."
        )}
      </p>
      <p>
        {t(
          "That difference sounds technical. It is actually operational."
        )}
      </p>
      <p>
        {t(
          "The moment software can decide "
        )}
        <strong>{t("how")}</strong>
        {t(
          " to complete a task rather than merely execute a predefined step, the company must answer a new set of questions: What is the agent allowed to decide? Which systems can it access? Which actions require approval? What happens when information is incomplete? Who owns the result? How can an incorrect action be reversed?"
        )}
      </p>
      <p>
        {t(
          "An agent is not simply a smarter version of Zapier."
        )}
      </p>
      <p>
        {t(
          "It is a new participant in the operating model."
        )}
      </p>
      <p>
        {t(
          "Before allowing an AI agent to act inside a business process, eight conditions should exist: the process is understood; a human owner is accountable for the outcome; the required data is accessible and sufficiently reliable; permissions are limited to the minimum necessary; decision boundaries are explicit; high-impact actions require approval; actions and failures are logged; and the company can stop and reverse the agent's work."
        )}
      </p>
      <p>
        {t(
          "If several of these conditions are missing, the immediate task is not agent development."
        )}
      </p>
      <p>
        {t(
          "It is process and system remediation."
        )}
      </p>

      {/* -- Automation, copilots, workflows, and agents ------------ */}
      <h2>
        {t(
          "Automation, copilots, workflows, and agents are not the same thing"
        )}
      </h2>
      <p>
        {t(
          "The market uses the term \"AI agent\" for almost every workflow containing a language model. That makes architecture decisions harder than they need to be."
        )}
      </p>
      <p>
        {t(
          "Anthropic distinguishes workflows, where models and tools follow predefined execution paths, from agents, where the model dynamically directs its own process and tool use. The company also recommends beginning with the simplest architecture that can reliably solve the problem rather than adding autonomy by default."
        )}
        {" ("}
        <a
          href="https://www.anthropic.com/research/building-effective-agents"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("Anthropic")}
        </a>
        {")"}
      </p>
      <p>
        {t("A practical business distinction looks like this:")}
      </p>
      <table>
        <thead>
          <tr>
            <th>{t("System type")}</th>
            <th>{t("How it works")}</th>
            <th>{t("Example")}</th>
            <th>{t("Operational risk")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>{t("Rule-based automation")}</strong>
            </td>
            <td>{t("Executes fixed rules")}</td>
            <td>{t("Create a task after a deal changes stage")}</td>
            <td>{t("Low when rules are correct")}</td>
          </tr>
          <tr>
            <td>
              <strong>{t("Copilot")}</strong>
            </td>
            <td>{t("Produces a recommendation or draft")}</td>
            <td>{t("Draft a reply to a customer")}</td>
            <td>{t("Human remains responsible")}</td>
          </tr>
          <tr>
            <td>
              <strong>{t("LLM workflow")}</strong>
            </td>
            <td>{t("Uses AI inside a predefined sequence")}</td>
            <td>
              {t("Classify request, draft response, route for review")}
            </td>
            <td>{t("Moderate and relatively traceable")}</td>
          </tr>
          <tr>
            <td>
              <strong>{t("AI agent")}</strong>
            </td>
            <td>{t("Selects actions and tools dynamically")}</td>
            <td>
              {t("Investigate an account and determine the next action")}
            </td>
            <td>{t("Higher because behavior can vary")}</td>
          </tr>
          <tr>
            <td>
              <strong>{t("Multi-agent system")}</strong>
            </td>
            <td>{t("Several agents delegate or coordinate tasks")}</td>
            <td>
              {t(
                "Research, analysis, compliance review, and execution"
              )}
            </td>
            <td>{t("Highest coordination and trust complexity")}</td>
          </tr>
        </tbody>
      </table>
      <p>
        {t(
          "The distinction matters because each step toward autonomy increases the number of possible execution paths."
        )}
      </p>
      <p>
        {t(
          "A fixed workflow may fail in three predictable places."
        )}
      </p>
      <p>
        {t(
          "An agent may fail during interpretation, planning, retrieval, tool selection, argument generation, permission handling, verification, retry, escalation, or execution."
        )}
      </p>
      <p>
        {t(
          "More autonomy creates more potential value - but also more ways to be wrong."
        )}
      </p>

      {/* -- The most common mistake -------------------------------- */}
      <h2>
        {t(
          "The most common mistake: giving an agent an unclear process"
        )}
      </h2>
      <p>
        {t(
          "Consider a company that wants an agent to qualify inbound leads."
        )}
      </p>
      <p>
        {t("The requested workflow sounds simple:")}
      </p>
      <blockquote>
        <p>
          {t(
            "Review each lead, determine whether it is qualified, update the CRM, and prepare the next communication."
          )}
        </p>
      </blockquote>
      <p>
        {t(
          "But discovery reveals that: marketing and sales use different definitions of a qualified lead; several CRM fields are optional or outdated; account ownership rules contain undocumented exceptions; strategic leads are handled differently; the current process depends on a sales manager's judgment; and nobody measures how many qualified leads are incorrectly rejected."
        )}
      </p>
      <p>
        {t("The agent cannot solve this ambiguity.")}
      </p>
      <p>
        {t(
          "It will turn ambiguity into automated inconsistency."
        )}
      </p>
      <p>
        {t(
          "If trained or prompted using historical CRM decisions, it may also reproduce the same undocumented habits that created the problem."
        )}
      </p>
      <p>
        {t(
          "Model capability is not the limiting factor here."
        )}
      </p>
      <p>
        {t(
          "The company has not yet defined what a correct decision looks like."
        )}
      </p>

      {/* -- What agent readiness looks like ------------------------ */}
      <h2>{t("What agent readiness looks like")}</h2>
      <p>
        {t(
          "Agent readiness should be assessed across eight connected areas."
        )}
      </p>

      {/* Process */}
      <h3>{t("Process")}</h3>
      <p>
        {t(
          "The current workflow must be visible before it can be delegated."
        )}
      </p>
      <p>
        {t(
          "Document the trigger; the expected output; the normal path; common exceptions; required inputs; completion criteria; and upstream and downstream dependencies."
        )}
      </p>
      <p>
        {t(
          "A process does not need to be perfect. It does need to be understandable."
        )}
      </p>
      <p>
        <strong>{t("Red flag:")}</strong>{" "}
        {t(
          "two experienced employees describe materially different versions of the same workflow."
        )}
      </p>

      {/* Ownership */}
      <h3>{t("Ownership")}</h3>
      <p>
        {t(
          "Every automated process needs one accountable business owner."
        )}
      </p>
      <p>
        {t(
          "This person does not have to review every action. They must own: the definition of success; exception policy; approval rules; performance review; incident escalation; and decisions about changing or disabling the agent."
        )}
      </p>
      <p>
        {t(
          "\"IT owns the system\" is not sufficient when the agent performs a sales, finance, HR, or customer-service process."
        )}
      </p>
      <p>
        {t("IT may own the platform.")}
      </p>
      <p>
        {t("The business function owns the outcome.")}
      </p>

      {/* Data */}
      <h3>{t("Data")}</h3>
      <p>
        {t(
          "The agent must know: which sources are authoritative; which fields are required; how recent the data must be; how conflicting records are handled; what information the agent must not use; and what happens when evidence is missing."
        )}
      </p>
      <p>
        {t(
          "Giving an agent access to more data does not automatically improve performance."
        )}
      </p>
      <p>
        {t(
          "Access to duplicated, outdated, contradictory, or permission-inappropriate information can make results worse."
        )}
      </p>
      <p>
        <strong>{t("Red flag:")}</strong>{" "}
        {t(
          "the team cannot identify a source of truth for the main decision the agent is expected to make."
        )}
      </p>

      {/* Permissions */}
      <h3>{t("Permissions")}</h3>
      <p>
        {t(
          "An agent should receive the minimum access required for its task."
        )}
      </p>
      <p>
        {t(
          "OWASP's current agent-security guidance emphasizes least privilege, isolation of tools and contexts, human approval for high-risk actions, structured validation, execution limits, and separation between decision-making and irreversible operations."
        )}
        {" ("}
        <a
          href="https://cheatsheetseries.owasp.org/cheatsheets/AI_Agent_Security_Cheat_Sheet.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("OWASP Cheat Sheet Series")}
        </a>
        {")"}
      </p>
      <p>
        {t(
          "Do not give an agent broad administrator credentials because narrowing permissions takes additional engineering effort."
        )}
      </p>
      <p>
        {t(
          "Instead, separate tools by capability: read customer record; create draft; update non-critical field; request approval; send approved communication; and issue refund within a defined limit."
        )}
      </p>
      <p>
        {t(
          "The agent should not receive a generic tool named "
        )}
        <code>manage_customer_account</code>
        {t(
          " when the business can expose narrower, auditable operations."
        )}
      </p>

      {/* Decision boundaries */}
      <h3>{t("Decision boundaries")}</h3>
      <p>
        {t(
          "The company must distinguish between: what the agent may infer; what it may recommend; what it may change; what requires confirmation; and what it must never do."
        )}
      </p>
      <p>
        {t(
          "For example, an agent may be allowed to classify an inquiry; identify missing information; recommend the next step; and draft a response."
        )}
      </p>
      <p>
        {t(
          "It may be prohibited from: changing contractual terms; approving credit; deleting records; making employment decisions; sending legally significant communications; and overriding access restrictions."
        )}
      </p>
      <p>
        {t(
          "Decision boundaries should be enforced in tools and permissions, not merely written into the prompt."
        )}
      </p>

      {/* Human approval */}
      <h3>{t("Human approval")}</h3>
      <p>
        {t(
          "\"Human-in-the-loop\" is not a button."
        )}
      </p>
      <p>
        {t(
          "The company must define who reviews the action; what information the reviewer sees; how much time they have; whether approval expires; whether changed parameters require new approval; what happens when nobody responds; and how urgent cases are escalated."
        )}
      </p>
      <p>
        {t(
          "A reviewer who receives a vague message saying \"Approve agent action?\" is not exercising meaningful oversight."
        )}
      </p>
      <p>
        {t(
          "The approval interface should show: the proposed action; the relevant evidence; the affected record; material consequences; confidence or uncertainty; and the exact parameters that will be executed."
        )}
      </p>

      {/* Logging and observability */}
      <h3>{t("Logging and observability")}</h3>
      <p>
        {t(
          "A production agent should leave enough evidence to reconstruct what happened."
        )}
      </p>
      <p>
        {t(
          "Useful records include user or system request; agent and model version; instructions and policy version; retrieved sources; selected tool; tool arguments; permission scope; approval event; output; retries; errors; duration; estimated cost; and final status."
        )}
      </p>
      <p>
        {t(
          "Agent platforms increasingly treat traces, execution logs, token usage, errors, and latency as core lifecycle controls rather than optional debugging features."
        )}
        {" ("}
        <a
          href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/agents"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("Google Cloud Documentation")}
        </a>
        {")"}
      </p>
      <p>
        {t(
          "A final text response is not an adequate audit trail."
        )}
      </p>

      {/* Rollback and shutdown */}
      <h3>{t("Rollback and shutdown")}</h3>
      <p>
        {t(
          "Before deployment, the team should know how to suspend the agent; revoke its credentials; stop active executions; identify affected records; reverse reversible changes; isolate failed integrations; restore the previous workflow; and notify process owners."
        )}
      </p>
      <p>
        {t(
          "A kill switch that requires an engineer to deploy new code is not an effective operational control."
        )}
      </p>

      {/* -- Choosing the right level of autonomy ------------------- */}
      <h2>{t("Choosing the right level of autonomy")}</h2>
      <p>
        {t(
          "The right question is not whether a process should be \"automated with an agent.\""
        )}
      </p>
      <p>
        {t(
          "The right question is how much autonomy the process can safely support."
        )}
      </p>
      <table>
        <thead>
          <tr>
            <th>{t("Level")}</th>
            <th>{t("Agent behavior")}</th>
            <th>{t("Appropriate use")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>{t("1. Recommend")}</strong>
            </td>
            <td>
              {t("Analyzes information and proposes an action")}
            </td>
            <td>
              {t(
                "New, ambiguous, high-risk, or poorly measured processes"
              )}
            </td>
          </tr>
          <tr>
            <td>
              <strong>{t("2. Act after approval")}</strong>
            </td>
            <td>
              {t(
                "Prepares and executes an action only after confirmation"
              )}
            </td>
            <td>
              {t(
                "Repeatable processes with material but reviewable consequences"
              )}
            </td>
          </tr>
          <tr>
            <td>
              <strong>{t("3. Bounded autonomy")}</strong>
            </td>
            <td>
              {t("Executes independently within explicit limits")}
            </td>
            <td>
              {t(
                "Stable, high-volume, reversible, measurable tasks"
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        {t(
          "A company can begin at Level 1 and increase autonomy only after collecting evidence."
        )}
      </p>
      <p>
        {t(
          "That is usually safer than starting with broad autonomy and removing permissions after an incident."
        )}
      </p>

      {/* -- Example: an AI agent for inbound leads ----------------- */}
      <h2>{t("Example: an AI agent for inbound leads")}</h2>
      <p>
        {t("Suppose the goal is to shorten lead-response time.")}
      </p>
      <p>
        {t(
          "A weak implementation might give the agent full CRM and email access and ask it to \"qualify and contact new leads.\""
        )}
      </p>
      <p>
        {t(
          "A stronger architecture separates the workflow:"
        )}
      </p>
      <ol>
        <li>
          {t("Read the new lead and permitted CRM data")}
        </li>
        <li>
          {t("Check whether required information is present")}
        </li>
        <li>
          {t("Apply documented qualification criteria")}
        </li>
        <li>
          {t("Identify uncertainty or conflicting evidence")}
        </li>
        <li>
          {t(
            "Assign one of three outcomes: clearly unqualified; review required; and likely qualified"
          )}
        </li>
        <li>{t("Prepare a CRM update")}</li>
        <li>{t("Draft a personalized email")}</li>
        <li>{t("Request approval before sending")}</li>
        <li>
          {t("Log the evidence, decision, and reviewer")}
        </li>
        <li>
          {t("Escalate strategic or unusual accounts")}
        </li>
      </ol>
      <p>
        {t(
          "Only after the team demonstrates reliable performance might the agent receive permission to send communications for a narrow category of routine leads."
        )}
      </p>
      <p>
        {t(
          "The process becomes more autonomous because evidence justifies the change - not because the model vendor released a new version."
        )}
      </p>

      {/* -- When an agent is the wrong solution -------------------- */}
      <h2>{t("When an agent is the wrong solution")}</h2>
      <p>
        {t("Do not begin with an agent when:")}
      </p>
      <ul>
        <li>{t("A deterministic rule can solve the task")}</li>
        <li>{t("The process changes every week")}</li>
        <li>{t("Nobody owns the outcome")}</li>
        <li>
          {t(
            "Exceptions are handled through undocumented judgment"
          )}
        </li>
        <li>{t("Required data is unavailable")}</li>
        <li>{t("Actions cannot be reversed")}</li>
        <li>
          {t("The team cannot define a correct result")}
        </li>
        <li>{t("Errors would remain invisible")}</li>
        <li>
          {t(
            "The expected task volume does not justify the operating cost"
          )}
        </li>
      </ul>
      <p>
        {t("An agent should earn its complexity.")}
      </p>
      <p>
        {t(
          "A fixed workflow is often cheaper, easier to test, easier to secure, and easier to maintain."
        )}
      </p>

      {/* -- Calculate value at the level of the completed task ----- */}
      <h2>
        {t("Calculate value at the level of the completed task")}
      </h2>
      <p>
        {t(
          "Do not evaluate agent economics using token price alone."
        )}
      </p>
      <p>
        {t("A practical model is:")}
      </p>
      <blockquote>
        <p>
          <strong>{t("Annual Value")}</strong>
          {t(
            " = (Task Volume x Time Saved x Loaded Labor Cost) + Recovered Revenue + Avoided Error Cost"
          )}
        </p>
        <p>
          {t(
            "The review should cover: AI Operating Cost; Human Review Cost; Maintenance Cost; and Expected Failure Cost."
          )}
        </p>
      </blockquote>
      <p>
        {t(
          "A lower-cost model is not economical when it creates more corrections, escalations, retries, or customer-facing errors."
        )}
      </p>
      <p>
        {t(
          "Similarly, saving employee time creates value only when the released capacity is used productively."
        )}
      </p>

      {/* -- Agent readiness checklist ------------------------------ */}
      <h2>{t("Agent readiness checklist")}</h2>
      <p>
        {t(
          "Before approving development, answer the following:"
        )}
      </p>
      <table>
        <thead>
          <tr>
            <th>{t("Question")}</th>
            <th>{t("If the answer is \"no\"")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {t("Can the team map the current process?")}
            </td>
            <td>
              {t(
                "The agent will automate an incomplete understanding"
              )}
            </td>
          </tr>
          <tr>
            <td>
              {t("Is one business owner accountable?")}
            </td>
            <td>
              {t(
                "Failures will become an IT-versus-business dispute"
              )}
            </td>
          </tr>
          <tr>
            <td>
              {t("Is the expected outcome measurable?")}
            </td>
            <td>
              {t("Performance cannot be evaluated")}
            </td>
          </tr>
          <tr>
            <td>
              {t(
                "Are normal cases and exceptions documented?"
              )}
            </td>
            <td>
              {t(
                "Unusual cases will produce unpredictable actions"
              )}
            </td>
          </tr>
          <tr>
            <td>
              {t(
                "Are authoritative data sources identified?"
              )}
            </td>
            <td>
              {t(
                "The agent may act on outdated or conflicting information"
              )}
            </td>
          </tr>
          <tr>
            <td>
              {t(
                "Can permissions be limited by tool and action?"
              )}
            </td>
            <td>
              {t(
                "The potential impact of failure is too broad"
              )}
            </td>
          </tr>
          <tr>
            <td>
              {t("Are approval rules explicit?")}
            </td>
            <td>
              {t(
                "Human oversight will be inconsistent"
              )}
            </td>
          </tr>
          <tr>
            <td>{t("Are actions traceable?")}</td>
            <td>
              {t(
                "Failures cannot be investigated reliably"
              )}
            </td>
          </tr>
          <tr>
            <td>{t("Can changes be reversed?")}</td>
            <td>
              {t(
                "A small error may become a major operational incident"
              )}
            </td>
          </tr>
          <tr>
            <td>
              {t(
                "Is expected value higher than full operating cost?"
              )}
            </td>
            <td>
              {t(
                "The agent is a technology expense, not a business improvement"
              )}
            </td>
          </tr>
        </tbody>
      </table>

      {/* -- What the decision comes down to ----------------------- */}
      <h2>{t("What the decision comes down to")}</h2>
      <p>
        {t(
          "An AI agent should not be approved because the demonstration looked intelligent."
        )}
      </p>
      <p>
        {t(
          "It should be approved when: the process is understood; the boundaries are enforceable; the data is suitable; the economics are credible; the risk is controlled; and the result can be measured."
        )}
      </p>
      <p>
        {t("The safest first question is not:")}
      </p>
      <blockquote>
        <p>
          {t("Which agent platform should we buy?")}
        </p>
      </blockquote>
      <p>{t("It is:")}</p>
      <blockquote>
        <p>
          {t(
            "Which business decision are we prepared to let software make - and what evidence shows that we are ready?"
          )}
        </p>
      </blockquote>
      <p>
        {t("At Fill System, our")}{" "}
        <Link href="/services/ai-process-automation">
          {t("AI & Process Automation consulting")}
        </Link>{" "}
        {t("engagements begin with exactly this kind of readiness assessment — mapping the process, defining decision boundaries, and identifying what must be remediated before an agent can safely operate.")}
      </p>
      <p>
        <strong>
          <Link href="/#diagnostic-request-form">
            {t("Request a free diagnostic")}
          </Link>
        </strong>{" "}
        {t("to find out whether your operations are ready for AI agents — or what needs to change first.")}
      </p>
    </BlogPostLayout>
  );
}

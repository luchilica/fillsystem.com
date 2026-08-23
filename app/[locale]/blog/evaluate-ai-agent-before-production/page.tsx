import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/locales";
import { blogAlternatesFor, robotsFor } from "@/lib/i18n";
import { getT } from "@/i18n/t";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { BLOG_POSTS } from "@/components/blog/blogData";
import { Link } from "@/i18n/navigation";

const post = BLOG_POSTS.find((p) => p.slug === "evaluate-ai-agent-before-production")!;

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
    alternates: blogAlternatesFor(loc, `/blog/${post.slug}`),
    robots: robotsFor(loc, { blog: true }),
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

export default async function EvaluateAIAgent({
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
      heroImage={post.heroImage}
      heroAlt={post.heroAlt ? t(post.heroAlt) : undefined}
      author={post.author}
    >
      {/* -- Intro ------------------------------------------------- */}
      <p>
        {t(
          "An AI agent completes the demo successfully."
        )}
      </p>
      <p>
        {t(
          "It finds the correct account, summarizes the history, updates the CRM, and drafts a useful response."
        )}
      </p>
      <p>
        {t(
          "The team approves the pilot."
        )}
      </p>
      <p>
        {t(
          "Then production introduces conditions that were absent from the demonstration: a required field is missing; two systems disagree; the API times out; the same event is delivered twice; the customer asks an ambiguous question; a document contains a malicious instruction; approval expires while the process continues; and the agent retries an action that already succeeded."
        )}
      </p>
      <p>
        {t(
          "The agent was not necessarily evaluated incorrectly."
        )}
      </p>
      <p>
        {t(
          "It may not have been evaluated at all."
        )}
      </p>
      <p>
        {t(
          "A successful demonstration proves that one execution path can work."
        )}
      </p>
      <p>
        {t(
          "Production readiness requires evidence that the system behaves acceptably across normal, ambiguous, adversarial, and partially failed conditions."
        )}
      </p>
      <p>
        {t(
          "An AI agent should be evaluated at five levels:"
        )}
        {" "}
        <strong>{t("Task outcome")}</strong>{" - "}
        {t("did it complete the business task correctly?")}{" "}
        <strong>{t("Execution trace")}</strong>{" - "}
        {t("did it choose the right tools and actions?")}{" "}
        <strong>{t("Safety and policy")}</strong>{" - "}
        {t("did it remain inside its permissions?")}{" "}
        <strong>{t("Economics")}</strong>{" - "}
        {t("did it complete the task at an acceptable cost and speed?")}{" "}
        <strong>{t("Operational resilience")}</strong>{" - "}
        {t("did it handle missing data, failures, retries, and escalation correctly?")}
      </p>
      <p>
        {t(
          "The unit of evaluation should be the"
        )}{" "}
        <strong>{t("completed business task")}</strong>
        {t(", not the quality of a single model response. Before evaluation begins, the company should confirm that the eight readiness conditions described in our guide to")}
        {" "}
        <Link href="/blog/ai-agents-are-not-automation">{t("why AI agents are not automation")}</Link>
        {t(" are in place -process clarity, ownership, data access, permissions, decision boundaries, approval rules, logging, and rollback.")}
      </p>

      {/* -- Why standard LLM evaluation is not enough ------------- */}
      <h2>{t("Why standard LLM evaluation is not enough")}</h2>
      <p>
        {t(
          "A chatbot may be evaluated mainly on its final answer."
        )}
      </p>
      <p>
        {t(
          "An agent can produce a good final answer while behaving incorrectly during execution."
        )}
      </p>
      <p>
        {t(
          "It may retrieve restricted data; use the wrong tool; send invalid arguments; update the wrong account; repeat an irreversible action; conceal uncertainty; exceed its cost limit; and reach the correct result through an unsafe path."
        )}
      </p>
      <p>
        {t(
          "Agent evaluation therefore has to inspect both the result and the trace that produced it."
        )}
      </p>
      <p>
        {t(
          "Current official evaluation guidance increasingly describes the process as a combination of test-case design, execution, trace generation, scoring, simulation, and failure analysis. Google's agent-evaluation documentation, for example, includes multi-turn scenarios and simulated tool failures such as service errors and latency spikes."
        )}
        {" ("}
        <a
          href="https://docs.google.com/gemini-enterprise-agent-platform/optimize/evaluation/agent-evaluation"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("Google Cloud Documentation")}
        </a>
        {")"}
      </p>

      {/* -- Start with a written task contract -------------------- */}
      <h2>{t("Start with a written task contract")}</h2>
      <p>
        {t(
          "Before creating a test suite, define the task precisely."
        )}
      </p>
      <p>
        {t("A useful task contract includes:")}
      </p>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>{t("Component")}</th>
              <th>{t("Question")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>{t("Trigger")}</strong></td>
              <td>{t("What starts the task?")}</td>
            </tr>
            <tr>
              <td><strong>{t("Goal")}</strong></td>
              <td>{t("What business outcome is expected?")}</td>
            </tr>
            <tr>
              <td><strong>{t("Allowed inputs")}</strong></td>
              <td>{t("Which information may the agent use?")}</td>
            </tr>
            <tr>
              <td><strong>{t("Allowed actions")}</strong></td>
              <td>{t("Which tools and operations are permitted?")}</td>
            </tr>
            <tr>
              <td><strong>{t("Prohibited actions")}</strong></td>
              <td>{t("What must never happen?")}</td>
            </tr>
            <tr>
              <td><strong>{t("Approval requirement")}</strong></td>
              <td>{t("Which actions require confirmation?")}</td>
            </tr>
            <tr>
              <td><strong>{t("Completion criteria")}</strong></td>
              <td>{t("How do we know the task is finished?")}</td>
            </tr>
            <tr>
              <td><strong>{t("Escalation criteria")}</strong></td>
              <td>{t("When must the agent stop and involve a person?")}</td>
            </tr>
            <tr>
              <td><strong>{t("Time limit")}</strong></td>
              <td>{t("How long may the task run?")}</td>
            </tr>
            <tr>
              <td><strong>{t("Cost limit")}</strong></td>
              <td>{t("How much may one execution consume?")}</td>
            </tr>
            <tr>
              <td><strong>{t("Rollback path")}</strong></td>
              <td>{t("How can changes be reversed?")}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        {t(
          "Without this contract, a team may disagree about whether the same agent run was successful."
        )}
      </p>
      <p>
        {t(
          "One person evaluates answer quality."
        )}
      </p>
      <p>
        {t(
          "Another evaluates speed."
        )}
      </p>
      <p>
        {t(
          "Another assumes that updating the CRM was permitted."
        )}
      </p>
      <p>
        {t(
          "The agent cannot be measured against requirements that were never defined."
        )}
      </p>

      {/* -- Evaluate the business result first -------------------- */}
      <h2>{t("Evaluate the business result first")}</h2>
      <p>
        {t(
          "The primary metric is not \"the response sounded good.\""
        )}
      </p>
      <p>
        {t("It is task success.")}
      </p>
      <p>
        {t(
          "Examples: Was the correct customer identified? Was the correct invoice matched? Was the ticket routed to the right queue? Was the requested report generated from the approved data source? Was the record updated accurately? Was the task escalated when evidence was insufficient?"
        )}
      </p>
      <p>
        {t(
          "A task should be marked successful only when all mandatory conditions are satisfied."
        )}
      </p>
      <p>
        {t(
          "For high-impact workflows, partial success may still be failure."
        )}
      </p>
      <p>
        {t(
          "An agent that prepares the correct refund amount but applies it to the wrong account has not achieved 90% success."
        )}
      </p>
      <p>
        {t("It has created an incident.")}
      </p>

      {/* -- Metrics that reveal whether the agent works ----------- */}
      <h2>{t("Metrics that reveal whether the agent works")}</h2>

      <h3>{t("Task success rate")}</h3>
      <p>
        {t(
          "Task Success Rate = Correctly Completed Tasks / Total Evaluated Tasks"
        )}
      </p>
      <p>
        {t(
          "Success criteria should be deterministic where possible."
        )}
      </p>
      <p>
        {t(
          "For example: correct record; correct field value; correct route; correct approval state; no prohibited action; and required evidence attached."
        )}
      </p>

      <h3>{t("Tool-selection accuracy")}</h3>
      <p>
        {t("Did the agent choose the appropriate tool?")}
      </p>
      <p>
        {t(
          "An agent may have access to CRM search; billing lookup; knowledge retrieval; email draft; customer update; and approval request."
        )}
      </p>
      <p>
        {t(
          "Selecting a semantically related but operationally incorrect tool should be counted as an error even when the final output appears reasonable."
        )}
      </p>

      <h3>{t("Tool-argument validity")}</h3>
      <p>
        {t(
          "A correct tool with incorrect parameters is still a failed action."
        )}
      </p>
      <p>
        {t(
          "Evaluate required arguments; account identifiers; dates; amounts; status values; scope; recipient; idempotency key; and approval token."
        )}
      </p>
      <p>
        {t(
          "Structured outputs and schema validation reduce risk, but validation must also verify business meaning."
        )}
      </p>
      <p>
        {t(
          "A syntactically valid amount of $100,000 may still violate the agent's approval limit."
        )}
      </p>

      <h3>{t("Policy-compliance rate")}</h3>
      <p>
        {t(
          "Measure whether the agent: stayed within permitted systems; avoided restricted information; obtained required approval; respected action limits; stopped when evidence was insufficient; avoided prohibited actions; and handled external instructions as untrusted content."
        )}
      </p>
      <p>
        {t(
          "OWASP recommends least privilege, human oversight for high-risk actions, limits on recursion and retries, validation of external inputs, and structured adversarial testing before production."
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
          "For a prohibited irreversible action, the acceptable unauthorized-execution count in testing should be zero."
        )}
      </p>

      <h3>{t("Human-correction rate")}</h3>
      <p>
        {t(
          "Correction Rate = Tasks Requiring Material Human Changes / Tasks Reviewed"
        )}
      </p>
      <p>
        {t(
          "Do not count formatting preferences as material corrections."
        )}
      </p>
      <p>
        {t(
          "Track changes that affect: decision; recipient; amount; classification; evidence; system action; and customer commitment."
        )}
      </p>
      <p>
        {t(
          "A high correction rate means the agent may be shifting work rather than eliminating it."
        )}
      </p>

      <h3>{t("Escalation quality")}</h3>
      <p>
        {t(
          "An agent should not attempt to solve every case."
        )}
      </p>
      <p>
        {t(
          "Evaluate whether it escalates: when required information is missing; when records conflict; when confidence is insufficient; when the action exceeds its authority; when the request is unusual; when tools fail; and when policy interpretation is required."
        )}
      </p>
      <p>
        {t(
          "Both under-escalation and over-escalation matter."
        )}
      </p>
      <p>
        {t("Under-escalation creates risk.")}
      </p>
      <p>
        {t(
          "Over-escalation eliminates the economic value of automation."
        )}
      </p>

      <h3>{t("Duplicate-execution rate")}</h3>
      <p>
        {t(
          "Agents must be tested against repeated messages, retries, and delayed responses."
        )}
      </p>
      <p>
        {t(
          "The system should not: issue two refunds; create two invoices; send duplicate emails; create duplicate CRM records; and reopen a completed task."
        )}
      </p>
      <p>
        {t(
          "Idempotency is not only an integration concern. It is part of agent correctness."
        )}
      </p>

      <h3>{t("Latency and task duration")}</h3>
      <p>
        {t(
          "Measure time to first useful action; total task duration; tool waiting time; number of model iterations; human approval delay; and retry delay."
        )}
      </p>
      <p>
        {t(
          "A task may be accurate but operationally unusable when it takes longer than the manual process."
        )}
      </p>

      <h3>{t("Cost per completed task")}</h3>
      <p>
        {t(
          "Cost per Successful Task = (Model + Tool + Infrastructure + Review Cost) / Successfully Completed Tasks"
        )}
      </p>
      <p>
        {t(
          "Include model calls; retrieval; reranking; external APIs; observability; human review; failed attempts; retries; and engineering support."
        )}
      </p>
      <p>
        {t("Cost per request hides failures.")}
      </p>
      <p>
        {t("Cost per completed task exposes them.")}
      </p>

      {/* -- Build the test suite around failure ------------------- */}
      <h2>{t("Build the test suite around failure, not only success")}</h2>
      <p>
        {t(
          "A representative evaluation suite should contain several scenario classes."
        )}
      </p>

      <h3>{t("Normal cases")}</h3>
      <p>
        {t("Routine tasks with complete, consistent data.")}
      </p>
      <p>
        {t("Purpose: establish baseline performance.")}
      </p>

      <h3>{t("Ambiguous cases")}</h3>
      <p>
        {t("Requests with multiple plausible interpretations.")}
      </p>
      <p>
        {t(
          "Expected behavior: ask for clarification or apply a documented rule."
        )}
      </p>

      <h3>{t("Missing-data cases")}</h3>
      <p>
        {t("Required information is absent.")}
      </p>
      <p>
        {t(
          "Expected behavior: identify the missing evidence and stop or escalate."
        )}
      </p>

      <h3>{t("Conflicting-data cases")}</h3>
      <p>
        {t("CRM, billing, and support systems disagree.")}
      </p>
      <p>
        {t(
          "Expected behavior: follow the source-of-truth policy rather than selecting the most convenient answer."
        )}
      </p>

      <h3>{t("Tool-failure cases")}</h3>
      <p>
        {t(
          "Simulate: timeout; authentication failure; rate limit; malformed response; partial update; and temporary service outage."
        )}
      </p>
      <p>
        {t(
          "Expected behavior: retry only where safe, preserve state, avoid duplicates, and escalate when limits are reached."
        )}
      </p>

      <h3>{t("Duplicate-event cases")}</h3>
      <p>
        {t("Deliver the same trigger more than once.")}
      </p>
      <p>
        {t(
          "Expected behavior: recognize that the task has already been completed."
        )}
      </p>

      <h3>{t("Stale-state cases")}</h3>
      <p>
        {t(
          "Change a record after the agent begins but before it acts."
        )}
      </p>
      <p>
        {t(
          "Expected behavior: revalidate critical data before execution."
        )}
      </p>

      <h3>{t("Adversarial cases")}</h3>
      <p>
        {t(
          "Place malicious or misleading instructions inside: email; PDF; CRM note; webpage; support ticket; and retrieved document."
        )}
      </p>
      <p>
        {t(
          "Expected behavior: treat external content as data, not as authority to override system policy."
        )}
      </p>

      <h3>{t("Unauthorized-request cases")}</h3>
      <p>
        {t(
          "Ask the agent to perform an action outside its permissions."
        )}
      </p>
      <p>
        {t(
          "Expected behavior: refuse or route for authorized approval."
        )}
      </p>

      <h3>{t("Partial-failure cases")}</h3>
      <p>
        {t("The first action succeeds and the second fails.")}
      </p>
      <p>
        {t(
          "Expected behavior: preserve an accurate state, avoid repeating the successful action, and provide a recoverable escalation."
        )}
      </p>

      {/* -- Create risk-based acceptance criteria ----------------- */}
      <h2>{t("Create risk-based acceptance criteria")}</h2>
      <p>
        {t(
          "There should not be one universal performance threshold for every agent."
        )}
      </p>
      <p>
        {t("Classify tasks by potential impact.")}
      </p>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>{t("Risk class")}</th>
              <th>{t("Example")}</th>
              <th>{t("Evaluation priority")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>{t("Low")}</strong></td>
              <td>{t("Internal draft or summary")}</td>
              <td>{t("Usefulness, speed, correction rate")}</td>
            </tr>
            <tr>
              <td><strong>{t("Moderate")}</strong></td>
              <td>{t("CRM classification or task creation")}</td>
              <td>{t("Accuracy, traceability, duplicate prevention")}</td>
            </tr>
            <tr>
              <td><strong>{t("High")}</strong></td>
              <td>{t("Customer communication or account change")}</td>
              <td>{t("Approval, evidence, permissions, rollback")}</td>
            </tr>
            <tr>
              <td><strong>{t("Critical")}</strong></td>
              <td>{t("Payment, legal commitment, employment or access decision")}</td>
              <td>{t("Strong human control or exclusion from autonomy")}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        {t(
          "A high average task-success rate cannot compensate for one critical unauthorized action."
        )}
      </p>
      <p>
        {t(
          "Results should therefore be reported by scenario and severity - not only as one blended percentage."
        )}
      </p>

      {/* -- Log the complete execution trace ---------------------- */}
      <h2>{t("Log the complete execution trace")}</h2>
      <p>
        {t(
          "For every evaluated run, retain: Scenario ID; Input and relevant context; Agent version; Model and configuration; Instruction and policy version; Retrieved evidence; Tool calls and parameters; Permission decisions; Approval requests and responses; Errors and retries; Final action; Duration and cost; Evaluation result; and Failure category."
        )}
      </p>
      <p>
        {t(
          "This creates three benefits: failed behavior can be reproduced; releases can be compared; and previously fixed failures can become regression tests."
        )}
      </p>
      <p>
        {t(
          "NIST's Generative AI profile organizes risk management around the functions Govern, Map, Measure, and Manage. For an agent program, evaluation is the bridge between mapping intended behavior and managing actual production risk."
        )}
        {" ("}
        <a
          href="https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("NIST")}
        </a>
        {")"}
      </p>

      {/* -- Use a staged production rollout ----------------------- */}
      <h2>{t("Use a staged production rollout")}</h2>
      <p>
        {t(
          "Passing an offline test suite is not the end of evaluation."
        )}
      </p>
      <p>
        {t(
          "Production introduces real users, changing data, integrations, latency, unexpected wording, and organizational behavior."
        )}
      </p>
      <p>
        {t("A safer rollout uses four stages.")}
      </p>

      <h3>{t("Shadow mode")}</h3>
      <p>
        {t(
          "The agent evaluates live tasks but cannot act."
        )}
      </p>
      <p>
        {t(
          "Compare its proposed decisions with actual human decisions."
        )}
      </p>
      <p>
        {t(
          "Measure agreement; false positives; false negatives; missing evidence; and escalation behavior."
        )}
      </p>

      <h3>{t("Recommendation mode")}</h3>
      <p>
        {t(
          "The agent presents recommendations to employees."
        )}
      </p>
      <p>
        {t("Humans perform the action.")}
      </p>
      <p>
        {t(
          "This reveals whether the recommendation is useful and whether the agent provides enough evidence."
        )}
      </p>

      <h3>{t("Approval mode")}</h3>
      <p>
        {t(
          "The agent prepares the action and executes it after explicit approval."
        )}
      </p>
      <p>
        {t(
          "Measure approval rate; correction rate; reviewer time; expired approvals; rejected actions; and post-execution errors."
        )}
      </p>

      <h3>{t("Bounded production")}</h3>
      <p>
        {t(
          "The agent acts autonomously only for a narrow, low-risk category."
        )}
      </p>
      <p>
        {t(
          "Use account allowlists; amount limits; tool limits; rate limits; time limits; spend limits; automatic escalation; and immediate shutdown controls."
        )}
      </p>
      <p>
        {t(
          "Autonomy should expand one boundary at a time."
        )}
      </p>

      {/* -- Production monitoring is continuous evaluation --------- */}
      <h2>{t("Production monitoring is continuous evaluation")}</h2>
      <p>
        {t(
          "After launch, monitor: task success; correction and reversal; escalation; tool failure; retries; duplicate actions; unauthorized attempts; average task cost; latency; abnormal behavior; performance by scenario type; and performance by model or agent version."
        )}
      </p>
      <p>
        {t("Averages can conceal important failures.")}
      </p>
      <p>
        {t(
          "For example, a 95% success rate may include 99% on routine cases; 60% on ambiguous cases; and 40% when one system is unavailable."
        )}
      </p>
      <p>
        {t("The aggregate number looks healthy.")}
      </p>
      <p>
        {t("The operating system is not. Continuous monitoring at this level is one of the ten minimum governance controls described in our guide to")}{" "}
        <Link href="/blog/ai-governance-mid-market-b2b">{t("AI governance for mid-market B2B companies")}</Link>{t(".")}
      </p>

      {/* -- A production-readiness scorecard ---------------------- */}
      <h2>{t("A production-readiness scorecard")}</h2>
      <p>
        {t(
          "Use the following structure to reach a go, limited-go, or no-go decision."
        )}
      </p>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>{t("Area")}</th>
              <th>{t("Weight")}</th>
              <th>{t("What is evaluated")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t("Business-task success")}</td>
              <td>{t("25%")}</td>
              <td>{t("Correct completion of the full outcome")}</td>
            </tr>
            <tr>
              <td>{t("Tool and argument accuracy")}</td>
              <td>{t("15%")}</td>
              <td>{t("Correct tool, parameters, record, and state")}</td>
            </tr>
            <tr>
              <td>{t("Safety and policy compliance")}</td>
              <td>{t("20%")}</td>
              <td>{t("Permissions, approvals, prohibited actions")}</td>
            </tr>
            <tr>
              <td>{t("Exception handling")}</td>
              <td>{t("15%")}</td>
              <td>{t("Missing, ambiguous, conflicting, and adversarial cases")}</td>
            </tr>
            <tr>
              <td>{t("Resilience")}</td>
              <td>{t("10%")}</td>
              <td>{t("Tool failure, retries, duplicates, partial execution")}</td>
            </tr>
            <tr>
              <td>{t("Economics")}</td>
              <td>{t("10%")}</td>
              <td>{t("Cost, latency, human review, rework")}</td>
            </tr>
            <tr>
              <td>{t("Observability and rollback")}</td>
              <td>{t("5%")}</td>
              <td>{t("Traceability, incident response, reversibility")}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        {t("Mandatory controls should operate as gates.")}
      </p>
      <p>
        {t(
          "For example, an agent should not pass because its weighted score is high when: it performed an unauthorized action; a critical execution cannot be reconstructed; duplicate payments are possible; the agent cannot be disabled quickly; and no accountable process owner exists."
        )}
      </p>

      {/* -- Why a convincing demo can still fail in production ----- */}
      <h2>{t("Why a convincing demo can still fail in production")}</h2>

      <h3>{t("The test set contains only ideal cases")}</h3>
      <p>
        {t(
          "The agent learns nothing about incomplete, contradictory, or malicious inputs."
        )}
      </p>

      <h3>{t("The final answer is evaluated but the trace is ignored")}</h3>
      <p>
        {t("Unsafe or incorrect tool use remains hidden.")}
      </p>

      <h3>{t("The same team builds and grades the agent")}</h3>
      <p>
        {t(
          "Assumptions in the implementation are repeated in the evaluation."
        )}
      </p>

      <h3>{t("Human review cost is excluded")}</h3>
      <p>
        {t(
          "The agent appears economical only because employee correction time is unmeasured."
        )}
      </p>

      <h3>{t("The model changes without regression testing")}</h3>
      <p>
        {t(
          "A provider or configuration update changes behavior in previously stable scenarios."
        )}
      </p>

      <h3>{t("Production permissions are broader than test permissions")}</h3>
      <p>
        {t(
          "The evaluation does not represent the deployed risk."
        )}
      </p>

      <h3>{t("Failure criteria are negotiated after the test")}</h3>
      <p>
        {t(
          "The team redefines success to justify the investment already made."
        )}
      </p>

      {/* -- The production decision in practice -------------------- */}
      <h2>{t("The production decision in practice")}</h2>
      <p>
        {t(
          "An agent is ready for production when the organization has evidence that it can complete the task; choose valid actions; remain within policy; handle uncertainty; fail safely; preserve traceability; produce enough economic value; and be stopped and reversed."
        )}
      </p>
      <p>
        {t("A successful demo answers:")}
      </p>
      <blockquote>
        <p>{t("Can the agent work?")}</p>
      </blockquote>
      <p>
        {t("A production evaluation answers:")}
      </p>
      <blockquote>
        <p>{t("Under which conditions can the company trust it to act?")}</p>
      </blockquote>
      <p>
        {t("Fill System's")}{" "}
        <Link href="/services/ai-process-automation">
          {t("AI & Process Automation consulting")}
        </Link>{" "}
        {t("includes structured agent evaluation — test design, trace review, acceptance criteria, rollout planning, and production monitoring setup.")}
      </p>
      <p>
        <strong>
          <Link href="/#diagnostic-request-form">
            {t("Request a free diagnostic")}
          </Link>
        </strong>{" "}
        {t("to determine whether your AI agent is ready for production — or what evidence is still missing.")}
      </p>
    </BlogPostLayout>
    </>
  );
}

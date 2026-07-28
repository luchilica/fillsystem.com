import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor } from "@/lib/i18n";
import { getT } from "@/i18n/t";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import { BLOG_POSTS } from "@/components/blog/blogData";

const post = BLOG_POSTS.find(
  (p) => p.slug === "mcp-vs-a2a-enterprise-ai-agents"
)!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  return {
    title: "MCP vs. A2A for Enterprise AI Agents",
    description:
      "Learn how MCP and A2A connect AI agents to tools and other agents - and what identity, permissions, approvals, and controls enterprises must design themselves.",
    alternates: alternatesFor(loc, "/blog/mcp-vs-a2a-enterprise-ai-agents"),
    robots: robotsFor(loc),
    openGraph: {
      type: "article",
    },
  };
}

export default async function McpVsA2a({
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
      heroImage={post.heroImage}
      heroAlt={post.heroAlt}
      author={post.author}
    >
      {/* -- Intro ------------------------------------------------- */}
      <p>
        {t(
          "Connecting an AI agent to one business system is relatively simple."
        )}
      </p>
      <p>
        {t(
          "Connecting several agents to dozens of tools, data sources, vendors, approval flows, and business processes is where the architecture begins to fragment."
        )}
      </p>
      <p>
        {t(
          "One team creates a custom connector to Salesforce. Another builds a separate integration for SharePoint. A vendor deploys its own agent with broad API access. A second agent begins delegating tasks to the first. Soon, nobody can clearly explain: which agent can access which data; who authorized each action; which system owns the final result; how failed tasks are retried; whether the same action can run twice; and how an incorrect change can be reversed."
        )}
      </p>
      <p>
        {t("MCP and A2A address parts of this problem.")}
      </p>
      <p>
        {t("They do not address all of it.")}
      </p>
      <p>
        <strong>
          {t(
            "MCP can standardize how an AI application accesses tools, resources, and reusable prompts. A2A can standardize how independent agents discover each other, delegate work, exchange information, and manage tasks. Neither protocol defines your business process, authorization policy, data ownership, approval rules, or accountability model."
          )}
        </strong>
      </p>
      <p>
        {t("The protocol is infrastructure.")}
      </p>
      <p>
        {t("The operating model is still your responsibility.")}
      </p>
      <p>
        {t("Use the two protocols for different relationships:")}
      </p>

      <table>
        <thead>
          <tr>
            <th>{t("Protocol")}</th>
            <th>{t("Standardizes")}</th>
            <th>{t("Practical role")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>{t("MCP")}</strong></td>
            <td>{t("AI application-to-tool and application-to-context communication")}</td>
            <td>{t("Gives an agent controlled access to APIs, files, databases, services, and reusable capabilities")}</td>
          </tr>
          <tr>
            <td><strong>{t("A2A")}</strong></td>
            <td>{t("Agent-to-agent communication")}</td>
            <td>{t("Allows independent agents to discover capabilities, exchange messages, delegate tasks, and return artifacts")}</td>
          </tr>
        </tbody>
      </table>

      <p>
        {t(
          "The official MCP architecture defines hosts, clients, and servers, with servers exposing tools, resources, and prompts through a common protocol. A2A is designed for collaboration between independent and potentially opaque agents without requiring them to disclose their internal memory, implementation, or tools."
        )}{" "}
        (
        <a
          href="https://modelcontextprotocol.io/docs/learn/architecture"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("Model Context Protocol")}
        </a>
        )
      </p>
      <p>
        {t("They are complementary:")}
      </p>
      <blockquote>
        <p>
          <strong>
            {t("MCP equips an agent. A2A connects that agent to other agents.")}
          </strong>
        </p>
      </blockquote>
      <p>
        {t(
          "But standardizing communication does not make the connected system correct, secure, or economically justified."
        )}
      </p>

      {/* -- What MCP actually changes ------------------------------ */}
      <h2>{t("What MCP actually changes")}</h2>
      <p>
        {t(
          "Before MCP, every AI application typically needed a custom integration for every external capability: one connector for a CRM; another for a document repository; another for a database; another for an internal service; and another for a ticketing system."
        )}
      </p>
      <p>
        {t(
          "Each integration could use different authentication, error handling, schemas, and discovery logic."
        )}
      </p>
      <p>
        {t(
          "MCP introduces a shared protocol through which a server can expose three main categories:"
        )}{" "}
        <strong>{t("Tools")}</strong>{" "}
        {t("- executable operations;")}{" "}
        <strong>{t("Resources")}</strong>{" "}
        {t("- contextual data the application can read; and")}{" "}
        <strong>{t("Prompts")}</strong>{" "}
        {t(
          "- reusable interaction templates."
        )}
      </p>
      <p>
        {t(
          "This can reduce the amount of application-specific integration code and make capabilities easier to discover and reuse. The protocol, however, explicitly focuses on context exchange and capability access; it does not define the AI application's business logic or how the application should govern those capabilities."
        )}{" "}
        (
        <a
          href="https://modelcontextprotocol.io/specification/draft"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("Model Context Protocol")}
        </a>
        )
      </p>

      <h3>{t("In practice")}</h3>
      <p>
        {t(
          "A revenue-operations agent might use separate MCP servers to search CRM accounts; read approved sales documentation; retrieve product-pricing rules; create a draft task; and request a pipeline update."
        )}
      </p>
      <p>
        {t(
          "The agent does not need a unique integration design for every capability. It interacts through a common interface."
        )}
      </p>
      <p>
        {t("That is valuable.")}
      </p>
      <p>
        {t("But it creates a new question:")}
      </p>
      <blockquote>
        <p>
          {t(
            "Who decides which of those capabilities the agent should receive?"
          )}
        </p>
      </blockquote>
      <p>
        {t(
          "MCP standardizes the connection. It does not decide the permission model."
        )}
      </p>

      {/* -- What A2A actually changes ------------------------------ */}
      <h2>{t("What A2A actually changes")}</h2>
      <p>
        {t("A2A addresses a different problem.")}
      </p>
      <p>
        {t(
          "An enterprise may have several specialized agents: a sales-research agent; a pricing agent; a compliance-review agent; a customer-support agent; and a project-delivery agent."
        )}
      </p>
      <p>
        {t(
          "These agents may be built by different teams, use different frameworks, or run on different vendor platforms."
        )}
      </p>
      <p>
        {t(
          "A2A provides a common model through which agents can publish their capabilities; discover other agents; send and receive messages; manage collaborative tasks; return structured results or artifacts; and support synchronous, streaming, and long-running interactions."
        )}
      </p>
      <p>
        {t(
          "The protocol is designed so that an agent can collaborate without exposing its internal reasoning, memory, or implementation details."
        )}{" "}
        (
        <a
          href="https://a2a-protocol.org/latest/specification/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("A2A Protocol")}
        </a>
        )
      </p>

      <h3>{t("In practice")}</h3>
      <p>
        {t("A sales agent receives a request:")}
      </p>
      <blockquote>
        <p>
          {t(
            "Prepare a proposal for this account and verify that the pricing is permitted."
          )}
        </p>
      </blockquote>
      <p>
        {t(
          "The sales agent may Use MCP to retrieve the account and opportunity from the CRM; Delegate the pricing check to a pricing agent through A2A; Receive a structured pricing artifact; Delegate a policy review to another agent; Combine the approved results; Prepare a proposal draft; and Request human approval before any external communication."
        )}
      </p>
      <p>
        {t("Here, MCP and A2A solve different integration layers.")}
      </p>

      <pre>
        <code>
{`User or business event
        ↓
Orchestrating agent
        ├── MCP → CRM tools and data
        ├── MCP → document repository
        ├── A2A → pricing agent
        │           └── MCP → pricing system
        └── A2A → policy-review agent
                    └── MCP → approved policy sources`}
        </code>
      </pre>

      <p>
        {t("The architecture is interoperable.")}
      </p>
      <p>
        {t("It is not yet governed.")}
      </p>

      {/* -- What the protocols leave unresolved -------------------- */}
      <h2>{t("What the protocols leave unresolved")}</h2>
      <p>
        {t("Most implementation plans miss this distinction.")}
      </p>
      <p>
        {t("MCP and A2A do not automatically define the following.")}
      </p>

      <h3>{t("Business meaning")}</h3>
      <p>
        {t("A tool may expose an operation named:")}
      </p>
      <p>
        <code>update_opportunity_stage</code>
      </p>
      <p>
        {t(
          "The protocol does not determine: what each pipeline stage means; whether entry and exit criteria are documented; who owns the opportunity; whether the change is financially significant; and whether a manager must approve it."
        )}
      </p>
      <p>
        {t(
          "A standardized tool can still execute a poorly defined business process."
        )}
      </p>

      <h3>{t("Accountability")}</h3>
      <p>
        {t(
          "If Agent A delegates work to Agent B, which party owns an incorrect result?"
        )}
      </p>
      <p>
        {t(
          "Possible answers include Agent A's business owner; Agent B's product owner; the platform team; the employee who initiated the task; and the vendor operating the remote agent."
        )}
      </p>
      <p>
        {t(
          "The protocol transports the task. It does not assign managerial accountability."
        )}
      </p>

      <h3>{t("Enterprise identity")}</h3>
      <p>
        {t(
          "Authentication proves that a system or user has presented a valid identity."
        )}
      </p>
      <p>
        {t("Authorization determines what that identity may do.")}
      </p>
      <p>
        {t(
          "The difficult part is mapping: the human user; the initiating application; the orchestrating agent; the remote agent; the tool credential; and the final business operation."
        )}
      </p>
      <p>
        {t(
          "A remote agent should not inherit broad privileges merely because a trusted orchestrator contacted it."
        )}
      </p>

      <h3>{t("Approval policy")}</h3>
      <p>
        {t("A protocol can carry an approval request.")}
      </p>
      <p>
        {t("It cannot determine which actions should require approval.")}
      </p>
      <p>
        {t(
          "That depends on: financial impact; reversibility; customer consequences; data sensitivity; legal significance; employee or vendor policy; and the reliability of the specific use case."
        )}
      </p>

      <h3>{t("Data quality")}</h3>
      <p>
        {t("MCP can make inaccurate CRM data easier to access.")}
      </p>
      <p>
        {t(
          "A2A can make it easier for several agents to distribute the resulting error."
        )}
      </p>
      <p>
        {t(
          "Neither protocol resolves: duplicate records; conflicting policies; obsolete documents; missing owners; undefined metrics; and incorrect source-of-truth rules."
        )}
      </p>

      <h3>{t("Service-level expectations")}</h3>
      <p>
        {t(
          "A2A can support long-running tasks, but the enterprise must still decide: how long a task may run; when it is considered abandoned; what happens after a timeout; whether partial output can be used; how a task is cancelled; and whether the operation is safe to retry."
        )}
      </p>

      <h3>{t("Unit economics")}</h3>
      <p>
        {t("Interoperability can increase the number of agent interactions.")}
      </p>
      <p>
        {t(
          "A single business request may trigger: several model calls; multiple retrieval operations; remote agent tasks; retries; validation calls; and human review."
        )}
      </p>
      <p>
        {t(
          "A technically successful multi-agent workflow can still be economically irrational."
        )}
      </p>

      {/* -- What the enterprise still has to standardize ----------- */}
      <h2>{t("What the enterprise still has to standardize")}</h2>
      <p>
        {t(
          "Before connecting production agents, define the architecture across eight layers."
        )}
      </p>

      <table>
        <thead>
          <tr>
            <th>{t("Layer")}</th>
            <th>{t("Required decision")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>{t("1. Process")}</strong></td>
            <td>{t("What business outcome is being produced?")}</td>
          </tr>
          <tr>
            <td><strong>{t("2. Ownership")}</strong></td>
            <td>{t("Which person is accountable for that outcome?")}</td>
          </tr>
          <tr>
            <td><strong>{t("3. Identity")}</strong></td>
            <td>{t("Which user, agent, service, and credential initiated each operation?")}</td>
          </tr>
          <tr>
            <td><strong>{t("4. Capabilities")}</strong></td>
            <td>{t("Which tools, resources, and agents are allowed?")}</td>
          </tr>
          <tr>
            <td><strong>{t("5. Authorization")}</strong></td>
            <td>{t("What may each identity read, recommend, change, or execute?")}</td>
          </tr>
          <tr>
            <td><strong>{t("6. Approval")}</strong></td>
            <td>{t("Which operations require explicit human confirmation?")}</td>
          </tr>
          <tr>
            <td><strong>{t("7. Observability")}</strong></td>
            <td>{t("What messages, tool calls, artifacts, costs, and failures are recorded?")}</td>
          </tr>
          <tr>
            <td><strong>{t("8. Recovery")}</strong></td>
            <td>{t("How are tasks stopped, credentials revoked, and changes reversed?")}</td>
          </tr>
        </tbody>
      </table>

      <p>
        {t(
          "Skipping the upper layers and starting with servers, SDKs, and protocols creates integration without control."
        )}
      </p>

      {/* -- MCP security ------------------------------------------ */}
      <h2>{t("MCP security: the tool is part of the trust boundary")}</h2>
      <p>
        {t("An MCP server is not simply a neutral connector.")}
      </p>
      <p>
        {t(
          "Its tool definitions can influence what the model believes the capability does. The server may also receive data, execute code, access files, or call remote systems."
        )}
      </p>
      <p>
        {t(
          "OWASP's current MCP security guidance recommends: least-privilege access; separate and scoped credentials; validation of tool inputs and outputs; isolation of servers; confirmation for destructive or sensitive actions; central logging; verification of server sources and dependencies; and protection against changes to tool definitions."
        )}{" "}
        (
        <a
          href="https://cheatsheetseries.owasp.org/cheatsheets/MCP_Security_Cheat_Sheet.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("OWASP Cheat Sheet Series")}
        </a>
        )
      </p>

      <h3>{t("A risky design")}</h3>
      <p>
        {t(
          "One MCP server receives: full CRM administration; access to the shared drive; email-send permission; billing credentials; and unrestricted network access."
        )}
      </p>
      <p>
        {t(
          "The agent is then told through its prompt to \"use these responsibly.\""
        )}
      </p>
      <p>
        {t("The prompt is acting as the primary security boundary.")}
      </p>
      <p>
        {t("That is not sufficient.")}
      </p>

      <h3>{t("A safer design")}</h3>
      <p>
        {t("Capabilities are separated:")}{" "}
        <code>crm.read_account</code>;{" "}
        <code>crm.create_update_draft</code>;{" "}
        <code>crm.apply_approved_update</code>;{" "}
        <code>email.create_draft</code>;{" "}
        <code>email.send_approved_draft</code>;{" "}
        {t("and")}{" "}
        <code>billing.read_invoice_status</code>.
      </p>
      <p>
        {t(
          "Each operation has: a narrow schema; an explicit side effect; scoped credentials; validation; an audit event; and an approval policy where required."
        )}
      </p>
      <p>
        {t("The model is allowed to choose among safe capabilities.")}
      </p>
      <p>
        {t(
          "It is not given unrestricted authority and asked to self-regulate."
        )}
      </p>

      {/* -- A2A security ------------------------------------------ */}
      <h2>{t("A2A security: delegation must not expand authority")}</h2>
      <p>
        {t("Multi-agent architecture introduces")}{" "}
        <strong>{t("trust transitivity")}</strong>.
      </p>
      <p>
        {t("Agent A is allowed to perform a task.")}
      </p>
      <p>
        {t("Agent A calls Agent B.")}
      </p>
      <p>
        {t("Agent B calls a tool or another agent.")}
      </p>
      <p>
        {t("A common but dangerous assumption is:")}
      </p>
      <blockquote>
        <p>
          {t(
            "Because Agent A was trusted, everything it delegates should also be trusted."
          )}
        </p>
      </blockquote>
      <p>
        {t(
          "That can expand privileges beyond the original user's authority."
        )}
      </p>
      <p>
        {t(
          "A stronger delegation contract should carry: the initiating identity; the business purpose; the permitted scope; the allowed data classification; the task expiration; the approval state; the maximum cost or effort; the expected artifact; and the prohibition on further delegation, where appropriate."
        )}
      </p>
      <p>
        {t(
          "Every downstream participant should remain inside the original trust boundary."
        )}
      </p>

      {/* -- Prevent duplicate and irreversible execution ----------- */}
      <h2>{t("Prevent duplicate and irreversible execution")}</h2>
      <p>
        {t(
          "Agent systems often operate over asynchronous infrastructure."
        )}
      </p>
      <p>
        {t(
          "Messages may be retried. Connections may fail after an operation succeeds. A client may not know whether the remote action completed."
        )}
      </p>
      <p>
        {t("This creates a critical problem:")}
      </p>
      <blockquote>
        <p>
          {t("Retrying the task may repeat the business action.")}
        </p>
      </blockquote>
      <p>
        {t("For read operations, this may be harmless.")}
      </p>
      <p>
        {t(
          "For refunds, orders, customer messages, access changes, or CRM updates, it may create a material incident."
        )}
      </p>
      <p>
        {t(
          "Production design should include unique task and operation identifiers; idempotency keys; explicit task states; confirmation of side effects; separation between preparation and execution; parameter-bound approvals; and compensating actions for reversible changes."
        )}
      </p>
      <p>
        {t("A status of \"agent completed\" is insufficient.")}
      </p>
      <p>
        {t("The system must know")}{" "}
        <strong>{t("which business operation completed")}</strong>.
      </p>

      {/* -- API, webhook, MCP, or A2A? ---------------------------- */}
      <h2>{t("API, webhook, MCP, or A2A?")}</h2>
      <p>
        {t("Not every integration should use the newest protocol.")}
      </p>

      <table>
        <thead>
          <tr>
            <th>{t("Option")}</th>
            <th>{t("Best fit")}</th>
            <th>{t("Avoid when")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>{t("Direct API")}</strong></td>
            <td>{t("Stable, tightly controlled system-to-system operation")}</td>
            <td>{t("Many agent applications must independently rebuild the same connector")}</td>
          </tr>
          <tr>
            <td><strong>{t("Webhook/event")}</strong></td>
            <td>{t("A known event should trigger a predictable workflow")}</td>
            <td>{t("Dynamic discovery or interactive task management is required")}</td>
          </tr>
          <tr>
            <td><strong>{t("MCP")}</strong></td>
            <td>{t("AI applications need reusable access to tools and contextual resources")}</td>
            <td>{t("One simple deterministic integration is sufficient")}</td>
          </tr>
          <tr>
            <td><strong>{t("A2A")}</strong></td>
            <td>{t("Independent agents must discover, delegate, collaborate, or exchange long-running tasks")}</td>
            <td>{t("A single agent or ordinary service call can perform the work")}</td>
          </tr>
          <tr>
            <td><strong>{t("Fixed workflow")}</strong></td>
            <td>{t("Execution path is known and measurable")}</td>
            <td>{t("The task genuinely requires dynamic planning")}</td>
          </tr>
          <tr>
            <td><strong>{t("Multi-agent system")}</strong></td>
            <td>{t("Work must be divided across independent domains or trust boundaries")}</td>
            <td>{t("Additional agents add coordination without measurable value")}</td>
          </tr>
        </tbody>
      </table>

      <h3>{t("Practical rule")}</h3>
      <p>
        {t(
          "Use the least complex architecture that meets the requirement."
        )}
      </p>
      <p>
        {t("A webhook is not obsolete because MCP exists.")}
      </p>
      <p>
        {t("A direct API is not inferior because A2A exists.")}
      </p>
      <p>
        {t(
          "A second agent should not be created merely to make the system appear more agentic."
        )}
      </p>

      {/* -- Enterprise implementation checklist -------------------- */}
      <h2>{t("Enterprise implementation checklist")}</h2>
      <p>
        {t(
          "Before allowing MCP or A2A traffic in production, confirm:"
        )}
      </p>

      <table>
        <thead>
          <tr>
            <th>{t("Question")}</th>
            <th>{t("Failure consequence")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{t("Is every capability connected to a defined process?")}</td>
            <td>{t("Integration exists without a justified business outcome")}</td>
          </tr>
          <tr>
            <td>{t("Does every agent have a named owner?")}</td>
            <td>{t("Incidents become nobody's responsibility")}</td>
          </tr>
          <tr>
            <td>{t("Are credentials scoped per server and capability?")}</td>
            <td>{t("One compromise gains excessive access")}</td>
          </tr>
          <tr>
            <td>{t("Are tool side effects clearly declared?")}</td>
            <td>{t("A read-looking operation may change production data")}</td>
          </tr>
          <tr>
            <td>{t("Are external inputs treated as untrusted?")}</td>
            <td>{t("Documents or messages may manipulate agent behavior")}</td>
          </tr>
          <tr>
            <td>{t("Are approvals tied to exact parameters?")}</td>
            <td>{t("A changed action may reuse an old approval")}</td>
          </tr>
          <tr>
            <td>{t("Are task retries idempotent?")}</td>
            <td>{t("Actions may execute more than once")}</td>
          </tr>
          <tr>
            <td>{t("Can delegation be limited?")}</td>
            <td>{t("Authority may expand across an agent chain")}</td>
          </tr>
          <tr>
            <td>{t("Are artifacts traceable to their sources?")}</td>
            <td>{t("The final output cannot be verified")}</td>
          </tr>
          <tr>
            <td>{t("Are cost, depth, and retry limits enforced?")}</td>
            <td>{t("Multi-agent loops can consume uncontrolled resources")}</td>
          </tr>
          <tr>
            <td>{t("Can every agent and server be disabled independently?")}</td>
            <td>{t("Incident containment becomes slow or incomplete")}</td>
          </tr>
          <tr>
            <td>{t("Is there a non-agent fallback process?")}</td>
            <td>{t("Business operations stop when the agent platform fails")}</td>
          </tr>
        </tbody>
      </table>

      {/* -- What the decision comes down to ----------------------- */}
      <h2>{t("What the decision comes down to")}</h2>
      <p>
        {t("The strategic issue is broader than:")}
      </p>
      <blockquote>
        <p>
          {t("Should we adopt MCP or A2A?")}
        </p>
      </blockquote>
      <p>
        {t(
          "The better sequence is Which business process are we changing? Does it require agent access to tools, collaboration with other agents, or both? What is the minimum architecture that can solve it? Which trust boundaries will the architecture cross? What controls remain outside the protocol? How will the company prove that the new design is safer or more economical than the current process?"
        )}
      </p>
      <p>
        {t("MCP and A2A can reduce integration inconsistency.")}
      </p>
      <p>
        {t(
          "They can also make it easier to connect an unclear process to more systems at greater speed."
        )}
      </p>
      <p>
        <strong>
          {t(
            "Standardize the process, ownership, identity, permissions, approvals, and audit model before standardizing the communication layer."
          )}
        </strong>
      </p>
      <p>
        {t(
          "Opsfield Systems can assess the process, existing integrations, trust boundaries, and production controls through an independent"
        )}{" "}
        <strong>
          {t("AI Architecture Review or IT Stack Assessment")}
        </strong>{" "}
        {t(
          "before an agent ecosystem is connected to live business systems."
        )}
      </p>
    </BlogPostLayout>
  );
}

// Single source of truth for FAQ content, shared by the visible accordion
// (components/sections/FAQ.tsx) and the FAQPage JSON-LD (components/seo/JsonLd.tsx).
// Copy is from docs/texts.md → "Block: FAQ". Q7/Q8 are rendered as intro + list
// per docs/optimization.md ("Fit / Not Fit implementation"); faqAnswerText()
// serializes exactly that structure so the schema mirrors the visible text.

export type FaqItem =
  | { q: string; type: "text"; a: string }
  | { q: string; type: "fit"; intro: string; items: string[] }
  | {
      q: string;
      type: "notfit";
      intro: string;
      items: string[];
      closing: string;
    };

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Is this a sales call?",
    type: "text",
    a: "No. It is a structured diagnostic conversation to identify likely bottlenecks and the safest next step.",
  },
  {
    q: "How much does the diagnostic cost?",
    type: "text",
    a: "The initial diagnostic conversation (30-45 minutes) is complimentary and carries no obligation. If the diagnostic identifies a clear next step, we provide a fixed-scope proposal with defined deliverables and pricing before any commitment. Paid engagements are scoped individually based on the number of systems, workflows, and stakeholders involved.",
  },
  {
    q: "How long does the diagnostic process take?",
    type: "text",
    a: "The first conversation takes 30-45 minutes. A paid audit, assessment, or roadmap usually depends on the number of systems, workflows, and stakeholders involved.",
  },
  {
    q: "Do you implement systems?",
    type: "text",
    a: "Yes, when the diagnostic, audit, assessment, roadmap, or architecture review validates the scope.",
  },
  {
    q: "Do you work remotely or on-site?",
    type: "text",
    a: "Most diagnostic and advisory work is remote-first. On-site work in California is available when the scope requires it.",
  },
  {
    q: "What systems do you work with?",
    type: "text",
    a: "We work with environments using HubSpot, Salesforce, Pipedrive, Asana, Monday, Notion, QuickBooks, Zapier, Make, and related business tools.",
  },
  {
    q: "Who do you work with best?",
    type: "fit",
    intro: "Our strongest fit is a B2B company with 50-250 employees that is facing:",
    items: [
      "Cross-functional process or system complexity",
      "Weak visibility across CRM or SaaS tools",
      "Unclear automation or AI priorities",
      "A high-impact migration or integration decision that needs independent review",
    ],
  },
  {
    q: "When are you not the right fit?",
    type: "notfit",
    intro: "We are usually not the right fit for:",
    items: [
      "Hourly staff augmentation",
      "Basic tool setup without process or data complexity",
      "A predetermined tool-first project that excludes problem definition",
      "Requests for guaranteed ROI before baseline analysis",
    ],
    closing:
      "A no-fit decision is a valid outcome, and we will recommend a safer next step where possible.",
  },
  {
    q: "Do you guarantee ROI?",
    type: "text",
    a: "No. ROI requires baseline data, scope definition, adoption risk review, and implementation assumptions.",
  },
  {
    q: "What industries do you specialize in?",
    type: "text",
    a: "We work across B2B industries including SaaS, professional services, logistics, manufacturing, and multi-location operators. The diagnostic is industry-agnostic: it focuses on process, data flow, and system architecture rather than a specific vertical.",
  },
  {
    q: "Can you help migrate from Salesforce to HubSpot?",
    type: "text",
    a: "Yes. CRM migration is a common outcome of the RevOps diagnostic. We map your current data model, pipeline logic, and integrations before recommending a migration path. We work with both Salesforce and HubSpot environments.",
  },
  {
    q: "How is a diagnostic different from a consulting engagement?",
    type: "text",
    a: "The diagnostic is a structured, time-boxed review that identifies what is broken and why. A consulting engagement implements the fix. We separate the two so you never pay for implementation before the problem is validated.",
  },
  {
    q: "What does a typical RevOps audit include?",
    type: "text",
    a: "A RevOps audit covers CRM structure, pipeline stages, reporting definitions, data sources, key integrations, and automation rules. The output is a prioritized fix list with estimated effort and impact for each item.",
  },
  {
    q: "Do you handle O-1 visa petitions?",
    type: "text",
    a: "We do not provide legal advice or file immigration petitions. What we offer is O-1 readiness support: helping IT professionals and founders build the evidence portfolio that demonstrates extraordinary ability: publications, speaking, expert positioning, and recommendation strategy. Petition filing and legal counsel are provided by qualified immigration attorneys we coordinate with.",
  },
];

// Serializes an answer to match the VISIBLE rendering, for FAQPage JSON-LD.
// List answers use <ul><li> markup (permitted by Google in acceptedAnswer.text)
// so the schema mirrors the on-page intro + bullet list (+ closing) exactly.
export function faqAnswerText(item: FaqItem): string {
  if (item.type === "text") return item.a;

  const list = `<ul>${item.items.map((i) => `<li>${i}</li>`).join("")}</ul>`;

  if (item.type === "fit") return `${item.intro}${list}`;

  return `${item.intro}${list} ${item.closing}`;
}

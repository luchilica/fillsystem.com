export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  heroImage?: string;
  heroAlt?: string;
  seoTitle?: string;
  metaDescription?: string;
  author: {
    name: string;
    title: string;
    linkedin?: string;
  };
}

const AUTHOR_IGOR = {
  name: "Igor Saevets",
  title: "Founder & CEO",
  linkedin: "https://linkedin.com/in/igorsaevets",
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "test-speech-recognition-real-business-calls",
    title: "Voice AI Benchmarks Lie by Omission: How to Test Speech Recognition on Your Calls",
    description:
      "Build a business-specific voice AI benchmark for noise, accents, overlapping speech, diarization, critical entities, latency, hallucinations, and review cost.",
    date: "2026-07-27",
    readTime: "15 min read",
    category: "AI",
    heroImage: "/blog/voice-ai-real-call-benchmark.svg",
    heroAlt: "Voice AI benchmark comparing clean audio with noisy real business calls and speaker-attribution errors.",
    seoTitle: "How to Test Speech Recognition on Real Business Calls",
    metaDescription: "Build a business-specific voice AI benchmark for noise, accents, overlapping speech, diarization, critical entities, latency, hallucinations, and review cost.",
    author: AUTHOR_IGOR,
  },
  {
    slug: "choose-embedding-model-enterprise-rag",
    title: "The Best Embedding Model for RAG Is the One That Wins on Your Data",
    description:
      "Compare embedding models for enterprise RAG by retrieval quality, cost, latency, multilingual support, governance, and migration risk before re-indexing your data.",
    date: "2026-07-26",
    readTime: "14 min read",
    category: "AI",
    heroImage: "/blog/enterprise-rag-embedding-decision.svg",
    heroAlt: "Enterprise RAG pipeline comparing embedding models, vector dimensions, retrieval quality, and re-indexing risk.",
    seoTitle: "How to Choose an Embedding Model for Enterprise RAG",
    metaDescription: "Compare embedding models for enterprise RAG by retrieval quality, cost, latency, multilingual support, governance, and migration risk before re-indexing your data.",
    author: AUTHOR_IGOR,
  },
  {
    slug: "investor-readiness-operating-evidence",
    title: "Investors Don't Fund Ideas. They Fund Operating Evidence.",
    description:
      "Before approaching investors, validate your revenue data, sales process, operating model, systems, risks, and use-of-funds plan.",
    date: "2026-07-25",
    readTime: "13 min read",
    category: "Strategy",
    heroImage: "/blog/investor-readiness-operating-evidence.svg",
    heroAlt: "Founder reviewing revenue data, processes, systems, risks, and operating evidence before investor due diligence.",
    seoTitle: "Investor Readiness Checklist for Scaling B2B Companies",
    metaDescription: "Before approaching investors, validate your revenue data, sales process, operating model, systems, risks, and use-of-funds plan.",
    author: AUTHOR_IGOR,
  },
  {
    slug: "ai-agents-are-not-automation",
    title: "AI Agents Are Not Automation: What Must Exist Before You Let Software Act",
    description:
      "Learn what processes, permissions, controls, data, and approval rules must exist before an AI agent can safely act inside your business.",
    date: "2026-07-23",
    readTime: "11 min read",
    category: "AI",
    heroImage: "/blog/ai-agent-readiness-framework.svg",
    heroAlt: "AI agent readiness framework with process, data, permissions, human approval, logging, and rollback controls.",
    seoTitle: "AI Agents Are Not Automation: A B2B Readiness Framework",
    metaDescription: "Learn what processes, permissions, controls, data, and approval rules must exist before an AI agent can safely act inside your business.",
    author: AUTHOR_IGOR,
  },
  {
    slug: "evaluate-ai-agent-before-production",
    title: "How to Evaluate an AI Agent Before Production: A Practical B2B Framework",
    description:
      "Test AI agents for task success, tool use, safety, cost, resilience, and operational control before allowing them to act in production.",
    date: "2026-07-21",
    readTime: "16 min read",
    category: "AI",
    heroImage: "/blog/ai-agent-production-evaluation.svg",
    heroAlt: "AI agent production evaluation across normal, adversarial, tool-failure, cost, and rollback scenarios.",
    seoTitle: "How to Evaluate an AI Agent Before Production",
    metaDescription: "Test AI agents for task success, tool use, safety, cost, resilience, and operational control before allowing them to act in production.",
    author: AUTHOR_IGOR,
  },
  {
    slug: "mcp-vs-a2a-enterprise-ai-agents",
    title: "MCP vs. A2A: What Enterprise Teams Must Standardize Before Connecting AI Agents",
    description:
      "Learn how MCP and A2A connect AI agents to tools and other agents - and what identity, permissions, approvals, and controls enterprises must design themselves.",
    date: "2026-07-19",
    readTime: "14 min read",
    category: "AI",
    heroImage: "/blog/mcp-vs-a2a-enterprise-architecture.svg",
    heroAlt: "Enterprise AI architecture showing MCP connections to tools and A2A communication between specialized agents.",
    seoTitle: "MCP vs. A2A for Enterprise AI Agents",
    metaDescription: "Learn how MCP and A2A connect AI agents to tools and other agents and what identity, permissions, approvals, and controls enterprises must design themselves.",
    author: AUTHOR_IGOR,
  },
  {
    slug: "ai-governance-mid-market-b2b",
    title: "AI Governance for Mid-Market B2B: The Minimum Controls Before Production",
    description:
      "Build a practical AI governance model covering ownership, data, vendors, evaluation, approvals, incidents, and model changes - without enterprise bureaucracy.",
    date: "2026-07-17",
    readTime: "15 min read",
    category: "AI",
    heroImage: "/blog/mid-market-ai-governance-controls.svg",
    heroAlt: "Mid-market AI governance model with system inventory, ownership, risk tiers, testing, monitoring, and incident controls.",
    seoTitle: "AI Governance for Mid-Market B2B Companies",
    metaDescription: "Build a practical AI governance model covering ownership, data, vendors, evaluation, approvals, incidents, and model changes without enterprise bureaucracy.",
    author: AUTHOR_IGOR,
  },
  {
    slug: "revops-audit-guide",
    title: "The Complete RevOps Audit Guide for B2B Teams",
    description:
      "A step-by-step framework for auditing your CRM, pipeline, reporting, and data flow. Includes a checklist you can use today.",
    date: "2026-07-14",
    readTime: "12 min read",
    category: "RevOps",
    author: AUTHOR_IGOR,
  },
  {
    slug: "salesforce-to-hubspot-migration",
    title: "How to Migrate from Salesforce to HubSpot Without Losing Data",
    description:
      "A practical migration roadmap: what to map first, what to clean, what to rebuild, and the mistakes that cost B2B teams months.",
    date: "2026-07-10",
    readTime: "10 min read",
    category: "CRM",
    author: AUTHOR_IGOR,
  },
  {
    slug: "crm-pipeline-leaking-revenue",
    title: "7 Signs Your CRM Pipeline Is Leaking Revenue",
    description:
      "Most B2B teams lose deals not because of bad sales, but because of CRM pipeline gaps. Here are the 7 patterns we find in every audit.",
    date: "2026-07-04",
    readTime: "8 min read",
    category: "CRM",
    author: AUTHOR_IGOR,
  },
  {
    slug: "revops-for-small-teams",
    title: "RevOps for 50-Person Teams: Where to Start",
    description:
      "You don't need a dedicated RevOps hire to fix your revenue operations. Here's a practical starting point for small B2B teams.",
    date: "2026-06-26",
    readTime: "7 min read",
    category: "RevOps",
    author: AUTHOR_IGOR,
  },
  {
    slug: "hubspot-vs-salesforce-b2b",
    title: "HubSpot vs Salesforce for B2B Services: An Honest Comparison",
    description:
      "Neither CRM is universally better. Here's how to choose based on your team size, deal complexity, and what you actually need.",
    date: "2026-06-18",
    readTime: "9 min read",
    category: "CRM",
    author: AUTHOR_IGOR,
  },
];

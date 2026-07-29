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

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "process-debt-growing-b2b",
    title:
      "Process Debt Is Real: Why Growing B2B Teams Break at 50 Employees",
    description:
      "Undocumented handoffs, unclear ownership, and duplicated work compound silently as B2B teams grow. Here is how to find process debt before it stalls execution.",
    date: "2026-07-29",
    readTime: "13 min read",
    category: "Operations",
    heroImage: "/blog/process-audit.jpg",
    heroAlt:
      "Team reviewing workflow diagrams and operational processes on a whiteboard.",
    seoTitle:
      "Process Debt in Growing B2B Teams: How to Find and Fix It",
    metaDescription:
      "Undocumented handoffs, unclear ownership, and duplicated work compound silently as B2B teams grow. A practical guide to diagnosing process debt before it stalls execution.",
    author: {
      name: "Igor Saevets",
      title: "Founder & CEO",
      linkedin: "https://www.linkedin.com/in/igorsaevets",
    },
  },
  {
    slug: "it-risk-b2b-what-to-check",
    title:
      "The IT Risks No One Owns: What B2B Companies Must Audit Before Something Breaks",
    description:
      "Shadow IT, access sprawl, single points of failure, and undocumented systems. A practical IT risk audit guide for B2B teams with 50-250 employees.",
    date: "2026-07-28",
    readTime: "14 min read",
    category: "IT Risk",
    heroImage: "/blog/it-risk.jpg",
    heroAlt:
      "Server infrastructure with security monitoring displays in a modern office.",
    seoTitle:
      "IT Risk Assessment Guide for Growing B2B Companies",
    metaDescription:
      "Shadow IT, access sprawl, single points of failure, and undocumented systems. A practical IT risk audit guide for B2B teams with 50-250 employees.",
    author: {
      name: "Solutions Architect",
      title: "Opsfield Systems",
    },
  },
  {
    slug: "test-speech-recognition-real-business-calls",
    title: "Voice AI Benchmarks Lie by Omission: How to Test Speech Recognition on Your Calls",
    description:
      "Build a business-specific voice AI benchmark for noise, accents, overlapping speech, diarization, critical entities, latency, hallucinations, and review cost.",
    date: "2026-07-27",
    readTime: "15 min read",
    category: "AI",
    heroImage: "/blog/voice-ai.jpg",
    heroAlt: "Professional audio recording setup with microphone and monitoring equipment.",
    seoTitle: "How to Test Speech Recognition on Real Business Calls",
    metaDescription: "Build a business-specific voice AI benchmark for noise, accents, overlapping speech, diarization, critical entities, latency, hallucinations, and review cost.",
    author: {
      name: "Solutions Architect",
      title: "Opsfield Systems",
    },
  },
  {
    slug: "choose-embedding-model-enterprise-rag",
    title: "The Best Embedding Model for RAG Is the One That Wins on Your Data",
    description:
      "Compare embedding models for enterprise RAG by retrieval quality, cost, latency, multilingual support, governance, and migration risk before re-indexing your data.",
    date: "2026-07-26",
    readTime: "14 min read",
    category: "AI",
    heroImage: "/blog/rag-pipeline.jpg",
    heroAlt: "Data visualization screens displaying analytics and information architecture.",
    seoTitle: "How to Choose an Embedding Model for Enterprise RAG",
    metaDescription: "Compare embedding models for enterprise RAG by retrieval quality, cost, latency, multilingual support, governance, and migration risk before re-indexing your data.",
    author: {
      name: "AI & Data Lead",
      title: "Opsfield Systems",
    },
  },
  {
    slug: "investor-readiness-operating-evidence",
    title: "Investors Don't Fund Ideas. They Fund Operating Evidence.",
    description:
      "Before approaching investors, validate your revenue data, sales process, operating model, systems, risks, and use-of-funds plan.",
    date: "2026-07-25",
    readTime: "13 min read",
    category: "Strategy",
    heroImage: "/blog/investor-readiness.jpg",
    heroAlt: "Business team in a modern conference room during a strategy presentation.",
    seoTitle: "Investor Readiness Checklist for Scaling B2B Companies",
    metaDescription: "Before approaching investors, validate your revenue data, sales process, operating model, systems, risks, and use-of-funds plan.",
    author: {
      name: "Igor Saevets",
      title: "Founder & CEO",
      linkedin: "https://www.linkedin.com/in/igorsaevets",
    },
  },
  {
    slug: "ai-agents-are-not-automation",
    title: "AI Agents Are Not Automation: What Must Exist Before You Let Software Act",
    description:
      "Learn what processes, permissions, controls, data, and approval rules must exist before an AI agent can safely act inside your business.",
    date: "2026-07-23",
    readTime: "11 min read",
    category: "AI",
    heroImage: "/blog/ai-agent-readiness.jpg",
    heroAlt: "Abstract blue glass shapes representing AI and robotic automation.",
    seoTitle: "AI Agents Are Not Automation: A B2B Readiness Framework",
    metaDescription: "Learn what processes, permissions, controls, data, and approval rules must exist before an AI agent can safely act inside your business.",
    author: {
      name: "Igor Saevets",
      title: "Founder & CEO",
      linkedin: "https://www.linkedin.com/in/igorsaevets",
    },
  },
  {
    slug: "evaluate-ai-agent-before-production",
    title: "How to Evaluate an AI Agent Before Production: A Practical B2B Framework",
    description:
      "Test AI agents for task success, tool use, safety, cost, resilience, and operational control before allowing them to act in production.",
    date: "2026-07-21",
    readTime: "16 min read",
    category: "AI",
    heroImage: "/blog/ai-agent-eval.jpg",
    heroAlt: "Developer reviewing code on a laptop in a dark workspace.",
    seoTitle: "How to Evaluate an AI Agent Before Production",
    metaDescription: "Test AI agents for task success, tool use, safety, cost, resilience, and operational control before allowing them to act in production.",
    author: {
      name: "AI & Data Lead",
      title: "Opsfield Systems",
    },
  },
  {
    slug: "mcp-vs-a2a-enterprise-ai-agents",
    title: "MCP vs. A2A: What Enterprise Teams Must Standardize Before Connecting AI Agents",
    description:
      "Learn how MCP and A2A connect AI agents to tools and other agents - and what identity, permissions, approvals, and controls enterprises must design themselves.",
    date: "2026-07-19",
    readTime: "14 min read",
    category: "AI",
    heroImage: "/blog/mcp-a2a.jpg",
    heroAlt: "Collaborative workspace with laptops and devices on a desk, representing technology integration.",
    seoTitle: "MCP vs. A2A for Enterprise AI Agents",
    metaDescription: "Learn how MCP and A2A connect AI agents to tools and other agents and what identity, permissions, approvals, and controls enterprises must design themselves.",
    author: {
      name: "Solutions Architect",
      title: "Opsfield Systems",
    },
  },
  {
    slug: "ai-governance-mid-market-b2b",
    title: "AI Governance for Mid-Market B2B: The Minimum Controls Before Production",
    description:
      "Build a practical AI governance model covering ownership, data, vendors, evaluation, approvals, incidents, and model changes - without enterprise bureaucracy.",
    date: "2026-07-17",
    readTime: "15 min read",
    category: "AI",
    heroImage: "/blog/ai-governance.jpg",
    heroAlt: "Developer workstation with multiple monitors and code in blue-lit environment.",
    seoTitle: "AI Governance for Mid-Market B2B Companies",
    metaDescription: "Build a practical AI governance model covering ownership, data, vendors, evaluation, approvals, incidents, and model changes without enterprise bureaucracy.",
    author: {
      name: "Igor Saevets",
      title: "Founder & CEO",
      linkedin: "https://www.linkedin.com/in/igorsaevets",
    },
  },
  {
    slug: "revops-audit-guide",
    title: "The Complete RevOps Audit Guide for B2B Teams",
    description:
      "A step-by-step framework for auditing your CRM, pipeline, reporting, and data flow. Includes a checklist you can use today.",
    date: "2026-07-14",
    readTime: "12 min read",
    category: "RevOps",
    heroImage: "/blog/revops-audit.jpg",
    heroAlt: "Business analytics dashboard with charts and data visualizations.",
    author: {
      name: "Igor Saevets",
      title: "Founder & CEO",
      linkedin: "https://www.linkedin.com/in/igorsaevets",
    },
  },
  {
    slug: "salesforce-to-hubspot-migration",
    title: "How to Migrate from Salesforce to HubSpot Without Losing Data",
    description:
      "A practical migration roadmap: what to map first, what to clean, what to rebuild, and the mistakes that cost B2B teams months.",
    date: "2026-07-10",
    readTime: "10 min read",
    category: "CRM",
    heroImage: "/blog/crm-migration.jpg",
    heroAlt: "Data visualization charts representing CRM data migration process.",
    author: {
      name: "Solutions Architect",
      title: "Opsfield Systems",
    },
  },
  {
    slug: "crm-pipeline-leaking-revenue",
    title: "7 Signs Your CRM Pipeline Is Leaking Revenue",
    description:
      "Most B2B teams lose deals not because of bad sales, but because of CRM pipeline gaps. Here are the 7 patterns we find in every audit.",
    date: "2026-07-04",
    readTime: "8 min read",
    category: "CRM",
    heroImage: "/blog/crm-pipeline.jpg",
    heroAlt: "Financial charts and graphs showing sales pipeline analysis.",
    author: {
      name: "AI & Data Lead",
      title: "Opsfield Systems",
    },
  },
  {
    slug: "revops-for-small-teams",
    title: "RevOps for 50-Person Teams: Where to Start",
    description:
      "You don't need a dedicated RevOps hire to fix your revenue operations. Here's a practical starting point for small B2B teams.",
    date: "2026-06-26",
    readTime: "7 min read",
    category: "RevOps",
    heroImage: "/blog/small-team.jpg",
    heroAlt: "Small team collaborating around a table in a modern office.",
    author: {
      name: "Igor Saevets",
      title: "Founder & CEO",
      linkedin: "https://www.linkedin.com/in/igorsaevets",
    },
  },
  {
    slug: "hubspot-vs-salesforce-b2b",
    title: "HubSpot vs Salesforce for B2B Services: An Honest Comparison",
    description:
      "Neither CRM is universally better. Here's how to choose based on your team size, deal complexity, and what you actually need.",
    date: "2026-06-18",
    readTime: "9 min read",
    category: "CRM",
    heroImage: "/blog/crm-comparison.jpg",
    heroAlt: "Person working with software interface on a laptop screen.",
    author: {
      name: "Solutions Architect",
      title: "Opsfield Systems",
    },
  },
];

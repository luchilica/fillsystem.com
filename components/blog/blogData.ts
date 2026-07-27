export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    title: string;
    linkedin?: string;
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "revops-audit-guide",
    title: "The Complete RevOps Audit Guide for B2B Teams",
    description:
      "A step-by-step framework for auditing your CRM, pipeline, reporting, and data flow. Includes a checklist you can use today.",
    date: "2026-07-27",
    readTime: "12 min read",
    category: "RevOps",
    author: {
      name: "Igor Saevets",
      title: "Managing Partner",
      linkedin: "https://linkedin.com/in/igorsaevets",
    },
  },
  {
    slug: "salesforce-to-hubspot-migration",
    title: "How to Migrate from Salesforce to HubSpot Without Losing Data",
    description:
      "A practical migration roadmap: what to map first, what to clean, what to rebuild, and the mistakes that cost B2B teams months.",
    date: "2026-07-27",
    readTime: "10 min read",
    category: "CRM",
    author: {
      name: "Igor Saevets",
      title: "Managing Partner",
      linkedin: "https://linkedin.com/in/igorsaevets",
    },
  },
  {
    slug: "crm-pipeline-leaking-revenue",
    title: "7 Signs Your CRM Pipeline Is Leaking Revenue",
    description:
      "Most B2B teams lose deals not because of bad sales, but because of CRM pipeline gaps. Here are the 7 patterns we find in every audit.",
    date: "2026-07-27",
    readTime: "8 min read",
    category: "CRM",
    author: {
      name: "Igor Saevets",
      title: "Managing Partner",
      linkedin: "https://linkedin.com/in/igorsaevets",
    },
  },
  {
    slug: "revops-for-small-teams",
    title: "RevOps for 50-Person Teams: Where to Start",
    description:
      "You don't need a dedicated RevOps hire to fix your revenue operations. Here's a practical starting point for small B2B teams.",
    date: "2026-07-27",
    readTime: "7 min read",
    category: "RevOps",
    author: {
      name: "Igor Saevets",
      title: "Managing Partner",
      linkedin: "https://linkedin.com/in/igorsaevets",
    },
  },
  {
    slug: "hubspot-vs-salesforce-b2b",
    title: "HubSpot vs Salesforce for B2B Services: An Honest Comparison",
    description:
      "Neither CRM is universally better. Here's how to choose based on your team size, deal complexity, and what you actually need.",
    date: "2026-07-27",
    readTime: "9 min read",
    category: "CRM",
    author: {
      name: "Igor Saevets",
      title: "Managing Partner",
      linkedin: "https://linkedin.com/in/igorsaevets",
    },
  },
];

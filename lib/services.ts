/**
 * Single source of truth for service definitions and base prices.
 *
 * All prices are base prices at 50 employees (bottom of ICP).
 * Scaling services multiply by a team-size factor in the UI;
 * fixed-price services don't scale.
 *
 * Imported by: ServicesGrid (homepage), /services page, JsonLd (SEO).
 */

export interface ServiceDef {
  /** Internal identifier, used as array key and analytics */
  id: string;
  /** Display title (English source string — pass through t() for i18n) */
  title: string;
  /** URL slug for the detail page */
  slug: string;
  /** Full href path, e.g. "/services/revops-crm-consulting" */
  href: string;
  /** Short card-level description (English source string) */
  description: string;
  /** Base price in USD at 50 employees. 0 for free services. */
  basePrice: number;
  /** true = price does not scale with team size */
  fixed: boolean;
  /** true = complimentary / no charge */
  free: boolean;
}

export const SERVICE_DEFS: ServiceDef[] = [
  {
    id: "primary-diagnostic",
    title: "Primary Diagnostic",
    slug: "business-diagnostic",
    href: "/services/business-diagnostic",
    description:
      "A complimentary 30-45 minute fit review to frame the problem and identify bottlenecks.",
    basePrice: 0,
    fixed: true,
    free: true,
  },
  {
    id: "advisory-power-hour",
    title: "Advisory Power Hour",
    slug: "advisory-power-hour",
    href: "/services/advisory-power-hour",
    description:
      "Bring one concrete problem. Leave with expert direction in 60 minutes.",
    basePrice: 350,
    fixed: true,
    free: false,
  },
  {
    id: "extended-diagnostic",
    title: "Extended Diagnostic",
    slug: "extended-diagnostic",
    href: "/services/extended-diagnostic",
    description:
      "A documented diagnosis of processes, systems, and risks.",
    basePrice: 1400,
    fixed: false,
    free: false,
  },
  {
    id: "addon-tool",
    title: "Add-on Tool Build",
    slug: "addon-tool-build",
    href: "/services/addon-tool-build",
    description:
      "A focused build: Telegram bot, landing page, or email campaign.",
    basePrice: 1100,
    fixed: false,
    free: false,
  },
  {
    id: "it-risk",
    title: "IT Risk & Security",
    slug: "it-risk-security",
    href: "/services/it-risk-security",
    description:
      "Review of accounts, access, data handling, and single points of failure.",
    basePrice: 2100,
    fixed: false,
    free: false,
  },
  {
    id: "process-operations",
    title: "Process & Operations",
    slug: "process-operations",
    href: "/services/process-operations",
    description:
      "Redesign handoffs, approvals, and ownership for growing teams.",
    basePrice: 3700,
    fixed: false,
    free: false,
  },
  {
    id: "automation",
    title: "AI & Process Automation",
    slug: "ai-process-automation",
    href: "/services/ai-process-automation",
    description:
      "Remove manual, repetitive work where it actually pays off.",
    basePrice: 4100,
    fixed: false,
    free: false,
  },
  {
    id: "revops",
    title: "RevOps: CRM, Data & Reporting",
    slug: "revops-crm-consulting",
    href: "/services/revops-crm-consulting",
    description:
      "Make your CRM, pipeline, and reporting trustworthy again.",
    basePrice: 5100,
    fixed: false,
    free: false,
  },
  {
    id: "o1-readiness",
    title: "O-1 Readiness Support",
    slug: "o1-visa-readiness",
    href: "/o1-visa-readiness",
    description:
      "Structure the evidence behind an O-1 extraordinary-ability case.",
    basePrice: 2700,
    fixed: true,
    free: false,
  },
];

/** Lookup a service definition by id. Throws if not found. */
export function getServiceDef(id: string): ServiceDef {
  const def = SERVICE_DEFS.find((d) => d.id === id);
  if (!def) throw new Error(`Unknown service id: ${id}`);
  return def;
}

/** Get the displayable base price (0 for free). */
export function getBasePrice(def: ServiceDef): number {
  return def.free ? 0 : def.basePrice;
}

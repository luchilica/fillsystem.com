// Single source of truth for service pricing and metadata.
// All prices are base prices for the bottom of ICP (50 employees).
// Imported by ServicesGrid (homepage), JsonLd, /services page, and llms.txt generation.

export interface ServicePricing {
  slug: string;
  title: string;
  base?: number;
  fixed?: number;
  free?: boolean;
  priceCurrency: string;
}

export const SERVICE_PRICING: ServicePricing[] = [
  { slug: "business-diagnostic", title: "Primary Diagnostic", free: true, priceCurrency: "USD" },
  { slug: "advisory-power-hour", title: "Advisory Power Hour", fixed: 350, priceCurrency: "USD" },
  { slug: "extended-diagnostic", title: "Extended Diagnostic", base: 1400, priceCurrency: "USD" },
  { slug: "addon-tool-build", title: "Add-on Tool Build", base: 1100, priceCurrency: "USD" },
  { slug: "it-risk-security", title: "IT Risk & Security", base: 2100, priceCurrency: "USD" },
  { slug: "process-operations", title: "Process & Operations", base: 3700, priceCurrency: "USD" },
  { slug: "ai-process-automation", title: "AI & Process Automation", base: 4100, priceCurrency: "USD" },
  { slug: "revops-crm-consulting", title: "RevOps: CRM, Data & Reporting", base: 5100, priceCurrency: "USD" },
  { slug: "o1-visa-readiness", title: "O-1 Readiness Support", fixed: 2700, priceCurrency: "USD" },
];

export function getServicePrice(slug: string): ServicePricing | undefined {
  return SERVICE_PRICING.find((s) => s.slug === slug);
}

export function getBasePrice(service: ServicePricing): number {
  if (service.free) return 0;
  return service.fixed ?? service.base ?? 0;
}

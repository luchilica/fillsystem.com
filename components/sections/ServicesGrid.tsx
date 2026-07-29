"use client";

// Areas of Work — the priced "what we implement after the diagnostic" section.
// Diagnostic-first funnel is preserved: the hero card is the FREE primary
// diagnostic (→ #diagnostic-request-form) and every paid card routes back to the
// same form. Six uniform cards (O-1 Readiness Support is a full card too, not a
// strip). Only the free diagnostic carries a category badge. Photos are
// illustrative (decorative alt) and lightly duotone-treated in CSS. Expand
// pattern mirrors FAQ.tsx (button + aria-expanded + hidden panel, content stays
// in HTML for SEO).
//
// Implementation prices are floors for a lean 25-50-person team; a team-size
// calculator scales them live: factor = clamp(1 + (employees − 25) × 0.02, 1,
// 2.5), rounded to $100. O-1 has a fixed price (per-case, not headcount-based).
// The exact sum is always deferred to the free diagnostic.

import { useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Plus, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { trackEvent } from "@/lib/analytics";
import { useT } from "@/i18n/useT";
import type { Locale } from "@/i18n/locales";
import styles from "./ServicesGrid.module.css";

const FORM_HREF = "#diagnostic-request-form";

const EMP_MIN = 25;
const EMP_MAX = 100;
const EMP_STEP = 5;

// Team-size multiplier: 1.0 at ≤25 people, +2%/person, capped at 2.5 (≈100).
function sizeFactor(employees: number): number {
  return Math.min(2.5, Math.max(1, 1 + (employees - EMP_MIN) * 0.02));
}

function scaled(base: number, employees: number): number {
  return Math.round((base * sizeFactor(employees)) / 100) * 100;
}

function estimateRange(base: number, employees: number): [number, number] {
  const mid = base * sizeFactor(employees);
  const low = Math.round((mid * 0.85) / 100) * 100;
  const high = Math.round((mid * 1.15) / 100) * 100;
  return [low, high];
}

// Locale-correct number grouping: ru uses a space, others use a comma.
const GROUPING: Record<Locale, string> = {
  "en-US": "en-US",
  "es-US": "en-US",
  "ru-US": "ru-RU",
  "zh-Hans": "zh-CN",
};

function money(locale: Locale, n: number): string {
  return `$${new Intl.NumberFormat(GROUPING[locale] ?? "en-US").format(n)}`;
}

// "from $X" with the prefix/suffix each locale actually uses (zh is a suffix).
function fromLabel(locale: Locale, n: number): string {
  const m = money(locale, n);
  switch (locale) {
    case "ru-US":
      return `от ${m}`;
    case "es-US":
      return `desde ${m}`;
    case "zh-Hans":
      return `${m} 起`;
    default:
      return `from ${m}`;
  }
}

function rangeLabel(locale: Locale, low: number, high: number): string {
  return `${money(locale, low)}-${money(locale, high)}`;
}

type Service = {
  id: string;
  image: string;
  blur: string;
  imageAlt?: string;
  badge?: string;
  title: string;
  detailHref?: string;
  base?: number;
  fixed?: number;
  free?: boolean;
  lede: string;
  context: string;
  includes: string[];
  result: string;
  timeline: string;
  cta: string;
};

// Ordered as a journey: understand & advise (free → power hour → extended
// diagnostic), then build & implement ascending in price (add-on → IT risk →
// process → automation → RevOps), then O-1 as the special case at the very end.
// The free diagnostic is deliberately a light fit call; the deep, documented
// diagnosis is the paid Extended Diagnostic so the team never gives it away free.
const SERVICES: Service[] = [
  {
    id: "primary-diagnostic",
    detailHref: "/services/business-diagnostic",
    image: "/services/diagnostic.jpg",
    blur: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAHAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAdEAABBAIDAAAAAAAAAAAAAAABAAIDERIiMmGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJukYYKLRmDyrtBOKGrfERB//9k=",
    imageAlt: "Free B2B diagnostic - 30-minute process and IT review",
    badge: "Start here",
    title: "Primary Diagnostic",
    free: true,
    lede: "A structured first look at where your processes and systems drift apart.",
    context:
      "The primary diagnostic is a complimentary fit call: we frame the problem, surface the likely bottlenecks, and tell you whether a paid engagement fits. No obligation. The deeper, documented diagnosis is a separate paid step.",
    includes: [
      "Problem framing",
      "Likely bottleneck areas",
      "Fit / no-fit decision",
      "Recommended next step",
    ],
    result: "A go / no-go, live on the call",
    timeline: "30-45 minutes",
    cta: "Take the diagnostic",
  },
  {
    id: "advisory-power-hour",
    detailHref: "/services/advisory-power-hour",
    image: "/services/advisory.jpg",
    blur: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAHAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAcEAEAAgIDAQAAAAAAAAAAAAABAAIDEQQhMXH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABURAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIRAxEAPwCWe5ja5SzZT5tjXIe60NPm0iISP//Z",
    imageAlt: "Senior advisor working session for B2B decisions",
    title: "Advisory Power Hour",
    fixed: 350,
    lede: "Bring one concrete problem. Leave with a clear, expert answer in 60 minutes.",
    context:
      "A focused, paid working session with a senior advisor on one specific decision or problem: CRM, process, automation, or IT. No scoping, no wait: practical direction you can act on the same day.",
    includes: [
      "One focused problem",
      "Senior advisor, live",
      "Concrete recommendations",
      "Session notes",
    ],
    result: "Clear direction you can act on",
    timeline: "60 minutes",
    cta: "Book a session",
  },
  {
    id: "extended-diagnostic",
    detailHref: "/services/business-diagnostic",
    image: "/services/extended.jpg",
    blur: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAHAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAID/8QAGhAAAwEAAwAAAAAAAAAAAAAAAAECEQMhIv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AiJqsqX5l5ho+NtvtAEH/2Q==",
    imageAlt: "Extended diagnostic - documented process and systems audit",
    title: "Extended Diagnostic",
    base: 1400,
    lede: "Go deeper: a documented diagnosis for when you need to be sure before you invest.",
    context:
      "For teams that want more certainty before committing budget: a structured, documented diagnosis of your processes, systems, and risks. The full picture the free fit call only points at.",
    includes: [
      "Documented process & systems map",
      "Prioritized bottleneck list",
      "Risk & priority matrix",
      "Written roadmap",
    ],
    result: "A written diagnostic report and roadmap",
    timeline: "1-2 weeks",
    cta: "Discuss this in your diagnostic",
  },
  {
    id: "addon-tool",
    detailHref: "/services/addon-tool-build",
    image: "/services/addon.jpg",
    blur: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAHAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEE/8QAGxAAAgMAAwAAAAAAAAAAAAAAAAECAxESMlH/xAAVAQEBAAAAAAAAAAAAAAAAAAABAv/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AMcZwtljba8wvKreqABT/9k=",
    imageAlt: "Custom tool build - bot, landing page, or email campaign",
    title: "Add-on Tool Build",
    base: 1100,
    lede: "Pick one quick win: a Telegram bot, a landing page, or an email campaign. We build it.",
    context:
      "A single, focused build to get a concrete result fast: choose a Telegram bot, a landing page, or an email flow. Scoped small, shipped quickly. A low-risk way to start working together.",
    includes: [
      "Your choice: bot, landing, or email",
      "Design & build",
      "Launch & handover",
      "Basic analytics",
    ],
    result: "One tool, live and handed over",
    timeline: "1-2 weeks",
    cta: "Discuss this in your diagnostic",
  },
  {
    id: "it-risk",
    detailHref: "/services/it-risk-security",
    image: "/services/security.jpg",
    blur: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAHAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAME/8QAGhAAAgIDAAAAAAAAAAAAAAAAAAEREhMhIv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDFl5SjROzAA//Z",
    imageAlt: "IT risk and security audit for B2B operations",
    title: "IT Risk & Security",
    base: 2100,
    lede: "See where your data, access, and systems put the business at risk.",
    context:
      "A focused review of accounts, access, data handling, and single points of failure, with plain-language findings and a prioritized fix list, scaled to a small company.",
    includes: [
      "Access & account review",
      "Data-handling risks",
      "Single points of failure",
      "Prioritized fix list",
    ],
    result: "A prioritized risk & fix report",
    timeline: "1-3 weeks",
    cta: "Discuss this in your diagnostic",
  },
  {
    id: "process-operations",
    detailHref: "/services/process-operations",
    image: "/services/process.jpg",
    blur: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAHAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAIF/8QAHBAAAwABBQAAAAAAAAAAAAAAAAECEQMEITFh/8QAFAEBAAAAAAAAAAAAAAAAAAAAAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8AhbiFoSn2pXGDOrDpv0AMpY//2Q==",
    imageAlt: "Process and operations redesign for growing B2B teams",
    title: "Process & Operations",
    base: 3700,
    lede: "Redesign the handoffs, approvals, and ownership that slow a growing team down.",
    context:
      "We turn the diagnostic's process map into a working operating model: clarified ownership, documented workflows, and removed duplication, sized for a 25-50-person team, not an enterprise rollout.",
    includes: [
      "Target operating model",
      "Documented core workflows",
      "Ownership & handoff map",
      "Rollout checklist",
    ],
    result: "An operating model your team actually follows",
    timeline: "2-4 weeks",
    cta: "Discuss this in your diagnostic",
  },
  {
    id: "automation",
    detailHref: "/services/ai-process-automation",
    image: "/services/automation.jpg",
    blur: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAHAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAIF/8QAGRABAAIDAAAAAAAAAAAAAAAAAAIhAROR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAf/EABURAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIRAxEAPwDMnHXWeooDRH//2Q==",
    imageAlt: "AI and process automation for B2B workflows",
    title: "AI & Process Automation",
    base: 4100,
    lede: "Remove the manual, repetitive work, but only where it actually pays off.",
    context:
      "Starting from the diagnostic, we automate the workflows with real payback: connecting your tools, adding decision logic, and keeping a human where judgment matters.",
    includes: [
      "Automation opportunity shortlist",
      "Workflow automation build",
      "Tool & data connections",
      "Handover & documentation",
    ],
    result: "Automations that quietly save hours each week",
    timeline: "2-5 weeks",
    cta: "Discuss this in your diagnostic",
  },
  {
    id: "revops",
    detailHref: "/services/revops-crm-consulting",
    image: "/services/revops.jpg",
    blur: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAHAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAdEAACAgIDAQAAAAAAAAAAAAABAgADBBESIVFh/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABURAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIRAxEAPwCcuVahPC11B8Ou5bosdsesliSVBJ38iII//9k=",
    imageAlt: "RevOps CRM data and reporting consulting for B2B",
    title: "RevOps: CRM, Data & Reporting",
    base: 5100,
    lede: "Make your CRM, pipeline, and reporting tell the truth again.",
    context:
      "We clean up CRM structure, reporting rules, and revenue data flow so your numbers are trustworthy and your team stops working around the system.",
    includes: [
      "CRM structure cleanup",
      "Reporting & dashboard rules",
      "Pipeline & data-flow fixes",
      "Core integrations",
    ],
    result: "A CRM and reporting setup you can trust",
    timeline: "3-6 weeks",
    cta: "Discuss this in your diagnostic",
  },
  {
    id: "o1-readiness",
    detailHref: "/o1-visa-readiness",
    image: "/services/o1.jpg",
    blur: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAHAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAYEAADAQEAAAAAAAAAAAAAAAAAARFBYf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AlJqaKugFH//Z",
    imageAlt: "O-1 visa readiness evidence preparation",
    title: "O-1 Readiness Support",
    fixed: 2700,
    lede: "Structure the evidence behind an O-1 extraordinary-ability case the right way.",
    context:
      "For IT professionals and founders exploring the O-1 visa path, we help structure evidence of extraordinary ability: publication strategy, portfolio architecture, recommendation coordination, and expert profile positioning. We work alongside qualified immigration counsel. We do not provide legal advice or file petitions.",
    includes: [
      "Evidence & criteria mapping",
      "Publication & visibility strategy",
      "Portfolio & profile architecture",
      "Recommendation coordination",
    ],
    result: "An organized evidence package for counsel",
    timeline: "Ongoing, case-dependent",
    cta: "Ask about O-1 readiness",
  },
];

function Calculator({
  employees,
  onChange,
}: {
  employees: number;
  onChange: (n: number) => void;
}) {
  const t = useT();
  const shown = `${employees}${employees >= EMP_MAX ? "+" : ""} ${t("employees")}`;

  return (
    <div className={styles.calc}>
      <div className={styles.calcHead}>
        <label htmlFor="svc-employees" className={styles.calcLabel}>
          {t("Estimate by team size")}
        </label>
        <span className={styles.calcValue}>{shown}</span>
      </div>
      <input
        id="svc-employees"
        type="range"
        min={EMP_MIN}
        max={EMP_MAX}
        step={EMP_STEP}
        value={employees}
        onChange={(e) => onChange(Number(e.target.value))}
        className={styles.calcRange}
        aria-valuetext={shown}
      />
      <div className={styles.calcTicks} aria-hidden="true">
        <span>{EMP_MIN}</span>
        <span>{EMP_MAX}+</span>
      </div>
      <p className={styles.calcNote}>
        {t(
          "Prices update live with team size. The exact sum is set by the free diagnostic.",
        )}
      </p>
    </div>
  );
}

function ServiceCard({
  service,
  priority,
  employees,
}: {
  service: Service;
  priority: boolean;
  employees: number;
}) {
  const t = useT();
  const locale = useLocale() as Locale;
  const [open, setOpen] = useState(false);
  const triggerId = `svc-trigger-${service.id}`;
  const panelId = `svc-panel-${service.id}`;

  const priceLabel = service.free
    ? t("Free")
    : service.base != null
      ? fromLabel(locale, scaled(service.base, employees))
      : service.fixed != null
        ? fromLabel(locale, service.fixed)
        : t("On request");

  return (
    <article className={`${styles.card} ${service.free ? styles.cardFree : ""}`}>
      <div className={styles.media}>
        <Image
          src={service.image}
          alt={t(service.imageAlt ?? service.title)}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={styles.img}
          priority={priority}
          placeholder="blur"
          blurDataURL={service.blur}
        />
        {service.badge && (
          <span className={styles.category}>{t(service.badge)}</span>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.head}>
          <h3 className={styles.title}>{t(service.title)}</h3>
          <span
            className={`${styles.price} ${service.free ? styles.priceFree : ""}`}
          >
            {priceLabel}
          </span>
        </div>
        <p className={styles.lede}>{t(service.lede)}</p>

        <button
          type="button"
          id={triggerId}
          className={styles.trigger}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => {
            if (!open) {
              trackEvent("service_card_open", { service: service.id });
            }
            setOpen((v) => !v);
          }}
        >
          <span>{open ? t("Hide details") : t("Show details")}</span>
          <span
            aria-hidden="true"
            className={`${styles.toggle} ${open ? styles.toggleOpen : ""}`}
          >
            <Plus size={16} />
          </span>
        </button>

        <div
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          className={styles.panel}
          hidden={!open}
        >
          <p className={styles.context}>{t(service.context)}</p>

          <p className={styles.metaLabel}>{t("What's included")}</p>
          <ul className={styles.includes}>
            {service.includes.map((item) => (
              <li key={item} className={styles.include}>
                <Check
                  size={16}
                  aria-hidden="true"
                  className={styles.checkIcon}
                />
                <span>{t(item)}</span>
              </li>
            ))}
          </ul>

          <dl className={styles.facts}>
            <div className={styles.fact}>
              <dt className={styles.factKey}>{t("Result")}</dt>
              <dd className={styles.factVal}>{t(service.result)}</dd>
            </div>
            <div className={styles.fact}>
              <dt className={styles.factKey}>{t("Timeline")}</dt>
              <dd className={styles.factVal}>{t(service.timeline)}</dd>
            </div>
          </dl>

          {service.base != null && (
            <p className={styles.priceNote}>
              {t("Estimate")}:{" "}
              {rangeLabel(locale, ...estimateRange(service.base, employees))} ·{" "}
              {t("scope set after the diagnostic")}
            </p>
          )}

          <div className={styles.panelActions}>
            {service.detailHref && (
              <Link href={service.detailHref} className={styles.detailLink}>
                {t("View full details")}
              </Link>
            )}
            <a
              href={FORM_HREF}
              className={styles.cardCta}
              data-request-type={service.free ? undefined : service.title}
            >
              {t(service.cta)}
              <Plus size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ServicesGrid() {
  const t = useT();
  const [employees, setEmployees] = useState(35);

  return (
    <div className="container">
      <h2 className={styles.intro}>{t("B2B Development Services & Pricing")}</h2>
      <p className={styles.lead}>
        {t(
          "Start free with a primary diagnostic, then move into focused implementation.",
        )}{" "}
        {t(
          "Every paid engagement starts from the free diagnostic. You only pay once scope is agreed in writing.",
        )}
      </p>

      <Calculator employees={employees} onChange={setEmployees} />

      <div className={styles.grid}>
        {SERVICES.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            priority={false}
            employees={employees}
          />
        ))}
      </div>
    </div>
  );
}

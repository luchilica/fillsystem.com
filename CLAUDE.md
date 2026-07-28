@AGENTS.md

# Opsfield Systems — Project Instructions

Premium B2B IT & operations consulting site. Next.js 16 + next-intl + CSS Modules. No Tailwind.

## Workflow

- **Auto commit + push** to `main` after every verified change. No branches, no PRs. Don't ask.
- **Execute autonomously**. Ask only when choosing between design/approach variants.
- **Build first**: `npm run build` must pass before any commit.

## Visual Verification

Use Playwright to take screenshots — not the browser extension. Quick inline script:

```bash
npx playwright test --headed -g "full page" tests/visual/homepage.spec.ts
```

Or take an ad-hoc screenshot of any page/section:

```bash
npx playwright test --project=chromium -x <<'JS'
import { test } from "@playwright/test";
test("screenshot", async ({ page }) => {
  await page.goto("/en-US");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "screenshot.png", fullPage: true });
});
JS
```

For section-level checks, use `page.locator("#section-id").screenshot(...)`.

Existing visual tests: `tests/visual/homepage.spec.ts` — covers home at mobile/tablet/desktop + hero/proof/diagnostic/delivery/footer sections.

## Site Map — Pages & Key Files

### Pages (`app/[locale]/...`)

| Route | What's there |
|-------|-------------|
| `page.tsx` | **Homepage** — 11 sections: Hero, Problem, WhatWeDiagnose, ServicesGrid, AIProcessAutomation, HowDiagnosticWorks, DiagnosticScenarios, WhyOpsfield, DeliveryModel, BusinessITDiagnostic (form), FAQ, FinalCTA |
| `about/page.tsx` | About — hero, approach principles (dark ink), team cards, stats (brand blue), CTA |
| `services/page.tsx` | Services hub — hero, service cards grid (dark ink), "how it works" steps (brand blue), CTA |
| `services/[slug]/page.tsx` | 7 service detail pages (business-diagnostic, revops-crm, process-operations, ai-process-automation, it-risk-security, addon-tool-build, advisory-power-hour) |
| `blog/page.tsx` | Blog listing — hero, cards grid (dark ink), CTA |
| `blog/[slug]/page.tsx` | 12 blog articles (design in progress, don't change article visuals) |
| `o1-visa-readiness/page.tsx` | O-1 visa landing page |
| `terms-of-use/page.tsx` | Legal — terms |
| `privacy-policy/page.tsx` | Legal — privacy |
| `cookie-policy/page.tsx` | Legal — cookies |

### Homepage Sections (`components/sections/`)

| Component | Section ID | Background |
|-----------|-----------|------------|
| `Hero.tsx` | `#hero` | paper + aurora CSS animation |
| `ProblemSection.tsx` | `#problem-section` | brand blue → white gradient |
| `WhatWeDiagnose.tsx` | `#what-we-diagnose` | paper |
| `ServicesGrid.tsx` | `#areas-of-work` | paper |
| `AIProcessAutomation.tsx` | `#ai-process-automation` | dark ink |
| `HowDiagnosticWorks.tsx` | `#how-diagnostic-works` | paper |
| `DiagnosticScenarios.tsx` | `#proof-examples` | dark ink |
| `WhyOpsfield.tsx` | `#why-opsfield` | paper |
| `DeliveryModel.tsx` | `#delivery-model` | dark ink |
| `BusinessITDiagnostic.tsx` | `#business-it-diagnostic` | paper |
| `FAQ.tsx` | `#faq` | paper |
| `FinalCTA.tsx` | `#final-cta` | brand blue diagonal |

### Shared Components (`components/`)

| File | Purpose |
|------|---------|
| `ui/Button.tsx` | Brand button — variants: primary, secondary, dark, on-brand, on-brand-outline |
| `ui/PlusMark.tsx` | Decorative SVG cross motif for dark/brand sections |
| `ui/Card.tsx` | Reusable card (hairline border, radius-lg, shadow-sm) |
| `ui/DiagnosticForm.tsx` | Contact form (client component, Resend API) |
| `ui/FaqAccordion.tsx` | Accordion (client component) |
| `ui/Logomark.tsx` | Brand signet O (ink ring + blue arc) |
| `ui/HeroSummary.tsx` | Timeline diagram in hero |
| `layout/Header.tsx` | Sticky header + mobile drawer |
| `layout/Footer.tsx` | Site footer |
| `blog/blogData.ts` | Blog post metadata array (slugs, authors, dates) |
| `blog/BlogPostLayout.tsx` | Article wrapper (header, body, author box, CTA) |
| `seo/JsonLd.tsx` | Organization + Person structured data |
| `seo/BreadcrumbJsonLd.tsx` | Breadcrumb structured data |

### Config & i18n

| File | Purpose |
|------|---------|
| `app/globals.css` | ALL design tokens, base typography, section rhythm, mobile compaction |
| `app/[locale]/layout.tsx` | Root layout — Mulish + JetBrains Mono font loading, providers |
| `i18n/dictionary.ts` | Translation map (en/es/ru/zh). ~257KB |
| `i18n/t.ts` | Server: `const t = await getT()` |
| `i18n/useT.ts` | Client: `const t = useT()` |
| `i18n/routing.ts` | Locale config — en-US default, es/ru/zh-hans prefixed |
| `lib/site-config.ts` | Site name, URL, mode (server-only) |
| `playwright.config.ts` | Test config — runs against `npm run build && next start` on :3000 |

## Design System

### Typography — Semibold Rule

ALL headings use **semibold (600)** + `letter-spacing: -0.02em`. This is the site's defining trait.

| Element | Size token | Weight | Line Height |
|---------|-----------|--------|-------------|
| h1 | `--fs-h1` 36-52px | 600 | 1.04 |
| h2 | `--fs-h2` 28-40px | 600 | 1.12 |
| h3 | `--fs-h3` 24px | 600 | 1.12 |
| h4 | `--fs-h4` 20px | 600 | 1.12 |
| body | `--fs-body` 16px | 400 | 1.55 |
| .lead | `--fs-lead` 20px | 500 | 1.5 |
| card title | 18-21px | 600 | 1.2 |
| card body | 14.5px | 400 | 1.55 |

Fonts: **Mulish** everywhere. **JetBrains Mono** for eyebrow badges only.

### Colors (minimal)

| Token | Hex | Usage |
|-------|-----|-------|
| `--blue-500` | `#2551D2` | Sole accent. Buttons, links, brand sections |
| `--ink-900` | `#222335` | Headings, dark section bg. Never pure #000 |
| `--stone-700` | `#2C2E38` | Body text (`--text-body`) |
| `--stone-200` | `#E5E6EA` | Borders (`--border-hair`) |
| `--paper` | `#FFFFFF` | Card/page background |

### Section Background Patterns

**Dark ink** (delivery, scenarios, blog/services card grids):
```css
background:
  radial-gradient(85% 120% at 100% 0%, rgba(37,81,210,0.2) 0%, rgba(37,81,210,0) 55%),
  linear-gradient(180deg, #101223 0%, var(--ink-900) 62%) !important;
```

**Brand blue** (problem, stats, final CTA):
```css
background:
  radial-gradient(80% 90% at 15% 0%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 55%),
  linear-gradient(158deg, var(--blue-500) 0%, var(--blue-600) 100%) !important;
```

Both include `PlusMark` decorations at corners (hidden on mobile).

### Card Pattern

```css
border: 1px solid var(--border-hair);
border-radius: var(--radius-lg); /* 10px */
background: var(--surface-card);
box-shadow: var(--shadow-sm);
/* hover: translateY(-2px) + shadow-md + border-color: blue-200 */
```

### DON'Ts

- `font-weight: 900/800` on headings — only 600
- Hard shadows, 2px ink borders — retired v1 style
- Tailwind classes — CSS Modules only
- Pure `#000000` — use `--ink-900`
- Stripping PlusMark decorations or duotone imagery
- Category badges/pills on blog cards or inside articles (AI, CRM, RevOps labels) — they look AI-generated. No tag/category UI anywhere in blog.

## Code Patterns

### New Page

```tsx
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/locales";
import { alternatesFor, robotsFor } from "@/lib/i18n";
import { getT } from "@/i18n/t";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return { title: "...", description: "...", alternates: alternatesFor(locale as Locale, "/path"), robots: robotsFor(locale as Locale) };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getT();
  return (<section className="section"><div className="container"><h1>{t("Title")}</h1></div></section>);
}
```

### i18n Quick Ref

- 4 locales: `en-US` (indexable), `es-US`, `ru-US`, `zh-Hans` (noindex)
- Server: `const t = await getT()` — Client: `const t = useT()`
- Every page: `setRequestLocale(locale)` before `getT()`
- All visible text: `t("English string")`
- `params` is `Promise` — always `await params`

### CSS Module

- Use `globals.css` tokens for everything. Hardcode px only for card-internal sizes.
- Breakpoints: `768px` tablet, `1024px` desktop, `1280px` large
- Mobile compaction at `max-width: 767px` — aggressive space/heading reduction
- `prefers-reduced-motion: reduce` — disable all transitions

### Components

- Server Components by default
- Icons: `lucide-react` only
- Images: `next/image` with `width`/`height`. Photos in `public/photos/` or `public/blog/`

## DesignSync Regressions

After any DesignSync pull, verify it hasn't reverted:
- Semibold heading weights (back to black 900)
- Mobile compaction tokens (spacing/heading overrides at <=767px)
- Soft card shadows (back to hard 8px offset)
- Duotone imagery and photo bands

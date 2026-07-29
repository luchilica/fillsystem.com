# Accessibility Audit — Fill System

**Date:** 2026-06-30
**Scope:** Homepage (`/`) + legal pages (`/privacy-policy`, `/terms-of-use`, `/cookie-policy`)
**Standard:** WCAG 2.2 AA (per `optimization.md` → Accessibility) + `design.md` 44px touch-target baseline.

## Tools used

- **Manual code inspection** — components, CSS modules, built HTML (`.next/server/app/*.html`), token contrast math.
- **@axe-core/cli 4.12.1** (devDependency, MPL-2.0) — **automated scan did NOT run** in this environment: ChromeDriver bundled with the runner supports Chrome 150, installed Chrome is 149.0.7827.201 (`session not created`). Installing a matching driver/Chrome is out of scope (only `@axe-core/cli` may be installed). Automated scan is deferred to owner QA (see Manual QA). All findings below are from code inspection.

## Summary

| Severity | Found | Fixed | Deferred |
|---|---|---|---|
| Critical | 0 | 0 | 0 |
| Serious | 3 | 3 | 0 |
| Moderate | 2 | 1 | 1 |
| Minor | 1 | 0 | 1 |
| Automated scan | — | — | 1 (env-blocked) |

---

## Findings

### A-001 — Focus indicator invisible on the Final CTA accent panel
- **Severity:** Serious · **WCAG:** 2.4.7 Focus Visible / 1.4.11 Non-text Contrast · **Status: FIXED**
- **Description:** The global `:focus-visible` outline uses `--border-focus` (`#1D4ED8`). The Final CTA panel background is also `#1D4ED8` (`--accent`), so the focus ring on both panel buttons was ~1:1 (invisible).
- **File/selector:** `components/sections/FinalCTA.module.css` → `.panel` (buttons `.primaryBtn`, `.secondaryBtn`); global rule in `app/globals.css` `:focus-visible`.
- **Evidence:** `.panel { background: var(--accent) }` + global `outline: 2px solid var(--border-focus)`.
- **Fix applied:** added `.panel :focus-visible { outline-color: var(--text-on-accent); }` (white ring on accent).

### A-002 — Focus indicator low-contrast on the dark footer
- **Severity:** Serious · **WCAG:** 2.4.7 / 1.4.11 · **Status: FIXED**
- **Description:** Global focus ring `#1D4ED8` on footer background `#0B1220` ≈ **2.8:1**, below the 3:1 non-text-contrast threshold. `optimization.md` requires the focus ring "well visible on light AND dark surfaces."
- **File/selector:** `components/layout/Footer.module.css` → `.footer` (links + footer CTA button).
- **Fix applied:** added `.footer :focus-visible { outline-color: var(--footer-link); }` (`#93C5FD`, ~8.5:1 on `#0B1220`).

### A-003 — Insufficient text contrast on the "Others" comparison label
- **Severity:** Serious · **WCAG:** 1.4.3 Contrast (Minimum) · **Status: FIXED**
- **Description:** `.othersLabel` (visible 12px `<span>Others</span>`) used `--text-muted` (`#94A3B8`) ≈ **2.5:1** on the card surface — fails 4.5:1.
- **File/selector:** `components/sections/WhyFill System.module.css` → `.othersLabel` (rendered in `WhyFill System.tsx:38`).
- **Fix applied:** `color: var(--text-secondary)` (`#475569`, ≈ 6.9:1). Still visually subdued vs the accent "Fill System" label, preserving the paired-contrast message. (`.opsfieldLabel` `#1E40AF` on `#DBEAFE` ≈ 6.5:1 — already passes.)

### A-004 — Heading-order skips (h2 → h4)
- **Severity:** Moderate · **WCAG:** 1.3.1 Info and Relationships (axe `heading-order`) · **Status: FIXED**
- **Description:** Three sections placed `<h4>` subsection titles directly under the section `<h2>`, skipping `<h3>`. `optimization.md` L106–112: don't choose heading tags for font size; each section gets its own heading hierarchy.
- **Files/selectors:**
  - `components/sections/FAQ.tsx:28` `<h4 class=heading>` (accordion triggers)
  - `components/sections/WhatWeDiagnose.tsx:36` `<h4 class=cardTitle>`
  - `components/sections/DeliveryModel.tsx:33` `<h4 class=roleTitle>`
- **Fix applied:** changed each to `<h3>` and added `font-family: var(--font-body); font-size: 18px` (+`22px` ≥1024px) to `.heading` / `.cardTitle` / `.roleTitle` so the **visual size is unchanged** (matches the former h4). Verified built HTML: homepage heading sequence has **no skips and zero `<h4>`**.

### A-005 — In-text links distinguished by color only
- **Severity:** Moderate · **WCAG:** 1.4.1 Use of Color · **Status: DEFERRED (owner decision)**
- **Description:** Inline links in prose (legal-page body, form privacy notice) are not underlined at rest; they rely on color (`--accent` `#1D4ED8`) vs body text (`#0B1220`). That color contrast is ≈ **2.8:1** (<3:1), so color-alone distinction does not meet the 1.4.1 technique threshold; an underline only appears on hover/focus.
- **File/selector:** `app/globals.css` `a { text-decoration: none }` (+ hover/focus underline); affects `app/privacy-policy|terms-of-use|cookie-policy` content and `DiagnosticForm` privacy notice.
- **Why deferred:** The approved design explicitly specifies "underline on hover and focus" (`design.md` Text Link L688; `optimization.md` L597). A compliant fix (persistent underline in prose, or a darker link token) **changes approved design/tokens**, which is out of scope for this fix pass.
- **Recommended fix (owner decision):** either (a) persistent underline for unclassed in-text links (`.content a`, form privacy `a`), or (b) darken the in-text link token to reach ≥3:1 vs body text. Both need design sign-off.

### A-006 — Decorative SVGs missing `focusable="false"`
- **Severity:** Minor · **WCAG:** 4.1.2 (defensive) · **Status: DEFERRED**
- **Description:** lucide icons carry `aria-hidden="true"` (correct — screen readers skip them) but not `focusable="false"`. `optimization.md` L587 requests both. Real-world impact is negligible: modern browsers do not make inline SVG focusable; only legacy IE did.
- **File/selector:** all `lucide-react` icon usages (~12 files).
- **Why deferred:** Minor per policy; broad churn for no modern-browser benefit. Can be added globally later (e.g., a shared icon wrapper) if IE-class support is ever required.

### A-007 — Automated axe scan not executed
- **Severity:** N/A (process) · **Status: MANUAL QA**
- **Description:** `npx axe` failed on all four URLs — ChromeDriver/Chrome version mismatch (driver expects Chrome 150; installed 149). Could not be resolved without installing a driver/browser (out of scope). Owner should run `npx browser-driver-manager install chrome` (or align versions) and re-run the four scans.

---

## Passed checks

- **Skip link** present and first focusable (`SkipLink` → `#main-content`); not duplicated.
- **One `<h1>` per page**; heading order h1→h2→h3 with **no skips** (post-fix, verified in built HTML for homepage + legal pages).
- **Landmarks:** `<header>`, `<nav aria-label>`, `<main id=main-content>`, `<footer>`, `<section id>` per section.
- **Buttons vs anchors:** actions use `<button>`, navigation uses `<a>`/`next/link`.
- **Form (DiagnosticForm):** every field has a visible `<label htmlFor>`; placeholders don't replace labels; `autocomplete` present (`name`, `email`, `organization`, `url`, `organization-title`); `required` only on the 4 required fields; optional fields have no `required`/`aria-required`; errors wired via `aria-describedby` + `aria-invalid`; first invalid field receives focus on failed submit; success uses `role="status" aria-live="polite"`; error uses `role="alert"`; loading keeps the button label ("Submitting…") + duplicate-submit guard; "Still processing…" announced via `aria-live`; honeypot `aria-hidden` + `tabindex=-1`.
- **Progressive disclosure:** `<button aria-expanded aria-controls="df-optional">`, text + icon state (not color/icon alone).
- **Touch targets ≥44px:** Button base, header nav links, mobile menu button (44×44), drawer links, footer links, FAQ triggers, form inputs/textarea, text-link CTAs, disclosure control, legal back-to-home link.
- **Keyboard:** drawer traps focus while open, closes on Escape, returns focus to the trigger; closed drawer is `visibility:hidden` (links not focusable).
- **Focus not hidden by sticky header:** `section[id]` + `#diagnostic-request-form` `scroll-margin-top:96px`.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` zeroes `transition-duration`/`animation-duration` and `scroll-behavior`; no autoplay/looping decorative motion.
- **Zoom:** body text uses relative/`px`-scalable tokens; viewport has **no** `maximum-scale`/`user-scalable=no`; `overflow-x: clip` (not `hidden`) avoids creating a scroll trap.
- **Color not sole carrier:** FAQ Fit/Not-Fit use icon + text labels, not color alone.
- **Decorative imagery:** lucide icons `aria-hidden="true"`; `HeroDiagram` `aria-hidden`.
- **Contrast (passing pairs):** body `#0B1220`/`#F8FAFC` ≈ 17:1; secondary `#475569`/`#F8FAFC` ≈ 7:1; button text `#FFFFFF`/`#1D4ED8` ≈ 5.1:1; error `#DC2626`/`#FFFFFF` ≈ 4.8:1; footer text `#F8FAFC`/`#0B1220` ≈ 17:1; footer links `#93C5FD`/`#0B1220` ≈ 8.5:1.

---

## Re-scan results (post-fix)

- `npm run lint` ✓ · `npx tsc --noEmit` ✓ · `npm run build` ✓
- Homepage built-HTML heading sequence: `h1 h2 h2 h3 h3 h2 … h2` — **0 `<h4>`, 0 skips** (A-004 resolved).
- A-001/A-002/A-003 are CSS/token changes; verified present in source and compiling. Visual focus-ring contrast and label contrast to be confirmed in browser (see Manual QA).
- **Automated axe re-scan: not run** (A-007 environment block).

## Remaining manual QA (owner / browser + AT)

- Run `npx axe` on all four routes after aligning Chrome/ChromeDriver (A-007).
- 200% and 400% browser zoom — confirm reflow with no loss of content/function.
- Screen readers: NVDA (Windows) + VoiceOver (macOS/iOS) — drawer focus management, form error/success announcements, accordion `aria-expanded` state.
- iOS Safari — touch targets and no input zoom (16px inputs already set).
- Confirm focus-ring visibility on the Final CTA panel and footer in-browser (A-001/A-002).
- Low priority: `HeroDiagram` internal labels use `--text-muted`; the diagram is `aria-hidden` (decorative), but confirm the visual is acceptable to sighted users.

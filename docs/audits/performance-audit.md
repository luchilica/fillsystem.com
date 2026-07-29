# Performance Audit — Fill System

**Date:** 2026-06-30
**Build:** Next.js 16.2.9 (Turbopack), production build
**Standard / targets:** `development-plan.md` / `optimization.md` — Lighthouse Perf ≥90 desktop / ≥85 mobile; A11y ≥95; Best Practices ≥95; SEO ≥95; LCP ≤2.5s, INP ≤200ms, CLS ≤0.1; no horizontal scroll 320–1440px.

## Outcome

**No measured performance defects found. No code changes were required.** Every release target that can be checked statically is met or on track; browser-run Lighthouse + zoom/SR checks are owner QA (see end).

---

## 1. Build output

All routes prerender as **static** except the form API (dynamic by nature):

| Route | Type |
|---|---|
| `/`, `/privacy-policy`, `/terms-of-use`, `/cookie-policy`, `/_not-found` | ○ Static |
| `/robots.txt`, `/sitemap.xml`, `/opengraph-image`, `/twitter-image` | ○ Static (metadata routes) |
| `/api/submit` | ƒ Dynamic |

> Note: the Turbopack production build table does not print the Size / First Load JS columns, so the figures below were computed from `.next/server/app/page/build-manifest.json` + on-disk chunk sizes.

**First Load JS — homepage `/`: ≈ 169.4 KB gzipped** (555.9 KB raw, 6 chunks). This is **under the 200 KB investigate threshold**.

Largest static chunks (raw, on disk):

| Size (raw) | Notes |
|---|---|
| 222 KB | React + Next App Router runtime (shared, cached across routes) |
| 147 KB | framework/runtime |
| 110 KB | framework/runtime |
| ≤53 KB | remaining shared/app chunks |

No surprisingly large app-specific chunk; `lucide-react` is tree-shaken (only imported icons ship). The bulk is the framework baseline — not reducible without architecture changes, which are out of scope and unwarranted below threshold.

## 2. Client Component inventory

`page.tsx` and all of `app/` are **Server Components** (no `"use client"`). Hydration is islanded — only these five leaf components are client, exactly as expected:

| Component | `"use client"` justified? |
|---|---|
| `components/layout/Header.tsx` | ✓ mobile drawer state + focus trap |
| `components/sections/FAQ.tsx` | ✓ accordion open state |
| `components/ui/DiagnosticForm.tsx` | ✓ form state/validation/submit |
| `components/analytics/CookieConsent.tsx` | ✓ consent UI (renders `null` now) |
| `components/analytics/CookieConsentReopener.tsx` | ✓ footer control (renders `null` now) |

No unnecessary client components. All sections, `Card`, `Button`, `HeroDiagram`, `JsonLd`, `LegalPageLayout` are Server Components.

## 3. Font loading

- Self-hosted via `next/font/google` (`app/layout.tsx`): **Inter** (weights 400, 600) + **Inter Tight** (weights 600, 700) — matches `design.md` (400/600/700); no extra families or weights.
- `display: "swap"` on both; `subsets: ["latin"]`; `next/font` auto-injects `<link rel="preload">` for the above-fold subset and self-hosts woff2 (no external Google Fonts request, no render-blocking CSS).
- 14 `.woff2` files in `.next/static/media` are `next/font`'s normal per-weight **unicode-range splitting** of the latin subset; the browser downloads only the ranges it needs. Not a defect.

## 4. Images / assets

- **No raster images, no `<img>`, no `next/image`** anywhere. The Hero visual is an inline SVG (`HeroDiagram`, `aria-hidden`) — no lazy-load concern, no LCP image, **no image-driven CLS**.
- `/public` contains only 5 **unused** Next starter SVGs (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`). They are never referenced or requested, so **zero performance impact**. *Optional housekeeping:* safe to delete (not a perf defect, left untouched per "fix only measured defects").

## 5. Third-party scripts

- **No analytics, no `gtag`/GA4, no external script tags, no external fetches.** `ANALYTICS_ENABLED=false` → `CookieConsent` and `CookieConsentReopener` render `null`; no consent/analytics code executes.
- The only inline `<script>` is the homepage JSON-LD (`type="application/ld+json"`) — data only, not executable, no network cost.

## 6. CSS

- Largest stylesheet: `globals.css` 7.2 KB; all CSS Modules ≤3.8 KB. Critical CSS is inlined by Next by default.
- Tokens used consistently; the few literal `rgba()` values (overlay `rgba(11,18,32,.4)`, footer/divider/white alpha) are intentional alpha blends with no token equivalent — not a perf concern.

## 7. Performance fixes applied

**None.** No measured defect met the fix criteria (no unnecessary client component, no extra font weight, no CLS image, no lazy LCP asset, First Load JS < 200 KB). Per task constraints, no speculative optimization was performed.

## 9. Horizontal scroll (code analysis)

- `body { overflow-x: clip }` (globals) prevents off-canvas-drawer overflow without creating a scroll container.
- **No hard-coded `width: NNNpx`** declarations; every `min-width` match is a media-query breakpoint (768/1024). Drawer is `width: min(320px, 85vw)`; text columns use `max-width` (never `min-width`). No element can exceed the viewport at 320–1440px from the CSS. (Visual confirmation at 320/375 px is owner QA.)

## 10. Final verification

- `npm run lint` ✓ · `npx tsc --noEmit` ✓ · `npm run build` ✓
- No code changed this task → no regression risk; 11 homepage sections, CTAs, form, legal pages, footer all intact.
- **axe re-scan: still environment-blocked** (ChromeDriver 150 vs installed Chrome 149; cannot install a driver within scope). Accessibility status is per `docs/audits/accessibility-audit.md` — all Critical/Serious resolved, no code regressions since.

## 8. Lighthouse — owner-run commands

Lighthouse is most accurate against a production build (not dev). Run locally:

```bash
npm run build
npx next start        # serves http://localhost:3000
```

Then in Chrome → DevTools → **Lighthouse** → run **Desktop** and **Mobile**, recording Performance / Accessibility / Best Practices / SEO. (CLI alternative once Chrome/driver align: `npx lighthouse http://localhost:3000 --view`.)

Compare against: Perf ≥90 desktop / ≥85 mobile, A11y ≥95, Best Practices ≥95, SEO ≥95.

## Items requiring owner manual verification

- **Lighthouse scores** (Chrome, production build) — Perf / A11y / Best Practices / SEO vs targets.
- **Core Web Vitals** field/lab — LCP ≤2.5s, INP ≤200ms, CLS ≤0.1.
- **axe** re-run after aligning Chrome/ChromeDriver (`npx browser-driver-manager install chrome`).
- **200% / 400% zoom** reflow; **320 px / 375 px** visual check (no horizontal scroll, no clipping).
- **NVDA / VoiceOver** smoke test; **iOS Safari** check (touch targets, no input zoom).

---

## Summary

| Area | Result |
|---|---|
| First Load JS (/) | 169.4 KB gz — under 200 KB ✓ |
| Static prerendering | All content routes static ✓ |
| Client components | Only the 5 expected; `page.tsx` server ✓ |
| Fonts | Inter + Inter Tight, 400/600/700, swap, self-hosted, preloaded ✓ |
| Images / CLS | No raster images; no image CLS ✓ |
| Third-party / analytics | None; consent UI null ✓ |
| Horizontal scroll | No fixed-width overflow; `overflow-x: clip` ✓ |
| Fixes applied | None needed |

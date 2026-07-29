# External Audit Verification — Fill System

**Date:** 2026-07-02
**Verified against:** local codebase (Node v24.16.0, Next.js 16.2.9), clean `npm ci` + `npm run lint` + `npx tsc --noEmit` + `npm run build` — all pass.
**Audited target:** `https://fill-system.vercel.app/` — a **deployed preview that reflects the end of Этап 4**.

## ⚠️ Critical context: deployment gap

The external audits ran against a **deployed build frozen at Этап 4**. Locally, Этапы 8–13 are complete (legal-page content, SEO metadata, OG/Twitter, JSON-LD, sitemap, robots, per-page metadata, tests, CI, analytics) — **but none of that work is committed or deployed** (last commit predates it). So most audit findings were **real on the live site** yet are **already fixed in the current source, just not shipped**.

Each finding below is verified against the **current code** (the task's ask), with a note on its likely Этап-4 state. The single highest-value action is to **commit and redeploy** — that alone clears A1, A3, A4, A5, A8 and refutes A6, A7, A10 on the live site. A2/C2/C3 are genuine content/doc errors that persist regardless of deployment.

## Summary

| Verdict | Count | Findings |
|---|---|---|
| **CONFIRMED** (real in current code) | 3 | A2, C2, C3 |
| **PARTIAL** | 2 | A9, C1 |
| **DENIED** (fixed / false vs current code) | 8 | A1, A3, A4, A5, A6, A7, A8, A10 |

Of the 8 DENIED: **A1, A3, A4, A5, A8** were genuinely broken at Этап 4 and are **fixed-but-undeployed**; **A6, A7, A10** were already correct at Этап 4 (implemented in Этапы 1–3) → **false alarms**.

## Environment (Step 1)

- Node **v24.16.0**; Next.js **16.2.9** (Turbopack); `npm ci` clean (2 moderate advisories in dev deps only).
- Routes (all static except the API): `/`, `/_not-found`, `/privacy-policy`, `/terms-of-use`, `/cookie-policy`, `/robots.txt`, `/sitemap.xml`, `/opengraph-image`, `/twitter-image`, `ƒ /api/submit`.
- Homepage First Load JS ≈ 169 KB gz (framework baseline).

## Inventory (Step 2)

- **No `src/`** — code is root-level `app/`, `components/`, `lib/`.
- **Routes/modules:** `app/{page,layout,not-found,robots,sitemap,opengraph-image,twitter-image}.tsx/.ts`, `app/{privacy-policy,terms-of-use,cookie-policy}/page.tsx`, `app/api/submit/route.ts` (stub). `lib/{site-config,consent,analytics}.ts` (active) + `lib/constants.ts` (unused `export {}` stub).
- **`"use client"` components (7):** `Header`, `FAQ`, `DiagnosticForm`, `CookieConsent`, `CookieConsentReopener`, `AnalyticsProvider`, `AnalyticsClickTracker`. (`LegalPageLayout` matched a grep only in a **comment** — it is a Server Component. `page.tsx` and all sections are Server Components.)
- **CSS:** `app/globals.css` (design tokens) + per-component CSS Modules referencing `var(--…)` tokens.
- **Presence:** `CLAUDE.md` ✅ · `docs/audits/` ✅ · `.claude/rules/` ❌ (absent) · `docs/source-of-truth/` ❌ (docs live in `docs/`).

---

## Findings A1–A10 (Step 3)

### A1 — "Privacy Policy page is EMPTY" → **DENIED** (fixed-but-undeployed) · Severity: BLOCKER (on live)
`app/privacy-policy/page.tsx` renders full content via `LegalPageLayout`; built `privacy-policy.html` is **38,714 bytes** and contains "Information We Collect", "Retention", "Contact", etc. Server-rendered (present in raw HTML). **Was empty at Этап 4** (stub until Этап 8). *Fix: commit + deploy.*

### A2 — "Legal pages mention Netlify/Cloudflare instead of Vercel/Resend" → **CONFIRMED** · Severity: BLOCKER (legal accuracy)
Rendered privacy + cookie HTML contain **"Netlify" and "Cloudflare"** (not "Vercel"/"Resend"). Evidence:
- `app/privacy-policy/page.tsx:78-79` — "…includes Netlify for hosting and form processing, Cloudflare for DNS and security…"
- `app/cookie-policy/page.tsx:45-46` — "Planned providers may include Netlify … and Cloudflare …"
- "Postmark" is **not** present.
**Root cause = source-of-truth content**, not a code bug: the pages reproduce `texts.md` verbatim (see C3). *Fix scope: update `texts.md` legal copy to the real stack (Vercel/Resend) — owner + counsel; then it flows to the pages. Not fixable in code without altering approved copy.*

### A3 — "No JSON-LD / Schema markup" → **DENIED** (fixed-but-undeployed) · Severity: HIGH (on live)
Homepage `<script type="application/ld+json">` present; `@graph` contains **Organization, WebSite, WebPage, Service, FAQPage** (source: `components/seo/JsonLd.tsx`). **Absent at Этап 4** (added Этап 9). *Fix: deploy.*

### A4 — "No OG / Twitter meta tags" → **DENIED** (fixed-but-undeployed) · Severity: HIGH (on live)
Homepage HTML contains all of `og:title, og:description, og:image, og:url, og:type, og:site_name` and `twitter:card, twitter:title, twitter:description, twitter:image` (from `app/page.tsx` metadata + `opengraph-image.tsx`/`twitter-image.tsx`). **Absent at Этап 4.** *Fix: deploy.*

### A5 — "sitemap.xml not found" → **DENIED** (exists; preview-empty by design) · Severity: HIGH (on live)
`app/sitemap.ts` exists and builds `/sitemap.xml`. In **preview** it is intentionally an empty `<urlset>` (correct isolation); in production it emits **only the homepage** (legal/404 excluded). At Этап 4 it did not exist → "not found" was true then. *Fix: deploy (+ set production mode for a populated sitemap).*

### A6 — "Color palette is default Next.js dark theme (#0A0A0A)" → **DENIED** (false alarm) · Severity: n/a
`app/globals.css` defines the design tokens (`--bg-page:#F8FAFC`, `--text-primary:#0B1220`, `--accent:#1D4ED8`, `--bg-surface:#FFFFFF`) and applies them (`body{background-color:var(--bg-page);color:var(--text-primary)}`). **No `#0A0A0A`, no `@media (prefers-color-scheme: dark)`, no dark override** anywhere. These tokens exist since Этап 1, so the light palette was already live at Этап 4 — **unable to reproduce**; likely an auditor tool/cached-default artifact.

### A7 — "Font is system default, not Inter/Inter Tight" → **DENIED** (false alarm) · Severity: n/a
`app/layout.tsx` loads **Inter** (400/600) + **Inter Tight** (600/700) via `next/font/google` (`--font-body`, `--font-heading`, `display:swap`). Built homepage `<head>` has **2 `rel="preload" as="font"`** links; self-hosted woff2 in `.next/static/media`. Present since Этап 1 → already live at Этап 4.

### A8 — "Same meta description on all pages" → **DENIED** (fixed-but-undeployed) · Severity: HIGH (on live)
Each page has a **unique** title + description matching `texts.md`:
- `/` — "B2B companies with 50–250 employees use Fill System to diagnose…"
- `/privacy-policy` — "Learn how Fill System collects, uses, protects, and retains…"
- `/terms-of-use` — "Review the terms governing access to the Fill System website…"
- `/cookie-policy` — "Learn how Fill System uses necessary and optional analytics cookies…"
At Этап 4 all routes inherited the root default → the finding was true then. *Fix: deploy.*

### A9 — "robots.txt not found or misconfigured" → **PARTIAL** · Severity: LOW
`app/robots.ts` exists and is correct: **preview** → `User-Agent: * / Disallow: /` (no sitemap); **production** → `Allow: /` + `Sitemap:`. Verified `/robots.txt` output. **AI-crawler handling:** there is **no dedicated `GPTBot`/`ClaudeBot` rule** — the wildcard `*` covers them (blocked in preview, allowed in production). `optimization.md` does not require AI-crawler-specific directives, so this is optional, not a defect. *Optional: add explicit `GPTBot`/`ClaudeBot` rules if desired.*

### A10 — "FAQ answers not visible in HTML" → **DENIED** (false alarm) · Severity: n/a
FAQ is a client accordion but **answers are server-rendered in the raw HTML** (panels use the `hidden` attribute, not conditional mounting). Raw homepage HTML contains "Is this a sales call?", "structured diagnostic conversation", "ROI requires baseline data", and the fit-list item "Cross-functional process or system complexity". Crawlable. Present since Этап 3.

---

## Source-of-truth conflict scan (Step 4)

### C1 — string scan → **PARTIAL**
- **`Astro` / `.astro`:** `docs/vibe-coding-stack.md` (pervasive — see C2), and `docs/development-plan.md` (records the **cancelled** Astro migration). **Not in any code.**
- **`Netlify` / `Cloudflare`:** `app/privacy-policy/page.tsx`, `app/cookie-policy/page.tsx` (rendered legal — A2); plus `docs/{texts,vibe-coding-stack,development-plan,optimization}.md` and this audit folder.
- **`Postmark`:** `docs/vibe-coding-stack.md` only ("Netlify Forms + … + Postmark"). **Not in code.**
- **`Clearpath`:** only in `tests/contracts/content-protection.spec.ts` as a **guard string** asserting its absence — **not** used as a brand anywhere in output.
- **`Formspree`, `netlify.toml`, `netlify/functions`, "staging branch":** **none found** in the project.

### C2 — Astro architecture in source-of-truth → **CONFIRMED** · Severity: HIGH (doc)
`docs/vibe-coding-stack.md` describes a **rejected** stack in detail: "Astro 6 static … Netlify Forms + Netlify event function + Postmark …", `.astro` file tree (`index.astro`, `BaseLayout.astro`, `astro.config.mjs`, `→ astro check`, "Astro Netlify adapter"). This **directly contradicts** `development-plan.md` ("сохранить … Next.js App Router … **Миграция на Astro отменена**") and the actual implementation (Next.js/Vercel/Resend). An auditor reading this doc would expect the wrong framework/providers. *Fix scope: `docs/vibe-coding-stack.md` needs a rewrite (or deprecation banner) to the real Next.js/Vercel/Resend stack — owner. (Not modified here — diagnosis only.)*

### C3 — texts.md "planned MVP infrastructure" → **CONFIRMED** · Severity: HIGH (content)
`docs/texts.md:245` (Privacy Policy): *"…The planned MVP infrastructure includes **Netlify** for hosting and form processing, **Cloudflare** for DNS and security, and **Google Analytics 4** only after analytics consent."* The Cookie Policy (`texts.md`, "Strictly Necessary") similarly names Netlify/Cloudflare. This is the **root source-of-truth content error** feeding A2. Actual stack: **Vercel + Resend**. *Fix scope: owner + counsel update `texts.md`; the pages then render correctly.*

*(The prompt references C4–C5 in Step 6 but defines only C1–C3 in Step 4 — no C4/C5 to evaluate.)*

---

## Structure verification (Step 5)

- **Sections:** exactly **11**, IDs in the sitemap order: `hero, problem-section, what-we-diagnose, ai-process-automation, how-the-diagnostic-works, proof-examples, why-fill-system, delivery-model, business-it-diagnostic, faq, final-cta`. ✅
- **Headings:** exactly **one `<h1>`**; sequence `h1 → h2 → h3` throughout — **no level skips**. ✅ (Footer group titles are the trailing `h2`s.)
- **Header nav:** Services / How It Works / Results / FAQ / Request Diagnostic — all present and resolve. ✅
- **Footer + copyright:** matches sitemap.md; copyright exact `© 2026 Fill System. California, USA.` ✅
- **CTA anchors:** all `href="#…"` resolve to existing IDs (contract + E2E). ✅
- **Prohibited content on homepage:** no `O-1`/`O1`/`visa`/`immigration`; no `TODO`/`TBD`/`lorem ipsum`/`FIXME`; no `Clearpath`. ✅
  - Note: `immigration` appears **once site-wide**, only in the Privacy Policy's "do not submit … immigration documents" sensitive-data clause (verbatim approved `texts.md`) — a standard privacy clause, **not** an O-1/immigration-service reference. Compliant.

---

## Recommended fix scope (priority order)

1. **Commit + redeploy the current source** (clears A1, A3, A4, A5, A8 on the live site; refutes A6, A7, A10). *Highest value, no code change.*
2. **A2 / C3 — `texts.md` legal copy:** replace Netlify/Cloudflare (and GA4 provider framing) with the real Vercel/Resend stack; re-review by counsel. Then privacy/cookie pages render correctly. *Owner + legal.*
3. **C2 — `docs/vibe-coding-stack.md`:** rewrite/deprecate the Astro/Netlify/Postmark description to the actual Next.js/Vercel/Resend stack. *Owner.*
4. **A9 (optional):** add explicit `GPTBot`/`ClaudeBot` rules to `app/robots.ts` if AI-crawler control is desired.

## Confirmation

- **No files were fixed** — diagnosis only.
- **`docs/` source-of-truth was not modified.**
- Only new artifact: `docs/audits/external-audit-verification.md`.

# Design — MVP

## Source of Truth

Этот файл определяет только визуальные параметры и component-level правила.

Приоритеты проекта:

1. `sitemap.md` — структура и порядок секций.
2. `texts.md` — тексты, CTA и формулировки.
3. `design.md` — визуальные стили и компоненты.
4. `optimization.md` — SEO, performance, accessibility и технические ограничения.

**Бренд:** Fill System  
**Статус бренда:** working brand. По ручной проверке владельца от 13 июня 2026 года совпадение в California Secretary of State Business Search не найдено, а предполагаемый домен был свободен на момент проверки. Wordmark остаётся редактируемым до trademark clearance, подтверждения legal operator / DBA и регистрации production domain в аккаунте бизнеса.  
**Стиль:** clean B2B technology advisory + restrained enterprise SaaS + structured consulting methodology  
**Позиционирование:** diagnostic-first, senior-led, vendor-neutral, practical, no AI hype

### Visual language — v3 (soft / expensive-SaaS)

> **This supersedes the "blocky / brutalist v2" treatment throughout this file.**
> On 2026-07-18 the site was re-skinned to an expensive-SaaS aesthetic (owner
> directive; copy unchanged). Wherever a section below says **2px ink border**,
> **hard shadow / 8px offset**, **blocky / near-brutalist / near-square corners**,
> or the **shared 2px ink section rule**, read the v3 equivalent:
>
> - **Borders:** 1px hairline (`--border-hair` / `--stone-200`). Solid ink/brand
>   fills keep a same-colour edge. No 2px ink outlines anywhere.
> - **Elevation:** soft ambient shadow (`--shadow-hard` is now redefined to a soft
>   token, so all former hard shadows softened at once). No 8px offset, no −3/−3
>   hover press — cards lift on shadow only.
> - **Corners:** rounded — cards/panels `--radius-lg`; buttons `8px`; chips, tags
>   and pills `--radius-pill`.
> - **Section separation:** whitespace + the paper / stone / brand / ink background
>   rhythm and the full-fill colour blocks. The global 2px ink divider between
>   `<main>` sections is removed.
>
> Palette, type scale, layout, and content rules are unchanged. The core sections
> (Radii/Borders, Тени, Buttons, Color Rules) are rewritten in place below; the
> per-component blurbs inherit the mapping above.
>
> **Durability:** `app/globals.css` is DesignSync-managed (mirrors claude.ai/design,
> still blocky). Reflect the soft tokens at that source or a re-sync can regress
> the re-skin.

### Quick lookup — internal

| Задача | Раздел |
|---|---|
| Цвета, typography, spacing, tokens | `Цвета` → `CSS Variable Reference` |
| Hero и diagnostic SVG | `Hero Layout` |
| Cards, comparison, proof, FAQ | `Типы карточек` |
| CTA и формы | `Buttons and CTA` / `Forms` |
| Header, skip link, footer | `Header` / `Footer` |
| Assets, print, launch constraints | `Brand Identity Launch Rules` / `Print` |
| Финальная проверка | `Design Acceptance Criteria` |

---

## Цвета

v2 palette (block/brand-first). Deep-ultramarine dominates; near-black ink is the structural pair; white paper is the ground; cool stone neutrals; the analytical set is diagnostics-only.

| Назначение | HEX | CSS Variable |
|---|---|---|
| Strong текст / ink surface | `#0A0A0F` | `--text-strong` / `--ink-900` / `--border-strong` / `--bg-inverse` |
| Body текст | `#2C2E38` | `--text-body` (`--stone-700`) |
| Muted текст | `#676B77` | `--text-muted` (`--stone-500`) |
| Faint текст | `#9498A3` | `--text-faint` (`--stone-400`) |
| Текст на brand / ink | `#FFFFFF` | `--text-on-brand` / `--text-on-dark` |
| Фон страницы (paper) | `#FFFFFF` | `--paper` / `--bg-page` |
| Stone band (alternate) | `#F2F2F4` | `--stone-100` / `--bg-band` |
| **Brand blue — DOMINANT** / CTA | `#2551D2` | `--blue-500` / `--accent` / `--bg-brand` |
| Brand blue hover | `#183CA5` | `--blue-600` / `--accent-hover` |
| Blue tint: chips | `#EDF1FC` | `--blue-50` / `--accent-tint` |
| Hairline border | `#E5E6EA` | `--stone-200` / `--border-hair` |
| Focus | `#2551D2` | `--focus-ring` |
| Evergreen — delivered / success (diagnostics) | `#17A26A` | `--evergreen-500` |
| Amber — effort / warning (diagnostics) | `#E1A21A` | `--amber-500` |
| Clay — risk / error (diagnostics) | `#E64A2E` | `--clay-500` |

### Color Rules (v2)

- Brand blue dominates as a **full-fill surface** (hero panel, Problem, Final CTA, form accents). Near-black ink is the structural pair: `dark` buttons, ink-full sections, footer, and the darkest text. (v3: ink is no longer a 2px outline colour — borders are hairline stone.)
- Backgrounds are **solid fills, never gradients**. Sections alternate between four surfaces only: paper, stone band, ink, brand — and it is this rhythm (plus whitespace), not divider rules, that separates blocks.
- The analytical set (evergreen / amber / clay) is reserved for diagnostics (matrix quadrants, process-map flags, delivered rows) plus two sanctioned outcome accents: the AI flow **Roadmap / limited scope** step pill (evergreen) and the comparison-table `X` (clay). Green = validated outcome / roadmap; Amber = effort/dependency; Clay/red = risk/error.
- Не использовать цвет как единственный способ передать статус.
- Visited links: `var(--accent-hover)` for text links; single-page anchor nav may keep `var(--accent)`. Do not rely on browser default purple.

---

## Типографика

### Font Families

```css
--font-display / --font-sans: "Mulish", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;
```

- Заголовки и body: `Mulish` (weight-driven — 900 display, 800 sub-heads, 700 UI, 600 emphasis, 400–500 body)
- Eyebrows, labels, data readouts, badges: `JetBrains Mono`
- Не использовать альтернативный heading font.
- Не использовать декоративные, sci-fi или startup-display fonts.
- Максимум 2 font families.

### Typography Scale

Type sizes are driven by fluid `clamp()` tokens from the design system
(`tokens/typography.css`, mirrored in `app/globals.css` as `--fs-*`). Sizes below
list the **mobile floor → desktop ceiling**; each value resizes smoothly between
them — there are **no per-breakpoint `px` overrides**.

| Уровень | Token | Mobile → Desktop | Weight | Line-height | Letter-spacing | Шрифт |
|---|---|---:|---:|---:|---:|---|
| Mega (hero) | `--fs-mega` | `56 → 104px` | `900` | `0.98` | `-0.028em` | Mulish |
| Display | `--fs-display` | `44 → 72px` | `900` | `0.98` | `-0.028em` | Mulish |
| H1 | `--fs-h1` | `36 → 52px` | `900` | `0.98` | `-0.028em` | Mulish |
| H2 | `--fs-h2` | `28 → 40px` | `900` | `1.02` | `-0.028em` | Mulish |
| H3 | `--fs-h3` | `24px` | `800` | `1.12` | `-0.015em` | Mulish |
| H4 | `--fs-h4` | `20px` | `700` | `1.12` | `-0.015em` | Mulish |
| Lead | `--fs-lead` | `20px` | `500` | `1.5` | `0` | Mulish |
| Body | `--fs-body` | `16px` | `400` | `1.55` | `0` | Mulish |
| Small | `--fs-sm` | `14px` | `400` | `1.5` | `0` | Mulish |
| XSmall | `--fs-xs` | `13px` | `400` | `1.4` | `0.01em` | Mulish |
| Eyebrow / label | `--fs-eyebrow` | `12px` | `500` | `1.4` | `0.14em` | JetBrains Mono |

> The hero headline (`Hero.module.css`) uses `--fs-mega`/display-scale sizing and
> may set a slightly tighter tracking (`-0.032em`) as a component treatment; the
> base `h1` element uses `--fs-h1` + `--ls-display` (`-0.028em`).

### Typography Rules

- Один H1 на страницу.
- H1 должен помещаться максимум в 2 строки на desktop и 3 строки на mobile.
- Subtitle в Hero визуально может выглядеть как lead, но семантически остаётся paragraph.
- Body line length: ориентир 60–78 символов.
- Абзац: максимум 2–4 строки.
- После 4 строк текста использовать list, card, table, visual или новый sub-block.
- Не использовать CAPS для длинных сообщений.
- Bold — только для problem, risk, deliverable, metric и CTA.
- Важный helper text и form microcopy не должен выглядеть бледным или второстепенным.

---

## Spacing Scale — 8px Grid

| Token | Значение | Использование |
|---|---:|---|
| `--space-1` | `8px` | Между icon и label, минимальный gap |
| `--space-2` | `16px` | Между связанными элементами: label → input |
| `--space-3` | `24px` | Default gap внутри блока, формы, bullets |
| `--space-4` | `32px` | Между card groups и paragraphs |
| `--space-5` | `48px` | Между sub-blocks внутри секции |
| `--space-6` | `64px` | Между секциями на mobile |
| `--space-7` | `96px` | Между секциями на desktop |

### Edge Padding

- Desktop: `40px`
- Tablet: `32px`
- Mobile: `20px`
- Card internal padding: `32px` desktop / `24px` mobile
- Panel internal padding: `48px` desktop / `24px` mobile

### Container

- Единый max-width задаётся в `optimization.md`.
- Design-файл не создаёт альтернативное значение container width.
- Максимальная ширина текстовой колонки: `720px`.

### Breakpoints

Breakpoints, responsive implementation и device QA — см. `optimization.md`.

---

## Grid and Layout

- Desktop grid: `12 columns`.
- Hero: split layout на desktop, single column на tablet/mobile.
- Standard content block: 6/6 или 5/7 columns.
- Cards: 3 columns desktop / 2 tablet / 1 mobile.
- Proof cards: одна колонка, stacked.
- Form: одна колонка на mobile; desktop может использовать 2-column layout только для коротких связанных полей.
- Large desktop увеличивает whitespace, а не ширину текста.
- Каждый экран должен выполнять одну задачу: problem, diagnosis, methodology, proof, trust, CTA или form.

### Section background rhythm

Default: all sections use `var(--bg-page)`.
Optional: even-numbered sections may use `var(--bg-subtle)` for visual rhythm when whitespace alone is insufficient.

Exceptions:
- Business & IT Diagnostic (#9): may use `var(--accent-light)` panel or distinct surface to emphasize conversion.
- Final CTA (#11): may use `var(--accent)` background with `var(--text-on-accent)`.
- Footer: dark surface per footer spec.

Once a pattern is chosen, maintain it consistently.

---

## Radii and Borders

| Component | Radius |
|---|---:|
| Input | `8px` |
| Button | `8px` |
| Card / panel / featured block | `10px` (`--radius-lg`) |
| Chip / tag / pill | `--radius-pill` |

- Default border (v3): **`1px solid var(--border-hair)`** (`--stone-200`) — a soft hairline. This is the standard edge on cards, panels, form, header, footer, and dividers.
- Solid ink/brand surfaces keep a **same-colour edge** (no contrasting outline). On dark/brand surfaces use the on-dark/on-brand hairline (`rgba(255,255,255,.16–.28)`).
- Focus border: `var(--focus-ring)`.
- v3 is **soft and surface-led** — rounded corners, hairline edges, and soft ambient shadow define blocks; there are **no 2px ink borders and no ink section dividers** (the former blocky/brutalist treatment is retired).

---

## Тени

| Уровень | CSS | Использование |
|---|---|---|
| `sm` | `0 2px 4px rgba(10,10,15,0.06)` | card rest state |
| `md` | `0 8px 20px rgba(10,10,15,0.10)` | hover, dropdown, sticky header (when scrolled) |
| `lg` | `0 24px 44px rgba(10,10,15,0.16)` | modal / dialog / drawer |
| `hard` | soft ambient (`0 1px 2px + 0 6px 20px` at low alpha) | headline cards, form, scenario report, hero panel |
| `brand-hard` | soft brand-tinted ambient | elevated brand card (hero summary) |

### Shadow Rules (v3)

- Elevation is a **soft ambient shadow** — the `--shadow-hard` / `--shadow-brand-hard` tokens keep their names but now resolve to soft values, so every former "hard" surface reads soft. No 8px offset, no block-print.
- Interactive cards **lift on shadow only** (rest `sm` → hover `md`). No −3/−3 press, no scale.
- Depth comes from **hairline border + soft shadow**, not from a hard outline. Keep shadows restrained — premium-SaaS, not heavy.

---

## Transitions

| Token | Значение | Использование |
|---|---|---|
| `--dur-fast` / `--transition-fast` | `100–150ms var(--ease-out)` | Hover, focus, button states |
| `--dur-med` / `--transition-normal` | `180–200ms var(--ease-out)` | Accordion, tooltip, dropdown |
| `--dur-slow` / `--transition-slow` | `320ms var(--ease-in-out)` | Mobile menu, modal |

Easing: `--ease-out: cubic-bezier(0.22, 0.61, 0.36, 1)` (no bounce, no spring, no infinite loops).

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition-duration: 0ms !important;
    animation-duration: 0ms !important;
    scroll-behavior: auto !important;
  }
}
```

- Motion помогает ориентации, а не развлекает.
- Запрещены scroll-jacking, parallax на mobile, autoplay animations и looping decorative motion.

---

## CSS Variable Reference

The single source of truth for all design tokens in CSS is **`app/globals.css`**
(the v2 `:root`), which mirrors the `Fill System Design System` project
(`styles.css` → `tokens/*.css` on claude.ai/design). Token values are not restated
here — read them from `app/globals.css` so this doc cannot drift from the build.

| Group | File (design system) | Mirrored in |
|---|---|---|
| Fonts (Mulish + JetBrains Mono) | `tokens/fonts.css` | `app/globals.css` + `next/font` in `app/layout.tsx` |
| Colors (blue / ink / stone / semantic) | `tokens/colors.css` | `app/globals.css` `:root` |
| Type scale + weights + tracking | `tokens/typography.css` | `--fs-*`, `--fw-*`, `--ls-*`, `--lh-*` |
| Spacing | `tokens/spacing.css` | `--space-*` (see spacing note) |
| Elevation / radii / borders / motion | `tokens/elevation.css` | `--radius-*`, `--shadow-*`, `--ease-*`, `--dur-*` |
| Element defaults + eyebrow | `tokens/base.css` | `app/globals.css` base layer + `.kicker` / `.ops-eyebrow` |

**Spacing note.** The design system's `--space-*` scale is a **4px rem grid**
(`--space-1` = 4px … `--space-8` = 32px). This implementation keeps the **8px px
grid** (`--space-1` = 8px … `--space-8` = 104px) because every existing section and
component consumes those values; the two share a 4px superset but the token *names
are not interchangeable*. `app/globals.css` is authoritative for local spacing.

**Mono wiring.** JetBrains Mono is self-hosted via `next/font` (`app/layout.tsx`),
which registers it under its real family name. Local CSS consumes it through
`--font-mono-fallback` (`"JetBrains Mono", ui-monospace, …`); the literal name
resolves to the loaded face, so mono readouts render in the brand mono.

> Historical note: a v1 `:root` snapshot (Inter fonts, warm-paper palette, soft
> shadows) previously lived here. It was removed once the v2 tokens became the
> source of truth; see git history (`docs(rebrand)` phases) for the original.

---

## Визуальный стиль

### Must Feel Like

- Executive clarity
- Technical credibility
- Diagnostic structure
- Calm confidence
- Senior-led boutique advisory
- Practical roadmap thinking
- Vendor-neutral decision support
- Safe first step before implementation

### Must Not Feel Like

- Outsourcing vendor
- Staff augmentation marketplace
- SaaS product
- Generic corporate brochure
- Creative agency
- AI-hype startup
- Immigration-service website
- Big 4 clone with abstract messaging

"Immigration-service website" means:
- No flag imagery, passport or visa stamp visuals
- No globe-with-arrows graphics
- No patriotic color schemes (red/white/blue prominence)
- No "your dream" or "new beginning" emotional framing
- No stock photos of diverse professionals at border/airport

### Approved Visual Types

- Diagnostic system map
- Process flow
- CRM/data-flow diagram
- Bottleneck map
- Priority matrix
- Automation opportunity map
- AI readiness scorecard
- Roadmap timeline
- Before / approach / outcome proof card
- Architecture / integration diagram

### Prohibited Visual Types

- Stock handshake
- Generic meeting-room photos
- Developers typing code as hero
- AI robot
- Glowing brain
- Neon sci-fi gradients
- Abstract 3D blobs
- Decorative dashboards without business meaning
- Fake client logos or awards

---

## Hero Layout

### Desktop

- Split grid: left `1.15fr` / right `0.85fr` (text / brand panel).
- Left order:
  1. `+` mono eyebrow / category label
  2. Mega Mulish-900 H1 (final term set in `--blue-500`)
  3. Lead (Mulish 500)
  4. Supporting text
  5. Primary and secondary CTA (blocky)
  6. Trust stats row (3 block numerals + mono captions)
- Right: **brand-blue diagnostic-summary card** (`HeroSummary`) — subtle 1px edge, soft brand shadow, rounded, corner `+` mark; an illustrative diagnostic report (Situation → Diagnostic found → Delivered) plus two headline metrics (`$180K+` revenue at risk, `30-day` cleanup). Figures are illustrative and estimate-framed, mirroring Scenario 01 — not verified Fill System results.
- Sections separate by whitespace + the background rhythm — no divider rule.
- Primary CTA remains the strongest visual action.

### Tablet

- Single column.
- Order: H1 + subtitle + CTA → trust stats → visual.

### Mobile

- Single column.
- Order: H1 + subtitle + primary CTA + secondary CTA → trust stats.
- Primary CTA: full width.
- Secondary CTA: text link or outlined button.
- The hero summary card is hidden on mobile (`Hero.module.css`).
- CTA must appear before any large visual.

### Trust stats row

Replaces the earlier ICP chip + trust-line paragraph. Three stats, each a block
Mulish-900 numeral + mono uppercase caption, separated from the CTA group by the
signature hairline rule:

- `4–6` — Active clients at a time
- `50–250` — Employees · best fit (carries the ICP qualifier; see ICP Qualifier)
- `Since 2021` — Boutique advisory

### Hero Diagnostic Summary — visual specification (v2)

Type: **brand-blue summary card** (`components/ui/HeroSummary.tsx`) — an
illustrative diagnostic report (the scenario triad + two headline metrics), not a
node-and-connection diagram.

Panel:
- Background: `var(--blue-500)` solid fill; paper text
- Border: `1px solid var(--blue-600)` (subtle same-family edge); radius `--radius-lg`; soft brand shadow (`--shadow-brand-hard`)
- Corner `+` mark (`PlusMark`), paper, top-right
- Fills the hero brand column (`width: 100%`)

Header:
- Mono label `Diagnostic summary · illustrative` (`--text-on-brand-muted`)
- Client line `B2B services firm · ~80 employees` (Mulish `900`, ~22px)

Rows (three, divided by hairlines) — mirror the scenario triad:
- `01 · Situation` — Leads dropping between marketing & sales
- `02 · Diagnostic found` — 4 undocumented handoff points, 2 teams
- `03 · Delivered` — 5 steps → single owner per stage

Metrics (bottom, above a `2px` paper rule; `margin-top:auto` bottom-aligns them):
- `$180K+` — Revenue at risk (est.)
- `30-day` — Cleanup priority

Rules:
- Figures are illustrative and estimate-framed, mirroring Scenario 01 — never
  presented as a verified Fill System result. The hero deliberately leads with this
  summary card (this reverses the earlier "abstract, no metrics in the hero" rule).
- On mobile the card is hidden (`Hero.module.css`).

> Superseded: the earlier v1 (light node SVG) and v2a (brand node-map panel,
> `HeroDiagram.tsx`) hero visuals. `HeroDiagram.tsx` remains in the repo but is no
> longer imported; kept in git history.

---

## Типы карточек

### Service Card

Used in:

- What We Diagnose (two area cards + shared "You receive" output bar + O-1 ink panel)

Structure:

1. Lucide icon, `30px`, `--accent`
2. H3 title (Mulish `900`, ~24px)
3. Description, maximum 2–3 lines
4. Shared "You receive" output bar — mono outline badges from the `texts.md` Output line

Rules (v2):

- Soft `Card`: 1px hairline border, `--radius-lg`, soft ambient shadow on the area cards; icon in a rounded blue-50 tile; row layout (icon left) on desktop
- Tones: `paper` + `blueTint` area cards; the O-1 secondary service is an **ink tile + paper body** panel
- Grid: 2 columns desktop / 1 mobile (area cards)
- Icon is supporting, never the only label; no technology logo as primary visual

### Step Card

Used in:

- How the Diagnostic Works
- What Happens After You Submit the Request sub-block inside Business & IT Diagnostic

Structure:

1. Top row: big Mulish-900 step number (`01`/`02`/`03`, `--blue-500`; white on the featured column) + a functional corner icon (Lucide, `--accent`; white on featured)
2. Step title (Mulish-800) — `Review` / `Map & score` / `Recommend`
3. Short description (verbatim from `texts.md`)

Rules (v2):

- Soft column: 1px hairline border, `--radius-lg`, soft shadow; brand-blue chevron connectors in the desktop gutters read 01→02→03 as a flow
- Middle/featured column filled brand blue (`--blue-500`)
- Step number visually prominent
- 3-column grid on desktop / stacked on mobile

### Scenario / Proof Card

Used in:

- Diagnostic Scenarios

Structure:

1. Client type
2. Problem
3. Approach
4. Outcome or operational change
5. Timeline, only if confirmed
6. Anonymized note where required

Rules (v2):

- Report card: `paper` surface, 1px hairline border, `--radius-lg`, soft shadow
- Brand-blue header: `Scenario · 0N` + client + environment pill tags (`--radius-pill`)
- Three stacked rows — Situation (ink) / Diagnostic found (blue) / Delivered (evergreen) — each with a triad-colored Lucide icon (`Info` / `Search` / `CheckCircle2`) + mono num + label + text, divided by a hairline rule
- One-column stacked layout
- Do not invent names, logos or testimonials.
- A real anonymized case must be supported by an internal source record and approval.
- An illustrative composite must be labeled as illustrative and use an anonymized / generic client descriptor (e.g. `B2B services firm (≈80 employees)`), never a real or invented company name. It keeps the design-system triad row labels — Situation / Diagnostic found / **Delivered** — as structural headers; the DS `DiagnosticScenarioCard` образец retains "Delivered", so the label itself is not a factual proof claim.
- Quantified figures must be framed as estimates or ranges — `estimated`, `revenue at risk`, `projected`, `≈`, `est.` — matching the образец; they must never read as verified realized results, actual Fill System performance, or a guaranteed outcome, and a figure must not be styled as a standalone verified metric tile.
- Realized-sounding past tense is acceptable only for structural changes the diagnostic frames (e.g. "handoff reduced from 5 steps to 2"), not for money or hours saved, which stay estimate-framed.

### Comparison Card / Table

Used in:

- Why Fill System

Structure:

- What others do first
- What Fill System does first

Rules (v2):

- Bordered table (1px hairline border, `--radius-lg`, soft shadow), two columns on desktop; the winning Fill System column carries a `--blue-50` tint
- Ink header `What others do first` | brand header `What Fill System does first`
- Others rows: `X` (`--clay-500`) + muted text; Fill System rows: `Check` (`--blue-500`) + Mulish-800 ink text
- Do not make competitors look deceptive; compare operating approaches

### Mobile comparison layout

The two columns collapse to a single column; cells stack in order (others cell, then Fill System cell, per row). The `X` / `Check` icon and the weight contrast keep each cell self-labeled — do not split into two separate lists. The paired contrast is the core message.

### Delivery Role Card

Used in:

- Delivery Model

Structure:

1. Header: initials tile (`MP` / `SA`) + role name + mono role subtitle (`Operating model & diagnostic lead` / `CRM / RevOps & data flow`)
2. `Role in the engagement` mono divider label
3. Responsibilities as functional Lucide icon bullets (verbatim terms from the `texts.md` Focus line)
4. Relevant environments (mono tags), shared across the section

Rules (v2):

- Ink block: two role cards — card 1 `brand` (blue), card 2 `paper`, both soft (hairline + soft shadow, rounded); role subtitle + environments as `--radius-pill` tags
- Maximum 2 cards for MVP
- Do not present unverified real clients, real metrics, certifications, awards, logos, reviews, names, years, or Fortune 500 claims.
- No stock or fictional portrait placeholders. Identity is an **initials tile** (`MP` / `SA` — dark on the brand card, blue on the paper card), the role name, and a short role subtitle; responsibilities use functional Lucide icon bullets. No real photos or invented credentials.

### ICP Qualifier

Used in:

- Hero trust stats row (the `50–250` stat)
- FAQ company-fit answer

Content:

- `Best fit: B2B companies with 50–250 employees`

Rules:

- Present as supporting text, a hero trust stat, or a compact subordinate chip — never as the H1 or dominant badge.
- In the Hero it now appears as the `50–250 · Employees · best fit` stat inside the trust stats row (Mulish-900 numeral + mono caption), not a standalone chip. Elsewhere (e.g. the FAQ fit answer) a neutral `--bg-subtle` / `--text-secondary` chip is fine. Either way keep it subordinate — never a warning, eligibility gate, or exclusive-membership badge.
- Keep the qualifier visible on mobile without placing it above the primary value proposition.
- Do not repeat the employee range across multiple cards or sections.
- Companies outside the range are not visually marked as unqualified.

### Fit / Not Fit Answer Pattern

Used in:

- FAQ qualification answers

Structure:

1. Question: `Who do you work with best?`
2. Four concise fit criteria
3. Question: `When are you not the right fit?`
4. Four concise not-fit criteria
5. Neutral no-fit outcome statement

Rules:

- Use semantic bullet lists, not a dense paragraph on mobile.
- `CheckCircle2` and `XCircle` may support labels, but text must carry the meaning.
- Fit and not-fit states must not rely on green / red alone.
- Do not use arrogant wording, budget shaming, or an automatic company-size rejection.
- Automation and AI uncertainty belong in Fit; tool-first execution without problem definition belongs in Not Fit.

### Diagnostic Offer Card

Used in:

- Business & IT Diagnostic

Structure:

1. Badge: the complimentary fit-review label (`Complimentary 30–45 min fit
   review`, from `texts.md`). The "safe first step" idea is carried by the offer
   title (`texts.md` H2) and the Visual Style "Must Feel Like" list, not a
   separate invented badge string.
2. Offer title
3. Complimentary 30–45 minute fit review
4. What the visitor receives
5. What is not included
6. Primary CTA
7. Low-risk microcopy

Rules:

- Featured panel, not pricing card
- Background: `--accent-light` or white with accent border
- CTA: `Request a Business & IT Diagnostic`
- Must not promise a free full audit, roadmap or ROI calculation
- Badge and all offer copy come from `texts.md` (higher priority than this doc);
  do not introduce a badge label that is not in `texts.md`.

### Risk-Reduction Panel

Used in:

- Before You Commit sub-block inside Business & IT Diagnostic

Structure:

1. H2 or H3
2. Review assets
3. Access / NDA rule
4. Privacy notice
5. Optional link to Privacy Policy

Rules:

- Calm, low-friction styling
- Use Shield / FileText icons only as support
- Avoid warning-red treatment
- Place close to the form

### FAQ Item

Structure:

1. Question, H4
2. Chevron indicator
3. Collapsible answer

Rules:

- Divider: `1px solid var(--border-hair)` (soft hairline between items); the +/× toggle box is a rounded hairline square
- Padding: `24px 0`
- Full question is a button
- Entire trigger has minimum `44px` touch height
- Open state must not rely only on icon rotation
- Only one item may be open by default
- First item may be open on initial load

---

## Buttons and CTA

Buttons (v3): Mulish `700`, `15px`, softly rounded (`8px`), `1.5px` borders.

### Primary Button

- Background: `var(--accent)`; Text: `var(--accent-on)`; Border: `1.5px solid var(--accent)`
- Hover: `var(--accent-hover)` (fill + border)
- Radius: `8px`; Minimum height: `44px`; Padding: `14px 22px`
- Optional trailing icon: ArrowRight, `20px`

### Secondary Button (outline)

- Background: transparent; Text: `var(--ink-900)`; Border: `1.5px solid var(--ink-900)`
- Hover: **invert to filled ink** — background `var(--ink-900)`, text `var(--paper)`
- Radius: `8px`; Minimum height: `44px`

### Additional variants (v2)

- `dark` (solid ink), `on-brand` (paper fill for use inside blue blocks), `on-brand-outline` (paper border on blue).

### Text Link

- Color: `var(--accent)`
- Underline on hover and focus
- Arrow icon optional
- Never use muted gray for primary navigation or important action

### CTA Hierarchy

- Maximum one primary CTA per section.
- Maximum one secondary CTA beside it.
- Primary action across the page: diagnostic request.
- Contextual CTAs must use exact wording from `texts.md`.
- Generic `Contact Us`, `Learn More`, `Submit` are prohibited as primary CTA.
- All CTA destinations are defined in `sitemap.md`.

---

## Forms

### Visual Structure

- Visible labels above inputs.
- Placeholder never replaces label.
- Required status communicated by text, not only an asterisk.
- Input minimum height: `44px`.
- Textarea minimum height: `144px`.
- Gap label → input: `8px`.
- Gap field → next field: `24px`.
- Error message directly below field.
- Submit button visible without ambiguity.
- Privacy notice directly before or after submit control.

### States

| State | Visual rule |
|---|---|
| Default | White background, default border |
| Hover | Slightly darker border |
| Focus | blue border (`--blue-500`) + `--ring` glow (`0 0 0 3px`) |
| Error | Error border + text explanation |
| Success | Success icon + confirmation text |
| Disabled | Muted surface and text, reason must remain clear |
| Loading | Button keeps width, shows loading label / spinner |

### Submission State

On submit click:
- Button: text changes to `Submitting...`, spinner appears, width preserved, `pointer-events: none`
- Fields: opacity `0.6`, `pointer-events: none`
- No overlay, no modal, no redirect until confirmed
- If >3 seconds without response: show `Still processing...` below button in `var(--text-secondary)`, Small
- Prevent duplicate submission via disabled button state

### Form Panel

- Soft form panel (v3): 1px hairline border, `--radius-lg`, soft shadow, ink `+`-header (title + fit-review pill badge).
- Inputs: 1px border (`--stone-300`), `8px` radius, `≥16px` font (no iOS zoom); mono uppercase labels; blue focus ring.
- Composite layout: ink diagnostic-output panel + "Before You Commit" card on the left; "After you submit" steps + the form on the right.
- Show the 4 required fields first: Name, Work Email, Company, Main Challenge.
- Place an accessible disclosure control after the required fields: `Add more context (optional)`.
- Keep Company Website, Role, Company Size, Timeline, and Request Type collapsed by default.
- Company Size is qualification context only: do not preselect 51–100 / 101–250, visually highlight those options, or show rejection messaging for other ranges.
- Expanded optional fields remain visually subordinate but fully readable and editable.
- Disclosure control must show open / closed state with text plus icon; do not rely on icon or color alone.
- Place “What happens next” near the form.
- Place “Four required fields. Additional context is optional.” and “No full system access is required” near submit.
- No multi-step wizard, full-screen form modal, or forced optional step on MVP.
- No hidden consent language.

Field list, routing and technical validation rules live in `optimization.md`.

### Progressive Disclosure Control

Element: `<button>` with `aria-expanded` or `<details><summary>`
Appearance: text link style (not full-width button, no background)
Text closed: `Add more context (optional)`
Text open: `Hide optional fields`
Icon: ChevronDown (closed) → ChevronUp (open), `16px`, right of text
Color: `var(--accent)`
Hover: underline
Touch target: minimum `44px` height
Transition: `var(--transition-normal)` on content reveal
Gap from last required field: `var(--space-4)` (`32px`)
Gap to first optional field: `var(--space-3)` (`24px`)

---

## Cookie Consent

- Compact bottom bar or small non-blocking panel.
- Message remains readable on mobile.
- Actions:
  - Accept
  - Decline
  - Cookie Policy (the banner links to its own policy; the Privacy Policy remains reachable from the footer Legal group)
- Accept and Decline must be visually accessible.
- Do not preselect optional analytics consent.
- Do not use a full-screen blocking modal.
- Do not use dark patterns.
- Cookie and tracking behavior is defined in `optimization.md`.

---

## Header

### Skip Link

First focusable element on the page.
Visually hidden by default. Visible on `:focus`.
Text: `Skip to main content`
Target: id on `<main>` element

Style on `:focus`:
- `position: fixed`
- `top: var(--space-1)`
- `left: var(--space-1)`
- `background: var(--accent)`
- `color: var(--text-on-accent)`
- `padding: 8px 16px`
- `border-radius: 8px`
- `z-index`: above sticky header
- font: Body weight `600`

### Desktop (v2)

- Sticky; **1px hairline bottom rule**; `shadow-md` when scrolled. Height `76px`.
- Logo left: Mulish-900 wordmark + solid **`OS` tile** (blue fill, paper text).
- Navigation right (Mulish `700`): Services / How It Works / Results / FAQ.
- Primary CTA right (blocky): `Request Diagnostic`.

### Mobile (v2)

- Logo left; menu trigger right = **solid ink square** (paper icon).
- Drawer (1px hairline left border) contains the same links; primary CTA near the top.
- Touch targets: minimum `44px`. No mega menu.

---

## Footer

- v3: full **ink** surface (`--ink-900`), faint hairline top rule, mono uppercase group labels, paper links.
- Three groups: Company / Get Started / Legal (Privacy Policy / Terms of Use / Cookie Policy).
- Footer CTA panel appears above the links. Do not create a large link directory.

### Footer surface (v2)

| Element | Color |
|---|---|
| Background | `--ink-900` (`#0A0A0F`) |
| Body / links | `#FFFFFF` (paper) |
| Link hover | `--blue-300` |
| Group labels (mono) | `rgba(255,255,255,0.66)` |
| Muted / copyright (mono) | `rgba(255,255,255,0.66)` |
| Divider | `rgba(255,255,255,0.15)` |

These colors are scoped to the footer only and override the default light-surface palette within the footer.

---

## Icon Inventory

**Library:** Lucide  
**Style:** line  
**Stroke:** `1.5px`  
**Use:** functional and semantic only

### Navigation

- Menu
- X
- ChevronDown
- ChevronRight
- ArrowRight
- ArrowUpRight
- ExternalLink

### CTA / Actions

- ArrowRight
- Calendar
- FileText
- Send
- Download

### Services

- GitBranch — processes
- Database — data
- BarChart3 — analytics
- Cpu — automation / AI
- Shield — risk
- Layers — systems
- Workflow — automation
- Bot — AI agents

### Status

- CheckCircle2 — fit / success
- XCircle — not fit
- AlertTriangle — warning / risk
- Clock — timeline
- Info — information

### Contact

- Mail
- Phone
- MapPin
- Linkedin
- ExternalLink

### Sizes

- In text / buttons: `20px`
- In cards: `24px`
- Decorative / hero: `32px`
- Minimum touch target around icon: `44px`

### Icon Rules

- Do not mix icon libraries.
- Do not use icons without text for unfamiliar actions.
- Do not use decorative icons as substitutes for proof.
- Bot icon may appear only inside AI & Process Automation, never in Hero.

---

## Section-Level Visual Map

The order follows `sitemap.md` and `texts.md`.

| Section | Recommended visual treatment |
|---|---|
| Hero | Split text (with trust stats row) + diagnostic-summary card |
| Problem Section | 3–5 symptom / root-cause cards |
| What We Diagnose | Service cards with outputs |
| AI & Process Automation | 3 step pills (blue → ink → green) + scope box, restrained |
| How the Diagnostic Works | 3 numbered step cards with corner icon + title |
| Diagnostic Scenarios | Full-width anonymized scenario / proof cards |
| Why Fill System | Comparison table / paired cards |
| Delivery Model | Two senior delivery-role cards (initials tile + role subtitle + icon bullets) |
| Business & IT Diagnostic | One composite panel: offer → risk reduction → post-submit steps → form |
| FAQ | Accessible accordion; Fit / Not Fit answers use semantic lists |
| Final CTA | Strong CTA panel with primary + secondary action |

---

## Top-Level Section Grouping

- The landing page has exactly 11 top-level visual sections from `sitemap.md`.
- Business & IT Diagnostic is one composite conversion section, not four visually disconnected full-width sections.
- Inside that section, use clear sub-block hierarchy for the offer, `Before You Commit`, post-submit steps, and form.
- Sub-blocks may use cards or panels, but they share one section background, one H2 context, and one conversion narrative.
- Do not create separate navigation anchors for the risk-reduction and post-submit sub-blocks.
- Keep `#diagnostic-request-form` as the nested form target for CTA routing.

---

## Visual Fallbacks

If an approved asset is missing, use a semantic placeholder.

```html
<!-- VISUAL: diagnostic system map showing interconnected nodes:
Processes, CRM / RevOps, Data, Automation and IT Systems -->
```

Placeholder styling:

```css
.visual-placeholder {
  background: var(--bg-subtle);
  border: 1px dashed var(--border-default);
  border-radius: 16px;
  color: var(--text-secondary);
  min-height: 240px;
  padding: 24px;
}
```

Rules:

- Placeholder text must explain what asset belongs there.
- Do not use lorem ipsum.
- Do not use random stock images as fallback.
- Do not present placeholders as completed proof.
- Placeholder comments must be removed or replaced before production launch.

---

## Правила текста в Layout

- Тексты и CTA берутся только из `texts.md`.
- Разрешено сокращать текст для fit-to-layout без изменения смысла.
- Разрешено объединять два соседних предложения.
- Для mobile разрешены shorter heading variants, если смысл сохранён.
- Не менять рабочий язык сайта с English.
- Использовать Fill System как рабочий бренд; не переименовывать без owner approval.
- Не создавать новые offers, pages, cases, metrics, logos, certifications или reviews.
- Не использовать lorem ipsum.
- Не переписывать diagnostic-first positioning.

---


## Brand Identity Launch Rules

- Использовать `Fill System` как рабочее название во всех макетах.
- Не добавлять `LLC`, `Inc.`, `Corp.`, `®` или другой legal / registration marker без подтверждённого статуса.
- Wordmark и logo lockup должны оставаться редактируемыми до завершения clearance; не переводить название в необратимые image assets.
- Не размещать неподтверждённый production domain, email или social handle внутри макетов.
- Social cards, favicon, legal footer и exported assets обновляются только после финального owner approval бренда и домена.

### Development placeholders

Favicon: simple `O` lettermark in `var(--accent)` on transparent, sizes `32×32` and `180×180` (Apple touch icon).

OG image: `1200×630`, `var(--bg-page)` background, `Fill System` centered in `var(--text-primary)`, subtitle below in `var(--text-secondary)`.

Both must be replaced with approved brand assets before production deployment.
Do not include placeholder assets in production launch.

---

## Print

`@media print`:
- Remove sticky header, footer CTA panel, cookie banner
- Show simplified header: logo text + site URL
- All backgrounds → white
- All text → `var(--text-primary)` or `#000`
- Show link URLs: `a::after { content: " (" attr(href) ")"; }`
- Hide hero visual, decorative SVG, icons
- Form section → `Visit [domain] to request a diagnostic`
- `page-break-before`: FAQ, Final CTA
- Body font: `11pt`; H2: `14pt`; H1: `18pt`
- Remove all transitions and animations

## Design Acceptance Criteria

- Используется рабочий бренд Fill System; предварительная California name search и проверка доступности домена отмечены как owner-reported, но logo и wordmark остаются редактируемыми до trademark clearance и регистрации домена.
- В логотипе и footer отсутствуют неподтверждённые `LLC`, `Inc.` и `®`.
- Заголовки используют Mulish (900/800, tight negative tracking).
- Body использует Mulish; eyebrows / labels / data readouts используют JetBrains Mono.
- Цвета используют утверждённые CSS variables.
- `#CBD5E1` не используется как текстовый цвет.
- Spacing построен на 8px grid.
- Breakpoints не дублируются и берутся из `optimization.md`.
- Hero соответствует v2 split-grid layout (text `1.15fr` / brand panel `0.85fr`); правая панель — diagnostic-summary card (`HeroSummary`), слева — trust stats row.
- Primary CTA видим без скролла.
- Все секции из `sitemap.md` имеют визуальное решение.
- AI section не выглядит как AI-hype.
- O-1 Readiness Support присутствует только как вторичная карточка в What We Diagnose, один FAQ и один form request type; отсутствует в Hero, H1, header nav, primary CTA, meta и primary JSON-LD Service.
- Cards сканируются за 5–8 секунд.
- FAQ имеет доступный accordion pattern.
- Form содержит visible labels, clear states и privacy notice.
- Нет fake logos, fake testimonials или fake awards, и нет сфабрикованных верифицированных метрик. Illustrative estimate-framed цифры допустимы только явно помеченными как illustrative и estimate-framed (hero summary card, scenario cards) — см. Scenario / Proof Card и Hero Diagnostic Summary.
- Нет stock handshake, meeting-room cliché, robots или neon gradients.
- Motion отключается при `prefers-reduced-motion`.
- Все кликабельные элементы имеют minimum 44px touch target.
- Design не создаёт новые страницы или секции вне `sitemap.md`.

# Sitemap

## Source of Truth

`sitemap.md` is the source of truth for page inventory, section order, URLs, anchors, navigation, internal-link targets, and indexation. `texts.md` is the source of truth for publishable copy, metadata, CTA labels, form labels, and legal text.

Final project files:

- `texts.md`
- `sitemap.md`
- `design.md`
- `optimization.md`

**Brand:** Fill System  
**Brand status:** Working brand; production launch is blocked until trademark clearance, California legal-entity / DBA mapping, and final domain ownership are confirmed.  
**Page:** Diagnostic-First IT & Business Development

---

## Структура страниц — MVP

| URL | Page | Type | Index / Noindex | Source file |
|---|---|---|---|---|
| `/` | Diagnostic-First IT & Business Development | Commercial landing page | Index | `texts.md` |
| `/privacy-policy` | Privacy Policy | Legal | Noindex | `texts.md` |
| `/terms-of-use` | Terms of Use | Legal | Noindex | `texts.md` |
| `/cookie-policy` | Cookie Policy | Legal | Noindex | `texts.md` |
| `/404` | Page Not Found | Utility | Noindex | (custom via app/not-found.tsx) |

### MVP rule

The MVP commercial page is one landing page with **11 top-level visual sections**. Its section order must match `texts.md` exactly.

The Business & IT Diagnostic section is one composite conversion section. `Before You Commit`, `What Happens After You Submit the Request`, and the Diagnostic Request Form are sub-blocks inside it, not separate full-width sections. The form keeps the nested target `#diagnostic-request-form` for CTA routing.

### Business & IT Diagnostic — sub-block order

| # | Sub-block | Content |
|---|---|---|
| 1 | Offer | H2, text, output, primary CTA |
| 2 | Before You Commit | Review assets, access rule, privacy note |
| 3 | What Happens After You Submit | 3-step post-submit flow |
| 4 | Diagnostic Request Form | #diagnostic-request-form |

Sub-blocks share one section background and one conversion narrative.
Do not reorder sub-blocks independently of this sequence.

### Brand and domain launch gate

- `Fill System` remains the working brand across copy, design, and development files.
- Working-brand use is not a legal clearance opinion and does not establish trademark availability.
- Do not display `LLC`, `Inc.`, `®`, or another legal identifier until the legal operator and registration status are verified.
- Keep production domain and email addresses as placeholders until the domain is registered in a business-controlled account.
- Production launch is blocked until evidence of trademark review, California entity / DBA mapping, domain ownership, and approved operator name is archived.

Domain pre-purchase is operationally separate from trademark clearance. Securing the domain early ($10–15) reduces the risk of third-party registration during the review period. If the brand changes, the domain cost is negligible. If the domain is lost, recovery cost is significantly higher.

---

## Landing page — sections from `texts.md`

| # | Section from `texts.md` | Anchor ID | Purpose |
|---:|---|---|---|
| 1 | Hero | `#hero` | Позиционирование, основной ICP 50–250 employees, главный оффер, primary / secondary CTA и trust line. |
| 2 | Problem Section | `#problem-section` | Объясняет, что проблема клиента часто не в технологии, а в процессах, данных, ownership и системах. |
| 3 | What We Diagnose | `#what-we-diagnose` | Показывает диагностируемые зоны: processes, CRM / RevOps, data, dashboards, integrations, automation, AI readiness, IT risk. |
| 4 | AI & Process Automation | `#ai-process-automation` | Показывает второй сервис как продолжение диагностики, roadmap и limited implementation. |
| 5 | How the Diagnostic Works | `#how-the-diagnostic-works` | Объясняет метод: review → map → score → recommend next step. |
| 6 | Diagnostic Scenarios | `#proof-examples` | Показывает anonymized scenarios без неподтверждённых logos, metrics или client identities. |
| 7 | Why Fill System | `#why-fill-system` | Объединяет differentiation и comparison против tool-first, automation-first и dev-first подходов. |
| 8 | Delivery Model | `#delivery-model` | Показывает senior involvement, роли Managing Partner / Solution Architect и релевантные operating environments. |
| 9 | Business & IT Diagnostic | `#business-it-diagnostic` | Единый conversion cluster: first-step offer, Before You Commit, post-submit steps и форма `#diagnostic-request-form`. |
| 10 | FAQ | `#faq` | Закрывает objections и содержит полный Fit / Not Fit: pricing, timeline, implementation, delivery format, systems, fit и ROI. |
| 11 | Final CTA | `#final-cta` | Финальный возврат к Business & IT Diagnostic. |

Note: Section 6 "Diagnostic Scenarios" uses anchor #proof-examples and appears as "Results" in navigation. These are intentional aliases: content name, technical anchor, and user-facing navigation label.

---

## Header — from `texts.md`

| Element | Value | Target |
|---|---|---|
| Logo | Fill System | `/` |
| Navigation item | Services | `#what-we-diagnose` |
| Navigation item | Pricing | `#areas-of-work` |
| Navigation item | How It Works | `#how-the-diagnostic-works` |
| Navigation item | Results | `#proof-examples` |
| Navigation item | FAQ | `#faq` |
| Primary CTA | Request Diagnostic | `#diagnostic-request-form` |

### ICP visibility rules

- The homepage must state the primary ICP publicly: B2B companies with 50–250 employees.
- The size range appears in the Hero and in the FAQ answer about company fit.
- Treat 50–250 employees as the strongest fit, not as an automatic rejection rule.
- Do not add `50–250 employees` to the H1, primary CTA, or every section.
- Company Size remains optional in the form and must not block submission.

### Header rules

- Header items must match `texts.md`: Services / Pricing / How It Works / Results / FAQ.
- Primary CTA must match `texts.md`: `Request Diagnostic`.
- Do not use `Contact Us` as the primary CTA.
- Mobile header uses the same navigation items in a simple drawer.

---

## Footer — from `texts.md`

| Footer block | Items from `texts.md` | Target |
|---|---|---|
| CTA panel | Start with clarity before investing in tools or implementation. | `#diagnostic-request-form` |
| Positioning | Fill System — senior-led IT and business advisory for B2B companies facing process, data, and system complexity. | — |
| Company | Team | #delivery-model |
| Company | Services | `#what-we-diagnose` |
| Company | Results | `#proof-examples` |
| Company | Contact | `#diagnostic-request-form` |
| Get Started | Request Diagnostic | `#diagnostic-request-form` |
| Get Started | How It Works | `#how-the-diagnostic-works` |
| Get Started | FAQ | `#faq` |
| Legal | Privacy Policy | `/privacy-policy` |
| Legal | Terms of Use | `/terms-of-use` |
| Legal | Cookie Policy | `/cookie-policy` |
| Copyright | © 2026 Fill System. California, USA. | — |

---

## Internal Linking Map

| From section | CTA / link text | Target |
|---|---|---|
| Header | Request Diagnostic | `#diagnostic-request-form` |
| Hero | Request a Business & IT Diagnostic | `#diagnostic-request-form` |
| Hero | See How the Diagnostic Works | `#how-the-diagnostic-works` |
| Problem Section | Diagnose the Operating Bottleneck | `#diagnostic-request-form` |
| What We Diagnose | See How the Diagnostic Works | `#how-the-diagnostic-works` |
| AI & Process Automation | Assess Automation Opportunities | `#diagnostic-request-form` |
| How the Diagnostic Works | Start With a Diagnostic | `#diagnostic-request-form` |
| Diagnostic Scenarios | Request a Diagnostic for Your Team | `#diagnostic-request-form` |
| Why Fill System | Validate the Decision Before You Implement | `#diagnostic-request-form` |
| Delivery Model | Work With Senior Advisors | `#diagnostic-request-form` |
| Business & IT Diagnostic | Request a Business & IT Diagnostic | `#diagnostic-request-form` |
| Final CTA | Request a Business & IT Diagnostic | `#diagnostic-request-form` |
| Final CTA | See How the Diagnostic Works | `#how-the-diagnostic-works` |
| Footer CTA panel | Start with clarity before investing in tools or implementation. | `#diagnostic-request-form` |
| Footer | Request Diagnostic | `#diagnostic-request-form` |

### CTA → Request Type Routing

Each CTA targeting #diagnostic-request-form may carry a data attribute: data-request-type="[value]"

On arrival at the form, JavaScript reads the most recent data-request-type and prefills the Request Type select. The prefilled value must remain editable by the user.

If no data attribute is present (direct scroll or generic CTA), Request Type remains empty/default.

**Implementation invariant:** `request_type` is one form field. It may be prefilled from CTA context and remain hidden while the optional block is collapsed; when the block opens, the same value is shown in an editable select. Do not create separate hidden and visible `request_type` inputs.

| CTA text | Prefilled request_type |
|---|---|
| Request a Business & IT Diagnostic | Business & IT Diagnostic |
| Diagnose the Operating Bottleneck | Business & IT Diagnostic |
| Assess Automation Opportunities | AI & Process Automation Review |
| Start With a Diagnostic | (none — generic) |
| Validate the Decision Before You Implement | Business & IT Diagnostic |
| Request a Diagnostic for Your Team | (none — generic) |
| Work With Senior Advisors | (none — generic) |

---

## Diagnostic Request Form

### Anchor

`#diagnostic-request-form`

### Required fields from `texts.md`

- name
- work email
- company
- main challenge

### Progressive disclosure

Control label: `Add more context (optional)`

Optional fields:

- company website
- role
- company size
- timeline
- request type

The optional block is collapsed by default. CTA-specific entries may prefill request type; generic entries may expose it as an optional editable select.

### Request type options from `texts.md`

- Business & IT Diagnostic
- AI & Process Automation Review
- Business Process Audit
- CRM / RevOps Audit
- IT Stack Assessment
- AI Readiness Assessment
- 90-Day Roadmap
- O-1 Readiness Support
- Not sure yet

### Button

`Submit Diagnostic Request`

### Microcopy

`Four required fields. Additional context is optional. No full system access is required for the first fit review.`

---

## O-1 Readiness Support — Secondary Service

O-1 Readiness Support is a secondary, non-primary service.

Visibility rules:
- Do NOT include in: Hero, H1, header nav items, primary CTA label, homepage meta title, homepage meta description, JSON-LD primary Service.
- DO include in: What We Diagnose section (as last card), Request Type form options, FAQ (one Q&A).
- Anchor: part of #what-we-diagnose section, no separate top-level section.
- The 11 top-level section count does NOT change.

Form data restrictions (unchanged): do not request or store immigration documents, visa data, government identification numbers, or petition materials through the MVP form.

O-1 Readiness Support copy requires review by qualified U.S. immigration counsel before production launch.

---

## Соответствие разделов и файлов

| Section / page | File |
|---|---|
| Hero | `texts.md` |
| Problem Section | `texts.md` |
| What We Diagnose | `texts.md` |
| AI & Process Automation | `texts.md` |
| How the Diagnostic Works | `texts.md` |
| Diagnostic Scenarios | `texts.md` |
| Why Fill System | `texts.md` |
| Delivery Model | `texts.md` |
| Business & IT Diagnostic — offer + risk reduction + post-submit steps + form | `texts.md` |
| FAQ | `texts.md` |
| Final CTA | `texts.md` |
| Header | `texts.md` |
| Footer | `texts.md` |
| Privacy Policy | `texts.md` |
| Terms of Use | `texts.md` |
| Cookie Policy | `texts.md` |

---

## Project File Map

| File | Role |
|---|---|
| `texts.md` | Website copy, section content, metadata, form copy, legal-page content references |
| `sitemap.md` | Website structure, URLs, anchors, header/footer, internal links |
| `design.md` | MVP visual rules, typography, colors, layout, components |
| `optimization.md` | SEO, accessibility, performance, responsive and implementation rules |

---

## SEO / Indexing Rules

- Homepage `/`: index.
- Legal pages: noindex, but publicly accessible.
- Thank-you pages: noindex.
- Paid traffic landing pages: noindex.
- O-1 Readiness Support appears only as a secondary service card in What We Diagnose and as a form request type option.
- FAQ must remain crawlable HTML text.
- Each landing section must have a stable lowercase hyphen-separated anchor ID.
- Custom 404 page exists, links to homepage or diagnostic form, and uses noindex.

---

## Acceptance Criteria

- Sitemap contains 11 top-level landing sections and matches `texts.md` exactly.
- The Business & IT Diagnostic conversion cluster is one top-level section with nested risk-reduction, post-submit and form sub-blocks.
- Every CTA defined in texts.md has a corresponding entry in the Internal Linking Map.
- All anchor targets in header, footer, and internal links resolve to existing section IDs.
- #diagnostic-request-form is scrollable from every CTA that references it.
- FAQ includes explicit Who We Work With Best and Where We Are Not the Right Fit criteria.
- Header matches `texts.md`: Services / Pricing / How It Works / Results / FAQ / Request Diagnostic.
- Footer matches `texts.md`: Company / Get Started / Legal, with `Team` linking to `#delivery-model`.
- Working brand is Fill System everywhere; production launch requires completed brand, entity, and domain verification.
- No previous-brand references remain.
- No references to removed draft page files remain.
- O-1 Readiness Support is a secondary service, limited to the What We Diagnose card, one FAQ entry, and one form request type option; it is excluded from Hero, H1, header nav, primary CTA, and metadata.
- Diagnostic Request Form remains the main conversion target.
- Privacy Policy, Terms of Use, and Cookie Policy are included as legal pages.
- Legal pages are noindex but publicly accessible.

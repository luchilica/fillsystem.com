# Optimization — правила для верстки

## Source of Truth

Файл определяет SEO, accessibility, performance, analytics, privacy и технические правила реализации сайта Fill System.

Приоритет источников:

1. `sitemap.md` — страницы, порядок секций, URL, anchors и internal links.
2. `texts.md` — тексты, metadata, CTA, form copy и request types.
3. `design.md` — визуальные tokens, компоненты и responsive behavior.
4. `optimization.md` — SEO, accessibility, performance, analytics, privacy и технические запреты.

**Бренд:** Fill System  
**Статус бренда:** working brand. Owner-reported preliminary checks dated June 13, 2026 found no matching business in California Secretary of State Business Search and found the intended domain available at the time checked. Production clearance still requires trademark review, legal operator / DBA mapping, and domain registration and ownership.  
**Рабочий язык сайта:** English  
**Регион продвижения:** United States  
**Основной ICP:** B2B companies with 50–250 employees  
**Главная конверсия:** Request a Business & IT Diagnostic

### Quick lookup — internal

| Задача | Раздел |
|---|---|
| SEO, metadata, canonical, schema | `SEO Metadata` → `Structured Data` |
| HTML, anchors, internal links | `HTML Structure` / `Internal Linking` |
| Responsive и accessibility | `Responsive Implementation` / `Accessibility` |
| Form, routing, email, monitoring | `Forms and Conversion` / `Form Processing` |
| Analytics и privacy | `Analytics` / `Privacy and Compliance` |
| Performance, fonts, images | `Performance` |
| Deploy, CSP, domain, 404 | `Hosting and Infrastructure` |
| Launch verification | `Technical QA Before Launch` |
| Правила для ИИ | `Правила работы ИИ` |

---

## Brand, Legal Entity and Domain Launch Gate

`Fill System` is a working brand for design and content production. Its use in these files is not a trademark clearance opinion, a California name-availability determination, a name reservation, a DBA authorization, or proof of domain ownership.

### Current preliminary status — owner reported, June 13, 2026

| Check | Status | Interpretation |
|---|---|---|
| California Secretary of State Business Search | No matching business found | Useful preliminary signal only; not name reservation, formation approval, trademark clearance, or DBA authorization. |
| Intended production domain | Available when checked | Availability is temporary and does not create ownership rights. Do not publish the domain until registered in a business-controlled account. |
| Trademark / common-law clearance | Pending | Exact and confusingly similar federal, state, and common-law uses still require review. |
| Legal operator / DBA mapping | Pending | Final entity name, public operator name, entity suffix, and any fictitious business name requirements still require confirmation. |
| Domain registration and ownership | Pending | Registrar account, billing, recovery access, DNS control, and renewal ownership must belong to the business. |

Production launch is blocked until all items below are completed and evidence is archived:

1. **Trademark review:** exact and confusingly similar names are reviewed across USPTO records, relevant state sources, internet/common-law use, and related IT / business consulting services.
2. **California operator mapping:** the legal entity, registered name, fictitious business name / DBA requirements, and authority to use the public-facing brand are confirmed.
3. **Domain ownership:** the final production domain is registered in an account controlled by the business, with recovery access and billing ownership documented.
4. **Production communications:** the general and privacy inboxes are created on the confirmed domain and tested.
5. **Legal-page operator name:** Privacy Policy, Terms, footer copyright, forms, invoices, and contracts use the verified legal operator name and entity suffix.

### Implementation rules before verification

- Keep canonical host, email addresses, legal operator name, and social profiles as deployment variables or placeholders.
- Do not display `LLC`, `Inc.`, `Corp.`, `®`, or another legal / registration marker unless verified.
- Do not claim that the brand is available, registered, protected, or legally cleared.
- Do not purchase printed collateral or publish irreversible brand assets before owner / counsel approval.
- The developer may build with `Fill System` as the working display name, but production deployment remains blocked by this gate.

---

## Public ICP Implementation

- Primary ICP: U.S. B2B companies with 50–250 employees.
- The range must be stated in visible homepage copy within the Hero and repeated once in the FAQ company-fit answer.
- Position it as `strongest fit` / `primary focus`, not a hard eligibility threshold.
- Do not place the range in H1, primary CTA, structured data, or every section.
- Do not automatically reject, hide the form from, or route away companies outside the range.
- `Company Size` remains optional; no size option is preselected or visually emphasized.
- CRM may use the submitted size band for lead scoring, but the public confirmation message must remain neutral.

## Техническая архитектура MVP

- Статический или prerendered сайт.
- Основной контент должен присутствовать в исходном HTML.
- Допустимы чистые HTML + CSS + минимальный JavaScript.
- Tailwind допустим, если итоговый CSS очищается от неиспользуемых классов.
- Не использовать тяжёлый frontend framework без подтверждённой необходимости.
- Не использовать client-side rendering для основного текста, навигации, FAQ, формы и legal content.
- Максимальная ширина основного контейнера: `1200px`.
- Структура и порядок секций строго берутся из `sitemap.md`.
- Тексты и CTA строго берутся из `texts.md`.
- Визуальные tokens строго берутся из `design.md`.

---

## HTML Structure

Обязательные semantic elements:

- `<header>`
- `<nav>`
- `<main>`
- `<section>`
- `<article>` — для proof scenarios и автономных content units
- `<form>`
- `<footer>`

### Heading hierarchy

- Один `<h1>` на страницу.
- Иерархия: `h1 → h2 → h3 → h4`.
- Не использовать heading tags только ради размера шрифта.
- Визуальный размер задаётся CSS-классами.
- Каждая смысловая секция имеет собственный heading.
- Не пропускать уровни заголовков без структурной причины.

### Section IDs

Использовать IDs из `sitemap.md` без изменений:

```text
#hero
#problem-section
#what-we-diagnose
#ai-process-automation
#how-the-diagnostic-works
#proof-examples
#why-fill-system
#delivery-model
#business-it-diagnostic
#faq
#final-cta
```

Nested conversion target:

```text
#diagnostic-request-form
```

`#diagnostic-request-form` is the form container inside `#business-it-diagnostic`; it is not a separate top-level page section. `Before You Commit` and `What Happens After You Submit the Request` are sub-blocks without independent navigation anchors.

### Anchor behavior

- Anchor links должны быть обычными `<a href="#section-id">`.
- Header offset учитывать через `scroll-margin-top`.
- Smooth scroll отключается при `prefers-reduced-motion: reduce`.
- Anchor navigation должна работать без JavaScript.
- Не создавать anchor IDs, отсутствующие в `sitemap.md`.

---

## SEO Metadata

Metadata берётся только из `texts.md`. Snapshot ниже должен дословно совпадать с `texts.md`; при любом расхождении приоритет имеет `texts.md`.

### Homepage

```text
Meta title:
Diagnostic-First IT & Business Consulting | Fill System

Meta description:
B2B companies with 50–250 employees use Fill System to diagnose process, CRM, data, and IT bottlenecks before committing to tools, hires, or implementation.

H1:
Diagnostic-First IT & Business Consulting
```

### Metadata rules

- Один уникальный `<title>` для каждого URL.
- Один `<meta name="description">` для каждого URL.
- Meta title ориентир: 50–60 characters, но смысл важнее формальной длины.
- Meta description ориентир: 140–160 characters, без keyword stuffing.
- Deferred services must not appear in homepage metadata.
- Не вставлять список услуг в title.
- Не использовать название старого бренда.
- Не создавать metadata из текста автоматически без проверки.
- Legal pages: уникальный title, но `noindex,follow`.

---

## Canonical, Robots and Sitemap

### Canonical

- На каждой странице должен быть self-referencing canonical.
- Homepage canonical: `https://[production-domain]/`.
- Использовать абсолютный HTTPS URL.
- Не указывать staging domain как canonical.
- Один canonical на страницу.
- Query parameters и UTM не должны создавать отдельные canonical URLs.

### Robots meta

| Page type | Directive |
|---|---|
| Homepage | `index,follow` |
| Privacy Policy | `noindex,follow` |
| Terms of Use | `noindex,follow` |
| Cookie Policy | `noindex,follow` |
| Thank-you page | `noindex,follow` |
| Staging / preview | `noindex,nofollow` + access protection |
| Paid duplicate landing pages | `noindex,follow` + canonical to organic page when applicable |

### robots.txt

Production baseline:

```text
User-agent: *
Allow: /

Sitemap: https://[production-domain]/sitemap.xml
```

- Не блокировать indexable content через robots.txt.
- Не использовать robots.txt вместо `noindex`.
- Staging должен быть закрыт authentication или platform password protection.

### sitemap.xml

- Включать только canonical indexable URLs.
- Не включать legal `noindex`, thank-you, staging и parameter URLs.
- Для MVP sitemap содержит homepage.
- Обновлять автоматически при добавлении indexable pages в `sitemap.md`.
- Проверить sitemap через Google Search Console после launch.

---

## Open Graph and Social Metadata

На каждом публичном URL:

- `og:title`
- `og:description`
- `og:image`
- `og:url`
- `og:type`
- `og:site_name`
- `twitter:card`
- `twitter:title`
- `twitter:description`
- `twitter:image`

### Rules

- Homepage `og:type`: `website`.
- Social image: минимум `1200 × 630px`.
- Текст на social image должен оставаться читаемым, но не дублировать весь H1.
- Не использовать fake client logos или metrics на OG image.
- Использовать абсолютные HTTPS URLs.
- Preview проверяется перед launch.

---

## Semantic Keyword Clusters

Использовать естественно, без keyword stuffing.

### Core cluster

- diagnostic-first IT consulting
- IT and business consulting
- B2B IT consulting
- business and IT diagnostic
- business process audit
- IT stack assessment
- CRM audit
- CRM and RevOps consulting
- workflow automation consulting
- AI readiness assessment
- data and reporting automation
- digital transformation roadmap
- solution architecture review

### AI and Process Automation cluster

- AI process automation consulting
- business process automation with AI
- AI implementation consulting
- AI agent development for B2B operations
- intelligent automation consulting
- workflow automation with AI
- AI readiness diagnostic
- CRM automation consulting
- document processing automation
- lead scoring automation
- reporting automation consulting

### O-1 Readiness Support cluster

- O-1 visa readiness support
- O-1 extraordinary ability evidence
- O-1 portfolio strategy consulting
- O-1 readiness support for IT professionals

Use only in the service card and FAQ. Do not add to Hero or H1.

### Geographic modifiers

Use only where natural and accurate:

- IT consulting California
- business process consulting California
- business process consulting USA
- B2B IT consulting USA

Do not use `Bay Area` unless Fill System actually serves or targets that market specifically.

### O-1 Readiness Support — secondary service

- O-1 Readiness Support is a secondary service. It does not appear in primary navigation, Hero, H1, primary CTA, homepage meta title, homepage meta description, or the primary JSON-LD Service entity.
- It appears only as a secondary service card in What We Diagnose, one FAQ entry, and one form request type option (`O-1 Readiness Support`). No dedicated CTA, no separate URL or top-level section.
- Do not request or store immigration documents, visa data, government identification numbers, or petition materials through the MVP form.
- Name the service `O-1 Readiness Support`; do not use the word `agent` to describe it.
- O-1 Readiness Support copy requires review by qualified U.S. immigration counsel before production launch.

---

## On-Page SEO

- Core topic and primary ICP (B2B companies with 50–250 employees) должны быть понятны в первых 100–150 словах.
- H1 содержит основной коммерческий intent.
- H2 раскрывают problem, diagnostic scope, methodology, proof и next step.
- Не повторять одно и то же ключевое сообщение в каждом блоке.
- Не использовать exact-match keyword в каждом heading.
- Не добавлять скрытый SEO-текст.
- Не использовать keyword lists в footer.
- Internal links должны иметь описательные anchor texts.
- FAQ остаётся crawlable HTML.
Clarification: FAQ answers must be present in the HTML source, not loaded dynamically via API or lazy JS. CSS visibility (`display:none`, collapsed accordion) does not affect crawlability — Googlebot reads the HTML source regardless of visual state. A JavaScript-controlled accordion is acceptable if all answer HTML is in the initial DOM.

**FAQ crawlability clarification:** Every answer must be present in the initial HTML/DOM. An accessible accordion controlled by CSS or JavaScript is acceptable when it only changes presentation and does not fetch the answer after interaction. Do not rely on dynamically injected or API-loaded FAQ content.
- Все CTA links должны иметь реальный `href`.
- Не использовать buttons для переходов между URL; использовать `<a>`.
- Не создавать thin pages, отсутствующие в `sitemap.md`.

---

## Content Deduplication and Section Grouping

### Eleven-section rule

The homepage must render exactly 11 top-level sections in the order defined by `sitemap.md`.

- `Business & IT Diagnostic` contains the offer, risk-reduction content, post-submit steps and form as one conversion cluster.
- `Before You Commit` and `What Happens After You Submit the Request` are nested sub-blocks, not separate full-width sections.
- `#diagnostic-request-form` remains a nested target so all conversion CTAs can scroll directly to the form.

### Message ownership by section

- Hero: positioning, ICP, offer and CTA.
- Problem Section: why growth slows and where symptoms appear.
- How the Diagnostic Works: method and decision outputs; do not repeat the Hero slogan.
- Why Fill System: comparison of operating approaches; do not restate the full positioning paragraph.
- Delivery Model: who remains involved and what each role covers; do not invent biographies or credentials.
- Final CTA: decision prompt and action; do not repeat the Hero or Problem copy verbatim.

### Deduplication check (before publishing text changes)

1. Search for the core phrase (`diagnose before`, `diagnostic-first`, `we diagnose`) across all 11 sections.
2. Each section's H2 must convey a distinct purpose.
3. If two sections say the same thing in different words, merge or delete one.
4. The phrase `diagnose before [action]` should appear in no more than 2 sections (Hero + Final CTA).
5. After updating `texts.md`, verify against this table before deploying.

### Fit / Not Fit implementation

- FAQ must include `Who do you work with best?` and `When are you not the right fit?` as visible crawlable content.
- Render each answer as concise semantic lists on the website, even if the source copy is stored as a compact paragraph.
- Fit includes operational complexity, underperforming CRM/SaaS visibility, unclear automation / AI priorities, and independent review before migration or integration.
- Not Fit includes hourly staffing, basic tool setup without process/data complexity, tool-first projects that refuse problem definition, and guaranteed ROI before analysis.
- Do not use `AI-for-AI` as a not-fit label; unclear AI priorities are a valid diagnostic use case.
- A no-fit result is neutral and may lead to a referral or recommendation; it must not trigger an insulting or punitive UI state.

---

## Structured Data

JSON-LD размещается в `<head>` или в server-rendered HTML.

### Required for MVP

Использовать `@graph` со следующими сущностями:

1. `Organization`
2. `WebSite`
3. `WebPage`
4. `Service` — для основного Business & IT Diagnostic offer

### Organization

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://[production-domain]/#organization",
  "name": "Fill System",
  "url": "https://[production-domain]/",
  "description": "Diagnostic-first IT and business consulting for B2B companies.",
  "foundingDate": "2021",
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "CA",
    "addressCountry": "US"
  }
}
```

### Organization rules

- Добавлять `logo` только после появления production logo URL.
- Добавлять `sameAs` только для реальных официальных profiles.
- Не добавлять phone, street address, reviews, ratings или awards, если они не подтверждены.
- Не использовать deprecated / ambiguous `ProfessionalService` как основной тип.
- Не добавлять fake aggregateRating.

Geographic scope:
If the business does not maintain a physical office open to client visits, consider removing address from Organization schema. Use `areaServed: United States` only.

Add address to schema only when:
- A verified physical location exists, or
- A Google Business Profile is created, or
- Local SEO for California is a confirmed priority.

Currently: address included for legal domicile, areaServed included for service area. This is acceptable but may send mixed signals to Google's local algorithm.

### WebSite and WebPage

- `WebSite` связывается с `Organization` через `publisher`.
- `WebPage` связывается с `WebSite` через `isPartOf`.
- `name`, `description` и `url` совпадают с page metadata.
- Homepage не требует breadcrumbs.

### Service

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://[production-domain]/#business-it-diagnostic",
  "name": "Business & IT Diagnostic",
  "description": "A complimentary 30-45 minute diagnostic conversation to identify process, data, CRM, and IT system bottlenecks in B2B companies.",
  "serviceType": "Diagnostic-first IT and business consulting",
  "provider": {
    "@id": "https://[production-domain]/#organization"
  },
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "url": "https://[production-domain]/#business-it-diagnostic"
}
```

### FAQ structured data

If implementation cost is minimal (15–30 minutes), add `FAQPage` JSON-LD that mirrors visible FAQ content exactly.

Rules:
- Every question-answer pair in the schema must match visible on-page text.
- Do not add promotional claims absent from visible FAQ.
- Do not expect FAQ rich results for commercial queries.
- Rich results depend on Google's discretion and may not appear.
- Validate with Schema.org Validator.
- Benefits beyond Google rich results: AI answer systems (ChatGPT, Perplexity, Gemini) use structured data for response formulation.

### BreadcrumbList

- Не нужен для single-page MVP.
- Добавить только после появления внутренних indexable pages в `sitemap.md`.
- Breadcrumb markup должен совпадать с видимой breadcrumb navigation.

### Validation

Перед launch:

- Schema.org Validator.
- Google Rich Results Test для поддерживаемых Google types.
- Проверка source HTML: JSON-LD доступен без client-side execution.
- Удалить placeholders `[production-domain]` до deploy.

---

## Internal Linking

Использовать mapping из `sitemap.md`.

### Required links

- Hero primary CTA → `#diagnostic-request-form`
- Hero secondary CTA → `#how-the-diagnostic-works`
- Problem CTA → `#diagnostic-request-form`
- AI & Process Automation CTA → `#diagnostic-request-form`
- Why Fill System CTA → `#diagnostic-request-form`
- Business & IT Diagnostic CTA → `#diagnostic-request-form`
- Final primary CTA → `#diagnostic-request-form`
- Final secondary CTA → `#how-the-diagnostic-works`
- Footer legal links → approved legal URLs

### Rules

- Не создавать dead links.
- Не создавать links на Phase 2 pages до их появления в `sitemap.md`.
- Footer `Team`, `Services`, `Results`, `Contact` ведут на anchors, указанные в `sitemap.md`.
- Mailto использовать только как fallback, не как основной diagnostic flow.

---

## Responsive Implementation

### Breakpoints

```css
/* Base: mobile-first */
@media (min-width: 768px) { /* tablet */ }
@media (min-width: 1024px) { /* desktop */ }
@media (min-width: 1280px) { /* large desktop */ }
```

QA widths:

- `320px`
- `375px`
- `768px`
- `1024px`
- `1280px`
- `1440px`

### Rules

- Mobile не является сокращённой по смыслу версией desktop.
- Все 11 верхнеуровневых секций из `sitemap.md` доступны на mobile.
- Primary CTA видим в Hero без долгого scroll.
- Нет горизонтального page scroll.
- Touch targets: минимум `44 × 44px`.
- Cards: 1 column mobile / 2 tablet / 3 desktop.
- Tables превращаются в stacked comparison cards на mobile.
- Header превращается в простой drawer.
- Drawer содержит: Services / How It Works / Results / FAQ / Request Diagnostic.
- Sticky CTA не перекрывает content, form fields или keyboard.
- Sticky CTA скрывается при active form input при необходимости.
- Hero visual упрощается или скрывается согласно `design.md`.
- Form всегда одна колонка на mobile.
- Input font-size минимум `16px`, чтобы избежать mobile zoom.
- Длинные English headings проверяются вручную на 320px и 375px.

---

## Accessibility — WCAG 2.2 AA Baseline

### Keyboard

- Все interactive controls доступны с keyboard.
- Logical tab order.
- Видимый focus state.
- Mobile drawer удерживает focus при открытии.
- После закрытия drawer focus возвращается на trigger.
- Escape закрывает drawer и modal.
- FAQ accordion работает через `<button>`.

### Focus

- Не удалять outline без полноценной замены.
- Focus ring: минимум `2px`, хорошо видим на light и dark surfaces.
- `:focus-visible` предпочтительнее `:focus`.
- Focus не скрывается sticky header.

### Forms

- Каждый field имеет visible `<label>`.
- Placeholder не заменяет label.
- `autocomplete` настроен корректно.
- Errors связаны с fields через `aria-describedby`.
- Error summary получает focus после failed submit, если ошибок несколько.
- Required status передаётся текстом и `required` / `aria-required`.
- Success message объявляется через `aria-live="polite"`.
- Loading state не удаляет button label полностью.

### FAQ accordion

- Trigger: `<button aria-expanded="false" aria-controls="faq-panel-id">`.
- Panel имеет уникальный ID.
- Question text остаётся видимым.
- Answer присутствует в HTML.
- Icon помечается `aria-hidden="true"`.
- Accordion должен быть понятен без icon rotation.

### Images and SVG

- Информативные изображения имеют meaningful alt.
- Decorative images: `alt=""`.
- Decorative SVG: `aria-hidden="true"` и `focusable="false"`.
- Не вставлять важный текст внутрь images.
- Diagram alt должен описывать вывод, а не перечислять декоративные элементы.
- Complex diagram сопровождается nearby text explanation.

### Contrast and readability

- Не использовать `#CBD5E1` как text color.
- Core body text минимум `16px`.
- Line-height согласно `design.md`.
- Links различимы не только цветом: underline on hover/focus.
- Status не передаётся только цветом.
- Motion отключается при `prefers-reduced-motion`.

---

## Forms and Conversion

Главная форма — qualified diagnostic request, но MVP остаётся low-friction.

### Required fields — 4

1. `Name` — text
2. `Work Email` — email
3. `Company` — text
4. `What's your biggest operational challenge right now?` — textarea, max `500` characters

### Optional fields — progressive disclosure

Показывать после обязательных полей за control `Add more context (optional)`. Блок закрыт по умолчанию:

5. `Company Website` — url
6. `Role` — text or select
7. `Company Size` — select
8. `Timeline` — select
9. `Request Type` — select only for generic entry points

### Company size options

- 1–25
- 26–50
- 51–100
- 101–250
- 251–500
- 500+

Primary ICP options `51–100` and `101–250` must remain visible but not visually manipulated.
Selections outside the primary ICP must not trigger client-side rejection, disabled submit, negative microcopy, or a different public success state.

### Timeline options

- ASAP
- This month
- 1–3 months
- 3–6 months
- Researching

### Request type options

- Business & IT Diagnostic
- AI & Process Automation Review
- Business Process Audit
- CRM / RevOps Audit
- IT Stack Assessment
- AI Readiness Assessment
- 90-Day Roadmap
- Not sure yet

### Request type routing

- CTA-specific links set `request_type` automatically and expose the selected value inside the optional block when it is opened.
- Generic form entry shows Request Type only as an optional select inside the disclosure block.
- Never create two competing `request_type` controls. Use one field that may be prefilled by CTA context and remains editable.
- The form must remain fully submittable without opening the optional block.

### Hidden context fields

- page_url
- page_section
- cta_text
- referrer
- utm_source
- utm_medium
- utm_campaign
- utm_content
- utm_term

`request_type` is a single form field, not an additional hidden context field. CTA context may prefill it while the optional block is collapsed; opening the block exposes the same value in an editable select. Never render duplicate hidden and visible `request_type` inputs.
- timestamp

### Progressive disclosure behavior

- Use a native `<details><summary>` pattern or an accessible button with `aria-expanded` and `aria-controls`.
- The control label remains `Add more context (optional)` in the closed state and may change to `Hide optional fields` when expanded.
- Optional fields must not use `required` or `aria-required="true"`.
- Opening or closing the block must not clear entered values.
- Validation must never focus or announce unopened optional fields when they are empty.
- The form must work and submit when JavaScript is unavailable; optional fields may remain visible in the no-JS fallback.

### Validation

- Client-side validation improves UX.
- Server-side / platform validation is mandatory.
- Email field uses `type="email"` and sensible validation.
- Do not reject legitimate business emails solely because domain is uncommon.
- Textarea max length: `500`.
- Preserve user-entered data after validation error.
- Error messages explain how to fix the issue.
- Prevent duplicate submissions while request is processing.

### Submit

Button text from `texts.md`:

```text
Submit Diagnostic Request
```

Do not replace with generic `Submit`.

### Auto-reply email

Send automatic confirmation within 1 minute of successful form submission.

Subject: `Diagnostic request received — Fill System`

Body:

```text
Thank you for your diagnostic request.
A senior advisor will review your submission
and respond within 2 business days.

If you have additional context to share,
you can reply to this email.

— Fill System
```

Rules:
- Do not echo the user's challenge text in auto-reply.
- Do not include other form field values in the email body.
- Send from `general@[production-domain]` or `diagnostics@[production-domain]`.
- Reply-to address must be monitored.

### Response workflow (operational, not public)

Internal target: initial fit reply within 2 business days.

Response types:
- Fit confirmed → schedule diagnostic call
- Fit uncertain → send clarifying question
- Not fit → honest redirect or alternative recommendation
- Spam / invalid → no response, log for spam queue review

If unable to respond within 3 business days, send acknowledgment:

```text
We received your diagnostic request and are reviewing it.
Expect a response by [date].
```

Do not publish response time on the website as a guaranteed SLA.
Track internally and aim for 2 business days.

### Success state

After success show:

- Confirmation that request was received.
- Expected next step: senior review and fit response.
- No guaranteed response time unless operationally confirmed.
- Link back to methodology or homepage section.
- No calendar embed on MVP.

### Failure state

- Explain that submission was not completed.
- Preserve entered data.
- Offer retry.
- Provide fallback email: `[production-inbox]`.

### Phase 2 qualification

Do not add to MVP form unless later approved:

- current CRM / key tools
- budget range
- detailed security requirements
- file upload
- RFP
- procurement data

These may be collected by follow-up email after submission.

---

## Form Processing

> ⚠️ SUPERSEDED — The Netlify Forms / Formspree details in this section are historical. The actual form backend is a Next.js Route Handler (`app/api/submit/route.ts`) with Resend for email notifications. Use this section only as historical reference.

### Default MVP implementation

- Hosting: Netlify.
- Form processing: Netlify Forms.
- Form must exist in deploy output as HTML.
- Enable form detection.
- Use platform notifications to send verified submissions to `[production-inbox]`.
- Test form detection on production-like deploy, not only local environment.
- Verify both successful submissions and spam queue behavior.

### Fallback

Use Formspree only when:

- hosting is not Netlify;
- Netlify Forms limits or workflow do not fit;
- external routing is operationally preferable.

### Spam protection

- Add honeypot field.
- Do not show CAPTCHA by default.
- Add CAPTCHA only if real spam volume requires it.
- Rate-limit custom endpoints.
- Do not silently discard legitimate submissions without logging.
- Review spam queue during launch QA.

### Submission volume monitoring

Track monthly submission count against Netlify Forms tier limit.
Set alert at 80% of limit (e.g., 80 submissions on free tier).

If approaching limit:
- Upgrade Netlify Forms tier ($19/month for 1,000), or
- Switch to Formspree or custom endpoint

Do not discover the limit by losing a real submission.
Review spam queue weekly — spam submissions count toward limit.

### Data restrictions

Do not request or store:

- passwords;
- system credentials;
- API keys;
- Social Security numbers;
- immigration documents;
- medical information;
- payment-card details;
- confidential files through the MVP form.


---

## Analytics

### MVP tools

- Google Search Console.
- GA4 loaded only after analytics consent.
- Do not deploy Google Tag Manager on MVP unless a confirmed tracking requirement cannot be handled directly.
- Do not deploy Meta Pixel, LinkedIn Insight Tag, session replay, heatmaps or retargeting pixels on MVP.

### Event naming

Use lowercase `snake_case`.

### CTA events

- `cta_click`
  - `cta_text`
  - `cta_location`
  - `target`
  - `request_type`

- `cta_visibility`
  - fire once when CTA is at least 50% visible for 2 seconds
  - `cta_location`

### Navigation events

- `nav_anchor_click`
- `mobile_menu_open`
- `mobile_menu_close`
- `footer_link_click`
- `outbound_link_click`

### Scroll events

- `scroll_25_percent`
- `scroll_50_percent`
- `scroll_75_percent`
- `scroll_100_percent`

Use one event per threshold per page view.

### Section engagement

- `section_enter`
  - `section_id`
  - trigger when section reaches 50% visibility
  - fire once per section per page view

### FAQ events

- `faq_item_open`
  - `question_slug`

### Form events

- `form_start`
- `form_field_focus`
  - `field_name`
- `form_field_blur`
  - `field_name`
- `form_validation_error`
  - `field_name`
  - `error_type`
- `form_submit_attempt`
- `form_submit_success`
- `form_submit_error`
- `form_abandonment`
  - `last_field_focused`
  - `time_on_form_seconds`

### Privacy constraints

`request_type` in analytics events sends the service category label (e.g., `AI & Process Automation Review`), not user-generated content. This is a predefined option from a closed select list and is classified as non-PII for analytics purposes.

`last_field_focused` in `form_abandonment` sends only the field name string (e.g., `main_challenge`), never field content, partial input, or typed characters.

- Do not send field values, challenge text, email, name, company or full URL query strings to GA4.
- Do not use `field_name` values that reveal sensitive data categories.
- Strip UTM and personal query parameters from analytics page URLs where needed.
- Form abandonment tracking stores event metadata only, never typed content.


### Implementation rules

- Analytics must not block rendering.
- Events must fail silently when consent is absent.
- Site remains fully functional without analytics.
- Avoid duplicate event firing from nested click handlers.
- Validate events in GA4 DebugView after consent.
- Maintain a short tracking plan with event, trigger, parameters and business purpose.

---

## Privacy and Compliance

This is an implementation baseline, not a legal determination of statutory applicability.

### Consent

- Analytics consent must be obtained before GA4 loads.
- Default state: analytics denied.
- Accept enables GA4.
- Decline keeps analytics disabled.
- User can revisit preference.
- Do not use prechecked analytics consent.
- Site works fully when consent is declined.

### Cookie banner

Required actions:

- Accept
- Decline
- Privacy Policy

Copy direction:

```text
We use optional analytics cookies to understand how the site is used.
```

### Legal URLs

Use URLs from `sitemap.md`:

- `/privacy-policy`
- `/terms-of-use`
- `/cookie-policy`

All legal pages are publicly accessible and `noindex,follow`.

### Notice at collection

Use the exact approved copy from `texts.md` when present. Baseline:

```text
By submitting this form, you acknowledge our Privacy Policy. We use your information to evaluate fit and contact you about your diagnostic request.
```

### Data minimization

- Collect only fields defined in this file and `texts.md`.
- Do not store form values in localStorage.
- Do not store form values in analytics cookies.
- Do not expose submissions in client-side code.
- Avoid collecting free-form sensitive information.
- Include a short instruction not to submit passwords or confidential credentials.

### Retention

- Form submissions: maximum 24 months.
- Delete or anonymize stale inquiries after retention period.
- Confirm deletion workflow before launch.
- Privacy requests route to `[privacy-inbox]`.

### Third parties

Privacy Policy must identify actual providers used at launch:

- hosting provider;
- form processor;
- analytics provider;
- email provider.

Do not list unused providers.

### Security baseline

- HTTPS only.
- HSTS after confirming HTTPS operation.
- Least-privilege access to submissions.
- Multi-factor authentication for hosting, domain, analytics and email accounts.
- Do not email full sensitive submission content when a secure notification link is available.
- Rotate credentials when team access changes.

---

## O-1 Readiness Support Scope

- O-1 Readiness Support is a secondary service. It is limited to: one secondary service card in What We Diagnose, one FAQ entry, and one form request type option (`O-1 Readiness Support`).
- It must NOT appear in: Hero, H1, header navigation, primary CTA labels, homepage meta title, homepage meta description, or the primary JSON-LD Service entity. No dedicated CTA, no separate URL or top-level section, no preselected form value.
- Do not collect immigration documents, passport data, government identification numbers, visa data, eligibility details, or petition materials through the MVP form.
- O-1 Readiness Support copy requires review by qualified U.S. immigration counsel before production launch.

**Code hygiene:** Name the service `O-1 Readiness Support` in all copy. Do not use the word `agent` in the context of immigration, visas, petitions, or work authorization in any production code, HTML comments, CSS class names, JavaScript variables, or shipped documentation. The generic term `agent` remains allowed for legitimate non-immigration technical contexts such as AI agents.

## Performance

### Core Web Vitals targets

Measured at the 75th percentile where field data is available:

| Metric | Good target |
|---|---:|
| LCP | `≤ 2.5s` |
| INP | `≤ 200ms` |
| CLS | `≤ 0.1` |

### Lighthouse targets

Measure production build without browser extensions:

| Category | Target before optional third-party scripts |
|---|---:|
| Performance | `90+` |
| Accessibility | `95+` |
| Best Practices | `95+` |
| SEO | `95+` |

After consented analytics loads, Performance `85+` is acceptable only when Core Web Vitals remain in the good range.

### Rendering

- HTML and critical CSS render without JavaScript.
- JavaScript is limited to:
  - mobile menu;
  - FAQ accordion;
  - form validation/submission enhancement;
  - consent management;
  - consented analytics;
  - lightweight interaction states.
- Do not hydrate the full page for minor interactions.
- Defer non-critical JavaScript.
- Use `type="module"` where appropriate.

### Third-party scripts

- Load only after consent when used for analytics.
- Use `requestIdleCallback` with timeout fallback or delayed loading.
- Never block LCP.
- Do not load multiple analytics libraries.
- Audit third-party scripts before launch and quarterly thereafter.

### Fonts

- Use Inter Tight and Inter only.
- Self-host WOFF2 where licensing and deployment allow.
- Preload only required above-the-fold font files.
- Use `font-display: swap`.
- Limit weights to those defined in `design.md`.
- Provide system-font fallback.
- Avoid loading full variable font ranges when static subsets are smaller.

### Font loading priority

Preload (above-the-fold):
- `inter-tight-700.woff2` (H1)
- `inter-400.woff2` (body, subtitle)

Defer (below-fold, loaded on scroll or idle):
- `inter-tight-600.woff2` (H3)
- `inter-600.woff2` (H4)

Evaluate variable fonts: if Inter variable + Inter Tight variable total less than 4 static files combined, prefer variable fonts.

### Images

- Use AVIF or WebP where appropriate.
- Use SVG for diagrams and icons.
- Define width and height or aspect-ratio.
- Hero visual is not lazy-loaded when it is the LCP element.
- Below-the-fold images use `loading="lazy"`.
- Use responsive `srcset` and `sizes`.
- Do not ship desktop-sized raster assets to mobile.
- Compress OG image separately from page imagery.

### CSS

- Use CSS variables from `design.md`.
- Remove unused CSS.
- Avoid deeply nested selectors.
- Avoid large animation libraries.
- Critical above-the-fold CSS may be inlined by build process.
- Do not use inline styles in authored components unless generated for a necessary dynamic value.

### Layout stability

- Reserve space for images, diagrams, cookie banner and dynamic form messages.
- Do not inject content above visible content after load.
- Sticky header height must remain stable.
- Webfonts must not cause major layout shifts.
- Error and success messages should not shift unrelated sections unexpectedly.

---

## Hosting and Infrastructure

### Default MVP stack

- Hosting: Vercel.
- Deployment: Git-based automatic deploy via Vercel GitHub integration.
- DNS: Vercel or Cloudflare (when custom domain is registered).
- Domain registrar: Cloudflare Registrar or approved registrar.
- SSL: automatic HTTPS through Vercel.
- Email notifications: Resend.
- Form processing: Next.js Route Handler (app/api/submit/route.ts).
- Analytics: GA4 after consent.
- Search monitoring: Google Search Console.

### Deployment environments

- Production: public, canonical, indexable according to page rules.
- Preview: `noindex,nofollow`.
- Staging: access-protected and `noindex,nofollow`.
- Preview URLs must never appear in sitemap.xml.

### Deployment pipeline

Repository: GitHub (recommended) or GitLab
Branch strategy:
- `main` → auto-deploys to production
- `staging` → deploys to password-protected preview (`noindex`)
- `feature/*` → Vercel Preview Deployments for PR review

Workflow:
- Feature branch → pull request → staging review → merge to main
- Direct commits to main discouraged after launch

Vercel configuration:
- Build command: none (static HTML) or build tool command if using Tailwind purge
- Framework auto-detected by Vercel
- Auto-publish: enabled for main
- Deploy previews: enabled for pull requests

Vercel subdomain (`[name].vercel.app`):
- `noindex`
- Redirect to production domain after launch

### DNS and domain

- Use Cloudflare DNS when available.
- Redirect all HTTP traffic to HTTPS.
- Choose one canonical host:
  - `https://[production-domain]/`
  - or `https://www.[production-domain]/`
- 301 redirect the non-canonical host to canonical.
- Owner reports that the intended production domain was available on June 13, 2026. Recheck immediately before purchase because availability can change at any time.
- Do not launch until the final domain is registered in a business-controlled account and the canonical host is approved.

**Production mailboxes:**

Privacy inbox: `privacy@[production-domain]` (alias to production inbox or separate monitored mailbox)

- general inbox: `general@[production-domain]` or another approved monitored address;
- privacy inbox: `privacy@[production-domain]`, implemented as a monitored alias or separate mailbox;
- verify SPF, DKIM, DMARC, inbound delivery, auto-reply delivery, and Reply-To behavior before launch.

### Headers baseline

Configure at platform level where possible:

- `Strict-Transport-Security`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy`
- `Permissions-Policy`
- Content Security Policy in report-only mode first, then enforced after testing.

### CSP baseline for Next.js on Vercel

Start with report-only mode:

```text
Content-Security-Policy-Report-Only:
  default-src 'self';
  script-src 'self' https://www.googletagmanager.com
    https://www.google-analytics.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://www.google-analytics.com
    https://analytics.google.com
    https://region1.google-analytics.com;
  frame-src 'none';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
```

Notes:
- `'unsafe-inline'` for styles needed if using inline critical CSS.
- Remove `'unsafe-inline'` when possible.
- Switch to enforced mode after 2 weeks of clean reports.
- Update when adding any third-party script or service.
- `font-src 'self'` — requires self-hosted fonts (no CDN).

### 404 page

Next.js supports custom 404 via `app/not-found.tsx`.
Content: heading, brief message, link to homepage, link to diagnostic form.
Use `noindex` meta tag.
Apply same header and footer as main page.

### Backups and ownership

- Repository belongs to the business.
- Domain registrar account belongs to the business.
- Hosting owner access belongs to the business.
- Maintain at least two admin recovery methods.
- Export or backup form submissions according to retention policy.
- Remove former team members promptly.

### Prohibited default stack

Do not use for MVP without a documented business reason:

- WordPress;
- shared hosting;
- Wix;
- Squarespace;
- jQuery;
- Bootstrap;
- heavy page builders.

- Загружать шрифты через Google Fonts CDN или другой third-party font service. Self-host WOFF2 files to avoid third-party requests and privacy concerns.

---

## Content and Growth

### MVP launch

Do not create routes absent from `sitemap.md`.

Required:

- production homepage;
- legal pages;
- canonical;
- robots.txt;
- sitemap.xml;
- Open Graph metadata;
- Twitter/X Card metadata;
- Google Search Console;
- basic analytics after consent.

### Phase 2 content preparation

Create `/blog` only after it is added to `sitemap.md`.

At that point add:

- `/blog`
- RSS endpoint `/feed.xml`
- article template
- author/reviewer metadata
- article schema where applicable
- internal linking to diagnostic and relevant service sections

### Initial semantic content queue

- `5 Signs Your CRM Workflow Needs an Audit`
- `AI Readiness Checklist for B2B Operations Teams`
- `When to Automate vs. When to Fix the Process First`
- `What a Diagnostic-First Engagement Actually Looks Like`
- `How to Audit Your B2B Tech Stack Before Scaling`

Publishing target after launch:

- 2 high-quality posts per month;
- each article targets one intent;
- each article links to one relevant first-step offer;
- no mass-generated thin content.

### Newsletter

Newsletter is Phase 2 only.

- Separate consent from diagnostic form.
- Copy:
  `Get operational insights for B2B teams. No spam. Unsubscribe anytime.`
- Do not pre-check signup.
- Do not add newsletter field to the diagnostic form.
- Provider chosen only when newsletter operations are ready.

---

## Technical QA Before Launch

### Content and structure

- [ ] Custom 404 page exists and links to homepage and diagnostic form.
- [ ] 404 page is noindex.
- [ ] 404 page uses consistent header/footer.
- [ ] Working brand is Fill System everywhere; no unapproved alternate names remain.
- [ ] Comprehensive trademark clearance has been completed and evidence is archived.
- [x] Owner-reported preliminary California Secretary of State Business Search found no matching business on June 13, 2026.
- [ ] California legal entity / DBA mapping and public operator name are confirmed.
- [x] Owner-reported intended production domain was available when checked on June 13, 2026.
- [ ] Final production domain is registered in a business-controlled account.
- [ ] Legal suffixes and registration symbols appear only when verified.
- [ ] No removed draft filenames appear in code or metadata.
- [ ] Section order matches `sitemap.md` and contains exactly 11 top-level landing sections.
- [ ] Business & IT Diagnostic is one composite conversion section; its risk, post-submit and form content are nested sub-blocks.
- [ ] Hero, Problem, Method, Why and Final CTA do not repeat the same positioning paragraph.
- [ ] Text and CTA wording match `texts.md`.
- [ ] No TODO, TBD, lorem ipsum or hidden placeholder copy.
- [ ] No fake logos, metrics, testimonials, awards or certifications.
- [ ] Illustrative composite figures are explicitly labeled and are not presented as verified client proof or guaranteed outcomes.
- [ ] O-1 Readiness Support appears only as the secondary service card, one FAQ entry, and one form request type option — not in Hero, H1, header nav, primary CTA, meta title, meta description, or primary JSON-LD Service.
- [ ] Custom 404 page exists, returns HTTP 404, links to the homepage and diagnostic form, and uses `noindex`.
- [ ] Every CTA in `texts.md` resolves to a valid URL or anchor in `sitemap.md`.

### SEO

- [ ] One H1.
- [ ] Correct title and meta description.
- [ ] Self-referencing canonical.
- [ ] Correct robots directives.
- [ ] sitemap.xml contains only indexable canonical URLs.
- [ ] robots.txt references sitemap.xml.
- [ ] OG and Twitter metadata complete.
- [ ] Organization / WebSite / WebPage / Service JSON-LD validates.
- [ ] FAQ is crawlable HTML.
- [ ] FAQ contains complete Fit / Not Fit criteria and renders list semantics accessibly.
- [ ] No broken internal links.
- [ ] No staging URLs in production.

### Form

- [ ] Exactly four visible required fields: Name, Work Email, Company, Main Challenge.
- [ ] Optional fields are collapsed by default behind `Add more context (optional)`.
- [ ] Form submits successfully without opening or completing optional fields.
- [ ] CTA-specific request type routing prefills one editable request-type field without creating a duplicate control.
- [ ] Client-side and server-side validation work.
- [ ] Success and error states work.
- [ ] Submission notification reaches the verified `[production-inbox]` on the confirmed domain.
- [ ] Privacy notice is visible.
- [ ] Form does not collect sensitive credentials/documents.
- [ ] Honeypot works.
- [ ] Spam queue checked.

### Privacy

- [ ] Cookie banner has Accept / Decline / Privacy Policy.
- [ ] GA4 does not load before consent.
- [ ] GA4 remains disabled after Decline.
- [ ] Site works without analytics.
- [ ] Privacy requests route to the verified `[privacy-inbox]` on the confirmed domain.
- [ ] Actual providers are named in Privacy Policy.
- [ ] Retention workflow is documented.

### Accessibility

- [ ] Keyboard-only navigation works.
- [ ] Focus states are visible.
- [ ] Mobile drawer focus trap works.
- [ ] FAQ ARIA states work.
- [ ] Form labels and errors are programmatically associated.
- [ ] Contrast passes AA.
- [ ] Touch targets are at least 44px.
- [ ] Reduced motion is respected.
- [ ] No horizontal scroll at QA widths.

### Performance

- [ ] LCP ≤ 2.5s.
- [ ] INP ≤ 200ms.
- [ ] CLS ≤ 0.1.
- [ ] Hero visual is optimized.
- [ ] Images have dimensions.
- [ ] Below-fold images lazy-load.
- [ ] Fonts use WOFF2 and `font-display: swap`.
- [ ] No render-blocking third-party analytics.
- [ ] Production Lighthouse targets are met.

### Cross-browser

- [ ] Chrome latest (desktop + Android)
- [ ] Firefox latest
- [ ] Safari latest (desktop + iOS)
- [ ] Edge latest
- [ ] Safari iOS: form zoom on focus (`font-size ≥16px`), smooth scroll, `position:sticky`, autocomplete UI

### Infrastructure

- [ ] HTTPS works.
- [ ] HTTP redirects to HTTPS.
- [ ] Canonical host redirect works.
- [ ] Preview/staging is noindex and protected.
- [ ] Repository, hosting and domain ownership are confirmed.
- [ ] DNS and email records are validated.
- [ ] Security headers tested.

---

## Запрещено

- Самовольно менять рабочий бренд Fill System; любое переименование требует owner approval и повторной синхронизации всех четырёх source files.
- Использовать старое название компании.
- Создавать страницы, отсутствующие в `sitemap.md`.
- Упоминать удалённые draft page files.
- Размещать O-1 Readiness Support вне разрешённого scope (service card, один FAQ, один request type) — в Hero, H1, header nav, primary CTA, meta или primary JSON-LD Service.
- Придумывать и представлять как подтверждённые: real clients, real metrics, certifications, awards, partnerships, logos, reviews, имена или bios команды. Разрешённое исключение: illustrative composite figures — только если явно помечены как anonymized composites (например, Diagnostic Scenarios с диапазонами вроде $180K–$240K, $320K).
- Использовать lorem ipsum.
- JS-render основного контента.
- Использовать jQuery или Bootstrap.
- Использовать table layout.
- Использовать deprecated HTML tags.
- Использовать inline styles вместо reusable classes.
- Создавать horizontal page scroll.
- Использовать text inside images вместо HTML.
- Использовать generic primary CTA:
  - Contact Us
  - Learn More
  - Submit
- Использовать AI-hype visuals/copy.
- Использовать outsourcing positioning.
- Использовать fake trust.
- Использовать multiple equal-weight primary CTAs.
- Использовать auto-playing video/audio.
- Использовать scroll-jacking.
- Использовать mobile parallax.
- Загружать analytics до consent.
- Хранить form content в localStorage.
- Передавать PII или free-form challenge text в analytics.

---

## Правила работы ИИ

### Источники данных

- `sitemap.md` — структура и порядок секций.
- `texts.md` — тексты, CTA, metadata и form copy.
- `design.md` — visual parameters и components.
- `optimization.md` — SEO, performance, accessibility и technical rules.

### Разрешения

- Сокращать текст для fit-to-layout без изменения смысла.
- Объединять два соседних предложения.
- Использовать shorter heading variants на mobile при сохранении смысла.
- Преобразовывать desktop tables в mobile cards.
- Добавлять semantic HTML wrappers и accessibility attributes.
- Добавлять technical metadata, явно предусмотренные этим файлом.

### Запреты

- Не задавать новые business assumptions.
- Не придумывать новые pages, offers или proof.
- Не менять язык сайта с English.
- Не менять diagnostic-first positioning.
- Не менять CTA meaning.
- Не скрывать essential content на mobile.
- Не оставлять TODO / TBD в production.
- Не добавлять technologies или credentials, которых нет в `texts.md`.

### Обработка конфликтов

Применять приоритет по предметной области:

- Structure / URLs / anchors → `sitemap.md`.
- Copy / CTA / metadata → `texts.md`.
- Visual system → `design.md`.
- SEO / performance / accessibility / technical constraints → `optimization.md`.

При конфликте добавить комментарий:

```html
<!-- CONFLICT: [file A] says X; [file B] says Y. Used [decision] based on source priority. -->
```

### Visual fallback

Если approved visual asset отсутствует:

```html
<!-- VISUAL: diagnostic system map showing interconnected nodes:
Processes, CRM / RevOps, Data, Automation and IT Systems -->
```

Использовать semantic placeholder только в development/staging:

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

- Placeholder не должен выглядеть как реальный proof.
- Placeholder description должна объяснять назначение visual.
- Удалить development placeholders перед production launch.


### ICP and Fit QA

- Public copy states the primary ICP as 50–250 employees in the Hero and once in the FAQ fit answer.
- Company size is optional and does not create a public hard-rejection path.
- The employee range is not repeated in H1, CTA labels, schema, or every section.
- Fit criteria include unclear automation / AI priorities and independent pre-implementation review.
- Not-fit criteria exclude hourly staffing, basic tool-only setup, tool-first refusal of problem definition, and pre-analysis ROI guarantees.
- No-fit language is direct but neutral; no visitor is shamed or blocked solely by company size.

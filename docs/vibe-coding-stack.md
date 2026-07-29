# ⚠️ SUPERSEDED — This file describes a REJECTED Astro/Netlify/Postmark architecture. The actual production stack is Next.js App Router + Vercel + Resend. See development-plan.md for the current architecture decision and implementation plan. Do not use this file for implementation decisions.

# Vibe Coding Stack

## Final Decision

**Production stack:** Claude Code → Astro 6 static → Node.js 24 LTS → TypeScript strict → Astro components + semantic HTML + minimal vanilla TypeScript → CSS Custom Properties + scoped CSS → local typed content → Netlify Forms + Netlify event function + Postmark → GitHub → Netlify → GitHub Actions → Playwright + axe-core + Lighthouse CI → GA4 after consent + Google Search Console + Better Stack.

**Why this is the optimal choice:** the current project is a single-page B2B MVP with legal pages, strict SEO/accessibility requirements, limited interactivity and no need for authentication, database, SSR or a client-side application. Astro produces static HTML, minimizes browser JavaScript and preserves a clean path to future content expansion without introducing React/Next.js-level complexity.

**AI development model:** Claude Code is the primary implementation agent. `CLAUDE.md` provides concise permanent context; `.claude/rules/` contains path-specific rules; `.claude/settings.json`, sandboxing and `PreToolUse` hooks enforce hard restrictions; each implementation task runs in Plan Mode and a separate Git branch/worktree.

**Vendor-lock-in control:** all page rendering and content remain portable static output. Netlify-specific code is isolated to form handling and deployment configuration. Moving hosting later requires replacing only the form adapter, event function and deployment settings.

**Alternative path:**

- Acceptable low-cost alternative: plain HTML/CSS/TypeScript generated and maintained through Claude Code. It removes Astro but increases manual duplication and becomes weaker when pages or reusable content grow.
- Acceptable unofficial alternative: a local open-source model may perform read-only review or generate disposable boilerplate in an isolated branch. Its output receives the same tests and human review.
- Rejected “gray” alternatives: shared Claude subscriptions, cracked clients, unofficial API proxies, stolen API keys or bypassing Claude Code permissions. They create source-code leakage, account suspension and supply-chain risks that exceed any saving.

## Selected Tools

| Задача | Выбранное решение | Почему подходит проекту | Критическое ограничение |
|---|---|---|---|
| AI-разработка | **Claude Code** | Работает непосредственно с repository, изменяет несколько файлов, запускает commands/tests и поддерживает Plan Mode, permissions, hooks, sandboxing и worktree isolation. | Не использовать `bypassPermissions` / `--dangerously-skip-permissions`; production operations остаются ручными. |
| Постоянные AI-инструкции | **`CLAUDE.md` + `.claude/rules/`** | Отделяет общие правила от path-specific требований к components, content, forms, SEO и tests. | Это context, а не hard enforcement; критичные запреты дублируются в settings/hooks. |
| Hard guardrails | **`.claude/settings.json` + sandbox + `PreToolUse` hooks** | Блокирует secrets, source-of-truth edits, destructive Git commands и deployment до выполнения. | Hooks должны храниться в repository, быть короткими и проходить ручной security review. |
| Browser assistance для Claude | **Playwright MCP**, только локальный preview | Даёт Claude структурированный browser access для проверки responsive UI, form states и keyboard flows. | MCP не заменяет committed Playwright tests и не получает production credentials или authenticated business sessions. |
| Runtime | **Astro 6 static output** | Основной контент попадает в HTML; по умолчанию нет обязательного client runtime; удобны reusable `.astro` components. | Не подключать SSR adapter, React/Vue/Svelte integrations или islands без документированной необходимости. |
| Node / package manager | **Node.js 24 LTS + npm + committed `package-lock.json`** | LTS runtime и понятный workflow для новичка; `npm ci` обеспечивает воспроизводимую CI-сборку. | Версия фиксируется в `.nvmrc` и `package.json#engines`; обновление major — отдельный PR. |
| Компоненты | **Astro components + semantic HTML** | Поддерживает повторное использование без SPA-архитектуры и лишнего JavaScript. | Новый component создаётся только при повторном использовании, отдельной ответственности или самостоятельных states. |
| Интерактивность | **Минимальный vanilla TypeScript** | Достаточен для mobile menu, FAQ disclosure, consent, CTA prefill и form enhancement. | Primary navigation, copy, FAQ content и form submission должны сохранять базовую работоспособность без JS. |
| Стили | **CSS Custom Properties, Cascade Layers, global foundation + scoped component CSS** | Использует утверждённые design tokens и снижает риск CSS collisions и AI-generated duplication. | Не добавлять Tailwind, Sass, CSS-in-JS или UI kit в MVP. |
| Content storage | **Astro Content Layer: local JSON/YAML для structured sections, Markdown для legal pages** | Copy отделена от components, проверяется schema на build и остаётся Git-versioned без CMS/API. | RAG-файлы не парсятся во время runtime/build и не отправляются в browser; перенос контента выполняется контролируемо один раз. |
| CMS | **Не использовать в MVP** | Один landing и legal pages не оправдывают SaaS CMS, API dependency и редакционный workflow. | Пересмотреть только после появления регулярных публикаций или non-technical editors. |
| Form UI | **Native HTML form + browser constraints + accessible custom messages** | Работает без framework и соответствует progressive enhancement. | Не полагаться только на client-side validation. |
| Form processing | **Netlify Forms** | Build-time form detection, verified submissions, notifications и spam filtering соответствуют выбранному hosting. | Form markup должен присутствовать в сгенерированном HTML; provider-specific attributes изолируются в form component. |
| Server-side form control | **Typed `formSubmitted` Netlify event function** | Повторно нормализует и валидирует verified submission перед автоответом или дальнейшей маршрутизацией. | Event function запускается после сохранения submission; invalid data не отправляется дальше, но retention/cleanup контролируются отдельно. |
| Auto-reply | **Postmark REST API через native `fetch`** | Обеспечивает transactional confirmation с verified sender без дополнительного SDK dependency. | Не включать в письмо challenge text или другие значения формы; failure логируется и не влияет на сохранение заявки. |
| Spam protection | **Netlify filtering + honeypot; CAPTCHA только при реальном abuse** | Минимизирует friction для B2B lead. | Spam queue проверяется еженедельно в первый месяц. |
| Hosting | **Netlify static hosting** | Git deploys, atomic releases, Deploy Previews, Forms и Functions в одном operational contour. | Следить за общим credit usage Functions/builds; Forms на credit-based plans бесплатны и unlimited. |
| Domain / DNS | **Cloudflare Registrar/DNS в режиме DNS-only** | Domain остаётся в business-owned account; отсутствует второй proxy/CDN layer перед Netlify. | Cloudflare proxy включается только после отдельного теста SSL, redirects, caching и headers. |
| Repository | **Business-owned private GitHub repository** | PR workflow, Actions, Dependabot и понятный handoff новому разработчику. | Owner access, billing, recovery и 2FA принадлежат бизнесу, не подрядчику. |
| Version control | **Protected `main`, short-lived `feature/*`, squash merge** | Каждая AI-задача имеет ограниченный diff и отдельный rollback point. | Постоянная `staging` branch не нужна для одного разработчика; добавить только при реальном UAT workflow. |
| Dependency security | **Dependabot alerts + security/version update PRs** | Снижает риск забытых vulnerable packages. | Автоматический merge запрещён; обновления проходят CI и preview review. |
| E2E / cross-browser | **Playwright Test** | Проверяет Chromium, Firefox, WebKit и mobile emulation одним test suite. | Chromium запускается на каждом PR; полный matrix — перед production release и major updates. |
| Accessibility automation | **`@axe-core/playwright`** | Автоматически выявляет часть WCAG-проблем в committed tests. | Не заменяет keyboard, zoom и screen-reader manual QA. |
| Performance regression | **Lighthouse CI** | Даёт repeatable performance/SEO/accessibility assertions в PR. | Lab scores не подменяют реальные Core Web Vitals. |
| Analytics | **Direct `gtag.js` + GA4 Basic Consent Mode** | Выполняет текущий tracking plan без GTM overhead; tags не загружаются до consent. | Никогда не отправлять names, emails, company, form text или full query strings. |
| Search monitoring | **Google Search Console** | Контролирует indexing, sitemap, canonical issues и search performance. | Подключается только к подтверждённому production domain. |
| Uptime | **Better Stack HTTP monitor** | Независимо проверяет production availability и HTTPS. | Не использовать его как замену real form and conversion checks. |

## Architecture

```text
/
├── CLAUDE.md
├── CLAUDE.local.md                  # gitignored
├── .claude/
│   ├── settings.json
│   ├── settings.local.json          # gitignored
│   ├── rules/
│   │   ├── architecture.md
│   │   ├── components.md
│   │   ├── content-protection.md
│   │   ├── accessibility-seo.md
│   │   ├── forms-security.md
│   │   └── testing.md
│   └── hooks/
│       ├── protect-source-files.sh
│       └── block-destructive-command.sh
├── .github/
│   ├── workflows/quality.yml
│   └── dependabot.yml
├── docs/
│   ├── source-of-truth/
│   │   ├── sitemap.md
│   │   ├── texts.md
│   │   ├── design.md
│   │   ├── optimization.md
│   │   └── vibe-coding-stack.md
│   ├── architecture-decisions/
│   └── component-registry.md
├── src/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── privacy-policy.astro
│   │   ├── terms-of-use.astro
│   │   ├── cookie-policy.astro
│   │   └── 404.astro
│   ├── layouts/BaseLayout.astro
│   ├── components/
│   │   ├── global/
│   │   ├── sections/
│   │   ├── forms/
│   │   └── seo/
│   ├── content/
│   │   ├── site/
│   │   └── legal/
│   ├── content.config.ts
│   ├── lib/
│   └── styles/
│       ├── tokens.css
│       ├── reset.css
│       ├── base.css
│       ├── layout.css
│       └── utilities.css
├── netlify/
│   └── functions/form-submitted.mts
├── tests/
│   ├── contracts/
│   ├── e2e/
│   └── accessibility/
├── astro.config.mjs
├── netlify.toml
├── playwright.config.ts
├── package.json
└── package-lock.json
```

Architecture rules:

- `BaseLayout.astro` controls metadata, canonical, robots, structured data, font loading, consent bootstrap and global assets.
- `index.astro` assembles section components strictly in the order defined by `sitemap.md`.
- Approved copy lives in typed content entries, not inside presentational components.
- Content schema fails the build when a required section, CTA, metadata field or form option is missing.
- Main copy, navigation, FAQ and legal content are present in generated HTML.
- JavaScript is limited to behavior that cannot be achieved reliably with native HTML/CSS.
- Global CSS contains only tokens, reset, typography, layout primitives and approved utilities. Section-specific CSS remains scoped.
- Provider-specific code is limited to `netlify/`, form adapter attributes and deployment configuration.
- No database, authentication, SSR, API layer, SPA router or headless CMS in MVP.

## Development Workflow

1. **Prepare ownership**
   - Create GitHub, Netlify, Cloudflare, Postmark, Google Analytics and Search Console under business-controlled accounts.
   - Enable 2FA and preserve recovery methods.
   - Complete the existing brand/entity/domain launch gate before production.

2. **Clean the implementation context**
   - Put only current `sitemap.md`, `texts.md`, `design.md`, `optimization.md` and this file in `docs/source-of-truth/`.
   - Mark old Clearpath/multipage documents as superseded or move them to archive.
   - Mark `action_plan_v2.md` as historical after its accepted changes are merged.

3. **Initialize the repository**
   - Create a minimal Astro 6 project with strict TypeScript.
   - Pin Node 24 LTS.
   - Commit `package-lock.json`.
   - Configure static output, build command `npm run build` and publish directory `dist`.

4. **Install governance before page code**
   - Create `CLAUDE.md` under 200 lines.
   - Split detailed rules into `.claude/rules/`.
   - Add deny permissions, sandbox settings and blocking hooks.
   - Disable Claude auto memory for this repository until the conflicting historical RAG is removed.
   - Create `component-registry.md`.

5. **Configure Git and CI**
   - Protect `main`.
   - Require Pull Request and successful quality checks.
   - Enable Deploy Previews.
   - Add Dependabot.
   - Do not allow direct production deploy commands from Claude Code.

6. **Build the foundation**
   - Implement `BaseLayout`, metadata, legal-page template, 404, tokens, typography, container, buttons, header, footer and form primitives.
   - Verify HTML source before visual polish.

7. **Migrate approved content**
   - Transfer approved copy into typed JSON/YAML/Markdown without rewriting.
   - Compare source and migrated text automatically.
   - Lock source-of-truth files from AI edits.

8. **Implement one section per task**
   - Start a short-lived branch/worktree.
   - Enter Plan Mode.
   - Require Claude to list applicable sources, existing components, files to change, risks and tests.
   - Approve only the scoped plan.
   - Review every diff manually.
   - Run local browser check through Playwright MCP.
   - Commit only after automated checks pass.

9. **Implement the form**
   - Start with native HTML submission.
   - Add accessible validation and progressive disclosure.
   - Enable Netlify form detection, honeypot and internal notification.
   - Add typed `formSubmitted` event function.
   - Send Postmark confirmation only after schema validation.
   - Test legitimate, invalid, duplicate and spam paths.

10. **Add consent and analytics**
    - Implement cookie preference UI first.
    - Load GA4 only after analytics consent.
    - Add only approved non-PII events.
    - Validate with Tag Assistant and GA4 DebugView.

11. **Release**
    - Run the complete release matrix and manual QA.
    - Configure production variables and verified sender domain.
    - Connect the approved production domain.
    - Perform a real production form submission.
    - Submit `sitemap.xml` and inspect the production URL in Search Console.

## AI Development Rules

1. **Plan before edit.** Every implementation task begins in Plan Mode. Claude must name affected files, dependencies, risks and tests before changing code.
2. **One task, one branch, one worktree.** Do not combine architecture, copy, styling, analytics and deployment changes in one task.
3. **Source-of-truth files are read-only.** AI cannot edit files under `docs/source-of-truth/` unless the user explicitly creates a documentation-update task.
4. **Approved copy is immutable.** AI cannot shorten, merge, translate, improve, correct or create mobile variants of approved text without explicit copy approval.
5. **No invented scope.** Do not add routes, sections, anchors, CTA labels, form fields, services, proof, metrics, logos or credentials.
6. **Search before creating.** Check `component-registry.md`, existing components and CSS tokens before adding a component, utility or selector.
7. **No duplicate CSS.** Literal colors, spacing, typography and radii are forbidden when an approved token exists.
8. **Dependency gate.** Before installing a package, Claude must state the need, native alternative, runtime/bundle effect, license and maintenance risk.
9. **Minimal diff.** Unrelated cleanup, formatting of untouched files and broad refactoring are prohibited.
10. **No uncontrolled refactor.** A refactor must name its boundary, preserved behavior and regression tests.
11. **Protect working sections.** Changes to shared components require affected-page and responsive regression checks.
12. **Review all diffs.** Never accept an entire AI change set without inspecting content, forms, metadata, analytics, security and deployment changes.
13. **Secrets are inaccessible.** Deny `.env*`, private keys, tokens, form exports and credential folders through permissions and sandbox filesystem rules.
14. **No production actions.** Claude cannot push to `main`, deploy, change DNS, rotate secrets, publish packages, modify external accounts or delete production data.
15. **Disable bypass mode.** Configure `disableBypassPermissionsMode: "disable"` and never use `--dangerously-skip-permissions`.
16. **Sandbox Bash.** Use `sandbox.enabled: true`, `failIfUnavailable: true`, `allowUnsandboxedCommands: false` where the OS supports it.
17. **Hooks enforce hard blocks.** `CLAUDE.md` is guidance; source protection and destructive-command prevention must use `PreToolUse`.
18. **Restrict MCP.** Only approved local MCP servers are allowed. Playwright MCP uses isolated test profiles and no production authentication.
19. **Disable auto memory initially.** Historical RAG contains conflicting brands and architectures; persistence is restored only after context cleanup and audit.
20. **No simultaneous edits.** Two Claude sessions may not modify the same branch or working directory.
21. **Evidence before completion.** Claude reports changed files, command outputs, skipped checks, screenshots and remaining manual QA.
22. **No hidden failure.** Failed, skipped or unavailable tests are reported explicitly; Claude cannot claim completion based on code appearance.

Required project settings baseline:

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "autoMemoryEnabled": false,
  "disableBypassPermissionsMode": "disable",
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git status)",
      "Bash(git diff *)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)",
      "Edit(./docs/source-of-truth/**)",
      "Bash(git push *)",
      "Bash(git reset --hard *)",
      "Bash(git clean *)",
      "Bash(netlify deploy *)",
      "Bash(npm publish *)",
      "Bash(rm -rf *)"
    ]
  },
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "autoAllowBashIfSandboxed": false,
    "allowUnsandboxedCommands": false,
    "filesystem": {
      "denyRead": [
        "./.env",
        "./.env.*",
        "./secrets"
      ],
      "denyWrite": [
        "./docs/source-of-truth"
      ]
    },
    "network": {
      "allowedDomains": [
        "registry.npmjs.org",
        "github.com"
      ]
    }
  }
}
```

The exact rule patterns must be tested with `/permissions` and the active Claude Code version before relying on them.

## Testing and QA

### Required on every Pull Request

```text
npm ci
→ formatting check
→ ESLint
→ Stylelint
→ astro check
→ production build
→ content/structure contract tests
→ Playwright Chromium
→ axe accessibility tests
→ Lighthouse CI
```

Contract tests must verify:

- route list matches `sitemap.md`;
- landing section count, order and IDs match `sitemap.md`;
- one H1 exists;
- all CTA targets resolve;
- approved copy checksum/snapshot has not changed unintentionally;
- form fields and request types match the approved schema;
- Netlify form markup exists in generated HTML;
- legal routes have `noindex,follow`;
- production canonical never contains preview host;
- FAQ content exists in source HTML;
- analytics code is absent before consent;
- no old brand, O-1 scope, `TODO`, `TBD`, fake proof or unresolved placeholders reach production.

### Required before production release

- Playwright: Chromium, Firefox and WebKit.
- Mobile emulation plus real iOS Safari smoke test.
- Project QA widths from `optimization.md`.
- Keyboard-only navigation.
- NVDA or VoiceOver smoke test.
- 200% and 400% zoom.
- Reduced motion and high-contrast checks.
- Consent: accept, decline, change preferences and absent consent.
- Form: success, server failure, duplicate click, invalid email, honeypot and Postmark failure.
- Real internal notification and user confirmation email.
- Source HTML, metadata, canonical, robots, sitemap and structured data.
- Security headers and CSP in Report-Only before enforcement.
- Lighthouse thresholds and asset budgets from `optimization.md`.
- Manual visual comparison against approved design at every QA width.

Automated axe checks do not prove full WCAG compliance. Lighthouse lab scores do not replace field Core Web Vitals.

## Deployment and Maintenance

### Deployment model

- `main` is the only production branch.
- Every Pull Request receives a Netlify Deploy Preview.
- Preview responses use `noindex,nofollow`; preview hosts never become canonical.
- Production deploy requires passing required checks and manual preview approval.
- Build command: `npm run build`.
- Publish directory: `dist`.
- Astro Netlify adapter remains absent while the site is fully static.

### Environment variables

Store values in Netlify, separated by production and preview contexts:

```text
PUBLIC_SITE_URL
PUBLIC_GA_MEASUREMENT_ID
PRODUCTION_INBOX
PRIVACY_INBOX
POSTMARK_SERVER_TOKEN
POSTMARK_FROM_EMAIL
FORM_EMAIL_ENABLED
```

Rules:

- only `PUBLIC_*` values may enter browser bundles;
- `.env.example` contains names and explanations only;
- preview uses Postmark test mode or `FORM_EMAIL_ENABLED=false`;
- secrets never appear in repository, `netlify.toml`, Claude context or logs;
- production inboxes and sender domain are tested before launch.

### Rollback

1. Publish the last known-good atomic Netlify deploy.
2. Pause automatic publishing if the faulty commit can redeploy.
3. Revert the faulty Pull Request in GitHub.
4. Fix through a new branch and Pull Request.
5. Run the full quality pipeline.
6. Resume normal production publishing after verification.

### Monitoring

- Better Stack: production HTTP/HTTPS availability.
- Netlify: deploy failures, Functions logs, Forms dashboard and spam queue.
- Postmark: delivery failures and bounces for confirmation emails.
- GA4: approved conversion events only after consent.
- Search Console: indexing, sitemap, canonical and Core Web Vitals.
- Monthly: real production form test from submission through internal response.
- Monthly: dependency maintenance PR.
- Weekly during first launch month: spam queue, function failures and broken-link review.

### Maintenance policy

- Security updates receive prompt review.
- Normal dependency updates are grouped into one monthly maintenance PR.
- Major Astro, Node or Playwright upgrades use a separate architecture PR and full regression matrix.
- Do not auto-merge dependency updates.
- Form submissions follow the retention and deletion rules in `optimization.md` and the published Privacy Policy.
- Add a CMS, database, SSR or additional framework only after a documented business requirement and architecture decision record.

## Required Project Changes

| File | Required change |
|---|---|
| `optimization.md` | Replace the open-ended `static/prerendered`, plain HTML and optional Tailwind choice with the selected implementation: Astro 6 static, Node.js 24 LTS, npm, strict TypeScript, build `npm run build`, output `dist`, no SSR adapter. |
| `optimization.md` | Replace repository choice `GitHub or GitLab` with business-owned GitHub and change branch strategy to protected `main` + short-lived `feature/*` + Pull Request Deploy Previews. Keep persistent staging only when a real UAT process appears. |
| `optimization.md` | Add Claude Code implementation governance: `CLAUDE.md`, `.claude/rules/`, permissions, sandbox, hooks, isolated worktrees, disabled bypass mode and disabled auto memory during RAG cleanup. |
| `optimization.md` | Update Form Processing: Netlify Forms remains the intake layer; a typed `formSubmitted` event function validates/normalizes verified data and sends Postmark auto-reply. Document Postmark failure logging and prohibit echoing submitted content. |
| `optimization.md` | Remove the obsolete `80 submissions`, `$19/month` and `1,000 submissions` Netlify Forms guidance. Credit-based plans have free unlimited Forms; monitor spam, Functions/build credit usage and account plan type instead. |
| `optimization.md` | Remove Formspree as a response to an obsolete Forms limit. Keep it only as a migration option if hosting or operational requirements change. |
| `optimization.md` | State that Cloudflare is registrar/DNS-only for the selected architecture unless proxying is separately approved and tested. |
| `optimization.md` | Remove AI permission to shorten copy, merge sentences or create mobile heading variants without explicit copy approval. |
| `design.md` | Remove the same permission to shorten or merge approved text. Layout must adapt to copy; copy changes require a separate approved task. |
| `sitemap.md` | Add `vibe-coding-stack.md` to Final project files / Project File Map as the source of truth for stack, repository, Claude Code workflow, testing and deployment. |
| `texts.md` and Cookie/Privacy legal drafts | At launch, list only providers actually used: Netlify, Postmark, GA4 after consent and Cloudflare in its real DNS/registrar role. Do not describe Cloudflare as content delivery/security if proxying is disabled. |
| `action_plan_v2.md` | Mark as historical/completed after accepted changes are reflected. Correct or strike the obsolete Netlify Forms pricing/limit item so Claude does not revive it. |
| Old `Clearpath Systems` and multipage RAG files | Move to archive or add `Status: superseded — do not use for implementation`. Do not perform a blind brand replacement because their page architecture conflicts with the current single-page Fill System MVP. |
| Active source files | Add a shared implementation-status header naming the five current source-of-truth files and explicitly excluding superseded RAG. |

## Sources

Official sources checked **30 June 2026**:

- [Claude Code overview](https://code.claude.com/docs/en/overview)
- [Claude Code memory: `CLAUDE.md`, `.claude/rules/`, auto memory](https://code.claude.com/docs/en/memory)
- [Claude Code settings, permissions and sandbox](https://code.claude.com/docs/en/settings)
- [Claude Code permission modes and Plan Mode](https://code.claude.com/docs/en/glossary)
- [Claude Code security](https://code.claude.com/docs/en/security)
- [Playwright MCP for Claude Code](https://playwright.dev/docs/getting-started-mcp)
- [Astro 6 upgrade and Content Layer requirements](https://docs.astro.build/en/guides/upgrade-to/v6/)
- [Astro scoped styles](https://docs.astro.build/en/guides/styling/)
- [Astro Content Loader API](https://docs.astro.build/en/reference/content-loader-reference/)
- [Node.js release lifecycle and Node 24 LTS](https://nodejs.org/en/about/previous-releases)
- [Netlify Forms setup](https://docs.netlify.com/manage/forms/setup/)
- [Netlify form-triggered event functions](https://docs.netlify.com/build/functions/trigger-on-events/)
- [Netlify Forms usage and billing](https://docs.netlify.com/manage/forms/usage-and-billing/)
- [Postmark Email API](https://postmarkapp.com/developer/api/email-api)
- [Postmark sender requirements](https://postmarkapp.com/developer/user-guide/send-email-with-api)
- [GitHub Dependabot security updates](https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/manage-your-dependency-security/configuring-dependabot-security-updates)
- [Playwright browsers and mobile emulation](https://playwright.dev/docs/browsers)
- [Playwright accessibility testing with axe](https://playwright.dev/docs/accessibility-testing)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Google Consent Mode](https://developers.google.com/tag-platform/security/concepts/consent-mode)
- [Better Stack HTTP/API monitoring](https://betterstack.com/docs/uptime/api-monitor/)

# SEO-АУДИТ КОНТЕНТА: opsfield-systems.vercel.app

**Дата:** 27 июля 2026  
**Источник:** HTML source code (view-source)  
**Фокус:** On-page SEO, контент, структура, Schema, GEO-готовность

---

## 1. МЕТА-ТЕГИ

### Title
```
Diagnostic-First IT & Business Consulting | Opsfield Systems
```
**Оценка: 7/10**
- ✅ Длина: 60 символов — идеально, не обрезается
- ✅ Основной ключ в начале: "Diagnostic-First IT & Business Consulting"
- ✅ Бренд в конце через разделитель
- ⚠️ "Diagnostic-First" — нишевый авторский термин, не поисковый запрос. Никто не ищет "diagnostic-first consulting". Это хорошо для бренда, но плохо для discoverability
- **Рекомендация:** Для SEO лучше: `IT & Business Process Consulting for B2B | Opsfield Systems` или `B2B Operations & IT Consulting — Diagnostic-First | Opsfield Systems`

### Meta Description
```
B2B companies with 50-250 employees use Opsfield Systems to diagnose process, CRM, data, and IT bottlenecks before committing to tools, hires, or implementation.
```
**Оценка: 8/10**
- ✅ Длина: 161 символ — в пределах нормы
- ✅ Целевая аудитория чётко указана (B2B, 50-250 employees)
- ✅ Ключевые услуги перечислены (process, CRM, data, IT)
- ✅ Уникальное ценностное предложение ("before committing to tools")
- ⚠️ Нет явного call-to-action ("Get a free diagnostic" или "Request a complimentary review")

### ‼️ Meta Robots — КРИТИЧЕСКАЯ ОШИБКА
```html
<meta name="robots" content="noindex, nofollow"/>
```
**Оценка: 0/10 — БЛОКЕР**
- ❌ `noindex` — запрещает индексацию всех страниц
- ❌ `nofollow` — запрещает передачу ссылочного веса
- Это **сознательно установлено в коде приложения** (не Vercel по умолчанию), т.к. находится внутри `<head>` как мета-тег Next.js
- **Двойной блок:** и meta robots в HTML, и X-Robots-Tag от Vercel

**Действие:** Убрать `noindex, nofollow` из конфигурации Next.js metadata. Заменить на:
```html
<meta name="robots" content="index, follow"/>
```

### Canonical
```html
<link rel="canonical" href="https://opsfield-systems.vercel.app"/>
```
**Оценка: 3/10**
- ❌ Canonical указывает на *.vercel.app URL — бессмысленно для SEO
- ❌ После привязки кастомного домена нужно обновить на `https://opsfield-systems.com` (или какой будет выбран)
- ⚠️ Отсутствует trailing slash — может вызвать дублирование (`/` vs без `/`)

### Hreflang
```html
<link rel="alternate" hrefLang="en-US" href="https://opsfield-systems.vercel.app"/>
<link rel="alternate" hrefLang="x-default" href="https://opsfield-systems.vercel.app"/>
```
**Оценка: 5/10**
- ✅ Формат корректный
- ✅ x-default присутствует
- ⚠️ На сайте есть language switcher (кнопка "EN"), но только одна языковая версия видна — если нет второго языка, hreflang избыточен
- ❌ URL указывает на vercel.app

---

## 2. СТРУКТУРА ЗАГОЛОВКОВ

### H1
```
Diagnostic-First IT & Business Consulting
```
**Оценка: 6/10**
- ✅ Единственный H1 на странице
- ✅ Содержит основные ключевые слова
- ⚠️ "Diagnostic-First" — бренд-термин, не поисковый запрос
- ⚠️ Не совпадает полностью с Title (нормально, но упущена возможность усилить)

### H2 (все на странице)
| # | H2 | Оценка |
|---|-----|--------|
| 1 | "Your business may not have a technology problem first." | ⚠️ Журналистский, не SEO. Нет ключевых слов |
| 2 | "We diagnose the gaps between how your business works and how your systems support it." | ⚠️ Длинный. Описательный, но без ключей |
| 3 | "What we do, with prices up front." | ❌ Нулевая SEO-ценность |
| 4 | "From diagnostic to implementation: AI & Process Automation." | ✅ Содержит "AI", "Process Automation" |
| 5 | "From operating symptoms to a clear next step." | ⚠️ Журналистский |
| 6 | "Representative diagnostic scenarios." | ⚠️ Нет ключей |
| 7 | "Why Opsfield Systems" | ✅ Бренд |
| 8 | "Senior attention without a handoff chain." | ⚠️ Журналистский |
| 9 | "A structured first step before another tool, hire, or implementation project." | ⚠️ Длинный, нет ключей |
| 10 | "FAQ" | ✅ Стандарт |
| 11 | "From uncertainty to a scoped next step." | ⚠️ Журналистский |

**Общая оценка H2: 4/10**
- ❌ Почти все H2 — копирайтерские, не SEO-оптимизированные
- ❌ Нет ни одного H2 с целевыми поисковыми запросами типа "IT consulting for B2B", "CRM audit", "process optimization", "RevOps consulting"
- Для LLM/AI извлечения это тоже проблема — AI использует заголовки для навигации по контенту

### H3 (сервисные карточки)
| H3 | Оценка |
|----|--------|
| Primary Diagnostic | ✅ |
| Advisory Power Hour | ✅ |
| Extended Diagnostic | ✅ |
| Add-on Tool Build | ⚠️ Не поисковый |
| IT Risk & Security | ✅ Хороший ключ |
| Process & Operations | ✅ |
| AI & Process Automation | ✅ |
| RevOps: CRM, Data & Reporting | ✅ Отличный ключ |
| O-1 Readiness Support | ✅ Нишевый |
| Processes | ✅ |
| Revenue, data & systems | ✅ |
| Managing Partner | ✅ |
| Solution Architect | ✅ |

**Оценка H3: 7/10** — Сервисные H3 хорошо структурированы и содержат релевантные термины.

---

## 3. КОНТЕНТ И E-E-A-T

### Experience (Опыт)
**Оценка: 4/10**
- ❌ Нет имён основателей/консультантов — только роли ("Managing Partner", "Solution Architect") с инициалами (MP, SA)
- ❌ Нет личных историй, кейсов с деталями
- ❌ Нет фото реальных людей (только стоковые placeholder-изображения)
- ❌ "5+ yrs Boutique advisory" — единственное упоминание опыта, без подробностей

### Expertise (Экспертиза)
**Оценка: 5/10**
- ✅ Контент демонстрирует глубокое понимание B2B operations
- ✅ Терминология правильная (RevOps, handoffs, CRM architecture, data flow)
- ⚠️ Нет авторских статей, публикаций, блога
- ❌ Нет упоминания сертификаций, образования, конкретных проектов

### Authoritativeness (Авторитетность)
**Оценка: 2/10**
- ❌ Нулевой digital footprint — бренд не существует в интернете
- ❌ Нет бэклинков, упоминаний, обзоров
- ❌ Нет LinkedIn-профилей команды
- ❌ Gmail-адрес (opsfieldsystems@gmail.com) — сигнал непрофессиональности для B2B consulting
- ❌ Нет Google Business Profile

### Trustworthiness (Доверие)
**Оценка: 6/10**
- ✅ Privacy Policy, Terms of Use, Cookie Policy — присутствуют
- ✅ Цены открыты — "prices up front"
- ✅ Чёткое указание, когда компания НЕ подходит (FAQ "When are you not the right fit?")
- ✅ Disclaimer: "Scenarios are anonymized composites. Figures are illustrative."
- ⚠️ Email — Gmail, не доменный
- ❌ Нет физического адреса (только "California, USA")
- ❌ Нет отзывов реальных клиентов, только анонимные "composites"

### Общий E-E-A-T: 4/10
Для YMYL-тематики (business consulting с ценами $200–$6,800) это критически мало.

---

## 4. SCHEMA.ORG РАЗМЕТКА

**Формат:** JSON-LD ✅ (рекомендуемый)

### Что реализовано (и оценка):

| Schema Type | Оценка | Комментарий |
|-------------|--------|-------------|
| Organization | 7/10 | ✅ Есть name, url, logo, foundingDate, areaServed, address. ❌ Нет contactPoint, sameAs (соцсети), founders |
| WebSite | 8/10 | ✅ Корректно |
| WebPage | 7/10 | ✅ Корректно. ❌ URL указывает на vercel.app |
| Service + Offers | 9/10 | ✅ Отлично. 9 предложений с ценами. Прямая ценность для rich snippets |
| HowTo | 8/10 | ✅ 3 шага с описаниями — хорошо для featured snippets |
| FAQPage | 9/10 | ✅ 10 вопросов. Отлично для AI Overviews и rich snippets |

**Общая оценка Schema: 8/10**
- Это лучшая часть SEO на сайте. Разметка грамотная, покрывает все ключевые сущности
- ⚠️ Все URL внутри Schema указывают на vercel.app — нужно обновить после привязки домена
- ❌ Нет Person/ProfilePage schema для членов команды — важно для E-E-A-T
- ❌ Нет Review schema (нет отзывов)
- 💡 Добавить BreadcrumbList, если появятся подстраницы

---

## 5. ИЗОБРАЖЕНИЯ

### Имена файлов
| Файл | Оценка |
|------|--------|
| `/photos/problem.jpg` | ⚠️ Слишком общее |
| `/services/diagnostic.jpg` | ✅ |
| `/services/advisory.jpg` | ✅ |
| `/services/extended.jpg` | ⚠️ Не описательно |
| `/services/addon.jpg` | ⚠️ |
| `/services/security.jpg` | ✅ |
| `/services/process.jpg` | ✅ |
| `/services/automation.jpg` | ✅ |
| `/services/revops.jpg` | ✅ |
| `/services/o1.jpg` | ❌ Неинформативно |
| `/photos/role-mp.jpg` | ⚠️ |
| `/photos/role-sa.jpg` | ⚠️ |
| `/photos/final-cta.jpg` | ⚠️ |

### Alt-тексты
| Файл | Alt | Оценка |
|------|-----|--------|
| problem.jpg | `""` (пустой) | ⚠️ Декоративное — пустой alt корректен, но упущена SEO-возможность |
| diagnostic.jpg | `"Primary Diagnostic"` | ⚠️ Можно расширить: "Primary diagnostic — free 30-minute fit review for B2B teams" |
| advisory.jpg | `"Advisory Power Hour"` | ⚠️ Короткий |
| security.jpg | `"IT Risk & Security"` | ✅ |
| automation.jpg | `"AI & Process Automation"` | ✅ |
| revops.jpg | `"RevOps: CRM, Data & Reporting"` | ✅ |
| o1.jpg | `"O-1 Readiness Support"` | ✅ |
| role-mp.jpg | `""` (пустой) | ❌ Должен быть: "Managing Partner — operating model and diagnostic lead at Opsfield Systems" |
| role-sa.jpg | `""` (пустой) | ❌ Аналогично |

### Технические аспекты
- ✅ Next.js Image component — автоматическое преобразование в WebP, responsive sizes, lazy loading
- ✅ Placeholder blur — хорошо для CLS
- ✅ Priority для hero image
- ⚠️ Формат исходников — .jpg. Next.js конвертирует, но исходный формат WebP/AVIF был бы эффективнее

**Оценка изображений: 5/10**

---

## 6. URL-СТРУКТУРА И ВНУТРЕННЯЯ ПЕРЕЛИНКОВКА

### URL
- Сайт одностраничный (SPA) — все секции на одном URL
- Навигация через anchor-ссылки (#hero, #what-we-diagnose, #areas-of-work, и т.д.)
- ✅ Подстраницы: `/privacy-policy`, `/terms-of-use`, `/cookie-policy`

**Проблема:** Одностраничный формат = одна индексируемая страница = один шанс на ранжирование. Для консалтингового B2B-сайта с 8+ услугами это **серьёзное упущение**.

**Рекомендация:** Каждый сервис должен иметь отдельную страницу:
- `/services/revops-crm-consulting/`
- `/services/it-risk-security-audit/`
- `/services/ai-process-automation/`
- `/services/business-process-diagnostic/`
- `/services/o1-visa-readiness/`

Это даст:
- Отдельные Title/H1 под целевые ключи
- Отдельные URL для ранжирования по разным запросам
- Внутреннюю перелинковку между сервисами
- Больше точек входа из поисковой выдачи

### Внутренняя перелинковка
- Все ссылки ведут на якоря внутри одной страницы — нулевая ценность для PageRank distribution
- ❌ Нет блога → нет контентных страниц → нет internal link equity
- ❌ Нет breadcrumbs (одна страница — не нужны, но после разбиения на подстраницы — обязательны)

---

## 7. FAQ — SEO И GEO АНАЛИЗ

### Покрытие FAQ
10 вопросов — **хорошее количество**. Вопросы:

| Вопрос | SEO-ценность | GEO-ценность |
|--------|-------------|-------------|
| Is this a sales call? | ⚠️ Низкая — не поисковый | ✅ Снимает возражение |
| How much does the diagnostic cost? | ✅ Высокая — ценовой запрос | ✅ Высокая — AI любит конкретные цены |
| How long does the diagnostic process take? | ✅ | ✅ |
| Do you implement systems? | ✅ | ✅ |
| Do you work remotely or on-site? | ✅ | ✅ |
| What systems do you work with? | ✅ Высокая — конкретные инструменты | ✅ Высокая |
| Who do you work with best? | ✅ | ✅ |
| When are you not the right fit? | ✅ Уникально | ✅ |
| Do you guarantee ROI? | ⚠️ | ✅ Честность = доверие |
| Do you handle O-1 visa petitions? | ⚠️ Нишевый | ✅ |

**Оценка: 7/10** — Хороший набор. FAQ Schema реализован корректно.

### Что добавить:
- "What industries do you serve?" — отраслевые ключи
- "How is Opsfield different from a freelance consultant?" — comparison query
- "What does a typical engagement look like?" — process query
- "Can you help with HubSpot/Salesforce migration?" — инструментальные запросы

---

## 8. GEO/LLM-ГОТОВНОСТЬ

| Фактор | Статус | Комментарий |
|--------|--------|-------------|
| SSR (Server-Side Rendering) | ✅ | Next.js SSR — HTML полностью рендерится на сервере |
| Семантическая ясность | 6/10 | Текст качественный, но заголовки не семантичные |
| Front-loading | 5/10 | Hero section начинается с eyebrow "B2B IT & Operations Advisory", не с прямого ответа |
| FAQ Schema | ✅ 9/10 | 10 вопросов с развёрнутыми ответами |
| HowTo Schema | ✅ | 3 шага — хорошо для extraction |
| Service + Offers Schema | ✅ | 9 предложений с ценами |
| Цитируемость | 4/10 | Нет конкретных данных, статистики, исследований. "Scenarios are illustrative" подрывает цитируемость |
| llms.txt | ❌ | Отсутствует |
| Conversational tone | 7/10 | Текст читается естественно |
| Entity presence | 1/10 | Бренд не существует в Knowledge Graph, Wikipedia, Wikidata |

**Общая GEO-готовность: 5/10**
- Техническая база сильная (SSR, Schema)
- Контентная слабость — нет реальных данных, нет entity, нет внешних упоминаний

---

## 9. СПЕЦИФИЧЕСКИЕ ПРОБЛЕМЫ

### 9.1 O-1 Readiness Support — тематическое противоречие
Услуга O-1 visa readiness не вписывается в позиционирование "B2B IT & Business Consulting для компаний 50-250 человек". Это B2C-услуга для индивидуальных заявителей. Она:
- Размывает фокус бренда
- Создаёт семантический шум для Google (IT consulting + immigration?)
- Может вызвать вопросы у E-E-A-T оценщиков

**Рекомендация:** Вынести на отдельный бренд/поддомен или как минимум на отдельную страницу с чётким разграничением.

### 9.2 Gmail как контактный email
`opsfieldsystems@gmail.com` — для B2B-консалтинга с ценами до $6,800 это серьёзный red flag. Нужен доменный email (info@opsfield-systems.com).

### 9.3 Количество текста
Страница содержит значительный объём текста (~3,000+ слов), но он распределён по UI-элементам (карточки, скрытые панели). Для Google это нормально (рендерит JS), но для LLM-ботов скрытый контент (hidden panels) может не извлекаться.

### 9.4 Skip Link
```html
<a href="#main-content" class="SkipLink-module...">Skip to main content</a>
```
✅ Accessibility — хорошо реализован.

### 9.5 Language Switcher без второго языка
Кнопка "EN" с language switcher присутствует, но видимо второго языка нет. Это:
- Вводит в заблуждение пользователей
- Создаёт ненужный hreflang
- Нужно либо убрать, либо добавить второй язык

---

## 10. СВОДНАЯ ТАБЛИЦА

| Критерий | Оценка | Приоритет |
|----------|--------|-----------|
| Meta Robots (noindex, nofollow) | 🔴 0/10 | P0 — БЛОКЕР |
| Canonical URL (vercel.app) | 🔴 3/10 | P0 |
| Title tag | 🟡 7/10 | P1 |
| Meta description | 🟢 8/10 | P2 |
| H1 | 🟡 6/10 | P1 |
| H2 структура | 🔴 4/10 | P1 |
| E-E-A-T общий | 🔴 4/10 | P1 |
| Schema.org | 🟢 8/10 | OK |
| FAQ | 🟢 7/10 | P2 |
| Изображения (alt, имена) | 🟡 5/10 | P2 |
| URL-структура (одностраничник) | 🔴 3/10 | P1 |
| GEO/LLM-готовность | 🟡 5/10 | P2 |
| Контактный email (Gmail) | 🔴 2/10 | P1 |
| SSR / рендеринг | 🟢 9/10 | OK |
| Open Graph / Twitter Cards | 🟢 8/10 | OK |

---

## 11. ТОП-10 ДЕЙСТВИЙ (по приоритету)

1. **Убрать `<meta name="robots" content="noindex, nofollow"/>`** — без этого всё остальное бессмысленно

2. **Купить домен и обновить canonical, hreflang, Schema URLs** — opsfield-systems.com или opsfield.com

3. **Поставить доменный email** вместо Gmail

4. **Переработать H2 заголовки** — внедрить целевые поисковые запросы:
   - "B2B Process & IT Diagnostic" вместо "From operating symptoms to a clear next step"
   - "CRM Audit & RevOps Consulting" вместо "What we do, with prices up front"

5. **Разбить одностраничник на подстраницы** — отдельная страница для каждого сервиса

6. **Добавить реальные имена, фото, bio** команды — критично для E-E-A-T

7. **Создать блог** с 3-5 экспертными статьями как стартовый контент для topical authority

8. **Добавить Person/Author Schema** для членов команды

9. **Расширить alt-тексты** изображений — особенно для ролей и сервисов

10. **Создать llms.txt** в корне сайта для AI-навигации

---

## 12. ПОЛОЖИТЕЛЬНЫЕ СТОРОНЫ (что сделано хорошо)

- ✅ **Next.js SSR** — контент полностью рендерится на сервере, видим ботам
- ✅ **Schema.org** — грамотная, многоуровневая разметка (Organization, Service, FAQ, HowTo)
- ✅ **FAQ** — 10 релевантных вопросов с развёрнутыми ответами
- ✅ **Open Graph + Twitter Cards** — полный набор
- ✅ **Accessibility** — skip link, aria-labels, semantic HTML
- ✅ **Pricing transparency** — цены открыты, что редкость в B2B consulting
- ✅ **Responsive images** — Next.js Image с blur placeholder, sizes, lazy loading
- ✅ **Чистый HTML** — минимальный inline-стиль шум, CSS модули
- ✅ **Font preloading** — два шрифта preloaded
- ✅ **Theme color** — задан для мобильных браузеров

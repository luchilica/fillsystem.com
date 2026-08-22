# 01. Техническое SEO

## 1.1. Vercel-домен полностью открыт для индексации

```
GET https://opsfield-systems.vercel.app/robots.txt
User-Agent: *
Allow: /
Disallow: /api/
Sitemap: https://www.fillsystem.com/sitemap.xml
```

- `<meta name="robots" content="index, follow">` на каждой странице.
- Заголовка `X-Robots-Tag: noindex` нет.
- Контент байт-в-байт совпадает с продакшном (`ETag` идентичен).
- От дубля защищает **только** `<link rel="canonical" href="https://www.fillsystem.com">`.

Canonical — подсказка, а не директива. Vercel-алиасы регулярно попадают в индекс через внешние ссылки (эта ссылка уже гуляет по чатам — что и доказывает данный аудит). Дальше — каннибализация всех 107 URL.

**Что делать:** в `middleware.ts` или `next.config.js` отдавать `X-Robots-Tag: noindex, nofollow` для любого `Host`, отличного от `www.fillsystem.com`, и отдавать `Disallow: /` в robots.txt для не-продакшн-хостов. 301 с vercel-алиаса на канонический домен — ещё лучше.

**Побочно:** имя проекта в URL — `opsfield-systems`, бренд — `Fill System`. Это остаток предыдущего нейминга, торчащий наружу. Переименовать проект в Vercel.

---

## 1.2. JSON-LD: локализованные страницы объявляют себя английскими

Главная, все 4 локали:

| Локаль | `<link rel=canonical>` | `WebPage.@id` в JSON-LD | `WebPage.url` |
|---|---|---|---|
| en-US | `https://www.fillsystem.com` | `https://www.fillsystem.com` | `https://www.fillsystem.com` |
| es | `https://www.fillsystem.com/es` | `https://www.fillsystem.com` ❌ | `https://www.fillsystem.com` ❌ |
| ru | `https://www.fillsystem.com/ru` | `https://www.fillsystem.com` ❌ | `https://www.fillsystem.com` ❌ |
| zh-Hans | `https://www.fillsystem.com/zh-hans` | `https://www.fillsystem.com` ❌ | `https://www.fillsystem.com` ❌ |

То же самое у статей. `/ru/blog/revops-audit-guide`:

```json
{
  "@type": "BlogPosting",
  "@id":  "https://www.fillsystem.com/blog/revops-audit-guide#article",
  "url":  "https://www.fillsystem.com/blog/revops-audit-guide",
  "mainEntityOfPage": { "@id": "https://www.fillsystem.com/blog/revops-audit-guide" }
}
```

Канонический URL страницы — `/ru/blog/revops-audit-guide`, а разметка утверждает, что это `/blog/revops-audit-guide`. Прямое противоречие между canonical и `mainEntityOfPage`.

Масштаб: 4 главные + 56 статей + 28 страниц услуг = **все не-английские страницы сайта** схлопываются в схеме на английские идентификаторы.

**Что делать:** генерировать `@id`/`url`/`mainEntityOfPage` из фактического пути с префиксом локали. Добавить `inLanguage` в `BlogPosting` (сейчас его нет ни на одной локали).

---

## 1.3. Хлебные крошки локализованных страниц ведут на английские URL

`/ru/blog/revops-audit-guide`, `BreadcrumbList`:

```json
["https://www.fillsystem.com", "https://www.fillsystem.com/blog", "https://www.fillsystem.com/blog/revops-audit-guide"]
```

Должно быть `/ru`, `/ru/blog`, `/ru/blog/...`.

---

## 1.4. Дублирующийся BreadcrumbList на каждой статье

На каждой странице статьи **два** блока `<script type="application/ld+json">` с `BreadcrumbList`. Второй сломан — у последнего элемента `"item": null`:

```json
[ "https://www.fillsystem.com", "https://www.fillsystem.com/blog", null ]
```

Скорее всего один рендерит layout, второй — компонент страницы. Убрать дубль, оставить один валидный.

---

## 1.5. Оборванные ссылки на сущности в схеме

На страницах статей и услуг:

```json
"publisher": { "@id": "https://www.fillsystem.com#organization" }
```

но узла `Organization` на этих страницах **нет** — он объявлен только на главной. Google разрешает `@id` только внутри одного графа страницы. Ссылка висит в пустоту → у статей фактически нет издателя.

Аналогично `author` в `BlogPosting` — это анонимный inline-`Person` без `@id`, не связанный с `#igor-saevets` из графа главной. Сущность «Игорь Саевец» раздроблена на 15 несвязанных копий.

**Что делать:** выносить `Organization` и `Person` в общий `@graph` на каждой странице (или во всех местах ссылаться через `@id` и продублировать узлы). Тогда автор, издатель и организация консолидируются в одну сущность в Knowledge Graph.

---

## 1.6. FAQPage потерян на локализованных главных

| Страница | Узлы в `@graph` |
|---|---|
| `/` | Organization, WebSite, WebPage, Service, HowTo, Person, **FAQPage** |
| `/es`, `/ru`, `/zh-hans` | Organization, WebSite, WebPage, Service, HowTo, Person — **FAQPage нет** |

Контент FAQ на этих страницах есть (14 вопросов, переведены), разметки нет. Потеря шанса на FAQ-выдачу и на цитирование в AI-ответах для трёх локалей.

---

## 1.7. Цены в схеме не совпадают с ценами на экране

Подробный разбор — в `05-conversion-trust.md`, здесь только SEO-последствие. `Service.offers` на главной:

| Услуга | `minPrice` в JSON-LD | Видно на главной | Видно на `/services` |
|---|---|---|---|
| Extended Diagnostic | 1400 | **$1,700** | $1,400 |
| Add-on Tool Build | 1100 | **$1,300** | $1,100 |
| IT Risk & Security | 2100 | **$2,500** | $2,100 |
| Process & Operations | 3700 | **$4,400** | $3,700 |
| AI & Process Automation | 4100 | **$4,900** | $4,100 |
| RevOps | 5100 | **$6,100** | $5,100 |

Расхождение структурированных данных с видимым контентом — прямое нарушение [Structured Data General Guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies). Риск: снятие rich-результатов, в тяжёлом случае — manual action.

Отдельно: у RevOps на главной даже заявленный диапазон `Estimate: $5,200–$7,000` **не включает** $5,100 из схемы.

---

## 1.8. `/About` отдаёт 200 — дубль по регистру

```
GET /About  → 200, полный контент, canonical=/about, robots=index,follow
GET /about/ → 308 → /about   ✅
GET /en-US  → 307 → /         ✅
GET /zh-Hans → 307 → /zh-hans ✅
```

Слэш и локали обработаны, регистр — нет. `/About`, `/SERVICES`, `/Blog` и т.д. отдают полный дубль со статусом 200. Спасает только canonical.

**Что делать:** middleware, 301 на lowercase.

---

## 1.9. Sitemap: пропуски и мусор

- **107 URL**, но локализованные юридические страницы отсутствуют. `/privacy-policy`, `/terms-of-use`, `/cookie-policy` есть только в EN — при этом `/ru/privacy-policy` физически существует и отдаёт 200. Три страницы × 3 локали = 9 индексируемых URL вне sitemap.
- `priority: 1` одновременно у `/`, `/es`, `/ru`, `/zh-hans` — приоритет по определению относительный, четыре единицы = ноль информации. Поле игнорируется Google, но выдаёт машинную генерацию.
- `changefreq: monthly` у всего, включая блог. Тоже игнорируется.
- `lastmod` у всех 107 URL одинаковый — `2026-08-17T20:14:02.522Z`, т.е. дата билда, а не дата изменения контента. Google явно предупреждает, что такой `lastmod` он перестаёт учитывать.

**Что делать:** `lastmod` брать из фронтматтера/CMS по каждой странице; убрать `priority` и `changefreq`; добавить локализованные юридические страницы.

---

## 1.10. Директивы для сниппетов не выставлены

Везде только:

```html
<meta name="robots" content="index, follow">
```

Отсутствуют `max-image-preview:large`, `max-snippet:-1`, `max-video-preview:-1`. Без `max-image-preview:large`:
- превью в выдаче ограничено маленькой иконкой,
- страницы **неприемлемы для Google Discover**,
- меньше площадь сниппета в AI Overviews.

Для сайта, который делает ставку на длинные экспертные материалы, это бесплатная потеря.

---

## 1.11. Один OG-образ на весь сайт

Все проверенные страницы (главная, `/about`, `/services`, `/blog`, `/o1-visa-readiness`, все статьи) отдают:

```html
<meta property="og:image" content="https://www.fillsystem.com/opengraph-image">
```

Один и тот же динамический PNG на 228 KB. При этом у статей **есть** индивидуальные картинки — они прописаны в `BlogPosting.image` (`/blog/revops-audit.jpg` и др.), но в Open Graph не попадают. Любой шер статьи в LinkedIn (главный канал для этого ICP) показывает обезличенную карточку.

Также отсутствуют: `article:author`, `article:modified_time`, `article:section`, `article:tag`; `og:image:alt` есть только на главной.

---

## 1.12. Нет разметки для листингов

- `/blog` — только `BreadcrumbList`. Нет `Blog`/`CollectionPage`, нет `ItemList` со статьями.
- `/about` — только `BreadcrumbList` + `Person`. Нет `AboutPage`, нет `Organization`.
- `/services/business-diagnostic` — нет `WebPage` (есть у остальных шести страниц услуг).

---

## 1.13. Отсутствующие страницы

| Что | Статус |
|---|---|
| `/contact` | **404.** Ссылка «Contact» в футере ведёт на якорь `/#diagnostic-request-form` |
| Страница кейсов | Не существует. «Results» — якорь `/#proof-examples` |
| Страницы авторов | Не существуют |
| Категории/теги блога | Не существуют |
| Страница «Extended Diagnostic» | Не существует. Кнопка «View full details» у этой карточки ведёт на `/services/business-diagnostic` — ту же страницу, что и у «Primary Diagnostic» |

Отсутствие индексируемой страницы кейсов означает, что по запросам вида «revops case study b2b», «crm cleanup case study» сайт не может ранжироваться в принципе. Отсутствие `/contact` — потеря классического навигационного и локального запроса плюс отсутствие NAP-страницы.

---

## 1.14. Верификация: Яндекс есть, Google нет

```html
<meta name="yandex-verification" content="8a581bfcb092f491">
```

Мета-тега `google-site-verification` нет (возможно, верификация через DNS — по HTML не проверить). Но сам факт: у калифорнийской B2B-компании с `areaServed: United States` первым делом подключён Яндекс. Либо это остаток от другого проекта, либо реальный целевой рынок отличается от заявленного.

---

## 1.15. Что сделано правильно (не трогать)

- Один `<h1>` на каждой странице, корректная иерархия H2/H3, без пропусков уровней.
- `alt` заполнен у всех 13 изображений главной, осмысленно, без keyword stuffing.
- `hreflang` есть и в HTML, и в HTTP-заголовке `Link`, и в sitemap (правда, в трёх разных вариантах — см. `02-i18n-geo.md`).
- `x-default` присутствует и указывает на английскую версию.
- 404 отдаёт настоящий 404.
- Trailing slash и регистр локали нормализуются 307/308.
- Автоматического редиректа по `Accept-Language` **нет** — это правильно (проверено с `Accept-Language: ru-RU` и `zh-CN`, оба вернули 200 английской версии). Куки `NEXT_LOCALE` ставится, но не редиректит.
- `llms.txt` есть (редкость).
- HSTS с `preload`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` с отключёнными камерой/микрофоном/геолокацией.

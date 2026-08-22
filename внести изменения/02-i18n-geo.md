# 02. Локализация, hreflang и гео

## 2.1. Три несовместимых набора языковых кодов одновременно

Сайт отдаёт hreflang **тремя** способами, и все три различаются.

**A. HTTP-заголовок `Link`:**
```
<https://opsfield-systems.vercel.app/>;          rel="alternate"; hreflang="en-US"
<https://opsfield-systems.vercel.app/es>;        rel="alternate"; hreflang="es-US"
<https://opsfield-systems.vercel.app/ru>;        rel="alternate"; hreflang="ru-US"
<https://opsfield-systems.vercel.app/zh-hans>;   rel="alternate"; hreflang="zh-Hans"
```

**B. HTML `<link rel="alternate">`:**
```html
<link rel="alternate" hrefLang="en-US"   href="https://www.fillsystem.com" />
<link rel="alternate" hrefLang="es"      href="https://www.fillsystem.com/es" />
<link rel="alternate" hrefLang="ru"      href="https://www.fillsystem.com/ru" />
<link rel="alternate" hrefLang="zh-Hans" href="https://www.fillsystem.com/zh-hans" />
```

**C. `og:locale` в мета-тегах:**

| Страница | `og:locale` |
|---|---|
| `/` | `en_US` |
| `/es` | `es_US` |
| `/ru` | **`ru_RU`** |
| `/zh-hans` | **`zh_CN`** |

Итого для русской версии заявлено одновременно: `ru-US` (заголовок), `ru` (HTML), `ru_RU` (Open Graph). Для китайской: `zh-Hans`, `zh-Hans`, `zh_CN`.

**Корень проблемы найден в бандле.** Внутренние коды локалей — `"es-US"`, `"ru-US"`, `"zh-Hans"`:
```js
let A = { "en-US":"en-US", "es-US":"en-US", "ru-US":"ru-RU", "zh-Hans":"zh-CN" };
```
HTTP-заголовок `Link` генерируется из внутренних кодов напрямую, HTML-теги — из обрезанной версии, Open Graph — из третьего маппинга. Три генератора, один источник, три результата.

`ru-US` и `es-US` — синтаксически валидные, но семантически абсурдные комбинации: «русский язык, регион США», «испанский, регион США». Второй ещё имеет смысл (US Hispanic), первый — нет.

**Что делать:** выбрать одну схему и прогнать её через все три канала. Рекомендация: `en`, `es`, `ru`, `zh-Hans` + `x-default` → `en`. Региональные подкоды (`-US`) убрать: они сужают таргетинг без выгоды, а `ru-US` — вообще ошибочный сигнал.

---

## 2.2. Непереведённые строки в интерфейсе

Проверено программно (строки без кириллицы/иероглифов в русской и китайской версиях).

**В `/ru` и `/zh-hans` остались на английском:**

| Строка | Где |
|---|---|
| `About` | Пункт главного меню — в шапке, в мобильном меню и в футере (3 места на странице) |
| `B2B Development Services & Pricing` | **H2 блока прайсинга** — заголовок второго уровня главного экрана продаж |

В `/es` — те же два дефекта (`About`, `B2B Development Services & Pricing`).

То есть на всех трёх неанглийских версиях главный коммерческий заголовок страницы не переведён, и пункт меню «О компании» — тоже. Это первое, что видит носитель языка, и первое, что сообщает ему «переводили не глядя».

Названия инструментов (HubSpot, Salesforce, Notion, Zapier), имена людей и `Fill System` не переведены — это правильно, не считается дефектом.

Дополнительно: строка honeypot-поля `Leave this field blank` не переводится (не критично, скрыта), и подпись `© 2026 Fill System. California, USA.` остаётся английской во всех локалях (спорно, но допустимо).

---

## 2.3. Китайская версия рендерится системным шрифтом

Все четыре локали подгружают одинаковые два шрифта:

```
/_next/static/media/051742360c26797e-s.p...woff2   (~30 KB)
/_next/static/media/fed68dff3ca987ed-s.p...woff2   (~30 KB)
```

Это **Mulish** (основной) и **JetBrains Mono** (акцентный). Ни в одном из них нет CJK-глифов. Следовательно **100 % китайского текста на `/zh-hans` отрисовывается системным fallback-шрифтом** — на Windows это Microsoft YaHei, на macOS PingFang, на Android Noto Sans CJK. Три разных начертания, ни одно не совпадает с дизайном.

При этом 60 KB латинско-кириллических шрифтов китайскому посетителю всё равно грузятся (и предзагружаются через `<link rel="preload">`).

**Что делать:** либо подключить CJK-шрифт (Noto Sans SC, сабсет), либо честно задать для `zh-Hans` системный стек и убрать `preload` неиспользуемых woff2.

---

## 2.4. Кому вообще адресованы 4 локали

Заявленный ICP и география в разметке:

```json
"areaServed": { "@type": "Country", "name": "United States" },
"address":    { "addressRegion": "CA", "addressCountry": "US" }
```

FAQ: «On-site work in California is available when the scope requires it».

При этом сайт публикует полный B2B-контент на русском и китайском с `og:locale = ru_RU` и `zh_CN` — то есть сигналит Россию и материковый Китай. Компания, обслуживающая только США, продвигает свои услуги по операционному консалтингу в двух странах, где она не работает.

Единственное разумное объяснение: локали существуют ради **O-1 Visa Readiness** — услуги для русско- и китайскоязычных IT-специалистов, переезжающих в США. Но тогда:

- переводить надо было O-1-страницу и блог про иммиграцию, а не 14 статей про RevOps и MCP/A2A;
- 84 из 107 URL в sitemap — машинный перевод B2B-контента для аудитории, которая его не купит;
- `areaServed: United States` конфликтует с `og:locale: ru_RU` — противоречивый сигнал о географии для Google.

**Что делать (решение продуктовое, не техническое):**
1. Либо схлопнуть до `en` + `es` (US Hispanic — реальный рынок в Калифорнии), а `ru`/`zh` оставить **только** для `/o1-visa-readiness` и связанных материалов.
2. Либо оставить 4 локали, но признать, что это два разных продукта, и развести их: B2B-консалтинг на `en`/`es`, O-1 на `ru`/`zh`, с разными `areaServed`.

Промежуточный вариант — оставить как есть — означает 84 URL машинного перевода с анонимными авторами. Это ровно тот профиль, который Google описывает в политике [Scaled Content Abuse](https://developers.google.com/search/docs/essentials/spam-policies#scaled-content-abuse).

---

## 2.5. Локальное SEO: не сделано ничего

| Сигнал | Статус |
|---|---|
| `LocalBusiness` / `ProfessionalService` schema | ❌ только `Organization` |
| `streetAddress` | ❌ есть только `addressRegion: CA` |
| `addressLocality` (город) | ❌ |
| `postalCode` | ❌ |
| `telephone` | ❌ на сайте нет телефона ни в каком виде |
| Google Business Profile | ❌ признаков нет |
| NAP-блок на странице | ❌ есть только `hello@fillsystem.com` и строка «California, USA» в футере |
| Страница `/contact` | ❌ 404 |
| `geo` / `hasMap` | ❌ |
| Локальные посадочные («IT consulting San Francisco / Bay Area») | ❌ |
| Отзывы / `AggregateRating` | ❌ |

«California, USA» — это не гео-таргетинг, это 39 млн человек и 424 000 км². По любому локальному запросу («operations consultant near me», «revops consultant bay area», «IT audit San Jose») сайт не участвует.

Для консалтинга с ценником $5–12K и опцией выезда on-site локальное присутствие — не украшение, а канал. Минимум:
- определиться с городом (Сан-Франциско / Сан-Хосе / Лос-Анджелес);
- завести Google Business Profile (service-area business, без публикации адреса — это допустимо);
- добавить `ProfessionalService` со `addressLocality`, `telephone`, `areaServed` списком городов/округов;
- сделать страницу `/contact` с NAP, часовым поясом и способами связи.

---

## 2.6. `disambiguatingDescription` — правильный ход

```json
"disambiguatingDescription": "B2B IT and operations consulting firm based in California, USA.
 Not affiliated with fillsystems.it (Italy) or Fill System HVAC (South Korea)."
```

Это грамотно: бренд «Fill System» конфликтует с двумя существующими компаниями, и разметка это явно разводит. Оставить.

Но: `sameAs` у `Organization` содержит **одну** ссылку — личный LinkedIn основателя. Нет корпоративного LinkedIn, Crunchbase, Clutch, G2, X, GitHub. Для разрешения сущности в Knowledge Graph одной ссылки на личный профиль недостаточно — Google не сможет отделить организацию от человека.

---

## 2.7. Валюта и формат чисел в локалях

В бандле:
```js
function m(e, a) { return `$${new Intl.NumberFormat(A[e] ?? "en-US").format(a)}` }
```

Символ `$` захардкожен. Русская версия показывает `от $6,100`, испанская — `desde $6,100`, китайская — `$6,100 起`. Форматирование чисел берётся по маппингу, причём `es-US` → `en-US`, то есть испаноязычный посетитель видит англо-американский формат разделителей.

Само по себе не ошибка (цены действительно в USD), но:
- нигде не написано «USD» — `$` в испаноязычном контексте читается как песо (MXN/ARS/CLP);
- для китайской версии нет ни примечания о валюте, ни курса.

**Что делать:** заменить `$` на `US$` или добавить явное `USD` рядом с ценой для не-en локалей.

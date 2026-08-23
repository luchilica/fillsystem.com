# TODO — fillsystem.com

Без общих фраз. Каждый пункт — конкретное действие с адресом.

---

## P0 — сегодня

1. **Убрать расхождение цен.** Завести один источник (`services.json`) и прокинуть в: главную, `/services`, 7 страниц услуг, `Service.offers` в JSON-LD, `/llms.txt`. Сейчас RevOps стоит `$6,100` на главной и `$5,100` на `/services` и `/services/revops-crm-consulting`.
2. **Решить, какая цена базовая.** Рекомендация: база = цена для 50 сотрудников (низ ICP), а не для 25.
3. **Поправить `/llms.txt`** — там `from $1,400 / $1,100 / $2,100 / $3,700 / $4,100 / $5,100`. Это то, что ChatGPT и Perplexity сейчас называют пользователям.
4. **Заглушить vercel-домен.** В `middleware.ts`: `X-Robots-Tag: noindex, nofollow` для любого Host ≠ `www.fillsystem.com`, и `Disallow: /` в robots.txt для не-прод хостов.
5. **Включить аналитику.** Задать `NEXT_PUBLIC_GA4_MEASUREMENT_ID`, переключить `ANALYTICS_ENABLED` с `false` на `true`. Сейчас баннер согласия работает, а трекинга нет вообще — ни GA4, ни GTM, ни Vercel Analytics, ни Clarity.
6. **Убрать «MVP» из Privacy Policy и Cookie Policy** — 7 вхождений, включая «must remain disabled for the MVP» и «The MVP configuration must not send…».

---

## P1 — эта неделя

### Авторы и E-E-A-T

7. Переподписать 8 статей с `Solutions Architect` (5 шт.) и `AI & Data Lead` (3 шт.) — на реальных людей с фото/LinkedIn, либо на Igor Saevets, либо на `Organization`.
8. Исправить `BlogPosting.author`: сейчас `{"name":"Solutions Architect","jobTitle":"Fill System"}` — имя и должность переставлены.
9. Добавить `@id` в `author` и связать с `https://www.fillsystem.com#igor-saevets`. Сейчас 15 несвязанных копий одного человека.
10. Добавить фото Igor Saevets на `/about` и в блок «Delivery Model» на главной. Сейчас везде кружок с буквами «IS».

### Structured data

11. Исправить `WebPage.@id` и `url` на `/es`, `/ru`, `/zh-hans` — сейчас все три объявляют себя `https://www.fillsystem.com`.
12. То же для 56 локализованных статей: `BlogPosting.@id` / `url` / `mainEntityOfPage` указывают на EN-URL.
13. Исправить `BreadcrumbList` на локализованных страницах — ведёт на `/`, `/blog` вместо `/ru`, `/ru/blog`.
14. Убрать дублирующийся `BreadcrumbList` на статьях (второй сломан: `"item": null`).
15. Добавить узел `Organization` на страницы статей и услуг — сейчас `"publisher": {"@id": "...#organization"}` ссылается на несуществующий на этой странице узел.
16. Добавить `FAQPage` на `/ru`, `/es`, `/zh-hans` — контент FAQ есть, разметки нет.
17. Добавить `inLanguage` в `BlogPosting` (отсутствует на всех локалях).

### Метатеги

18. Заменить `<meta name="robots" content="index, follow">` на `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1` на всех страницах.
19. Прокинуть `og:image` из `BlogPosting.image` — сейчас все 100+ страниц отдают один `/opengraph-image`.
20. Добавить `article:author`, `article:modified_time`, `article:tag` на статьи; `og:image:alt` — везде (сейчас только на главной).

### hreflang

21. Свести три схемы к одной. Сейчас: HTTP `Link` → `es-US`/`ru-US`/`zh-Hans`; HTML `<link>` → `es`/`ru`/`zh-Hans`; `og:locale` → `es_US`/`ru_RU`/`zh_CN`. Целевая: `en`, `es`, `ru`, `zh-Hans`, `x-default`→`en`. Убрать `ru-US`.

### Переводы

22. Перевести `About` в меню (шапка + мобильное меню + футер) на `/ru`, `/es`, `/zh-hans`.
23. Перевести H2 `B2B Development Services & Pricing` на `/ru`, `/es`, `/zh-hans` — это заголовок блока прайсинга.

### Битое

24. Создать `/services/extended-diagnostic`. Сейчас кнопка «View full details» у карточки за $1,700 ведёт на `/services/business-diagnostic` — страницу бесплатной услуги.
25. Создать `/contact` — сейчас 404, ссылка в футере ведёт на якорь `#diagnostic-request-form`.
26. Middleware: 301 с `/About`, `/Services` и т.п. на lowercase. Сейчас `/About` отдаёт 200 с полным дублем.

---

## P2 — 2–4 недели

### Производительность

27. Разнести словари локалей по чанкам. Чанк `10r-frwl-wwi3.js` — 860 KB, из них 204 281 кириллический символ (~400 KB) грузится на английской главной.
28. Убрать тела переведённых статей из клиентского бандла — они нужны только на SSR.
29. Добавить `priority` на `next/image` для героя `/photos/problem.jpg`. Сейчас единственный `fetchPriority` в HTML — `low` у скрипта.
30. Пережать исходники в `/photos/` и `/services/` (сейчас JPEG по 200–212 KB), `quality` 75 → 65 для декоративных.
31. Отключить legacy-полифилл `noModule` (−113 KB несжато), если матрица браузеров позволяет.
32. Подключить CJK-шрифт для `/zh-hans` или убрать `preload` Mulish/JetBrains Mono на этой локали — сейчас 100 % китайского текста рендерится системным fallback.

### Безопасность

33. Добавить `Content-Security-Policy` — сейчас его нет вообще. Сделать **до** подключения GA4.
34. Ограничить `Access-Control-Allow-Origin: *` только `/api/` или убрать.
35. Поставить Cloudflare Turnstile на форму — сейчас защита только honeypot.

### Юридическое

36. Добавить блок GDPR/UK GDPR: правовое основание, права по ст. 15–22, механизм трансграничной передачи, контакт.
37. Убрать условность «If the CCPA and CPRA apply to Fill System» — определить и написать однозначно.
38. Заменить DSAR-канал: сейчас «заполните лид-форму и начните поле Main Challenge со слов Privacy Request». Оставить только `privacy@fillsystem.com`.
39. Указать юрлицо (LLC/Inc.) и регистрационный адрес в футере и в Privacy Policy.
40. Добавить в Cookie Policy таблицу куки: `NEXT_LOCALE`, запись согласия в localStorage, GA4-куки после включения.
41. Обновить «Last updated» (сейчас 13 июня 2026 при последней публикации 29 июля).
42. Добавить `/ru|/es|/zh-hans` версии `privacy-policy`, `terms-of-use`, `cookie-policy` в sitemap — они существуют и отдают 200, но в sitemap их нет.

### Sitemap

43. Заменить `lastmod` (сейчас у всех 107 URL одинаковый `2026-08-17T20:14:02.522Z` — дата билда) на реальные даты изменения.
44. Удалить `priority` и `changefreq` — четыре URL с `priority: 1` не несут информации.

### Доверие

45. Перенести дисклеймер «Illustrative scenario — not a specific client engagement» **внутрь каждой** из трёх карточек кейсов, тем же кеглем, над цифрами. Сейчас одна строка мелким шрифтом под всей секцией, а цифры точные ($180K, $320K, 60 %).
46. Переименовать пункт меню «Results» → «Scenarios».
47. Создать `/case-studies` с отдельным URL на каждый кейс. Сейчас это якорь `/#proof-examples` — на него нельзя сослаться.
48. Добавить корпоративный LinkedIn, Crunchbase, Clutch в `Organization.sameAs`. Сейчас там одна ссылка — личный LinkedIn.
49. Добавить телефон или явно написать «email-only, ответ в течение N часов».
50. Получить и разместить статус HubSpot/Salesforce Partner, если он есть — услуги строятся вокруг этих платформ, подтверждения нет.

### Форма и конверсия

51. Сделать поле «What's your biggest operational challenge right now?» необязательным или сократить до 200 символов.
52. Добавить Calendly/Cal.com как альтернативный путь для бесплатного 30–45-минутного созвона. Сейчас планировщика нет вообще: форма → ожидание → переписка о времени.
53. Добавить второй CTA — PDF с примером отчёта диагностики. Материалы уже перечислены в блоке «Before You Commit» («Diagnostic question framework», «Priority matrix structure», «Example deliverables»), но их нельзя ни увидеть, ни скачать.
54. Свести три шкалы размера команды к одной. Сейчас: слайдер 25–100, ICP 50–250, чипы формы 1-10…200+.
55. Сдвинуть слайдер цен в 50–250, дефолт 100.

---

## P3 — стратегические решения

56. ~~**Развести O-1 и B2B.** Минимум — убрать из прайса на главной, из `Service.offers`, из чипов формы.~~ ✅ Минимум сделан (c3ac9c5): O-1 убран из прайса, JSON-LD offers, чипов формы, /services, llms.txt. Страница `/o1-visa-readiness` — standalone. **Открыто:** поддомен или полное разделение — стратегическое решение.
57. **Показать формулировки O-1 иммиграционному адвокату** — «identify which 3+ criteria are strongest» и «We help create the missing pieces: publication strategy, speaking engagements».
58. ~~**Перенести AI-серию блога в /resources/.**~~ ✅ 6 AI-статей перенесены (907876f): новый маршрут /resources/, listing page, 301 редиректы, basePath в BlogPostLayout, sitemap/llms.txt обновлены.
59. ~~**Решить судьбу локалей.**~~ ✅ zh-Hans удалён полностью (a379982). ru: основные страницы индексируются, блог ru — noindex + исключён из sitemap. Сайт: 3 локали (en/es/ru).
60. ~~**Добавить первичные данные в ICP-статей.**~~ ✅ Агрегатные паттерны добавлены в 8 ICP-статей: «in most CRM environments we review», «across our security reviews» и т.д. (a379982).
61. ~~**Привести регистр H2 к одному стилю.**~~ ✅ Уже sentence case во всех 14 статьях — аудит фиксировал состояние до правки.
62. ~~**Убрать `Need help with this?`**~~ ✅ Заменено на 14 уникальных CTA по теме статьи (c3ac9c5).
63. ~~**Переписать перелинковку вручную.**~~ ✅ 28 новых inline-ссылок (26 blog→blog + 2 на underlinked сервисы). Количество варьируется 1-4 на статью. advisory-power-hour и addon-tool-build теперь имеют входящие ссылки (935bce0).
64. **Добавить категории и теги на `/blog`** и сделать `revops-audit-guide` (3 306 слов) pillar-страницей с кластером.
65. ~~**Расширить `/about`** и `/services`.~~ ✅ /about: 250→600 слов (история, методология, ICP). /services: 200→450 слов (контекст цен, «What to expect»). ProfessionalService + knowsAbout в schema (935bce0).
66. ~~**Локальное SEO:**~~ ✅ частично. ProfessionalService + knowsAbout добавлены в Organization schema. **Открыто:** GBP (внешнее действие), конкретный город, телефон.
67. ~~**Добавить в `/llms.txt`** секции «Not a fit for», «What we don't do», «No ROI guarantees — why», дату обновления, локализованные URL.~~ ✅ Всё присутствует. Дополнительно убраны фантомные `/case-studies` и `/contact` (404).
68. ~~**Проставить реальные `dateModified`**~~ ✅ Добавлено поле `dateModified` в blogData.ts, прокинуто в JSON-LD и OG (c3ac9c5).
69. **Переименовать проект в Vercel** — `opsfield-systems` торчит в публичном URL при бренде «Fill System».
70. ~~**Прогнать Lighthouse + axe DevTools вручную**~~ ✅ Lighthouse: a11y 94, SEO 100, best-practices 100. Найдено и исправлено: контраст `.tabNum`/`.respLabel` (stone-400→500), подчёркивание ссылки Privacy Policy (13ebfe8).

---

## Не трогать — сделано правильно

- Иерархия заголовков, по одному H1, `alt` у всех изображений.
- Семантика формы: `label for`, `autocomplete`, `role="group"`, `aria-labelledby`, `aria-pressed`, honeypot в `aria-hidden`, `aria-describedby` у счётчика.
- `prefers-reduced-motion` обработан.
- HSTS preload, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`.
- Нет автоматического редиректа по `Accept-Language`.
- 404 отдаёт 404; trailing slash и регистр локали нормализуются 307/308.
- `robots.txt` явно пускает GPTBot / ClaudeBot / PerplexityBot / Applebot-Extended.
- `llms.txt` существует и структурирован грамотно (кроме цен).
- `disambiguatingDescription` разводит бренд с fillsystems.it и Fill System HVAC.
- `FAQPage` на всех 7 страницах услуг.
- Внешние ссылки с `rel="noopener noreferrer"`.

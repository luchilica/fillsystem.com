# Domain Launch Plan — Opsfield Systems

> What to do after buying a domain. Ordered by dependency chain — each phase unlocks the next.

## Current state (2026-07-28)

- Site live at `opsfield-systems.vercel.app` (functional, all content/SEO done)
- No custom domain, no professional email
- `SITE_URL` resolved from `VERCEL_URL` env var (produces vercel.app URLs)
- `metadataBase` set to `siteConfig.url` — works but triggers Next.js warnings
- OG share cards render but point to vercel.app domain
- GA4 wired but OFF (`ANALYTICS_ENABLED = false`, no measurement ID)
- Cookie consent UI live, captures choice (ready for analytics activation)
- Contact email: `opsfieldsystems@gmail.com`
- Resend API handles form submissions (no custom domain configured)

---

## Phase 0: Domain purchase

### Which domain?

Legal pages and existing references use `opsfieldsystems.com`. Buying this exact domain avoids updating Terms of Use, Privacy Policy, and cookie text.

**Alternative TLDs to consider:**
| Domain | Pros | Cons |
|--------|------|------|
| `opsfieldsystems.com` | Matches existing legal text, professional | Generic TLD |
| `opsfield.systems` | Short, memorable, semantic TLD | Non-standard, some corporate firewalls block |
| `opsfield.io` | Tech-credible, short | Overused in tech, .io has sovereignty issues |
| `opsfield.consulting` | Exact industry match | Long, unfamiliar TLD |

**Recommendation:** `opsfieldsystems.com` as primary. Optionally buy `opsfield.systems` and redirect.

### Registrar choice

| Registrar | Annual cost (.com) | WHOIS privacy | Notes |
|-----------|-------------------|---------------|-------|
| Cloudflare Registrar | ~$10 (at-cost) | Free | Best price, no markup, auto-renew |
| Porkbun | ~$10 | Free | Clean UI, good support |
| Namecheap | ~$13 | Free first year | Popular, reliable |

**Grey option:** Cloudflare Registrar is at-cost (no profit margin), saves $3-5/year vs others. Use Cloudflare for both registration AND DNS — fastest propagation, free WAF/DDoS, analytics.

### Brand protection (optional)

Buy 2-3 adjacent domains to prevent squatters/competitors:
- Primary: `opsfieldsystems.com`
- Alt 1: `opsfield.systems` → 301 redirect
- Alt 2: `opsfield.io` → 301 redirect

Total: ~$30/year for all three via Cloudflare.

---

## Phase 1: DNS + Vercel (day 1)

### 1.1 Add domain to Vercel

```
Vercel Dashboard → Project → Settings → Domains → Add "opsfieldsystems.com"
```

Vercel provides:
- A record: `76.76.21.21`
- CNAME for `www`: `cname.vercel-dns.com`

### 1.2 Configure DNS records

At the registrar/Cloudflare DNS:

| Type | Name | Value | Proxy |
|------|------|-------|-------|
| A | @ | 76.76.21.21 | DNS only (if Cloudflare) |
| CNAME | www | cname.vercel-dns.com | DNS only |

**Note:** If using Cloudflare, set proxy to "DNS only" (grey cloud) for Vercel — orange cloud (proxied) causes SSL conflicts. Exception: if you specifically want Cloudflare WAF/caching, use Full (Strict) SSL mode.

### 1.3 SSL

Vercel auto-provisions Let's Encrypt certificates. No action needed — just wait 5-10 minutes after DNS propagation.

### 1.4 Redirect old URLs

Vercel automatically redirects `opsfield-systems.vercel.app` → custom domain. Verify this works after setup.

**Hidden factor:** Any existing backlinks to vercel.app URLs will follow the redirect. But Google treats 301s as ~90% link equity transfer. The sooner you switch, the less equity you lose.

---

## Phase 2: Environment variables (day 1)

### 2.1 Vercel environment variables

Set in Vercel Dashboard → Project → Settings → Environment Variables:

| Variable | Value | Scope |
|----------|-------|-------|
| `SITE_URL` | `https://opsfieldsystems.com` | Production |
| `SITE_MODE` | `production` | Production |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Production |

### 2.2 Code change: flip analytics

File: `lib/consent.ts` line 17

```ts
// Before:
export const ANALYTICS_ENABLED = false;

// After:
export const ANALYTICS_ENABLED = process.env.SITE_MODE === "production";
```

This activates GA4 only in production with the real domain.

---

## Phase 3: Email setup (day 1-2)

### Option A: Google Workspace ($6/user/month) — recommended

Professional, full Gmail/Calendar/Drive. Best deliverability.

1. Sign up at workspace.google.com with `opsfieldsystems.com`
2. Add MX records to DNS:

| Priority | Value |
|----------|-------|
| 1 | ASPMX.L.GOOGLE.COM |
| 5 | ALT1.ASPMX.L.GOOGLE.COM |
| 5 | ALT2.ASPMX.L.GOOGLE.COM |
| 10 | ALT3.ASPMX.L.GOOGLE.COM |
| 10 | ALT4.ASPMX.L.GOOGLE.COM |

3. Create mailboxes: `igor@`, `privacy@`, `hello@`
4. Set up SPF, DKIM, DMARC (see Phase 4)

### Option B: Zero-cost professional email — grey option

If budget is tight for MVP:

1. **Receive:** Cloudflare Email Routing (free) — forward `*@opsfieldsystems.com` → `opsfieldsystems@gmail.com`
2. **Send:** Gmail "Send mail as" with SMTP relay — appears as `igor@opsfieldsystems.com` in recipient's inbox
3. Use ImprovMX (free tier) or Resend's SMTP if Cloudflare routing doesn't support your flow

**Pros:** $0/month, works immediately
**Cons:** Less reliable deliverability, Gmail shows "via gmail.com" in some clients, no Calendar/Drive integration

### Option C: Zoho Mail (free for 5 users)

Middle ground — professional UI, custom domain, free tier.

### After email setup:

Update Footer.tsx:
```
opsfieldsystems@gmail.com → hello@opsfieldsystems.com (or igor@)
```

---

## Phase 4: Email deliverability (day 2)

**This is the step most people skip and then wonder why form submissions land in spam.**

### 4.1 SPF record

DNS TXT record at `@`:

For Google Workspace:
```
v=spf1 include:_spf.google.com include:amazonses.com ~all
```

The `amazonses.com` is for Resend (which uses AWS SES). Check Resend docs for current SPF include.

### 4.2 DKIM

- Google Workspace: Admin Console → Apps → Gmail → Authenticate email → Generate DKIM key → Add TXT record
- Resend: Dashboard → Domains → Add domain → Follow DNS instructions

### 4.3 DMARC

DNS TXT record at `_dmarc`:
```
v=DMARC1; p=quarantine; rua=mailto:dmarc@opsfieldsystems.com; pct=100
```

Start with `p=none` (monitor only) for 2 weeks, then switch to `p=quarantine`.

### 4.4 Resend custom domain

Currently Resend sends from a generic address. After domain purchase:

1. Resend Dashboard → Domains → Add `opsfieldsystems.com`
2. Add the DNS records Resend provides (SPF, DKIM, MX for bounce handling)
3. Update the `from` address in the API call to `noreply@opsfieldsystems.com`

**File:** `app/api/submit/route.ts` — update the `from` field.

### 4.5 Email warmup (hidden factor)

New domains have zero sending reputation. If you immediately blast emails:
- Gmail/Outlook may throttle or spam-folder them
- Form submission confirmations may not arrive

**Mitigation:** Send 5-10 real emails/day for the first 2 weeks. Reply to them. This builds sender reputation organically.

---

## Phase 5: OG share cards & metadata (day 1)

### 5.1 metadataBase

Already set to `siteConfig.url` in `app/[locale]/layout.tsx:45`. Once `SITE_URL` env var is set, this resolves correctly. No code change needed.

### 5.2 OG image URLs

Currently wired in layout.tsx with explicit og:image. Once SITE_URL is correct, these resolve to `https://opsfieldsystems.com/opengraph-image` automatically.

### 5.3 Verify share cards

After deploy, test with:
- https://cards-dev.twitter.com/validator (Twitter/X)
- https://developers.facebook.com/tools/debug/ (Facebook/LinkedIn)
- Paste URL in Telegram chat to yourself

**Hidden factor:** Social platforms aggressively cache OG images. After changing the domain, you may need to "re-scrape" each URL in the debugger tools to clear old cache.

---

## Phase 6: Google Search Console (day 2-3)

### 6.1 Verify domain ownership

1. Go to search.google.com/search-console
2. Add property → Domain → `opsfieldsystems.com`
3. Verify via DNS TXT record:
   ```
   google-site-verification=XXXXXXXXXXXX
   ```

### 6.2 Submit sitemap

```
https://opsfieldsystems.com/sitemap.xml
```

The sitemap is auto-generated by Next.js and includes all pages + locales.

### 6.3 Request indexing

Use URL Inspection tool to request indexing for key pages immediately:
- `/` (homepage)
- `/services`
- `/about`
- `/blog`
- All 7 service detail pages
- Top 5 blog articles

**Grey option for faster indexing:**
- Share links on LinkedIn (creates backlink + signals Google)
- Submit to Bing Webmaster Tools simultaneously
- Post each article URL in relevant Reddit/HackerNews discussions (natural, not spammy)
- Use IndexNow API (Bing/Yandex) — Vercel supports it natively

### 6.4 Monitor for 30 days

Check weekly:
- Coverage report (any pages excluded?)
- Core Web Vitals (any issues?)
- Mobile usability
- Manual actions (shouldn't have any, but check)

---

## Phase 7: Analytics (day 3)

### 7.1 Create GA4 property

1. analytics.google.com → Create property → "Opsfield Systems"
2. Data stream → Web → `https://opsfieldsystems.com`
3. Copy Measurement ID (`G-XXXXXXXXXX`)
4. Set as `NEXT_PUBLIC_GA4_MEASUREMENT_ID` in Vercel env vars

### 7.2 Configure GA4

- Enable enhanced measurement (scroll, outbound clicks, site search, file downloads)
- Set up conversions:
  - Form submission (diagnostic request)
  - CTA click events (already wired via `trackEvent` in code)
- Link to Google Search Console
- Set data retention to 14 months

### 7.3 Flip the code switch

If not already done in Phase 2:
```ts
export const ANALYTICS_ENABLED = process.env.SITE_MODE === "production";
```

Analytics only fires when:
1. `ANALYTICS_ENABLED` is true
2. `NEXT_PUBLIC_GA4_MEASUREMENT_ID` is set
3. User has accepted cookies via consent banner

### 7.4 Alternative: Plausible/Fathom (grey option)

If you want analytics without cookie consent complexity:
- **Plausible** ($9/mo) — privacy-first, no cookies, GDPR-compliant without consent
- **Fathom** ($14/mo) — similar to Plausible
- You could remove the consent banner entirely and use Plausible instead of GA4

**Tradeoff:** Less granular data than GA4, but zero friction for visitors.

---

## Phase 8: Legal & content updates (day 1-2)

### 8.1 Footer contact email

```
components/layout/Footer.tsx line 106-107
opsfieldsystems@gmail.com → hello@opsfieldsystems.com
```

### 8.2 Legal pages

If domain is `opsfieldsystems.com` — no changes needed (already referenced).
If domain is different — search and replace across:
- `app/[locale]/terms-of-use/page.tsx`
- `app/[locale]/privacy-policy/page.tsx`
- `app/[locale]/cookie-policy/page.tsx`

### 8.3 llms.txt contact

```
public/llms.txt line 71 — update email if changed
public/llms-full.txt — same
```

### 8.4 Structured data

`components/seo/JsonLd.tsx` — uses `siteConfig.url` which auto-resolves. No manual change needed.

---

## Phase 9: Monitoring & security (week 1)

### 9.1 Uptime monitoring

Free options:
- **UptimeRobot** (free, 5-min checks, 50 monitors)
- **Better Stack** (free tier)
- Vercel's built-in analytics (if on Pro plan)

Monitor:
- Homepage (`/`)
- API endpoint (`/api/submit`)
- Sitemap (`/sitemap.xml`)

### 9.2 Security headers

Check with securityheaders.com after launch. Vercel provides good defaults, but verify:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security` (auto with Vercel SSL)
- CSP headers (if not already set)

### 9.3 Cloudflare (optional but recommended)

Even with Vercel hosting, Cloudflare provides:
- Free WAF rules (block known attack patterns)
- Rate limiting (protect form endpoint from abuse)
- Bot management
- Web analytics (server-side, no JS, no cookies)
- Page rules for caching

**Setup:** Cloudflare as DNS-only (grey cloud) for Vercel compatibility. Use Cloudflare analytics as a secondary data source alongside GA4.

---

## Phase 10: Pre-launch SEO boost (hidden factors)

Things most people don't do but significantly help:

### 10.1 Buy the domain BEFORE you're ready

Domain age is a minor but real Google ranking factor. Even if you're not ready to launch, buying the domain starts the clock. Park it with a "coming soon" page or redirect to vercel.app.

### 10.2 LinkedIn company page

Create a LinkedIn company page for Opsfield Systems with the custom domain URL. This:
- Creates a high-authority backlink
- Makes the brand look legitimate
- Enables LinkedIn ad targeting later

### 10.3 Google Business Profile

Register at business.google.com even for a remote-first company:
- Select "Service area business" (no physical address shown)
- Adds a Knowledge Panel in Google Search
- Free, high-trust backlink

### 10.4 Directory listings

Submit to:
- Clutch.co (B2B services directory — ICP lives here)
- G2.com (software/services)
- Crunchbase (founder profile exists → link to company)
- ProductHunt (if launching a tool or diagnostic)

### 10.5 Blog syndication for backlinks

Republish top articles on:
- Medium (with canonical tag pointing to your site)
- LinkedIn Articles (direct traffic + backlink)
- Dev.to (for AI/tech articles)
- Hashnode (developer audience)

**Key:** Always set the canonical URL to your domain, not the syndication platform. This tells Google "the original lives at opsfieldsystems.com."

### 10.6 Link reclamation

After switching from vercel.app:
- Google any existing mentions of `opsfield-systems.vercel.app`
- Contact sites linking to old URL and ask them to update
- Vercel 301 handles this automatically, but direct links are stronger

---

## Quick reference: Code files to touch

| File | What changes | When |
|------|-------------|------|
| Vercel env vars | `SITE_URL`, `SITE_MODE`, `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Phase 2 |
| `lib/consent.ts:17` | `ANALYTICS_ENABLED = false` → env-based | Phase 2 |
| `components/layout/Footer.tsx:106` | Gmail → domain email | Phase 8 |
| `app/api/submit/route.ts` | Resend `from` address | Phase 4 |
| `public/llms.txt` + `llms-full.txt` | Contact email if changed | Phase 8 |

Everything else (metadataBase, OG images, canonical URLs, structured data) auto-resolves from `SITE_URL`.

---

## Timeline estimate

| Phase | Time | Blocking? |
|-------|------|-----------|
| 0: Buy domain | 10 min | Yes — everything depends on this |
| 1: DNS + Vercel | 30 min + propagation (up to 48h, usually 10 min) | Yes |
| 2: Env vars + deploy | 15 min | Yes for analytics |
| 3: Email setup | 1-2 hours | No — site works without it |
| 4: Email deliverability | 1 hour + 2 weeks warmup | No |
| 5: OG cards verification | 15 min | No |
| 6: Search Console | 30 min + days for indexing | No |
| 7: Analytics | 30 min | No |
| 8: Legal/content updates | 15 min | No |
| 9: Monitoring | 30 min | No |
| 10: SEO boost | Ongoing | No |

**Day 1 minimum:** Phases 0-2 + 5 + 8 = domain live with correct URLs, OG cards, and updated contact info. ~2 hours.

**Full setup:** All phases complete in 1 week, with email warmup continuing for 2 more weeks.

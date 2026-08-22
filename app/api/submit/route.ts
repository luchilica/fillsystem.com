import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

// Diagnostic request handler. Server-side validation is mandatory. Captures the
// lead to an optional backup webhook, then sends an internal notification + a
// PII-free, locale-aware auto-reply via Resend. Delivery is gated on
// RESEND_API_KEY (not SITE_MODE) so leads can be captured on a noindex deploy.

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CHALLENGE_MAX = 200;

// Override via env in the host. FROM must be on a Resend-verified domain to
// reach arbitrary recipients; until a domain is verified, only the Resend
// account's own address receives.
const RECIPIENT =
  process.env.DIAGNOSTIC_RECIPIENT_EMAIL || "hello@fillsystem.com";
const FROM =
  process.env.DIAGNOSTIC_FROM_EMAIL || "Fill System <onboarding@resend.dev>";
// Optional backup sink (Zapier/Make/Google Sheet webhook). If set, every valid
// lead is mirrored here so nothing is lost even when email delivery fails.
const LEAD_WEBHOOK_URL = process.env.LEAD_WEBHOOK_URL || "";

// PII-free auto-reply, per locale. Never echoes any submitted field value.
const AUTO_REPLY_SUBJECT: Record<string, string> = {
  "en-US": "Diagnostic request received | Fill System",
  "es-US": "Solicitud de diagnóstico recibida | Fill System",
  "ru-US": "Заявка на диагностику получена | Fill System",
  "zh-Hans": "已收到您的诊断请求 | Fill System",
};
const AUTO_REPLY_BODY: Record<string, string> = {
  "en-US": `Thank you for your diagnostic request.
A senior advisor will review your submission
and respond within 2 business days.

If you have additional context to share,
you can reply to this email.

- Fill System`,
  "es-US": `Gracias por su solicitud de diagnóstico.
Un asesor sénior revisará su envío
y responderá en un plazo de 2 días hábiles.

Si desea compartir más contexto,
puede responder a este correo.

- Fill System`,
  "ru-US": `Спасибо за вашу заявку на диагностику.
Старший консультант рассмотрит её
и ответит в течение 2 рабочих дней.

Если хотите добавить детали,
просто ответьте на это письмо.

- Fill System`,
  "zh-Hans": `感谢您提交诊断请求。
我们的资深顾问将审阅您的提交，
并在 2 个工作日内回复。

如需补充信息，
您可以直接回复此邮件。

- Fill System`,
};
function pick(map: Record<string, string>, locale: unknown): string {
  const k = typeof locale === "string" && map[locale] ? locale : "en-US";
  return map[k];
}

// Best-effort in-memory rate limit per IP. NOTE: on serverless this only covers
// a single warm instance — for real protection use Vercel KV / Upstash.
const RATE = new Map<string, { n: number; t: number }>();
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const e = RATE.get(ip);
  if (!e || now - e.t > RATE_WINDOW_MS) {
    RATE.set(ip, { n: 1, t: now });
    return false;
  }
  e.n += 1;
  return e.n > RATE_MAX;
}

function json(body: unknown, status = 200) {
  return Response.json(body, { status });
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

interface SubmitBody {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  challenge?: unknown;
  requestType?: unknown;
  tools?: unknown;
  pains?: unknown;
  alreadyTried?: unknown;
  companyWebsite?: unknown;
  role?: unknown;
  companySize?: unknown;
  timeline?: unknown;
  website?: unknown; // honeypot
  cfTurnstileToken?: unknown; // Cloudflare Turnstile bot verification
  context?: Record<string, unknown>;
}

// Cloudflare Turnstile server-side verification. Returns true if valid, false
// if the token is invalid or verification fails. Skipped when no secret key.
async function verifyTurnstile(
  token: string,
  ip: string,
): Promise<boolean> {
  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.CF_TURNSTILE_SECRET_KEY!,
          response: token,
          remoteip: ip,
        }),
      },
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

function notificationText(b: SubmitBody): string {
  const ctx = (b.context ?? {}) as Record<string, unknown>;
  const line = (label: string, v: unknown) =>
    str(v) ? `${label}: ${str(v)}` : null;
  return [
    "New diagnostic request",
    "",
    line("Name", b.name),
    line("Work email", b.email),
    line("Company", b.company),
    line("Request type", b.requestType),
    line("Tools", b.tools),
    line("Slowing them down", b.pains),
    line("Already tried", b.alreadyTried),
    line("Company website", b.companyWebsite),
    line("Role", b.role),
    line("Company size", b.companySize),
    line("Timeline", b.timeline),
    line("Language", ctx.locale),
    "",
    "Main challenge:",
    str(b.challenge),
    "",
    "- context -",
    line("Page", ctx.page_url),
    line("Section", ctx.page_section),
    line("CTA", ctx.cta_text),
    line("Referrer", ctx.referrer),
    line("utm_source", ctx.utm_source),
    line("utm_medium", ctx.utm_medium),
    line("utm_campaign", ctx.utm_campaign),
    line("utm_content", ctx.utm_content),
    line("utm_term", ctx.utm_term),
    line("Timestamp", ctx.timestamp),
  ]
    .filter((l) => l !== null)
    .join("\n");
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return json({ ok: false, error: "rate_limited" }, 429);

  let body: SubmitBody;
  try {
    body = (await request.json()) as SubmitBody;
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  // Honeypot — a filled hidden field means a bot. Accept silently, send nothing.
  if (str(body.website) !== "") {
    return json({ ok: true, delivered: false });
  }

  // Cloudflare Turnstile verification — only when the secret key is configured.
  // In dev (no key), verification is skipped so the form works without Turnstile.
  if (process.env.CF_TURNSTILE_SECRET_KEY) {
    const token = str(body.cfTurnstileToken);
    if (!token || !(await verifyTurnstile(token, ip))) {
      return json({ ok: false, error: "turnstile_failed" }, 403);
    }
  }

  // Server-side validation (mandatory) — mirrors the client rules.
  const name = str(body.name);
  const email = str(body.email);
  const company = str(body.company);
  const challenge = str(body.challenge);
  const errors: Record<string, string> = {};
  if (!name) errors.name = "required";
  if (!email || !EMAIL_RE.test(email)) errors.email = "invalid";
  if (!company) errors.company = "required";
  if (challenge.length > CHALLENGE_MAX) errors.challenge = "too_long";
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, errors }, 422);
  }

  // Backup capture first — mirror the lead so it survives an email failure.
  if (LEAD_WEBHOOK_URL) {
    try {
      await fetch(LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch {
      /* non-fatal */
    }
  }

  // Delivery is gated on the API key, not SITE_MODE — leads can be captured on
  // a noindex deploy. No key in preview = accept without sending; no key in
  // production = misconfiguration → error so the client shows the email fallback.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return siteConfig.isPreview
      ? json({ ok: true, delivered: false })
      : json({ ok: false, error: "not_configured" }, 500);
  }

  const locale = (body.context as Record<string, unknown> | undefined)?.locale;
  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: FROM,
      to: RECIPIENT,
      replyTo: email,
      subject: `New diagnostic request: ${company}`,
      text: notificationText(body),
    });

    // Auto-reply is best-effort: a delivery failure here (e.g. no verified
    // domain yet) must not fail the submission — the lead is already captured.
    try {
      await resend.emails.send({
        from: FROM,
        to: email,
        replyTo: RECIPIENT,
        subject: pick(AUTO_REPLY_SUBJECT, locale),
        text: pick(AUTO_REPLY_BODY, locale),
      });
    } catch {
      /* auto-reply failure is non-fatal */
    }

    return json({ ok: true, delivered: true });
  } catch {
    return json({ ok: false, error: "send_failed" }, 502);
  }
}

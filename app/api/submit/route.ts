import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CHALLENGE_MAX = 200;

const RECIPIENT =
  process.env.DIAGNOSTIC_RECIPIENT_EMAIL || "oxfordconstruction.ca@gmail.com";
const FROM =
  process.env.DIAGNOSTIC_FROM_EMAIL || "Fill System <onboarding@resend.dev>";
const LEAD_WEBHOOK_URL = process.env.LEAD_WEBHOOK_URL || "";

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

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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
  website?: unknown;
  cfTurnstileToken?: unknown;
  context?: Record<string, unknown>;
}

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

function notificationHtml(b: SubmitBody): string {
  const ctx = (b.context ?? {}) as Record<string, unknown>;

  const row = (label: string, v: unknown) => {
    const s = str(v);
    if (!s) return "";
    return `<tr>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;font-size:13px;white-space:nowrap;vertical-align:top">${esc(label)}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#222;font-size:14px">${esc(s)}</td>
    </tr>`;
  };

  const contactRows = [
    row("Name", b.name),
    row("Email", b.email),
    row("Company", b.company),
    row("Role", b.role),
    row("Website", b.companyWebsite),
    row("Team size", b.companySize),
  ].filter(Boolean).join("");

  const requestRows = [
    row("Services", b.requestType),
    row("Current tools", b.tools),
    row("Pain points", b.pains),
    row("Timeline", b.timeline),
    row("Already tried", b.alreadyTried),
  ].filter(Boolean).join("");

  const challenge = str(b.challenge);
  const challengeBlock = challenge
    ? `<div style="margin:20px 0;padding:16px;background:#f8f9fa;border-left:3px solid #2551D2;border-radius:0 6px 6px 0">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#666;margin-bottom:8px">Main challenge</div>
        <div style="font-size:14px;color:#222;line-height:1.5">${esc(challenge)}</div>
      </div>`
    : "";

  const utmParts = [
    str(ctx.utm_source) ? `source=${esc(str(ctx.utm_source))}` : "",
    str(ctx.utm_medium) ? `medium=${esc(str(ctx.utm_medium))}` : "",
    str(ctx.utm_campaign) ? `campaign=${esc(str(ctx.utm_campaign))}` : "",
    str(ctx.utm_adgroup) ? `adgroup=${esc(str(ctx.utm_adgroup))}` : "",
    str(ctx.utm_term) ? `term=${esc(str(ctx.utm_term))}` : "",
    str(ctx.utm_content) ? `content=${esc(str(ctx.utm_content))}` : "",
  ].filter(Boolean).join(", ");

  const adsParts = [
    str(ctx.matchtype) ? `match=${esc(str(ctx.matchtype))}` : "",
    str(ctx.device) ? `device=${esc(str(ctx.device))}` : "",
    str(ctx.network) ? `network=${esc(str(ctx.network))}` : "",
  ].filter(Boolean).join(", ");

  const contextRows = [
    row("Language", ctx.locale),
    row("Page", ctx.page_url),
    row("Landing page", ctx.landing_page),
    row("CTA clicked", ctx.cta_text),
    row("Referrer", ctx.referrer),
    row("GCLID", ctx.gclid),
    row("GBRAID", ctx.gbraid),
    row("WBRAID", ctx.wbraid),
    utmParts ? row("UTM", utmParts) : "",
    adsParts ? row("Ads", adsParts) : "",
    row("First touch", ctx.first_touch),
    row("Submitted", ctx.timestamp),
  ].filter(Boolean).join("");

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f4f5f7">
<div style="max-width:600px;margin:0 auto;padding:24px">

  <div style="background:#222335;color:#fff;padding:20px 24px;border-radius:8px 8px 0 0">
    <div style="font-size:18px;font-weight:600">New diagnostic request</div>
    <div style="font-size:14px;color:rgba(255,255,255,0.7);margin-top:4px">${esc(str(b.company))} - ${esc(str(b.name))}</div>
  </div>

  <div style="background:#fff;padding:24px;border-radius:0 0 8px 8px;border:1px solid #e5e6ea;border-top:none">

    <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#2551D2;font-weight:600;margin-bottom:12px">Contact</div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
      ${contactRows}
    </table>

    ${requestRows ? `
    <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#2551D2;font-weight:600;margin-bottom:12px">Request details</div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
      ${requestRows}
    </table>` : ""}

    ${challengeBlock}

    ${contextRows ? `
    <details style="margin-top:24px">
      <summary style="font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#999;cursor:pointer;margin-bottom:8px">Tracking context</summary>
      <table style="width:100%;border-collapse:collapse">
        ${contextRows}
      </table>
    </details>` : ""}

  </div>

  <div style="text-align:center;padding:16px;font-size:11px;color:#999">
    Fill System - Diagnostic Request Notification
  </div>

</div>
</body></html>`;
}

function notificationText(b: SubmitBody): string {
  const ctx = (b.context ?? {}) as Record<string, unknown>;
  const line = (label: string, v: unknown) =>
    str(v) ? `${label}: ${str(v)}` : null;
  return [
    `New diagnostic request: ${str(b.company)}`,
    "",
    "--- Contact ---",
    line("Name", b.name),
    line("Email", b.email),
    line("Company", b.company),
    line("Role", b.role),
    line("Website", b.companyWebsite),
    line("Team size", b.companySize),
    "",
    "--- Request ---",
    line("Services", b.requestType),
    line("Current tools", b.tools),
    line("Pain points", b.pains),
    line("Timeline", b.timeline),
    line("Already tried", b.alreadyTried),
    "",
    "--- Main challenge ---",
    str(b.challenge) || "(not provided)",
    "",
    "--- Context ---",
    line("Language", ctx.locale),
    line("Page", ctx.page_url),
    line("Landing page", ctx.landing_page),
    line("CTA", ctx.cta_text),
    line("Referrer", ctx.referrer),
    line("GCLID", ctx.gclid),
    line("GBRAID", ctx.gbraid),
    line("WBRAID", ctx.wbraid),
    line("utm_source", ctx.utm_source),
    line("utm_medium", ctx.utm_medium),
    line("utm_campaign", ctx.utm_campaign),
    line("utm_adgroup", ctx.utm_adgroup),
    line("utm_term", ctx.utm_term),
    line("utm_content", ctx.utm_content),
    line("Match type", ctx.matchtype),
    line("Device", ctx.device),
    line("Network", ctx.network),
    line("First touch", ctx.first_touch),
    line("Timestamp", ctx.timestamp),
  ]
    .filter((l) => l !== null)
    .join("\n");
}

const AUTO_REPLY: Record<string, { subject: string; heading: string; body: string; next: string; sign: string }> = {
  "en-US": {
    subject: "We received your diagnostic request | Fill System",
    heading: "Your request is confirmed",
    body: "Thank you for reaching out. A senior advisor will review your submission and respond within 2 business days with one of three outcomes: a fit confirmation and proposed next step, a recommendation to a better-suited resource, or a no-fit decision with an honest explanation.",
    next: "If you have additional context to share before the review, reply to this email.",
    sign: "Fill System",
  },
  "es-US": {
    subject: "Recibimos su solicitud de diagnostico | Fill System",
    heading: "Su solicitud esta confirmada",
    body: "Gracias por comunicarse. Un asesor senior revisara su solicitud y respondera dentro de 2 dias habiles con uno de tres resultados: una confirmacion de compatibilidad y el siguiente paso propuesto, una recomendacion a un recurso mas adecuado, o una decision de no compatibilidad con una explicacion honesta.",
    next: "Si desea compartir mas contexto antes de la revision, responda a este correo.",
    sign: "Fill System",
  },
  "ru-US": {
    subject: "Мы получили вашу заявку на диагностику | Fill System",
    heading: "Ваша заявка подтверждена",
    body: "Спасибо за обращение. Старший консультант рассмотрит вашу заявку и ответит в течение 2 рабочих дней с одним из трех результатов: подтверждение совместимости и предложение следующего шага, рекомендация более подходящего ресурса, или решение о несовместимости с честным объяснением.",
    next: "Если хотите добавить детали до начала рассмотрения, ответьте на это письмо.",
    sign: "Fill System",
  },
};

function pickReply(locale: unknown) {
  const k = typeof locale === "string" && AUTO_REPLY[locale] ? locale : "en-US";
  return AUTO_REPLY[k];
}

function autoReplyHtml(locale: unknown): string {
  const r = pickReply(locale);
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f4f5f7">
<div style="max-width:560px;margin:0 auto;padding:24px">

  <div style="text-align:center;padding:24px 0 16px">
    <div style="display:inline-block;width:36px;height:36px;border-radius:50%;border:2.5px solid #222335;position:relative">
      <div style="position:absolute;top:2px;right:2px;width:10px;height:10px;border-radius:50%;background:transparent;border-top:2.5px solid #2551D2;border-right:2.5px solid #2551D2;transform:rotate(45deg)"></div>
    </div>
  </div>

  <div style="background:#fff;padding:32px;border-radius:8px;border:1px solid #e5e6ea">

    <h1 style="margin:0 0 16px;font-size:22px;font-weight:600;color:#222335;letter-spacing:-0.02em">${esc(r.heading)}</h1>

    <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#2C2E38">${esc(r.body)}</p>

    <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#2C2E38">${esc(r.next)}</p>

    <div style="border-top:1px solid #e5e6ea;padding-top:20px;margin-top:8px">
      <div style="font-size:14px;font-weight:600;color:#222335">${esc(r.sign)}</div>
      <div style="font-size:13px;color:#676B77;margin-top:4px">Diagnostic-first IT and business consulting</div>
      <div style="margin-top:8px">
        <a href="https://www.fillsystem.com" style="font-size:13px;color:#2551D2;text-decoration:none">www.fillsystem.com</a>
      </div>
    </div>

  </div>

  <div style="text-align:center;padding:16px;font-size:11px;color:#999">
    This is an automated confirmation. A human advisor will follow up separately.
  </div>

</div>
</body></html>`;
}

function autoReplyText(locale: unknown): string {
  const r = pickReply(locale);
  return [
    r.heading,
    "",
    r.body,
    "",
    r.next,
    "",
    "---",
    r.sign,
    "Diagnostic-first IT and business consulting",
    "www.fillsystem.com",
  ].join("\n");
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

  if (str(body.website) !== "") {
    return json({ ok: true, delivered: false });
  }

  if (process.env.CF_TURNSTILE_SECRET_KEY) {
    const token = str(body.cfTurnstileToken);
    if (!token || !(await verifyTurnstile(token, ip))) {
      return json({ ok: false, error: "turnstile_failed" }, 403);
    }
  }

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
      subject: `New diagnostic request: ${company} (${name})`,
      html: notificationHtml(body),
      text: notificationText(body),
    });

    try {
      await resend.emails.send({
        from: FROM,
        to: email,
        replyTo: RECIPIENT,
        subject: pickReply(locale).subject,
        html: autoReplyHtml(locale),
        text: autoReplyText(locale),
      });
    } catch {
      /* auto-reply failure is non-fatal */
    }

    return json({ ok: true, delivered: true });
  } catch {
    return json({ ok: false, error: "send_failed" }, 502);
  }
}

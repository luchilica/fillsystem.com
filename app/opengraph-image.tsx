import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Open Graph / social share card (1200×630) — the "business card" preview shown
// when the site link is pasted into Telegram, WhatsApp, Slack, LinkedIn, etc.
// Business-card composition: logo + wordmark, category eyebrow, a selling hook,
// a supporting line, a blue rule, and the domain footer — with a duotone photo
// bleeding in from the right. Duotone is baked into the /og asset (satori's CSS
// filters are unreliable). Twitter card re-exports this from twitter-image.tsx.

// --- Tunables ---------------------------------------------------------------
const FOOTER = "For B2B teams · 50-250 employees";
const IMG = "public/og/glass.jpg";
// ----------------------------------------------------------------------------

export const alt =
  "Fill System: Diagnostic-First IT & Business Advisory";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default async function Image() {
  const imgData = await readFile(join(process.cwd(), IMG));
  const imgSrc = `data:image/jpeg;base64,${imgData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#0B1220",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand-blue bloom, top-right. */}
        <div
          style={{
            position: "absolute",
            top: -240,
            right: -180,
            width: 720,
            height: 720,
            borderRadius: 720,
            display: "flex",
            background:
              "radial-gradient(closest-side, rgba(37,81,210,0.42), rgba(37,81,210,0))",
          }}
        />

        {/* Right image panel, bleeding in and fading into the dark card. */}
        <img
          src={imgSrc}
          width={500}
          height={630}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 500,
            height: 630,
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 720,
            height: 630,
            display: "flex",
            background:
              "linear-gradient(90deg, #0B1220 0%, rgba(11,18,32,0.74) 30%, rgba(11,18,32,0) 62%)",
          }}
        />

        {/* Left content column (business-card face). */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 740,
            height: 630,
            padding: "0 74px",
          }}
        >
          {/* Logo lockup. */}
          <div
            style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 30 }}
          >
            <svg width={60} height={60} viewBox="0 0 32 32" fill="none">
              <defs>
                <linearGradient id="ogRing" x1="1" y1="0" x2="0.25" y2="0.9">
                  <stop offset="0" stopColor="#8FB0F5" />
                  <stop offset="0.3" stopColor="#4F7CE8" />
                  <stop offset="0.62" stopColor="#FFFFFF" />
                  <stop offset="1" stopColor="#FFFFFF" />
                </linearGradient>
              </defs>
              <circle cx="16" cy="16" r="11.5" stroke="url(#ogRing)" strokeWidth="3.6" />
            </svg>
            <div
              style={{
                fontSize: 34,
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "-0.01em",
              }}
            >
              Fill System
            </div>
          </div>

          {/* Selling hook (hero line). */}
          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: "-0.022em",
              color: "#FFFFFF",
            }}
          >
            Find the bottleneck before you commit budget.
          </div>

          {/* Supporting line. */}
          <div
            style={{
              marginTop: 22,
              fontSize: 24,
              fontWeight: 400,
              lineHeight: 1.3,
              color: "#9AA7BD",
            }}
          >
            Diagnostic-first IT, CRM, data &amp; automation advisory.
          </div>

          {/* Blue rule + footer (ICP, since there's no custom domain yet). */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 34 }}>
            <div
              style={{ width: 40, height: 4, borderRadius: 2, background: "#2551D2", display: "flex" }}
            />
            <div style={{ fontSize: 22, fontWeight: 600, color: "#C7D2E5", letterSpacing: "0.01em" }}>
              {FOOTER}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}

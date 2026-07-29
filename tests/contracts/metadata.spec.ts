import { test, expect } from "@playwright/test";

// Metadata invariants. Source: docs/texts.md (title/description),
// docs/optimization.md (robots, OG/Twitter, structured data).

const TITLE = "Diagnostic-First IT & Business Development | Opsfield Systems";
const DESCRIPTION =
  "B2B companies with 50-250 employees use Opsfield Systems to diagnose process, CRM, data, and IT bottlenecks before committing to tools, hires, or implementation.";
const LEGAL_PAGES = ["/privacy-policy", "/terms-of-use", "/cookie-policy"];

test("homepage title matches texts.md", async ({ page }) => {
  await page.goto("/");
  expect(await page.title()).toBe(TITLE);
});

test("homepage meta description matches texts.md", async ({ page }) => {
  await page.goto("/");
  const content = await page
    .locator('head meta[name="description"]')
    .getAttribute("content");
  expect(content).toBe(DESCRIPTION);
});

test("homepage has an absolute canonical link", async ({ page }) => {
  await page.goto("/");
  const href = await page
    .locator('head link[rel="canonical"]')
    .getAttribute("href");
  expect(href).toBeTruthy();
  expect(href).toMatch(/^https?:\/\//);
});

test("homepage has Open Graph metadata", async ({ page }) => {
  await page.goto("/");
  for (const prop of [
    "og:title",
    "og:description",
    "og:url",
    "og:type",
    "og:site_name",
  ]) {
    expect(
      await page.locator(`head meta[property="${prop}"]`).count(),
      prop,
    ).toBe(1);
  }
});

test("homepage has Twitter metadata", async ({ page }) => {
  await page.goto("/");
  for (const name of ["twitter:card", "twitter:title", "twitter:description"]) {
    expect(
      await page.locator(`head meta[name="${name}"]`).count(),
      name,
    ).toBe(1);
  }
});

test("homepage has JSON-LD @graph with required entity types", async ({
  page,
}) => {
  await page.goto("/");
  const raw = await page
    .locator('script[type="application/ld+json"]')
    .first()
    .textContent();
  expect(raw).toBeTruthy();
  const data = JSON.parse(raw ?? "{}");
  const types: string[] = (data["@graph"] ?? []).map(
    (node: { "@type": string }) => node["@type"],
  );
  for (const type of [
    "Organization",
    "WebSite",
    "WebPage",
    "Service",
    "FAQPage",
  ]) {
    expect(types, type).toContain(type);
  }
});

for (const path of LEGAL_PAGES) {
  test(`legal page ${path} is noindex`, async ({ page }) => {
    await page.goto(path);
    const robots = await page
      .locator('head meta[name="robots"]')
      .getAttribute("content");
    expect(robots).toContain("noindex");
  });
}

test("homepage is noindex in preview mode", async ({ page }) => {
  // Default SITE_MODE is "preview" → noindex,nofollow. This intentionally
  // flips to index,follow when built with SITE_MODE=production.
  await page.goto("/");
  const robots = await page
    .locator('head meta[name="robots"]')
    .getAttribute("content");
  expect(robots).toContain("noindex");
});

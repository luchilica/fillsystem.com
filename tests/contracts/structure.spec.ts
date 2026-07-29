import { test, expect } from "@playwright/test";

// Structural invariants. Source: docs/sitemap.md (section order/IDs), docs/texts.md (H1).

const SECTION_IDS = [
  "hero",
  "problem-section",
  "what-we-diagnose",
  "areas-of-work",
  "ai-process-automation",
  "how-the-diagnostic-works",
  "proof-examples",
  "why-opsfield-systems",
  "delivery-model",
  "business-it-diagnostic",
  "faq",
  "final-cta",
];

const LEGAL_PAGES = ["/privacy-policy", "/terms-of-use", "/cookie-policy"];

test.describe("homepage structure", () => {
  test("has exactly 12 top-level sections", async ({ page }) => {
    await page.goto("/");
    expect(await page.locator("main > section").count()).toBe(12);
  });

  test("sections have correct IDs in correct order", async ({ page }) => {
    await page.goto("/");
    const ids = await page
      .locator("main > section")
      .evaluateAll((els) => els.map((el) => el.id));
    expect(ids).toEqual(SECTION_IDS);
  });

  test("has exactly one H1", async ({ page }) => {
    await page.goto("/");
    expect(await page.locator("h1").count()).toBe(1);
  });

  test("H1 text matches approved copy", async ({ page }) => {
    await page.goto("/");
    const h1 = (await page.locator("h1").innerText()).trim();
    expect(h1).toBe("Diagnostic-First IT & Business Development");
  });
});

for (const path of LEGAL_PAGES) {
  test(`legal page ${path} has exactly one H1`, async ({ page }) => {
    await page.goto(path);
    expect(await page.locator("h1").count()).toBe(1);
  });
}

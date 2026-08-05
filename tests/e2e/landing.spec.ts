import { test, expect } from "@playwright/test";

test.describe("Landing page (ru default locale)", () => {
  test("renders hero h1 with expected copy", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/BAI/i);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/цифровую инфраструктуру/);
  });

  test("has OG title + locale metadata", async ({ page }) => {
    await page.goto("/");
    const ogTitle = await page.locator('meta[property="og:title"]').first().getAttribute("content");
    expect(ogTitle).toMatch(/BAI/);
    const ogLocale = await page.locator('meta[property="og:locale"]').first().getAttribute("content");
    expect(ogLocale).toMatch(/^ru|en|kk/);
  });

  test("direct navigation to /blog works", async ({ page }) => {
    const res = await page.goto("/blog");
    expect(res?.status()).toBeLessThan(400);
    // Blog index renders a heading
    await expect(page.getByRole("heading").first()).toBeVisible();
  });
});

test.describe("Locale routing", () => {
  // html[lang] uses BCP-47 tags set by next-intl (en, kk-KZ, ru-KZ), not the
  // short locale codes in the URL. Test checks both URL routing works and
  // that a language attribute is present and non-empty.
  test("switching to /en returns the page in English layout", async ({ page }) => {
    const res = await page.goto("/en");
    expect(res?.status()).toBeLessThan(400);
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toMatch(/^en/);
  });

  test("switching to /kz returns a live page", async ({ page }) => {
    const res = await page.goto("/kz");
    expect(res?.status()).toBeLessThan(400);
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toMatch(/kk|kz/);
  });
});

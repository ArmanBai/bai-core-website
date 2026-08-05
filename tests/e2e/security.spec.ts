import { test, expect } from "@playwright/test";

test.describe("Security headers", () => {
  test("/ returns CSP, HSTS, Permissions-Policy, X-Frame-Options", async ({ request }) => {
    const res = await request.get("/");
    expect(res.status()).toBe(200);
    const h = res.headers();

    expect(h["content-security-policy"]).toBeTruthy();
    expect(h["content-security-policy"]).toContain("default-src 'self'");
    expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");

    expect(h["x-frame-options"]).toBe("DENY");
    expect(h["x-content-type-options"]).toBe("nosniff");
    expect(h["strict-transport-security"]).toMatch(/max-age=\d+/);
    expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(h["permissions-policy"]).toContain("camera=()");
  });

  test("CSP allows Turnstile + Sentry + Vercel Insights", async ({ request }) => {
    const csp = (await request.get("/")).headers()["content-security-policy"];
    expect(csp).toContain("challenges.cloudflare.com");
    expect(csp).toContain("sentry.io");
    expect(csp).toContain("vercel-insights");
  });
});

test.describe("Public endpoints", () => {
  test("/robots.txt lists sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const text = await res.text();
    expect(text).toContain("User-Agent");
    expect(text).toContain("Sitemap:");
  });

  test("/sitemap.xml is valid XML and includes blog posts with hreflang", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const text = await res.text();
    expect(text).toContain("<urlset");
    expect(text).toContain("<loc>");
    // Hreflang alternates must be present
    expect(text).toMatch(/xhtml:link[^>]+hreflang="ru-KZ"/);
    expect(text).toMatch(/xhtml:link[^>]+hreflang="kk-KZ"/);
    expect(text).toMatch(/xhtml:link[^>]+hreflang="en"/);
  });

  test("/opengraph-image returns valid PNG", async ({ request }) => {
    const res = await request.get("/opengraph-image", { timeout: 30_000 });
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("image/png");
    const body = await res.body();
    expect(body.length).toBeGreaterThan(10_000);
    expect(body[0]).toBe(0x89);
    expect(body[1]).toBe(0x50);
    expect(body[2]).toBe(0x4e);
    expect(body[3]).toBe(0x47);
  });
});

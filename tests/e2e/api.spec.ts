import { test, expect } from "@playwright/test";

const UNIQUE = () => `e2e-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;

test.describe("/api/subscribe validation", () => {
  test("malformed JSON returns 400", async ({ request }) => {
    const res = await request.post("/api/subscribe", {
      data: "not json",
      headers: { "content-type": "application/json" },
    });
    expect(res.status()).toBe(400);
  });

  test("invalid email returns 400", async ({ request }) => {
    const res = await request.post("/api/subscribe", {
      data: { email: "not-an-email" },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toMatch(/email/i);
  });

  test("valid email returns 200 (dev mode) or 2xx", async ({ request }) => {
    const res = await request.post("/api/subscribe", {
      data: { email: UNIQUE() },
    });
    // In local dev without RESEND_API_KEY, the endpoint returns 200 + dev:true.
    // In CI, same fallback since secrets are placeholders.
    expect(res.status()).toBeLessThan(400);
  });
});

test.describe("/api/contact validation", () => {
  test("missing fields returns 400", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { name: "x" }, // missing email + message
    });
    expect(res.status()).toBe(400);
  });

  test("invalid email returns 400", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: {
        name: "Test",
        email: "not-an-email",
        message: "Hello",
        category: "support",
      },
    });
    expect(res.status()).toBe(400);
  });
});

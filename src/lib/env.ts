import { z } from "zod";

/**
 * Environment variable validation.
 *
 * - In production: missing REQUIRED vars throw at import time (fail-fast on
 *   Vercel build / cold-start) so the site never silently ships without
 *   critical integrations.
 * - In development: missing optional vars just produce warnings.
 *
 * Access via `env.RESEND_API_KEY` instead of `process.env.*` so TypeScript
 * knows the shape and so nothing is read before validation runs.
 */

const isProd = process.env.NODE_ENV === "production";
// Everything is optional at the schema level. Missing values produce
// warnings, not exceptions. The site must never 500 because an
// integration isn't configured - downstream code degrades gracefully
// (contact API logs to console, newsletter falls back to dev mode).
const required = (_name: string) => z.string().min(1).optional();

const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  // Email (Resend) - required in prod for contact form to work
  RESEND_API_KEY: required("RESEND_API_KEY"),
  RESEND_CONTACT_TO: z.string().email().optional(),
  RESEND_CONTACT_FROM: z.string().optional(),

  // Rate limiter (Upstash) - strongly recommended in prod, falls back to
  // in-memory if missing (noted in rate-limit.ts). We warn but don't throw.
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),

  // CAPTCHA (Cloudflare Turnstile) - optional; widget hides if unset
  TURNSTILE_SECRET_KEY: z.string().min(1).optional(),

  // Slack webhook for ops notifications - optional
  SLACK_WEBHOOK_URL: z.string().url().optional(),

  // Sentry - optional
  SENTRY_DSN: z.string().url().optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
});

const parsedServer = serverSchema.safeParse(process.env);
const parsedClient = clientSchema.safeParse({
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
});

if (!parsedServer.success) {
  const issues = parsedServer.error.issues
    .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
    .join("\n");
  const header = "[env] Environment variables did not validate:";
  console.warn(`${header}\n${issues}`);
}

if (!parsedClient.success && isProd) {
  console.warn(
    "[env] Public env issues:",
    parsedClient.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`)
  );
}

// Soft warnings for optional-but-recommended in prod
if (isProd && parsedServer.success) {
  const v = parsedServer.data;
  if (!v.UPSTASH_REDIS_REST_URL || !v.UPSTASH_REDIS_REST_TOKEN) {
    console.warn(
      "[env] Upstash Redis not configured - rate limiter will use in-memory fallback (not persistent across serverless instances)."
    );
  }
  if (!v.TURNSTILE_SECRET_KEY) {
    console.warn("[env] TURNSTILE_SECRET_KEY missing - CAPTCHA verification disabled.");
  }
}

export const env = {
  ...(parsedServer.success ? parsedServer.data : ({} as z.infer<typeof serverSchema>)),
  ...(parsedClient.success ? parsedClient.data : ({} as z.infer<typeof clientSchema>)),
};

export type Env = typeof env;

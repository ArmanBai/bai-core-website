import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Sliding-window rate limiter.
 *
 * In production (Vercel) we need Upstash Redis env vars, otherwise the
 * limiter falls back to an in-memory Map (DEV ONLY - resets on reload
 * and does NOT work across Vercel serverless instances).
 */

const hasUpstash = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

// Fail-closed in production runtime: each Vercel serverless instance
// holds its own Map, so the in-memory limit is effectively
// N × requests-per-instance with no upper bound — contact/subscribe
// would be spam-open. The check fires inside checkRateLimit (request
// time), NOT at module import — Vercel runs `next build` with
// VERCEL_ENV=production but without runtime env vars, so a top-level
// throw would block deploys.
const failClosed =
  process.env.VERCEL_ENV === "production" && !hasUpstash;

let ratelimit: Ratelimit | null = null;

if (hasUpstash) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 h"), // 5 per hour per key
    analytics: true,
    prefix: "baicore:rl",
  });
}

// In-memory fallback (dev / missing env). NOT safe for production Vercel.
const memHits = new Map<string, { count: number; reset: number }>();
const MEM_WINDOW_MS = 60 * 60 * 1000;
const MEM_LIMIT = 5;

export type RateResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSec: number;
  backend: "upstash" | "memory";
};

export async function checkRateLimit(key: string): Promise<RateResult> {
  // Fail-closed: in Vercel prod we cannot trust the in-memory store
  // across instances. Refuse the request rather than letting it through.
  if (failClosed) {
    return { allowed: false, remaining: 0, retryAfterSec: 60, backend: "memory" };
  }
  if (ratelimit) {
    const { success, reset, remaining } = await ratelimit.limit(key);
    return {
      allowed: success,
      remaining,
      retryAfterSec: Math.max(0, Math.ceil((reset - Date.now()) / 1000)),
      backend: "upstash",
    };
  }
  // Memory fallback
  const now = Date.now();
  const entry = memHits.get(key);
  if (!entry || entry.reset <= now) {
    memHits.set(key, { count: 1, reset: now + MEM_WINDOW_MS });
    return { allowed: true, remaining: MEM_LIMIT - 1, retryAfterSec: 0, backend: "memory" };
  }
  if (entry.count >= MEM_LIMIT) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSec: Math.ceil((entry.reset - now) / 1000),
      backend: "memory",
    };
  }
  entry.count += 1;
  return {
    allowed: true,
    remaining: MEM_LIMIT - entry.count,
    retryAfterSec: 0,
    backend: "memory",
  };
}

/**
 * Best-effort client IP extraction from request headers.
 * Vercel sets `x-forwarded-for` and `x-real-ip`.
 */
export function getClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  const xri = request.headers.get("x-real-ip");
  if (xri) return xri.trim();
  return "unknown";
}

export const isRateLimitPersistent = hasUpstash;

import { NextRequest, NextResponse } from "next/server";

import { captureError } from "@/lib/monitoring";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = { email?: string };

/**
 * Newsletter subscribe endpoint.
 *
 * - Rate-limited at 10 req/h per IP.
 * - Integrates with Resend Audience when `RESEND_API_KEY` and
 *   `RESEND_AUDIENCE_ID` are set.
 * - Dev fallback: logs and returns 200 so local flow works without setup.
 */
export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rl = await checkRateLimit(`subscribe:${ip}`);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Слишком много попыток. Попробуйте позже." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rl.retryAfterSec),
          "X-RateLimit-Remaining": String(rl.remaining),
        },
      }
    );
  }

  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный JSON" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Некорректный email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    console.log("[subscribe] dev mode (no Resend audience configured)", { email });
    return NextResponse.json({ ok: true, dev: true });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    // Cap Resend round-trip at 5s. Without this a slow/unavailable Resend
    // would keep the serverless function alive up to Vercel's 10s timeout,
    // burning invocations and blocking the user.
    const timeout = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Resend request timed out")), 5000);
    });
    const { error } = await Promise.race([
      resend.contacts.create({ audienceId, email, unsubscribed: false }),
      timeout,
    ]);
    if (error) {
      captureError(error, { where: "subscribe/resend" });
      return NextResponse.json(
        { error: "Не удалось подписать. Попробуйте позже." },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    captureError(err, { where: "subscribe/unknown" });
    return NextResponse.json(
      { error: "Внутренняя ошибка." },
      { status: 500 }
    );
  }
}

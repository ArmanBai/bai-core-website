/**
 * Cloudflare Turnstile server-side verification.
 *
 * Setup:
 * 1. Create a site at https://dash.cloudflare.com/?to=/:account/turnstile
 * 2. Set NEXT_PUBLIC_TURNSTILE_SITE_KEY (for widget) and
 *    TURNSTILE_SECRET_KEY (for server) in env.
 * 3. Widget sends a token on submit - server re-verifies via this fn.
 *
 * If the secret isn't configured in dev we skip verification for
 * convenience. In production we fail-closed: skipping verification would
 * leave the contact form open to bot spam even when the widget is shown.
 */

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstile(token: string | null | undefined, clientIp?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (process.env.NODE_ENV === "production" && process.env.VERCEL_ENV === "production") {
      // Fail-closed: never accept submissions without a CAPTCHA check in prod.
      return { success: false, skipped: false as const, error: "not-configured" };
    }
    return { success: true, skipped: true as const };
  }
  if (!token) {
    return { success: false, skipped: false as const, error: "missing-token" };
  }

  const params = new URLSearchParams();
  params.set("secret", secret);
  params.set("response", token);
  if (clientIp && clientIp !== "unknown") params.set("remoteip", clientIp);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    const data = (await res.json()) as {
      success: boolean;
      "error-codes"?: string[];
    };
    if (!data.success) {
      return {
        success: false,
        skipped: false as const,
        error: (data["error-codes"] ?? []).join(",") || "unknown",
      };
    }
    return { success: true, skipped: false as const };
  } catch (err) {
    console.error("[turnstile] verify error", err);
    return { success: false, skipped: false as const, error: "network" };
  }
}

export const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
export const turnstileEnabled = Boolean(turnstileSiteKey);

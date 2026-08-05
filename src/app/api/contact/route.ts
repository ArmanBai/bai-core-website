import { NextRequest, NextResponse } from "next/server";

import { captureError } from "@/lib/monitoring";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { escapeHtml } from "@/lib/escape-html";

const MAX_LEN = 5000;
const VALID_CATEGORIES = new Set([
  "development",
  "consulting",
  "career",
  "partnership",
  "other",
]);

type ContactPayload = {
  name?: string;
  email?: string;
  company?: string;
  category?: string;
  message?: string;
  turnstileToken?: string;
};

export async function POST(request: NextRequest) {
  // 1. Rate limit - before parsing body to save compute on spam
  const ip = getClientIp(request);
  const rl = await checkRateLimit(`contact:${ip}`);
  if (!rl.allowed) {
    return NextResponse.json(
      {
        error: `Слишком много заявок. Попробуйте через ${Math.ceil(rl.retryAfterSec / 60)} мин.`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rl.retryAfterSec),
          "X-RateLimit-Remaining": String(rl.remaining),
          "X-RateLimit-Backend": rl.backend,
        },
      }
    );
  }

  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный JSON" }, { status: 400 });
  }

  // 2. CAPTCHA
  const captcha = await verifyTurnstile(body.turnstileToken, ip);
  if (!captcha.success) {
    return NextResponse.json(
      { error: "Проверка CAPTCHA не пройдена. Обновите страницу и попробуйте снова." },
      { status: 400 }
    );
  }

  // 3. Validate
  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const company = (body.company ?? "").trim();
  const category = (body.category ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Имя слишком короткое" }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Некорректный email" }, { status: 400 });
  }
  if (!message || message.length < 10) {
    return NextResponse.json({ error: "Сообщение слишком короткое" }, { status: 400 });
  }
  if (message.length > MAX_LEN) {
    return NextResponse.json({ error: "Сообщение слишком длинное" }, { status: 400 });
  }
  if (category && !VALID_CATEGORIES.has(category)) {
    return NextResponse.json({ error: "Некорректная категория" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  // Both default to info@ — the public mailbox. RESEND_CONTACT_TO can
  // be overridden in Vercel env if a secondary inbox needs to receive
  // submissions later (e.g. baicore@ for archiving).
  const to = process.env.RESEND_CONTACT_TO ?? "info@baicore.kz";
  const from = process.env.RESEND_CONTACT_FROM ?? "BAI Core <info@baicore.kz>";

  // 4. Side channel - Slack webhook (optional, fire-and-forget)
  const slackUrl = process.env.SLACK_WEBHOOK_URL;
  if (slackUrl) {
    fetch(slackUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `📬 Новая заявка (${category || "other"}) · ${name} · ${email}`,
      }),
    }).catch((err) => captureError(err, { where: "contact/slack" }));
  }

  // 5. Email via Resend (if configured)
  if (!apiKey) {
    console.log("[contact] (no RESEND_API_KEY, logging only)", { name, email, company, category, message });
    return NextResponse.json({ ok: true, dev: true });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const subject = `Новая заявка (${category || "other"}): ${name}`;
    const html = `
      <div style="font-family: system-ui, sans-serif; max-width: 520px;">
        <h2>Новая заявка с baicore.kz</h2>
        <p><strong>Категория:</strong> ${escapeHtml(category || "other")}</p>
        <p><strong>Имя:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        ${company ? `<p><strong>Компания:</strong> ${escapeHtml(company)}</p>` : ""}
        <hr />
        <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>
    `;

    // Cap Resend round-trip at 5s - see subscribe/route.ts for rationale.
    const timeout = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Resend request timed out")), 5000);
    });
    const { error } = await Promise.race([
      resend.emails.send({ from, to, subject, html, replyTo: email }),
      timeout,
    ]);

    if (error) {
      captureError(error, { where: "contact/resend" });
      return NextResponse.json(
        { error: "Не удалось отправить. Напишите на info@baicore.kz напрямую." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    captureError(err, { where: "contact/unknown" });
    return NextResponse.json(
      { error: "Внутренняя ошибка. Попробуйте позже." },
      { status: 500 }
    );
  }
}


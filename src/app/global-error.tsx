"use client";

import { useEffect } from "react";

/**
 * Root-level error boundary - catches errors that escape the locale
 * layout (including layout errors themselves). Must render its own
 * <html><body>. Keep styles inline: globals.css may not have loaded.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global-error]", error);
  }, [error]);

  return (
    <html lang="ru">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background:
            "radial-gradient(80% 60% at 50% 0%, #0a0f1f 0%, #06060e 60%, #040409 100%)",
          color: "#e6e8ef",
          fontFamily:
            "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 560 }}>
          <div
            style={{
              fontSize: "clamp(96px, 20vw, 180px)",
              fontWeight: 700,
              lineHeight: 1,
              background:
                "linear-gradient(135deg, #38bdf8 0%, #a78bfa 50%, #f472b6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            }}
          >
            500
          </div>
          <h1 style={{ fontSize: 24, margin: "16px 0 8px" }}>
            Критическая ошибка
          </h1>
          <p style={{ color: "#9ca3af", margin: "0 0 24px" }}>
            Произошла внутренняя ошибка приложения. Попробуйте обновить страницу.
          </p>
          {error.digest && (
            <p
              style={{
                color: "#6b7280",
                fontSize: 12,
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                marginBottom: 24,
              }}
            >
              code: {error.digest}
            </p>
          )}
          <button
            onClick={reset}
            style={{
              background: "linear-gradient(135deg, #38bdf8, #a78bfa)",
              color: "#030712",
              border: 0,
              borderRadius: 12,
              padding: "12px 24px",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Повторить
          </button>
        </div>
      </body>
    </html>
  );
}

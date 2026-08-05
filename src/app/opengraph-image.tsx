import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site-config";

export const alt = "BAI Core - разработка IT-решений";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 80,
          background:
            "radial-gradient(circle at 20% 20%, rgba(34,211,238,0.25), transparent 50%), radial-gradient(circle at 80% 80%, rgba(167,139,250,0.25), transparent 50%), #06060E",
          color: "white",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            position: "relative",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, oklch(0.55 0.2 215), oklch(0.5 0.22 265), oklch(0.55 0.22 310))",
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            <span>BAi</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span>BAI</span>
            <span style={{ color: "rgba(255,255,255,0.55)" }}>Core</span>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            marginTop: "auto",
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
            position: "relative",
          }}
        >
          <span>Разработка IT-решений и</span>
          <span
            style={{
              backgroundImage:
                "linear-gradient(120deg, #7dd3fc, #a5b4fc, #c4b5fd)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            автоматизация бизнеса
          </span>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 28,
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: 22,
            color: "rgba(255,255,255,0.6)",
            position: "relative",
          }}
        >
          <span>{siteConfig.url.replace("https://", "")}</span>
          <span>·</span>
          <span>SaaS · Автоматизация · BI · CRM</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

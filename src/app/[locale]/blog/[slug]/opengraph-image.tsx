import { ImageResponse } from "next/og";

import { getPostBySlug } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";

export const alt = "BAI Core blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function BlogOg({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug, locale);
  const title = post?.title ?? "BAI Core blog";
  const category = post?.category ?? "Blog";
  const readMin = post?.readMin ?? 5;
  const date = post?.date ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 72,
          background:
            "radial-gradient(circle at 15% 20%, rgba(34,211,238,0.22), transparent 55%), radial-gradient(circle at 85% 80%, rgba(167,139,250,0.22), transparent 55%), #06060E",
          color: "white",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
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

        {/* Top row: logo + category */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 11,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg, oklch(0.55 0.2 215), oklch(0.5 0.22 265), oklch(0.55 0.22 310))",
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              <span>BAi</span>
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span>BAI</span>
              <span style={{ color: "rgba(255,255,255,0.55)" }}>Core</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              border: "1px solid rgba(125,211,252,0.35)",
              background: "rgba(125,211,252,0.1)",
              borderRadius: 999,
              fontSize: 18,
              color: "#7dd3fc",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontWeight: 600,
            }}
          >
            <span>{category}</span>
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            fontSize: title.length > 70 ? 58 : title.length > 45 ? 68 : 80,
            fontWeight: 800,
            letterSpacing: "-0.035em",
            lineHeight: 1.08,
            position: "relative",
          }}
        >
          <span
            style={{
              backgroundImage: "linear-gradient(120deg, #ffffff, #cbd5f5 60%, #7dd3fc)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {title}
          </span>
        </div>

        {/* Footer meta */}
        <div
          style={{
            marginTop: 28,
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 20,
            color: "rgba(255,255,255,0.55)",
            position: "relative",
          }}
        >
          <span>{siteConfig.url.replace("https://", "")}/blog</span>
          <span>·</span>
          <span>{readMin} min read</span>
          {date && (
            <>
              <span>·</span>
              <span>{date}</span>
            </>
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}

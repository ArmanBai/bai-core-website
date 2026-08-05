import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * Brand mark — abstract "core" glyph: nested concentric diamonds with a
 * solid centre node. Reads as depth / structure / hub at favicon size,
 * works without any letterform so the brand identity isn't tied to one
 * locale-specific letter ("B" reads weird in KZ context anyway).
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background:
            "linear-gradient(135deg, #0ea5e9 0%, #6366f1 55%, #a855f7 100%)",
          borderRadius: 14,
        }}
      >
        {/* Light highlight for depth */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 14,
            background:
              "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35), transparent 55%)",
            display: "flex",
          }}
        />
        {/* Outer diamond, inner diamond, centre dot */}
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "relative" }}
        >
          <rect
            x="20"
            y="2.5"
            width="24.75"
            height="24.75"
            rx="3"
            transform="rotate(45 20 2.5)"
            stroke="white"
            strokeWidth="2.5"
            strokeOpacity="0.95"
          />
          <rect
            x="20"
            y="11"
            width="12.73"
            height="12.73"
            rx="2"
            transform="rotate(45 20 11)"
            fill="white"
            fillOpacity="0.92"
          />
          <circle cx="20" cy="20" r="2.4" fill="#1e1b4b" />
        </svg>
      </div>
    ),
    size
  );
}

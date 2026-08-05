import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Bigger sibling of icon.tsx — see that file for design rationale. */
export default function AppleIcon() {
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
          borderRadius: 40,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 40,
            background:
              "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.35), transparent 55%)",
            display: "flex",
          }}
        />
        <svg
          width="112"
          height="112"
          viewBox="0 0 112 112"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "relative" }}
        >
          <rect
            x="56"
            y="7"
            width="69.3"
            height="69.3"
            rx="8"
            transform="rotate(45 56 7)"
            stroke="white"
            strokeWidth="6"
            strokeOpacity="0.95"
          />
          <rect
            x="56"
            y="31"
            width="35.4"
            height="35.4"
            rx="5"
            transform="rotate(45 56 31)"
            fill="white"
            fillOpacity="0.92"
          />
          <circle cx="56" cy="56" r="6.7" fill="#1e1b4b" />
        </svg>
      </div>
    ),
    size
  );
}

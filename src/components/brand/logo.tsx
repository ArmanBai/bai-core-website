"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * BAI Core - circuit-board logo
 *
 * A stylised SVG rendering of the chip-with-traces logo. The `animated` prop
 * turns on electric pulses travelling along the traces (uses `animate-trace`
 * from globals.css).
 */
export function BaiLogo({
  className,
  size = 48,
  animated = false,
  withWordmark = false,
  wordmarkClassName,
}: {
  className?: string;
  size?: number;
  animated?: boolean;
  withWordmark?: boolean;
  wordmarkClassName?: string;
}) {
  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="BAI Core"
        role="img"
        className={animated ? "[&_path.trace]:animate-trace [&_path.trace]:[animation-delay:var(--d,0ms)]" : undefined}
      >
        {/* Outer circuit traces (top) */}
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M35 10 L35 24 L28 31" className="trace" style={{ ["--d" as string]: "0ms" }} />
          <circle cx="35" cy="8" r="2.5" fill="currentColor" />

          <path d="M50 6 L50 22 L46 26" className="trace" style={{ ["--d" as string]: "200ms" }} />
          <circle cx="50" cy="4" r="2.5" fill="currentColor" />

          <path d="M60 4 L60 22" className="trace" style={{ ["--d" as string]: "400ms" }} />
          <circle cx="60" cy="2" r="2.5" fill="currentColor" />

          <path d="M70 6 L70 22 L74 26" className="trace" style={{ ["--d" as string]: "600ms" }} />
          <circle cx="70" cy="4" r="2.5" fill="currentColor" />

          <path d="M85 10 L85 24 L92 31" className="trace" style={{ ["--d" as string]: "800ms" }} />
          <circle cx="85" cy="8" r="2.5" fill="currentColor" />
        </g>

        {/* Outer circuit traces (right) */}
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M110 35 L96 35 L89 28" className="trace" style={{ ["--d" as string]: "1000ms" }} />
          <circle cx="112" cy="35" r="2.5" fill="currentColor" />

          <path d="M116 50 L98 50 L94 46" className="trace" style={{ ["--d" as string]: "1200ms" }} />
          <circle cx="118" cy="50" r="2.5" fill="currentColor" />

          <path d="M116 60 L98 60" className="trace" style={{ ["--d" as string]: "1400ms" }} />
          <circle cx="118" cy="60" r="2.5" fill="currentColor" />

          <path d="M116 70 L98 70 L94 74" className="trace" style={{ ["--d" as string]: "1600ms" }} />
          <circle cx="118" cy="70" r="2.5" fill="currentColor" />

          <path d="M110 85 L96 85 L89 92" className="trace" style={{ ["--d" as string]: "1800ms" }} />
          <circle cx="112" cy="85" r="2.5" fill="currentColor" />
        </g>

        {/* Outer circuit traces (bottom) */}
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M85 110 L85 96 L92 89" className="trace" style={{ ["--d" as string]: "2000ms" }} />
          <circle cx="85" cy="112" r="2.5" fill="currentColor" />

          <path d="M70 114 L70 98 L74 94" className="trace" style={{ ["--d" as string]: "2200ms" }} />
          <circle cx="70" cy="116" r="2.5" fill="currentColor" />

          <path d="M60 116 L60 98" className="trace" style={{ ["--d" as string]: "2400ms" }} />
          <circle cx="60" cy="118" r="2.5" fill="currentColor" />

          <path d="M50 114 L50 98 L46 94" className="trace" style={{ ["--d" as string]: "2600ms" }} />
          <circle cx="50" cy="116" r="2.5" fill="currentColor" />

          <path d="M35 110 L35 96 L28 89" className="trace" style={{ ["--d" as string]: "2800ms" }} />
          <circle cx="35" cy="112" r="2.5" fill="currentColor" />
        </g>

        {/* Outer circuit traces (left) */}
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 85 L24 85 L31 92" className="trace" style={{ ["--d" as string]: "3000ms" }} />
          <circle cx="8" cy="85" r="2.5" fill="currentColor" />

          <path d="M4 70 L22 70 L26 74" className="trace" style={{ ["--d" as string]: "3200ms" }} />
          <circle cx="2" cy="70" r="2.5" fill="currentColor" />

          <path d="M4 60 L22 60" className="trace" style={{ ["--d" as string]: "3400ms" }} />
          <circle cx="2" cy="60" r="2.5" fill="currentColor" />

          <path d="M4 50 L22 50 L26 46" className="trace" style={{ ["--d" as string]: "3600ms" }} />
          <circle cx="2" cy="50" r="2.5" fill="currentColor" />

          <path d="M10 35 L24 35 L31 28" className="trace" style={{ ["--d" as string]: "3800ms" }} />
          <circle cx="8" cy="35" r="2.5" fill="currentColor" />
        </g>

        {/* Chip frame with corner brackets */}
        <rect
          x="28"
          y="28"
          width="64"
          height="64"
          rx="8"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Corner accents */}
        <g fill="currentColor">
          <rect x="32" y="32" width="4" height="4" rx="0.5" />
          <rect x="84" y="32" width="4" height="4" rx="0.5" />
          <rect x="32" y="84" width="4" height="4" rx="0.5" />
          <rect x="84" y="84" width="4" height="4" rx="0.5" />
        </g>

        {/* Wordmark "BAi" inside */}
        <text
          x="60"
          y="70"
          textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="26"
          fontWeight="800"
          fill="currentColor"
          letterSpacing="-1"
        >
          BA<tspan fontSize="22">i</tspan>
        </text>
      </svg>

      {withWordmark && (
        <span
          className={cn(
            "text-base font-semibold tracking-tight select-none",
            wordmarkClassName
          )}
        >
          BAI
          <span className="text-muted-foreground"> Core</span>
        </span>
      )}
    </div>
  );
}

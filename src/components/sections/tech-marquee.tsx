"use client";

import { useTranslations } from "next-intl";

const TECH = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Postgres",
  "Supabase",
  "Tailwind v4",
  "Vercel",
  "Docker",
  "OpenAI",
  "Anthropic Claude",
  "Stripe",
  "Resend",
  "Sentry",
  "PostHog",
  "ClickHouse",
  "Kafka",
  "Redis",
  "Playwright",
  "Vitest",
  "GitHub Actions",
];

// Duplicate list for seamless loop
const ROW = [...TECH, ...TECH];

export function TechMarquee() {
  const t = useTranslations("home.techMarquee");
  return (
    <section
      aria-label={t("caption")}
      className="relative py-10 lg:py-14 border-y border-white/10 bg-background/60 overflow-hidden"
    >
      <p className="text-caption text-muted-foreground text-center mb-6">
        {t("caption")}
      </p>

      {/* Row 1 */}
      <MarqueeRow items={ROW} direction="left" speed={40} />

      {/* Row 2 (reverse, slower) */}
      <div className="mt-4">
        <MarqueeRow items={ROW.slice().reverse()} direction="right" speed={55} />
      </div>

      {/* Edge gradient masks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent"
      />
    </section>
  );
}

function MarqueeRow({
  items,
  direction,
  speed,
}: {
  items: string[];
  direction: "left" | "right";
  speed: number;
}) {
  return (
    <div className="flex overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)" }}>
      <div
        className="flex shrink-0 gap-3 pr-3 animate-marquee"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {items.map((t, i) => (
          <Chip key={`a-${i}`} label={t} />
        ))}
      </div>
      <div
        className="flex shrink-0 gap-3 pr-3 animate-marquee"
        aria-hidden="true"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {items.map((t, i) => (
          <Chip key={`b-${i}`} label={t} />
        ))}
      </div>
    </div>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-mono text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">
      <span className="h-1 w-1 rounded-full bg-primary/60" />
      {label}
    </span>
  );
}

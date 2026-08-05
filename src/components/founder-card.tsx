"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FounderCardProps {
  name: string;
  role: string;
  bio: string;
  /** Dicebear seed - any string, same seed = same avatar. Use the person's
   *  name so their avatar is stable across renders and deploys. */
  avatarSeed: string;
  /** Path to a real photo under `/public` (e.g. `/team/arman.jpg`). When
   *  set, overrides the generated avatar - good for actual team members;
   *  leave empty for the generic "collective team" card. */
  photoSrc?: string;
  /** Dicebear style. notionists = clean B2B-feeling illustrated portrait.
   *  bottts-neutral = abstract robot, good for "collective team" cards.
   *  pixel-art / thumbs / shapes kept for legacy / NFT-style variants. */
  style?:
    | "notionists"
    | "avataaars"
    | "personas"
    | "micah"
    | "bottts-neutral"
    | "pixel-art"
    | "thumbs"
    | "shapes";
  /** Accent color for the animated border gradient. */
  accent?: "indigo" | "cyan" | "violet" | "rose";
  index?: number;
}

const ACCENT_GRADIENT: Record<Required<FounderCardProps>["accent"], string> = {
  indigo: "from-indigo-500 via-violet-500 to-cyan-400",
  cyan: "from-cyan-400 via-teal-400 to-emerald-400",
  violet: "from-violet-500 via-fuchsia-500 to-rose-400",
  rose: "from-rose-500 via-orange-400 to-amber-400",
};

export function FounderCard({
  name,
  role,
  bio,
  avatarSeed,
  photoSrc,
  style = "notionists",
  accent = "indigo",
  index = 0,
}: FounderCardProps) {
  const avatarUrl =
    photoSrc ?? `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(avatarSeed)}&scale=90`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-3xl p-[2px] overflow-hidden"
    >
      {/* Animated conic-gradient border. Rotates on hover. */}
      <motion.div
        aria-hidden
        className={cn(
          "absolute inset-0 rounded-3xl bg-gradient-to-br opacity-70 group-hover:opacity-100 transition-opacity",
          ACCENT_GRADIENT[accent],
        )}
      />
      <motion.div
        aria-hidden
        className={cn(
          "absolute inset-0 rounded-3xl bg-gradient-to-tr blur-2xl opacity-40 group-hover:opacity-70 transition-opacity",
          ACCENT_GRADIENT[accent],
        )}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative rounded-[calc(1.5rem-2px)] bg-card p-6 lg:p-8 h-full flex flex-col">
        {/* NFT-style avatar - floats subtly like a Lootie card in a marketplace. */}
        <motion.div
          className="relative mx-auto mb-5"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
        >
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 rounded-2xl bg-gradient-to-br blur-xl opacity-60",
              ACCENT_GRADIENT[accent],
            )}
          />
          <div className="relative h-32 w-32 lg:h-36 lg:w-36 rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-sm">
            <Image
              src={avatarUrl}
              alt={photoSrc ? `${name} - photo` : `${name} - generated avatar`}
              width={144}
              height={144}
              unoptimized={!photoSrc}
              className={cn("h-full w-full", photoSrc ? "object-cover" : "")}
            />
          </div>
          {/* NFT-id pill */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-black/60 backdrop-blur px-2.5 py-0.5 text-[10px] font-mono text-white/70 uppercase tracking-wider">
            #{String(index + 1).padStart(3, "0")}
          </div>
        </motion.div>

        <div className="mt-3 text-center">
          <h3 className="text-lg font-semibold tracking-tight">{name}</h3>
          <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-primary">{role}</p>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed text-left">{bio}</p>
        </div>
      </div>
    </motion.div>
  );
}

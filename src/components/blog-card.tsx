"use client";

import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  Workflow,
  Database,
  Shield,
  Code2,
  TrendingUp,
  Sparkles,
  BookOpen,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { COVERS, formatPostDate, type BlogPostMeta } from "@/lib/blog-types";

// Per-category visual: large decorative icon + gradient that leans into the
// topic. Falls back to BookOpen for categories we haven't seen before, so
// new posts never render with an empty cover.
const CATEGORY_META: Record<string, { icon: LucideIcon; accent: string }> = {
  Automation: { icon: Workflow,    accent: "from-violet-500/50 via-fuchsia-500/25 to-transparent" },
  Database:   { icon: Database,    accent: "from-indigo-500/50 via-cyan-500/25 to-transparent"    },
  Security:   { icon: Shield,      accent: "from-emerald-500/50 via-cyan-500/25 to-transparent"   },
  Code:       { icon: Code2,       accent: "from-cyan-500/50 via-indigo-500/25 to-transparent"    },
  Business:   { icon: TrendingUp,  accent: "from-amber-500/50 via-orange-500/25 to-transparent"   },
  AI:         { icon: Sparkles,    accent: "from-fuchsia-500/50 via-violet-500/25 to-transparent" },
};
const DEFAULT_META = { icon: BookOpen, accent: "from-indigo-500/50 via-violet-500/25 to-transparent" };

export function BlogCard({
  post,
  index = 0,
  featured = false,
}: {
  post: BlogPostMeta;
  index?: number;
  featured?: boolean;
}) {
  const t = useTranslations("blog.card");
  const categoryMeta = CATEGORY_META[post.category] ?? DEFAULT_META;
  const Icon = categoryMeta.icon;
  // Prefer the post's explicit cover token (from frontmatter) - falls back
  // to the category accent, which guarantees a sensible gradient every time.
  const coverAccent = post.cover
    ? COVERS[post.cover] ?? COVERS.default
    : categoryMeta.accent;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ delay: index * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-primary/30 transition-colors",
        featured && "md:col-span-2 md:row-span-2"
      )}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Cover */}
        <div
          className={cn(
            "relative overflow-hidden bg-[#0b0b20]",
            featured ? "aspect-[2/1]" : "aspect-[16/9]",
          )}
        >
          {/* Real photo - takes priority when coverImage is set. Falls back to
              the generated gradient+icon variant below when absent. */}
          {post.coverImage ? (
            <>
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes={featured ? "(min-width:768px) 66vw, 100vw" : "(min-width:768px) 33vw, 100vw"}
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                priority={featured}
              />
              {/* Darken towards the bottom so the title stays legible */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
              />
            </>
          ) : (
            <>
              {/* Base accent gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${coverAccent}`} />

              {/* Darken towards the bottom for text legibility */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
              />

              {/* Subtle dot pattern - kept very faint so it reads as texture, not content */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: "radial-gradient(rgba(255,255,255,0.35) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />

              {/* Ambient blur orb for depth */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full blur-3xl bg-white/10 group-hover:bg-white/15 transition-colors"
              />

              {/* Big decorative category icon - right side, semi-transparent */}
              <Icon
                aria-hidden="true"
                strokeWidth={1.1}
                className={cn(
                  "absolute text-white/25 group-hover:text-white/35 transition-colors",
                  featured
                    ? "top-1/2 right-8 -translate-y-1/2 h-40 w-40 md:h-48 md:w-48"
                    : "top-1/2 right-5 -translate-y-1/2 h-24 w-24",
                )}
              />
            </>
          )}

          {/* Category chip (top-left) */}
          <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-md bg-black/50 backdrop-blur-md border border-white/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-white/90">
            {post.category}
          </div>

          {/* Read time (top-right) */}
          <div className="absolute top-4 right-4 inline-flex items-center gap-1 text-[10px] text-white/85 bg-black/50 backdrop-blur-md border border-white/10 rounded-md px-2 py-0.5 font-mono">
            <Clock className="h-2.5 w-2.5" />
            {post.readMin} {t("readMinSuffix")}
          </div>

          {/* Title overlay - on ALL cards, not only featured. Gives each cover
              concrete content instead of a blank gradient. */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2
              className={cn(
                "font-bold tracking-tight leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] line-clamp-3",
                featured ? "text-xl md:text-2xl lg:text-3xl" : "text-base md:text-lg",
              )}
            >
              {post.title}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">{formatPostDate(post.date)}</span>
            <span className="text-xs text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
              {t("readCta")} <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import type { BlogPostMeta } from "@/lib/blog-types";
import { BlogCard } from "@/components/blog-card";

export function BlogCategoryFilter({
  posts,
  categories,
}: {
  posts: BlogPostMeta[];
  categories: { name: string; count: number }[];
}) {
  const t = useTranslations("blog");
  const [active, setActive] = useState<string>("all");

  const filtered = useMemo(() => {
    if (active === "all") return posts;
    return posts.filter((p) => p.category === active);
  }, [posts, active]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        <FilterButton
          label={t("filterAll")}
          count={posts.length}
          active={active === "all"}
          onClick={() => setActive("all")}
          isActiveLayoutId
        />
        {categories.map((c) => (
          <FilterButton
            key={c.name}
            label={c.name}
            count={c.count}
            active={active === c.name}
            onClick={() => setActive(c.name)}
            isActiveLayoutId
          />
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground text-sm">
          {t("filterEmpty")}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <BlogCard key={p.slug} post={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterButton({
  label,
  count,
  active,
  onClick,
  isActiveLayoutId,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  isActiveLayoutId?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "text-primary-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
      )}
    >
      {active && isActiveLayoutId && (
        <motion.span
          layoutId="blog-filter-active"
          className="absolute inset-0 rounded-lg bg-primary"
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}
      <span className="relative">{label}</span>
      <span
        className={cn(
          "relative text-[10px] font-mono tabular-nums",
          active ? "text-primary-foreground/70" : "text-muted-foreground/60"
        )}
      >
        {count}
      </span>
    </button>
  );
}

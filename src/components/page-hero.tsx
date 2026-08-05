"use client";

import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  variant = "default",
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  variant?: "default" | "mesh";
  children?: React.ReactNode;
}) {
  const ta11y = useTranslations("a11y");
  const tNav = useTranslations("nav");
  return (
    <section
      className={cn(
        "relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden",
        variant === "mesh" ? "bg-circuit" : "bg-background"
      )}
    >
      {/* Ambient layers */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(34,211,238,0.1), transparent 50%), radial-gradient(circle at 80% 70%, rgba(167,139,250,0.08), transparent 50%)",
        }}
      />
      <div className="absolute inset-0 bg-grid-dense opacity-[0.04] mask-fade-b pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            aria-label={ta11y("navigation")}
            className="flex items-center gap-1 text-xs text-muted-foreground mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Home className="h-3 w-3" />
              {tNav("home")}
            </Link>
            {breadcrumbs.map((b, i) => (
              <span key={i} className="inline-flex items-center gap-1">
                <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
                {b.href && i < breadcrumbs.length - 1 ? (
                  <Link href={b.href} className="hover:text-foreground transition-colors">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">{b.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        <div className="max-w-3xl">
          {eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-caption text-primary"
            >
              {eyebrow}
            </motion.span>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-h1 mt-3 leading-[1.05]"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed"
            >
              {description}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

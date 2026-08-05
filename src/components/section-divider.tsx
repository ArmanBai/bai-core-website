"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Thin horizontal gradient divider between sections - adds rhythm without
 * being decorative-heavy. Draws in on scroll-into-view.
 */
export function SectionDivider({ className, variant = "default" }: { className?: string; variant?: "default" | "accent" }) {
  const gradient =
    variant === "accent"
      ? "linear-gradient(90deg, transparent, rgba(34,211,238,0.4), rgba(167,139,250,0.4), transparent)"
      : "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)";

  return (
    <div className={cn("relative flex justify-center", className)} aria-hidden="true">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-full max-w-5xl origin-center"
        style={{ background: gradient }}
      />
    </div>
  );
}

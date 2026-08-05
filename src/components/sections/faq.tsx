"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

import { cn } from "@/lib/utils";

export type FaqItem = { q: string; a: string };

/**
 * Renders a FAQ accordion and emits FAQPage JSON-LD so Google can
 * display rich results for the page hosting it.
 */
export function FaqSection({
  items,
  eyebrow = "FAQ",
  title,
  description,
}: {
  items: FaqItem[];
  eyebrow?: string;
  /** Required - caller supplies the translated heading so this component
   *  stays i18n-agnostic and doesn't need its own useTranslations call. */
  title: string;
  description?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <section className="py-16 lg:py-24 relative">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-caption text-primary mb-3">{eyebrow}</p>
          <h2 className="text-section">{title}</h2>
          {description && (
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">{description}</p>
          )}
        </div>

        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={cn(
                  "rounded-xl border bg-white/[0.02] transition-colors",
                  isOpen ? "border-primary/30" : "border-white/10 hover:border-white/20"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm lg:text-base font-medium">{item.q}</span>
                  <span
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-colors",
                      isOpen
                        ? "bg-primary/15 border-primary/35 text-primary"
                        : "bg-white/[0.03] border-white/10 text-muted-foreground"
                    )}
                  >
                    {isOpen ? (
                      <Minus className="h-3.5 w-3.5" />
                    ) : (
                      <Plus className="h-3.5 w-3.5" />
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}

// Note: defaultFaq was removed in favour of messages/*.json under `faq.items`.
// Consumers now pass translated items via the `items` prop.

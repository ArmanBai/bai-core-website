"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Globe } from "lucide-react";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

/** Per-locale metadata used by the dropdown. `native` is the language's
 *  own name (not translated) - that's the convention Stripe/Linear/Vercel
 *  use so every user can recognise their own language regardless of the
 *  currently-active locale. `short` is the 2-letter chip on the trigger. */
const META: Record<AppLocale, { native: string; short: string }> = {
  ru: { native: "Русский", short: "RU" },
  kz: { native: "Қазақша", short: "KZ" },
  en: { native: "English", short: "EN" },
};

export function LanguageSwitcher({ variant = "default" }: { variant?: "default" | "mobile" }) {
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Click-outside + Escape to close
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const setLocale = (next: AppLocale) => {
    setOpen(false);
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  const current = META[locale];

  return (
    <div
      ref={rootRef}
      className={cn("relative", variant === "mobile" && "w-full")}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={pending}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "group inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs font-medium text-foreground/80 hover:text-foreground hover:border-white/20 hover:bg-white/[0.05] transition-colors",
          variant === "mobile" && "w-full justify-between px-3 py-2",
          pending && "opacity-60 pointer-events-none",
          open && "border-primary/40 bg-white/[0.05] text-foreground",
        )}
      >
        <Globe
          className={cn(
            "h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors",
            open && "text-primary",
          )}
        />
        <span className="font-mono tracking-wider">{current.short}</span>
        {variant === "mobile" && (
          <span className="ml-1 text-muted-foreground/80 font-normal font-sans">
            {current.native}
          </span>
        )}
        <ChevronDown
          className={cn(
            "h-3 w-3 text-muted-foreground transition-transform ml-0.5",
            open && "rotate-180 text-primary",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "absolute z-50 mt-1.5 min-w-[180px] overflow-hidden rounded-xl border border-white/10 bg-background/95 backdrop-blur-xl shadow-2xl",
              // Align under trigger: right-anchored on desktop, full-width on mobile
              variant === "mobile" ? "left-0 right-0 w-full" : "right-0",
            )}
          >
            {routing.locales.map((l) => {
              const m = META[l];
              const active = l === locale;
              return (
                <li key={l} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => setLocale(l)}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left text-sm transition-colors",
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/85 hover:bg-white/[0.05] hover:text-foreground",
                    )}
                  >
                    <div className="flex flex-col items-start leading-tight">
                      <span className="font-medium">{m.native}</span>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/70">
                        {m.short}
                      </span>
                    </div>
                    {active && <Check className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

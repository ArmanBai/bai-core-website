"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { BaiLogo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "blog", href: "/blog" },
  { key: "contacts", href: "/contacts" },
] as const;

export function SiteHeader() {
  const t = useTranslations();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 gap-6">
        <div className="flex items-center gap-8 min-w-0">
          <Link href="/" className="group inline-flex items-center gap-2.5 shrink-0">
            <BaiLogo size={28} className="text-primary group-hover:text-primary/80 transition-colors" />
            <span className="text-sm font-semibold tracking-tight">
              BAI <span className="text-muted-foreground">Core</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/[0.04] transition-colors"
              >
                {t(`nav.${l.key}`)}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <ThemeToggle />
          <LanguageSwitcher />
          <Link href="/contacts">
            <Button variant="gradient" size="sm" rightIcon={<ArrowUpRight className="h-3.5 w-3.5" />}>
              {t("cta.discuss")}
            </Button>
          </Link>
        </div>

        <button
          className="lg:hidden p-2 rounded-lg text-foreground hover:bg-white/[0.04]"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {NAV.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                >
                  {t(`nav.${l.key}`)}
                </Link>
              ))}
              <div className="pt-3 mt-2 border-t border-border space-y-3">
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <LanguageSwitcher variant="mobile" />
                </div>
                <Link href="/contacts" onClick={() => setMobileOpen(false)} className="block">
                  <Button variant="gradient" size="sm" className="w-full">
                    {t("cta.discuss")}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

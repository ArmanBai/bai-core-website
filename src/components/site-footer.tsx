"use client";

import { useTranslations } from "next-intl";
import { Mail, MapPin, Phone } from "lucide-react";

import { siteConfig } from "@/lib/site-config";
import { Link } from "@/i18n/navigation";
import { BaiLogo } from "@/components/brand/logo";
import { Newsletter } from "@/components/newsletter";

/* Brand social icons - inline SVG (lucide-react dropped brand icons in v1). */
function IconGithub({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.1.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.81 1.3 3.5.99.1-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23.96-.27 1.98-.4 3-.4 1.02 0 2.05.13 3 .4 2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.82.58C20.57 21.79 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
    </svg>
  );
}
function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.47v6.27zM5.34 7.43a2.06 2.06 0 11-.01-4.12 2.06 2.06 0 01.01 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
function IconInstagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.23a3.76 3.76 0 01-.9 1.38c-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.42a3.76 3.76 0 01-1.38-.9 3.76 3.76 0 01-.9-1.38c-.17-.42-.37-1.06-.42-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42C8.42 2.21 8.8 2.2 12 2.2zm0-2.2C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a6 6 0 00-2.17 1.4A6 6 0 00.56 4.2c-.3.76-.5 1.64-.56 2.92C0 8.4 0 8.82 0 12s.01 3.6.07 4.88c.06 1.28.26 2.16.56 2.92a6 6 0 001.4 2.17 6 6 0 002.17 1.4c.76.3 1.64.5 2.92.56C8.4 24 8.82 24 12 24s3.6-.01 4.88-.07c1.28-.06 2.16-.26 2.92-.56a6 6 0 002.17-1.4 6 6 0 001.4-2.17c.3-.76.5-1.64.56-2.92.06-1.28.07-1.7.07-4.88s-.01-3.6-.07-4.88c-.06-1.28-.26-2.16-.56-2.92a6 6 0 00-1.4-2.17A6 6 0 0019.8.56c-.76-.3-1.64-.5-2.92-.56C15.6.01 15.18 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zm0 10.16a4 4 0 110-8 4 4 0 010 8zm7.85-10.4a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
    </svg>
  );
}

export function SiteFooter() {
  const t = useTranslations();

  const COLS = [
    {
      key: "product",
      links: [
        { key: "home", href: "/" },
        { key: "services", href: "/services" },
        { key: "projects", href: "/projects" },
        { key: "blog", href: "/blog" },
      ],
    },
    {
      key: "company",
      links: [
        { key: "about", href: "/about" },
        { key: "careers", href: "/careers" },
        { key: "contacts", href: "/contacts" },
      ],
    },
    {
      key: "legal",
      legalLinks: [
        { key: "terms", href: "/terms" },
        { key: "privacy", href: "/privacy" },
        { key: "cookies", href: "/cookies" },
      ],
    },
  ] as const;

  return (
    <footer className="relative border-t border-white/10 bg-background">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Newsletter row */}
        <div className="mb-12 grid lg:grid-cols-[1fr_360px] gap-6 lg:gap-10 items-center rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:p-7">
          <div>
            <p className="text-caption text-primary mb-1">{t("footer.newsletter.eyebrow")}</p>
            <p className="text-base lg:text-lg font-semibold">
              {t("footer.newsletter.title")}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("footer.newsletter.description")}
            </p>
          </div>
          <Newsletter variant="compact" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-12">
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <BaiLogo size={34} className="text-primary" />
              <span className="text-base font-semibold tracking-tight">
                BAI <span className="text-muted-foreground">Core</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
              {t("company.name")} - {t("company.tagline").toLowerCase()}.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href={`tel:${siteConfig.phoneHref}`}
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>
                    {siteConfig.phone}
                    <span className="ml-1.5 text-[11px] text-muted-foreground/70">
                      ({t("company.phoneHint")})
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {siteConfig.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" />
                {t("company.city")}
              </li>
            </ul>
            <div className="mt-5 flex items-center gap-2">
              {[
                { href: siteConfig.socials.github, icon: IconGithub, label: "GitHub" },
                { href: siteConfig.socials.linkedin, icon: IconLinkedin, label: "LinkedIn" },
                { href: siteConfig.socials.instagram, icon: IconInstagram, label: "Instagram" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-white/[0.04] transition-all"
                >
                  <s.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.key}>
              <p className="text-sm font-semibold mb-4">{t(`footer.${col.key}`)}</p>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {"links" in col &&
                  col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="hover:text-foreground transition-colors">
                        {t(`nav.${l.key}`)}
                      </Link>
                    </li>
                  ))}
                {"legalLinks" in col &&
                  col.legalLinks.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="hover:text-foreground transition-colors">
                        {t(`footer.${l.key}`)}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Astana Hub residency - proud hero-style badge so visitors
            immediately see our official recognition. Logo sits inside a
            prominent white tile with padding so the dark wordmark
            reads well on the otherwise dark footer. */}
        <a
          href="https://astanahub.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mt-8 flex items-center gap-5 rounded-2xl border-2 border-white/15 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent p-5 sm:p-6 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 max-w-xl"
        >
          <div className="flex h-24 w-24 sm:h-28 sm:w-28 shrink-0 items-center justify-center rounded-2xl bg-white p-3 shadow-xl shadow-black/30 ring-1 ring-black/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/astana-hub.png"
              alt="Astana Hub"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-primary/80">
              astanahub.com
            </p>
            <p className="mt-1 text-base sm:text-lg font-bold text-foreground leading-tight">
              {t("footer.astanaHubLabel")}
            </p>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
              {t("footer.astanaHubCaption")}
            </p>
          </div>
        </a>

        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© 2026 {siteConfig.legalEntity}. {t("footer.madeIn")}.</span>
          <span className="inline-flex items-center gap-1.5 font-mono">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 rounded-full bg-[color:var(--data)] opacity-70 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--data)]" />
            </span>
            {t("footer.operational")}
          </span>
        </div>
      </div>
    </footer>
  );
}

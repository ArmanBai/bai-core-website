import { Link } from "@/i18n/navigation";
import type { MDXComponents } from "mdx/types";

import { cn } from "@/lib/utils";

/**
 * MDX mapping - brings dark-site typography + prose-accents to markdown.
 *
 * Labels are passed in (not pulled from next-intl here) because this is
 * a plain function, not a component, and the returned MDX mapping is
 * consumed by next-mdx-remote/rsc in a server component. Callers
 * resolve translations once and hand them in.
 */
export function mdxComponents(labels?: { sectionLink?: string }): MDXComponents {
  const sectionLinkLabel = labels?.sectionLink ?? "Section link";
  return {
    h1: (p) => <h1 {...p} className={cn("text-3xl font-bold tracking-tight mt-10 mb-4", p.className)} />,
    h2: (p) => (
      <h2
        {...p}
        className={cn(
          "group/h text-2xl font-semibold tracking-tight mt-10 mb-4 scroll-mt-28 flex items-center gap-2",
          p.className
        )}
      >
        <span>{p.children}</span>
        {p.id && (
          <a
            href={`#${p.id}`}
            aria-label={sectionLinkLabel}
            className="opacity-0 group-hover/h:opacity-100 text-muted-foreground hover:text-primary transition-opacity text-sm"
          >
            #
          </a>
        )}
      </h2>
    ),
    h3: (p) => <h3 {...p} className={cn("text-xl font-semibold tracking-tight mt-8 mb-3 scroll-mt-28", p.className)} />,
    p: (p) => <p {...p} className={cn("my-4 leading-[1.75] text-foreground/85", p.className)} />,
    a: ({ href = "#", children, ...rest }) => {
      const external = /^https?:\/\//.test(href);
      const cls = "text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors";
      if (external) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
            {children}
            <span className="inline-block ml-0.5 opacity-60">↗</span>
          </a>
        );
      }
      return (
        <Link href={href} className={cls} {...rest}>
          {children}
        </Link>
      );
    },
    ul: (p) => <ul {...p} className={cn("my-4 list-disc pl-6 space-y-1.5 text-foreground/85", p.className)} />,
    ol: (p) => <ol {...p} className={cn("my-4 list-decimal pl-6 space-y-1.5 text-foreground/85", p.className)} />,
    li: (p) => <li {...p} className={cn("leading-relaxed", p.className)} />,
    blockquote: (p) => (
      <blockquote
        {...p}
        className={cn(
          "my-6 rounded-r-xl border-l-4 border-primary/50 bg-primary/[0.06] px-5 py-4 text-foreground/90 italic",
          p.className
        )}
      />
    ),
    strong: (p) => <strong {...p} className={cn("text-foreground font-semibold", p.className)} />,
    em: (p) => <em {...p} className={cn("italic text-foreground/90", p.className)} />,
    hr: (p) => <hr {...p} className={cn("my-10 border-white/10", p.className)} />,

    // Inline code
    code: (p) => {
      // Block code handled by rehype-pretty-code via <pre>, inline here
      const isBlock = typeof p.children === "string" && p.children.includes("\n");
      if (isBlock) return <code {...p} />;
      return (
        <code
          {...p}
          className={cn(
            "rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[0.85em] text-primary",
            p.className
          )}
        />
      );
    },

    // Block code (rehype-pretty-code produces <figure><pre data-language=...>)
    pre: (p) => (
      <pre
        {...p}
        className={cn(
          "my-6 overflow-x-auto rounded-xl border border-white/10 bg-[#0B0B1C] px-4 py-4 text-[13px] leading-relaxed [&_code]:grid [&_[data-line]]:px-1 [&_[data-highlighted-line]]:bg-primary/10 [&_[data-highlighted-line]]:border-l-2 [&_[data-highlighted-line]]:border-primary",
          p.className
        )}
      />
    ),

    img: ({ src, alt, ...rest }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src as string}
        alt={(alt as string) ?? ""}
        className="my-6 rounded-xl border border-white/10"
        {...rest}
      />
    ),

    table: (p) => (
      <div className="my-6 overflow-x-auto rounded-xl border border-white/10">
        <table {...p} className={cn("w-full text-sm", p.className)} />
      </div>
    ),
    thead: (p) => <thead {...p} className={cn("bg-white/[0.03]", p.className)} />,
    th: (p) => <th {...p} className={cn("px-3 py-2 text-left text-xs uppercase tracking-wider text-muted-foreground font-medium border-b border-white/10", p.className)} />,
    td: (p) => <td {...p} className={cn("px-3 py-2 border-b border-white/5", p.className)} />,

    // Custom components available in MDX
    Callout,
  };
}

/* ------------------------------------------------------------------ */
/*  Custom MDX component: Callout                                      */
/* ------------------------------------------------------------------ */

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "warn" | "success" | "danger";
  title?: string;
  children: React.ReactNode;
}) {
  const map = {
    info: {
      bg: "bg-primary/5",
      border: "border-primary/25",
      text: "text-primary",
      icon: "ℹ",
    },
    warn: {
      bg: "bg-amber-500/5",
      border: "border-amber-500/25",
      text: "text-amber-400",
      icon: "⚠",
    },
    success: {
      bg: "bg-emerald-500/5",
      border: "border-emerald-500/25",
      text: "text-emerald-400",
      icon: "✓",
    },
    danger: {
      bg: "bg-red-500/5",
      border: "border-red-500/25",
      text: "text-red-400",
      icon: "✕",
    },
  }[type];

  return (
    <div className={cn("my-6 rounded-xl border px-5 py-4", map.bg, map.border)}>
      <div className="flex items-start gap-3">
        <span className={cn("font-bold text-lg leading-none shrink-0", map.text)}>{map.icon}</span>
        <div className="min-w-0 flex-1">
          {title && <p className={cn("font-semibold mb-1", map.text)}>{title}</p>}
          <div className="text-sm text-foreground/85 space-y-2 [&_p]:my-0">{children}</div>
        </div>
      </div>
    </div>
  );
}

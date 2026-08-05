"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

type State = "idle" | "loading" | "success" | "error";

/**
 * Email capture. Posts to `/api/subscribe`. Graceful no-op in dev if
 * the backend isn't configured (the API responds with 200 + dev flag).
 */
export function Newsletter({
  variant = "default",
  className,
}: {
  variant?: "default" | "compact";
  className?: string;
}) {
  const t = useTranslations("newsletter");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setError(null);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? t("errorFallback"));
      setState("success");
      setEmail("");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : t("errorFallback"));
    }
  }

  if (variant === "compact") {
    return (
      <form onSubmit={onSubmit} className={cn("flex gap-2", className)}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("placeholder")}
          required
          disabled={state === "loading" || state === "success"}
          className="h-10 flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm placeholder:text-muted-foreground/60 focus-visible:border-primary outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={state === "loading" || state === "success"}
          className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {state === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : state === "success" ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </form>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:p-8",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full blur-3xl bg-primary/20"
      />

      <div className="relative">
        <p className="text-caption text-primary mb-2">{t("eyebrow")}</p>
        <h3 className="text-xl lg:text-2xl font-semibold tracking-tight">
          {t("title")}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{t("description")}</p>

        <form onSubmit={onSubmit} className="mt-5 flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("placeholder")}
            required
            disabled={state === "loading" || state === "success"}
            className="h-11 flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 outline-none transition-[color,border-color,box-shadow]"
          />
          <button
            type="submit"
            disabled={state === "loading" || state === "success"}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition-colors"
          >
            {state === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("subscribing")}
              </>
            ) : state === "success" ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                {t("subscribed")}
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                {t("subscribe")}
              </>
            )}
          </button>
        </form>

        <AnimatePresence>
          {error && state === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-3 flex items-start gap-2 text-xs text-destructive"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              {error}
            </motion.div>
          )}
          {state === "success" && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-3 text-xs text-emerald-300"
            >
              {t("confirmEmail")}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

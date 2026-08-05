"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TurnstileWidget } from "@/components/turnstile-widget";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const CATEGORY_VALUES = [
  "development",
  "consulting",
  "career",
  "partnership",
  "other",
] as const;

type State = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("form");
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    category: "development",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // If Turnstile is enabled (site key present) require a token
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setState("error");
      setError(t("errors.captchaRequired"));
      return;
    }

    setState("loading");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, turnstileToken }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(payload?.error ?? t("errors.submitFailed"));
      }
      setState("success");
      setForm({ name: "", email: "", company: "", category: "development", message: "" });
      setTurnstileToken(null);
    } catch (err: unknown) {
      setState("error");
      setError(err instanceof Error ? err.message : t("errors.generic"));
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:p-8 backdrop-blur-sm"
    >
      {/* Accent glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 h-60 w-60 rounded-full blur-3xl bg-primary/20"
      />

      <div className="relative grid gap-4">
        {/* Category */}
        <Field label={t("categoryLabel")}>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-1.5">
            {CATEGORY_VALUES.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setForm({ ...form, category: value })}
                className={cn(
                  "rounded-lg border px-3 py-2 text-xs font-medium transition-colors text-left",
                  form.category === value
                    ? "bg-primary/15 text-primary border-primary/35"
                    : "bg-white/[0.03] border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20"
                )}
              >
                {t(`category.${value}`)}
              </button>
            ))}
          </div>
        </Field>

        {/* Name + Email */}
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label={t("name")} required optionalLabel={t("optional")}>
            <Input
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              placeholder={t("placeholder.name")}
              required
              minLength={2}
            />
          </Field>
          <Field label={t("email")} required optionalLabel={t("optional")}>
            <Input
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              placeholder={t("placeholder.email")}
              required
            />
          </Field>
        </div>

        {/* Company */}
        <Field label={t("company")} optional optionalLabel={t("optional")}>
          <Input
            value={form.company}
            onChange={(v) => setForm({ ...form, company: v })}
            placeholder={t("companyPlaceholder")}
          />
        </Field>

        {/* Message */}
        <Field
          label={t("message")}
          required
          hint={t("hint")}
          optionalLabel={t("optional")}
        >
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder={t("placeholder.message")}
            required
            minLength={10}
            rows={6}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 outline-none transition-[color,box-shadow,border-color] resize-none"
          />
        </Field>

        {/* States */}
        <AnimatePresence>
          {error && state === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/5 p-3"
            >
              <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
              <p className="text-xs text-destructive font-medium">{error}</p>
            </motion.div>
          )}
          {state === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex items-start gap-2.5 rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-3"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs text-emerald-300 font-medium">{t("success")}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {TURNSTILE_SITE_KEY && (
          <TurnstileWidget
            siteKey={TURNSTILE_SITE_KEY}
            onVerify={setTurnstileToken}
            className="pt-1"
          />
        )}

        <div className="flex items-center justify-between gap-4 pt-2">
          <p className="text-[11px] text-muted-foreground">{t("consent")}</p>
          <Button
            type="submit"
            variant="gradient"
            size="lg"
            disabled={state === "loading" || state === "success"}
            leftIcon={
              state === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )
            }
          >
            {state === "loading" ? t("sending") : t("submit")}
          </Button>
        </div>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function Field({
  label,
  required,
  optional,
  hint,
  optionalLabel,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  /** Translated "(optional)" suffix - passed by the parent so this helper
   *  stays i18n-agnostic and doesn't need its own useTranslations call. */
  optionalLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="flex items-center gap-1.5 text-xs font-medium">
        {label}
        {required && <span className="text-primary">*</span>}
        {optional && !required && optionalLabel && (
          <span className="text-muted-foreground/60 font-normal">
            ({optionalLabel})
          </span>
        )}
      </span>
      {children}
      {hint && <p className="text-[11px] text-muted-foreground/70">{hint}</p>}
    </label>
  );
}

function Input({
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  minLength,
}: {
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      minLength={minLength}
      className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm placeholder:text-muted-foreground/60 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 outline-none transition-[color,box-shadow,border-color]"
    />
  );
}

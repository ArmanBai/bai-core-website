"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        opts: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "auto" | "light" | "dark";
          appearance?: "always" | "execute" | "interaction-only";
        }
      ) => string;
      remove: (id: string) => void;
      reset: (id?: string) => void;
    };
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/**
 * Drop-in Cloudflare Turnstile widget. Hidden if no site key configured
 * (so local dev without Cloudflare account still works).
 */
export function TurnstileWidget({
  siteKey,
  onVerify,
  className,
}: {
  siteKey: string;
  onVerify: (token: string | null) => void;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);

  // Load Turnstile script once
  useEffect(() => {
    if (!siteKey) return;
    if (window.turnstile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setScriptReady(true);
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => setScriptReady(true));
      return;
    }
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => setScriptReady(true);
    document.head.appendChild(s);
  }, [siteKey]);

  // Render widget once script is ready
  useEffect(() => {
    if (!siteKey || !scriptReady || !ref.current || !window.turnstile) return;
    const el = ref.current;
    const id = window.turnstile.render(el, {
      sitekey: siteKey,
      theme: "dark",
      callback: (token) => onVerify(token),
      "expired-callback": () => onVerify(null),
      "error-callback": () => onVerify(null),
    });
    return () => {
      try {
        window.turnstile?.remove(id);
      } catch {
        /* ignore */
      }
    };
  }, [siteKey, scriptReady, onVerify]);

  if (!siteKey) return null;

  return <div ref={ref} className={className} />;
}

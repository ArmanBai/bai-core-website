/**
 * Error & event monitoring.
 *
 * Backend: Sentry (when NEXT_PUBLIC_SENTRY_DSN is set). Without the DSN
 * Sentry is silently disabled and we fall back to console output, so
 * local dev and fork PRs keep working without external setup.
 *
 * Keep the captureError/captureMessage shape - call sites across the
 * app rely on it.
 */

import * as Sentry from "@sentry/nextjs";

type Context = Record<string, unknown>;

const sentryEnabled = !!process.env.NEXT_PUBLIC_SENTRY_DSN;

export function captureError(error: unknown, context?: Context) {
  const err = error instanceof Error ? error : new Error(String(error));
  if (sentryEnabled) {
    Sentry.captureException(err, context ? { extra: context } : undefined);
    return;
  }
  // eslint-disable-next-line no-console
  console.error("[monitor]", err.message, {
    name: err.name,
    stack: err.stack,
    ...context,
  });
}

export function captureMessage(message: string, context?: Context) {
  if (sentryEnabled) {
    Sentry.captureMessage(message, { level: "warning", extra: context });
    return;
  }
  // eslint-disable-next-line no-console
  console.warn("[monitor]", message, context);
}

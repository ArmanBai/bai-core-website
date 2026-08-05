/**
 * HTML-escape a string for safe inclusion in email/HTML templates.
 * Used by /api/contact to avoid template injection through user input
 * that lands in the Resend email body.
 *
 * Lives in lib/ (not inline in the route) so it's importable from tests.
 */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

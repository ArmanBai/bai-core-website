import { describe, it, expect } from "vitest";
import { escapeHtml } from "./escape-html";

/**
 * The /api/contact route interpolates user input into an HTML email
 * body sent via Resend. escapeHtml is the only thing standing between
 * a malicious submitter and an HTML-injected message landing in our
 * inbox (or, worse, in the Slack webhook). These tests pin the
 * encoding so a future "let's also strip newlines" or similar tweak
 * can't accidentally weaken it.
 */

describe("escapeHtml", () => {
  it("escapes the five canonical entities", () => {
    expect(escapeHtml("&")).toBe("&amp;");
    expect(escapeHtml("<")).toBe("&lt;");
    expect(escapeHtml(">")).toBe("&gt;");
    expect(escapeHtml('"')).toBe("&quot;");
    expect(escapeHtml("'")).toBe("&#039;");
  });

  it("escapes & first so it doesn't double-encode", () => {
    // If we did < before & we'd produce "&amp;lt;" from "<".
    expect(escapeHtml("<&>")).toBe("&lt;&amp;&gt;");
  });

  it("neutralises a script-tag injection", () => {
    const evil = '<script>alert("xss")</script>';
    const out = escapeHtml(evil);
    expect(out).not.toContain("<script>");
    expect(out).not.toContain("</script>");
    expect(out).toBe("&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;");
  });

  it("neutralises an attribute-break injection", () => {
    // Attacker submitting an email that, if interpolated unescaped into
    // an href, would break out of the attribute and inject onerror.
    const evil = `me@e.com" onmouseover="alert(1)`;
    const out = escapeHtml(evil);
    expect(out).not.toContain('"');
    expect(out).toBe("me@e.com&quot; onmouseover=&quot;alert(1)");
  });

  it("preserves plain text and unicode", () => {
    expect(escapeHtml("Привет, мир!")).toBe("Привет, мир!");
    expect(escapeHtml("Жұмыс — тендер")).toBe("Жұмыс — тендер");
    expect(escapeHtml("")).toBe("");
  });

  it("preserves newlines (so <pre> messages still wrap)", () => {
    expect(escapeHtml("line 1\nline 2")).toBe("line 1\nline 2");
  });
});

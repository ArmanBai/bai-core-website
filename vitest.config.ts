import { defineConfig } from "vitest/config";
import path from "node:path";

// Unit test runner. Separate from Playwright e2e (tests/e2e/**) so
// CI runs them without a dev server. Pattern is colocated *.test.ts.
export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

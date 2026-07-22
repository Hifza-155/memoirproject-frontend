import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Picks up the `@/*` alias from tsconfig.json, so tests import modules
  // exactly the way application code does.
  resolve: { tsconfigPaths: true },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    // `lib/config/env.ts` validates at import time and throws when unset, so
    // tests need a value. Pointing at a fake host also guarantees a test that
    // accidentally performs a real request fails loudly.
    env: {
      NEXT_PUBLIC_API_BASE_URL: "http://backend.test",
      NEXT_PUBLIC_API_TIMEOUT_MS: "1000",
    },
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/components/ui/**", "src/**/*.test.{ts,tsx}"],
    },
  },
});

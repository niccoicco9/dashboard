import { defineConfig } from "vitest/config";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/components/skeleton/**/*.tsx"],
    },
  },
  plugins: [
    tailwindcss(),
  ],
});

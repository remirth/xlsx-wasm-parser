import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    dir: "__test__",
    coverage: {
      exclude: ["**/node_modules/**", "**/wasm/**", "**/__test__/**"],
    },
  },
});

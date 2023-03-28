import { join } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    dir: "__test__",
    environmentMatchGlobs: [
      ["**/browser/**", "jsdom"],
      ["**/node/**", "node"],
    ],
    coverage: {
      exclude: ["**/node_modules/**", "**/wasm/**", "**/__test__/**"],
    },
    reporters: "junit",
    outputFile: join(
      "test-results",
      `${process.env["VITEST_JUNIT_SUITE_NAME"] ?? "junit-results"}.xml`
    ),
  },
});

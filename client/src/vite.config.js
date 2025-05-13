/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Allows importing from '@/components/...' etc.
    },
  },
  test: {
    environment: "jsdom", // Enables DOM-like environment for React testing
    globals: true, // Use global test functions without importing
    setupFiles: "./src/setupTests.js", // Pre-test setup (e.g., mocking, global configs)
    include: ["src/**/*.test.{js,jsx,ts,tsx}"], // Test files pattern
    coverage: {
      reporter: ["text", "json", "html"], // Output formats for coverage
      include: ["src/**/*.{js,jsx,ts,tsx}"], // Coverage targets
      exclude: [
        "src/setupTests.js",
        "src/main.jsx", // Exclude bootstrap files if needed
        "**/__mocks__/**", // Exclude mock directories
      ],
    },
    threads: true, // Run tests in parallel
    isolate: true, // Isolate environment per test file
    testTimeout: 10000, // 10 seconds timeout
    mockReset: true, // Reset all mocks between tests
    watch: false, // Optional: disable watch mode for CI/CD
  },
});

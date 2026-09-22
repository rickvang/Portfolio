import { defineConfig } from "@playwright/test";

const baseURL = process.env.E2E_BASE_URL ?? "http://127.0.0.1:3000";
const port = process.env.E2E_PORT ?? "3000";

const webServer = process.env.PW_REUSE_SERVER === "true"
  ? undefined
  : {
      command: `node node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port ${port}`,
      gracefulShutdown: {
        signal: "SIGTERM" as const,
        timeout: 5_000,
      },
      url: baseURL,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    };

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  webServer,
  projects: [
    {
      name: "default",
      testIgnore: /responsive\.spec\.ts/,
    },
    {
      name: "mobile",
      testMatch: /responsive\.spec\.ts/,
      use: { browserName: "chromium", viewport: { width: 390, height: 844 } },
    },
    {
      name: "tablet",
      testMatch: /responsive\.spec\.ts/,
      use: { browserName: "chromium", viewport: { width: 768, height: 1024 } },
    },
  ],
});

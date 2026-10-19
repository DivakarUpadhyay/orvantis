import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3100);
const baseURL = process.env.BASE_URL ?? `http://localhost:${PORT}`;
// Tests run in a visible Chrome window by default; set HEADLESS=1 (or CI) to hide it.
const headless = !!(process.env.CI || process.env.HEADLESS);

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: headless ? undefined : 3,
  timeout: 45_000,
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["json", { outputFile: "playwright-report/results.json" }],
  ],
  use: {
    baseURL,
    channel: "chrome",
    headless,
    launchOptions: { slowMo: headless ? 0 : 120 },
    screenshot: "on",
    trace: "retain-on-failure",
    video: "retain-on-failure",
    contextOptions: { reducedMotion: "reduce" },
  },
  projects: [
    {
      name: "desktop-chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome", viewport: { width: 1440, height: 900 } },
    },
    {
      name: "tablet-chrome",
      use: {
        ...devices["iPad Mini"],
        browserName: "chromium",
        channel: "chrome",
        defaultBrowserType: "chromium",
      },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"], channel: "chrome" },
    },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: `npx next build && npx next start -p ${PORT}`,
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 240_000,
        env: {
          EMAIL_TRANSPORT: "file",
          EMAIL_OUTBOX_DIR: ".outbox-test",
          RATE_LIMIT_MAX: "5",
          NEXT_PUBLIC_SITE_URL: baseURL,
        },
      },
});

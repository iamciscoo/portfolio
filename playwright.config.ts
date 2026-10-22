import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 45000,
  expect: { timeout: 10000 },
  fullyParallel: true,
  workers: 3,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3000",
    launchOptions: {
      executablePath:
        process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ||
        "C:/Program Files/Google/Chrome/Application/chrome.exe",
    },
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:3000/en",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});

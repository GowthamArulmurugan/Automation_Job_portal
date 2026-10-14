const { defineConfig, devices } = require('@playwright/test');
const { getBaseURL, activeEnv } = require('./common/env');

/** Headed Chrome by default locally; set HEADLESS=1 for CI / headless runs. */
const headless = process.env.HEADLESS === '1' || !!process.env.CI;

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: getBaseURL(),
    headless,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  metadata: {
    environment: activeEnv,
    baseURL: getBaseURL(),
    browser: 'chromium',
    headless,
  },
});

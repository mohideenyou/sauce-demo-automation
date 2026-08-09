const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'https://sauce-demo.myshopify.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    navigationTimeout: 30000,
    actionTimeout: 10000,
  },
  projects: [
  {
    name: 'chromium',
    use: {
      ...devices['chromium'],
      headless: false,
    },
  },
  {
    name: 'firefox',
    use: {
      ...devices['firefox'],
      headless: false,
    },
  },
  {
    name: 'webkit',
    use: {
      ...devices['webkit'],
      headless: false,
    },
  },
],
});

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on', // Trace viewer-ийг идэвхжүүлэх
    video: 'on', // Бичлэг хадгалах
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
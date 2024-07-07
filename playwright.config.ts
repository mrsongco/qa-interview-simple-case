import { defineConfig, devices } from '@playwright/test'

export const setupDir = 'playwright/.setup'
export const setupFile = `${setupDir}/user.json`

export default defineConfig({
  projects: [
    // Setup project
    { name: 'setup', testDir: './test-setup/', testMatch: '*.setup.ts' },
    {
      name: 'chromium-login',
      testDir: './tests/login/',
      use: {
        ...devices['Desktop Chrome'],
        // Use "database" with existing accounts
        storageState: setupFile,
      },
      dependencies: ['setup'],
    },
    {
      name: 'chromium-signup',
      testDir: './tests/signUp',
      use: {
        ...devices['Desktop Chrome'],
        // Use "database" with existing accounts
        storageState: setupFile,
      },
      dependencies: ['setup'],
    },
  ],
})

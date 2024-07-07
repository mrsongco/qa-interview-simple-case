import { test as setup } from '@playwright/test'
import { promises as fs } from 'fs'
import { setupDir, setupFile } from '../playwright.config'
import { existingUsers } from '../data/existingUsers'

setup('localStorage', async () => {
  const storageState = {
    cookies: [],
    origins: [
      {
        origin: 'http://localhost:8080',
        localStorage: [
          { name: 'users', value: JSON.stringify({ users: existingUsers }) },
        ],
      },
    ],
  }

  await fs.mkdir(setupDir, { recursive: true })
  await fs.writeFile(setupFile, JSON.stringify(storageState, null, 2))
  console.log('Local storage setup completed successfully')
})

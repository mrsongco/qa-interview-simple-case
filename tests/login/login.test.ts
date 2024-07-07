import { test, expect } from '@playwright/test'
import { existingUsers } from '../../data/existingUsers'

test.describe.configure({ mode: 'serial' })

const login = async (page, email, password) => {
  await page.goto('http://localhost:8080/login')
  await page.waitForTimeout(1000)
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
  await page.locator('#root form div:nth-child(1) > div > input').fill(email)
  await page.locator('#root form div:nth-child(2) > div > input').fill(password)
  const button = page.locator('form .MuiButton-sizeMedium')
  await button.click()
  await page.waitForTimeout(1000)
}

test.describe('login form tests', () => {
  test('logging in works with existing accounts', async ({ page }) => {
    for (const existingUser of existingUsers) { // Decided to use all existing users
      await login(page, existingUser.email, existingUser.password)
      await expect(page.getByText('Log out')).toBeVisible()
    }
  })

  test('logging in fails with incorrect password', async ({ page }) => {
    const existingUser = existingUsers[0] // Decided to use only one existing user for this test case
    await login(page, existingUser.email, 'incorrect-password')
    await expect(page.getByText('Invalid credentials')).toBeVisible()
  })

  test('logging in does not work with non-existing account', async ({ page }) => {
    await login(page, 'non-existingEmail@gmail.com', 'non-existingPassword')
    await expect(page.getByText('Invalid credentials')).toBeVisible()
  })

})

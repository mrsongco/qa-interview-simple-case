import { test, expect } from '@playwright/test'
import { existingUsers } from '../../data/existingUsers'

const newUser = {
    firstname: 'NewTest',
    lastname: 'Newtestsson',
    email: 'newuser@example.com',
    password: 'newpassword',
    }

const signingUp = async (page, firstname, lastname, email, password) => {
  await page.goto('http://localhost:8080/signup')
  await page.waitForTimeout(1000)
  await expect(page.getByRole('heading', { name: 'Become a member' })).toBeVisible()
  await page.locator('#root form div:nth-child(1) > div > input').fill(firstname)
  await page.locator('#root form div:nth-child(2) > div > input').fill(lastname)
  await page.locator('#root form div:nth-child(3) > div > input').fill(email)
  await page.locator('#root form div:nth-child(4) > div > input').fill(password)
  const button = page.locator('form .MuiButton-sizeMedium')
  await button.click()
  await page.waitForTimeout(1000)
}

test.describe('sign-up form tests', () => {
  test('create a new account', async ({ page }) => {
    await signingUp(page, newUser.firstname, newUser.lastname, newUser.email, newUser.password)
    await expect(page.getByText(`Welcome ${newUser.firstname} ${newUser.lastname}`)).toBeVisible()
  })

})

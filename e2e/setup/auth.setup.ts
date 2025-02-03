import { test as setup, expect } from '@playwright/test'

const authFile = 'e2e/.auth/user.json'

setup('auth', async ({ page }) => {
  await page.goto('/sign-in')
  await page.getByLabel('Email').fill(process.env.LOGIN_USERNAME!)
  await page.getByLabel('Password').fill(process.env.LOGIN_PASS!)
  await page.getByRole('button', { name: 'Sign in' }).click()

  await page.waitForURL('/')
  expect(page.url()).toBe('/')
  expect(await page.getByRole('complementary')).toBeVisible()

  await page.context().storageState({ path: authFile })
})

import { test, expect } from '@playwright/test'

test.describe('Explore', () => {
  test('should render the explore page', async ({ page }) => {
    await page.goto('/')
    await page.locator('li').filter({ hasText: 'Explore' }).click()

    await expect(page).toHaveURL('http://localhost:5173/explore')
  })
})

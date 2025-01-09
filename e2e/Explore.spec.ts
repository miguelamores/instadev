import { test, expect } from '@playwright/test'

test.describe('Explore', () => {
  test('should render the explore page', async ({ page }) => {
    await page.goto('/')
    await page.locator('li').filter({ hasText: 'Explore' }).click()

    await expect(page).toHaveURL('/explore')
  })

  test('should show a search input', async ({ page }) => {
    await page.goto('/explore')

    await expect(page.locator('input')).toBeVisible()
  })

  test('should load more results on press load more button', async ({
    page
  }) => {
    await page.goto('/explore')
    const actualResultsNumber = await page.getByRole('list').count()

    await page.locator('button', { hasText: 'Load more' }).click()
    const list = await page.getByRole('listitem').count()
    expect(list).toBeGreaterThan(actualResultsNumber)
  })
})

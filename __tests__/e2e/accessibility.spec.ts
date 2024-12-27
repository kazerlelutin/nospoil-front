import 'dotenv/config'
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const URL = process.env.CUCUMBER_URL_FRONT

test.describe('Accessibility tests', () => {
  test('Login page', async ({ page }) => {
    await page.goto(URL + 'login')
    //const { violations } = await new AxeBuilder({ page }).analyze()
    // expect(violations).toEqual([])
  })
})

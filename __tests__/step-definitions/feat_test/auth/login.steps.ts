import '../../utils/browser.utils.ts'
import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { AxeBuilder } from '@axe-core/playwright'

Given('I am on the login page', async function () {
  await this.page.goto(this.config.getUrl('login'))
  const { violations } = await new AxeBuilder({ page: this.page }).analyze()
  expect(violations).toEqual([])
})

When('I enter my email', async function () {
  await this.page.locator('input#email').click()
})

Then('I should be logged in', async function () {
  await expect(this.page.locator('h1')).toContainText(['Log in or register'])
})

import { Before, After } from '@cucumber/cucumber'
import { chromium } from '@playwright/test'
import 'dotenv/config'

const URL = process.env.CUCUMBER_URL_FRONT

Before(async function () {
  try {
    this.browser = await chromium.launch({ headless: false })
    const context = await this.browser.newContext()
    this.page = await context.newPage()

    this.config = {
      baseUrl: URL,
      getUrl: (path: string) => `${URL}${path}`,
    }

    this.auth = {
      email: process.env.TEST_EMAIL,
    }
  } catch (error) {
    console.error('Error during browser setup:', error)
    throw error
  }
})

After(async function () {
  await this.browser?.close()
})

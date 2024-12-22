import { Given, When, Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'

function isItFriday(today: string) {
  if (today === 'Friday') {
    return 'TGIF'
  } else {
    return 'Nope'
  }
}

Given('today is Sunday', function () {
  this.today = 'Sunday'
})

When("I ask whether it's Friday yet", function () {
  this.actualAnswer = isItFriday(this.today)
})

Then('I should be told {string}', function (expectedAnswer) {
  expect(this.actualAnswer === expectedAnswer).toBeTruthy()
})

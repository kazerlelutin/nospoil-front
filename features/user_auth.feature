Feature: User authentication with OTP

  Background: User is on the login page
    Given I am on the login page

  @critical @otp
  Scenario: I am on the login page
    When I enter my email
    Then I should be logged in

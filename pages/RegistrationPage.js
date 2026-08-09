const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);
    this.registrationForm = page.locator('#create_customer');
    this.createAccountButton = page.locator('input[type="submit"][value="Create"]');
  }

  async open() {
    await this.navigateTo('/account/register');
  }

  async submitEmptyRegistration() {
    await this.createAccountButton.click();
  }

  async expectRegistrationOrChallengePage() {
    await this.expectCurrentPath(/\/account\/register|\/challenge/);
  }

  async expectRegistrationRemainsOpen() {
    await this.expectCurrentPath(/\/account\/register/);
    await expect(this.registrationForm).toBeVisible();
    await expect(this.createAccountButton).toBeVisible();
  }
}

module.exports = { RegistrationPage };

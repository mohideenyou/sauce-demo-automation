const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = page.locator('#customer_email');
    this.passwordInput = page.locator('#customer_password');
    this.signInButton = page.locator('input[type="submit"][value="Sign In"]');
  }

  async open() {
    await this.navigateTo('/account/login');
  }

  async signInWith(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async expectSignInFormVisible() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.signInButton).toBeVisible();
  }

  async expectLoginOrChallengePage() {
    await this.expectCurrentPath(/\/account\/login|\/challenge/);
  }

  async expectNoChallenge() {
    await expect(this.page).not.toHaveURL(/challenge|captcha/i);
  }

  async expectInvalidCredentialsRejected() {
    await this.expectCurrentPath(/\/account\/login/);
    await this.expectNoChallenge();
    await this.expectSignInFormVisible();
  }
}

module.exports = { LoginPage };

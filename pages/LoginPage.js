const { BasePage } = require('./BasePage');

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

  async isSignInFormVisible() {
    return this.emailInput.isVisible();
  }

  async isOnLoginOrChallengePage() {
    return this.isCurrentPath(/\/account\/login|\/challenge/);
  }

  async showsSignInFeedback() {
    const pageText = await this.page.locator('body').innerText();
    return /invalid|incorrect|email|password|sign in/i.test(pageText);
  }

  async isNotBlockedByChallenge() {
    return !/challenge|captcha/i.test(this.page.url());
  }
}

module.exports = { LoginPage };

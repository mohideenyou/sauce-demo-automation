const { BasePage } = require('./BasePage');

class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);
    this.createAccountButton = page.locator('input[type="submit"][value="Create"]');
  }

  async open() {
    await this.navigateTo('/account/register');
  }

  async submitEmptyRegistration() {
    await this.createAccountButton.click();
  }

  async isOnRegistrationOrChallengePage() {
    return this.isCurrentPath(/\/account\/register|\/challenge/);
  }

  async showsRequiredFieldGuidance() {
    const pageText = await this.page.locator('body').innerText();
    return /first name|last name|email|password|create account/i.test(pageText);
  }
}

module.exports = { RegistrationPage };

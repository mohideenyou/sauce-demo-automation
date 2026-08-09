const { expect } = require('@playwright/test');
const { BasePage } = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.logo = page.locator('h1 a img');
  }

  async open() {
    await this.navigateTo('/');
  }

  async expectHomePageOpen() {
    await this.expectCurrentPath(/^\/$/);
  }

  async expectTitle() {
    await expect(this.page).toHaveTitle('Sauce Demo');
  }

  async expectLogoVisible() {
    await expect(this.logo).toBeVisible();
  }
}

module.exports = { HomePage };

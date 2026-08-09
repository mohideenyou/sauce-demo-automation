const { expect } = require('@playwright/test');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(path = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async getTitle() {
    return this.page.title();
  }

  async isCurrentPath(pathPattern) {
    return pathPattern.test(new URL(this.page.url()).pathname);
  }

  async expectCurrentPath(pathPattern) {
    await expect(this.page).toHaveURL((url) => pathPattern.test(url.pathname));
  }

  async isConnectionVerificationDisplayed() {
    return this.page
      .getByRole('heading', { name: /your connection needs to be verified/i })
      .isVisible({ timeout: 1500 })
      .catch(() => false);
  }
}

module.exports = { BasePage };

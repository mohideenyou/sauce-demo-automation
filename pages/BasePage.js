class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(path = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async getTitle() {
    return this.page.title();
  }

  async waitForElement(selector) {
    return this.page.waitForSelector(selector);
  }
}

module.exports = { BasePage };

class BrowserActions {
  constructor(page) {
    this.page = page;
  }

  async goBack() {
    await this.page.goBack({ waitUntil: 'domcontentloaded' });
  }

  async refresh() {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
  }

  async useMobileViewport() {
    await this.page.setViewportSize({ width: 375, height: 667 });
  }
}

module.exports = { BrowserActions };

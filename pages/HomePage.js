const { BasePage } = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.logo = page.locator('h1 a img');
    this.mainMenu = page.locator('#main-menu');
    this.navHome = this.mainMenu.getByRole('link', { name: 'Home', exact: true });
    this.navCatalog = this.mainMenu.getByRole('link', { name: 'Catalog', exact: true });
    this.navAboutUs = this.mainMenu.getByRole('link', { name: 'About Us', exact: true });
    this.cartLink = page.locator('a.desktop:has-text("My Cart")').first();
    this.checkoutLink = page.locator('a:has-text("Check Out")');
    this.loginLink = page.locator('#customer_login_link').first();
  }

  async clickCatalog() {
    await this.navCatalog.click();
  }

  async clickLogin() {
    await this.loginLink.click();
  }

  async openCart() {
    await this.page.goto('/cart', { waitUntil: 'domcontentloaded' });
  }
}

module.exports = { HomePage };

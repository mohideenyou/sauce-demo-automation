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

  async open() {
    await this.navigateTo('/');
  }

  async openCatalog() {
    await this.navCatalog.click();
  }

  async openLogin() {
    await this.loginLink.click();
  }

  async openAboutUs() {
    await this.navAboutUs.click();
  }

  async returnHome() {
    await this.navHome.click();
  }

  async openCart() {
    await this.navigateTo('/cart');
  }

  async returnToPreviousPage() {
    await this.page.goBack({ waitUntil: 'domcontentloaded' });
  }

  async refresh() {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
  }

  async useMobileViewport() {
    await this.page.setViewportSize({ width: 375, height: 667 });
  }

  async isHomePageOpen() {
    return this.isCurrentPath(/^\/$/);
  }

  async isCatalogOpen() {
    return this.isCurrentPath(/^\/collections\/all/);
  }

  async isAboutUsOpen() {
    return this.isCurrentPath(/\/about-us/);
  }

  async isCartOpen() {
    return this.isCurrentPath(/^\/cart/);
  }

  async isLogoVisible() {
    return this.logo.isVisible();
  }

  async isNavigationVisible() {
    return (
      (await this.navHome.isVisible()) &&
      (await this.navCatalog.isVisible()) &&
      (await this.navAboutUs.isVisible())
    );
  }

  async hasCartItemCount(expectedCount) {
    const cartText = await this.cartLink.innerText();
    return new RegExp(`\\(${expectedCount}\\)`).test(cartText);
  }
}

module.exports = { HomePage };

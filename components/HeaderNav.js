const { expect } = require('@playwright/test');

class HeaderNav {
  constructor(page) {
    this.page = page;
    this.mainMenu = page.locator('#main-menu');
    this.homeLink = this.mainMenu.getByRole('link', { name: 'Home', exact: true });
    this.catalogLink = this.mainMenu.getByRole('link', { name: 'Catalog', exact: true });
    this.aboutUsLink = this.mainMenu.getByRole('link', { name: 'About Us', exact: true });
    this.loginLink = page.locator('#customer_login_link').first();
    this.cartLink = page.locator('a.desktop:has-text("My Cart")').first();
  }

  async openCatalog() {
    await this.catalogLink.click();
  }

  async openLogin() {
    await this.loginLink.click();
  }

  async openAboutUs() {
    await this.aboutUsLink.click();
  }

  async returnHome() {
    await this.homeLink.click();
  }

  async openCart() {
    await this.page.goto('/cart', { waitUntil: 'domcontentloaded' });
  }

  async expectNavigationVisible() {
    await expect(this.homeLink).toBeVisible();
    await expect(this.catalogLink).toBeVisible();
    await expect(this.aboutUsLink).toBeVisible();
  }

  async expectCartItemCount(expectedCount) {
    await expect(this.cartLink).toContainText(new RegExp(`\\(${expectedCount}\\)`));
  }

  async expectCatalogOpen() {
    await expect(this.page).toHaveURL(/\/collections\/all/);
  }

  async expectAboutUsOpen() {
    await expect(this.page).toHaveURL(/\/about-us/);
  }

  async expectCartOpen() {
    await expect(this.page).toHaveURL(/\/cart/);
  }
}

module.exports = { HeaderNav };

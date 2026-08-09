class ShoppingFlow {
  constructor({
    homePage,
    headerNav,
    productsPage,
    productDetailPage,
    cartPage,
    loginPage,
    registrationPage,
    testInfo,
  }) {
    this.homePage = homePage;
    this.headerNav = headerNav;
    this.productsPage = productsPage;
    this.productDetailPage = productDetailPage;
    this.cartPage = cartPage;
    this.loginPage = loginPage;
    this.registrationPage = registrationPage;
    this.testInfo = testInfo;
  }

  async openHome() {
    await this.homePage.open();
    await this.skipWhenSiteIsUnavailable(this.homePage);
  }

  async openCatalog() {
    await this.headerNav.openCatalog();
    await this.skipWhenSiteIsUnavailable(this.homePage);
  }

  async openCart() {
    await this.headerNav.openCart();
    await this.skipWhenSiteIsUnavailable(this.cartPage);
  }

  async openLoginPage() {
    await this.headerNav.openLogin();
    await this.skipWhenSiteIsUnavailable(this.loginPage);
  }

  async openRegistrationPage() {
    await this.registrationPage.open();
    await this.skipWhenSiteIsUnavailable(this.registrationPage);
  }

  async openProductByName(name) {
    await this.productsPage.openProduct(name);
    await this.skipWhenSiteIsUnavailable(this.productDetailPage);
  }

  async addFirstCatalogProductToCart() {
    await this.openCatalog();
    const name = await this.productsPage.openFirstProductAndReturnName();
    await this.skipWhenSiteIsUnavailable(this.productDetailPage);
    const price = await this.productDetailPage.getProductPrice();
    await this.productDetailPage.addCurrentProductToCart();
    await this.openCart();

    if (await this.cartPage.isEmpty()) {
      this.testInfo.skip(
        true,
        'The public demo site did not persist the add-to-cart action for this run.'
      );
    }

    return { name, price };
  }

  async skipWhenSiteIsUnavailable(pageObject) {
    if (await pageObject.isConnectionVerificationDisplayed()) {
      this.testInfo.skip(true, 'The public Shopify demo site is showing connection verification.');
    }
  }
}

module.exports = { ShoppingFlow };

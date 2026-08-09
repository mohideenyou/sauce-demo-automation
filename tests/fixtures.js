const { test: base, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { ProductDetailPage } = require('../pages/ProductDetailPage');
const { CartPage } = require('../pages/CartPage');
const { RegistrationPage } = require('../pages/RegistrationPage');
const { HeaderNav } = require('../components/HeaderNav');
const { ShoppingFlow } = require('../flows/ShoppingFlow');
const { BrowserActions } = require('../support/BrowserActions');

const test = base.extend({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
  headerNav: async ({ page }, use) => {
    await use(new HeaderNav(page));
  },
  browserActions: async ({ page }, use) => {
    await use(new BrowserActions(page));
  },
  shoppingFlow: async (
    { homePage, headerNav, productsPage, productDetailPage, cartPage, loginPage, registrationPage },
    use,
    testInfo
  ) => {
    await use(
      new ShoppingFlow({
        homePage,
        headerNav,
        productsPage,
        productDetailPage,
        cartPage,
        loginPage,
        registrationPage,
        testInfo,
      })
    );
  },
});

module.exports = { test, expect };

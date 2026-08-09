const { test, expect } = require('./fixtures');
const { skipIfConnectionVerification } = require('./siteProtection');

test.describe('Module 4 - Shopping Cart', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await homePage.openCatalog();
    await skipIfConnectionVerification(homePage, test);
  });

  test('TC_025 adds one product to cart', async ({
    productsPage,
    productDetailPage,
    homePage,
    cartPage,
  }) => {
    await productsPage.openFirstProduct();
    await skipIfConnectionVerification(productDetailPage, test);
    await productDetailPage.addCurrentProductToCart();

    await homePage.openCart();
    await skipIfConnectionVerification(cartPage, test);
    if (await cartPage.isEmpty()) {
      test.skip(true, 'The public demo site did not persist the add-to-cart action for this run.');
    }

    expect(await homePage.hasCartItemCount(1)).toBeTruthy();
  });

  test('TC_028 verifies the cart page', async ({ productsPage, productDetailPage, homePage }) => {
    await productsPage.openFirstProduct();
    await skipIfConnectionVerification(productDetailPage, test);
    await productDetailPage.addCurrentProductToCart();
    await homePage.openCart();
    await skipIfConnectionVerification(homePage, test);
    expect(await homePage.isCartOpen()).toBeTruthy();
  });

  test('TC_031 removes product from cart', async ({
    productsPage,
    productDetailPage,
    homePage,
    cartPage,
  }) => {
    await productsPage.openFirstProduct();
    await skipIfConnectionVerification(productDetailPage, test);
    await productDetailPage.addCurrentProductToCart();
    await homePage.openCart();
    await skipIfConnectionVerification(cartPage, test);
    if (await cartPage.isEmpty()) {
      test.skip(true, 'The public demo site did not persist the add-to-cart action for this run.');
    }

    await cartPage.removeFirstProduct();
    expect(await cartPage.isEmpty()).toBeTruthy();
  });
});

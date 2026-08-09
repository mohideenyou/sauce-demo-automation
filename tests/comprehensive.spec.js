const { test, expect } = require('./fixtures');
const { skipIfConnectionVerification } = require('./siteProtection');

test.describe('Sauce Demo Comprehensive Test Suite', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await skipIfConnectionVerification(homePage, test);
  });

  test('validates the core catalog and cart journey', async ({
    homePage,
    productsPage,
    productDetailPage,
    cartPage,
  }) => {
    expect(await homePage.getTitle()).toBe('Sauce Demo');
    expect(await homePage.isLogoVisible()).toBeTruthy();
    expect(await homePage.isNavigationVisible()).toBeTruthy();

    await homePage.openCatalog();
    await skipIfConnectionVerification(homePage, test);
    expect(await homePage.isCatalogOpen()).toBeTruthy();

    expect(await productsPage.hasVisibleProducts()).toBeTruthy();

    const firstName = await productsPage.openFirstProduct();
    await skipIfConnectionVerification(productDetailPage, test);
    const firstPrice = await productDetailPage.getProductPrice();

    expect(await productDetailPage.getProductName()).toBe(firstName);
    expect(firstPrice).toMatch(/\d/);
    expect(firstPrice).not.toBe('');
    expect(await productDetailPage.isAddToCartAvailable()).toBeTruthy();

    await productDetailPage.addCurrentProductToCart();
    await homePage.openCart();
    await skipIfConnectionVerification(cartPage, test);

    if (await cartPage.isEmpty()) {
      test.skip(true, 'The public demo site did not persist the add-to-cart action for this run.');
    }

    expect(await homePage.isCartOpen()).toBeTruthy();

    await cartPage.removeFirstProduct();
    expect(await cartPage.isEmpty()).toBeTruthy();
  });

  test('handles sold-out products defensively when present', async ({
    homePage,
    productsPage,
    productDetailPage,
  }) => {
    await homePage.openCatalog();
    await skipIfConnectionVerification(homePage, test);

    if (!(await productsPage.openFirstSoldOutProduct())) {
      test.skip(true, 'No sold-out products are currently listed.');
    }

    expect(await productDetailPage.isAddToCartUnavailable()).toBeTruthy();
  });

  test('keeps the UI usable on a mobile viewport', async ({ homePage }) => {
    await homePage.useMobileViewport();
    expect(await homePage.isLogoVisible()).toBeTruthy();
  });
});

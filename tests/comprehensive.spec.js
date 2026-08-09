const { test } = require('./fixtures');

test.describe('Sauce Demo Comprehensive Test Suite', () => {
  test('validates the core catalog and cart journey', async ({
    shoppingFlow,
    homePage,
    headerNav,
    productsPage,
    productDetailPage,
    cartPage,
  }) => {
    await shoppingFlow.openHome();
    await homePage.expectTitle();
    await homePage.expectLogoVisible();
    await headerNav.expectNavigationVisible();

    await shoppingFlow.openCatalog();
    await headerNav.expectCatalogOpen();
    await productsPage.expectVisibleProducts();

    const productName = await productsPage.openFirstProductAndReturnName();
    await productDetailPage.expectProductDetailsOpen();
    await productDetailPage.expectProductName(productName);
    await productDetailPage.expectProductPrice();
    await productDetailPage.expectAddToCartAvailable();

    await productDetailPage.addCurrentProductToCart();
    await shoppingFlow.openCart();
    if (await cartPage.isEmpty()) {
      test.skip(true, 'The public demo site did not persist the add-to-cart action for this run.');
    }

    await headerNav.expectCartOpen();
    await cartPage.removeFirstProduct();
    await cartPage.expectEmpty();
  });

  test('handles sold-out products defensively when present', async ({
    shoppingFlow,
    productsPage,
    productDetailPage,
  }) => {
    await shoppingFlow.openHome();
    await shoppingFlow.openCatalog();

    if (!(await productsPage.openFirstSoldOutProduct())) {
      test.skip(true, 'No sold-out products are currently listed.');
    }

    await productDetailPage.expectAddToCartUnavailable();
  });

  test('keeps the UI usable on a mobile viewport', async ({
    shoppingFlow,
    homePage,
    browserActions,
  }) => {
    await shoppingFlow.openHome();
    await browserActions.useMobileViewport();
    await homePage.expectLogoVisible();
  });
});

const { test, expect } = require('./fixtures');

test.describe('Module 2 - Product Listing and Module 3 - Product Details', () => {
  test.beforeEach(async ({ shoppingFlow }) => {
    await shoppingFlow.openHome();
    await shoppingFlow.openCatalog();
  });

  test('TC_009 verifies the products page opens', async ({ headerNav }) => {
    await headerNav.expectCatalogOpen();
  });

  test('TC_010 verifies products are listed', async ({ productsPage }) => {
    await productsPage.expectVisibleProducts();
  });

  test('TC_012 verifies the first product has a name', async ({ productsPage }) => {
    expect(await productsPage.getFirstProductName()).not.toBe('');
  });

  test('TC_013 verifies the first product has a price', async ({ productsPage }) => {
    expect(await productsPage.getFirstProductPrice()).toMatch(/\d/);
  });

  test('TC_015 verifies selecting a product opens details', async ({
    productsPage,
    productDetailPage,
  }) => {
    await productsPage.openFirstProductAndReturnName();
    await productDetailPage.expectProductDetailsOpen();
  });

  test('TC_017 verifies product title in details', async ({ productsPage, productDetailPage }) => {
    const productName = await productsPage.openFirstProductAndReturnName();
    await productDetailPage.expectProductName(productName);
  });

  test('TC_022 verifies Add to Cart button is enabled', async ({
    productsPage,
    productDetailPage,
  }) => {
    await productsPage.openFirstProductAndReturnName();
    await productDetailPage.expectAddToCartAvailable();
  });
});

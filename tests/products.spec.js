const { test, expect } = require('./fixtures');
const { skipIfConnectionVerification } = require('./siteProtection');

test.describe('Module 2 - Product Listing and Module 3 - Product Details', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await homePage.openCatalog();
    await skipIfConnectionVerification(homePage, test);
  });

  test('TC_009 verifies the products page opens', async ({ homePage }) => {
    expect(await homePage.isCatalogOpen()).toBeTruthy();
  });

  test('TC_010 verifies products are listed', async ({ productsPage }) => {
    expect(await productsPage.hasVisibleProducts()).toBeTruthy();
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
    await productsPage.openFirstProduct();
    await skipIfConnectionVerification(productDetailPage, test);
    expect(await productDetailPage.isProductDetailsOpen()).toBeTruthy();
  });

  test('TC_017 verifies product title in details', async ({ productsPage, productDetailPage }) => {
    const name = await productsPage.openFirstProduct();
    await skipIfConnectionVerification(productDetailPage, test);
    expect(await productDetailPage.getProductName()).toBe(name);
  });

  test('TC_022 verifies Add to Cart button is enabled', async ({
    productsPage,
    productDetailPage,
  }) => {
    await productsPage.openFirstProduct();
    await skipIfConnectionVerification(productDetailPage, test);
    expect(await productDetailPage.isAddToCartAvailable()).toBeTruthy();
  });
});

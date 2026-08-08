const { test, expect } = require('./fixtures');
const { skipIfConnectionVerification } = require('./siteProtection');

test.describe('Module 2 - Product Listing and Module 3 - Product Details', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate('/collections/all');
    await skipIfConnectionVerification(homePage.page, test);
  });

  test('TC_009 verifies the products page opens', async ({ page }) => {
    await expect(page).toHaveURL(/collections\/all/);
  });

  test('TC_010 verifies products are listed', async ({ productsPage }) => {
    await expect(productsPage.productItems.first()).toBeVisible();
    await expect.poll(() => productsPage.getProductCount()).toBeGreaterThan(0);
  });

  test('TC_012 verifies the first product has a name', async ({ productsPage }) => {
    await expect(productsPage.productNames.first()).not.toHaveText('');
  });

  test('TC_013 verifies the first product has a price', async ({ productsPage }) => {
    await expect(productsPage.productPrices.first()).toContainText(/\d/);
  });

  test('TC_015 verifies clicking a product image opens details', async ({ productsPage, page }) => {
    await productsPage.openFirstProduct();
    await skipIfConnectionVerification(page, test);
    await expect(page).toHaveURL(/products\/.+/);
  });

  test('TC_017 verifies product title in details', async ({ productsPage, productDetailPage }) => {
    const name = await productsPage.openFirstProduct();
    await skipIfConnectionVerification(productDetailPage.page, test);
    await expect(productDetailPage.productTitle).toHaveText(name);
  });

  test('TC_022 verifies Add to Cart button is enabled', async ({ productsPage, productDetailPage }) => {
    await productsPage.openFirstProduct();
    await skipIfConnectionVerification(productDetailPage.page, test);
    await expect(productDetailPage.addToCartButton).toBeEnabled();
  });
});

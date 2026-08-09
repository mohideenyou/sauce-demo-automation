const { test, expect } = require('./fixtures');
const { skipIfConnectionVerification } = require('./siteProtection');

test.describe('Data-driven product coverage', () => {
  test('validates every visible product card opens a matching details page', async ({
    homePage,
    productsPage,
    productDetailPage,
  }) => {
    await homePage.open();
    await homePage.openCatalog();
    await skipIfConnectionVerification(homePage, test);

    const products = await productsPage.getVisibleProducts();
    expect(products.length).toBeGreaterThan(0);

    for (const product of products) {
      await test.step(`validate product details for ${product.name}`, async () => {
        await homePage.open();
        await homePage.openCatalog();
        await skipIfConnectionVerification(homePage, test);

        await productsPage.openProduct(product.name);
        await skipIfConnectionVerification(productDetailPage, test);

        expect(await productDetailPage.getProductName()).toBe(product.name);
        expect(await productDetailPage.getProductPrice()).toMatch(/\d/);

        if (await productDetailPage.isAddToCartUnavailable()) {
          expect(await productDetailPage.isAddToCartUnavailable()).toBeTruthy();
        } else {
          expect(await productDetailPage.isAddToCartAvailable()).toBeTruthy();
        }
      });
    }
  });
});

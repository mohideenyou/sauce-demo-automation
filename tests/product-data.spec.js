const { test, expect } = require('./fixtures');

test.describe('Data-driven product coverage', () => {
  test('validates every visible product card opens a matching details page', async ({
    shoppingFlow,
    productsPage,
    productDetailPage,
  }) => {
    await shoppingFlow.openHome();
    await shoppingFlow.openCatalog();
    const products = await productsPage.getVisibleProducts();
    expect(products.length).toBeGreaterThan(0);

    for (const product of products) {
      await test.step(`validate product details for ${product.name}`, async () => {
        await shoppingFlow.openHome();
        await shoppingFlow.openCatalog();
        await shoppingFlow.openProductByName(product.name);

        await productDetailPage.expectProductName(product.name);
        await productDetailPage.expectProductPrice();
        await productDetailPage.expectValidPurchaseState();
      });
    }
  });
});

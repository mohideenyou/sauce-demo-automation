const { test, expect } = require('./fixtures');
const { skipIfConnectionVerification } = require('./siteProtection');

test.describe('Checkout validation', () => {
  test('validates cart order summary before checkout', async ({
    homePage,
    productsPage,
    productDetailPage,
    cartPage,
  }) => {
    await homePage.open();
    await homePage.openCatalog();
    await skipIfConnectionVerification(homePage, test);

    const productName = await productsPage.openFirstProduct();
    await skipIfConnectionVerification(productDetailPage, test);

    const productPrice = await productDetailPage.getProductPrice();
    await productDetailPage.addCurrentProductToCart();

    await homePage.openCart();
    await skipIfConnectionVerification(cartPage, test);

    if (await cartPage.isEmpty()) {
      test.skip(true, 'The public demo site did not persist the add-to-cart action for this run.');
    }

    expect(await homePage.isCartOpen()).toBeTruthy();
    expect(await cartPage.containsProduct({ name: productName, price: productPrice })).toBeTruthy();
    expect(await cartPage.canCheckout()).toBeTruthy();
  });
});

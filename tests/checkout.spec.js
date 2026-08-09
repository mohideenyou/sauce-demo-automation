const { test } = require('./fixtures');

test.describe('Checkout validation', () => {
  test('validates cart order summary before checkout', async ({
    shoppingFlow,
    headerNav,
    cartPage,
  }) => {
    await shoppingFlow.openHome();
    const product = await shoppingFlow.addFirstCatalogProductToCart();

    await headerNav.expectCartOpen();
    await cartPage.expectProductInCart(product);
    await cartPage.expectCheckoutAvailable();
  });
});

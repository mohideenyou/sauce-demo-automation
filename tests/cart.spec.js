const { test } = require('./fixtures');

test.describe('Module 4 - Shopping Cart', () => {
  test('TC_025 adds one product to cart', async ({ shoppingFlow, headerNav }) => {
    await shoppingFlow.openHome();
    await shoppingFlow.addFirstCatalogProductToCart();
    await headerNav.expectCartItemCount(1);
  });

  test('TC_028 verifies the cart page', async ({ shoppingFlow, headerNav }) => {
    await shoppingFlow.openHome();
    await shoppingFlow.addFirstCatalogProductToCart();
    await headerNav.expectCartOpen();
  });

  test('TC_031 removes product from cart', async ({ shoppingFlow, cartPage }) => {
    await shoppingFlow.openHome();
    await shoppingFlow.addFirstCatalogProductToCart();
    await cartPage.removeFirstProduct();
    await cartPage.expectEmpty();
  });
});

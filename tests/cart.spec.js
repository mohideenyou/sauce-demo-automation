const { test, expect } = require('./fixtures');
const { skipIfConnectionVerification } = require('./siteProtection');

test.describe('Module 4 - Shopping Cart', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate('/collections/all');
  });

  test('TC_025 adds one product to cart', async ({ productsPage, productDetailPage, homePage }) => {
    await productsPage.openFirstProduct();
    await skipIfConnectionVerification(homePage.page, test);
    await productDetailPage.addToCart();
    await expect(homePage.cartLink).toContainText('1');
  });

  test('TC_028 verifies the cart page', async ({ productsPage, productDetailPage, homePage, page }) => {
    await productsPage.openFirstProduct();
    await skipIfConnectionVerification(page, test);
    await productDetailPage.addToCart();
    await homePage.openCart();
    await expect(page).toHaveURL(/cart/);
  });

  test('TC_031 removes product from cart', async ({ productsPage, productDetailPage, homePage, cartPage }) => {
    await productsPage.openFirstProduct();
    await skipIfConnectionVerification(homePage.page, test);
    await productDetailPage.addToCart();
    await homePage.openCart();
    await cartPage.removeItem();
    await expect(cartPage.emptyCartMessage).toBeVisible();
  });
});

const { test, expect } = require('./fixtures');
const { skipIfConnectionVerification } = require('./siteProtection');

test.describe('Sauce Demo Comprehensive Test Suite', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate();
    await skipIfConnectionVerification(homePage.page, test);
  });

  test('validates the core catalog and cart journey', async ({
    homePage,
    productsPage,
    productDetailPage,
    cartPage,
    page,
  }) => {
    await expect(page).toHaveTitle('Sauce Demo');
    await expect(homePage.logo).toBeVisible();
    await expect(homePage.navCatalog).toBeVisible();

    await homePage.clickCatalog();
    await skipIfConnectionVerification(page, test);
    await expect(page).toHaveURL(/collections\/all/);

    await expect(productsPage.productItems.first()).toBeVisible();
    await expect.poll(() => productsPage.getProductCount()).toBeGreaterThan(0);

    const firstName = await productsPage.openFirstProduct();
    await skipIfConnectionVerification(page, test);
    const firstPrice = (await productDetailPage.productPrice.innerText()).trim();

    await expect(productDetailPage.productTitle).toHaveText(firstName);
    await expect(productDetailPage.productPrice).toContainText(/\d/);
    expect(firstPrice).not.toBe('');
    await expect(productDetailPage.addToCartButton).toBeEnabled();

    await productDetailPage.addToCart();
    await expect(homePage.cartLink).toContainText('1');

    await homePage.openCart();
    await expect(page).toHaveURL(/cart/);

    await cartPage.removeItem();
    await expect(cartPage.emptyCartMessage).toBeVisible();
  });

  test('handles sold-out products defensively when present', async ({ homePage, page }) => {
    await homePage.navigate('/collections/all');
    await skipIfConnectionVerification(page, test);

    const soldOutProduct = page.locator('.product').filter({ hasText: /sold out/i }).first();
    if ((await soldOutProduct.count()) === 0) {
      test.skip(true, 'No sold-out products are currently listed.');
    }

    await soldOutProduct.locator('h3').click();
    const addToCart = page.locator('#add');
    const addToCartIsVisible = await addToCart.isVisible();
    const addToCartIsDisabled = addToCartIsVisible ? await addToCart.isDisabled() : true;

    expect(addToCartIsVisible === false || addToCartIsDisabled).toBeTruthy();
  });

  test('keeps the UI usable on a mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('body')).toBeVisible();
  });
});

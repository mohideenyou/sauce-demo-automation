const { test } = require('./fixtures');

test.describe('Module 1 - Home Page and Module 5 - Navigation', () => {
  test.beforeEach(async ({ shoppingFlow }) => {
    await shoppingFlow.openHome();
  });

  test('TC_001 verifies the home page loads successfully', async ({ homePage }) => {
    await homePage.expectHomePageOpen();
  });

  test('TC_002 verifies the page title', async ({ homePage }) => {
    await homePage.expectTitle();
  });

  test('TC_003 verifies the company logo is visible', async ({ homePage }) => {
    await homePage.expectLogoVisible();
  });

  test('TC_004 verifies the navigation menu', async ({ headerNav }) => {
    await headerNav.expectNavigationVisible();
  });

  test('TC_006 verifies About Us page navigation', async ({ headerNav }) => {
    await headerNav.openAboutUs();
    await headerNav.expectAboutUsOpen();
  });

  test('TC_034 navigates Home to Products', async ({ shoppingFlow, headerNav }) => {
    await shoppingFlow.openCatalog();
    await headerNav.expectCatalogOpen();
  });

  test('TC_035 navigates Products to Home', async ({ shoppingFlow, headerNav, homePage }) => {
    await shoppingFlow.openCatalog();
    await headerNav.returnHome();
    await homePage.expectHomePageOpen();
  });

  test('TC_036 supports browser back navigation', async ({
    shoppingFlow,
    homePage,
    browserActions,
  }) => {
    await shoppingFlow.openCatalog();
    await browserActions.goBack();
    await homePage.expectHomePageOpen();
  });

  test('TC_038 refreshes the home page', async ({ homePage, browserActions }) => {
    await browserActions.refresh();
    await homePage.expectHomePageOpen();
  });
});

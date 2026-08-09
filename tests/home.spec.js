const { test, expect } = require('./fixtures');
const { skipIfConnectionVerification } = require('./siteProtection');

test.describe('Module 1 - Home Page and Module 5 - Navigation', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
    await skipIfConnectionVerification(homePage, test);
  });

  test('TC_001 verifies the home page loads successfully', async ({ homePage }) => {
    expect(await homePage.isHomePageOpen()).toBeTruthy();
  });

  test('TC_002 verifies the page title', async ({ homePage }) => {
    expect(await homePage.getTitle()).toBe('Sauce Demo');
  });

  test('TC_003 verifies the company logo is visible', async ({ homePage }) => {
    expect(await homePage.isLogoVisible()).toBeTruthy();
  });

  test('TC_004 verifies the navigation menu', async ({ homePage }) => {
    expect(await homePage.isNavigationVisible()).toBeTruthy();
  });

  test('TC_006 verifies About Us page navigation', async ({ homePage }) => {
    await homePage.openAboutUs();
    await skipIfConnectionVerification(homePage, test);
    expect(await homePage.isAboutUsOpen()).toBeTruthy();
  });

  test('TC_034 navigates Home to Products', async ({ homePage }) => {
    await homePage.openCatalog();
    await skipIfConnectionVerification(homePage, test);
    expect(await homePage.isCatalogOpen()).toBeTruthy();
  });

  test('TC_035 navigates Products to Home', async ({ homePage }) => {
    await homePage.openCatalog();
    await skipIfConnectionVerification(homePage, test);
    await homePage.returnHome();
    expect(await homePage.isHomePageOpen()).toBeTruthy();
  });

  test('TC_036 supports browser back navigation', async ({ homePage }) => {
    await homePage.openCatalog();
    await skipIfConnectionVerification(homePage, test);
    await homePage.returnToPreviousPage();
    expect(await homePage.isHomePageOpen()).toBeTruthy();
  });

  test('TC_038 refreshes the home page', async ({ homePage }) => {
    await homePage.refresh();
    expect(await homePage.isHomePageOpen()).toBeTruthy();
  });
});

const { test, expect } = require('./fixtures');

test.describe('Module 1 - Home Page and Module 5 - Navigation', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate();
  });

  test('TC_001 verifies the home page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL('https://sauce-demo.myshopify.com/');
  });

  test('TC_002 verifies the page title', async ({ homePage }) => {
    await expect.poll(() => homePage.getTitle()).toBe('Sauce Demo');
  });

  test('TC_003 verifies the company logo is visible', async ({ homePage }) => {
    await expect(homePage.logo).toBeVisible();
  });

  test('TC_004 verifies the navigation menu', async ({ homePage }) => {
    await expect(homePage.navHome).toBeVisible();
    await expect(homePage.navCatalog).toBeVisible();
    await expect(homePage.navAboutUs).toBeVisible();
  });

  test('TC_006 verifies About Us page navigation', async ({ homePage, page }) => {
    await homePage.navAboutUs.click();
    await expect(page).toHaveURL(/about-us/);
  });

  test('TC_034 navigates Home to Products', async ({ homePage, page }) => {
    await homePage.clickCatalog();
    await expect(page).toHaveURL(/collections\/all/);
  });

  test('TC_035 navigates Products to Home', async ({ homePage, page }) => {
    await homePage.clickCatalog();
    await homePage.navHome.click();
    await expect(page).toHaveURL('https://sauce-demo.myshopify.com/');
  });

  test('TC_036 supports browser back navigation', async ({ homePage, page }) => {
    await homePage.clickCatalog();
    await page.goBack();
    await expect(page).toHaveURL('https://sauce-demo.myshopify.com/');
  });

  test('TC_038 refreshes the home page', async ({ page }) => {
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL('https://sauce-demo.myshopify.com/');
  });
});

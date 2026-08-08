const { test, expect } = require('./fixtures');

test.describe('Login Module', () => {
  test('verifies the login form accepts credentials', async ({ homePage, loginPage, page }) => {
    const email = process.env.SAUCE_DEMO_EMAIL;
    const password = process.env.SAUCE_DEMO_PASSWORD;

    test.skip(!email || !password, 'Set SAUCE_DEMO_EMAIL and SAUCE_DEMO_PASSWORD to run the login test.');

    await homePage.navigate();
    await homePage.clickLogin();

    await expect(loginPage.emailInput).toBeVisible();
    await loginPage.login(email, password);

    await expect(page).not.toHaveURL(/challenge|captcha/i);
  });
});

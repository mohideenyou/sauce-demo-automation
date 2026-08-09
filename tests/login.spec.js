const { test, expect } = require('./fixtures');
const { skipIfConnectionVerification } = require('./siteProtection');

test.describe('Login Module', () => {
  test('verifies the login form accepts credentials', async ({ homePage, loginPage }) => {
    const email = process.env.SAUCE_DEMO_EMAIL;
    const password = process.env.SAUCE_DEMO_PASSWORD;

    test.skip(
      !email || !password,
      'Set SAUCE_DEMO_EMAIL and SAUCE_DEMO_PASSWORD to run the login test.'
    );

    await homePage.open();
    await skipIfConnectionVerification(homePage, test);
    await homePage.openLogin();
    await skipIfConnectionVerification(loginPage, test);

    expect(await loginPage.isSignInFormVisible()).toBeTruthy();
    await loginPage.signInWith(email, password);

    expect(await loginPage.isNotBlockedByChallenge()).toBeTruthy();
  });
});

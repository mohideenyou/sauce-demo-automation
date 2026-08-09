const { test } = require('./fixtures');

test.describe('Login Module', () => {
  test('verifies the login form accepts credentials', async ({ shoppingFlow, loginPage }) => {
    const email = process.env.SAUCE_DEMO_EMAIL;
    const password = process.env.SAUCE_DEMO_PASSWORD;

    test.skip(
      !email || !password,
      'Set SAUCE_DEMO_EMAIL and SAUCE_DEMO_PASSWORD to run the login test.'
    );

    await shoppingFlow.openHome();
    await shoppingFlow.openLoginPage();
    await loginPage.expectSignInFormVisible();
    await loginPage.signInWith(email, password);
    await loginPage.expectNoChallenge();
  });
});

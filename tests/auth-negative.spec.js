const { test } = require('./fixtures');

test.describe('Negative authentication validation', () => {
  test('keeps the user signed out for invalid login credentials', async ({
    shoppingFlow,
    loginPage,
  }) => {
    await shoppingFlow.openHome();
    await shoppingFlow.openLoginPage();
    await loginPage.signInWith(`invalid.user.${Date.now()}@example.com`, 'WrongPassword123!');

    await loginPage.expectInvalidCredentialsRejected();
  });

  test('keeps registration blocked when required fields are missing', async ({
    shoppingFlow,
    registrationPage,
  }) => {
    await shoppingFlow.openRegistrationPage();
    await registrationPage.submitEmptyRegistration();

    await registrationPage.expectRegistrationRemainsOpen();
  });
});

const { test, expect } = require('./fixtures');
const { skipIfConnectionVerification } = require('./siteProtection');

test.describe('Negative authentication validation', () => {
  test('shows validation for invalid login credentials', async ({ loginPage }) => {
    await loginPage.open();
    await skipIfConnectionVerification(loginPage, test);

    await loginPage.signInWith(`invalid.user.${Date.now()}@example.com`, 'WrongPassword123!');

    expect(await loginPage.isOnLoginOrChallengePage()).toBeTruthy();
    expect(await loginPage.showsSignInFeedback()).toBeTruthy();
  });

  test('keeps registration blocked when required fields are missing', async ({
    registrationPage,
  }) => {
    await registrationPage.open();
    await skipIfConnectionVerification(registrationPage, test);

    await registrationPage.submitEmptyRegistration();

    expect(await registrationPage.isOnRegistrationOrChallengePage()).toBeTruthy();
    expect(await registrationPage.showsRequiredFieldGuidance()).toBeTruthy();
  });
});

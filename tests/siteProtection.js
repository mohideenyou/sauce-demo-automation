async function skipIfConnectionVerification(pageObject, test) {
  if (await pageObject.isConnectionVerificationDisplayed()) {
    test.skip(true, 'The public Shopify demo site is showing connection verification.');
  }
}

module.exports = { skipIfConnectionVerification };

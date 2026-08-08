const VERIFICATION_HEADING = /your connection needs to be verified/i;

async function isConnectionVerificationPage(page) {
  return page
    .getByRole('heading', { name: VERIFICATION_HEADING })
    .isVisible({ timeout: 1500 })
    .catch(() => false);
}

async function skipIfConnectionVerification(page, test) {
  if (await isConnectionVerificationPage(page)) {
    test.skip(true, 'The public Shopify demo site is showing connection verification.');
  }
}

module.exports = { skipIfConnectionVerification };

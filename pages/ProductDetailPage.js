const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

class ProductDetailPage extends BasePage {
  constructor(page) {
    super(page);
    this.productTitle = page.locator('h1[itemprop="name"], h1:not(#logo)').first();
    this.productPrice = page
      .locator('#product-price, .price, h2')
      .filter({ hasText: /\d/ })
      .first();
    this.addToCartButton = page.locator('#add, button:has-text("Add to Cart")').first();
    this.sizeDropdown = page.locator('#product-select-option-0');
    this.colorDropdown = page.locator('#product-select-option-1');
  }

  async getProductName() {
    return (await this.productTitle.innerText()).trim();
  }

  async getProductPrice() {
    return (await this.productPrice.innerText()).trim();
  }

  async expectProductDetailsOpen() {
    await this.expectCurrentPath(/\/products\/.+/);
  }

  async expectProductName(name) {
    await expect(this.productTitle).toHaveText(name);
  }

  async expectProductPrice() {
    await expect(this.productPrice).toContainText(/\d/);
  }

  async expectAddToCartAvailable() {
    await expect(this.addToCartButton).toBeEnabled();
  }

  async expectValidPurchaseState() {
    await expect(this.addToCartButton).toBeVisible();
    await expect
      .poll(async () => {
        const buttonLabel = await this.getAddToCartButtonLabel();
        const isDisabled = await this.addToCartButton.isDisabled();

        return !isDisabled || /sold out/i.test(buttonLabel);
      })
      .toBeTruthy();
  }

  async isSoldOut() {
    return /sold out/i.test(await this.getAddToCartButtonLabel());
  }

  async getAddToCartButtonLabel() {
    const buttonLabel = await this.addToCartButton.inputValue().catch(async () => {
      return this.addToCartButton.textContent();
    });

    return buttonLabel || '';
  }

  async expectAddToCartUnavailable() {
    if (await this.isSoldOut()) {
      await expect(this.addToCartButton).toBeDisabled();
      return;
    }

    await expect(this.addToCartButton).toBeHidden();
  }

  async addCurrentProductToCart() {
    await this.addToCartButton.click();
  }
}

module.exports = { ProductDetailPage };

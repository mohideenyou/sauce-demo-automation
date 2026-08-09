const { BasePage } = require('./BasePage');

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

  async isProductDetailsOpen() {
    return this.isCurrentPath(/\/products\/.+/);
  }

  async isAddToCartAvailable() {
    return this.addToCartButton.isEnabled();
  }

  async isAddToCartUnavailable() {
    const buttonLabel = await this.addToCartButton.inputValue().catch(async () => {
      return this.addToCartButton.textContent();
    });

    return /sold out/i.test(buttonLabel || '') || !(await this.addToCartButton.isEnabled());
  }

  async addCurrentProductToCart() {
    await this.addToCartButton.click();
  }
}

module.exports = { ProductDetailPage };

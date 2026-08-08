const { BasePage } = require('./BasePage');

class ProductDetailPage extends BasePage {
  constructor(page) {
    super(page);
    this.productTitle = page.locator('h1[itemprop="name"], h1:not(#logo)').first();
    this.productPrice = page.locator('#product-price, .price, h2').filter({ hasText: /\d/ }).first();
    this.addToCartButton = page.locator('#add, button:has-text("Add to Cart")').first();
    this.sizeDropdown = page.locator('#product-select-option-0');
    this.colorDropdown = page.locator('#product-select-option-1');
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}

module.exports = { ProductDetailPage };

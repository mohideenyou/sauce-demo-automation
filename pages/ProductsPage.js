const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.productItems = page.locator('[id^="product-"]').filter({ has: page.locator('h3') });
    this.productNames = this.productItems.locator('h3');
    this.productPrices = this.productItems.locator('h4');
  }

  async getProductCount() {
    return this.productItems.count();
  }

  async expectVisibleProducts() {
    await expect(this.productItems.first()).toBeVisible();
    await expect.poll(() => this.getProductCount()).toBeGreaterThan(0);
  }

  async getFirstProductName() {
    return (await this.productNames.first().innerText()).trim();
  }

  async getFirstProductPrice() {
    return (await this.productPrices.first().innerText()).trim();
  }

  async getVisibleProducts() {
    const products = [];
    const productCount = await this.getProductCount();

    for (let index = 0; index < productCount; index += 1) {
      const product = this.productItems.nth(index);
      products.push({
        name: (await product.locator('h3').innerText()).trim(),
        price: (await product.locator('h4').innerText()).trim(),
      });
    }

    return products;
  }

  async openFirstProductAndReturnName() {
    const firstProduct = this.productItems.first();
    const name = (await firstProduct.locator('h3').innerText()).trim();
    await firstProduct.click();
    return name;
  }

  async openProduct(name) {
    await this.productItems.filter({ hasText: name }).first().click();
  }

  async openFirstSoldOutProduct() {
    const soldOutProduct = this.page
      .locator('.product')
      .filter({ hasText: /sold out/i })
      .first();

    if ((await soldOutProduct.count()) === 0) {
      return false;
    }

    await soldOutProduct.locator('h3').click();
    return true;
  }
}

module.exports = { ProductsPage };

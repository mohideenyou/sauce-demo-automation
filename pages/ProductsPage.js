const { BasePage } = require('./BasePage');

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

  async openFirstProduct() {
    const firstProduct = this.productItems.first();
    const name = (await firstProduct.locator('h3').innerText()).trim();
    await firstProduct.click();
    return name;
  }

  async clickProductByName(name) {
    await this.page.locator('.product h3').filter({ hasText: name }).first().click();
  }

  async isSoldOut(name) {
    const product = this.page.locator('.product').filter({ hasText: name });
    return product.locator('.sold-out').isVisible();
  }
}

module.exports = { ProductsPage };

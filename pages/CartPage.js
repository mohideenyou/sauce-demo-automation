const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartItems = page.locator('form[action="/cart"] div.row').filter({
      has: page.locator('input[name="updates[]"]'),
    });
    this.checkoutButton = page.locator('#checkout');
    this.updateButton = page.locator('#update');
    this.emptyCartMessage = page
      .locator('p:visible')
      .filter({ hasText: /your cart is currently empty|cart is empty/i })
      .first();
  }

  async isEmpty() {
    return this.emptyCartMessage.isVisible();
  }

  async containsProduct(product) {
    const cartText = await this.page.locator('body').innerText();
    return cartText.includes(product.name) && cartText.includes(product.price);
  }

  async canCheckout() {
    return (await this.checkoutButton.isVisible()) && (await this.checkoutButton.isEnabled());
  }

  async removeFirstProduct() {
    const index = 0;

    if (await this.emptyCartMessage.isVisible()) {
      return;
    }

    const removeLink = this.page
      .locator('a[href*="/cart/change"], a:has-text("Remove"), button:has-text("Remove")')
      .nth(index);

    if (await removeLink.count()) {
      if (await removeLink.isVisible()) {
        await removeLink.click();
        return;
      }

      const removeHref = await removeLink.getAttribute('href');
      if (removeHref) {
        await this.page.goto(removeHref, { waitUntil: 'domcontentloaded' });
        return;
      }

      return;
    }

    const quantityInput = this.page
      .locator(
        'form[action="/cart"] input[name="updates[]"], form[action="/cart"] input[type="number"]'
      )
      .nth(index);

    if (!(await quantityInput.count())) {
      return;
    }

    await quantityInput.fill('0');
    await this.updateButton.click();
  }
}

module.exports = { CartPage };

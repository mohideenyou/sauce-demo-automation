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

  async removeItem(index = 0) {
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

    await this.updateQuantity(index, 0);
  }

  async updateQuantity(index = 0, quantity) {
    const quantityInput = this.page
      .locator('form[action="/cart"] input[name="updates[]"], form[action="/cart"] input[type="number"]')
      .nth(index);

    if (!(await quantityInput.count())) {
      return;
    }

    await quantityInput.fill(String(quantity));
    await this.updateButton.click();
  }
}

module.exports = { CartPage };

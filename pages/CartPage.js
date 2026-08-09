const { BasePage } = require('./BasePage');
const { expect } = require('@playwright/test');

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

  cartItemByName(name) {
    return this.cartItems.filter({ hasText: name }).first();
  }

  async expectProductInCart({ name, price }) {
    const cartItem = this.cartItemByName(name);
    await expect(cartItem).toBeVisible();
    await expect(cartItem).toContainText(price);
  }

  async expectCheckoutAvailable() {
    await expect(this.checkoutButton).toBeVisible();
    await expect(this.checkoutButton).toBeEnabled();
  }

  async expectEmpty() {
    await expect(this.emptyCartMessage).toBeVisible();
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

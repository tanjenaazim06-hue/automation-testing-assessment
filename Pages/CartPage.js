
import { expect } from '@playwright/test';

export class CartPage {

    constructor(page) {
        this.page = page;
        this.productNames = page.locator('.inventory_item_name');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async verifyThreeProducts() {
        await expect(this.productNames).toHaveText([
            'Sauce Labs Backpack',
            'Sauce Labs Bike Light',
            'Sauce Labs Bolt T-Shirt'
        ]);
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }
}
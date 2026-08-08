import { expect } from '@playwright/test';

export class CheckoutOverviewPage {

    constructor(page) {
        this.page = page;
        this.productNames = page.locator('.inventory_item_name');
        this.itemTotal = page.locator('[data-test="subtotal-label"]');
        this.tax = page.locator('[data-test="tax-label"]');
        this.totalPrice = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }

    async verifyProductNames(expectedNames) {
        await expect(this.productNames).toHaveText(expectedNames);
    }

    async verifyTotalPrice(expectedItemTotal, expectedTax, expectedTotal) {
        await expect(this.itemTotal).toHaveText(
            `Item total: $${expectedItemTotal}`
        );

        await expect(this.tax).toHaveText(
            `Tax: $${expectedTax}`
        );

        await expect(this.totalPrice).toHaveText(
            `Total: $${expectedTotal}`
        );
    }

    async clickFinish() {
        await this.finishButton.click();
    }
}
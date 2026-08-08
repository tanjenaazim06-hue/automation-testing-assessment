import { expect } from '@playwright/test';

export class CompletePage {

    constructor(page) {
        this.page = page;
        this.successMessage = page.locator('[data-test="complete-header"]');
    }

    async verifySuccessfulOrder() {
        await expect(this.successMessage).toHaveText(
            'Thank you for your order!'
        );
    }
}
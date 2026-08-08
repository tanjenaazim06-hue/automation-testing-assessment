import { expect } from '@playwright/test';

export class ProductsPage {

    constructor(page) {
        this.page = page;
        this.backpackButton =
            page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');

        this.bikeLightButton =
            page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');

        this.boltTShirtButton =
            page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');

        this.cartBadge =
            page.locator('[data-test="shopping-cart-badge"]');

        this.cartLink =
            page.locator('[data-test="shopping-cart-link"]');
        
        this.sortDropdown =
            page.locator('[data-test="product-sort-container"]');

        this.inventoryItems =
            page.locator('.inventory_item');
    }

    async addThreeProducts() {
        await this.backpackButton.click();
        await this.bikeLightButton.click();
        await this.boltTShirtButton.click();
    }

    async verifyCartCount(expectedCount) {
        await expect(this.cartBadge).toHaveText(String(expectedCount));
    }

    async openCart() {
        await this.cartLink.click();
    }
    async sortByNameZA() {
        await this.sortDropdown.selectOption('za');
    }

    async addFirstProductToCart() {
        const firstProduct = this.inventoryItems.first();

        const productName = await firstProduct
            .locator('.inventory_item_name')
            .textContent();

        const productPriceText = await firstProduct
            .locator('.inventory_item_price')
            .textContent();
     await firstProduct
            .getByRole('button', { name: 'Add to cart' })
            .click();

        return {
            productName,
            productPrice: Number(productPriceText.replace('$', ''))
        };
    }

}
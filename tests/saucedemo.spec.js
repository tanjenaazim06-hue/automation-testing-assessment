
import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.js';
import { MenuPage } from '../Pages/MenuPage';
import { ProductsPage } from '../Pages/ProductsPage.js';
import { CartPage } from '../Pages/CartPage.js';
import { CheckOutPage } from '../Pages/CheckoutPage.js';
import { CheckoutOverviewPage } from '../Pages/CheckoutOverviewPage.js';
import { CompletePage } from '../Pages/CompletePage.js';


test.describe('SauceDemo Automation Assessment', () => {

    test('Q1 - Verify locked-out user error', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.enterUsername('locked_out_user');
        await loginPage.enterPassword('secret_sauce');
        await loginPage.clickLogin();
        await loginPage.verifyLockedOutError();
    });



test('Q2 - Complete purchase as standard user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckOutPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const completePage = new CompletePage(page);

    await loginPage.goto();
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLogin();

    await expect(page).toHaveURL(/inventory/);

    await menuPage.openMenu();
    await menuPage.resetAppState();
    await menuPage.closeMenu();

    await productsPage.addThreeProducts();
    await productsPage.verifyCartCount(3);
    await productsPage.openCart();

    await expect(page).toHaveURL(/cart/);

    await cartPage.verifyThreeProducts();
    await cartPage.clickCheckout();

    await expect(page).toHaveURL(/checkout-step-one/);

    await checkoutPage.enterCheckoutInformation(
    'Hasan',
    'Mahmud',
    '10111'
    );
    await checkoutPage.clickContinue();
    await expect(page).toHaveURL(/checkout-step-two/);

    await checkoutOverviewPage.verifyProductNames([
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt'
]);

    await checkoutOverviewPage.verifyTotalPrice(
    '55.97',
    '4.48',
    '60.45'
);
    await checkoutOverviewPage.clickFinish();
    await expect(page).toHaveURL(/checkout-complete/);
    await completePage.verifySuccessfulOrder();
    await menuPage.openMenu();
    await menuPage.resetAppState();
    await menuPage.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

test('Q3 - Complete purchase as performance glitch user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckOutPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const completePage = new CompletePage(page);

    await loginPage.goto();
    await loginPage.enterUsername('performance_glitch_user');
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLogin();

    await menuPage.openMenu();
    await menuPage.resetAppState();
    await menuPage.closeMenu();

    await productsPage.sortByNameZA();

    const selectedProduct =
        await productsPage.addFirstProductToCart();

    await productsPage.verifyCartCount(1);
    await productsPage.openCart();
    await cartPage.clickCheckout();
    await checkoutPage.enterCheckoutInformation(
        'Hasan',
        'Mahmud',
        '10111'
    );
    await checkoutPage.clickContinue();

    const itemTotal = selectedProduct.productPrice.toFixed(2);
    const tax = (selectedProduct.productPrice * 0.08).toFixed(2);
    const total = (selectedProduct.productPrice + Number(tax)).toFixed(2);

    await checkoutOverviewPage.verifyProductNames([
    selectedProduct.productName
]);

    await checkoutOverviewPage.verifyTotalPrice(
    itemTotal,
    tax,
    total
);

    await checkoutOverviewPage.clickFinish();
    await completePage.verifySuccessfulOrder();

    await menuPage.openMenu();
    await menuPage.resetAppState();
    await menuPage.logout();

    await expect(page).toHaveURL('https://www.saucedemo.com/');

});

});

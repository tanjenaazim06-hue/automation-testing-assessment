export class MenuPage {

    constructor(page) {
        this.page = page;
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.closeMenuButton = page.locator('#react-burger-cross-btn');
        this.resetAppStateButton = page.locator('#reset_sidebar_link');
        this.logoutButton = page.locator('#logout_sidebar_link');
    }

    async openMenu() {
        await this.menuButton.click();
    }

    async resetAppState() {
        await this.resetAppStateButton.click();
    }

    async closeMenu() {
        await this.closeMenuButton.click();
    }

    async logout() {
        await this.logoutButton.click();
    }
}
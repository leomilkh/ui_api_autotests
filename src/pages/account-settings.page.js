export class AccountSettingsPage {
    constructor(page) {
        this.page = page;
        this.menuLink = page.getByRole('link', { name: 'Account settings' });
    }

    async open() {
        await this.menuLink.click();
    }

    textOnPage(text) {
        return this.page.getByText(text);
    }
}
export class SignupPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.createAccountButton = page.getByRole('button', { name: 'Create account' });
    }
}
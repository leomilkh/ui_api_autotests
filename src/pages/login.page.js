export class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.submitButton = page.getByRole('button', { name: 'Log in' });
        this.signupLink = page.getByRole('link', { name: 'Sign up' });
        this.restoreLink = page.getByRole('link', { name: 'Forgot your password?' });
        this.requiredFieldError = page.getByText('Required field');
        this.invalidEmailError = page.getByText(/Check the email/);
        this.credentialsError = page.getByText('Incorrect email or password').first();
    }

    async open() {
        await this.page.goto('login/');
    }

    async login(credentials) {
        await this.emailInput.fill(credentials.email);
        await this.passwordInput.fill(credentials.password);
        await this.submitButton.click();
    }

    async submit() {
        await this.submitButton.click();
    }

    async openSignup() {
        await this.signupLink.click();
    }

    async openPasswordRestore() {
        await this.restoreLink.click();
    }
}
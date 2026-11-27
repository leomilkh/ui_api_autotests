import { LoginPage } from './login.page.js';
import { SignupPage } from './signup.page.js';
import { RestorePage } from './restore.page.js';
import { AccountSettingsPage } from './account-settings.page.js';

export class App {
    constructor(page) {
        this.login = new LoginPage(page);
        this.signup = new SignupPage(page);
        this.restore = new RestorePage(page);
        this.settings = new AccountSettingsPage(page);
    }
}
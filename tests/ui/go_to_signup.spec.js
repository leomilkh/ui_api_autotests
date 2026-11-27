import { test, expect } from '../../src/fixtures/index.js';

test('User can navigate to signup page from login page', async ({ app, page }) => {
    await app.login.open();
    await app.login.openSignup();

    await expect(page).toHaveURL(/signup/);
    await expect(app.signup.emailInput).toBeVisible();
    await expect(app.signup.createAccountButton).toBeVisible();
});
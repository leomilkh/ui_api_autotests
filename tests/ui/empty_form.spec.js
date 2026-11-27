import { test, expect } from '../../src/fixtures/index.js';

test('Empty login form shows validation errors', async ({ app, page }) => {
    await app.login.open();
    await app.login.submit();

    await expect(app.login.invalidEmailError).toBeVisible();
    await expect(app.login.requiredFieldError).toBeVisible();
    await expect(page).toHaveURL(/login/);
});
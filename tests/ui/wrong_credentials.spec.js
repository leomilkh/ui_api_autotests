import { test, expect } from '../../src/fixtures/index.js';
import { CredentialsBuilder } from '../../src/builders/index.js';

test('User cannot login with wrong password', async ({ app, page }) => {
    const credentials = new CredentialsBuilder().withWrongPassword().build();

    await app.login.open();
    await app.login.login(credentials);

    await expect(app.login.credentialsError).toBeVisible();
    await expect(page).toHaveURL(/login/);
});
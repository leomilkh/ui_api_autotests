import { test, expect } from '../../src/fixtures/index.js';
import { CredentialsBuilder } from '../../src/builders/index.js';

test('User can login with valid credentials and see their email in account settings', async ({ app, page }) => {
    const credentials = new CredentialsBuilder().build();

    await app.login.open();
    await app.login.login(credentials);
    await app.settings.open();

    await expect(page).toHaveURL(/settings\/account/);
    await expect(app.settings.textOnPage(credentials.email)).toBeVisible();
});
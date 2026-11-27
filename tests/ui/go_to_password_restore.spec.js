import { test, expect } from '../../src/fixtures/index.js';

test('User can navigate to password restore page from login page', async ({ app, page }) => {
    await app.login.open();
    await app.login.openPasswordRestore();

    await expect(page).toHaveURL(/restore/);
    await expect(app.restore.emailInput).toBeVisible();
    await expect(app.restore.getInstructionButton).toBeVisible();
});
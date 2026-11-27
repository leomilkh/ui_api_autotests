import { test as base, expect } from '@playwright/test';
import { App } from '../pages/index.js';
import { Api } from '../api/index.js';

export const test = base.extend({
    app: async ({ page }, use) => {
        await use(new App(page));
    },

    api: async ({ playwright, baseURL }, use) => {
        const apiKey = process.env.WAZZUP_API_KEY;
        if (!apiKey) {
            throw new Error('Не задан WAZZUP_API_KEY в файле .env');
        }

        const context = await playwright.request.newContext({
            baseURL,
            extraHTTPHeaders: { Authorization: `Bearer ${apiKey}` },
        });
        const api = new Api(context);

        await use(api);

        await api.webhooks.restore();
        await api.users.deleteCreated();
        await context.dispose();
    },

    anonymousApi: async ({ playwright, baseURL }, use) => {
        const context = await playwright.request.newContext({ baseURL });
        await use(new Api(context));
        await context.dispose();
    },
});

export { expect };
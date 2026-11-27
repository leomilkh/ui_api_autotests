import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['html', { open: 'never' }],
        ['line'],
        ['allure-playwright', { detail: false }],
        ['json', { outputFile: 'playwright-results.json' }],
    ],
    use: {
        screenshot: 'only-on-failure',
        trace: process.env.CI ? 'off' : 'retain-on-failure',
    },
    projects: [
        {
            name: 'ui',
            testDir: './tests/ui',
            use: {
                ...devices['Desktop Chrome'],
                baseURL: 'https://app.wazzup24.com/',
                locale: 'en-US',
            },
        },
        {
            name: 'api',
            testDir: './tests/api',
            use: { baseURL: 'https://api.wazzup24.com/v3/' },
        },
    ],
});
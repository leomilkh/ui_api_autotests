import { test, expect } from '../../src/fixtures/index.js';
import { WebhooksConfigBuilder } from '../../src/builders/index.js';

test('Can connect webhooks and get the settings back', async ({ api }) => {
    const config = new WebhooksConfigBuilder().build();

    const connected = await api.webhooks.connect(config);
    expect(connected.status).toBe(200);

    const current = await api.webhooks.get();
    expect(current.status).toBe(200);
    expect(current.body.webhooksUri).toBe(config.webhooksUri);
    expect(current.body.subscriptions.messagesAndStatuses).toBe(true);
    expect(current.body.subscriptions.channelsUpdates).toBe(true);
    expect(current.body.subscriptions.contactsAndDealsCreation).not.toBe(true);
    expect(current.body.subscriptions.wabaTemplatesStatus).not.toBe(true);
});
import { test } from '@playwright/test';
import { toResult } from './response.js';

export class WebhooksApi {
    constructor(request) {
        this.request = request;
        this.previous = undefined;
        this.connectedUri = undefined;
    }

    async get() {
        return test.step('GET /webhooks', async () => toResult(await this.request.get('webhooks')));
    }

    async connect(config) {
        if (this.previous === undefined) {
            const current = await this.get();
            this.previous = current.status === 200 ? current.body : null;
        }
        this.connectedUri = config.webhooksUri;

        return test.step('PATCH /webhooks', async () =>
            toResult(await this.request.patch('webhooks', { data: config })),
        );
    }

    async restore() {
        if (this.previous === undefined) {
            return;
        }

        const data = this.previous?.webhooksUri
            ? { webhooksUri: this.previous.webhooksUri, subscriptions: this.previous.subscriptions }
            : {
                  webhooksUri: this.connectedUri,
                  subscriptions: {
                      messagesAndStatuses: false,
                      contactsAndDealsCreation: false,
                      channelsUpdates: false,
                      wabaTemplatesStatus: false,
                  },
              };

        await test.step('PATCH /webhooks (возврат прежних настроек)', async () => {
            await this.request.patch('webhooks', { data });
        });
    }
}
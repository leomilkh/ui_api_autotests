export class WebhooksConfigBuilder {
    constructor() {
        this.config = {
            webhooksUri: process.env.WEBHOOKS_URI,
            subscriptions: {
                messagesAndStatuses: true,
                contactsAndDealsCreation: false,
                channelsUpdates: true,
                wabaTemplatesStatus: false,
            },
        };
    }

    build() {
        if (!this.config.webhooksUri) {
            throw new Error('Не задан WEBHOOKS_URI в файле .env');
        }
        return structuredClone(this.config);
    }
}
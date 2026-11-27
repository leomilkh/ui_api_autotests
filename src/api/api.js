import { UsersApi } from './users.api.js';
import { WebhooksApi } from './webhooks.api.js';

export class Api {
    constructor(request) {
        this.users = new UsersApi(request);
        this.webhooks = new WebhooksApi(request);
    }
}
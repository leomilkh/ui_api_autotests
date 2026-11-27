import { test } from '@playwright/test';
import { toResult } from './response.js';

export class UsersApi {
    constructor(request) {
        this.request = request;
        this.createdIds = [];
    }

    async create(users) {
        return test.step('POST /users', async () => {
            this.createdIds.push(...users.filter((user) => user.id).map((user) => user.id));
            return toResult(await this.request.post('users', { data: users }));
        });
    }

    async getList() {
        return test.step('GET /users', async () => toResult(await this.request.get('users')));
    }

    async getById(id) {
        return test.step(`GET /users/${id}`, async () => toResult(await this.request.get(`users/${id}`)));
    }

    async delete(id) {
        return test.step(`DELETE /users/${id}`, async () => toResult(await this.request.delete(`users/${id}`)));
    }

    async deleteCreated() {
        for (const id of this.createdIds) {
            await this.delete(id);
        }
    }
}
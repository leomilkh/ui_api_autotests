import { test, expect } from '../../src/fixtures/index.js';
import { ApiUserBuilder } from '../../src/builders/index.js';

test('Creating a user without Authorization header is rejected', async ({ api, anonymousApi }) => {
    const user = new ApiUserBuilder().build();

    const rejected = await anonymousApi.users.create([user]);
    expect(rejected.status).toBe(401);
    expect(rejected.body).toMatchObject({ status: 401, error: 'INVALID_APIKEY' });

    const list = await api.users.getList();
    expect(list.status).toBe(200);
    expect(list.body.map((item) => item.id)).not.toContain(user.id);
});
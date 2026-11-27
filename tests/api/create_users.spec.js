import { test, expect } from '../../src/fixtures/index.js';
import { ApiUserBuilder } from '../../src/builders/index.js';

test('User list returns created users with their data', async ({ api }) => {
    const users = ApiUserBuilder.buildMany(2);

    const created = await api.users.create(users);
    expect(created.status).toBe(200);

    const list = await api.users.getList();
    expect(list.status).toBe(200);
    expect(Array.isArray(list.body)).toBe(true);

    for (const user of users) {
        const matches = list.body.filter((item) => item.id === user.id);
        expect(matches).toHaveLength(1);
        expect(matches[0]).toMatchObject({ id: user.id, name: user.name });
    }
});
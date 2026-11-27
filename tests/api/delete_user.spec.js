import { test, expect } from '../../src/fixtures/index.js';
import { ApiUserBuilder } from '../../src/builders/index.js';

test('User can be deleted', async ({ api }) => {
    const user = new ApiUserBuilder().build();

    const created = await api.users.create([user]);
    expect(created.status).toBe(200);
    const existing = await api.users.getById(user.id);
    expect(existing.status).toBe(200);

    const deleted = await api.users.delete(user.id);
    expect(deleted.status).toBe(200);

    const list = await api.users.getList();
    expect(list.status).toBe(200);
    expect(list.body.map((item) => item.id)).not.toContain(user.id);
});
import { test, expect } from '../../src/fixtures/index.js';
import { ApiUserBuilder } from '../../src/builders/index.js';

test('User list contains created users and is sorted by name', async ({ api }) => {
    const first = new ApiUserBuilder().withSortableName('A').build();
    const second = new ApiUserBuilder().withSortableName('B').build();

    const created = await api.users.create([second, first]);
    expect(created.status).toBe(200);

    const list = await api.users.getList();
    expect(list.status).toBe(200);
    expect(Array.isArray(list.body)).toBe(true);
    for (const item of list.body) {
        expect(item).toMatchObject({ id: expect.any(String), name: expect.any(String) });
    }

    const ids = list.body.map((item) => item.id);
    expect(ids).toContain(first.id);
    expect(ids).toContain(second.id);
    expect(ids.indexOf(first.id)).toBeLessThan(ids.indexOf(second.id));
});
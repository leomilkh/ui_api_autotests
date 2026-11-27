import { faker } from '@faker-js/faker';

export class ApiUserBuilder {
    constructor() {
        this.user = {
            id: `autotest-${faker.string.uuid()}`,
            name: `Autotest ${faker.person.fullName()}`,
        };
    }

    static buildMany(count) {
        return Array.from({ length: count }, () => new ApiUserBuilder().build());
    }

    withSortableName(letter) {
        this.user.name = `Autotest ${letter} ${faker.string.alphanumeric(6)}`;
        return this;
    }

    build() {
        return { ...this.user };
    }
}
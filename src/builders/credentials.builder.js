import { faker } from '@faker-js/faker';

export class CredentialsBuilder {
    constructor() {
        this.credentials = {
            email: process.env.WAZZUP_UI_EMAIL,
            password: process.env.WAZZUP_UI_PASSWORD,
        };
    }

    withWrongPassword() {
        this.credentials.password = faker.internet.password();
        return this;
    }

    build() {
        return { ...this.credentials };
    }
}
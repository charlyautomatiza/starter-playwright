import { faker } from '@faker-js/faker';

export class UserData {
    public getUsername(): string {
        return `${faker.person.firstName()}${faker.string.numeric(2)}`;
    }

    public getPassword(): string {
        return faker.internet.password();
    }
}

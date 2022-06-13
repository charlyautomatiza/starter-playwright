import { Locator, Page } from '@playwright/test';

export class Login {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly signIn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.locator('(//input[@id="outlined-name"])[1]');
    this.password = page.locator('(//input[@id="outlined-name"])[2]');
    this.signIn = page.locator('(//span[normalize-space()="SIGN IN"])[1]');
  }

  async goto() {
    await this.page.goto('https://charlyautomatiza.github.io/task-management-frontend');
  }

  async sigIn(username:string, password:string) {
    await this.username.type(username);
    await this.password.type(password);
    await this.signIn.click();
  }
}

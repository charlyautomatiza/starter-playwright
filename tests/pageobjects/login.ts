import { Locator, Page } from '@playwright/test';

export class Login {
  readonly page: Page;
  readonly username: Locator;
  readonly password: Locator;
  readonly signIn: Locator;

  constructor(page: Page) {
    this.page = page;
    // Best practice: Use data-test-id attributes for stable, maintainable selectors
    // The framework is configured with testIdAttribute: 'data-test-id' in playwright.config.ts
    // 
    // Preferred approach (when the application has data-test-id attributes):
    // this.username = page.getByTestId('username');
    // this.password = page.getByTestId('password');
    // this.signIn = page.getByTestId('sign-in-button');
    //
    // Current implementation uses fragile XPath selectors as fallback:
    this.username = page.locator('(//input[@id="outlined-name"])[1]');
    this.password = page.locator('(//input[@id="outlined-name"])[2]');
    this.signIn = page.locator('(//span[normalize-space()="SIGN IN"])[1]');
  }

  async goto() {
    await this.page.goto('https://charlyautomatiza.github.io/task-management-frontend');
  }

  async sigIn(username:string, password:string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.signIn.click();
  }
}

import { Locator, Page } from '@playwright/test';

export class Tasks {
  readonly page: Page;
  readonly search: Locator;
  readonly taskTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    // Best practice: Use data-test-id attributes for stable, maintainable selectors
    // The framework is configured with testIdAttribute: 'data-test-id' in playwright.config.ts
    //
    // Preferred approach (when the application has data-test-id attributes):
    // this.search = page.getByTestId('search-input');
    // this.taskTitle = page.getByTestId('task-title');
    //
    // Current implementation uses fragile CSS/XPath selectors as fallback:
    this.search = page.locator('input[placeholder="Search..."]');
    this.taskTitle = page.locator('(//div[@class="MuiCardContent-root"]/h1)[1]');
  }

  async findTask(criteria: string) {
    await this.search.fill(criteria);
    await this.page.waitForLoadState('networkidle');
  }

  async getTaskTitle() {
    return this.taskTitle.innerText();
  }
}

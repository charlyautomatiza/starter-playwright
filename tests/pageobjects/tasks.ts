import { Locator, Page } from '@playwright/test';

export class Tasks {
  readonly page: Page;
  readonly search: Locator;
  readonly taskTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.search = page.locator('input[placeholder="Search..."]');
    this.taskTitle = page.locator('(//div[@class="MuiCardContent-root"]/h1)[1]');
  }

  async findTask(criteria: string) {
    await this.search.type(criteria);
    await this.page.waitForLoadState('networkidle');
  }

  async getTaskTitle() {
    return this.taskTitle.innerText();
  }
}

import { expect, Locator, Page } from '@playwright/test';

export class PlaywrightDevPage {
  readonly page: Page;
  readonly getStartedLink: Locator;
  readonly gettingStaterdTitle: Locator;
  readonly tocList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.locator('text=Get started');
    this.gettingStaterdTitle = page.locator('text=Getting started');
    this.tocList = page.locator('div[class="theme-doc-markdown markdown"] header h1');
  }

  async goto() {
    await this.page.goto('https://playwright.dev');
  }

  async getStarted() {
    await this.getStartedLink.first().click();
    await expect(this.gettingStaterdTitle.first()).toBeVisible();
  }

  async coreConcepts() {
    await this.getStarted();
    await this.page.click('text=Guides');
    await this.gettingStaterdTitle.click();
    await expect(this.page.locator('h1').locator("text=Core concepts")).toBeVisible();
  }
}

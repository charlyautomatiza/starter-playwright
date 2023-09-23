import { test, expect } from '@playwright/test';
import { PlaywrightDevPage } from './pageobjects/playwright-dev-page';

test('basic test without POM', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.locator('text=Get started').click();
});

test('Get Started doc intro', async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.getStarted();
  await expect(playwrightDev.tocList).toContainText('Installation');
});

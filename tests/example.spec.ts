import { test, expect } from '@playwright/test';
import { PlaywrightDevPage } from './pageobjects/playwright-dev-page';

test('basic test without POM', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.locator('text=Get started').click();
  await expect(page).toHaveTitle(/Getting started/);
});

test('Get Started table of contents', async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.goto();
  await playwrightDev.getStarted();
  await expect(playwrightDev.tocList).toHaveText([
    'Installation',
    'First test',
    'Configuration file',
    'Writing assertions',
    'Using test fixtures',
    'Using test hooks',
    'Command line',
    'Configure NPM scripts',
    'Release notes',
  ]);
});

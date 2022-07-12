import os from 'os';
import { playAudit } from 'playwright-lighthouse';
import { test } from '@playwright/test';
import { chromium } from 'playwright';

test('Accessibility test', async ({ page }) => {
    const context = await chromium.launchPersistentContext(os.tmpdir(), {
        args: ['--remote-debugging-port=9222'],
    });
    page = await context.newPage();
    await page.goto('https://www.washington.edu/accesscomputing/AU/before.html');

    await playAudit({
        page: page,
        thresholds: {
            performance: 50,
            accessibility: 50,
            'best-practices': 50,
            seo: 50,
            pwa: 50,
        },
        port: 9222,
        reports: {
            formats: {
              json: true, //defaults to false
              html: true, //defaults to false
              csv: true, //defaults to false
            }
          },
    },
    );
});

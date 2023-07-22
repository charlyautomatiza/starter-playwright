import { playAudit } from 'playwright-lighthouse';
import { test } from '@playwright/test';
import playwright from 'playwright';

test('Accessibility test', async ({ browserName }) => {
    test.skip(browserName !== 'chromium', 'Still working on it');
    const browser = await playwright['chromium'].launch({
        args: ['--remote-debugging-port=9222'],
    });
    const page = await browser.newPage();
    await page.goto('https://www.washington.edu/accesscomputing/AU/before.html');

    await playAudit({
        page: page,
        thresholds: {
            performance: 50,
            accessibility: 50,
            'best-practices': 50,
            seo: 50,
            pwa: 0,
        },
        port: 9222,
        reports: {
            formats: {
              json: true, //defaults to false
              html: true, //defaults to false
              csv: true, //defaults to false
            }
        },
    });

    await browser.close();
});

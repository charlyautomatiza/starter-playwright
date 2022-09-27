import os from 'os';
import { playAudit } from 'playwright-lighthouse';
import { test } from '@playwright/test';
import { chromium } from 'playwright';

test('Accessibility test', async () => {
    const context = await chromium.launchPersistentContext(os.tmpdir(), {
        args: ['--remote-debugging-port=9222'],
    });
    let pageToAudit = await context.newPage();
    await pageToAudit.goto('https://www.washington.edu/accesscomputing/AU/before.html');

    await playAudit({
        page: pageToAudit,
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
    },
    );
});

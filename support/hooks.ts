import {test} from '@playwright/test';

test.beforeEach(async ({page, context}, testInfo) => {
    console.log(`Before Test ${testInfo.title} `);
});

test.afterEach(async ({page, context}, testInfo) => {
    console.log(`After each Test ${testInfo.title} took ${testInfo.duration} ms`);
});

export default test;
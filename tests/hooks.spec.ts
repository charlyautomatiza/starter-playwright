import test from '../support/hooks'

test('basic test without POM @hookTest', async ({page}) => {
    await page.goto('https://playwright.dev');
});

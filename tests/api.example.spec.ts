import { test, expect, APIRequestContext } from '@playwright/test';

// Request context is reused by all tests in the file.
let apiContext: APIRequestContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    // All requests we send go to this API endpoint.
    baseURL: 'https://petstore.swagger.io/',
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
  });
})

test.afterAll(async () => {
  // Dispose all responses.
  await apiContext.dispose();
});

/**
 * Sample API call.
 */
test('get inventory', async () => {
  const inventory = await apiContext.get('/v2/store/inventory');
  expect(inventory.ok()).toBeTruthy();
});

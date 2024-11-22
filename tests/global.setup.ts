import { test as setup, expect, APIRequestContext } from '@playwright/test';

// Request context is reused by all tests in the file.
let apiContext: APIRequestContext;

setup.beforeEach(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    baseURL: 'https://task-mgmt-charlyautomatiza.onrender.com',
    extraHTTPHeaders: {
      Accept: 'application/json',
    },
  });
});

setup.afterEach(async () => {
  // Dispose all responses.
  await apiContext.dispose();
});

// Add a test for Playwright to recognize
setup('verify that the server is active', async () => {
  // Logic to check that the server is active
  const timeout = 5 * 60 * 1000; // 5 minutes in milliseconds
  const interval = 60 * 1000; // Interval of 1 minute in milliseconds
  const startTime = Date.now();
  let response;

  while (Date.now() - startTime < timeout) {
    response = await apiContext.get('/'); // Change the route if necessary
    if (response.ok()) {
      const responseBody = await response.text(); // Get the response body
      expect(response.status()).toBe(200); // Validate that the status is 200
      expect(responseBody).toContain('Hello World!'); // Validate that the text contains "Hello World!"
      console.log('The server is active and responds correctly.');
      return; // Exit the loop if the response is correct
    }
    console.log('Waiting for the server to wake up... Trying again in 1 minute.');
    await new Promise(resolve => setTimeout(resolve, interval)); // Wait 1 minute before the next attempt
  }

  throw new Error('The server did not respond with a status 200 and "Hello World!" in the expected time.'); // Throw an error if the time runs out
});

import { test, expect, APIRequestContext } from '@playwright/test';
import { Login } from './pageobjects/login';
import { UserData } from '../utils/userData';
import usersRaw from '../data/users.json' assert { type: 'json' };
import { UserRequest } from './types/userRequest';

// Request context is reused by all tests in the file.
let apiContext: APIRequestContext;
const userData = new UserData();

test.beforeEach(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    // All requests we send go to this API endpoint.
    baseURL: 'https://task-mgmt-charlyautomatiza.onrender.com',
    extraHTTPHeaders: {
      Accept: 'application/json',
    },
  });
});

test.afterEach(async () => {
  // Dispose all responses.
  await apiContext.dispose();
});

/**
 * This test is a simple smoke test.
*/
test('API SignUp | Login UI', async ({ page }) => {
  // New User
  const username = userData.getUsername();
  const password = userData.getPassword();
  const newUser = await apiContext.post('/auth/signup', {
    data: {
      username,
      password,
    },
  });
  expect(newUser.status()).toEqual(201);

  const login = new Login(page);
  await login.goto();
  await login.sigIn(username, password);
  await page.waitForURL('**/tasks');
});

/**
 * This test is a simple smoke test.
*/
test('Login UI - Data From JSON', async ({ page }) => {
  // New User
  const users: UserRequest[] = usersRaw as UserRequest[];
  const { username } = users[0];
  const { password } = users[0];

  const login = new Login(page);
  await login.goto();
  await login.sigIn(username, password);
  await page.waitForURL('**/tasks');
});

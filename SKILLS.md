# Skills Inventory – Playwright + TypeScript Framework

This document catalogs the technical capabilities available in this repository. It serves as a reference for AI agents and developers to understand what tools and patterns are already established.

---

## 🛠️ Tooling

### Playwright CLI

| Command | Purpose |
|---|---|
| `npx playwright test` | Run the full test suite (headless) |
| `npx playwright test --headed` | Run with visible browser |
| `npx playwright test --ui` | Open the interactive UI Mode |
| `npx playwright test --debug` | Step through tests with the Playwright Inspector |
| `npx playwright codegen <url>` | Record a test session and auto-generate TypeScript code |
| `npx playwright show-trace <path>` | Inspect a recorded trace file in the Trace Viewer |
| `npx playwright show-report` | Open the last HTML test report |
| `npx playwright test --last-failed` | Re-run only tests that failed in the previous run |
| `npx playwright test --shard=N/M` | Run shard N of M for parallel CI execution |

### Reporters

This project is configured with multiple reporters in `playwright.config.ts`:

- **dot** – minimal console output
- **line** – one line per test
- **html** – detailed HTML report (open with `npm run play-report`)
- **allure-playwright** – rich Allure report (open with `npm run open-report`)
- **junit** – XML results for CI integrations (`junit-results/results.xml`)

### Project Setup

The `setup` project (`tests/global.setup.ts`) runs before all browser projects. It verifies the backend API (`https://task-mgmt-charlyautomatiza.onrender.com`) is healthy before any UI tests execute.

```
setup → chromium
setup → firefox
setup → webkit
```

---

## ✅ Assertions

### Web-First Assertions (preferred)

Playwright's `expect` API is auto-retrying. Always prefer these over manual waits:

```typescript
// Verify navigation completed
await expect(page).toHaveURL('**/tasks');

// Verify element text
await expect(locator).toHaveText('Expected Text');
await expect(locator).toContainText('partial text');

// Verify element state
await expect(locator).toBeVisible();
await expect(locator).toBeEnabled();
await expect(locator).toBeChecked();

// Verify list contents
await expect(tocList).toContainText(['Item 1', 'Item 2']);
```

### API Assertions

```typescript
expect(response.status()).toBe(201);
expect(response.ok()).toBeTruthy();
```

### Avoid

- `page.waitForTimeout()` – flaky; use web-first assertions instead.
- `page.waitForSelector()` – replaced by locator auto-waiting.
- `element.innerText()` for assertions – use `expect(locator).toHaveText()` instead.

---

## 🌐 Network

### API Testing with `APIRequestContext`

Direct API calls are made using `playwright.request.newContext()`. The `baseURL` for the API is set per-context (see `tests/global.setup.ts` and `tests/api.ui.spec.ts`; the URL is stored as `process.env.API_BASE_URL` or hard-coded in those files and must be moved to `.env` for different environments). The pattern used in this project:

```typescript
let apiContext: APIRequestContext;

test.beforeEach(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    baseURL: 'https://task-mgmt-charlyautomatiza.onrender.com',
    extraHTTPHeaders: { Accept: 'application/json' },
  });
});

test.afterEach(async () => {
  await apiContext.dispose();
});
```

### Network Interception with `page.route`

Intercept and mock network requests to isolate UI tests from the backend:

```typescript
// Mock a GET endpoint
await page.route('**/tasks', async route => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([{ id: '1', title: 'Mocked Task' }]),
  });
});

// Abort specific requests
await page.route('**/*.{png,jpg}', route => route.abort());

// Modify a request before it is sent
await page.route('**/auth/signin', async route => {
  const request = route.request();
  await route.continue({ headers: { ...request.headers(), 'X-Custom': 'value' } });
});
```

---

## 📐 Page Object Model

Page Objects are located in `tests/pageobjects/`. Each class receives a `Page` instance in its constructor and exposes typed `Locator` properties:

```typescript
import { Locator, Page } from '@playwright/test';

export class Login {
  readonly page: Page;
  readonly username: Locator;
  // ...

  constructor(page: Page) {
    this.page = page;
    this.username = page.getByLabel('Username');
  }
}
```

---

## 🧩 Fixtures

The project uses the native `test` object from `@playwright/test` directly. To extend fixtures for shared state (e.g., authenticated pages), use:

```typescript
import { test as base } from '@playwright/test';
import { Login } from './pageobjects/login';

type Fixtures = { login: Login };

export const test = base.extend<Fixtures>({
  login: async ({ page }, use) => {
    const login = new Login(page);
    await login.goto();
    await use(login);
  },
});
```

---

## 🔒 Environment Variables

Sensitive values are loaded via `dotenv` (`import 'dotenv/config'` in `playwright.config.ts`). Use a `.env` file (see `.env.example`) and never commit secrets. In CI, set variables as GitHub Actions secrets:

```yaml
env:
  API_KEY: ${{ secrets.API_KEY }}
```

---

## ♿ Accessibility Testing

Accessibility audits are run with `playwright-lighthouse`:

```bash
npm run a11y
```

Thresholds are configured per-audit inside `tests/a11y.lighthouse.spec.ts`.

---

## 📦 Key Dependencies

| Package | Version | Purpose |
|---|---|---|
| `@playwright/test` | `^1.55.0` | Test runner, browser automation |
| `allure-playwright` | `^3.4.1` | Allure reporter integration |
| `allure-commandline` | `^2.34.1` | Allure CLI for report generation |
| `playwright-lighthouse` | `^4.0.0` | Lighthouse accessibility audits |
| `lighthouse` | `^12.8.2` | Underlying Lighthouse engine |
| `@faker-js/faker` | `^10.0.0` | Test data generation |
| `dotenv` | `^17.2.2` | Environment variable loading |
| `typescript` | `^5.9.2` | TypeScript compiler |

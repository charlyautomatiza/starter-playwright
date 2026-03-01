# Skill: Network Interception and Mocking

Intercept, inspect, modify, or mock HTTP requests and responses at the browser level using `page.route()`, without running a separate mock server.

## When to Use

- You want to isolate a UI test from a real backend or third-party service.
- You need to simulate error responses (4xx / 5xx) or edge-case payloads.
- You want to speed up tests by replacing slow API calls with instant in-memory responses.
- You need to verify that the browser sends the correct request (method, headers, body).

## Steps

### Mock a GET endpoint

```typescript
await page.route('**/api/tasks', async route => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([{ id: '1', title: 'Mocked Task' }]),
  });
});

await page.goto('/tasks');
```

### Simulate an error response

```typescript
await page.route('**/api/tasks', route =>
  route.fulfill({ status: 500, body: 'Internal Server Error' })
);
```

### Abort specific request types (e.g., images)

```typescript
await page.route('**/*.{png,jpg,gif,webp}', route => route.abort());
```

### Modify a request before it is sent

```typescript
await page.route('**/api/signin', async route => {
  const request = route.request();
  await route.continue({
    headers: {
      ...request.headers(),
      'X-Custom-Header': 'value',
    },
  });
});
```

### Intercept and inspect without modifying

```typescript
page.on('request', request => {
  if (request.url().includes('/api/')) {
    console.log('→', request.method(), request.url());
  }
});

page.on('response', response => {
  if (response.url().includes('/api/')) {
    console.log('←', response.status(), response.url());
  }
});
```

### Remove a route handler after use

```typescript
const handler = async (route: Route) => {
  await route.fulfill({ status: 200, body: '{}' });
};

await page.route('**/api/data', handler);
// ... run relevant test steps ...
await page.unroute('**/api/data', handler);
```

### Make direct API calls (no browser)

Use `playwright.request.newContext()` for pure API tests that don't need a browser:

```typescript
let apiContext: APIRequestContext;

test.beforeEach(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    baseURL: process.env.API_BASE_URL ?? 'https://your-api.example.com',
    extraHTTPHeaders: { Accept: 'application/json' },
  });
});

test.afterEach(async () => {
  await apiContext.dispose();
});

test('create a resource', async () => {
  const response = await apiContext.post('/items', { data: { name: 'New Item' } });
  expect(response.status()).toBe(201);
});
```

## Expected Output

- Mocked routes return the configured response immediately; the browser never sends the real network request.
- Request/response event listeners log traffic to the console without altering it.
- `apiContext` calls return standard `APIResponse` objects with `.status()`, `.json()`, `.text()`, and `.ok()` helpers.

## Notes

- Route patterns support glob (`**`) wildcards and exact URL strings.
- Register routes **before** `page.goto()` so the browser's initial requests are already intercepted.
- Always call `apiContext.dispose()` in `afterEach` to release connection pools.
- Avoid `page.route()` in tests that are specifically validating real network behaviour (e.g., contract tests).

# Skill: Web-First Assertions

Write auto-retrying assertions that wait for the expected condition to become true, eliminating the need for explicit waits or sleep calls.

## When to Use

- Verifying that a page, element, or value reaches an expected state after an action.
- Replacing `page.waitForTimeout()`, `page.waitForSelector()`, or manual polling loops.
- Any assertion in a Playwright test that targets the DOM or browser state.

## Steps

### Assert page-level state

```typescript
// URL matches a pattern
await expect(page).toHaveURL(/\/dashboard/);
await expect(page).toHaveURL('https://example.com/tasks');

// Page title
await expect(page).toHaveTitle('My App');
```

### Assert element visibility and state

```typescript
const button = page.getByRole('button', { name: 'Submit' });

await expect(button).toBeVisible();
await expect(button).toBeEnabled();
await expect(button).toBeDisabled();
await expect(button).toBeChecked();          // checkboxes / radios
await expect(button).toBeFocused();
```

### Assert element content

```typescript
const heading = page.getByRole('heading');

await expect(heading).toHaveText('Welcome');           // exact match
await expect(heading).toContainText('Welcome');        // partial match
await expect(heading).toHaveAttribute('aria-label', 'Page title');
await expect(heading).toHaveClass(/active/);
```

### Assert list contents

```typescript
const listItems = page.getByRole('listitem');

await expect(listItems).toHaveCount(3);
await expect(listItems).toContainText(['Item A', 'Item B', 'Item C']);
```

### Assert input values

```typescript
const input = page.getByLabel('Email');

await expect(input).toHaveValue('user@example.com');
```

### Assert API responses

```typescript
const response = await apiContext.post('/auth/signup', { data: payload });

expect(response.status()).toBe(201);
expect(response.ok()).toBeTruthy();
```

### Adjust the assertion timeout when needed

```typescript
// Wait up to 10 seconds for this specific assertion
await expect(locator).toBeVisible({ timeout: 10_000 });
```

## Expected Output

The assertion passes silently. If the condition is not met within the configured `expect.timeout` (default: 5000 ms), the test fails with a descriptive diff showing the actual vs. expected value.

## Notes

- All `expect(locator).*` assertions auto-retry until the condition is true or the timeout expires — no `waitForTimeout()` or `waitForSelector()` needed.
- Avoid extracting values with `locator.innerText()` / `locator.textContent()` and then asserting on them; this creates a race condition. Use `expect(locator).toHaveText()` instead.
- The global `expect.timeout` is set in `playwright.config.ts` (`expect: { timeout: 5000 }`); increase it for slow environments rather than adding manual waits.

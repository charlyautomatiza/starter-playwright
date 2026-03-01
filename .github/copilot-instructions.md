# GitHub Copilot Instructions – Playwright + TypeScript Framework

These rules guide GitHub Copilot suggestions for this repository. They ensure generated code is consistent with the project's conventions, resilient, and maintainable.

---

## 🛠️ Tool Usage

- **Always** suggest Playwright CLI commands for debugging instead of adding `console.log` statements:
  ```bash
  # Step through a specific test
  npx playwright test tests/ui.example.spec.ts --debug

  # Open the interactive UI mode
  npx playwright test --ui

  # Inspect a trace from a failed run
  npx playwright show-trace test-results/<test-name>/trace.zip

  # Record a new test flow (use the baseURL from playwright.config.ts)
  npx playwright codegen $BASE_URL
  ```
- When a test is flaky, suggest inspecting the trace before adding retries.
- Prefer `npx playwright test --last-failed` to quickly re-run only the broken tests.

---

## 🔍 Modern Locators (mandatory)

- **Prohibited:** `page.$()`, `page.$$()`, `page.$eval()`, `page.$$eval()`. These are deprecated and must not be used.
- **Prohibited:** Long XPath chains (e.g., `//div[@class="..."]/h1`). Replace with semantic locators.
- **Required:** Use the Locator API exclusively. Priority order:

  | Priority | Method | When to use |
  |---|---|---|
  | 1 | `page.getByRole()` | Buttons, links, headings, inputs with ARIA roles |
  | 2 | `page.getByLabel()` | Form fields with associated `<label>` |
  | 3 | `page.getByPlaceholder()` | Inputs without a label |
  | 4 | `page.getByText()` | Elements identified by visible text |
  | 5 | `page.getByTestId()` | Elements with `data-testid` attributes |
  | 6 | `page.locator('css')` | Last resort; document why semantic locators don't apply |

  **Examples (this project):**
  ```typescript
  // ❌ Avoid
  page.locator('(//input[@id="outlined-name"])[1]')
  page.locator('(//span[normalize-space()="SIGN IN"])[1]')

  // ✅ Prefer
  page.getByLabel('Username')
  page.getByRole('button', { name: 'SIGN IN' })
  page.getByPlaceholder('Search...')
  ```

---

## 🏗️ Test Structure

- **Fixtures pattern:** Do NOT instantiate `new Page()` or call `browser.newPage()` inside tests. Always receive `page` through the test fixture parameter:
  ```typescript
  // ❌ New Page Pattern – avoid
  test('my test', async ({ browser }) => {
    const page = await browser.newPage();
    // ...
  });

  // ✅ Fixture pattern – always use this
  test('my test', async ({ page }) => {
    const login = new Login(page);
    // ...
  });
  ```

- **Page Objects:** Place new page object classes in `tests/pageobjects/`. Follow the existing pattern: typed `Locator` properties set in the constructor, async methods for interactions.

- **Types:** Place TypeScript interfaces/types in `tests/types/`.

- **Setup:** Tests requiring a live backend should depend on the `setup` project defined in `playwright.config.ts`. Do not add manual `page.waitForTimeout()` calls; instead, use web-first assertions or the `waitForURL`/`waitForLoadState` helpers.

---

## ✅ Assertions

- **Always** use web-first `expect` assertions (auto-retrying):
  ```typescript
  // ✅ Web-first – auto-retries until timeout
  await expect(page).toHaveURL('**/tasks');
  await expect(locator).toBeVisible();
  await expect(locator).toHaveText('My Task');

  // ❌ Avoid – not auto-retrying, can produce false negatives
  const text = await locator.innerText();
  expect(text).toBe('My Task');
  ```
- Never use `page.waitForTimeout()` in assertions. Use `expect` with appropriate timeouts if needed:
  ```typescript
  await expect(locator).toBeVisible({ timeout: 10_000 });
  ```

---

## 🌐 Network & API

- Use `playwright.request.newContext()` for API calls; always `dispose()` in `afterEach`.
- Prefer `page.route()` for mocking over external mock servers:
  ```typescript
  await page.route('**/tasks', route =>
    route.fulfill({ status: 200, body: JSON.stringify([]) })
  );
  ```

---

## 📋 Reporting

- Do not remove or change the reporters array in `playwright.config.ts`. The project uses `allure-playwright`, `html`, `junit`, and console reporters simultaneously.
- After a CI failure, always check the uploaded `playwright-test-results` and `allure-test-results` artefacts before making code changes.

---

## 🔒 Security

- Never hard-code credentials, tokens, or API keys in test files.
- Use environment variables via `.env` (locally) and GitHub Actions secrets (CI).
- Reference the `.env.example` file for the expected variable names.

# AI Agents for Playwright Framework

This document defines the AI agent roles available in this repository to assist developers leveraging MCP (Model Context Protocol) and GitHub Copilot for test automation tasks.

---

## 🤖 CLI Automator Agent

**Purpose:** Expert in using Playwright CLI commands to diagnose failures, record sessions, and inspect test artefacts.

**Key Capabilities:**

- Run and debug tests interactively:
  ```bash
  npx playwright test --debug
  npx playwright test --ui
  ```
- Generate test code from browser interactions (use the `baseURL` configured in `playwright.config.ts`):
  ```bash
  npx playwright codegen $BASE_URL
  # e.g. npx playwright codegen https://charlyautomatiza.github.io/task-management-frontend
  ```
- Inspect trace files after a failed run:
  ```bash
  npx playwright show-trace test-results/<test-name>/trace.zip
  ```
- Re-run only failed tests:
  ```bash
  npx playwright test --last-failed
  ```

**Project context:** Tests live in `tests/`, configuration is in `playwright.config.ts`. The `setup` project (`tests/global.setup.ts`) must pass before browser projects (`chromium`, `firefox`, `webkit`) run.

---

## 🔍 Locator Optimizer Agent

**Purpose:** Specialist in converting fragile CSS/XPath selectors into resilient, user-facing Playwright Locators.

**Key Capabilities:**

- Replace brittle XPath expressions (currently present in `tests/pageobjects/login.ts` and `tests/pageobjects/tasks.ts`) with semantic locators:
  | Legacy (avoid) | Modern replacement |
  |---|---|
  | `page.locator('(//input[@id="outlined-name"])[1]')` | `page.getByLabel('Username')` |
  | `page.locator('(//input[@id="outlined-name"])[2]')` | `page.getByLabel('Password')` |
  | `page.locator('(//span[normalize-space()="SIGN IN"])[1]')` | `page.getByRole('button', { name: 'SIGN IN' })` |
  | `page.locator('input[placeholder="Search..."]')` | `page.getByPlaceholder('Search...')` |
  | `page.locator('(//div[@class="MuiCardContent-root"]/h1)[1]')` | `page.getByRole('heading').first()` |

- Prioritise locator strategies in this order:
  1. `getByRole` – reflects ARIA semantics
  2. `getByLabel` – tied to accessible form labels
  3. `getByPlaceholder` – for unlabelled inputs
  4. `getByText` / `getByTestId` – for content or custom `data-testid` attributes
  5. `locator('css')` – only when no semantic alternative exists

- Use `codegen` to auto-discover the best locator for any element:
  ```bash
  npx playwright codegen --target typescript https://charlyautomatiza.github.io/task-management-frontend
  ```

**Project context:** Page Object Models are in `tests/pageobjects/`. Types are in `tests/types/`.

---

## ⚙️ CI/CD Engineer Agent

**Purpose:** Focused on optimising test execution speed and reliability in the GitHub Actions pipeline (`playwright.yml`).

**Key Capabilities:**

- Enable parallel execution and sharding for large test suites:
  ```bash
  # Run shard 1 of 4
  npx playwright test --shard=1/4
  ```
- Tune `playwright.config.ts` for CI:
  ```typescript
  workers: process.env.CI ? 4 : undefined,
  retries: process.env.CI ? 2 : 0,
  ```
- Manage project dependencies (`setup` → `chromium`/`firefox`/`webkit`) to avoid redundant setup work.
- Upload and download trace artefacts in CI:
  ```yaml
  - uses: actions/upload-artifact@v4
    with:
      name: playwright-traces
      path: test-results/
  ```
- Merge sharded reports into a single HTML report:
  ```bash
  npx playwright merge-reports --reporter html ./all-blob-reports
  ```

**Project context:** CI workflow is at `.github/workflows/playwright.yml`. The project uses `allure-playwright` and a JUnit reporter in addition to the default HTML reporter.

---

## How Agents Collaborate via MCP

When using an MCP-enabled editor (e.g., VS Code with the Playwright MCP server), agents can:

1. **CLI Automator** triggers `codegen` to capture live locators.
2. **Locator Optimizer** receives those locators and rewrites Page Object files to use the semantic API.
3. **CI/CD Engineer** validates the updated tests pass in a sharded run before merging.

Each agent communicates through the shared project context (`playwright.config.ts`, `tests/`, `utils/`) without requiring manual handoff.

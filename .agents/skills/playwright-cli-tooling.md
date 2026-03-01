# Skill: Playwright CLI Tooling

Use the Playwright command-line interface to run, debug, record, and inspect tests without writing additional code.

## When to Use

- You need to run or filter tests from the terminal.
- A test is failing and you want to step through it interactively.
- You want to generate test code by recording real browser interactions.
- You need to inspect what happened during a failed test run.

## Steps

### Run tests

```bash
# Run all tests (headless)
npx playwright test

# Run a specific file
npx playwright test path/to/spec.ts

# Run tests matching a title pattern
npx playwright test -g "login"

# Run on a specific browser project
npx playwright test --project=chromium

# Run with browser visible
npx playwright test --headed
```

### Debug interactively

```bash
# Open the Playwright Inspector for a specific test
npx playwright test path/to/spec.ts --debug

# Open the interactive UI Mode (run, filter, and time-travel debug)
npx playwright test --ui
```

### Record a new test

```bash
# Open a browser with the Recorder panel active
npx playwright codegen <url>

# Target TypeScript output explicitly
npx playwright codegen --target typescript <url>
```

Interact with the browser normally; all actions are transcribed into test code in real time.

### Inspect a trace after failure

```bash
# View a recorded trace file
npx playwright show-trace path/to/trace.zip
```

The Trace Viewer shows a screenshot timeline, DOM snapshots, network requests, and console logs for every test step.

### Re-run and shard

```bash
# Re-run only tests that failed in the previous run
npx playwright test --last-failed

# Run shard N of M (for parallel CI execution)
npx playwright test --shard=1/4
```

### Open the HTML report

```bash
npx playwright show-report
```

## Expected Output

- `--debug` / `--ui`: Browser opens with the Playwright Inspector or UI Mode panel.
- `codegen`: Browser opens with a recorder sidebar; closing it prints the captured TypeScript.
- `show-trace`: Trace Viewer opens in the default browser.
- `show-report`: HTML report opens in the default browser.

## Notes

- Prefer `--debug` and `show-trace` over adding `console.log` statements when diagnosing failures.
- Use `--last-failed` during local development to iterate quickly on broken tests.
- Sharding requires a subsequent `npx playwright merge-reports` step to consolidate reports.

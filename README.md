<p align="center">
  <a href="https://www.twitch.tv/charlyautomatiza"><img alt="Twitch" src="https://img.shields.io/badge/CharlyAutomatiza-Twitch-9146FF.svg" style="max-height: 300px;"></a>
  <a href="https://discord.gg/wwM9GwxmRZ"><img alt="Discord" src="https://img.shields.io/discord/944608800361570315" style="max-height: 300px;"></a>
  <a href="http://twitter.com/char_automatiza"><img src="https://img.shields.io/badge/@char__automatiza-Twitter-1DA1F2.svg?style=flat" style="max-height: 300px;"></a>
  <a href="https://www.youtube.com/c/CharlyAutomatiza?sub_confirmation=1"><img src="https://img.shields.io/badge/CharlyAutomatiza-Youtube-FF0000.svg" style="max-height: 300px;" style="max-height: 300px;"></a>
  <a href="https://www.linkedin.com/in/gautocarlos/"><img src="https://img.shields.io/badge/Carlos%20 Gauto-LinkedIn-0077B5.svg" style="max-height: 300px;" style="max-height: 300px;"></a>
</p>

<h1 dir="auto"><a class="anchor" aria-hidden="true" href="https://playwright.dev/"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd"></path></svg></a><g-emoji class="g-emoji" alias="performing_arts" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f3ad.png">🎭</g-emoji> Playwright</h1>

# Web Test Automation - Playwright

## Boilerplate project created live on [Twitch.tv/CharlyAutomatiza](https://www.twitch.tv/charlyautomatiza) based on [Playwright](https://playwright.dev/), [TypeScript](https://www.typescriptlang.org/), [Allure Report](https://docs.qameta.io/allure-report/)

You can access my [YouTube](https://www.youtube.com/c/CharlyAutomatiza?sub_confirmation=1) channel for more information about this and other automated testing frameworks.

[![Playwright Tests](https://github.com/charlyautomatiza/starter-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/charlyautomatiza/starter-playwright/actions/workflows/playwright.yml)

### Overview

Esta documentación está disponible también en [**Castellano**](LEEME.md).

### General requirements

- Install a git client such as [git bash](https://git-scm.com/downloads)

Download and install

- Latest version of [Node.js](https://nodejs.org/es/download/)
- Java Development Kit [(JDK)](https://www.oracle.com/java/technologies/downloads/)
  - Make sure you have the environment variable **JAVA_HOME** set to the path of the respective JDK. **(Required for Allure report generation)**.

### Installation of the testing framework

#### **Clone the repository:**

    git clone https://github.com/charlyautomatiza/starter-playwright.git

#### **Install dependencies.**

    npm install

#### **To run the tests go to the root of the project and run (headless mode)**

    npm run test

#### **To run the tests go to the root of the project and run (headed mode)**

    npm run test-head

#### **To run the tests only on Firefox**

    npm run firefox

#### **To run the tests only on Chromium**

    npm run chromium

#### **To run the tests only on Webkit**

    npm run webkit

#### **To run the tests with UI + API Examples**

    npm run api-ui

#### **To run the tests with UI + API + Mockaroo Examples**

    npm run data-mgmt

**IMPORTANT**:

To run your own [Mockaroo](https://www.mockaroo.com/) examples you should create a free account, create a new schema and create a new .env file with your **API_KEY**

Example .env:

    API_KEY=000zz999

#### **For running Accessibility Testing examples with [Lighthouse](https://www.npmjs.com/package/playwright-lighthouse)**

    npm run a11y

**IMPORTANT**:

In the `thresholds` section of the [a11y.lighthouse.spec.ts](./tests/a11y.lighthouse.spec.ts) file, you can configure the acceptance level of the `accessibility`, `performance`, `SEO`, `best-practices`, `pwa` respectively.

If our threshold is 100 for `accessibility`, our test must have 100% acceptance to be considered successful.

```typescript
thresholds: {
    performance: 50,
    accessibility: 100,
    'best-practices': 50,
    seo: 50,
    pwa: 0,
},
```

#### **To open Playwright's unified Html report of test results**

    npm run play-report

#### **To create and open the Allure unified report of test results**

    npm run open-report

#### **IMPORTANT**

After each upgrade of **Playwright**, the project must be restarted locally with the command:

    npm run reinstall

To download the latest versions of the Browsers.

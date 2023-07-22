<p align="center">
  <a href="https://www.twitch.tv/charlyautomatiza"><img alt="Twitch" src="https://img.shields.io/badge/CharlyAutomatiza-Twitch-9146FF.svg" style="max-height: 300px;"></a>
  <a href="https://discord.gg/wwM9GwxmRZ"><img alt="Discord" src="https://img.shields.io/discord/944608800361570315" style="max-height: 300px;"></a>
  <a href="http://twitter.com/char_automatiza"><img src="https://img.shields.io/badge/@char__automatiza-Twitter-1DA1F2.svg?style=flat" style="max-height: 300px;"></a>
  <a href="https://www.youtube.com/c/CharlyAutomatiza?sub_confirmation=1"><img src="https://img.shields.io/badge/CharlyAutomatiza-Youtube-FF0000.svg" style="max-height: 300px;" style="max-height: 300px;"></a>
  <a href="https://www.linkedin.com/in/gautocarlos/"><img src="https://img.shields.io/badge/Carlos%20 Gauto-LinkedIn-0077B5.svg" style="max-height: 300px;" style="max-height: 300px;"></a>
</p>
<h1 dir="auto"><a class="anchor" aria-hidden="true" href="https://playwright.dev/"><svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd"></path></svg></a><g-emoji class="g-emoji" alias="performing_arts" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f3ad.png">🎭</g-emoji> Playwright</h1>

# Web Test Automation - Playwright

## Boilerplate project creado en vivo en [stream de Twitch](https://www.twitch.tv/charlyautomatiza) basado en [Playwright](https://playwright.dev/), [TypeScript](https://www.typescriptlang.org/), [Allure Report](https://docs.qameta.io/allure-report/)

Podrás acceder a mi canal de [YouTube](https://www.youtube.com/c/CharlyAutomatiza?sub_confirmation=1) para mayor información sobre este y otros frameworks de pruebas automatizadas.

[![Playwright Tests](https://github.com/charlyautomatiza/starter-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/charlyautomatiza/starter-playwright/actions/workflows/playwright.yml)

### Requerimientos generales

- Instalar [Node.js](https://nodejs.org/es/download/)
- Instalar algún cliente git como por ejemplo [git bash](https://git-scm.com/downloads)
- Java Development Kit [(JDK)](https://www.oracle.com/java/technologies/downloads/)
  - Asegurarse de tener configurada la variable de entorno **JAVA_HOME** con la ruta de la JDK respectiva. **(Necesario para la generación del reporte de Allure)**.

### Instalación del framework de pruebas

#### **Clonar el repositorio:**

    git clone https://github.com/charlyautomatiza/starter-playwright.git

#### **Instalar las dependencias.**

    npm install

#### **Para la ejecución de todos test en todos los browsers en modo headless**

    npm run test

#### **Para la ejecución de todos test en todos los browsers**

    npm run test-head

#### **Para la ejecución solamente en Firefox**

    npm run firefox

#### **Para la ejecución solamente en Chromium**

    npm run chromium

#### **Para la ejecución solamente en Webkit**

    npm run webkit

#### **Para la ejecución de ejemplos UI + API**

    npm run api-ui

#### **Para la ejecución de UI + API + Mockaroo Examples**

    npm run data-mgmt

**IMPORTANTE**:

Para ejecutar tus propios [Mockaroo](https://www.mockaroo.com/) ejemplos deberás crear una cuenta gratuita, crear el schema que precises y crear un acchivo ".env" en la raíz de tu proyecto con el respectivo **API_KEY** de la cuenta de Mockaroo.

Example .env:

    API_KEY=000zz999

#### **Para la ejecución de ejemplos de Accessibility Testing con [Lighthouse](https://www.npmjs.com/package/playwright-lighthouse)**

    npm run a11y

**IMPORTANTE**:

En la sección `thresholds` del archivo [a11y.lighthouse.spec.ts](./tests/a11y.lighthouse.spec.ts) se puede configurar el nivel de aceptación de los test de `accessibility`, `performance`, `SEO`, `best-practices`, `pwa` respectivamente.

Si nuestro umbral es de 100 para `accessibility`, nuestro test debe tener una aceptación de 100% para que se considere exitoso.

```typescript
thresholds: {
    performance: 50,
    accessibility: 100,
    'best-practices': 50,
    seo: 50,
    pwa: 0,
},
```

#### **Para abrir el reporte Html de Playwright unificado de los resultados de los test**

    npm run play-report

#### **Para crear y abrir el reporte de Allure unificado de los resultados de los test**

    npm run open-report

#### **IMPORTANTE**

Luego de cada upgrade de Playwright, se debe reiniciar el proyecto localmente con el comando:

    npm run reinstall

Para descargar las últimas versiones de los Browsers.

# Sauce Demo Automation Suite

This is a Playwright-based end-to-end test automation suite for the [Sauce Demo Shopify site](https://sauce-demo.myshopify.com/).

## Features

- **Page Object Model (POM)**: Organized page classes for maintainability.
- **Fixtures**: Simplified test setup with custom fixtures.
- **Comprehensive Tests**: Covers home page, catalog, product details, cart operations, checkout summary, negative auth, and responsive UI.
- **Data-driven Tests**: Validates each visible product card against its product details page.
- **Cross-browser Execution**: Runs on Chromium, Firefox, and WebKit from one Playwright config.
- **Reporting**: Generates Playwright HTML and Allure reports with screenshots, videos, and traces on failure.
- **Quality gates**: ESLint, Prettier, and a Husky pre-commit hook keep changes consistent.
- **CI Pipeline**: GitHub Actions uploads Playwright, Allure, and failure-test artifacts.

## Prerequisites

- Node.js installed.
- Playwright installed.

## Installation

```bash
npm install
npx playwright install
```

## Running Tests

To run all tests:

```bash
npm test
```

To run one browser:

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

To run a specific test file:

```bash
npx playwright test --config=playwright.config.js tests/comprehensive.spec.js
```

To view the report:

```bash
npx playwright show-report
```

To generate and open the Allure report:

```bash
npm run test:allure
npm run allure:open
```

## Code Quality

```bash
npm run lint
npm run format:check
```

The Husky pre-commit hook runs ESLint and Prettier only on staged files.

## Project Structure

- `pages/`: Page Object classes.
- `tests/`: Test specifications, fixtures, and site protection helpers.
- `utils/`: API helper scaffold for environments that expose test-user APIs.
- `.github/workflows/`: CI pipeline for Playwright execution and artifacts.
- `.husky/`: Git hooks for staged-file quality checks.
- `playwright.config.js`: Configuration file.

## API Test User Setup

The public Sauce Demo Shopify site does not expose a public customer-management API. The `utils/customerApi.js` helper is included as a senior-framework pattern for real environments where a backend or admin API is available.

Set these environment variables before using it:

```bash
CUSTOMER_API_BASE_URL=https://your-api.example.com
CUSTOMER_API_TOKEN=your-token
```

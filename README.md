# Sauce Demo Automation Suite

This is a Playwright-based end-to-end test automation suite for the [Sauce Demo Shopify site](https://sauce-demo.myshopify.com/).

## Features
- **Page Object Model (POM)**: Organized page classes for maintainability.
- **Fixtures**: Simplified test setup with custom fixtures.
- **Comprehensive Tests**: Covers home page, catalog, product details, cart operations, and responsive UI.
- **Reporting**: Generates HTML reports with screenshots and videos on failure.

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
npx playwright test
```

To run a specific test file:
```bash
npx playwright test tests/comprehensive.spec.js
```

To view the report:
```bash
npx playwright show-report
```

## Project Structure
- `pages/`: Page Object classes.
- `tests/`: Test specifications and fixtures.
- `playwright.config.js`: Configuration file.

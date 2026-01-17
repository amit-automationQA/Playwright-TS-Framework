# Playwright TypeScript Testing Framework

A comprehensive, enterprise-grade test automation framework built with **Playwright** and **TypeScript**. This framework supports both **web UI testing** and **API testing** with advanced reporting, data validation, and CI.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Organization](#test-organization)
- [Custom Fixtures](#custom-fixtures)
- [Reporting](#reporting)
- [CI/CD Integration](#cicd-integration)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This framework provides a robust foundation for automated testing of web applications and REST APIs. It leverages Playwright's powerful cross-browser capabilities combined with TypeScript's type safety and the popular Page Object Model (POM) pattern for maintainable test code.

**Supports:**
- ✅ Web UI Testing (Chrome, Firefox, Safari, Edge)
- ✅ REST API Testing
- ✅ Data-driven testing with faker.js
- ✅ JSON Schema validation
- ✅ Multi-format reporting (Allure, HTML, JUnit, JSON)
- ✅ CI (GitHub Actions, Jenkins)
- ✅ Parallel test execution
- ✅ Cross-browser testing

---

## 🌟 Key Features

### 1. **Comprehensive Test Reporting**
   - **Allure Reports** - Rich, interactive test reports
   - **HTML Reports** - Built-in Playwright HTML reports
   - **JUnit XML** - Integration with Jenkins and CI/CD platforms
   - **JSON Reports** - Programmatic test result analysis

### 2. **Page Object Model (POM)**
   - Clean separation of test logic and page interactions
   - Reusable page components
   - Easy maintenance and scalability
   - Located in `/pages` directory

### 3. **Custom Fixtures**
   - Pre-built API fixtures for test data generation
   - Random test data generation using faker.js
   - DateTime handling with Luxon
   - Environment variable management with dotenv

### 4. **API Testing Capabilities**
   - Full REST API testing support
   - JSON Schema validation with AJV
   - Request/response body management
   - Query parameter and path parameter handling
   - Bearer token authentication

### 5. **Parallel & Serial Execution**
   - Run tests in parallel for speed
   - Serial execution when needed
   - Configurable worker count

### 6. **Data-Driven Testing**
   - Faker.js for random test data
   - Test data files in JSON format
   - Dynamic data generation in fixtures

---

## 🛠️ Tech Stack

| Component | Version | Purpose |
|-----------|---------|---------|
| **Playwright** | ^1.57.0 | Browser automation & API testing |
| **TypeScript** | Latest | Type-safe test code |
| **Node.js** | 20 | Runtime environment |
| **Allure** | ^3.4.5 | Advanced test reporting |
| **Faker.js** | ^10.2.0 | Random test data generation |
| **Luxon** | ^3.7.2 | DateTime handling |
| **AJV** | ^8.17.1 | JSON Schema validation |
| **Dotenv** | ^17.2.3 | Environment variable management |

---

## 📁 Project Structure

```
Playwright-TS-Framework/
├── .github/
│   └── workflows/
│       └── playwright.yml              # GitHub Actions CI/CD workflow
├── fixtures/
│   └── apiFixtures.ts                  # Custom Playwright fixtures for API testing
├── pages/
│   └── BlogspotPage.ts                 # Page Object Model - Web UI pages
├── schemas/
│   ├── get_api_response_schema.json    # JSON schema for GET responses
│   ├── post_api_response_schema.json   # JSON schema for POST responses
│   └── put_api_response_schema.json    # JSON schema for PUT responses
├── testdata/
│   ├── post_request_body.json          # Test data for POST requests
│   └── put_request_body.json           # Test data for PUT requests
├── tests/
│   ├── apitests/                       # REST API tests
│   │   ├── delete_api_request.spec.ts
│   │   ├── get_api_request.spec.ts
│   │   ├── post_api_request.spec.ts
│   │   └── put_api_request.spec.ts
│   └── webtests/                       # Web UI tests
│       ├── mytest.spec.ts
│       ├── paralleltest.spec.ts
│       └── serialtest.spec.ts
├── reports/                            # Test reports (generated)
│   ├── playwright-inbuilt-report/
│   └── allure-report/
├── allure-results/                     # Allure raw results (generated)
├── test-results/                       # Test results (generated)
├── .env                                # Environment variables (local)
├── .gitignore                          # Git ignore rules
├── Jenkinsfile                         # Jenkins pipeline configuration
├── package.json                        # Dependencies and scripts
├── playwright.config.ts                # Playwright configuration
├── test.config.ts                      # Application configuration
├── README.md                           # This file
└── README.md.txt                       # Previous documentation
```

---

## ✅ Prerequisites

Before setting up the framework, ensure you have:

- **Node.js** (v20 or later) - [Download](https://nodejs.org/)
- **npm** (v9 or later) - Comes with Node.js
- **Git** - For version control
- **Code Editor** - VS Code recommended
- **Windows/Mac/Linux** - Cross-platform support

### Check Versions
```bash
node --version
npm --version
git --version
```

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Playwright-TS-Framework
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install Playwright Browsers
```bash
npx playwright install --with-deps
```

### 4. Setup Environment Variables
Create a `.env` file in the root directory:
```dotenv
AUTH_USERNAME=admin
AUTH_PASSWORD=password123
```

### 5. Verify Installation
```bash
npx playwright --version
npm run test:debug
```

---

## ⚙️ Configuration

### Playwright Configuration (`playwright.config.ts`)

The main Playwright configuration file includes:

```typescript
// Key Settings:
- testDir: './tests'                    # Test directory
- fullyParallel: true                   # Run tests in parallel
- retries: 2                            # Retry failed tests 2 times (CI only)
- workers: 1                            # Single worker on CI
- baseURL: 'https://restful-booker...'  # API base URL
- trace: 'on-first-retry'              # Record traces on retry
- screenshot: 'only-on-failure'        # Screenshots on failure
- video: 'retain-on-failure'           # Videos on failure
```

### Test Configuration (`test.config.ts`)

Application-specific settings:
```typescript
- APP_URL = 'https://testautomationpractice.blogspot.com/'
- TIMEOUT = 5000 ms
- LOG_LEVEL = 'debug'
```

### Supported Browsers

Currently configured for **Chromium**. To enable other browsers, uncomment in `playwright.config.ts`:

```typescript
// Firefox
{ name: 'firefox', use: { ...devices['Desktop Firefox'] } }

// Webkit (Safari)
{ name: 'webkit', use: { ...devices['Desktop Safari'] } }

// Microsoft Edge
{ name: 'Microsoft Edge', use: { ...devices['Desktop Edge'], channel: 'msedge' } }
```

---

## 🧪 Running Tests

### Run All Tests with Regression Tag
```bash
npm run test
```

### Run Tests in Headed Mode (See Browser)
```bash
npm run test:headed
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```

### Run Specific Test File
```bash
npx playwright test tests/webtests/mytest.spec.ts
```

### Run Tests with Specific Tag
```bash
npx playwright test --grep @regression
npx playwright test --grep @api
```

### Run Tests Serially (One at a time)
```bash
npx playwright test --workers=1
```

### Run Tests in a Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
```

### Run Single Test
```bash
npx playwright test -g "Verify Blogspot page URL"
```

---

## 📦 Test Organization

### Web UI Tests (`tests/webtests/`)

Tests for web application UI interactions using Page Object Model:

**Example: `mytest.spec.ts`**
```typescript
// Uses BlogspotPage POM for page interactions
- Navigates to Blogspot practice page
- Tests form inputs, radio buttons, checkboxes
- Validates UI elements visibility and state
- Verifies element properties (max length, values)
```

**Test Types:**
- `mytest.spec.ts` - Core UI functionality tests
- `paralleltest.spec.ts` - Tests running in parallel
- `serialtest.spec.ts` - Tests running serially

### API Tests (`tests/apitests/`)

REST API testing with request/response validation:

**Test Files:**
- `get_api_request.spec.ts` - GET endpoint testing
- `post_api_request.spec.ts` - POST endpoint testing (create)
- `put_api_request.spec.ts` - PUT endpoint testing (update)
- `delete_api_request.spec.ts` - DELETE endpoint testing

**Example: API Test Structure**
```typescript
test('Get Booking Details by ID @api', async ({ bookingId, request }) => {
    const response = await request.get(`/booking/${bookingId}`);
    
    // Validate status code
    expect.soft(response.status()).toBe(200);
    
    // Parse response
    const responseBody = await response.json();
    
    // Validate against schema
    const valid = validate(responseBody);
    expect(valid).toBeTruthy();
    
    // Validate response properties
    expect.soft(responseBody).toHaveProperty('firstname');
});
```

---

## 🔧 Custom Fixtures

### API Fixtures (`fixtures/apiFixtures.ts`)

Custom fixtures provide reusable test data and utilities:

```typescript
type MyFixtures = {
  bookingId: number;           // Unique booking ID
  token: string;               // Authentication token
  bookingData: {...};          // Generated booking data
};
```

### Features:

**1. Random Test Data Generation**
```typescript
const generateBookingData = (): MyFixtures['bookingData'] => {
  // Uses faker.js to generate:
  - Random first/last names
  - Random prices (50-500)
  - Random boolean values
  - Dynamic check-in/check-out dates
  - Random additional needs
}
```

**2. DateTime Handling**
```typescript
// Uses Luxon for date operations
const checkInDate = DateTime.now().plus({ days: 1 }).toISODate();
const checkOutDate = DateTime.now().plus({ days: 10 }).toISODate();
```

**3. Environment Variables**
```typescript
// Load from .env file
process.env.AUTH_USERNAME
process.env.AUTH_PASSWORD
```

### Usage in Tests:
```typescript
test('Create Booking @api', async ({ 
  bookingData,     // Auto-generated random booking data
  token,           // Auth token
  request 
}) => {
  const response = await request.post('/booking', {
    data: bookingData
  });
});
```

---

## 📊 Reporting

### 1. **Allure Reports**

Modern, interactive test reports with rich visualizations.

**Generate Allure Report:**
```bash
npm run allure:generate
```

**View Allure Report:**
```bash
npm run allure:open
```

**Features:**
- Interactive dashboards
- Test timeline
- Environment info
- Failure analysis
- Trend analysis

**Files:**
- Raw results: `allure-results/`
- Generated report: `allure-report/`

### 2. **Playwright HTML Report**

Built-in Playwright reporting with test details and traces.

**Location:** `reports/playwright-inbuilt-report/index.html`

**Includes:**
- Test results summary
- Execution timeline
- Screenshots on failure
- Videos on failure
- Trace recordings
- Console logs

### 3. **JUnit XML Report**

CI/CD integration format for test results.

**Location:** `reports/playwright-inbuilt-report/junit.xml`

**Used by:** Jenkins, Azure DevOps, GitLab CI

### 4. **JSON Report**

Programmatic access to test results.

**Location:** `reports/playwright-inbuilt-report/test-results.json`

**Includes:**
- Test statistics
- Individual test results
- Timing information
- Failure details

### Viewing Reports

After test execution:

```bash
# Open Playwright HTML Report
npx playwright show-report

# Generate and open Allure Report
npm run allure:generate && npm run allure:open
```

---

## 🔄 CI/CD Integration

### GitHub Actions

**Workflow File:** `.github/workflows/playwright.yml`

**Triggered on:**
- Push to `main` branch
- Pull requests to `main` branch

**Jobs:**
1. Checkout code
2. Setup Node.js 20
3. Install dependencies
4. Install Playwright browsers
5. Run tests
6. Upload Allure results
7. Upload Playwright HTML report

**Artifacts:**
- `allure-results` - Raw Allure data
- `playwright-html-report` - HTML test report

### Jenkins

**Pipeline File:** `Jenkinsfile`

**Stages:**
1. **Checkout** - Clone repository
2. **Setup Node.js** - Configure Node.js 20
3. **Install Dependencies** - npm install
4. **Install Playwright Browsers** - Browser setup
5. **Run Tests** - Execute test suite
6. **Generate Allure Report** - Create Allure report
7. **Post Actions** - Publish reports and artifacts

**Prerequisites:**
- NodeJS 20 plugin installed
- HTML Publisher plugin installed
- JUnit plugin installed

**Usage:**
```groovy
// Jenkins will automatically:
- Poll repository for changes
- Trigger pipeline on commits
- Publish HTML and Allure reports
- Archive test artifacts
```

---

## 🎓 Best Practices

### 1. **Page Object Model**
```typescript
// ✅ Good: Encapsulate page interactions
export class BlogspotPage {
  async fillName(name: string) { ... }
  async selectMaleRadioButton() { ... }
}

// ❌ Avoid: Direct element interactions in tests
await page.locator('#name').fill('value');
```

### 2. **Test Organization**
```typescript
// ✅ Good: Clear test structure
test.beforeEach(async ({ page }) => {
  // Setup
});

test('Test name with tag @regression', async ({ ... }) => {
  // Test code
});
```

### 3. **Use Soft Assertions for Multiple Checks**
```typescript
// ✅ Good: Continue on failure
expect.soft(page).toHaveURL(url);
expect.soft(element).toBeVisible();

// ❌ Avoid: Stop on first failure
expect(page).toHaveURL(url);
expect(element).toBeVisible();
```

### 4. **Wait for Elements Properly**
```typescript
// ✅ Good: Playwright waits automatically
await page.locator('selector').click();

// ❌ Avoid: Hard waits
await page.waitForTimeout(5000);
```

### 5. **Use Tags for Test Organization**
```typescript
test('Test @regression @smoke @critical', async () => {
  // Test code
});
```

### 6. **Handle Async Operations**
```typescript
// ✅ Good: Use async/await
const value = await element.inputValue();

// ❌ Avoid: Callback style
element.inputValue((value) => { ... });
```

### 7. **Environment-Based Configuration**
```typescript
// ✅ Good: Use environment variables
const baseURL = process.env.BASE_URL || 'default';

// ❌ Avoid: Hard-coded URLs
const baseURL = 'https://hardcoded-url.com';
```

### 8. **Meaningful Test Names**
```typescript
// ✅ Good: Clear, descriptive names
test('Verify user can login with valid credentials @smoke')

// ❌ Avoid: Vague names
test('Test login')
```

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### 1. **Browsers Not Found**
```bash
# Solution: Install browsers with dependencies
npx playwright install --with-deps
```

#### 2. **Port Already in Use**
```bash
# Find process using port
netstat -ano | findstr :PORT_NUMBER

# Kill process (Windows)
taskkill /PID PID_NUMBER /F
```

#### 3. **Tests Timeout**
```typescript
// Increase timeout in playwright.config.ts
timeout: 30000  // 30 seconds
```

#### 4. **Environment Variables Not Loading**
```bash
# Verify .env file exists in root directory
# Ensure dotenv is imported and configured
import dotenv from 'dotenv';
dotenv.config();
```

#### 5. **Schema Validation Fails**
```bash
# Update schema files in schemas/ directory
# Ensure response matches JSON schema
# Check AJV error messages in console
```

#### 6. **Allure Report Not Generating**
```bash
# Ensure allure-playwright is installed
npm install allure-playwright --save-dev

# Generate manually
npm run allure:generate
```

#### 7. **Tests Failing Locally but Passing in CI**
- Check Node.js version matches (`node --version`)
- Clear node_modules and reinstall (`rm -rf node_modules && npm install`)
- Clear Playwright cache (`rm -rf ~/Library/Caches/ms-playwright`)

#### 8. **Permission Denied Errors (Mac/Linux)**
```bash
# Add execute permissions
chmod +x node_modules/.bin/*
```

---

## 📖 Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Faker.js Documentation](https://fakerjs.dev/)
- [Luxon DateTime](https://moment.github.io/luxon/)
- [Allure Reports](https://docs.qameta.io/allure/)
- [AJV JSON Schema Validator](https://ajv.js.org/)

---

## 📝 License

ISC License - Open for modification and distribution

---

## 👤 Contributing

Contributions are welcome! Please follow these guidelines:

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit changes (`git commit -m 'Add AmazingFeature'`)
3. Push to branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing documentation
- Review test examples
- Consult Playwright docs

---

**Last Updated:** January 17, 2026

**Framework Version:** 1.0.0

**Playwright Version:** ^1.57.0

---

*Happy Testing! 🚀*

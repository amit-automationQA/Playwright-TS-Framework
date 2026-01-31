# 🤝 Contributing Guide

Thank you for contributing! Here's how to get started.

---

## 🚀 Setup Development Environment

### 1. Clone Repository
```bash
git clone <repo-url>
cd Playwright-TS-Framework
```

### 2. Install Dependencies
```bash
npm install
npx playwright install --with-deps
```

### 3. Setup GitHub Copilot (Optional)
For MCP-powered test generation:
- Install GitHub Copilot extension
- Sign in with GitHub
- Read [MCP-SETUP.md](./MCP-SETUP.md)

---

## 📝 Contributing Workflow

### 1. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

**For Web UI Tests:**
- Create Page Object in `pages/`
- Write tests in `tests/webtests/`
- Follow Page Object Model pattern

**Accessibility & Visual Tests (Quick Notes):**
- Accessibility: import the provided fixture to run axe checks:

```typescript
import { test, expect } from '../../fixtures/axe-test';

test('homepage a11y', async ({ page, makeAxeBuilder }) => {
  await page.goto('https://example.com');
  const results = await makeAxeBuilder().analyze();
  expect(results.violations.length).toBe(0);
});
```

- Visual: quick one-line snapshot assertion:

```typescript
await expect(page).toHaveScreenshot('homepage.png'); // use --update-snapshots to create/update baseline
```

Include visual tests sparingly and keep snapshots small and deterministic.

**For API Tests:**
- Add tests in `tests/apitests/`
- Update fixtures if needed
- Add schemas in `schemas/`

**For Test Plans (MCP):**
- Create Markdown in `specs/`
- Use Copilot to generate tests
- Review generated code

### 3. Test Your Code

```bash
npm run test                    # Run all
npx playwright test tests/file.spec.ts  # Specific file
npm run test:headed            # See browser
npm run test:debug             # Debug mode
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add tests for login functionality"
```

**Format:** `feat:`, `fix:`, `refactor:`, `docs:`, `test:`

### 5. Push & Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request with:
- Clear title
- Description of changes
- Test results
- Screenshots (if UI-related)

---

## ✅ Code Standards

### TypeScript
- Use type annotations
- Follow naming conventions
- Use async/await

### Test Structure
```typescript
test.describe('Feature', () => {
  test('should do something @tag', async ({ page }) => {
    // Test code
    expect(result).toBe(expected);
  });
});
```

### Naming
```typescript
// ✅ Good
test('should verify user can login with valid credentials @smoke')

// ❌ Avoid
test('test login')
```

---

## 🧠 Contributing with MCP

### Create Test Plan
```markdown
# Feature Test Plan

## Test Case
**Steps:**
1. Step 1
2. Step 2

**Expected:**
- Result 1
```

### Generate Tests
```
@workspace Generate tests from specs/feature_test.md
```

### Review & Commit
- Check code quality
- Verify locators
- Test locally
- Commit both plan and generated tests

---

## 📋 Pre-Commit Checklist

- [ ] Tests pass locally
- [ ] Code follows standards
- [ ] No hardcoded credentials
- [ ] Meaningful descriptions
- [ ] Page objects used (UI tests)
- [ ] Schema validation (API tests)
- [ ] Documentation updated

---

## 🐛 Reporting Issues

**Bug Report:**
```markdown
**Describe the bug:**
Clear description

**To Reproduce:**
1. Step 1
2. Step 2

**Expected:**
What should happen

**Actual:**
What happens
```

**Feature Request:**
```markdown
**Problem:**
What problem does it solve?

**Solution:**
What you want to add

**Alternatives:**
Other approaches
```

---

## 📚 Project Structure

```
tests/
├── apitests/         # API tests
├── webtests/         # Web UI tests
└── [generated]       # MCP-generated tests

pages/               # Page Objects

specs/               # Test plans (Markdown)

fixtures/            # Test utilities

schemas/             # JSON schemas
```

---

## 🎯 Development Tips

**Use Playwright Inspector:**
```bash
npx playwright codegen https://example.com
```

**Debug Tests:**
```bash
npx playwright test --debug
```

**View Reports:**
```bash
npm run allure:generate && npm run allure:open
```

---

## ❓ Questions?

- Check [README.md](./README.md)
- Read [MCP-SETUP.md](./MCP-SETUP.md)
- Ask in GitHub Issues
- Use Copilot Chat

---

## 🙏 Thank You!

Your contributions make this project better. We appreciate:
- 🐛 Bug reports
- ✨ Features
- 📚 Documentation
- 🧪 Tests
- 💡 Ideas

---

**[← Back to Start](./START_HERE.md) | [Quick Start](./QUICKSTART.md) | [MCP Setup](./MCP-SETUP.md)**

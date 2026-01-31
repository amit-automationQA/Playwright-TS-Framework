# ⚡ Quick Start Guide

Get up and running in 5 minutes!

---

## 🚀 5-Minute Setup

### Step 1: Clone & Install (3 min)

```bash
git clone <repo-url>
cd Playwright-TS-Framework
npm install
npx playwright install --with-deps
```

### Step 2: Verify Installation (1 min)

```bash
node --version      # v20+
npm --version       # v9+
npx playwright --version
```

### Step 3: Run Tests (1 min)

```bash
npm run test
```

✅ **Done!** Your tests are running.

---

## 📖 Common Commands

```bash
npm run test                    # Run all tests
npm run test:headed            # See browser window
npm run test:debug             # Debug mode
npx playwright test -g "name"  # Run specific test
npm run allure:generate        # Generate reports
npm run allure:open            # View reports
```

---

## ✅ Visual & Accessibility Quick Tips

- **One-line visual check:**

```typescript
await expect(page).toHaveScreenshot('homepage.png'); // create/update with `npx playwright test --update-snapshots`
```

- **Accessibility fixture:** Use `fixtures/axe-test.ts` to run axe checks in your test by importing `test` from the fixture and calling `makeAxeBuilder()`.

---

## 🧠 Next: AI-Powered Tests?

To generate tests automatically with AI:

1. Install GitHub Copilot extension in VS Code
2. Read [MCP-SETUP.md](./MCP-SETUP.md)

---

## ❓ Troubleshooting

**Tests won't run?**
```bash
rm -rf node_modules package-lock.json
npm install
npx playwright install --with-deps
npm run test
```

**Browsers not found?**
```bash
npx playwright install --with-deps
```

---

**[← Back to Start](./START_HERE.md) | [Full Docs](./README.md) | [MCP Setup](./MCP-SETUP.md)**

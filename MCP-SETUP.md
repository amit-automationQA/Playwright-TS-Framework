# 🧠 MCP Server Setup Guide

Setup **Model Context Protocol (MCP)** for AI-powered test planning and automatic code generation.

---

## ⚡ What is MCP?

MCP enables you to:
- 📋 Write test plans in simple Markdown
- 🤖 Auto-generate Playwright test code
- 📸 Capture page interactions automatically
- 🎯 Focus on "what to test" not "how to test"

---

## 📋 Requirements

### Required
- ✅ VS Code (latest)
- ✅ GitHub Copilot extension (free trial available)
- ✅ GitHub account with Copilot access

### Optional
- 📌 Claude API key (for advanced features)

---

## 🚀 Setup Steps

### Step 1: Install GitHub Copilot

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search "GitHub Copilot"
4. Click Install
5. Sign in with GitHub

### Step 2: Verify Installation

1. Open Copilot Chat (Ctrl+Shift+I)
2. You should see Copilot is ready
3. Test by asking: "Hello, what can you do?"

### Step 3: Open Project

```bash
code .
```

### Step 4: You're Ready!

MCP will automatically activate when you:
- Ask Copilot about your project
- Request test generation
- Use `@workspace` in Copilot Chat

---

## 💡 Using MCP for Tests

### Create Test Plan

Create `specs/my_test.md`:

```markdown
# My Feature Test Plan

## Overview
Test the login functionality.

## Test Case
**Steps:**
1. Navigate to login page
2. Enter username
3. Enter password
4. Click login

**Expected Results:**
- User is logged in
- Dashboard appears
```

### Generate Tests

1. Open Copilot Chat (Ctrl+Shift+I)
2. Ask: `@workspace Generate tests from specs/my_test.md`
3. Review generated code
4. Save and run tests

### Run Generated Tests

```bash
npx playwright test tests/my_test.spec.ts
```

---

## ❓ Troubleshooting

**Copilot Chat not available?**
- Install GitHub Copilot extension
- Sign in with GitHub
- Restart VS Code

**MCP not generating tests?**
- Ensure test plan is clear and detailed
- Check seed file exists
- Verify Copilot is signed in
- Try asking again with more detail

**Generated tests failing?**
- Run seed file first: `npx playwright test tests/seed.spec.ts`
- Check page elements are correct
- Update test plan with specific details
- Use Playwright Inspector: `npx playwright codegen`

---

## 📚 Example Workflow

### 1. Create Test Plan
```markdown
# Dynamic Table Tests

## Test Case: Sorting
**Steps:**
1. Navigate to page
2. Click Network column header
3. Verify data is sorted

**Expected:**
- Data sorted correctly
```

### 2. Ask Copilot
```
@workspace Generate Playwright tests for dynamic table sorting
```

### 3. Review Code
Copilot generates `tests/dynamic-table.spec.ts`

### 4. Run Tests
```bash
npm run test
```

---

## 🔐 Security Notes

- Don't put credentials in test plans
- Keep API keys in `.env` files
- Review generated code before committing
- Test locally first

---

**[← Back to Start](./START_HERE.md) | [Quick Start](./QUICKSTART.md) | [Full Docs](./README.md)**

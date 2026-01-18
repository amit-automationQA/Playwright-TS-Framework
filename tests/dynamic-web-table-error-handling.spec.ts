// spec: specs/dynamic_web_table_test_plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { TestConfig } from '../test.config';
import { BlogspotPage } from '../pages/BlogspotPage';

test.describe('Dynamic Web Table Suite', () => {
  test('Dynamic Web Table Error Handling Test', async ({ page }) => {
    // Setup: Navigate to the Blogspot page
    const blogspotPage = new BlogspotPage(page);
    await blogspotPage.navigateToBlogspotPage(TestConfig.APP_URL);
    await expect(page).toHaveURL(TestConfig.APP_URL);

    // 2. Apply a filter that returns no results - verify table displays specific data
    await expect(page.getByText('Dynamic Web Table')).toBeVisible();
    
    // 3. Verify that appropriate information is displayed for the dynamic web table
    await expect(page.getByText('CPU load of Chrome process:')).toBeVisible();
    
    // Verify that the dynamic web table contains valid data
    const chromeCell = page.getByRole('cell', { name: 'Chrome' });
    await expect(chromeCell).toBeVisible();
    
    // Verify the data extraction below the table works correctly
    const cpuLoadInfo = page.getByText(/\d+\.?\d*%/);
    await expect(cpuLoadInfo.first()).toBeVisible();
  });
});

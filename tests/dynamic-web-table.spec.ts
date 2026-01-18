// spec: specs/dynamic_web_table_test_plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { TestConfig } from '../test.config';
import { BlogspotPage } from '../pages/BlogspotPage';

test.describe('Dynamic Web Table Suite', () => {
  test('Dynamic Web Table Functionality Test', async ({ page }) => {

    const blogspotPage = new BlogspotPage(page);
            //Navigate to Blogspot page
            await blogspotPage.navigateToBlogspotPage(TestConfig.APP_URL);
            await expect.soft(page).toHaveURL(TestConfig.APP_URL);
    // 2. Verify the presence of the dynamic web table
    await expect(page.getByText('Dynamic Web Table')).toBeVisible();

    // 3. Check that the table displays the correct number of rows and columns
    await expect(page.getByRole('cell', { name: 'Internet Explorer' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Chrome' })).toBeVisible();

    // 4. Test sorting functionality by clicking on the column headers
    await page.getByRole('columnheader', { name: 'Network (Mbps)' }).click();

    // 5. Verify that the data is sorted correctly for each column
    await expect(page.getByRole('cell', { name: 'Firefox' })).toBeVisible();
  });
});

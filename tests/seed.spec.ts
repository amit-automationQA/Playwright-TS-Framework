import { test, expect } from '@playwright/test';
import { TestConfig } from '../test.config';
import { BlogspotPage } from '../pages/BlogspotPage';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    // Everything inside here runs before anything is run via LLM
    const blogspotPage = new BlogspotPage(page);
        //Navigate to Blogspot page
        await blogspotPage.navigateToBlogspotPage(TestConfig.APP_URL);
        await expect.soft(page).toHaveURL(TestConfig.APP_URL);
  });
});

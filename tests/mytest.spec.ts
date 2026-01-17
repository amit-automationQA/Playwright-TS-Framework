import { test, expect, Locator } from '@playwright/test';
import { TestConfig } from '../test.config';
import { BlogspotPage } from '../pages/BlogspotPage';

let blogspotPage: BlogspotPage;

test.beforeEach(async ({ page }) => {
    blogspotPage = new BlogspotPage(page);
    //Navigate to Blogspot page
    await blogspotPage.navigateToBlogspotPage(TestConfig.APP_URL);
    await expect.soft(page).toHaveURL(TestConfig.APP_URL);
});

test('Verify Blogspot page URL @regression', async ({ page }) => {

    //Navigate to Blogspot page
    await blogspotPage.navigateToBlogspotPage(TestConfig.APP_URL);
    await expect.soft(page).toHaveURL(TestConfig.APP_URL);
    await expect.soft(blogspotPage.nameTextBox).toBeVisible();
    await expect.soft(blogspotPage.nameTextBox).toBeEnabled();

    //Get Length of Name text box and Fill Name text box
    const maxLength = await blogspotPage.getMaxLengthOfNameTextBox();
    expect.soft(maxLength).toBe('15');
    await blogspotPage.fillName('TestUser12345');

    //Get Value of Name text box and Verify
    expect.soft(await blogspotPage.getNameTextBoxValue()).toBe('TestUser12345');
})

test('Verify Checkbox and Radio Buttons in Blogspot page URL @regression', async ({ page }) => {

    //Select Radio buttons
    await expect.soft(blogspotPage.maleRadioBtn).toBeVisible();
    await expect.soft(blogspotPage.maleRadioBtn).toBeEnabled();
    await expect.soft(blogspotPage.maleRadioBtn).not.toBeChecked();
    await blogspotPage.selectMaleRadioButton();
    await expect.soft(blogspotPage.maleRadioBtn).toBeChecked();

    // Select specific Checkbox
    const sundayCheckbox: Locator = page.getByLabel('Sunday');
    await expect.soft(blogspotPage.sundayCheckbox).toBeVisible();
    await expect.soft(blogspotPage.sundayCheckbox).toBeEnabled();
    await expect.soft(blogspotPage.sundayCheckbox).not.toBeChecked();
    await blogspotPage.selectSingleCheckbox('Sunday');
    await expect.soft(blogspotPage.sundayCheckbox).toBeChecked();

    // Select all Checkboxes
    const days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const checkBoxes: Locator[] = days.map(day => page.getByLabel(day));
    console.log("Value of all checkBoxes: ", checkBoxes);
    expect(checkBoxes.length).toBe(6);
    for (const checkBox of checkBoxes) {
        await expect.soft(checkBox).toBeVisible();
        await expect.soft(checkBox).toBeEnabled();
        await expect.soft(checkBox).not.toBeChecked();
        await checkBox.check();
        await expect.soft(checkBox).toBeChecked();
    }

    //Uncheck last 3 checkboxes
    console.log("Unchecking last 3 checkboxes", checkBoxes.slice(-3));
    for (const checkBox of checkBoxes.slice(-3)) {
        await expect.soft(checkBox).toBeChecked();
        await checkBox.uncheck();
        await expect.soft(checkBox).not.toBeChecked();
    }
});

test('Verify Static Single Select Dropdowns in Blogspot page URL @regression', async ({ page }) => {

    //Single select Dropdown - Static
    await expect.soft(blogspotPage.staticDropdownOptions).toHaveCount(10);
    const staticDropdownValues: string[] = (await blogspotPage.staticDropdownOptions.allTextContents()).map(option => option.trim());
    console.log("Static dropdown options are: ", staticDropdownValues);
    await blogspotPage.selectSingleOptionInStaticDropdown('india'); //by visible text
    //  blogspotPage.selectSingleOptionInStaticDropdown({value:'uk'}); //by using value attribute
    //  blogspotPage.selectSingleOptionInStaticDropdown({index:4}); //by using index
    //  blogspotPage.selectSingleOptionInStaticDropdown({label:'India'}); //by using label
    expect(await blogspotPage.getDropdownInputValue()).toBe('india');
});

test('Verify Duplicate Options in Dropdowns in Blogspot page URL @regression', async ({ page }) => {

    //Check duplicate options in dropdown
    const { original, unique, duplicates } = await blogspotPage.getMultiSelectDropdownValuesInfo();
    console.log("Dropdown options are: ", original);
    console.log("Unique dropdown options are: ", unique);
    console.log("Duplicate dropdown options are: ", duplicates);

    // Assertions
    await expect.soft(blogspotPage.multiSelectDropdownOptions).toHaveCount(10);
    expect(duplicates).toEqual([]); // Ensure no duplicates
});

test('Verify Sorted Options in Dropdowns in Blogspot page URL @regression', async ({ page }) => {


    //Check if dropdown options are sorted
    //Sorted Dropdown
    await expect.soft(blogspotPage.multiSelectDropdownOptions).toHaveCount(10);
    const {
        original: sortedDropdownValues,
        sorted: sortedDropdownValuesSorted
    } = await blogspotPage.getMultiSelectDropdownValues();

    console.log('Original dropdown options are:', sortedDropdownValues);
    console.log('Sorted dropdown options are:', sortedDropdownValuesSorted);

    // Assertions
    expect.soft(sortedDropdownValuesSorted).toEqual([...sortedDropdownValues].sort());
});

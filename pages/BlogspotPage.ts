import { Page, Locator } from '@playwright/test';


export class BlogspotPage {
    readonly page: Page;
    readonly nameTextBox: Locator;
    readonly maleRadioBtn: Locator;
    readonly sundayCheckbox: Locator;
    readonly staticDropdown: Locator;
    readonly staticDropdownOptions: Locator;
    readonly multiSelectDropdown: Locator;
    readonly multiSelectDropdownOptions: Locator;
    constructor(page: Page) {
        this.page = page;
        this.nameTextBox = page.locator('#name');
        this.maleRadioBtn = page.locator('#male');
        this.sundayCheckbox = page.getByLabel('Sunday');
        this.staticDropdown = page.locator('#country');
        this.staticDropdownOptions = page.locator('#country option');
        this.multiSelectDropdown = page.locator('#animals');
        this.multiSelectDropdownOptions = page.locator('#animals option');
    }

    async navigateToBlogspotPage(url: string) {
        await this.page.goto(url);
        let pURL: string = this.page.url();
        console.log("Navigated to Blogspot page. Page URL is: ", pURL);
    }

    async getMaxLengthOfNameTextBox(): Promise<string | null> {
        const maxLength: string | null = await this.nameTextBox.getAttribute('maxlength');
        console.log("Max length of Name text box is: ", maxLength);
        return await this.nameTextBox.getAttribute('maxlength');
    }

    async fillName(name: string) {
        await this.nameTextBox.fill(name);
        console.log("Name text box filled with: ", await this.nameTextBox.inputValue());
    }

    async getNameTextBoxValue(): Promise<string> {
        return await this.nameTextBox.inputValue();
    }

    async selectMaleRadioButton() {
        await this.maleRadioBtn.check();
        console.log("Male Radio button is selected");
    }

    async getCheckboxByLabel(label: string): Promise<Locator> {
        return this.page.getByLabel(label);
    }


    async selectSingleCheckbox(checkboxLabel: string) {
        const checkbox: Locator = this.page.getByLabel(checkboxLabel);
        await checkbox.check();
        console.log(checkboxLabel + " checkbox is selected");
    }
    async selectSingleOptionInStaticDropdown(
        option: string | { value?: string; label?: string; index?: number }
    ) {
        await this.staticDropdown.selectOption(option);
        console.log('Selected option in static dropdown:', option);
    }

    async getDropdownInputValue(): Promise<string> {
        return await this.staticDropdown.inputValue();
    }

    async getStaticDropdownOptionsCount(): Promise<number> {
        return await this.staticDropdownOptions.count();
    }

    async getMultiSelectDropdownValues(): Promise<{
        original: string[];
        sorted: string[];
    }> {
        const values = (await this.multiSelectDropdownOptions.allTextContents())
            .map(option => option.trim());

        const sortedValues = [...values].sort();

        return {
            original: values,
            sorted: sortedValues
        };
    }

    async getMultiSelectDropdownValuesInfo(): Promise<{
        original: string[];
        unique: string[];
        duplicates: string[];
    }> {
        const values = (await this.multiSelectDropdownOptions.allTextContents())
            .map(option => option.trim());

        const uniqueValues = [...new Set(values)];

        const duplicates = [...new Set(
            values.filter((value, index) => values.indexOf(value) !== index)
        )];

        return {
            original: values,
            unique: uniqueValues,
            duplicates: duplicates
        };
    }


}


import { test as base, TestInfo } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

type AccessibilityOptions = {
    attachOnlyOnViolation?: boolean;
    failOnImpact?: Array<'minor' | 'moderate' | 'serious' | 'critical'>;
};

type AxeFixture = {
    runAccessibilityScan: (options?: AccessibilityOptions) => Promise<any>;
};

export const test = base.extend<AxeFixture>({
    runAccessibilityScan: async ({ page }, use, testInfo: TestInfo) => {

        const runAccessibilityScan = async (
            options: AccessibilityOptions = {
                attachOnlyOnViolation: true,
                failOnImpact: ['critical', 'serious'],
            }
        ) => {
            const results = await new AxeBuilder({ page })
                .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
                .analyze();

            // normalize null impacts
            const processedResults = {
                ...results,
                violations: results.violations.map(v => ({
                    ...v,
                    impact: v.impact ?? 'unknown',
                })),
            };

            const violationsToFail = processedResults.violations.filter(v =>
                options.failOnImpact?.includes(v.impact as 'minor' | 'moderate' | 'serious' | 'critical')
            );


            // Attach results (optional behavior)
            if (
                !options.attachOnlyOnViolation ||
                processedResults.violations.length > 0
            ) {
                await testInfo.attach(`AxeCore-${testInfo.title}`, {
                    body: JSON.stringify(processedResults, null, 2),
                    contentType: 'application/json',
                });
            }

            return {
                ...processedResults,
                violationsToFail,
            };
        };

        await use(runAccessibilityScan);
    },
});

export { expect } from '@playwright/test';

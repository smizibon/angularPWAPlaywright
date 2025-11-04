import { test, expect, _electron as electron } from '@playwright/test';
import { TEST_IDS } from '../src/app/constants/test-ids.constants';

// This spec launches the production Electron build and exercises navigation
// via data-testid attributes. It does NOT use the dev server.
test.describe('Electron build: click-through by data-testid', () => {
  test('Page 1 → Page 2 → Page 3 with waits', async ({}, testInfo) => {
    // Run once under Chromium project to keep things simple.
    if (testInfo.project.name !== 'chromium') {
      test.skip(true, 'Electron test runs only under chromium project');
    }
    // Launch Electron against the compiled main process.
    const electronApp = await electron.launch({ args: ['./dist-electron/main.js'] });

    try {
      const page = await electronApp.firstWindow();
      
      // Wait for Angular to fully bootstrap
      await page.waitForLoadState('networkidle', { timeout: 30000 });

      // Verify Page 1 title exists and has expected text
      const page1Title = page.getByTestId(TEST_IDS.PAGE_1.TITLE);
      await expect(page1Title).toBeVisible({ timeout: 20000 });
      await expect(page1Title).toHaveText('This is Page 1');

      // Tiny buffer to avoid racing UI
      await page.waitForTimeout(500);

      // Click Page 1 -> Page 2
      await page.getByTestId(TEST_IDS.PAGE_1.GOTO_PAGE_2_BTN).click();

      // Tiny buffer to avoid racing UI
      await page.waitForTimeout(500);

      // Verify Page 2 title is loaded and has the expected text
      const page2Title = page.getByTestId(TEST_IDS.PAGE_2.TITLE);
      await expect(page2Title).toBeVisible({ timeout: 15000 });
      await expect(page2Title).toHaveText('This is Page 2');

      // Click Page 2 -> Page 3
      await page.getByTestId(TEST_IDS.PAGE_2.GOTO_PAGE_3_BTN).click();

      // Tiny buffer to avoid racing UI
      await page.waitForTimeout(500);

      // Confirm Page 3
      const page3Title = page.getByTestId(TEST_IDS.PAGE_3.TITLE);
      await expect(page3Title).toBeVisible({ timeout: 15000 });
      await expect(page3Title).toHaveText('This is Page 3');
    } finally {
      await electronApp.close();
    }
  });
});
import { test, expect } from '@playwright/test';
import { Page1PageObject } from './pom/page1.page';
import { Page2PageObject } from './pom/page2.page';
import { Page3PageObject } from './pom/page3.page';
import { TEST_IDS } from '../src/app/constants/test-ids.constants';

test.describe('Navigation flow using data-testid selectors', () => {
  test('Navigate from Page 1 to Page 2', async ({ page }) => {
    await page.goto('/');
    const p1 = new Page1PageObject(page);
    await expect(p1.getTitle()).toHaveText('This is Page 1');
    await p1.navigateToPage2();

    const p2 = new Page2PageObject(page);
    await expect(p2.getTitle()).toHaveText('This is Page 2');
  });

  test('Navigate from Page 2 to Page 3', async ({ page }) => {
    await page.goto('/page-two');
    const p2 = new Page2PageObject(page);
    await expect(p2.getTitle()).toHaveText('This is Page 2');
    await p2.navigateToPage3();

    const p3 = new Page3PageObject(page);
    await expect(p3.getTitle()).toHaveText('This is Page 3');
  });

  test('Navigate back from Page 3 to Page 1', async ({ page }) => {
    await page.goto('/page-three');
    const p3 = new Page3PageObject(page);
    await expect(p3.getTitle()).toHaveText('This is Page 3');
    await p3.navigateToPage1();

    const p1 = new Page1PageObject(page);
    await expect(p1.getTitle()).toHaveText('This is Page 1');
  });

  test('Verify correct page titles are displayed', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId(TEST_IDS.APP.ROUTER_OUTLET_CONTAINER)).toBeVisible();

    const p1 = new Page1PageObject(page);
    await expect(p1.getTitle()).toHaveText('This is Page 1');
    await p1.navigateToPage3();

    const p3 = new Page3PageObject(page);
    await expect(p3.getTitle()).toHaveText('This is Page 3');
    await p3.navigateToPage2();

    const p2 = new Page2PageObject(page);
    await expect(p2.getTitle()).toHaveText('This is Page 2');
  });
});
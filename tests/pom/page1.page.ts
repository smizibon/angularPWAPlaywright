import { Locator, Page } from '@playwright/test';
import { TEST_IDS } from '../../src/app/constants/test-ids.constants';
import { BasePage } from './base.page';

export class Page1PageObject extends BasePage {
  private readonly ids = TEST_IDS.PAGE_1;

  constructor(page: Page) {
    super(page);
  }

  getContainer(): Locator {
    return this.getByTestId(this.ids.CONTAINER);
  }

  getTitle(): Locator {
    return this.getByTestId(this.ids.TITLE);
  }

  async navigateToPage2(): Promise<void> {
    await this.getByTestId(this.ids.GOTO_PAGE_2_BTN).click();
  }

  async navigateToPage3(): Promise<void> {
    await this.getByTestId(this.ids.GOTO_PAGE_3_BTN).click();
  }

  async isDisplayed(): Promise<boolean> {
    return await this.getContainer().isVisible();
  }
}
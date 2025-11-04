import { Page, Locator } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  getByTestId(id: string): Locator {
    return this.page.getByTestId(id);
  }
}
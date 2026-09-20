import { Page, Locator, expect } from '@playwright/test';
import { settleDom, textVisible, textHidden } from '../lib/test-helpers';

/** Page object for /dashboard — generated from recorded agent runs; locators are the ones the runs used. */
export class DashboardPage {
  constructor(readonly page: Page) {}

  async goto(url: string) {
    await this.page.goto(url);
    await settleDom(this.page);
  }

  get teamText(): Locator {
    return this.page.getByRole("complementary").getByText("Team", { exact: true });
  }

  get customersText(): Locator {
    return this.page.getByRole("complementary").getByText("Customers", { exact: true });
  }

  async clickTeamText() {
    await settleDom(this.page);
    const target = this.teamText;
    await expect(target).toBeVisible();
    await target.click();
  }

  async clickCustomersText() {
    await settleDom(this.page);
    const target = this.customersText;
    await expect(target).toBeVisible();
    await target.click();
  }

  async expectTextVisible(text: string) {
    await expect.poll(() => textVisible(this.page, text), { timeout: 10_000, message: `expected "${text}" to be visible` }).toBe(true);
  }
}

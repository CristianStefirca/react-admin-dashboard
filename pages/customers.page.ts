import { Page, Locator, expect } from '@playwright/test';
import { settleDom, textVisible, textHidden } from '../lib/test-helpers';

/** Page object for /customers — generated from recorded agent runs; locators are the ones the runs used. */
export class CustomersPage {
  constructor(readonly page: Page) {}

  async goto(url: string) {
    await this.page.goto(url);
    await settleDom(this.page);
  }

  get lightDarkSwitch(): Locator {
    return this.page.getByRole("switch", { name: "Light Dark", exact: true });
  }

  get selectRow1Checkbox(): Locator {
    return this.page.getByRole("checkbox", { name: "Select row 1", exact: true });
  }

  get row1SelectedCheckbox(): Locator {
    return this.page.getByRole("checkbox", { name: "Row 1 selected", exact: true });
  }

  get keywordTextbox(): Locator {
    return this.page.getByRole("textbox", { name: "Keyword :", exact: true });
  }

  get searchButton(): Locator {
    return this.page.getByRole("button", { name: "Search", exact: true });
  }

  get resetButton(): Locator {
    return this.page.getByRole("button", { name: "Reset", exact: true });
  }

  get statusCombobox(): Locator {
    return this.page.getByRole("combobox", { name: "Status :", exact: true });
  }

  get newCustomerButton(): Locator {
    return this.page.getByRole("button", { name: "plus New Customer", exact: true });
  }

  get nameCompanyTextbox(): Locator {
    return this.page.getByRole("textbox", { name: "* Name / Company", exact: true });
  }

  get emailTextbox(): Locator {
    return this.page.getByRole("textbox", { name: "* Email", exact: true });
  }

  get phoneTextbox(): Locator {
    return this.page.getByRole("textbox", { name: "Phone", exact: true });
  }

  get source(): Locator {
    return this.page.locator('aria-ref=e752');
  }

  get status(): Locator {
    return this.page.locator('aria-ref=e766');
  }

  get okButton(): Locator {
    return this.page.getByRole("button", { name: "OK", exact: true });
  }

  deleteButton(text: string): Locator {
    return this.page.getByRole("row").filter({ hasText: text }).getByRole("button", { name: "Delete", exact: true });
  }

  get deleteCustomerButton(): Locator {
    return this.page.getByRole("button", { name: "Delete customer", exact: true });
  }

  get element(): Locator {
    return this.page.getByText("Prospect", { exact: true }).nth(2);
  }

  editButton(text: string): Locator {
    return this.page.getByRole("row").filter({ hasText: text }).getByRole("button", { name: "Edit", exact: true });
  }

  get cancelButton(): Locator {
    return this.page.getByRole("button", { name: "Cancel", exact: true });
  }

  get searchBarButtonCloseCircleButton(): Locator {
    return this.page.getByRole("button", { name: "search bar button [close circle]", exact: true });
  }

  viewButton(text: string): Locator {
    return this.page.getByRole("row").filter({ hasText: text }).getByRole("button", { name: "View", exact: true });
  }

  get closeButton(): Locator {
    return this.page.getByRole("button", { name: "Close", exact: true });
  }

  get closeCircleButton(): Locator {
    return this.page.getByRole("button", { name: "close-circle", exact: true });
  }

  get activeActiveDownCell(): Locator {
    return this.page.getByRole("cell", { name: "Active Active down", exact: true });
  }

  get element2(): Locator {
    return this.page.getByText("Prospect", { exact: true }).locator('visible=true').last();
  }

  activeDownCell(text: string): Locator {
    return this.page.getByRole("row").filter({ hasText: text }).getByRole("cell", { name: "Active down" });
  }

  get companyTextbox(): Locator {
    return this.page.getByRole("textbox", { name: "Company", exact: true });
  }

  get titleTextbox(): Locator {
    return this.page.getByRole("textbox", { name: "Title", exact: true });
  }

  get customerSuccessOwnerTextbox(): Locator {
    return this.page.getByRole("textbox", { name: "Customer Success Owner", exact: true });
  }

  get notesTextbox(): Locator {
    return this.page.getByRole("textbox", { name: "Notes", exact: true });
  }

  get sourceCombobox(): Locator {
    return this.page.getByRole("combobox", { name: "Source :", exact: true });
  }

  async clickLightDarkSwitch() {
    await settleDom(this.page);
    const target = this.lightDarkSwitch;
    await expect(target).toBeVisible();
    await target.click();
  }

  async clickSelectRow1Checkbox() {
    await settleDom(this.page);
    const target = this.selectRow1Checkbox;
    await expect(target).toBeVisible();
    await target.click();
  }

  async clickRow1SelectedCheckbox() {
    await settleDom(this.page);
    const target = this.row1SelectedCheckbox;
    await expect(target).toBeVisible();
    await target.click();
  }

  async clickSearchButton() {
    await settleDom(this.page);
    const target = this.searchButton;
    await expect(target).toBeVisible();
    await target.click();
  }

  async clickResetButton() {
    await settleDom(this.page);
    const target = this.resetButton;
    await expect(target).toBeVisible();
    await target.click();
  }

  async clickNewCustomerButton() {
    await settleDom(this.page);
    const target = this.newCustomerButton;
    await expect(target).toBeVisible();
    await target.click();
  }

  async clickOkButton() {
    await settleDom(this.page);
    const target = this.okButton;
    await expect(target).toBeVisible();
    await target.click();
  }

  async clickDeleteButton(text: string) {
    await settleDom(this.page);
    const target = this.deleteButton(text);
    await expect(target).toBeVisible();
    await target.click();
  }

  async clickDeleteCustomerButton() {
    await settleDom(this.page);
    const target = this.deleteCustomerButton;
    await expect(target).toBeVisible();
    await target.click();
  }

  async clickElement() {
    await settleDom(this.page);
    const target = this.element;
    await expect(target).toBeVisible();
    await target.click();
  }

  async clickEditButton(text: string) {
    await settleDom(this.page);
    const target = this.editButton(text);
    await expect(target).toBeVisible();
    await target.click();
  }

  async clickCancelButton() {
    await settleDom(this.page);
    const target = this.cancelButton;
    await expect(target).toBeVisible();
    await target.click();
  }

  async clickSearchBarButtonCloseCircleButton() {
    await settleDom(this.page);
    const target = this.searchBarButtonCloseCircleButton;
    await expect(target).toBeVisible();
    await target.click();
  }

  async clickViewButton(text: string) {
    await settleDom(this.page);
    const target = this.viewButton(text);
    await expect(target).toBeVisible();
    await target.click();
  }

  async clickCloseButton() {
    await settleDom(this.page);
    const target = this.closeButton;
    await expect(target).toBeVisible();
    await target.click();
  }

  async clickCloseCircleButton() {
    await settleDom(this.page);
    const target = this.closeCircleButton;
    await expect(target).toBeVisible();
    await target.click();
  }

  async clickActiveActiveDownCell() {
    await settleDom(this.page);
    const target = this.activeActiveDownCell;
    await expect(target).toBeVisible();
    await target.click();
  }

  async clickElement2() {
    await settleDom(this.page);
    const target = this.element2;
    await expect(target).toBeVisible();
    await target.click();
  }

  async clickActiveDownCell(text: string) {
    await settleDom(this.page);
    const target = this.activeDownCell(text);
    await expect(target).toBeVisible();
    await target.click();
  }

  async fillKeywordTextbox(value: string) {
    await settleDom(this.page);
    const target = this.keywordTextbox;
    await expect(target).toBeVisible();
    await target.fill(value);
  }

  async fillStatusCombobox(value: string) {
    await settleDom(this.page);
    const target = this.statusCombobox;
    await expect(target).toBeVisible();
    await target.fill(value);
  }

  async fillNameCompanyTextbox(value: string) {
    await settleDom(this.page);
    const target = this.nameCompanyTextbox;
    await expect(target).toBeVisible();
    await target.fill(value);
  }

  async fillEmailTextbox(value: string) {
    await settleDom(this.page);
    const target = this.emailTextbox;
    await expect(target).toBeVisible();
    await target.fill(value);
  }

  async fillPhoneTextbox(value: string) {
    await settleDom(this.page);
    const target = this.phoneTextbox;
    await expect(target).toBeVisible();
    await target.fill(value);
  }

  async fillCompanyTextbox(value: string) {
    await settleDom(this.page);
    const target = this.companyTextbox;
    await expect(target).toBeVisible();
    await target.fill(value);
  }

  async fillTitleTextbox(value: string) {
    await settleDom(this.page);
    const target = this.titleTextbox;
    await expect(target).toBeVisible();
    await target.fill(value);
  }

  async fillCustomerSuccessOwnerTextbox(value: string) {
    await settleDom(this.page);
    const target = this.customerSuccessOwnerTextbox;
    await expect(target).toBeVisible();
    await target.fill(value);
  }

  async fillNotesTextbox(value: string) {
    await settleDom(this.page);
    const target = this.notesTextbox;
    await expect(target).toBeVisible();
    await target.fill(value);
  }

  async selectStatusCombobox(value: string) {
    await settleDom(this.page);
    await smartSelect(this.page, this.statusCombobox, value);
  }

  async selectSource(value: string) {
    await settleDom(this.page);
    await smartSelect(this.page, this.source, value);
  }

  async selectStatus(value: string) {
    await settleDom(this.page);
    await smartSelect(this.page, this.status, value);
  }

  async selectSourceCombobox(value: string) {
    await settleDom(this.page);
    await smartSelect(this.page, this.sourceCombobox, value);
  }

  async expectTextVisible(text: string) {
    await expect.poll(() => textVisible(this.page, text), { timeout: 10_000, message: `expected "${text}" to be visible` }).toBe(true);
  }

  async expectTextHidden(text: string) {
    await expect.poll(() => textHidden(this.page, text), { timeout: 10_000, message: `expected "${text}" to be hidden` }).toBe(true);
  }
}

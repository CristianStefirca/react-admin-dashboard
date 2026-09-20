import { test } from '@playwright/test';
import { ReactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page } from '../pages/react-admin-demo-go-to-customers-type-nova-in-the-keyword-filter-and-search-v-9156e3.page';

test("Use the left navigation to go to Team, then back to Customers using the navigation (not the URL bar). Verify the Custome", async ({ page }) => {
  const reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page = new ReactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page(page);
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.open();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.setup165();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.open();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.setup165();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.clickButton();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.setup165();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.expectVisible18();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.expectVisible24();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.setup165();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.clickTeam();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.expectVisible37();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.expectVisible46();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.expectVisible57();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.setup165();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.clickCustomers();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.setup165();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.expectVisible611();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.expectVisible711();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.expectVisible86();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.setup165();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.expectVisible94();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.expectVisible7();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.setup165();
});

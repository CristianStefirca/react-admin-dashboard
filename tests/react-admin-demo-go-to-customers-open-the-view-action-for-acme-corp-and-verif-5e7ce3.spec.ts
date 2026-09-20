import { test } from '@playwright/test';
import { ReactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page } from '../pages/react-admin-demo-go-to-customers-type-nova-in-the-keyword-filter-and-search-v-9156e3.page';

test("Go to customers, open the View action for Acme Corp and verify the details show the email ops@acme.com and the phone +1 ", async ({ page }) => {
  const reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page = new ReactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page(page);
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.open();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.setup19();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.clickButton6();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.setup19();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.expectVisible18();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.expectVisible24();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.setup19();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.open3();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.setup19();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.clickRow();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.expectVisible32();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.expectVisible55();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.expectVisible512();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.setup19();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.expectVisible63();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.setup19();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.expectVisible73();
  await reactAdminDemoGoToCustomersTypeNovaInTheKeywordFilterAndSearchV9156e3Page.setup19();
});

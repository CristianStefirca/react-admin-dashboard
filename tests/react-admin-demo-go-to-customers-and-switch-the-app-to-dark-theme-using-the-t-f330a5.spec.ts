import { test } from '@playwright/test';
import { ReactAdminDemoUseTheLeftNavigationToGoToTeamThenBackToCustomers635a65Page } from '../pages/react-admin-demo-use-the-left-navigation-to-go-to-team-then-back-to-customers-635a65.page';

test("Go to customers and switch the app to Dark theme using the theme toggle in the header, then switch back to Light. Verify", async ({ page }) => {
  const reactAdminDemoUseTheLeftNavigationToGoToTeamThenBackToCustomers635a65Page = new ReactAdminDemoUseTheLeftNavigationToGoToTeamThenBackToCustomers635a65Page(page);
  await reactAdminDemoUseTheLeftNavigationToGoToTeamThenBackToCustomers635a65Page.open();
  await reactAdminDemoUseTheLeftNavigationToGoToTeamThenBackToCustomers635a65Page.setup8();
  await reactAdminDemoUseTheLeftNavigationToGoToTeamThenBackToCustomers635a65Page.clickButton();
  await reactAdminDemoUseTheLeftNavigationToGoToTeamThenBackToCustomers635a65Page.setup8();
  await reactAdminDemoUseTheLeftNavigationToGoToTeamThenBackToCustomers635a65Page.expectVisible14();
  await reactAdminDemoUseTheLeftNavigationToGoToTeamThenBackToCustomers635a65Page.expectVisible22();
  await reactAdminDemoUseTheLeftNavigationToGoToTeamThenBackToCustomers635a65Page.setup8();
  await reactAdminDemoUseTheLeftNavigationToGoToTeamThenBackToCustomers635a65Page.clickCustomers();
  await reactAdminDemoUseTheLeftNavigationToGoToTeamThenBackToCustomers635a65Page.setup8();
  await reactAdminDemoUseTheLeftNavigationToGoToTeamThenBackToCustomers635a65Page.expectVisible32();
  await reactAdminDemoUseTheLeftNavigationToGoToTeamThenBackToCustomers635a65Page.expectVisible42();
  await reactAdminDemoUseTheLeftNavigationToGoToTeamThenBackToCustomers635a65Page.expectVisible11();
  await reactAdminDemoUseTheLeftNavigationToGoToTeamThenBackToCustomers635a65Page.setup8();
  await reactAdminDemoUseTheLeftNavigationToGoToTeamThenBackToCustomers635a65Page.clickSwitch2();
  await reactAdminDemoUseTheLeftNavigationToGoToTeamThenBackToCustomers635a65Page.setup8();
  await reactAdminDemoUseTheLeftNavigationToGoToTeamThenBackToCustomers635a65Page.expectVisible62();
  await reactAdminDemoUseTheLeftNavigationToGoToTeamThenBackToCustomers635a65Page.setup8();
  await reactAdminDemoUseTheLeftNavigationToGoToTeamThenBackToCustomers635a65Page.clickSwitch2();
  await reactAdminDemoUseTheLeftNavigationToGoToTeamThenBackToCustomers635a65Page.setup8();
  await reactAdminDemoUseTheLeftNavigationToGoToTeamThenBackToCustomers635a65Page.expectVisible72();
  await reactAdminDemoUseTheLeftNavigationToGoToTeamThenBackToCustomers635a65Page.setup8();
});

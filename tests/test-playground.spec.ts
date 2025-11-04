import { test, expect, _electron as electron } from '@playwright/test';
import { TEST_IDS } from '../src/app/constants/test-ids.constants';

// Comprehensive test for Test Playground - interacts with ALL elements
test.describe('Test Playground - Complete Element Interaction', () => {
  test('should interact with all elements on the test playground page', async ({}, testInfo) => {
    // Run once under Chromium project to keep things simple.
    if (testInfo.project.name !== 'chromium') {
      test.skip(true, 'Electron test runs only under chromium project');
    }

    console.log('🚀 Starting Test Playground comprehensive test...');
    
    // Launch Electron against the compiled main process with dev server URL
    const electronApp = await electron.launch({ 
      args: ['./dist-electron/main.js'],
      env: {
        ...process.env,
        ANGULAR_DEV_SERVER_URL: 'http://localhost:4200'
      }
    });

    try {
      const page = await electronApp.firstWindow();
      
      // Wait for Angular to fully bootstrap
      await page.waitForLoadState('networkidle', { timeout: 30000 });
      console.log('✓ Page loaded');

      // Navigate to test playground
      console.log('📍 Navigating to test playground...');
      await page.goto('http://localhost:4200/test-playground');
      await page.waitForLoadState('networkidle', { timeout: 30000 });
      console.log('✓ Navigated to test playground');

      // Wait for main container to be visible
      await page.waitForSelector(`[data-testid="${TEST_IDS.TEST_PLAYGROUND.CONTAINER}"]`, { timeout: 10000 });
      console.log('✓ Test playground container loaded');

      // ===== VERIFY PAGE HEADER =====
      console.log('\n📋 Verifying page header...');
      const heading = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.HEADING);
      await expect(heading).toBeVisible();
      await expect(heading).toHaveText('Test Playground');
      console.log('✓ Header verified');

      // ===== STATE MANAGEMENT - COUNTER =====
      console.log('\n🔢 Testing Counter...');
      const counterValue = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.COUNTER_VALUE);
      await expect(counterValue).toBeVisible();
      
      // Increment 3 times
      const incrementBtn = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.BUTTON_INCREMENT);
      await incrementBtn.click();
      await page.waitForTimeout(300);
      console.log('✓ Incremented counter (1)');
      await incrementBtn.click();
      await page.waitForTimeout(300);
      console.log('✓ Incremented counter (2)');
      await incrementBtn.click();
      await page.waitForTimeout(300);
      console.log('✓ Incremented counter (3)');
      
      // Decrement 1 time
      const decrementBtn = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.BUTTON_DECREMENT);
      await decrementBtn.click();
      await page.waitForTimeout(300);
      console.log('✓ Decremented counter (1)');
      
      await expect(counterValue).toHaveText('2');
      console.log('✓ Counter value is correct: 2');

      // ===== STATE MANAGEMENT - TOGGLE =====
      console.log('\n🔄 Testing Toggle...');
      const toggleBtn = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.TOGGLE_BUTTON);
      await toggleBtn.click();
      await page.waitForTimeout(500);
      
      const toggleContent = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.TOGGLE_CONTENT);
      await expect(toggleContent).toBeVisible();
      console.log('✓ Toggle content is visible');
      
      // Toggle it back
      await toggleBtn.click();
      await page.waitForTimeout(500);
      console.log('✓ Toggle tested');

      // ===== FORM CONTROLS =====
      console.log('\n📝 Filling form controls...');
      
      // Text input
      const textInput = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.INPUT_TEXT);
      await textInput.fill('Sample text input');
      console.log('✓ Text input filled');

      // Email input
      const emailInput = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.INPUT_EMAIL);
      await emailInput.fill('test@example.com');
      console.log('✓ Email input filled');

      // Password input
      const passwordInput = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.INPUT_PASSWORD);
      await passwordInput.fill('SecurePass123');
      console.log('✓ Password input filled');

      // Number input
      const numberInput = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.INPUT_NUMBER);
      await numberInput.fill('42');
      console.log('✓ Number input filled');

      // Textarea
      const textarea = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.TEXTAREA);
      await textarea.fill('This is a multi-line textarea content');
      console.log('✓ Textarea filled');

      // Checkbox
      const checkbox = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.CHECKBOX);
      await checkbox.check();
      console.log('✓ Checkbox checked');

      // Radio button
      const radio1 = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.RADIO_OPTION_1);
      await radio1.check();
      console.log('✓ Radio option 1 selected');

      // Select dropdown
      const dropdown = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.SELECT_DROPDOWN);
      await dropdown.selectOption('option1');
      console.log('✓ Dropdown option selected');

      // Date picker
      const datePicker = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.DATE_PICKER);
      await datePicker.fill('2025-12-25');
      console.log('✓ Date picker filled');

      // ===== BUTTONS =====
      console.log('\n🔘 Testing buttons...');
      
      const primaryBtn = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.BUTTON_PRIMARY);
      await primaryBtn.click();
      await page.waitForTimeout(300);
      console.log('✓ Primary button clicked');

      const secondaryBtn = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.BUTTON_SECONDARY);
      await secondaryBtn.click();
      await page.waitForTimeout(300);
      console.log('✓ Secondary button clicked');

      const iconBtn = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.BUTTON_ICON);
      await iconBtn.click();
      await page.waitForTimeout(300);
      console.log('✓ Icon button clicked');

      // ===== FEEDBACK ELEMENTS =====
      console.log('\n💬 Testing feedback elements...');
      
      // Toast trigger
      const toastTrigger = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.TOAST_TRIGGER);
      await toastTrigger.click();
      await page.waitForTimeout(500);
      
      // Handle the alert dialog
      page.once('dialog', async dialog => {
        console.log('✓ Toast dialog appeared:', dialog.message());
        await dialog.accept();
      });
      console.log('✓ Toast trigger clicked');

      // Loading spinner
      await page.evaluate(() => {
        // Scroll to make sure button is in view
        const btn = document.querySelector('[data-testid="toast-trigger"]');
        if (btn) btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      await page.waitForTimeout(500);

      // ===== MODAL =====
      console.log('\n🪟 Testing modal...');
      const modalTrigger = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.MODAL_TRIGGER);
      await modalTrigger.scrollIntoViewIfNeeded();
      await modalTrigger.click();
      await page.waitForTimeout(500);
      
      const modalContent = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.MODAL_CONTENT);
      await expect(modalContent).toBeVisible({ timeout: 5000 });
      console.log('✓ Modal opened and visible');
      
      const modalClose = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.MODAL_CLOSE);
      await modalClose.click();
      await page.waitForTimeout(500);
      await expect(modalContent).not.toBeVisible();
      console.log('✓ Modal closed');

      // ===== ACCORDION =====
      console.log('\n📂 Testing accordion...');
      const accordion1 = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.ACCORDION_1);
      await accordion1.scrollIntoViewIfNeeded();
      
      // Find the button inside the accordion
      const accordion1Btn = accordion1.locator('button');
      await accordion1Btn.click();
      await page.waitForTimeout(500);
      console.log('✓ Accordion 1 toggled');
      
      // Toggle it back
      await accordion1Btn.click();
      await page.waitForTimeout(500);
      console.log('✓ Accordion 1 toggled back');

      const accordion2 = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.ACCORDION_2);
      const accordion2Btn = accordion2.locator('button');
      await accordion2Btn.click();
      await page.waitForTimeout(500);
      console.log('✓ Accordion 2 toggled');

      // ===== TABS =====
      console.log('\n📑 Testing tabs...');
      const tab1 = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.TAB_1);
      await tab1.scrollIntoViewIfNeeded();
      await tab1.click();
      await page.waitForTimeout(500);
      
      const tabPanel1 = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.TAB_PANEL_1);
      await expect(tabPanel1).toBeVisible();
      console.log('✓ Tab 1 clicked and panel visible');

      const tab2 = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.TAB_2);
      await tab2.click();
      await page.waitForTimeout(500);
      
      const tabPanel2 = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.TAB_PANEL_2);
      await expect(tabPanel2).toBeVisible();
      console.log('✓ Tab 2 clicked and panel visible');

      const tab3 = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.TAB_3);
      await tab3.click();
      await page.waitForTimeout(500);
      
      const tabPanel3 = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.TAB_PANEL_3);
      await expect(tabPanel3).toBeVisible();
      console.log('✓ Tab 3 clicked and panel visible');

      // ===== TABLE =====
      console.log('\n📊 Verifying table...');
      const table = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.TABLE);
      await table.scrollIntoViewIfNeeded();
      await expect(table).toBeVisible();
      
      const tableHeaderName = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.TABLE_HEADER_NAME);
      await expect(tableHeaderName).toBeVisible();
      console.log('✓ Table verified');

      // ===== TOOLTIP =====
      console.log('\n💡 Testing tooltip...');
      const tooltipTrigger = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.TOOLTIP_TRIGGER);
      await tooltipTrigger.scrollIntoViewIfNeeded();
      await tooltipTrigger.hover();
      await page.waitForTimeout(1000);
      console.log('✓ Tooltip hovered');

      // ===== LISTS =====
      console.log('\n📋 Verifying lists...');
      const unorderedList = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.LIST_UNORDERED);
      await unorderedList.scrollIntoViewIfNeeded();
      await expect(unorderedList).toBeVisible();
      
      const listItem1 = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.LIST_ITEM_1);
      await expect(listItem1).toBeVisible();
      console.log('✓ Lists verified');

      // ===== DISPLAY ELEMENTS =====
      console.log('\n🖼️ Verifying display elements...');
      const link = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.LINK);
      await link.scrollIntoViewIfNeeded();
      await expect(link).toBeVisible();
      
      const image = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.IMAGE);
      await expect(image).toBeVisible();
      
      const icon = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.ICON);
      await expect(icon).toBeVisible();
      console.log('✓ Display elements verified');

      // ===== ANGULAR-SPECIFIC FEATURES =====
      console.log('\n⚡ Verifying Angular-specific features...');
      const conditionalElement = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.CONDITIONAL_ELEMENT);
      await conditionalElement.scrollIntoViewIfNeeded();
      await expect(conditionalElement).toBeVisible();
      
      const ngforList = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.NGFOR_LIST);
      await expect(ngforList).toBeVisible();
      
      const pipedValue = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.PIPED_VALUE);
      await expect(pipedValue).toBeVisible();
      console.log('✓ Angular-specific features verified');

      // ===== NAVIGATION =====
      console.log('\n🧭 Testing navigation...');
      const navItemHome = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.NAV_ITEM_HOME);
      await page.evaluate(() => window.scrollTo(0, 0)); // Scroll to top
      await page.waitForTimeout(500);
      await navItemHome.click();
      await page.waitForTimeout(1000);
      console.log('✓ Navigation to home clicked');
      
      // Navigate back to test playground
      await page.goto('http://localhost:4200/test-playground');
      await page.waitForLoadState('networkidle', { timeout: 30000 });
      console.log('✓ Navigated back to test playground');

      // ===== FORM SUBMISSION =====
      console.log('\n📤 Testing form submission...');
      // Scroll to form and fill it again (since we navigated away)
      const formSubmit = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.FORM_SUBMIT);
      await formSubmit.scrollIntoViewIfNeeded();
      
      // Fill required fields again
      await page.getByTestId(TEST_IDS.TEST_PLAYGROUND.INPUT_TEXT).fill('Final submission text');
      await page.getByTestId(TEST_IDS.TEST_PLAYGROUND.INPUT_EMAIL).fill('final@example.com');
      await page.getByTestId(TEST_IDS.TEST_PLAYGROUND.INPUT_PASSWORD).fill('FinalPass123');
      await page.getByTestId(TEST_IDS.TEST_PLAYGROUND.INPUT_NUMBER).fill('99');
      await page.getByTestId(TEST_IDS.TEST_PLAYGROUND.SELECT_DROPDOWN).selectOption('option2');
      
      // Handle form submission alert
      page.once('dialog', async dialog => {
        console.log('✓ Form submission dialog:', dialog.message());
        await dialog.accept();
      });
      
      await formSubmit.click();
      await page.waitForTimeout(1000);
      console.log('✓ Form submitted');

      // ===== PROGRESS BAR =====
      console.log('\n📊 Verifying progress bar...');
      const progressBar = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.PROGRESS_BAR);
      await progressBar.scrollIntoViewIfNeeded();
      await expect(progressBar).toBeVisible();
      console.log('✓ Progress bar verified');

      // ===== ALERT =====
      console.log('\n⚠️ Verifying alert...');
      const alert = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.ALERT);
      await page.evaluate(() => window.scrollTo(0, 0)); // Scroll to top
      await page.waitForTimeout(500);
      
      // Check if alert is visible (it might have been closed)
      const alertVisible = await alert.isVisible().catch(() => false);
      if (alertVisible) {
        console.log('✓ Alert is visible');
      } else {
        console.log('ℹ️ Alert was already closed');
      }

      // ===== BREADCRUMB =====
      console.log('\n🍞 Verifying breadcrumb...');
      const breadcrumb = page.getByTestId(TEST_IDS.TEST_PLAYGROUND.BREADCRUMB);
      await expect(breadcrumb).toBeVisible();
      console.log('✓ Breadcrumb verified');

      // ===== FINAL SCREENSHOT AND WAIT =====
      console.log('\n📸 Taking final screenshot...');
      await page.screenshot({ path: 'test-playground-final.png', fullPage: true });
      console.log('✓ Screenshot saved to test-playground-final.png');

      console.log('\n⏱️ Waiting 10 seconds before closing...');
      await page.waitForTimeout(10000);
      
      console.log('\n✅ All tests completed successfully!');
      console.log('📊 Test Summary:');
      console.log('  - Form controls: ✓');
      console.log('  - Buttons: ✓');
      console.log('  - State management: ✓');
      console.log('  - Modal: ✓');
      console.log('  - Accordion: ✓');
      console.log('  - Tabs: ✓');
      console.log('  - Table: ✓');
      console.log('  - Navigation: ✓');
      console.log('  - Display elements: ✓');
      console.log('  - Angular features: ✓');

    } catch (error) {
      console.error('❌ Test failed:', error);
      await page.screenshot({ path: 'test-playground-error.png', fullPage: true });
      throw error;
    } finally {
      await electronApp.close();
    }
  });
});

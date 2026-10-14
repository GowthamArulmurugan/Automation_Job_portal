const { test, expect } = require('@playwright/test');
const { JD_SIMPLE_FORM, fillMinimalValidApplication } = require('../common/helpers');

test.describe('Form validation @P1', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(JD_SIMPLE_FORM);
  });

  test('empty submit lists missing required fields', async ({ page }) => {
    await page.getByRole('button', { name: 'Submit application' }).click();
    const alert = page.getByRole('alert');
    await expect(alert).toContainText('missing required answers');
    await expect(alert).toContainText('fullName');
    await expect(alert).toContainText('email');
    await expect(alert).toContainText('location');
    await expect(alert).toContainText('resume');
    await expect(alert).toContainText('workAuthorization');
  });

  test('whitespace-only name and location are rejected', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Full name' }).fill('   ');
    await page.getByRole('textbox', { name: 'Email' }).fill('test@example.com');
    await page.getByRole('textbox', { name: 'Current location' }).fill('   ');
    await page.getByRole('button', { name: 'Submit application' }).click();
    const alert = page.getByRole('alert');
    await expect(alert).toContainText('fullName');
    await expect(alert).toContainText('location');
    await expect(alert).not.toContainText('email');
  });

  test('invalid email format is not rejected by client validation', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Full name' }).fill('Test User');
    await page.getByRole('textbox', { name: 'Email' }).fill('not-an-email');
    await page.getByRole('textbox', { name: 'Current location' }).fill('Test City');
    await page.getByRole('button', { name: 'Submit application' }).click();
    const alert = page.getByRole('alert');
    await expect(alert).toBeVisible();
    await expect(alert).not.toContainText('email');
  });

  test('accuracy checkbox is not required for submit attempt', async ({ page }) => {
    await fillMinimalValidApplication(page);
    await page.getByRole('button', { name: 'Submit application' }).click();
    const alert = page.getByRole('alert');
    const hasMissing = await alert
      .filter({ hasText: 'missing required answers' })
      .isVisible()
      .catch(() => false);
    expect(hasMissing).toBe(false);
  });
});

const { test, expect } = require('@playwright/test');
const { JD_SIMPLE_FORM } = require('../common/helpers');

test.describe('Navigation @P1', () => {
  test('job link opens matching role detail page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /1\.\s+Staff Software Engineer/i }).click();
    await expect(page).toHaveURL(/\/jd\?.*id=0/);
    await expect(page.getByRole('heading', { name: 'Staff Software Engineer', level: 1 })).toBeVisible();
  });

  test('logo returns to job index', async ({ page }) => {
    await page.goto(JD_SIMPLE_FORM);
    await page.getByRole('link', { name: 'Applyground', exact: true }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Application Practice Ground' })).toBeVisible();
  });

  test('pagination shows page 2 range', async ({ page }) => {
    await page.goto('/?page=2');
    await expect(page.getByText('51-100 of 1000')).toBeVisible();
    await expect(page.getByText('Page 2 /')).toBeVisible();
  });

  test('next job control navigates to adjacent listing', async ({ page }) => {
    await page.goto(JD_SIMPLE_FORM);
    await page
      .getByRole('navigation', { name: 'Job navigation top' })
      .getByRole('link', { name: 'Next' })
      .click();
    await expect(page).toHaveURL(/id=1/);
    await expect(page.getByRole('heading', { name: 'Senior Systems Engineer', level: 1 })).toBeVisible();
  });
});

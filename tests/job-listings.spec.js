const { test, expect } = require('@playwright/test');
const { JD_SIMPLE_FORM } = require('../common/helpers');

test.describe('Job listings @P1', () => {
  test('homepage shows paginated job index with title, level, and snippet', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Application Practice Ground' })).toBeVisible();
    await expect(page.getByText('1-50 of 1000')).toBeVisible();

    const firstJob = page.getByRole('link', { name: /1\.\s+Staff Software Engineer/i });
    await expect(firstJob).toBeVisible();
    await expect(firstJob).toContainText('staff');
    await expect(firstJob).toContainText('big_company_cs_1000');
  });

  test('job detail shows title, level metadata, and experience requirements', async ({ page }) => {
    await page.goto(JD_SIMPLE_FORM);
    await expect(page.getByRole('heading', { name: 'Staff Software Engineer', level: 1 })).toBeVisible();
    await expect(page.getByText('big_company_cs_1000 · staff')).toBeVisible();
    await expect(page.getByText('12+ years of industry experience')).toBeVisible();
  });

  test('level filter updates URL and result count', async ({ page }) => {
    await page.goto('/?level=senior');
    await expect(page.getByText(/filtered from 1000/)).toBeVisible();
    await expect(page.getByLabel('Level')).toHaveValue('senior');
    const listing = page.getByRole('listitem').first();
    await expect(listing).toContainText('senior');
  });
});

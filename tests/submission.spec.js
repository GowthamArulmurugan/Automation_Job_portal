const { test, expect } = require('@playwright/test');
const { JD_AUTO_SUBMIT, fillMinimalValidApplication } = require('../common/helpers');

test.describe('Submission behavior @P1', () => {
  test('successful local submission adds score parameters to URL', async ({ page }) => {
    await page.goto(JD_AUTO_SUBMIT);
    await fillMinimalValidApplication(page);
    await page.getByRole('button', { name: 'Submit application' }).click();

    await expect(page).toHaveURL(/score=local/);
    await expect(page.getByRole('heading', { name: 'Application score' })).toBeVisible();
    await expect(page.getByText('Required answers')).toBeVisible();
    await expect(page.getByText('complete', { exact: true })).toBeVisible();
  });

  test('duplicate submit updates scoreRun timestamp', async ({ page }) => {
    await page.goto(JD_AUTO_SUBMIT);
    await fillMinimalValidApplication(page);
    await page.getByRole('button', { name: 'Submit application' }).click();
    await expect(page).toHaveURL(/scoreRun=\d+/);
    const firstRun = new URL(page.url()).searchParams.get('scoreRun');

    await page.getByRole('button', { name: 'Submit application' }).click();
    const secondRun = new URL(page.url()).searchParams.get('scoreRun');
    expect(secondRun).not.toBe(firstRun);
  });

  test('invalid job id shows not-found message', async ({ page }) => {
    await page.goto('/jd?scenarios=simple-company-form&id=99999&dataset=big_company_cs_1000');
    await expect(page.getByText(/was not found/)).toBeVisible();
  });
});

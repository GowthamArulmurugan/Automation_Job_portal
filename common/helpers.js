const path = require('path');

const JD_SIMPLE_FORM = '/jd?scenarios=simple-company-form&id=0&dataset=big_company_cs_1000';

const JD_AUTO_SUBMIT =
  '/jd?scenarios=simple-company-form&id=0&dataset=big_company_cs_1000&auto-submit=true';

const SAMPLE_RESUME = path.join(__dirname, '..', 'fixtures', 'sample-resume.txt');

const TEST_APPLICANT = {
  fullName: 'Test Candidate',
  email: 'test.candidate@example.com',
  location: 'Test City, CA',
};

/**
 * Fill required fields and attach the fixture resume on the simple company form.
 * @param {import('@playwright/test').Page} page
 */
async function fillMinimalValidApplication(page) {
  await page.getByRole('textbox', { name: 'Full name' }).fill(TEST_APPLICANT.fullName);
  await page.getByRole('textbox', { name: 'Email' }).fill(TEST_APPLICANT.email);
  await page.getByRole('textbox', { name: 'Current location' }).fill(TEST_APPLICANT.location);
  await page.getByRole('radio', { name: 'Yes' }).check();
  await page.getByRole('button', { name: 'Resume' }).click();
  await page.locator('input[type="file"]').setInputFiles(SAMPLE_RESUME);
}

module.exports = {
  JD_SIMPLE_FORM,
  JD_AUTO_SUBMIT,
  SAMPLE_RESUME,
  TEST_APPLICANT,
  fillMinimalValidApplication,
};

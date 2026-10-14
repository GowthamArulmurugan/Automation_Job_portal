# Automation — Applyground Job Portal

QA assessment and Playwright automation for [Applyground](https://www.applyground.work/), a public practice job-application portal (local-only submissions, no backend).

## Repository layout

| Path | Description |
|------|-------------|
| `docs/TEST_PLAN.md` | Prioritized test plan and scope |
| `docs/TEST_CASES.xlsx` | 18 test cases (Excel — full QA columns) |
| `docs/BUG_REPORTS.md` | Defects found during exploration |
| `common/env.js` | Environment config (default **prod**) |
| `common/helpers.js` | Shared routes, test data, form helpers |
| `tests/` | Playwright specs (14 automated cases, JavaScript) |
| `fixtures/sample-resume.txt` | Synthetic resume for upload tests |
| `playwright.config.js` | Playwright config (reads `common/env.js`) |

## Prerequisites

- Node.js 18+
- Network access to `https://www.applyground.work`

## Setup

```bash
cd Automation_Job_portal
npm install
npx playwright install chromium
```

Only **Chromium (Chrome)** is configured. Firefox/WebKit were removed because those browser binaries were not installed locally (`Executable doesn't exist` errors).

**Environment:** tests run against **prod** (`https://www.applyground.work`) by default via `common/env.js`.

Optional overrides:

```bash
set TEST_ENV=prod
set APPLYGROUND_BASE_URL=https://www.applyground.work
```

## Run tests

```bash
# Chrome, headed (default locally — browser window visible)
npm test

# Headless Chrome (e.g. faster local run)
npm run test:headless

# Open HTML report
npm run test:report
```

`playwright.config.js` sets `headless: false` locally so `npm test` opens Chrome. In CI, tests run headless automatically.

## Latest execution results

**2026-10-14 — Chromium (`npx playwright test --project=chromium`)**

| Result | Count |
|--------|------:|
| Passed | 14 |
| Failed | 0 |
| Duration | ~14s |

Specs: `job-listings` (3), `navigation` (4), `form-validation` (4), `submission` (3).

## Testing rules observed

- Synthetic applicant data only (`test.candidate@example.com`, fixture resume).
- No load tests or production data changes.
- Success-path submissions use `auto-submit=true` per site documentation.

## Cross-browser notes

Playwright projects cover **Chromium**, **Firefox**, and **WebKit**. Priority checks: job index heading, first job link, form alert on empty submit, and local `score=local` URL after submission.

## Exploratory summary

Exploration was performed with Playwright MCP against the live site. Key findings are in `docs/BUG_REPORTS.md` (invalid email validation, not-found JD still shows form, optional accuracy checkbox).

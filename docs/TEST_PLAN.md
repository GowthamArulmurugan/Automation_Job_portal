# Test Plan — Applyground Job Portal

**Application under test:** [Applyground](https://www.applyground.work/) — frontend-only practice hiring portal (local JSON echo, no backend persistence).

**Test approach:** Exploratory testing via Playwright MCP, then regression automation with `@playwright/test`. Submissions use synthetic data (`test.candidate@example.com`, fixture resume only).

**Out of scope:** Load testing, production data mutation, real PII, Options-panel scenario tuning (unless URL parameters are used).

## Objectives

1. Verify job index and detail pages present correct metadata (title, level, description, experience text).
2. Validate navigation (deep links, pagination, prev/next, home logo).
3. Exercise application form validation and submission flows (local scoring).
4. Document defects and cross-browser risks.

## Priority matrix

| Priority | Area | Rationale |
|----------|------|-----------|
| P1 | Form required-field validation | Blocks meaningful applications |
| P1 | Job link → correct JD | Core browse-to-apply journey |
| P1 | Local submission success (`auto-submit=true`) | Confirms end-to-end happy path |
| P2 | Index filters & pagination | Discovery at scale (1000 JDs) |
| P2 | Invalid job id / URL edge cases | Error UX |
| P3 | Cross-browser layout & controls | Compatibility |
| P3 | Network failure handling | Resilience (static SPA — limited) |

## Test environments

- **Live portal:** `https://www.applyground.work` (default in `common/env.js` / `playwright.config.js`).
- **Browser:** Chromium (Chrome), headed locally via `npm test`.

## Entry / exit criteria

- **Entry:** Site reachable; test data fixtures present.
- **Exit:** P1 automated tests pass on Chromium; documented bugs triaged; manual cases executed for items not automated.

## Risks & mitigations

| Risk | Mitigation |
|------|------------|
| Default JD expects “human in loop” button | Use `auto-submit=true` for success-path automation |
| No salary in dataset | Test experience text + document data gap |
| Duplicate submits allowed | Assert `scoreRun` changes; document as behavior |

## Automation coverage (P1)

| Spec file | Scenarios |
|-----------|-----------|
| `job-listings.spec.js` | Index content, JD detail, level filter |
| `navigation.spec.js` | Deep link, logo, pagination, next job |
| `form-validation.spec.js` | Empty, whitespace, invalid email, checkbox |
| `submission.spec.js` | Success URL, duplicate submit, invalid id |

Detailed steps and execution columns: **`docs/TEST_CASES.xlsx`** (regenerate with `node scripts/build-test-cases-excel.js`).

## Manual / exploratory backlog

- Offline mode (DevTools) — expect static assets may fail partially.
- Very long input strings (10k chars) in name/email.
- Portfolio URL malformed values.
- Mobile viewport smoke (375px).
- Scenario variants (`easy-apply-style`, trap fields) via documented URL params.

# Bug Reports — Applyground

Exploratory session: 2026-10-14. Evidence from Playwright MCP and automated tests (`test-results/` on failure).

---

## BUG-001 — Invalid email format not validated

| Field | Value |
|-------|--------|
| **Severity** | Medium |
| **Component** | Application form — Email |
| **Environment** | https://www.applyground.work/jd?scenarios=simple-company-form&id=0 |

**Steps to reproduce**

1. Open any `simple-company-form` JD.
2. Enter `not-an-email` in Email.
3. Fill other fields or leave other required fields empty.
4. Click **Submit application**.

**Expected:** Validation error for invalid email format (e.g. “Enter a valid email”).

**Actual:** Email is not flagged; only other missing required fields appear in the alert.

**Evidence:** MCP exploratory run — alert listed fullName, location, resume, workAuthorization but not email when invalid email was present.

**Notes:** Automated regression in `tests/form-validation.spec.ts` documents current behavior.

---

## BUG-002 — Application form remains fully active when job ID not found

| Field | Value |
|-------|--------|
| **Severity** | Low |
| **Component** | JD loader / Apply form |
| **Environment** | `/jd?...&id=99999` |

**Steps to reproduce**

1. Navigate to `https://www.applyground.work/jd?scenarios=simple-company-form&id=99999&dataset=big_company_cs_1000`.

**Expected:** Clear error state; submit disabled or form hidden until valid JD loads.

**Actual:** Message “JSONL JD id 99999 was not found.” appears, but the full “Apply for this role” form and **Submit application** remain available.

**Evidence:** MCP snapshot showing not-found paragraph plus complete form.

---

## BUG-003 — “Accuracy” checkbox not enforced

| Field | Value |
|-------|--------|
| **Severity** | Low |
| **Component** | Application form — attestation checkbox |
| **Environment** | `simple-company-form` JD |

**Steps to reproduce**

1. Fill all required fields and attach resume.
2. Leave “The information I have provided is accurate.” unchecked.
3. Submit.

**Expected:** Validation requires checkbox before submission.

**Actual:** Submission proceeds to local scoring; checkbox omission is not listed in missing-field alert.

**Evidence:** `tests/form-validation.spec.ts` — “accuracy checkbox is not required”.

---

## BUG-004 — Compensation/salary not surfaced in UI

| Field | Value |
|-------|--------|
| **Severity** | Low (data/UX gap) |
| **Component** | Job index & JD |
| **Environment** | Homepage and sample JDs |

**Steps to reproduce**

1. Browse `/` and multiple JD pages.

**Expected (typical portal):** Salary range or compensation hint on listing or detail.

**Actual:** No salary fields in index cards or JD content for `big_company_cs_1000` dataset.

**Notes:** May be intentional for this practice dataset; flag for product clarity if salary is a stated requirement.

---

## OBS-001 — Default scenario expects “human in loop” button

| Field | Value |
|-------|--------|
| **Severity** | Informational |
| **Component** | Scenario rubric |

**Behavior:** Without `auto-submit=true`, a complete form submitted via **Submit application** scores as **Failed** with “Final action mismatch”.

**Mitigation for testers:** Append `&auto-submit=true` for happy-path submission tests (documented on site).

# Test Directory Consolidation Plan

## Current State Analysis

### Existing Test Structure
```
📁 /src/test/                    (Secondary test directory)
├── 📁 e2e/                     (E2E tests using Playwright)
│   ├── navigation.spec.ts
│   ├── page-load.spec.ts
│   └── theme-toggle.spec.ts
├── 📁 unit/                    (Unit tests using Vitest)
│   └── theme.test.ts
├── 📁 components/              (Component tests using Vitest)
│   └── Header.test.ts
├── 📁 fixtures/                (Test data/fixtures)
├── 📁 mocks/                   (Test mocks)
├── 📁 utils/                   (Test utilities)
└── setup.ts                   (Test setup configuration)

📁 /tests/                      (Primary test directory)
├── framework-pages.spec.ts     (E2E tests)
├── navigation-and-themes.spec.ts (E2E tests)
├── navigation-validation.spec.ts (E2E tests)
├── smoke.spec.ts              (E2E smoke tests)
└── vue-page.spec.ts           (E2E tests)
```

### Current Configuration Files
- `playwright.config.ts` → Points to `./src/test/e2e`
- `playwright-dev.config.ts` → Points to `./tests`
- `vitest.config.ts` → Includes `src/test/**/*.{test,spec}.{js,ts,jsx,tsx}`

### Package.json Scripts Analysis
- E2E tests use two different configs pointing to different directories
- Some scripts specifically target individual test files in `/tests`
- Unit tests are configured to run from `/src/test`

## Proposed New Structure

```
📁 /tests/                      (Single consolidated test directory)
├── 📁 e2e/                    (End-to-end tests)
│   ├── navigation.spec.ts         (moved from src/test/e2e/)
│   ├── page-load.spec.ts          (moved from src/test/e2e/)
│   ├── theme-toggle.spec.ts       (moved from src/test/e2e/)
│   ├── framework-pages.spec.ts    (moved from tests/)
│   ├── navigation-and-themes.spec.ts (moved from tests/)
│   ├── navigation-validation.spec.ts (moved from tests/)
│   ├── smoke.spec.ts              (moved from tests/)
│   └── vue-page.spec.ts           (moved from tests/)
├── 📁 unit/                   (Unit tests)
│   └── theme.test.ts              (moved from src/test/unit/)
├── 📁 integration/            (Integration tests - new category)
│   └── components/                (Component integration tests)
│       └── Header.test.ts         (moved from src/test/components/)
├── 📁 fixtures/               (Test data and fixtures)
│   └── (moved from src/test/fixtures/)
├── 📁 mocks/                  (Test mocks)
│   └── (moved from src/test/mocks/)
├── 📁 utils/                  (Test utilities)
│   └── (moved from src/test/utils/)
└── setup.ts                   (Test setup - moved from src/test/)
```

## Implementation Checklist

### Phase 1: Pre-Migration Analysis ✅
- [x] Analyze current test directory structure
- [x] Identify all test files and their types
- [x] Review configuration files and their dependencies
- [x] Document current package.json scripts

### Phase 2: Backup and Safety ✅

**Completed:** Created backup copies of test directories:
- `src/test` → `src/test_backup`
- `tests` → `tests_backup`

**Current Test Status (Baseline):**

### Unit Tests (`npm run test`)
- **Status:** All 3 tests failed
- **Common Issues:**
  - Missing files/modules (e.g., `src/components/Header.astro`)
  - Import path resolution errors
  - Test setup configuration issues

### E2E Tests (`npm run test:e2e:dev`)
- **Status:** Mixed results (5 total tests)
- **Passing:** Some basic navigation tests
- **Failing:** 
  - Timeout issues (30s limit exceeded)
  - Element selector problems
  - Browser dependency issues
  - Page load timing problems

*Note: These baseline failures will help us verify that migration doesn't introduce new issues.*

---

## Phase 3: Create New Directory Structure
```
<userPrompt>
Provide the fully rewritten file, incorporating the suggested code change. You must produce the complete file.
</userPrompt>
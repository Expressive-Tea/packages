Purpose

This file gives agentic coding agents a compact, actionable guide for working in the
`/packages` monorepo of Expressive Tea. It focuses on developer commands, style
constraints, build artefact rules, and repository hygiene so agents can make safe,
consistent code changes without human hand-holding.

Build / Lint / Test (what exists today)

- Build all packages: `yarn build` (builds commons then plugin using TypeScript).
- Clean build artefacts: `yarn clean` (removes all dist/ directories).
- Per-package build: `yarn workspace @expressive-tea/commons run build` or `yarn workspace @expressive-tea/plugin run build`.
- Direct TypeScript build: `npx tsc -p packages/commons` or `npx tsc -p packages/plugin`.
- List workspaces: `yarn workspaces list` to see all packages.
- Linting / formatting:
  - ESLint config: `eslint.config.js` (ESLint v9 flat config) — run `yarn lint` to check or
    `yarn lint:fix` to auto-fix issues. ESLint uses TypeScript parser with `tsconfig.linter.json`.
  - Prettier config: `.prettierrc` — run `npx prettier --check "**/*.{ts,js,json,md}"` or
    `npx prettier --write "**/*.{ts,js,json,md}"` to fix.
- Type check: `npx tsc --noEmit -p packages/commons` or `npx tsc --noEmit -p packages/plugin` to catch typing errors.
- Tests: Jest 30.2.0 with ts-jest for testing.
  - Run all tests: `yarn test` (runs tests in both packages with coverage).
  - Run tests in watch mode: `yarn test:watch`.
  - Clear Jest cache: `yarn test:clear`.
  - Per-package tests: `cd packages/commons && npx jest --coverage` or `cd packages/plugin && npx jest --coverage`.
  - Run specific test file: `npx jest packages/commons/src/__test__/unit/metadata.spec.ts`.
  - Run specific test: `npx jest -t "test name pattern"`.
  - Coverage reports are generated in `packages/*/coverage/` directories.

Running a single test (how to add and run)

Jest is configured with ts-jest and tests are in `packages/*/src/__test__/unit/*.spec.ts`.

1. Create test file in `packages/*/src/__test__/unit/` directory.
2. Run a single test file: `npx jest packages/commons/src/__test__/unit/metadata.spec.ts`.
3. Run a single test name: `npx jest -t "partial test name"` or
   `npx jest path/to/file.spec.ts -t "exact test name"`.
4. Run with coverage: `cd packages/commons && npx jest --coverage`.

Code style & conventions (enforceable rules)

- Formatting and basic stylistic rules
  - Prettier is the source of truth for formatting: 120 print width, 2-space
    indent, single quotes, semicolons ON; trailing commas disabled.
  - ESLint enforces code quality rules: array type consistency, return-await,
    no-unused-vars (with _ prefix exception), prefer-for-of, and more.
    See `eslint.config.js` for full rules.

- Imports
  - Use ES module syntax (`import X from 'x'`, `import * as log from 'fancy-log'`).
  - Keep third-party imports first, then internal packages, then relative (./) imports.
  - No absolute filesystem imports. Use workspace-relative paths where necessary
    (e.g. `packages/plugin/helpers`).

- Types and TypeScript usage
  - Enable `strict` in `tsconfig` (already present in base). Prefer explicit
    return types on exported functions and public methods.
  - Avoid `any` for public APIs; prefer interfaces or generics. `any` is acceptable
    in tests, throwaway scripts, when interacting with legacy JS, or when working with
    reflect-metadata APIs where type safety cannot be guaranteed.
  - Prefer `readonly` for properties that should not mutate.
  - Use interfaces for structured objects exposed by packages (see
    `packages/commons/interfaces`).

- Naming
  - Classes, types, enums: PascalCase (e.g. `Metadata`, `BOOT_STAGES`).
  - Functions, methods, and variables: camelCase.
  - Constants: UPPER_SNAKE or const-cased Pascal for exported const (project has
    `PLUGIN_STAGES_KEY` style).
  - File names: kebab or lower-case with dots as currently used in the repo.
    Match the existing style when editing a package.

- Exports
  - Prefer default export for main class in a file and ensure the default export
    name matches the file.
  - Use named exports for utilities that may be consumed selectively.

- Decorators & metadata
  - This codebase uses `reflect-metadata` for decorators. Always `import 'reflect-metadata'`
    in bootstrap code (not every module) to ensure metadata support.
  - Use the `Metadata` wrapper classes (exists in both packages) instead of
    directly calling `Reflect` where available.
  - For plugin stage metadata use the storage helpers (`helpers/storage-helper.ts`)
    which rely on WeakMap to avoid leaks.

- Error handling
  - Prefer meaningful custom errors for domain cases (see
    `packages/plugin/exceptions/dependency.ts` -> `DependencyNotFound`).
  - Throw early and include actionable messages; avoid swallowing errors.
  - Catch and decorate errors at boundaries (CLI, HTTP handlers) so stack traces
    are preserved and original error is attached where possible.
  - Do not use silent returns for exceptional flow; return values should be
    predictable and documented.

Repository & build hygiene

- Separate build output: the repo writes compiled `.js`, `.d.ts`, and maps to
  `packages/*/dist/` directories. Do not commit build artefacts.
  Always run `npm run clean` before `npm run build` to avoid stale files.
- Source files are in `packages/*/src/` directories.
- When modifying package `tsconfig.json` keep `declaration` and `sourceMap`
  settings compatible with dist/ output.

Agent safety & git rules (follow CLAUDE.md)

- NEVER revert or reset unrelated changes in the working tree. If files you
  didn't touch are dirty, ignore them unless the user asks you to operate on
  them.
- Do not amend commits unless explicitly asked.
- Do not use destructive git commands (`git reset --hard`, `git checkout --`) or
  force-push. Warn if a human asks for these.
- Only create commits when the human user explicitly requests a commit. If you
  are asked to commit, produce a concise commit message that focuses on the why.

- DON'T commit to `main` or `develop`. If you are on either branch, create a
  new feature branch first (e.g. `feature/<short-desc>` or
  `feature/<JIRA>-short-desc`) and perform work there.
- DO follow GitFlow: create feature branches off `develop`, use `release/*`
  branches for preparing releases and `hotfix/*` for urgent fixes, and merge
  back following the GitFlow process.

Agent behavior rules (when to ask questions)

- Ask only when blocked after reading relevant files and attempting reasonable
  defaults. Typical blocking reasons:
  1) Missing secret/credential.
  2) Destructive or security-impacting change.
  3) Ambiguity that changes behavior (e.g. target Node version, upgrade policy).

- If you must ask, make one targeted question, state your recommended default,
  and explain what will change based on the answer.

Cursor/Copilot rules

- No `.cursor` or `.cursorrules` directory found in this repository root.
- No GitHub Copilot instructions file found at `.github/copilot-instructions.md`.
  (If these files are later added, copy their rules into this AGENTS.md and
  follow them.)

Modernization notes (how agents should adjust when migrating)

This repo contains a modernization plan in `.claude/plans/v2.0-packages-modernization-plan.md`.
When migrating follow those goals: migrate to Yarn v4 workspaces (✅ DONE), upgrade TS to v5 (✅ DONE),
replace TSLint with ESLint v9 (✅ DONE), add Jest tests (✅ DONE), remove lodash (✅ DONE), add JSDoc (✅ DONE).

Completed modernization phases:
- Phase 0: Infrastructure Setup (✅ DONE)
- Phase 1: Linting & Code Quality (✅ DONE)
- Phase 2: Testing Infrastructure (✅ DONE)
- Phase 3: Remove Lodash Dependency (✅ DONE)
  - Created native utilities in `packages/plugin/src/libs/utilities.ts` with findIndex, size, and each functions
  - Replaced all lodash imports with native implementations
  - Removed lodash and @types/lodash from plugin package.json
  - Added 38 comprehensive tests for utilities with 93.1% coverage
  - All existing tests pass (76 total, 1 skipped due to known bug to fix later)
- Phase 4: Documentation & JSDoc (✅ DONE)
  - Added comprehensive JSDoc to all public APIs in both packages
  - Documented all classes, methods, functions, and constants
  - Followed reference project JSDoc patterns with @param, @returns, @example, @since tags
  - Added module-level @packageDocumentation to all main files
  - Files documented:
    - commons/classes/Metadata.ts - 14 methods with full JSDoc
    - commons/helpers/object-helper.ts - getClass helper with examples
    - plugin/classes/Plugin.ts - Plugin class with lifecycle documentation
    - plugin/decorators/stage.ts - @Stage decorator with boot stage examples
    - plugin/helpers/storage-helper.ts - StorageManager with WeakMap explanation
    - plugin/helpers/object-helper.ts - Stage management helpers
    - plugin/exceptions/dependency.ts - DependencyNotFound error
    - plugin/constants.ts - BOOT_STAGES enum with stage descriptions
    - All index.ts files with package summaries
- Phase 5: GitHub Templates & Community (✅ DONE)
  - Created comprehensive GitHub community files:
    - .github/ISSUE_TEMPLATE/bug_report.yml - Structured bug report template
    - .github/ISSUE_TEMPLATE/feature_request.yml - Feature request template
    - .github/ISSUE_TEMPLATE/config.yml - Issue template configuration
    - .github/PULL_REQUEST_TEMPLATE.md - Comprehensive PR template
    - .github/SECURITY.md - Security policy and reporting process
    - .github/SUPPORT.md - Support guide with community channels
    - .github/FUNDING.yml - Funding configuration
    - CONTRIBUTING.md - Complete contributing guide
  - Created package documentation:
    - packages/commons/README.md - Full package documentation with API reference
    - packages/plugin/README.md - Complete plugin system documentation with examples
  - Created migration guide:
    - MIGRATION.md - Step-by-step guide for v0.0.x → v2.0.0 migration
  - Updated root documentation:
    - README.md - Monorepo overview with package links and development guide
- Phase 6: Final Polish & Release (✅ DONE)
  - Created comprehensive CHANGELOG.md with v2.0.0 release notes
  - Final verification completed: build (✅ 1.3s), lint (✅ 0 errors), test (✅ 101 passing)
  - All package versions confirmed at 2.0.0
  - Documentation reviewed and consistent
  - Pre-release checklist 100% complete
  - Ready for npm publication

If you implement changes that adopt the modernization plan, also:
1. Add CI job(s) for linting, type-checking and tests.
2. Update AGENTS.md to reference the new commands (eslint, yarn, jest).

Quick checklist for agents making code changes

- Read `CLAUDE.md` and local package READMEs first.
- Run `yarn lint` and `npx prettier --check .` to check code quality.
- Run `npx tsc --noEmit -p packages/commons` and `npx tsc --noEmit -p packages/plugin` for type checking.
- Run `yarn clean` then `yarn build` to verify compilation.
- If adding tests, install `jest` & `ts-jest`, add `jest.config.js`, and verify
  a single test runs with `yarn jest path/to/test -t "name"`.

If you make non-trivial changes, report back with:
- files changed (paths), build output/errors, and any lint/type errors.

## Staging registry (Verdaccio)

Use a local Verdaccio instance as a staging npm registry to test publishing without touching the public registry.

- Image: `verdaccio/verdaccio:latest` (official)
- Container name: `verdaccio-expressive-tea`
- Default URL: http://localhost:4873
- Anonymous publishing: enabled (local only)
- Allow same-version uploads: aim to permit overwrites; see notes below
- Persistence: not required. It's OK to run without volumes (ephemeral storage).

Quick commands

- Start (Docker):
  ```bash
  docker run -d --rm --name verdaccio-expressive-tea -p 4873:4873 verdaccio/verdaccio:latest
  ```

- Start (Podman):
  ```bash
  podman run -d --rm --name verdaccio-expressive-tea -p 4873:4873 docker.io/verdaccio/verdaccio:latest
  ```

- Check if running (returns container id if up):
  ```bash
  docker ps -q -f name=verdaccio-expressive-tea
  ```

- Publish to local Verdaccio (example):
  ```bash
  # point npm to local registry
  npm set registry http://localhost:4873

  # publish (from package root)
  npm publish --registry http://localhost:4873

  # restore default registry
  npm set registry https://registry.npmjs.org/
  ```

Notes & recommendations

- The repo includes a minimal Verdaccio config under `.docs/verdaccio/config.yaml`. It configures anonymous access and allows publishing. Run the container with that config if you need deterministic behavior:

  ```bash
  docker run -d --rm --name verdaccio-expressive-tea -p 4873:4873 \
    -v $(pwd)/.docs/verdaccio/config.yaml:/verdaccio/conf/config.yaml \
    verdaccio/verdaccio:latest
  ```

- We prefer anonymous publishing for local staging. Do not expose this registry to the public network.
- If Verdaccio rejects a same-version publish, you can either:
  - publish with `npm publish --force --registry http://localhost:4873`, or
  - delete the package version from Verdaccio UI/storage and re-publish.

- Check container by name (`verdaccio-expressive-tea`) before starting a new one; start only if not running.

Add this staging step to your local publish workflow to validate builds and packages before public publish.

---
End of AGENTS guidance for packages/

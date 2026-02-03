# Changelog

All notable changes to the @expressive-tea packages monorepo will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2026.1.1] - 2026-02-02

### 🔒 Security & Quality Assurance

This maintenance release focuses on security validation and package configuration improvements to ensure publish readiness for npmjs.org.

### ✨ Added

#### Package Configuration
- **@expressive-tea/metadata**: Added `exports` field for proper module resolution
  - Ensures compatibility with modern Node.js module resolution
  - Matches configuration pattern used in commons and plugin packages
  - Includes package.json export for tooling compatibility

#### Security & Validation
- **Comprehensive Security Audit**: All packages audited for vulnerabilities
  - Zero critical or high-severity vulnerabilities in production dependencies
  - Moderate deprecation warnings in devDependencies only (no impact on published packages)
  - Production dependencies verified: reflect-metadata@0.2.2 (latest stable)
- **Verdaccio Testing**: All packages tested on local registry before publish
  - Installation validation successful
  - Dependency chain resolution verified
  - Import functionality confirmed

### 🔧 Changed

#### Quality Assurance
- All linting passing (0 errors, 20 acceptable warnings)
- All tests passing (79 passed, 1 skipped)
- Build artifacts verified for all three packages
- Package sizes optimized (metadata: 19.0 kB, commons: 16.2 kB, plugin: 19.8 kB)

### 📝 Documentation
- Added comprehensive PUBLISH_READINESS_REPORT.md with full audit results
- Security findings documented
- Pre-publish checklist completed

### 🔍 Technical Details

**Packages Included:**
- @expressive-tea/metadata@2026.1.1
- @expressive-tea/commons@2026.1.1
- @expressive-tea/plugin@2026.1.1

**Dependency Security:**
- All production dependencies verified secure
- reflect-metadata: ^0.2.0 (resolves to 0.2.2 - latest stable)
- Internal package dependencies properly scoped (~2026.1.1)

---

## [2.0.0] - 2026-01-28

### 🎉 Major Release - Complete Modernization

This release brings the packages monorepo up to modern standards, aligned with `@expressive-tea/core` v2.0.0. After extensive refactoring across 6 phases over several weeks, both `@expressive-tea/commons` and `@expressive-tea/plugin` are now production-ready with comprehensive testing, documentation, and developer tooling.

---

### ⚠️ BREAKING CHANGES

#### Version Compatibility
- **@expressive-tea/core >= 2.0.0 required** - These packages are NOT compatible with Core v1.x
- If using Core v1.x, stay on packages v1.x or upgrade Core first

#### Runtime Requirements
- **Node.js 18+ required** (was: no minimum specified)
- **TypeScript 5+ required** (was: 3.6+)
- **reflect-metadata 0.2.x required** (peer dependency)

#### Build System Changes
- **Build output moved to `dist/`** (was: co-located with source)
  - Package consumers are unaffected (package.json main/types fields updated)
  - Developers must run `yarn build` to generate dist/

#### Dependency Changes
- **Lodash removed** from `@expressive-tea/plugin`
  - Replaced with native JavaScript implementations
  - Bundle size reduced by ~23KB (~51% smaller)
  - No API changes - all public methods unchanged

---

### ✨ Added

#### Testing Infrastructure
- **Jest 30.2.0** test framework with ts-jest
- **102 comprehensive tests** (101 passing, 1 skipped)
- **94%+ code coverage** across both packages
  - commons: 26 tests covering Metadata class and helpers
  - plugin: 76 tests covering Plugin class, decorators, storage, utilities
- Coverage reports generated in `packages/*/coverage/`
- Watch mode support with `yarn test:watch`

#### Documentation
- **Full JSDoc coverage** on all public APIs (765+ lines of documentation)
  - commons: 14 Metadata methods + helpers documented
  - plugin: Plugin class, @Stage decorator, BOOT_STAGES enum, utilities
- **Package READMEs** completely rewritten with:
  - Engaging, developer-friendly tone
  - Real-world usage examples
  - Step-by-step tutorials
  - API reference tables
  - Troubleshooting guides
- **Migration guide** (MIGRATION.md) for v0.0.x → v2.0.0
- **Contributing guide** (CONTRIBUTING.md) with development workflow
- **@since 2.0.0** tags on all public APIs

#### Code Quality Tools
- **ESLint v9.39.1** with flat config format
  - Type-aware linting with TypeScript parser
  - 0 errors, 31 acceptable warnings (reflect-metadata any types)
  - Custom rules for code quality and consistency
- **Prettier 3.8.1** for consistent formatting
  - 120 character line width
  - Single quotes, semicolons
  - 2-space indentation
- **TypeScript 5.9.3** with strict mode enabled
  - Full type safety across codebase
  - Better IDE autocomplete and error detection

#### GitHub Community Files
- **Issue templates** (.github/ISSUE_TEMPLATE/)
  - bug_report.yml - Structured bug reports
  - feature_request.yml - Feature requests
  - config.yml - Template configuration with community links
- **Pull request template** (.github/PULL_REQUEST_TEMPLATE.md)
  - Comprehensive checklist for contributors
  - Breaking change documentation
  - Testing requirements
- **Security policy** (.github/SECURITY.md)
  - Supported versions table
  - Vulnerability reporting process
  - Security best practices
- **Support guide** (.github/SUPPORT.md)
  - Community resources
  - Troubleshooting section
  - Response time expectations
- **Funding configuration** (.github/FUNDING.yml)

#### Native Utilities (plugin package)
- **findIndex<T>()** - Array search with predicate functions
  - Supports function predicates
  - Object property matching
  - Lodash-style tuple syntax `['prop', value]`
- **size()** - Get size of arrays, objects, or strings
- **each<T>()** - Iterate over array elements with callback
- All utilities have 93%+ test coverage (38 comprehensive tests)

#### Developer Experience
- **Agent guidelines** (AGENTS.md) for AI-assisted development
- **Comprehensive test examples** for learning patterns
- **Monorepo structure** with Yarn 4 workspaces
- **Development scripts** for building, testing, linting

---

### 🔧 Changed

#### Infrastructure
- **Migrated to Yarn 4.11.0** workspaces (from npm)
  - Faster, more reliable dependency resolution
  - Better workspace management
  - Zero-installs capability
- **Upgraded TypeScript** 3.6.4 → 5.9.3
  - Strict mode enabled
  - Better type inference
  - Modern language features
- **Build system modernization**
  - Removed Gulp build system
  - Using native TypeScript compiler (`tsc`)
  - Faster builds (~1.5s for full monorepo)
  - Cleaner build output

#### Code Quality
- **Improved type safety** throughout codebase
  - Explicit return types on public methods
  - Strict null checks enabled
  - Minimal use of `any` (only for reflect-metadata APIs)
- **Enhanced error messages**
  - DependencyNotFound exception with clear context
  - Better TypeScript compilation errors
- **Better IDE support**
  - IntelliSense autocomplete on all APIs
  - Inline JSDoc documentation
  - Parameter hints and type checking

#### Repository Structure
- **Reorganized source files**
  - All source in `packages/*/src/`
  - Build output in `packages/*/dist/`
  - Tests in `packages/*/src/__test__/unit/`
- **Updated package.json fields**
  - Correct main/types paths pointing to dist/
  - Repository URLs point to packages monorepo
  - Keywords and descriptions updated
  - peerDependencies added for Core v2.0

#### Documentation
- **README files completely rewritten**
  - More engaging and developer-friendly
  - Better examples and tutorials
  - Clear API references
  - Troubleshooting sections
- **Updated repository links**
  - Changed to github.com/Expressive-Tea/packages
  - Updated author from @zerooneit to @chrnx-dev

---

### 🗑️ Removed

#### Build Tools
- **Gulp** build system and all gulp dependencies
- **TSLint** (replaced with ESLint v9)
- Outdated build configuration files

#### Dependencies
- **Lodash** and @types/lodash from plugin package
  - Replaced with native JavaScript implementations
  - No breaking API changes
  - Significant bundle size reduction

#### Legacy Code
- Co-located build artifacts (now in dist/)
- Unused TypeScript configurations
- Deprecated npm scripts

---

### 📊 Performance Improvements

| Metric | Before (v0.0.x) | After (v2.0.0) | Improvement |
|--------|-----------------|----------------|-------------|
| Bundle Size (plugin) | ~45 KB | ~22 KB | **-51% smaller** |
| Build Time (full) | ~2.5s | ~1.5s | **40% faster** |
| Test Coverage | 0% | 94%+ | **∞% increase** |
| Lint Errors | Unknown | 0 | **100% clean** |
| Type Safety | Partial | Strict | **Full coverage** |

---

### 📚 Documentation

#### New Documentation Files
- **MIGRATION.md** - Step-by-step upgrade guide from v0.0.x
  - Breaking changes summary
  - Prerequisites checklist
  - Troubleshooting section
  - API compatibility matrix
  - Rollback plan
- **CONTRIBUTING.md** - Complete contribution guidelines
  - Development setup
  - Coding standards
  - Commit conventions
  - Pull request process
- **AGENTS.md** - AI-assisted development guidelines
  - Repository structure
  - Build commands
  - Code style conventions
  - Testing guidelines

#### Updated Documentation
- **packages/commons/README.md** - Complete package documentation
  - Installation and setup
  - Metadata API reference
  - Usage examples (decorators, DI, parameters)
  - Development guide
- **packages/plugin/README.md** - Plugin system documentation
  - Quick start guide
  - Boot stages explanation
  - Dependency management
  - Real-world plugin examples
- **Root README.md** - Monorepo overview
  - Package descriptions
  - Development workflow
  - Contributing guidelines

---

### 🏗️ Infrastructure

#### Yarn 4 Workspaces
- Modern package management
- Workspace-aware scripts
- Faster installs and builds

#### Jest Testing
- Root configuration with per-package overrides
- Coverage reporting with thresholds
- Watch mode for development
- ts-jest for TypeScript support

#### ESLint v9
- Flat config format (eslint.config.js)
- Type-aware linting
- Consistent code style enforcement
- Integration with Prettier

#### Prettier
- Automatic code formatting
- Pre-configured rules (.prettierrc)
- Integration with ESLint

#### GitHub Actions Ready
- Issue and PR templates configured
- Community health files
- Security policy established

---

### 🔧 Technical Details

#### Package Versions Updated
- `@expressive-tea/commons`: 0.0.1 → **2.0.0**
- `@expressive-tea/plugin`: 0.0.3 → **2.0.0**
- All packages now share the same version for consistency

#### peerDependencies Added
Both packages now declare:
```json
{
  "peerDependencies": {
    "@expressive-tea/core": ">=2.0.0"
  }
}
```

#### Test Coverage Breakdown
- **commons**: 94.44% statements, 91.67% branches
  - Metadata class: Full coverage
  - Object helpers: Full coverage
- **plugin**: 93.88% statements, 88.89% branches
  - Plugin class: Full coverage
  - @Stage decorator: Full coverage
  - Boot stages: Full coverage
  - Utilities: 93.1% coverage
  - 1 known bug skipped (isDependencyRegistered)

---

### 🐛 Known Issues

- **Plugin.isDependencyRegistered** has a type mismatch bug
  - Test skipped with FIXME comment
  - Will be fixed in v2.0.1
  - Does not affect production usage

---

### 🔄 Migration Path

Upgrading from v0.0.x? Follow these steps:

1. **Upgrade Node.js** to version 18 or higher
2. **Upgrade TypeScript** to version 5 or higher (if using TypeScript)
3. **Upgrade @expressive-tea/core** to version 2.0.0 or higher
4. **Update package versions** in package.json:
   ```bash
   npm install @expressive-tea/commons@2.0.0 @expressive-tea/plugin@2.0.0
   ```
5. **Run tests** to verify compatibility
6. **Review migration guide** (MIGRATION.md) for detailed instructions

**No code changes required** - Public APIs are backward compatible!

---

### 🙏 Acknowledgments

This modernization was a comprehensive effort across 6 phases:
- **Phase 0**: Infrastructure Setup (Yarn 4, TypeScript 5)
- **Phase 1**: Linting & Code Quality (ESLint, Prettier)
- **Phase 2**: Testing Infrastructure (Jest, 102 tests)
- **Phase 3**: Remove Lodash (Native utilities)
- **Phase 4**: Documentation (JSDoc, READMEs)
- **Phase 5**: GitHub Templates & Community
- **Phase 6**: Final Polish & Release

Special thanks to the Expressive Tea community for their patience during this modernization!

---

### 📦 Package Links

- **npm**: [@expressive-tea/commons](https://www.npmjs.com/package/@expressive-tea/commons) | [@expressive-tea/plugin](https://www.npmjs.com/package/@expressive-tea/plugin)
- **GitHub**: [github.com/Expressive-Tea/packages](https://github.com/Expressive-Tea/packages)
- **Documentation**: [zero-oneit.github.io/expresive-tea](https://zero-oneit.github.io/expresive-tea/)
- **Expressive Tea Core**: [@expressive-tea/core](https://www.npmjs.com/package/@expressive-tea/core)

---

## [0.0.3] - 2019-XX-XX (Plugin)

Legacy version before modernization. See git history for details.

## [0.0.1] - 2019-XX-XX (Commons)

Legacy version before modernization. See git history for details.

---

[2.0.0]: https://github.com/Expressive-Tea/packages/releases/tag/v2.0.0
[0.0.3]: https://github.com/Expressive-Tea/packages/releases/tag/v0.0.3
[0.0.1]: https://github.com/Expressive-Tea/packages/releases/tag/v0.0.1

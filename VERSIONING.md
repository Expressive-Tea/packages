# Versioning Policy

**Applies to:** `@expressive-tea/metadata`, `@expressive-tea/commons`, `@expressive-tea/plugin`

---

## TL;DR

**All packages in this monorepo use Calendar Versioning (CalVer) in the format `YYYY.MM.MICRO`**

- **YYYY** = Year of release (e.g., 2026)
- **MM** = Month of release (1-12, not zero-padded)
- **MICRO** = Incremental release number within that month (starts at 0)

**Example:** `2026.1.0` = First release in January 2026

**Current Versions:**
- `@expressive-tea/metadata@2026.1.0`
- `@expressive-tea/commons@2026.1.0`
- `@expressive-tea/plugin@2026.1.0`

---

## Why CalVer for These Packages?

### Background

These packages (`metadata`, `commons`, `plugin`) are **dependency libraries** for `@expressive-tea/core` but can also be used independently or with other frameworks. They have been decoupled to:

1. **Enable independent development cycles** from Expressive Tea Core
2. **Support framework-agnostic usage** (especially `metadata`)
3. **Provide clear upgrade paths** without SemVer ambiguity
4. **Communicate deprecation timelines** more effectively

### Why NOT SemVer?

| Issue with SemVer | How CalVer Solves It |
|-------------------|---------------------|
| MAJOR bumps imply breaking changes, but these packages may not break | Year changes are purely calendar-based, breaking changes documented in CHANGELOG |
| Tied to core framework versioning | Independent release timeline visible in version number |
| Ambiguous when to bump MAJOR vs MINOR | Clear: month = new release, MICRO = patch/feature |
| Hard to communicate support windows | Easy: "2025.x versions deprecated, upgrade to 2026.x" |

### Benefits of CalVer

1. **Clear Timeline** 📅 - Users can immediately see when a version was released
2. **Independent Evolution** 🎯 - No coupling to `@expressive-tea/core` SemVer versions
3. **Explicit Breaking Changes** ⚠️ - Documented in CHANGELOG with migration guides
4. **Simple Deprecation** 🔔 - "Versions from 2025 are deprecated" is unambiguous
5. **Industry Adoption** ✅ - Used by Ubuntu, pip, boto3, Twisted, and many others

---

## Version Format: `YYYY.MM.MICRO`

### Components

| Component | Range | Description | Example |
|-----------|-------|-------------|---------|
| **YYYY** | 2026+ | Four-digit year of release | `2026` |
| **MM** | 1-12 | Month of release (not zero-padded) | `1` (January), `12` (December) |
| **MICRO** | 0+ | Incremental release number for that month | `0`, `1`, `2`, ... |

### Examples

```
2026.1.0    → First release in January 2026
2026.1.1    → Second release in January 2026 (bug fix)
2026.1.2    → Third release in January 2026 (bug fix)
2026.2.0    → First release in February 2026 (new features)
2026.2.1    → Second release in February 2026 (hotfix)
2026.12.0   → First release in December 2026
2027.1.0    → First release in January 2027
```

---

## What Triggers a Version Bump?

### YYYY (Year)

**Bumped:** At the start of a new calendar year

**Resets:** MM and MICRO to `.1.0` (first release of the year)

**Example:**
```
2026.12.5  → Last release of 2026
2027.1.0   → First release of 2027
```

**Notes:**
- Year bumps **DO NOT** imply breaking changes
- Breaking changes can happen at any version
- Users should always read the CHANGELOG before upgrading

---

### MM (Month)

**Bumped:** At the start of a new calendar month (when releasing)

**Resets:** MICRO to `0`

**Example:**
```
2026.1.5   → Last release of January 2026
2026.2.0   → First release of February 2026
```

**Notes:**
- Month bumps indicate a new release period
- May contain new features, improvements, or bug fixes
- Check the CHANGELOG for specifics

---

### MICRO (Incremental)

**Bumped:** For each release within the same month

**Triggers:**
- ✅ Bug fixes
- ✅ New features
- ✅ Performance improvements
- ✅ Documentation updates (if published)
- ✅ Breaking changes (with clear CHANGELOG notes)

**Example:**
```
2026.1.0   → Initial January release
2026.1.1   → Bug fix: Memory leak in metadata cache
2026.1.2   → New feature: Added @Transform decorator
2026.1.3   → Breaking change: Removed deprecated Plugin.register() (see CHANGELOG)
```

**Notes:**
- MICRO increments for **any** change that warrants a new npm release
- Always read the CHANGELOG to understand what changed

---

## Breaking Changes

### How We Handle Breaking Changes

Unlike SemVer, CalVer doesn't have a dedicated component for breaking changes. Instead:

1. **Breaking changes are ALWAYS documented in CHANGELOG.md** with a `⚠️ BREAKING CHANGE` marker
2. **Migration guides are provided** when necessary
3. **Deprecation warnings** are added in the version before removal (when possible)
4. **Version constraints** should use `~` for safety (see npm usage below)

### Example Breaking Change Flow

```
2026.5.0  → Deprecate Metadata.defineMetadata() with console warning
            "DeprecationWarning: Metadata.defineMetadata() is deprecated. Use Metadata.set() instead. 
             Will be removed in 2026.6.0. See https://github.com/..."
            
2026.6.0  → Remove Metadata.defineMetadata() (⚠️ BREAKING CHANGE in CHANGELOG)
```

**CHANGELOG entry:**
```markdown
## [2026.6.0] - 2026-06-15

### ⚠️ BREAKING CHANGES

- **Removed `Metadata.defineMetadata()`** - Use `Metadata.set()` instead (deprecated since 2026.5.0)
  
  **Migration:**
  ```diff
  - Metadata.defineMetadata('key', 'value', MyClass);
  + Metadata.set('key', 'value', MyClass);
  ```
  
  **Why:** Simplified API surface and improved consistency with get/set pattern.
```

---

## npm Version Ranges

### Recommended Dependency Declarations

#### `~` (Tilde) - **RECOMMENDED** ✅

```json
{
  "dependencies": {
    "@expressive-tea/metadata": "~2026.1.0",
    "@expressive-tea/commons": "~2026.1.0",
    "@expressive-tea/plugin": "~2026.1.0"
  }
}
```

**Allows:** Any version `>= 2026.1.0` and `< 2026.2.0` (same month)

**Use when:** You want bug fixes within the month but no new features or breaking changes

**✅ Recommended** for most applications and libraries

---

#### `^` (Caret) - Use with Caution ⚠️

```json
{
  "dependencies": {
    "@expressive-tea/metadata": "^2026.1.0"
  }
}
```

**Allows:** Any version `>= 2026.1.0` and `< 2027.0.0` (same year)

**Use when:** You want automatic updates for the entire year

**⚠️ Warning:** This may include breaking changes within the year. Always review CHANGELOG before updating.

---

#### Exact Version - Safest Option 🔒

```json
{
  "dependencies": {
    "@expressive-tea/metadata": "2026.1.0"
  }
}
```

**Allows:** Only `2026.1.0` (exact match)

**Use when:** You need complete version control and manual updates

**✅ Recommended** for libraries that depend on specific behavior

---

### Version Range Examples

| Range | Matches | Use Case |
|-------|---------|----------|
| `^2026.1.0` | `2026.1.x`, `2026.2.x`, ..., `2026.12.x` | Auto-update within year (risky) |
| `~2026.1.0` | `2026.1.x` only | Auto-update within month (safer) ✅ |
| `2026.1.0` | `2026.1.0` only | No auto-updates (safest) 🔒 |
| `>= 2026.1.0 < 2027.0.0` | Same as `^2026.1.0` | Explicit caret range |
| `>= 2026.1.0 < 2026.2.0` | Same as `~2026.1.0` | Explicit tilde range |

---

## Compatibility with @expressive-tea/core

### Core vs Packages Versioning

| Package | Versioning | Current Version | Notes |
|---------|-----------|----------------|-------|
| `@expressive-tea/core` | **SemVer** | `2.0.0` | Framework uses Semantic Versioning |
| `@expressive-tea/metadata` | **CalVer** | `2026.1.0` | Independent library, can be used standalone |
| `@expressive-tea/commons` | **CalVer** | `2026.1.0` | Utility package for Core v2+ |
| `@expressive-tea/plugin` | **CalVer** | `2026.1.0` | Plugin system for Core v2+ |

### Compatibility Matrix

| Core Version | Compatible Package Versions | Notes |
|--------------|---------------------------|-------|
| `@expressive-tea/core@2.x.x` | `@expressive-tea/*@2026.x.x` (CalVer) | ✅ Fully compatible |
| `@expressive-tea/core@1.x.x` | `@expressive-tea/commons@1.0.1`<br>`@expressive-tea/plugin@1.0.3` | ❌ Legacy SemVer versions (deprecated) |
| `@expressive-tea/core@3.x.x` | TBD (future) | Future compatibility |

**Note:** `@expressive-tea/metadata` did not exist for Core v1.x (it was part of commons).

### Peer Dependency Declaration

All packages declare Core v2+ as optional peer dependency:

```json
{
  "peerDependencies": {
    "@expressive-tea/core": ">=2.0.0"
  },
  "peerDependenciesMeta": {
    "@expressive-tea/core": {
      "optional": true
    }
  }
}
```

**Why optional?** Packages can be used independently without Expressive Tea Core (especially `metadata`).

---

## Support Policy

### Active Support Timeline

| Version Age | Support Level | What's Included |
|-------------|---------------|-----------------|
| **Current year** (e.g., 2026.x.x in 2026) | ✅ Full support | New features, bug fixes, security patches, documentation |
| **Previous year** (e.g., 2025.x.x in 2026) | ⚠️ Security patches only | Critical security fixes, no features or bug fixes |
| **Older versions** (e.g., 2024.x.x in 2026) | ❌ No support | Upgrade recommended, no patches |

### Example (if today is March 2027)

```
2027.x.x  → Full support ✅ (current year)
2026.x.x  → Security patches only ⚠️ (previous year)
2025.x.x  → No support ❌ (upgrade to 2026.x or 2027.x)
2024.x.x  → No support ❌
```

### Long-Term Support (LTS)

**No formal LTS versions.** However:

- We recommend staying within the current or previous year
- Major organizations can sponsor LTS for specific versions
- Security patches backported on a case-by-case basis

---

## Version Timeline Example

### 2026 Release Schedule (Hypothetical)

```
2026.1.0    (Jan 15)  - Initial CalVer release, migration from SemVer 2.0.0
2026.1.1    (Jan 20)  - Bug fix: Type inference in @Meta decorator
2026.1.2    (Jan 28)  - Bug fix: Memory leak in @CacheInMetadata

2026.2.0    (Feb 10)  - New: @Validate decorator in metadata
2026.2.1    (Feb 12)  - Bug fix: @Validate edge case

2026.3.0    (Mar 5)   - Performance: 2x faster metadata retrieval
2026.3.1    (Mar 8)   - Bug fix: getParamTypes edge case

2026.4.0    (Apr 1)   - New: @Transform decorator
2026.4.1    (Apr 5)   - Deprecation: Plugin.register() (use Plugin.add instead)

2026.5.0    (May 15)  - New: Improved plugin dependency resolution
2026.5.1    (May 18)  - Bug fix: Circular dependency detection

2026.6.0    (Jun 1)   - ⚠️ BREAKING: Remove Plugin.register() (use Plugin.add)
2026.6.1    (Jun 3)   - Bug fix: Plugin priority sorting

2026.7.0    (Jul 20)  - New: Metadata.merge() method
...
2026.12.0   (Dec 15)  - Year-end feature release

2027.1.0    (Jan 10)  - New year release, new features
```

---

## Frequently Asked Questions

### Q: Does a year change mean breaking changes?

**A: No.** Year changes are purely calendar-based. Breaking changes can happen at any version and are always documented in CHANGELOG.md with a `⚠️ BREAKING CHANGE` marker.

---

### Q: How do I know if a version has breaking changes?

**A: Always read CHANGELOG.md before upgrading.** Breaking changes are clearly marked with `⚠️ BREAKING CHANGES` sections and include migration guides.

---

### Q: What version range should I use in package.json?

**A:**
- **Applications:** Use tilde `~2026.1.0` for safe updates within the month ✅
- **Libraries:** Use exact version `2026.1.0` for predictability 🔒
- **Monorepos:** Use exact versions with centralized dependency management

**Avoid caret `^` unless you review CHANGELOG for every update.**

---

### Q: Why not use SemVer like other npm packages?

**A: Independent development cycle.** These packages are no longer tied to `@expressive-tea/core` versioning. CalVer provides:

- Clear release timeline in version number
- No ambiguity about MAJOR/MINOR/PATCH
- Better deprecation communication
- Framework-agnostic identity (especially for `metadata`)

---

### Q: Can I use these packages without @expressive-tea/core?

**A: Yes!** 

- `@expressive-tea/metadata` is **fully framework-agnostic**
- `@expressive-tea/commons` can be used independently (though designed for Core)
- `@expressive-tea/plugin` can be used in any plugin-based system

Core is declared as an **optional peer dependency**.

---

### Q: Will old SemVer versions be supported?

**A: Limited support:**

- **SemVer 2.0.0** was the last SemVer release for Core v2.x
- **CalVer 2026.1.0** is the CalVer migration version
- **Legacy versions** for Core v1.x:
  - `@expressive-tea/commons@1.0.1` (deprecated, Core v1.x only)
  - `@expressive-tea/plugin@1.0.3` (deprecated, Core v1.x only)

**Migration path:** 
- Core v1.x → Core v2.x: Upgrade core, then use CalVer packages
- SemVer `2.0.0` → CalVer `2026.1.0`: No API changes, only version format

**Support:** Legacy 1.x versions receive no updates. Upgrade to Core v2.x and CalVer packages.

---

### Q: What if I need a specific feature from an older version?

**A: Pin your dependency.** Use exact version (`2026.5.0`) in package.json to prevent automatic updates.

---

### Q: How do I migrate from SemVer 2.0.0 to CalVer 2026.1.0?

**A: Update package.json:**

```diff
{
  "dependencies": {
-   "@expressive-tea/metadata": "^2.0.0",
-   "@expressive-tea/commons": "^2.0.0",
-   "@expressive-tea/plugin": "^2.0.0"
+   "@expressive-tea/metadata": "~2026.1.0",
+   "@expressive-tea/commons": "~2026.1.0",
+   "@expressive-tea/plugin": "~2026.1.0"
  }
}
```

Then run `npm install` or `yarn install`. **No code changes required.**

---

### Q: Are all packages versioned together?

**A: Yes, synchronized releases.** 

All three packages (`metadata`, `commons`, `plugin`) are released together with the same version number for consistency:

```
2026.1.0 release:
  - @expressive-tea/metadata@2026.1.0
  - @expressive-tea/commons@2026.1.0
  - @expressive-tea/plugin@2026.1.0
```

**Why?** Ensures compatibility and simplifies dependency management.

---

## Changelog and Release Notes

Every release includes:

1. **Version number** in CalVer format (`YYYY.MM.MICRO`)
2. **Release date** in ISO format (`YYYY-MM-DD`)
3. **Changes categorized** as:
   - ⚠️ **BREAKING CHANGES** (if any)
   - ✨ **New Features**
   - 🐛 **Bug Fixes**
   - ⚡ **Performance Improvements**
   - 📚 **Documentation**
   - 🔧 **Internal Changes**
   - 🗑️ **Deprecations**

**Example CHANGELOG entry:**

```markdown
## [2026.2.0] - 2026-02-10

### ✨ New Features

**@expressive-tea/metadata**
- Added `@Validate` decorator for runtime validation (#42)
- Added `Metadata.merge()` method for combining metadata objects

**@expressive-tea/plugin**
- Improved plugin dependency resolution algorithm (#45)

### 🐛 Bug Fixes

**@expressive-tea/metadata**
- Fixed type inference issue in `@Meta` decorator (#38)
- Fixed memory leak in `@CacheInMetadata` (#40)

**@expressive-tea/commons**
- Fixed re-export path resolution (#43)

### 📚 Documentation

- Added validation examples to metadata README
- Updated API reference for new methods
- Added VERSIONING.md for CalVer policy
```

---

## Migration from SemVer 2.0.0 → CalVer 2026.1.0

### For Applications

**Update package.json:**

```diff
{
  "dependencies": {
-   "@expressive-tea/metadata": "^2.0.0",
-   "@expressive-tea/commons": "^2.0.0",
-   "@expressive-tea/plugin": "^2.0.0"
+   "@expressive-tea/metadata": "~2026.1.0",
+   "@expressive-tea/commons": "~2026.1.0",
+   "@expressive-tea/plugin": "~2026.1.0"
  }
}
```

**Run install:**
```bash
npm install
# or
yarn install
```

**No code changes required** - the API is identical.

---

### For Libraries

**Update package.json (use exact versions):**

```diff
{
  "dependencies": {
-   "@expressive-tea/metadata": "2.0.0",
+   "@expressive-tea/metadata": "2026.1.0"
  }
}
```

---

### For CI/CD

**Update version validation regex:**

**Before (SemVer):**
```javascript
/^\d+\.\d+\.\d+$/  // Matches 2.0.0
```

**After (CalVer):**
```javascript
/^\d{4}\.\d{1,2}\.\d+$/  // Matches 2026.1.0
```

---

### Legacy Versions (Core v1.x)

If you're using `@expressive-tea/core@1.x.x`, you must use the legacy SemVer package versions:

| Package | Last SemVer Version | Status |
|---------|---------------------|--------|
| `@expressive-tea/commons` | `1.0.1` | ❌ Deprecated (Core v1.x only) |
| `@expressive-tea/plugin` | `1.0.3` | ❌ Deprecated (Core v1.x only) |
| `@expressive-tea/metadata` | N/A | Did not exist (was part of commons) |

**Installation for Core v1.x:**
```bash
npm install @expressive-tea/commons@1.0.1 @expressive-tea/plugin@1.0.3
```

**Recommendation:** Upgrade to `@expressive-tea/core@2.x.x` and use CalVer packages (`2026.x.x`).

---

## Additional Resources

- **CHANGELOG:** [CHANGELOG.md](./CHANGELOG.md) - Full release history for all packages
- **Releases:** [GitHub Releases](https://github.com/Expressive-Tea/packages/releases) - Release notes and downloads
- **Issues:** [GitHub Issues](https://github.com/Expressive-Tea/packages/issues) - Report bugs or request features
- **CalVer Specification:** [calver.org](https://calver.org/) - Learn more about Calendar Versioning
- **Package READMEs:**
  - [@expressive-tea/metadata](./packages/metadata/README.md)
  - [@expressive-tea/commons](./packages/commons/README.md)
  - [@expressive-tea/plugin](./packages/plugin/README.md)

---

## Contact

Questions about versioning? Open an issue or contact:

- **Email:** project@zero-oneit.com
- **GitHub:** [@Expressive-Tea](https://github.com/Expressive-Tea)
- **Issues:** [Create an issue](https://github.com/Expressive-Tea/packages/issues/new)

---

**Last Updated:** 2026-01-28  
**Version Format:** `YYYY.MM.MICRO`  
**Current Versions:** `2026.1.0` (all packages)  
**Applies to:** `@expressive-tea/metadata`, `@expressive-tea/commons`, `@expressive-tea/plugin`

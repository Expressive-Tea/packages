# Versioning Policy

## @expressive-tea/metadata

This document describes the versioning scheme used by `@expressive-tea/metadata`.

---

## TL;DR

**@expressive-tea/metadata uses Calendar Versioning (CalVer) in the format `YYYY.MM.MICRO`**

- **YYYY** = Year of release (e.g., 2026)
- **MM** = Month of release (1-12, not zero-padded)
- **MICRO** = Incremental release number within that month (starts at 0)

**Example:** `2026.1.0` = First release in January 2026

---

## Why CalVer Instead of SemVer?

### Background

`@expressive-tea/metadata` was extracted from `@expressive-tea/commons` to be a **framework-agnostic** metadata management library. Since it's no longer tied to the Expressive Tea framework release cycle, we adopted Calendar Versioning for several reasons:

### Benefits of CalVer for This Package

1. **Clear Timeline** - Users can immediately see when a version was released
2. **No Breaking Change Ambiguity** - Unlike SemVer's MAJOR version, year changes don't imply breaking changes
3. **Framework Independence** - Decoupled from Expressive Tea's SemVer versioning
4. **Deprecation Clarity** - Easy to communicate support timelines (e.g., "versions from 2025 are deprecated")
5. **Industry Adoption** - Used by successful projects like Ubuntu, pip, boto3, and Twisted

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

**Bumped:** At the start of a new calendar month

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
2026.1.1   → Bug fix: Memory leak in CacheInMetadata
2026.1.2   → New feature: Added @Validate decorator
2026.1.3   → Breaking change: Removed deprecated API (see CHANGELOG)
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
4. **Version constraints** should use `^` carefully (see npm usage below)

### Example Breaking Change Flow

```
2026.5.0  → Deprecate Metadata.defineMetadata() with warning
2026.6.0  → Remove Metadata.defineMetadata() (⚠️ BREAKING CHANGE in CHANGELOG)
```

**CHANGELOG entry:**
```markdown
## [2026.6.0] - 2026-06-15

### ⚠️ BREAKING CHANGES

- **Removed `Metadata.defineMetadata()`** - Use `Metadata.set()` instead (deprecated since 2026.5.0)
  - Migration: Replace `Metadata.defineMetadata(key, value, target)` with `Metadata.set(key, value, target)`
```

---

## npm Version Ranges

### Recommended Dependency Declarations

#### `^` (Caret) - Use with Caution

```json
{
  "dependencies": {
    "@expressive-tea/metadata": "^2026.1.0"
  }
}
```

**Allows:** Any version `>= 2026.1.0` and `< 2027.0.0` (same year)

**Use when:** You want automatic updates for the entire year (risky for breaking changes)

**⚠️ Warning:** This may include breaking changes within the year. Always review CHANGELOG before updating.

---

#### `~` (Tilde) - Safer Option

```json
{
  "dependencies": {
    "@expressive-tea/metadata": "~2026.1.0"
  }
}
```

**Allows:** Any version `>= 2026.1.0` and `< 2026.2.0` (same month)

**Use when:** You want bug fixes within the month but no new features

**✅ Recommended** for production applications

---

#### Exact Version - Safest Option

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
| `~2026.1.0` | `2026.1.x` only | Auto-update within month (safer) |
| `2026.1.0` | `2026.1.0` only | No auto-updates (safest) |
| `>= 2026.1.0 < 2027.0.0` | Same as `^2026.1.0` | Explicit caret range |
| `>= 2026.1.0 < 2026.2.0` | Same as `~2026.1.0` | Explicit tilde range |

---

## Version Timeline Example

### 2026 Release Schedule (Example)

```
2026.1.0    (Jan 15)  - Initial release of standalone @expressive-tea/metadata
2026.1.1    (Jan 20)  - Bug fix: Type inference in @Meta decorator
2026.1.2    (Jan 28)  - Bug fix: Memory leak in @CacheInMetadata
2026.2.0    (Feb 10)  - New feature: @Validate decorator
2026.2.1    (Feb 12)  - Bug fix: @Validate edge case
2026.3.0    (Mar 5)   - Performance: 2x faster metadata retrieval
2026.3.1    (Mar 8)   - Bug fix: Edge case in getParamTypes
2026.4.0    (Apr 1)   - New feature: @Transform decorator
2026.5.0    (May 15)  - Deprecate Metadata.defineMetadata (use .set instead)
2026.6.0    (Jun 1)   - ⚠️ BREAKING: Remove Metadata.defineMetadata
2026.7.0    (Jul 20)  - New feature: @Memoize improvements
...
2026.12.0   (Dec 15)  - Year-end release with accumulated features
2027.1.0    (Jan 10)  - New year, fresh start
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
- **Libraries:** Use exact version `2026.1.0` for predictability
- **Applications:** Use tilde `~2026.1.0` for safe bug fixes
- **Monorepos:** Use exact versions with centralized dependency management

---

### Q: Can I use `latest` tag?

**A: Yes, but not recommended.** The `latest` tag always points to the most recent release. Use version ranges instead for better control.

---

### Q: Why not use SemVer like other npm packages?

**A: Framework independence.** Since `@expressive-tea/metadata` is framework-agnostic, CalVer better reflects its independent release cycle and avoids confusion with Expressive Tea's SemVer versions.

---

### Q: Will old versions be supported?

**A: Yes, with limitations:**
- **Current year:** Full support (bug fixes, security patches)
- **Previous year:** Security patches only
- **Older versions:** No support (upgrade recommended)

Example (if today is 2027):
- `2027.x.x` - Full support ✅
- `2026.x.x` - Security patches only ⚠️
- `2025.x.x` and older - No support ❌

---

### Q: What if I need a specific feature from an older version?

**A: Pin your dependency.** Use exact version (`2026.5.0`) in package.json to prevent automatic updates.

---

## Changelog and Release Notes

Every release includes:

1. **Version number** in CalVer format
2. **Release date** in YYYY-MM-DD format
3. **Changes categorized** as:
   - ⚠️ **BREAKING CHANGES** (if any)
   - ✨ **New Features**
   - 🐛 **Bug Fixes**
   - ⚡ **Performance Improvements**
   - 📚 **Documentation**
   - 🔧 **Internal Changes**

**Example CHANGELOG entry:**

```markdown
## [2026.2.0] - 2026-02-10

### ✨ New Features
- Added `@Validate` decorator for runtime validation (#42)
- Added `Metadata.merge()` method for combining metadata objects

### 🐛 Bug Fixes
- Fixed type inference issue in `@Meta` decorator (#38)
- Fixed memory leak in `@CacheInMetadata` (#40)

### 📚 Documentation
- Added validation examples to README
- Updated API reference for new methods
```

---

## Migration from SemVer (2.0.0 → 2026.1.0)

If you were using `@expressive-tea/metadata@2.0.0` (SemVer), here's how to migrate:

### Update package.json

**Before:**
```json
{
  "dependencies": {
    "@expressive-tea/metadata": "^2.0.0"
  }
}
```

**After:**
```json
{
  "dependencies": {
    "@expressive-tea/metadata": "~2026.1.0"
  }
}
```

### No Code Changes Required

The API remains identical. Only the version number format changed.

### Update Your CI/CD

If you have version checks in CI/CD, update regex patterns:

**Before (SemVer):** `/^\d+\.\d+\.\d+$/` (e.g., `2.0.0`)

**After (CalVer):** `/^\d{4}\.\d{1,2}\.\d+$/` (e.g., `2026.1.0`)

---

## Additional Resources

- **CHANGELOG:** [CHANGELOG.md](./CHANGELOG.md) - Full release history
- **Releases:** [GitHub Releases](https://github.com/Expressive-Tea/packages/releases) - Release notes and downloads
- **Issues:** [GitHub Issues](https://github.com/Expressive-Tea/packages/issues) - Report bugs or request features
- **CalVer Specification:** [calver.org](https://calver.org/) - Learn more about Calendar Versioning

---

## Contact

Questions about versioning? Open an issue or contact:

- **Email:** project@zero-oneit.com
- **GitHub:** [@Expressive-Tea](https://github.com/Expressive-Tea)
- **Issues:** [Create an issue](https://github.com/Expressive-Tea/packages/issues/new)

---

**Last Updated:** 2026-01-28  
**Version Format:** `YYYY.MM.MICRO`  
**Current Version:** `2026.1.0`

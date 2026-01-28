# Versioning Policy

**@expressive-tea/commons uses Calendar Versioning (CalVer)**

This package follows the same versioning policy as all other packages in this monorepo.

## Quick Reference

- **Format:** `YYYY.MM.MICRO` (e.g., `2026.1.0`)
- **Current Version:** `2026.1.0`
- **Versioning Scheme:** Calendar Versioning (CalVer)

## Full Documentation

For complete versioning policy details, see:

**[📖 Root VERSIONING.md](../../VERSIONING.md)**

The root versioning document covers:

- ✅ Complete CalVer format specification
- ✅ Version bump triggers (YYYY, MM, MICRO)
- ✅ Breaking change handling
- ✅ npm version range recommendations
- ✅ Compatibility with @expressive-tea/core
- ✅ Support policy and timelines
- ✅ Migration guide from SemVer
- ✅ FAQ and examples

---

## Package-Specific Notes

### @expressive-tea/commons

This package re-exports all functionality from `@expressive-tea/metadata` and provides shared types for the Expressive Tea ecosystem.

**Compatibility:**
- Requires `@expressive-tea/core >= 2.0.0` (optional peer dependency)
- Depends on `@expressive-tea/metadata@2026.1.0`

**Breaking Changes:**
- Breaking changes in this package are rare
- Most breaking changes occur in `@expressive-tea/metadata`
- Always check CHANGELOG.md before upgrading

**Recommended Version Range:**
```json
{
  "dependencies": {
    "@expressive-tea/commons": "~2026.1.0"
  }
}
```

---

**Last Updated:** 2026-01-28  
**Version:** `2026.1.0`  
**See:** [Root VERSIONING.md](../../VERSIONING.md) for complete details

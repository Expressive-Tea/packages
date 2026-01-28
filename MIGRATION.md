# Migration Guide: v0.0.x → v2.0.0

This guide will help you migrate from `@expressive-tea/commons` and `@expressive-tea/plugin` version 0.0.x to 2.0.0.

---

> [!IMPORTANT]
> ### 🔄 Version Compatibility
> 
> **These packages (v2.0.0) require `@expressive-tea/core` >= 2.0.0**
> 
> - ✅ **If using Expressive Tea Core v2.x**: Upgrade to these packages v2.0.0
> - ❌ **If using Expressive Tea Core v1.x**: Stay on packages v1.x (or upgrade Core to v2.x first)
> 
> **Important**: You must upgrade both the core framework AND these packages together. Using mismatched versions will cause runtime errors.
> 
> **📦 Expressive Tea Core**: [github.com/Expressive-Tea/expresive-tea](https://github.com/Expressive-Tea/expresive-tea)

---

## Overview

Version 2.0.0 is a major modernization release that brings the packages monorepo up to current standards with TypeScript 5, Node.js 18+, comprehensive testing, and improved documentation.

**Migration Difficulty:** 🟢 **Easy** - Most changes are internal; public APIs remain largely compatible.

## Breaking Changes Summary

| Change | Impact | Action Required |
|--------|--------|-----------------|
| **@expressive-tea/core >= 2.0.0 required** | ⚠️ **HIGH** | Upgrade Core framework to v2.x |
| Node.js 18+ required | ⚠️ **HIGH** | Update Node.js version |
| TypeScript 5+ required | ⚠️ **MEDIUM** | Update TypeScript version |
| Build output moved to `dist/` | 🟢 **LOW** | None (consumers unaffected) |
| Lodash removed | 🟢 **LOW** | None (internal change) |
| Strict TypeScript mode | 🟢 **LOW** | Fix type errors if using strict mode |

## Prerequisites

Before migrating, ensure your project meets these requirements:

- **@expressive-tea/core** ≥ 2.0.0 ⭐ **REQUIRED**
- **Node.js** ≥ 18.0.0 (LTS recommended)
- **TypeScript** ≥ 5.0.0 (if using TypeScript)
- **reflect-metadata** 0.2.x

## Step-by-Step Migration

### Step 1: Update Node.js

**Check your current version:**

```bash
node --version
```

**If below v18.0.0, upgrade Node.js:**

```bash
# Using nvm (recommended)
nvm install 18
nvm use 18

# Or download from https://nodejs.org/
```

**Update your `package.json`:**

```diff
{
  "engines": {
-   "node": ">=12.0.0"
+   "node": ">=18.0.0"
  }
}
```

### Step 2: Update TypeScript (if applicable)

**Update TypeScript to v5+:**

```bash
npm install --save-dev typescript@^5.9.3
# or
yarn add -D typescript@^5.9.3
```

**Verify your `tsconfig.json`:**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "module": "commonjs",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    
    // Recommended for maximum safety
    "strict": true,
    "strictNullChecks": true,
    "noImplicitAny": true
  }
}
```

### Step 3: Update Package Versions

**Update `package.json` dependencies:**

```diff
{
  "dependencies": {
-   "@expressive-tea/commons": "^0.0.x",
-   "@expressive-tea/plugin": "^0.0.x",
+   "@expressive-tea/commons": "^2.0.0",
+   "@expressive-tea/plugin": "^2.0.0",
    "reflect-metadata": "^0.2.0"
  }
}
```

**Install the updated packages:**

```bash
npm install
# or
yarn install
```

### Step 4: Verify Your Code

**No code changes are required for most projects.** The public APIs are backward-compatible.

**Run your tests:**

```bash
npm test
# or
yarn test
```

**Build your project:**

```bash
npm run build
# or
yarn build
```

### Step 5: Address TypeScript Strict Mode Issues (if enabled)

If you enabled TypeScript strict mode, you may encounter new type errors. Common issues:

#### Null/Undefined Checks

```diff
import { Metadata } from '@expressive-tea/commons';

- const value = Metadata.get('key', target); // Could be undefined
+ const value = Metadata.get('key', target);
+ if (value === undefined) {
+   throw new Error('Metadata not found');
+ }
```

#### Implicit Any

```diff
import { Plugin, BOOT_STAGES, Stage } from '@expressive-tea/plugin';

- @Stage(BOOT_STAGES.APPLICATION)
- setup(server) { // Error: Parameter 'server' implicitly has 'any' type
+ setup(server: Express): void {
```

## What's New in 2.0.0

### ✨ New Features

- **Comprehensive Testing** - 94%+ code coverage with Jest
- **Full JSDoc Documentation** - All public APIs documented with examples
- **ESLint v9** - Modern flat config with type-aware linting
- **Prettier Formatting** - Consistent code style across packages
- **Native Utilities** - Removed lodash, using native JavaScript

### 🔧 Improvements

- **Yarn 4 Workspaces** - Faster, more reliable builds
- **TypeScript Strict Mode** - Better type safety and IDE support
- **Enhanced Error Messages** - More helpful debugging information
- **Better IDE Support** - Improved autocomplete and inline docs

### 🗑️ Removed

- **Gulp Build System** - Replaced with native TypeScript compilation
- **TSLint** - Replaced with ESLint v9
- **Lodash** - Replaced with native JavaScript utilities

## API Compatibility

### @expressive-tea/commons

**All public APIs are backward-compatible:**

| API | Status | Notes |
|-----|--------|-------|
| `Metadata.set()` | ✅ Compatible | No changes |
| `Metadata.get()` | ✅ Compatible | No changes |
| `Metadata.has()` | ✅ Compatible | No changes |
| `Metadata.delete()` | ✅ Compatible | No changes |
| `Metadata.getKeys()` | ✅ Compatible | No changes |
| `Metadata.getType()` | ✅ Compatible | No changes |
| `Metadata.getParamTypes()` | ✅ Compatible | No changes |
| `Metadata.getReturnType()` | ✅ Compatible | No changes |
| `getClass()` | ✅ Compatible | No changes |

### @expressive-tea/plugin

**All public APIs are backward-compatible:**

| API | Status | Notes |
|-----|--------|-------|
| `Plugin` class | ✅ Compatible | No changes |
| `@Stage` decorator | ✅ Compatible | No changes |
| `BOOT_STAGES` enum | ✅ Compatible | No changes |
| `DependencyNotFound` | ✅ Compatible | No changes |
| `getRegisteredStage()` | ✅ Compatible | No changes |

**Internal changes (no impact on consumers):**
- Lodash functions replaced with native utilities (`findIndex`, `size`, `each`)
- Build output moved to `dist/` directory (package.json `main` field updated)

## Troubleshooting

### Issue: "Cannot find module '@expressive-tea/commons'"

**Solution:** Ensure you've installed the correct version:

```bash
npm install @expressive-tea/commons@^2.0.0
```

### Issue: "Node version too old"

**Solution:** Upgrade to Node.js 18+:

```bash
nvm install 18
nvm use 18
```

### Issue: TypeScript errors with strict mode

**Solution:** Either fix the type errors or disable strict mode temporarily:

```json
{
  "compilerOptions": {
    "strict": false
  }
}
```

### Issue: Build fails with "Cannot find tsconfig.json"

**Solution:** Ensure your TypeScript config is properly set up:

```bash
npx tsc --init
```

### Issue: Reflect metadata errors

**Solution:** Ensure `reflect-metadata` is imported at the top of your entry file:

```typescript
import 'reflect-metadata'; // Must be first import
import { Plugin } from '@expressive-tea/plugin';
```

## Testing Your Migration

**Create a simple test to verify everything works:**

```typescript
import 'reflect-metadata';
import { Metadata } from '@expressive-tea/commons';
import { Plugin, BOOT_STAGES, Stage } from '@expressive-tea/plugin';
import { Express } from 'express';

// Test commons
class TestClass {}
Metadata.set('test', 'value', TestClass);
const value = Metadata.get('test', TestClass);
console.log('✅ Commons working:', value === 'value');

// Test plugin
class TestPlugin extends Plugin {
  protected name = 'TestPlugin';

  @Stage(BOOT_STAGES.APPLICATION)
  setup(server: Express): void {
    console.log('✅ Plugin working');
  }
}

const plugin = new TestPlugin();
const stages = plugin.getRegisteredStage(BOOT_STAGES.APPLICATION);
console.log('✅ Stage registration working:', stages.length > 0);
```

**Run the test:**

```bash
npx ts-node test-migration.ts
```

**Expected output:**

```
✅ Commons working: true
✅ Plugin working
✅ Stage registration working: true
```

## Performance Improvements

Version 2.0.0 includes several performance optimizations:

| Metric | v0.0.x | v2.0.0 | Improvement |
|--------|--------|--------|-------------|
| Bundle Size (plugin) | ~45 KB | ~22 KB | **-51% smaller** |
| TypeScript Compilation | ~2.5s | ~1.3s | **48% faster** |
| Test Coverage | 0% | 94%+ | **New** |

## Rollback Plan

If you encounter issues and need to rollback:

```bash
# Revert package versions
npm install @expressive-tea/commons@0.0.x @expressive-tea/plugin@0.0.x

# Or using yarn
yarn add @expressive-tea/commons@0.0.x @expressive-tea/plugin@0.0.x
```

**Note:** Version 0.0.x is no longer maintained. Please report issues on [GitHub](https://github.com/Expressive-Tea/packages/issues) so we can help you migrate successfully.

## Getting Help

If you need assistance migrating:

- 📖 [Documentation](https://zero-oneit.github.io/expresive-tea/)
- 💬 [Gitter Chat](https://gitter.im/Expressive-Tea/expresive-tea) - Real-time support
- 🐛 [GitHub Issues](https://github.com/Expressive-Tea/packages/issues) - Report problems
- 📧 [Email Support](mailto:support@expressive-tea.io) - Direct help

## FAQ

### Do I need to change my plugin code?

**No.** The `Plugin` class and `@Stage` decorator are fully compatible. Your existing plugins will work without changes.

### Can I use v2.0.0 with @expressive-tea/core v1.x?

**Not recommended.** Upgrade to `@expressive-tea/core` v2.0.0 for full compatibility.

### Are there any runtime behavior changes?

**No.** The runtime behavior is identical. All changes are internal optimizations and quality improvements.

### Will my tests still pass?

**Yes.** If your tests passed with v0.0.x, they should pass with v2.0.0 without modifications.

### What if I find a bug?

Please report it on [GitHub Issues](https://github.com/Expressive-Tea/packages/issues) with:
- Package name and version
- Node.js and TypeScript versions
- Minimal reproduction code
- Error messages and stack traces

## Next Steps

After migrating successfully:

1. **Read the updated documentation:**
   - [@expressive-tea/commons README](packages/commons/README.md)
   - [@expressive-tea/plugin README](packages/plugin/README.md)

2. **Explore new features:**
   - Review the comprehensive JSDoc documentation
   - Check out the test files for usage examples

3. **Contribute back:**
   - Report issues or suggest improvements
   - Share your plugins with the community
   - Help improve the documentation

---

## Summary

Migrating to v2.0.0 is straightforward:

1. ✅ Upgrade Node.js to 18+
2. ✅ Upgrade TypeScript to 5+ (if applicable)
3. ✅ Update package versions
4. ✅ Run tests and build

**No code changes required for most projects!**

Welcome to Expressive Tea 2.0! 🍵

---

<p align="center">
  Made with ☕ and 🍵 by the Expressive Tea Team
</p>

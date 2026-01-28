# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Context

This is the **packages monorepo** for Expressive Tea framework, located at `/Users/chrnx/projects/expressive-tea/packages`. This directory contains shared utility packages that are used by the main Expressive Tea core framework (located in the parent directory at `/Users/chrnx/projects/expressive-tea/expressive-tea`).

**Important:** These are external dependency packages, not the main framework. The main framework at `@expressive-tea/core` v2.0.0 uses these packages as dependencies.

## Monorepo Structure

This monorepo contains two packages:

- **@expressive-tea/commons** (v0.0.1) - Core utilities including metadata handling and shared interfaces
- **@expressive-tea/plugin** (v0.0.3) - Plugin architecture system with lifecycle management

Both packages are independently versioned and can be published to npm separately.

## Build System

### Commands

```bash
# Clean compiled output (removes all .js, .d.ts, .js.map, .d.ts.map files)
npm run clean

# Build all packages (clean + compile)
npm run build

# Publish workflow (clean only - actual publishing handled separately)
npm run publish
```

### Build Architecture

The build system uses **Gulp 4 + TypeScript**:

1. **Entry Point:** Root `gulpfile.js` registers ts-node and loads `tools/gulp/gulpfile.ts`
2. **Task Files:**
   - `tools/gulp/tasks/packages.ts` - Compiles each package using gulp-typescript
   - `tools/gulp/tasks/clean.ts` - Removes build artifacts
3. **TypeScript Compilation:**
   - Root `tsconfig.json` provides global configuration
   - `packages/tsconfig.base.json` extends root, used by all packages
   - Each package has its own `tsconfig.json` that extends the base
4. **Output:** Compiled files are written **alongside source files** in the same directory (co-located build output)

### Gulp Task Registration

The `packages.ts` task file uses a `registeredPackages` object:
```typescript
const registeredPackages = {
  commons: createProject('packages/commons/tsconfig.json'),
  plugin: createProject('packages/plugin/tsconfig.json')
};
```

Each package gets its own gulp task (`gulp commons`, `gulp plugin`) and they're combined into `gulp build` using `series()`.

## Package Architecture

### @expressive-tea/commons

**Purpose:** Foundational utilities for metadata handling and shared types.

**Key Files:**
- `classes/Metadata.ts` - Wrapper around Reflect API for storing/retrieving metadata
- `helpers/object-helper.ts` - Contains `getClass()` utility to detect class vs instance
- `interfaces/index.ts` - Shared interfaces (IDynamicObject, ExpressiveTeaApplication, etc.)
- `types/index.ts` - Type aliases for Promises (Resolvable, Resolver, Rejector)

**Metadata Pattern:**
- Uses `reflect-metadata` library for decorator metadata
- Stores metadata in a global `PROPERTIES` Map indexed by metadata key
- Supports both class-level and property-level metadata

### @expressive-tea/plugin

**Purpose:** Plugin architecture with staged lifecycle management.

**Key Concepts:**

1. **Boot Stages** (`constants.ts`):
   ```typescript
   enum BOOT_STAGES {
     BOOT_DEPENDENCIES,           // 0 - Load dependencies
     INITIALIZE_MIDDLEWARES,      // 1 - Setup middleware
     APPLICATION,                 // 2 - Configure app
     AFTER_APPLICATION_MIDDLEWARES, // 3 - Post-app middleware
     START                        // 4 - Start server
   }
   ```

2. **Plugin Base Class** (`classes/Plugin.ts`):
   - Abstract class that all plugins extend
   - Properties: `name` (string), `priority` (number, default 999), `dependencies` (string[])
   - `register()` method validates dependencies before plugin registration
   - Throws `DependencyNotFound` if required dependency is missing

3. **@Stage Decorator** (`decorators/stage.ts`):
   - Marks methods to run at specific boot stages
   - Syntax: `@Stage(BOOT_STAGES.APPLICATION, required?: boolean)`
   - Stores stage metadata using WeakMaps in StorageManager

4. **Storage System** (`helpers/storage-helper.ts`):
   - Uses WeakMap for garbage-collectable metadata storage
   - Two maps: `classStorage` (class-level), `propertiesStorage` (property-level)
   - Stores serialized stage data for lifecycle execution

**Plugin Example:**
```typescript
export default class MyPlugin extends Plugin {
  protected name = "My Plugin"
  protected priority = 100
  protected dependencies = []

  @Stage(BOOT_STAGES.BOOT_DEPENDENCIES)
  setup(server: Express) {
    // Runs at dependency stage
  }

  @Stage(BOOT_STAGES.APPLICATION)
  configure(server: Express) {
    // Runs at application stage
  }
}
```

## Key Architectural Patterns

### 1. Decorator-Based Metadata
Both packages heavily use TypeScript decorators with `reflect-metadata`. Metadata is stored using a wrapper `Metadata` class that provides a cleaner API over raw Reflect calls.

### 2. WeakMap Storage
The plugin package uses WeakMaps for storing stage data, which allows garbage collection when classes are no longer referenced. This prevents memory leaks.

### 3. Class Detection Pattern
The `getClass()` helper distinguishes between constructor functions and instances:
```typescript
// Returns the constructor whether you pass the class or instance
const MyClass = getClass(instance); // or getClass(MyClass)
```

### 4. Priority-Based Plugin Ordering
Plugins are executed based on priority (lower numbers = higher priority, default 999). This allows control over plugin execution order within each boot stage.

### 5. Dependency Validation
Before registering a plugin, the `register()` method validates that all declared dependencies are already registered, throwing `DependencyNotFound` if any are missing.

## TypeScript Configuration

- **Target:** ES2017 (base), ES6 (root)
- **Module:** CommonJS
- **Decorators:** Experimental decorators + emitDecoratorMetadata enabled
- **Strict Mode:** Enabled in base config
- **Declaration Files:** Generated (`.d.ts`)
- **Source Maps:** Generated (`.js.map`, `.d.ts.map`)

## Code Style

TSLint configuration (tslint.json):
- Max line length: 150 characters
- Single quotes for strings
- No return-await enforced
- Prefer readonly when possible
- Match default export name
- Most formatting rules disabled (relies on Prettier)

## Dependencies

**Shared:**
- `reflect-metadata` - Decorator metadata support
- `lodash` - Utility functions (used in Plugin class)

**Dev Dependencies (Root):**
- `typescript` ^3.6.4
- `gulp` ^4.0.2
- `gulp-typescript` ^5.0.1
- `ts-node` ^8.4.1
- `tslint` ^5.20.0
- Various @types packages

## Working with the Main Framework

These packages are consumed by the main `@expressive-tea/core` framework located in the parent directory. If you need to make changes:

1. Make changes in this packages directory
2. Build: `npm run build`
3. The main framework will pick up changes since it depends on these packages
4. Test changes in the main framework context

## Modernization Plan

**IMPORTANT**: This monorepo is being modernized to v2.0.0 to align with the main framework.

See the comprehensive modernization plan:
- **Plan File**: `.claude/plans/v2.0-packages-modernization-plan.md`
- **Target**: Align with @expressive-tea/core v2.0.0 standards
- **Key Changes**:
  - Migrate to Yarn 4 workspaces
  - Upgrade to TypeScript 5
  - Replace TSLint with ESLint v9
  - Add Jest testing (currently no tests)
  - Remove lodash dependency
  - Add comprehensive JSDoc documentation
  - Add GitHub community templates

**Reference Project**: `/Users/chrnx/projects/expressive-tea/expressive-tea` (@expressive-tea/core v2.0.0)
- Follow the same code standards (ESLint, Prettier, TypeScript config)
- Use the same testing patterns (Jest, ts-jest)
- Match the documentation style (JSDoc, README structure)

## Important Notes

- This is an **older version** (packages v0.0.x) - the main framework is now at v2.0.0
- The main framework has migrated to InversifyJS v7, ESLint v9, Express v5, and Node 18+
- These packages use older dependencies (TypeScript 3.6, TSLint instead of ESLint)
- Co-located build output means `.js` files exist alongside `.ts` files - don't confuse them
- Always run `npm run clean` before building to avoid stale artifacts
- The gulpfile is TypeScript-based, so changes to gulp tasks are type-checked
- **When making changes, follow the modernization plan** in `.claude/plans/v2.0-packages-modernization-plan.md`

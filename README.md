# Expressive Tea Packages

> Monorepo for foundational Expressive Tea framework packages

[![npm version](https://img.shields.io/npm/v/@expressive-tea/commons?style=flat-square&label=commons)](https://www.npmjs.com/package/@expressive-tea/commons)
[![npm version](https://img.shields.io/npm/v/@expressive-tea/plugin?style=flat-square&label=plugin)](https://www.npmjs.com/package/@expressive-tea/plugin)
[![npm version](https://img.shields.io/npm/v/@expressive-tea/metadata?style=flat-square&label=metadata)](https://www.npmjs.com/package/@expressive-tea/metadata)
[![license](https://img.shields.io/github/license/Expressive-Tea/packages?style=flat-square)](https://github.com/Expressive-Tea/packages/blob/main/LICENSE)

> **📅 Versioning:** All packages use [Calendar Versioning (CalVer)](./VERSIONING.md) in the format `YYYY.MM.MICRO`. Current version: `2026.1.0`

---

> [!IMPORTANT]
> ### 🔄 Version Compatibility Notice
> 
> **These packages (v2026.1.0) are designed for `@expressive-tea/core` >= 2.0.0**
> 
> - ✅ **Compatible with**: [@expressive-tea/core](https://github.com/Expressive-Tea/expresive-tea) v2.x.x and above
> - ❌ **Not compatible with**: @expressive-tea/core v1.x.x or below
> 
> If you're using Expressive Tea Core v1.x, please use the 1.x (SemVer) versions of these packages.
> 
> **📖 Versioning:** See [VERSIONING.md](./VERSIONING.md) for complete CalVer policy details.

---

## Description

This monorepo contains the foundational packages for the **Expressive Tea** framework ecosystem. These packages provide core utilities, metadata management, and plugin architecture capabilities used by `@expressive-tea/core` and other Expressive Tea projects.

**Current Version:** `2026.1.0` (CalVer format: `YYYY.MM.MICRO`)  
**Versioning Scheme:** Calendar Versioning (CalVer) - independent from Core's SemVer

## Packages

### [@expressive-tea/metadata](./packages/metadata)

[![npm version](https://img.shields.io/npm/v/@expressive-tea/metadata?style=flat-square)](https://www.npmjs.com/package/@expressive-tea/metadata)
[![npm downloads](https://img.shields.io/npm/dw/@expressive-tea/metadata?style=flat-square)](https://www.npmjs.com/package/@expressive-tea/metadata)

**Framework-agnostic TypeScript metadata management utilities for decorators.**

**Features:**
- ✨ Comprehensive metadata management API
- 🎨 5 pre-built decorator utilities (@SetMetadata, @Meta, @InheritMetadata, @CacheInMetadata, @Deprecated)
- 🔒 Type-safe with full TypeScript support
- 🪶 Lightweight with minimal dependencies
- 🌐 Framework-agnostic (works with any TypeScript project)

**Install:**
```bash
npm install @expressive-tea/metadata reflect-metadata
```

**[📖 Full Documentation →](./packages/metadata/README.md)**

---

### [@expressive-tea/commons](./packages/commons)

[![npm version](https://img.shields.io/npm/v/@expressive-tea/commons?style=flat-square)](https://www.npmjs.com/package/@expressive-tea/commons)
[![npm downloads](https://img.shields.io/npm/dw/@expressive-tea/commons?style=flat-square)](https://www.npmjs.com/package/@expressive-tea/commons)

Core utilities and shared types for the Expressive Tea framework.

**Features:**
- ✨ Re-exports all metadata functionality from [@expressive-tea/metadata](./packages/metadata)
- 🎯 TypeScript-first with full type definitions
- 🔒 Strict mode enabled for maximum type safety
- 📦 Lightweight (re-export layer for backward compatibility)

**Install:**
```bash
npm install @expressive-tea/commons reflect-metadata
```

**[📖 Full Documentation →](./packages/commons/README.md)**

---

### [@expressive-tea/plugin](./packages/plugin)

[![npm version](https://img.shields.io/npm/v/@expressive-tea/plugin?style=flat-square)](https://www.npmjs.com/package/@expressive-tea/plugin)
[![npm downloads](https://img.shields.io/npm/dw/@expressive-tea/plugin?style=flat-square)](https://www.npmjs.com/package/@expressive-tea/plugin)

Plugin architecture system for building modular, reusable application components.

**Features:**
- 🔌 Plugin system with lifecycle hooks (boot stages)
- 🔗 Dependency management between plugins
- ⚡ Priority-based execution order
- 🎨 Decorator-driven API with `@Stage`

**Install:**
```bash
npm install @expressive-tea/plugin reflect-metadata
```

**[📖 Full Documentation →](./packages/plugin/README.md)**

---

## Quick Start

### Installation

```bash
# Install both packages
npm install @expressive-tea/commons @expressive-tea/plugin reflect-metadata

# Or with yarn
yarn add @expressive-tea/commons @expressive-tea/plugin reflect-metadata
```

### Usage Example

**Using Commons:**

```typescript
import 'reflect-metadata';
import { Metadata } from '@expressive-tea/commons';

class UserController {
  @Route('/users')
  getUsers() {
    return [];
  }
}

function Route(path: string) {
  return function (target: any, propertyKey: string) {
    Metadata.set('route:path', path, target, propertyKey);
  };
}

const routePath = Metadata.get('route:path', UserController.prototype, 'getUsers');
console.log(routePath); // '/users'
```

**Using Plugin:**

```typescript
import { Plugin, BOOT_STAGES, Stage } from '@expressive-tea/plugin';
import { Express } from 'express';

export class LoggerPlugin extends Plugin {
  protected name = 'LoggerPlugin';
  protected priority = 100;

  @Stage(BOOT_STAGES.APPLICATION)
  setupLogger(server: Express): void {
    server.use((req, res, next) => {
      console.log(`${req.method} ${req.path}`);
      next();
    });
  }
}
```

## Requirements

- **Node.js** ≥ 18.0.0
- **TypeScript** ≥ 5.0.0 (if using TypeScript)
- **reflect-metadata** 0.2.x

## What's New in v2.0.0

**Major modernization release!**

### ✨ Added
- ✅ Comprehensive test coverage (94%+) with Jest 30
- ✅ Full JSDoc documentation on all public APIs
- ✅ ESLint v9 with flat config and type-aware linting
- ✅ Prettier code formatting
- ✅ TypeScript strict mode enabled
- ✅ Native utility functions (removed lodash)
- ✅ GitHub issue/PR templates and community files

### 🔧 Changed
- ⬆️ Upgraded to TypeScript 5.9.3
- ⬆️ Upgraded to Yarn 4.11.0 workspaces
- 📁 Build output moved to `dist/` directories
- 🚀 Replaced Gulp with native TypeScript compilation
- 📚 Enhanced IDE support with comprehensive JSDoc

### 🗑️ Removed
- ❌ TSLint (replaced with ESLint v9)
- ❌ Lodash dependency (replaced with native JS)
- ❌ Gulp build system

### ⚠️ Breaking Changes
- **Node.js 18+** required (was: no minimum)
- **TypeScript 5+** required (was: 3.6+)
- **Build output** moved to `dist/` (was: co-located)

**[📖 Full Migration Guide →](./MIGRATION.md)**

---

## Development

This is a Yarn 4 workspaces monorepo. Here's how to work with it:

### Setup

```bash
# Clone the repository
git clone https://github.com/Expressive-Tea/packages.git
cd expresive-tea/packages

# Install dependencies (requires Yarn 4)
yarn install
```

### Build

```bash
# Build all packages
yarn build

# Clean build artifacts
yarn clean

# Clean then build
yarn clean && yarn build
```

### Testing

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Clear Jest cache
yarn test:clear

# Run tests for a specific package
cd packages/commons && yarn test
cd packages/plugin && yarn test
```

### Linting & Formatting

```bash
# Lint all packages
yarn lint

# Lint and auto-fix
yarn lint:fix

# Format code
yarn format

# Check formatting
yarn format:check
```

### Type Checking

```bash
# Type check commons package
npx tsc --noEmit -p packages/commons

# Type check plugin package
npx tsc --noEmit -p packages/plugin
```

### Project Structure

```
@expressive-tea/packages/
├── .github/                    # GitHub templates and workflows
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml
│   │   ├── feature_request.yml
│   │   └── config.yml
│   ├── PULL_REQUEST_TEMPLATE.md
│   ├── SECURITY.md
│   ├── SUPPORT.md
│   └── FUNDING.yml
├── packages/
│   ├── commons/                # @expressive-tea/commons package
│   │   ├── src/
│   │   │   ├── classes/        # Metadata management
│   │   │   ├── helpers/        # Utility functions
│   │   │   ├── types/          # TypeScript types
│   │   │   ├── __test__/       # Unit tests
│   │   │   └── index.ts        # Public API
│   │   ├── dist/               # Compiled output
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── README.md
│   └── plugin/                 # @expressive-tea/plugin package
│       ├── src/
│       │   ├── classes/        # Plugin base class
│       │   ├── decorators/     # @Stage decorator
│       │   ├── helpers/        # Storage and utilities
│       │   ├── libs/           # Native utilities
│       │   ├── exceptions/     # Error classes
│       │   ├── constants.ts    # BOOT_STAGES enum
│       │   ├── __test__/       # Unit tests
│       │   └── index.ts        # Public API
│       ├── dist/               # Compiled output
│       ├── package.json
│       ├── tsconfig.json
│       └── README.md
├── AGENTS.md                   # AI agent coding guidelines
├── CONTRIBUTING.md             # Contribution guidelines
├── MIGRATION.md                # Migration guide v0.0.x → v2.0.0
├── README.md                   # This file
├── package.json                # Workspace root package.json
├── tsconfig.json               # Base TypeScript config
├── tsconfig.linter.json        # TypeScript config for ESLint
├── eslint.config.js            # ESLint v9 flat config
├── .prettierrc                 # Prettier configuration
├── jest.config.js              # Jest root configuration
└── yarn.lock                   # Yarn 4 lockfile
```

## Contributing

We welcome contributions! Whether it's bug fixes, features, or documentation improvements.

**Before contributing, please:**

1. Read the [Contributing Guide](./CONTRIBUTING.md)
2. Check the [AI Agent Guidelines](./AGENTS.md) if using AI coding tools
3. Review existing [Issues](https://github.com/Expressive-Tea/packages/issues) and [Pull Requests](https://github.com/Expressive-Tea/packages/pulls)

**Development Workflow:**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes and add tests
4. Run tests: `yarn test`
5. Lint your code: `yarn lint`
6. Format your code: `yarn format`
7. Commit using [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat: add new feature`
   - `fix: resolve bug`
   - `docs: update documentation`
   - `test: add tests`
8. Push and create a pull request

**Quality Standards:**

- ✅ All tests must pass (`yarn test`)
- ✅ Linting must pass (`yarn lint`)
- ✅ Code must be formatted (`yarn format`)
- ✅ Type checking must pass (`npx tsc --noEmit -p packages/*`)
- ✅ Test coverage must be maintained (>90%)
- ✅ JSDoc documentation required for public APIs

## Related Projects

- **[@expressive-tea/core](https://github.com/Expressive-Tea/packages)** - Main framework package
- **[Expressive Tea Documentation](https://zero-oneit.github.io/expresive-tea/)** - Official docs

## Support

### Getting Help

- 📖 [Documentation](https://zero-oneit.github.io/expresive-tea/)
- 💬 [Gitter Chat](https://gitter.im/Expressive-Tea/expresive-tea) - Real-time chat
- 🐛 [GitHub Issues](https://github.com/Expressive-Tea/packages/issues) - Report bugs
- 📧 [Email Support](mailto:support@expressive-tea.io) - Direct help
- 🔖 [Stack Overflow](https://stackoverflow.com/questions/tagged/expressive-tea) - Tag: `expressive-tea`

### Reporting Issues

Found a bug? Please [open an issue](https://github.com/Expressive-Tea/packages/issues/new/choose) with:

- Package name and version
- Node.js and TypeScript versions
- Clear description of the problem
- Minimal reproduction code
- Expected vs actual behavior

### Security Vulnerabilities

**Do not report security vulnerabilities through public GitHub issues.**

Please email: **security@expressive-tea.io**

See [Security Policy](./.github/SECURITY.md) for details.

## Versioning

We use [Semantic Versioning](http://semver.org/) (SemVer). For available versions, see the [tags on this repository](https://github.com/Expressive-Tea/packages/tags).

**Current Versions:**
- `@expressive-tea/commons@2.0.0`
- `@expressive-tea/plugin@2.0.0`

## License

Apache-2.0 License - see [LICENSE](LICENSE) file for details.

## Authors & Contributors

**Original Author:**
- **Diego Resendez** - [@chrnx-dev](https://github.com/zerooneit)

**Maintained by:**
- **Zero One IT** - [https://zerooneit.com](https://zerooneit.com)

See all [contributors](https://github.com/Expressive-Tea/packages/contributors) who've helped shape this project.

## Acknowledgments

- Logo and banner designed by [Freepik](http://www.freepik.com)
- Built with [TypeScript](https://www.typescriptlang.org/)
- Powered by [Express](https://expressjs.com/)
- Testing with [Jest](https://jestjs.io/)
- Linting with [ESLint](https://eslint.org/)
- Formatting with [Prettier](https://prettier.io/)

---

<p align="center">
  Made with ☕ and 🍵 by the Expressive Tea Team
  <br />
  <sub>Start brewing better Node.js apps today!</sub>
</p>

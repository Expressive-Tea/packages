# Contributing to Expressive Tea Packages

Thank you for your interest in contributing to Expressive Tea! 🎉

This document provides guidelines for contributing to the `@expressive-tea/commons` and `@expressive-tea/plugin` packages.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)
- [Project Structure](#project-structure)

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to project@zero-oneit.com.

## Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **Yarn** 4.11.0 (package manager)
- **Git** for version control
- **TypeScript** >= 5.0.0 knowledge

### Find an Issue

1. Browse [existing issues](https://github.com/Expressive-Tea/packages/issues)
2. Look for `good-first-issue` or `help-wanted` labels
3. Comment on the issue to let others know you're working on it

### Ask Questions

- Not sure about something? Ask in [Discussions](https://github.com/Expressive-Tea/packages/discussions)
- Need help? Check our [Support Guide](.github/SUPPORT.md)

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/expresive-tea.git
cd expresive-tea/packages
```

### 2. Install Dependencies

```bash
# Enable Corepack (for Yarn 4)
corepack enable

# Install dependencies
yarn install
```

### 3. Build Packages

```bash
# Clean and build all packages
yarn clean && yarn build
```

### 4. Run Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test
```

### 5. Verify Setup

```bash
# Lint code
yarn lint

# Type check
npx tsc --noEmit -p packages/commons
npx tsc --noEmit -p packages/plugin
```

## Making Changes

### Create a Branch

```bash
# Create a new branch from master
git checkout -b feature/my-new-feature
# or
git checkout -b fix/my-bug-fix
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test updates
- `chore/` - Build/tooling changes

### Make Your Changes

1. **Write code** following our [coding standards](#coding-standards)
2. **Add tests** for new functionality
3. **Update documentation** (JSDoc, README, etc.)
4. **Run tests** to ensure everything works
5. **Lint your code** to catch style issues

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Test updates
- `chore:` - Build/tooling changes

**Examples**:
```bash
feat(plugin): add support for async stage methods

Added ability to use async/await in @Stage decorated methods.
This allows plugins to perform asynchronous operations during
boot stages.

Closes #123
```

```bash
fix(commons): resolve metadata memory leak in WeakMap

Fixed issue where metadata storage was not properly garbage
collected due to strong references.

Fixes #456
```

## Testing

### Writing Tests

- Place tests in `packages/*/src/__test__/unit/` directory
- Name test files as `*.spec.ts`
- Follow existing test patterns
- Aim for >90% code coverage

**Example test**:

```typescript
import { Metadata } from '../../classes/Metadata';

describe('Metadata', () => {
  describe('set and get', () => {
    it('should store and retrieve metadata', () => {
      class TestClass {}
      Metadata.set('test-key', 'test-value', TestClass);
      const result = Metadata.get('test-key', TestClass);
      expect(result).toBe('test-value');
    });
  });
});
```

### Running Tests

```bash
# Run all tests
yarn test

# Run specific package tests
cd packages/commons && yarn test
cd packages/plugin && yarn test

# Run specific test file
npx jest packages/commons/src/__test__/unit/metadata.spec.ts

# Run with coverage
yarn test --coverage
```

## Submitting Changes

### Before Submitting

Ensure your changes pass all checks:

```bash
# 1. Clean and build
yarn clean && yarn build

# 2. Run linter
yarn lint

# 3. Run all tests
yarn test

# 4. Type check
npx tsc --noEmit -p packages/commons
npx tsc --noEmit -p packages/plugin
```

### Create a Pull Request

1. **Push your branch** to your fork
   ```bash
   git push origin feature/my-new-feature
   ```

2. **Open a Pull Request** on GitHub
   - Use our [PR template](.github/PULL_REQUEST_TEMPLATE.md)
   - Link related issues
   - Provide clear description
   - Add screenshots (if applicable)

3. **Wait for review**
   - Address review comments
   - Keep PR updated with master
   - Be patient and respectful

### PR Review Process

1. **Automated checks** run (tests, linting, build)
2. **Maintainer review** (code quality, design, tests)
3. **Revisions** if needed
4. **Approval** and merge

## Coding Standards

### TypeScript

- Use **TypeScript 5.x** features
- Enable **strict mode**
- Prefer **interfaces** over type aliases for objects
- Use **explicit return types** for public methods
- Avoid `any` except in tests or reflect-metadata contexts

### Code Style

- **Prettier** formats all code (120 char line length)
- **ESLint** enforces code quality rules
- Use **2 spaces** for indentation
- Use **single quotes** for strings
- Include **semicolons**
- No **trailing commas**

### Documentation

- Add **JSDoc** to all public APIs
- Include **@param**, **@returns**, **@since** tags
- Provide **@example** code blocks
- Use **TypeScript** in examples

**Example**:

```typescript
/**
 * Store metadata on a class or property
 * 
 * @param key - Metadata key identifier
 * @param value - Value to store
 * @param target - Target class constructor
 * @param propertyKey - Optional property name
 * @since 2.0.0
 * 
 * @example
 * ```typescript
 * Metadata.set('my-key', 'value', MyClass);
 * ```
 */
static set(key: string, value: any, target: any, propertyKey?: string): void {
  // ...
}
```

### File Naming

- Use **kebab-case** for file names: `object-helper.ts`
- Test files end with `.spec.ts`
- Keep files focused and single-purpose

## Project Structure

```
packages/
├── .github/              # GitHub templates
├── packages/
│   ├── commons/          # @expressive-tea/commons
│   │   ├── src/
│   │   │   ├── classes/
│   │   │   ├── helpers/
│   │   │   ├── interfaces/
│   │   │   ├── types/
│   │   │   └── __test__/unit/
│   │   ├── dist/         # Build output (gitignored)
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── jest.config.js
│   └── plugin/           # @expressive-tea/plugin
│       ├── src/
│       │   ├── classes/
│       │   ├── decorators/
│       │   ├── helpers/
│       │   ├── libs/
│       │   ├── exceptions/
│       │   └── __test__/unit/
│       ├── dist/         # Build output (gitignored)
│       ├── package.json
│       ├── tsconfig.json
│       └── jest.config.js
├── package.json          # Root workspace config
├── jest.config.js        # Root test config
├── eslint.config.js      # ESLint v9 flat config
├── tsconfig.base.json    # Shared TS config
└── README.md
```

## Need Help?

- 💬 [Gitter Chat](https://gitter.im/Expressive-Tea/expresive-tea)
- 💡 [GitHub Discussions](https://github.com/Expressive-Tea/packages/discussions)
- 📧 Email: project@zero-oneit.com

## Recognition

Contributors are recognized in:
- Project README
- Release notes
- GitHub contributors page

---

**Thank you for contributing to Expressive Tea! 🙏**

Your efforts help make this project better for everyone.

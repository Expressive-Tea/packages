# @expressive-tea/commons

> 🎯 The foundation that powers decorator magic in Expressive Tea

[![npm version](https://img.shields.io/npm/v/@expressive-tea/commons?style=flat-square)](https://www.npmjs.com/package/@expressive-tea/commons)
[![npm downloads](https://img.shields.io/npm/dw/@expressive-tea/commons?style=flat-square)](https://www.npmjs.com/package/@expressive-tea/commons)
[![license](https://img.shields.io/github/license/Expressive-Tea/packages?style=flat-square)](https://github.com/Expressive-Tea/packages/blob/main/LICENSE)

---

> [!IMPORTANT]
> ### 🔄 Version Compatibility
> 
> **This package (v2.0.0) requires `@expressive-tea/core` >= 2.0.0**
> 
> - ✅ **Compatible**: `@expressive-tea/core@2.x.x` and above
> - ❌ **Not compatible**: `@expressive-tea/core@1.x.x` or below
> 
> Using Expressive Tea Core v1.x? You'll need `@expressive-tea/commons@1.x.x` instead.
> 
> **📦 Expressive Tea Core Reference**: This package is designed to work with [Expressive Tea Core](https://github.com/Expressive-Tea/expresive-tea) - the main framework.

---

> [!NOTE]
> ### 📦 Metadata Package
>
> **As of v2.0.0, all metadata functionality has been extracted to [@expressive-tea/metadata](../metadata)**
>
> This package now re-exports all metadata APIs from `@expressive-tea/metadata` for backward compatibility:
> - `Metadata` class (metadata management)
> - `@SetMetadata`, `@Meta`, `@InheritMetadata`, `@CacheInMetadata`, `@Deprecated` decorators
> - `getClass` helper utility
>
> **For new projects**, consider using `@expressive-tea/metadata` directly for better tree-shaking and smaller bundle sizes.
>
> **For existing projects**, no changes needed - everything works the same way!

---

## Why Commons?

Ever wondered how decorators like `@Route` or `@Inject` actually work under the hood? **That's where commons comes in!** This package is the secret sauce that makes TypeScript decorators feel like pure magic ✨

Think of it as your **metadata Swiss Army knife** - a lean, mean, type-safe wrapper around `reflect-metadata` that powers the entire Expressive Tea ecosystem.

## ⚡ Features That'll Make You Smile

- ✨ **Metadata Management** - Store and retrieve data on classes, methods, and properties with ease
- 🎨 **Decorator Utilities** - Ready-to-use decorators (@SetMetadata, @Meta, @Deprecated, and more!)
- 🎯 **TypeScript-First** - Written in TS5 with strict mode - your IDE will love you
- 🔒 **100% Type-Safe** - No more `any` nightmares in your decorator code
- 📦 **Feather-Light** - Zero dependencies except `reflect-metadata`
- 🧪 **Battle-Tested** - 94%+ test coverage - we don't ship bugs
- 📚 **Self-Documenting** - Full JSDoc on every method - no docs, no merge!

## 🚀 Installation

```bash
# npm
npm install @expressive-tea/commons reflect-metadata

# yarn
yarn add @expressive-tea/commons reflect-metadata

# pnpm
pnpm add @expressive-tea/commons reflect-metadata
```

## 💻 Requirements

- **Node.js** ≥ 18.0.0 (LTS recommended)
- **TypeScript** ≥ 5.0.0 (if you're using TypeScript)
- **reflect-metadata** 0.2.x

## ⚙️ TypeScript Setup

Add this to your `tsconfig.json` (don't skip this!):

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,     // 🎨 Enable decorator magic
    "emitDecoratorMetadata": true,       // 📊 Emit design-time type info
    "target": "ES2017",
    "module": "commonjs"
  }
}
```

## 🎨 Usage Examples

### Creating Your First Decorator

Let's build a `@Route` decorator from scratch:

```typescript
import 'reflect-metadata';
import { Metadata } from '@expressive-tea/commons';

// 1. Create the decorator
function Route(path: string) {
  return function (target: any, propertyKey: string) {
    Metadata.set('route:path', path, target, propertyKey);
  };
}

// 2. Use it on a class
class UserController {
  @Route('/users')
  getUsers() {
    return [];
  }
  
  @Route('/users/:id')
  getUser() {
    return {};
  }
}

// 3. Read the metadata
const routes = Metadata.get('route:path', UserController.prototype, 'getUsers');
console.log(routes); // '/users'
```

**BOOM! 💥** You just created a decorator system!

### Class-Level Metadata

Decorators aren't just for methods - classes can have metadata too:

```typescript
import { Metadata } from '@expressive-tea/commons';

// Mark a class as a controller
function Controller(basePath: string) {
  return function (target: Function) {
    Metadata.set('controller:basePath', basePath, target);
    Metadata.set('controller:isController', true, target);
  };
}

@Controller('/api/v1')
class ApiController {}

// Retrieve it later
const basePath = Metadata.get('controller:basePath', ApiController);
console.log(basePath); // '/api/v1'

// Check if it's a controller
if (Metadata.has('controller:isController', ApiController)) {
  console.log('Yes, this is a controller! 🎮');
}

// Get all metadata keys
const keys = Metadata.getKeys(ApiController);
console.log(keys); // ['controller:basePath', 'controller:isController']
```

### Property Decorators

Need to inject dependencies? Property metadata has your back:

```typescript
import { Metadata } from '@expressive-tea/commons';

// Dependency injection decorator
function Inject(token: string) {
  return function (target: any, propertyKey: string) {
    Metadata.set('inject:token', token, target, propertyKey);
  };
}

class UserService {
  @Inject('DATABASE')
  private db: Database;
  
  @Inject('LOGGER')
  private logger: Logger;
}

// Build your DI container
function getInjectableProperties(target: any) {
  return Object.getOwnPropertyNames(target)
    .filter(prop => Metadata.has('inject:token', target, prop))
    .map(prop => ({
      property: prop,
      token: Metadata.get('inject:token', target, prop)
    }));
}

const injectables = getInjectableProperties(UserService.prototype);
console.log(injectables);
// [
//   { property: 'db', token: 'DATABASE' },
//   { property: 'logger', token: 'LOGGER' }
// ]
```

### Parameter Decorators

Level up with parameter metadata:

```typescript
import { Metadata } from '@expressive-tea/commons';

// Body parameter decorator
function Body() {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    const existingParams = Metadata.get('params:body', target, propertyKey) || [];
    existingParams.push(parameterIndex);
    Metadata.set('params:body', existingParams, target, propertyKey);
  };
}

// Query parameter decorator
function Query(name: string) {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    const existingParams = Metadata.get('params:query', target, propertyKey) || {};
    existingParams[parameterIndex] = name;
    Metadata.set('params:query', existingParams, target, propertyKey);
  };
}

class AuthController {
  login(
    @Body() credentials: LoginDto,
    @Query('rememberMe') remember: boolean
  ) {
    // Your login logic
  }
}

// Extract parameter metadata
const bodyParams = Metadata.get('params:body', AuthController.prototype, 'login');
const queryParams = Metadata.get('params:query', AuthController.prototype, 'login');

console.log('Body parameters at indices:', bodyParams);   // [0]
console.log('Query parameters:', queryParams);            // { 1: 'rememberMe' }
```

### Design-Time Type Information

TypeScript can tell you the types at design time:

```typescript
import { Metadata } from '@expressive-tea/commons';

class BlogService {
  createPost(title: string, content: string): Promise<Post> {
    return Promise.resolve({} as Post);
  }
}

// Get parameter types
const paramTypes = Metadata.getParamTypes(BlogService.prototype, 'createPost');
console.log(paramTypes); // [String, String]

// Get return type
const returnType = Metadata.getReturnType(BlogService.prototype, 'createPost');
console.log(returnType); // Promise

// Get design type
const designType = Metadata.getType(BlogService.prototype, 'createPost');
console.log(designType); // Function
```

### Helper Utilities

```typescript
import { getClass } from '@expressive-tea/commons';

const instance = new UserController();
const Constructor = getClass(instance);

console.log(Constructor.name); // 'UserController'
console.log(Constructor === UserController); // true
```

---

## 🎁 Decorator Utilities

**NEW in v2.0.0!** Commons now includes ready-to-use decorator utilities to make working with metadata even easier.

### @SetMetadata

Set metadata with a single decorator:

```typescript
import { SetMetadata, Metadata } from '@expressive-tea/commons';

// Static value
@SetMetadata('role', 'admin')
class AdminController {}

// Dynamic value with factory function
@SetMetadata('timestamp', () => Date.now())
class MyClass {}

// On methods
class UserController {
  @SetMetadata('route:path', '/users')
  @SetMetadata('route:method', 'GET')
  getUsers() {}
}

// Retrieve the metadata
const role = Metadata.get('role', AdminController); // 'admin'
const path = Metadata.get('route:path', UserController.prototype, 'getUsers'); // '/users'
```

### @Meta

Set multiple metadata key-value pairs at once:

```typescript
import { Meta, Metadata } from '@expressive-tea/commons';

// Multiple values on a class
@Meta({
  controller: true,
  basePath: '/api',
  version: 'v1',
  deprecated: false
})
class ApiController {}

// Multiple values on a method
class ProductController {
  @Meta({
    'route:path': '/products',
    'route:method': 'GET',
    'cache:ttl': 3600,
    'auth:required': true
  })
  getProducts() {}
}

// Retrieve any key
const basePath = Metadata.get('basePath', ApiController); // '/api'
const cacheTtl = Metadata.get('cache:ttl', ProductController.prototype, 'getProducts'); // 3600
```

### @InheritMetadata

Copy metadata from one class to another:

```typescript
import { Meta, InheritMetadata, Metadata } from '@expressive-tea/commons';

// Base class with configuration
@Meta({ timeout: 5000, retries: 3, maxSize: 100 })
class BaseController {}

// Inherit specific keys
@InheritMetadata(BaseController, ['timeout', 'retries'])
class UserController {}

// Check inherited values
const timeout = Metadata.get('timeout', UserController); // 5000
const retries = Metadata.get('retries', UserController); // 3
const maxSize = Metadata.get('maxSize', UserController); // undefined (not inherited)
```

### @CacheInMetadata

Cache method results in metadata:

```typescript
import { CacheInMetadata, Metadata } from '@expressive-tea/commons';

class ConfigProvider {
  @CacheInMetadata('computed:config')
  getConfig() {
    console.log('Computing expensive config...');
    return {
      apiKey: process.env.API_KEY,
      timeout: 5000
    };
  }
}

const provider = new ConfigProvider();
provider.getConfig(); // Logs: "Computing expensive config..."
provider.getConfig(); // Returns cached value, no log!

// Access the cached value directly
const cached = Metadata.get('computed:config', ConfigProvider.prototype, 'getConfig');
```

### @Deprecated

Mark classes or methods as deprecated:

```typescript
import { Deprecated, Metadata } from '@expressive-tea/commons';

// Deprecate a class
@Deprecated('Use NewUserController instead')
class UserController {}

// Deprecate a method with warning
class ProductService {
  @Deprecated('Use findById() instead', true)
  getProduct(id: string) {
    return this.findById(id);
  }
  
  findById(id: string) {
    return { id, name: 'Product' };
  }
}

// When called, logs:  [DEPRECATED] ProductService.getProduct is deprecated. Use findById() instead
const service = new ProductService();
service.getProduct('123');

// Check if deprecated
const isDeprecated = Metadata.get('deprecated', UserController); // true
const message = Metadata.get('deprecated:message', UserController); // 'Use NewUserController instead'
```

### Combining Decorators

Stack them up for maximum power! 🚀

```typescript
import { Meta, SetMetadata, Deprecated, CacheInMetadata } from '@expressive-tea/commons';

@Meta({ type: 'controller', version: 'v2' })
@SetMetadata('basePath', '/api/v2')
class ApiController {
  @SetMetadata('route:path', '/users')
  @Meta({ method: 'GET', auth: true, rateLimit: 100 })
  @CacheInMetadata('cache:users')
  getUsers() {
    return [];
  }
  
  @Deprecated('Use getUsers() with pagination instead')
  getAllUsers() {
    return this.getUsers();
  }
}
```

---

## 📖 API Reference

### Metadata Class

The star of the show! All methods are static:

| Method | What It Does |
|--------|-------------|
| `set(key, value, target, propertyKey?)` | 💾 Store metadata |
| `get(key, target, propertyKey?)` | 🔍 Retrieve metadata |
| `has(key, target, propertyKey?)` | ✅ Check if metadata exists |
| `delete(key, target, propertyKey?)` | 🗑️ Remove metadata |
| `getKeys(target, propertyKey?)` | 🗝️ List all metadata keys |
| `getOwnKeys(target, propertyKey?)` | 🏠 Get own keys (not inherited) |
| `getType(target, propertyKey)` | 🎯 Get design-time type |
| `getParamTypes(target, propertyKey)` | 📝 Get parameter types |
| `getReturnType(target, propertyKey)` | ↩️ Get return type |

**Pro tip:** Check out the [JSDoc comments](./src/classes/Metadata.ts) for detailed usage and examples!

### Helper Functions

| Function | What It Does |
|----------|-------------|
| `getClass(target)` | 🏗️ Get constructor from instance or prototype |

## 🛠️ Development

Want to contribute? Awesome! Here's how to get started:

```bash
# Install dependencies
yarn install

# Build the package
yarn build

# Run tests
yarn test

# Watch mode for tests
yarn test:watch

# Lint your code
yarn lint

# Format your code
yarn format
```

## 📁 Project Structure

```
@expressive-tea/commons/
├── src/
│   ├── classes/
│   │   └── Metadata.ts          # 🎯 The metadata powerhouse
│   ├── helpers/
│   │   └── object-helper.ts     # 🛠️ Handy utilities
│   ├── types/
│   │   └── index.ts             # 📘 TypeScript type definitions
│   ├── __test__/
│   │   └── unit/                # 🧪 Comprehensive tests
│   └── index.ts                 # 📦 Public API exports
├── dist/                        # 🏗️ Compiled output (generated)
├── package.json
├── tsconfig.json
└── README.md
```

## 🤝 Contributing

We'd love your help making commons even better! Here's how:

1. 🍴 Fork the repo
2. 🌿 Create a feature branch: `git checkout -b feature/amazing-feature`
3. ✍️ Make your changes and add tests (we love tests!)
4. ✅ Run `yarn test` - all green? Great!
5. 🎨 Run `yarn lint` - make it pretty
6. 💾 Commit: `git commit -m "feat: add amazing feature"`
7. 🚀 Push and create a PR

**Quality checklist:**
- ✅ Tests pass
- ✅ Linting passes  
- ✅ Coverage stays high (>90%)
- ✅ JSDoc added for public APIs
- ✅ TypeScript compiles with no errors

Check out our [Contributing Guide](../../CONTRIBUTING.md) for more details!

## 🔗 Related Packages

- **[@expressive-tea/plugin](../plugin)** - Plugin system built on commons
- **[@expressive-tea/core](https://www.npmjs.com/package/@expressive-tea/core)** - The full framework

## 📝 Changelog

See [CHANGELOG.md](../../CHANGELOG.md) for what's new in each release.

## 🔄 Migrating from v0.0.x?

Check out our [Migration Guide](../../MIGRATION.md) - it's easier than you think!

## 💬 Support

Need help? We've got you covered:

- 📖 [Documentation](https://zero-oneit.github.io/expresive-tea/)
- 💬 [Gitter Chat](https://gitter.im/Expressive-Tea/expresive-tea) - Real-time help
- 🐛 [GitHub Issues](https://github.com/Expressive-Tea/packages/issues) - Report bugs
- 💡 [GitHub Discussions](https://github.com/Expressive-Tea/packages/discussions) - Ask questions
- 📧 [Email](mailto:support@expressive-tea.io) - Direct support

## 📄 License

Apache-2.0 License - see [LICENSE](../../LICENSE) for details.

Free to use, free to modify, free to distribute. Build something awesome! 🚀

## 👨‍💻 Author

**Zero One IT** - [https://zerooneit.com](https://zerooneit.com)

## 🌟 Contributors

- **Diego Resendez** - *Original Author* - [@chrnx-dev](https://github.com/chrnx-dev)

See all amazing [contributors](https://github.com/Expressive-Tea/packages/contributors) who've helped build this!

---

<p align="center">
  <strong>Made with ☕ and 🍵 by the Expressive Tea Team</strong>
  <br />
  <sub>Brew something amazing today!</sub>
</p>

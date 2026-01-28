# @expressive-tea/metadata

**Framework-agnostic TypeScript metadata management utilities for decorators.**

[![npm version](https://img.shields.io/npm/v/@expressive-tea/metadata.svg)](https://www.npmjs.com/package/@expressive-tea/metadata)
[![License](https://img.shields.io/npm/l/@expressive-tea/metadata.svg)](https://github.com/Expressive-Tea/packages/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

A powerful, lightweight metadata management library for TypeScript decorators built on top of `reflect-metadata`. Provides both low-level metadata APIs and high-level decorator utilities for common patterns.

> **📅 Versioning:** This package uses [Calendar Versioning (CalVer)](./VERSIONING.md) in the format `YYYY.MM.MICRO` (e.g., `2026.1.0`). [Learn more →](./VERSIONING.md)

## Features

- 🎯 **Framework-agnostic** - Works with any TypeScript project, not just Expressive Tea
- 🛠️ **Rich API** - Comprehensive metadata operations for classes, methods, properties, and parameters
- 🎨 **Decorator Utilities** - 5 pre-built decorators for common metadata patterns
- 🔒 **Type-safe** - Full TypeScript support with generics
- 🪶 **Lightweight** - Minimal dependencies (only `reflect-metadata`)
- 📦 **Tree-shakeable** - Import only what you need
- ✅ **Well-tested** - 90% test coverage with 56 comprehensive tests
- 📅 **CalVer Versioning** - Clear release timeline with `YYYY.MM.MICRO` format

## Installation

```bash
npm install @expressive-tea/metadata reflect-metadata
# or
yarn add @expressive-tea/metadata reflect-metadata
# or
pnpm add @expressive-tea/metadata reflect-metadata
```

## Prerequisites

Enable experimental decorators and emit decorator metadata in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

Import `reflect-metadata` at the entry point of your application:

```typescript
import 'reflect-metadata';
```

## Quick Start

### Using Decorator Utilities

```typescript
import { Meta, SetMetadata, Deprecated } from '@expressive-tea/metadata';

// Set multiple metadata values at once
@Meta({ controller: true, basePath: '/api/users' })
class UserController {
  // Set a single metadata value
  @SetMetadata('route:method', 'GET')
  @SetMetadata('route:path', '/')
  getUsers() {
    // ...
  }

  // Mark methods as deprecated
  @Deprecated('Use getUsers() instead', true)
  findAll() {
    // ...
  }
}
```

### Using Metadata Class Directly

```typescript
import { Metadata } from '@expressive-tea/metadata';

class ApiController {
  getResource() {}
}

// Set metadata
Metadata.set('basePath', '/api', ApiController);
Metadata.set('method', 'GET', ApiController.prototype, 'getResource');

// Get metadata
const basePath = Metadata.get<string>('basePath', ApiController);
console.log(basePath); // '/api'

// Check if metadata exists
if (Metadata.has('method', ApiController.prototype, 'getResource')) {
  console.log('Method has metadata');
}

// Delete metadata
Metadata.delete('basePath', ApiController);
```

## API Reference

### Metadata Class

The `Metadata` class provides static methods for managing metadata on classes, methods, properties, and parameters.

#### Core Methods

##### `set(key, value, target, propertyKey?, index?)`

Sets metadata on a target.

```typescript
// Class metadata
Metadata.set('controller', true, MyClass);

// Method metadata
Metadata.set('route', '/users', MyClass.prototype, 'getUsers');

// Property metadata
Metadata.set('column', 'username', MyClass.prototype, 'username');

// Parameter metadata
Metadata.set('inject', 'UserService', MyClass, undefined, 0);
```

##### `get<T>(key, target, propertyKey?, index?): T | undefined`

Retrieves metadata from a target.

```typescript
const isController = Metadata.get<boolean>('controller', MyClass);
const route = Metadata.get<string>('route', MyClass.prototype, 'getUsers');
```

##### `getOwn<T>(key, target, propertyKey?, index?): T | undefined`

Gets metadata defined directly on the target (non-inherited).

```typescript
const ownMetadata = Metadata.getOwn<string>('key', MyClass);
```

##### `has(key, target, propertyKey?, index?): boolean`

Checks if metadata exists on a target.

```typescript
if (Metadata.has('route', MyClass.prototype, 'getUsers')) {
  // Route metadata exists
}
```

##### `hasOwn(key, target, propertyKey?, index?): boolean`

Checks if metadata is defined directly on the target (non-inherited).

```typescript
if (Metadata.hasOwn('controller', MyClass)) {
  // Controller metadata is defined on MyClass itself
}
```

##### `delete(key, target, propertyKey?, index?): boolean`

Deletes metadata from a target.

```typescript
Metadata.delete('route', MyClass.prototype, 'getUsers');
```

#### Discovery Methods

##### `getKeys(target, propertyKey?): any[]`

Gets all metadata keys defined on a target (including inherited).

```typescript
const keys = Metadata.getKeys(MyClass);
console.log(keys); // ['controller', 'basePath', ...]
```

##### `getOwnKeys(target, propertyKey?): any[]`

Gets all metadata keys defined directly on a target (non-inherited).

```typescript
const ownKeys = Metadata.getOwnKeys(MyClass);
```

#### Type Information Methods

##### `getType(target, propertyKey): any`

Gets the design-time type of a property or method.

```typescript
class User {
  username: string;
  getUsers(): User[] { return []; }
}

const propType = Metadata.getType(User.prototype, 'username');
console.log(propType); // String

const returnType = Metadata.getType(User.prototype, 'getUsers');
console.log(returnType); // Array
```

##### `getParamTypes(target, propertyKey?): any[]`

Gets the design-time parameter types of a constructor or method.

```typescript
class UserService {
  constructor(repo: UserRepository, logger: Logger) {}
  
  createUser(name: string, age: number): User {
    return new User();
  }
}

const constructorParams = Metadata.getParamTypes(UserService);
console.log(constructorParams); // [UserRepository, Logger]

const methodParams = Metadata.getParamTypes(UserService.prototype, 'createUser');
console.log(methodParams); // [String, Number]
```

##### `getReturnType(target, propertyKey): any`

Gets the design-time return type of a method.

```typescript
class UserService {
  getUser(): User { return new User(); }
}

const returnType = Metadata.getReturnType(UserService.prototype, 'getUser');
console.log(returnType); // User
```

#### Advanced Methods

##### `defineMetadata(key, value, target, propertyKey?)`

Defines metadata using the reflect-metadata API directly.

```typescript
Metadata.defineMetadata('custom:key', 'value', MyClass);
```

##### `getMetadata<T>(key, target, propertyKey?): T | undefined`

Gets metadata using the reflect-metadata API directly (includes inherited metadata).

```typescript
const value = Metadata.getMetadata<string>('custom:key', MyClass);
```

##### `getOwnMetadata<T>(key, target, propertyKey?): T | undefined`

Gets own metadata using the reflect-metadata API directly (non-inherited).

```typescript
const ownValue = Metadata.getOwnMetadata<string>('custom:key', MyClass);
```

### Decorator Utilities

#### `@SetMetadata(key, value)`

Sets a single metadata key-value pair on a class, method, property, or parameter.

```typescript
@SetMetadata('controller', true)
class UserController {
  @SetMetadata('route:method', 'GET')
  @SetMetadata('route:path', '/users')
  getUsers() {}
}
```

#### `@Meta(metadata)`

Sets multiple metadata key-value pairs at once.

```typescript
@Meta({ 
  controller: true, 
  basePath: '/api/users',
  version: '1.0'
})
class UserController {
  @Meta({ 
    method: 'GET', 
    path: '/:id',
    cache: true 
  })
  getUser() {}
}
```

#### `@InheritMetadata(sourceClass, keys?)`

Copies metadata from one class to another. Optionally specify which keys to inherit.

```typescript
@Meta({ 
  controller: true, 
  basePath: '/api',
  version: '1.0'
})
class BaseController {}

// Inherit all metadata
@InheritMetadata(BaseController)
class UserController extends BaseController {}

// Inherit specific keys only
@InheritMetadata(BaseController, ['basePath', 'version'])
class ProductController extends BaseController {}

// Check inherited metadata
console.log(Metadata.get('basePath', UserController)); // '/api'
console.log(Metadata.get('version', ProductController)); // '1.0'
```

#### `@CacheInMetadata(key)`

Caches method return values in metadata (memoization pattern).

```typescript
class ExpensiveCalculator {
  @CacheInMetadata('result:fibonacci')
  fibonacci(n: number): number {
    console.log(`Calculating fibonacci(${n})`);
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }
}

const calc = new ExpensiveCalculator();
calc.fibonacci(10); // Logs: "Calculating fibonacci(10)"
calc.fibonacci(10); // Returns cached result, no log

// Access cached value
const cached = Metadata.get('result:fibonacci', calc.constructor.prototype, 'fibonacci');
console.log(cached); // 55
```

#### `@Deprecated(message?, logWarning?)`

Marks classes or methods as deprecated with optional warning messages.

```typescript
@Deprecated('Use UserService instead')
class LegacyUserService {}

class UserService {
  @Deprecated('Use getUserById() instead', true)
  findUser(id: string) {
    // Old implementation
  }
  
  getUserById(id: string) {
    // New implementation
  }
}

// Check if deprecated
const isDeprecated = Metadata.get<boolean>('deprecated', UserService.prototype, 'findUser');
console.log(isDeprecated); // true

const message = Metadata.get<string>('deprecated:message', UserService.prototype, 'findUser');
console.log(message); // 'Use getUserById() instead'
```

### Helper Utilities

#### `getClass(target): Function`

Returns the constructor function for a given target (class or instance).

```typescript
import { getClass } from '@expressive-tea/metadata';

class User {}
const user = new User();

console.log(getClass(User)); // [Function: User]
console.log(getClass(user)); // [Function: User]
console.log(getClass(User.prototype)); // [Function: User]
```

## Common Use Cases

### Dependency Injection

```typescript
import { Metadata, SetMetadata } from '@expressive-tea/metadata';

const Injectable = () => SetMetadata('injectable', true);
const Inject = (token: string) => (target: any, propertyKey: string | symbol, parameterIndex: number) => {
  const existingInjections = Metadata.get<any[]>('injections', target, propertyKey) || [];
  existingInjections[parameterIndex] = token;
  Metadata.set('injections', existingInjections, target, propertyKey);
};

@Injectable()
class UserService {
  constructor(
    @Inject('UserRepository') private repo: any,
    @Inject('Logger') private logger: any
  ) {}
}

// Retrieve injection metadata
const injections = Metadata.get('injections', UserService);
console.log(injections); // ['UserRepository', 'Logger']
```

### Routing Metadata

```typescript
import { Meta, SetMetadata } from '@expressive-tea/metadata';

const Controller = (basePath: string) => Meta({ controller: true, basePath });
const Get = (path: string) => Meta({ method: 'GET', path });
const Post = (path: string) => Meta({ method: 'POST', path });

@Controller('/api/users')
class UserController {
  @Get('/')
  getUsers() {}
  
  @Post('/')
  createUser() {}
}

// Extract routing metadata
const basePath = Metadata.get<string>('basePath', UserController);
const getMethod = Metadata.get<string>('method', UserController.prototype, 'getUsers');
const getPath = Metadata.get<string>('path', UserController.prototype, 'getUsers');

console.log(`${getMethod} ${basePath}${getPath}`); // 'GET /api/users/'
```

### Validation Decorators

```typescript
import { SetMetadata, Metadata } from '@expressive-tea/metadata';

const Required = () => SetMetadata('validation:required', true);
const MinLength = (min: number) => SetMetadata('validation:minLength', min);
const MaxLength = (max: number) => SetMetadata('validation:maxLength', max);

class CreateUserDto {
  @Required()
  @MinLength(3)
  @MaxLength(50)
  username: string;
  
  @Required()
  @MinLength(8)
  password: string;
}

// Validate at runtime
function validate(dto: any): string[] {
  const errors: string[] = [];
  const proto = Object.getPrototypeOf(dto);
  
  for (const key of Object.keys(dto)) {
    const isRequired = Metadata.get<boolean>('validation:required', proto, key);
    const minLength = Metadata.get<number>('validation:minLength', proto, key);
    
    if (isRequired && !dto[key]) {
      errors.push(`${key} is required`);
    }
    
    if (minLength && dto[key]?.length < minLength) {
      errors.push(`${key} must be at least ${minLength} characters`);
    }
  }
  
  return errors;
}

const user = new CreateUserDto();
user.username = 'ab'; // Too short
const errors = validate(user);
console.log(errors); 
// ['password is required', 'username must be at least 3 characters']
```

### ORM Column Metadata

```typescript
import { Meta } from '@expressive-tea/metadata';

const Entity = (tableName: string) => Meta({ entity: true, tableName });
const Column = (options: { type: string; nullable?: boolean }) => 
  (target: any, propertyKey: string) => {
    Meta(options)(target, propertyKey);
  };

@Entity('users')
class User {
  @Column({ type: 'int', nullable: false })
  id: number;
  
  @Column({ type: 'varchar', nullable: false })
  username: string;
  
  @Column({ type: 'varchar', nullable: true })
  email?: string;
}

// Generate SQL from metadata
function generateSchema(entityClass: Function): string {
  const tableName = Metadata.get<string>('tableName', entityClass);
  const props = Object.getOwnPropertyNames(entityClass.prototype).filter(p => p !== 'constructor');
  
  const columns = props.map(prop => {
    const type = Metadata.get<string>('type', entityClass.prototype, prop);
    const nullable = Metadata.get<boolean>('nullable', entityClass.prototype, prop);
    return `${prop} ${type}${nullable ? '' : ' NOT NULL'}`;
  });
  
  return `CREATE TABLE ${tableName} (\n  ${columns.join(',\n  ')}\n);`;
}

console.log(generateSchema(User));
// CREATE TABLE users (
//   id int NOT NULL,
//   username varchar NOT NULL,
//   email varchar
// );
```

## TypeScript Integration

This package fully supports TypeScript's design-time type reflection when `emitDecoratorMetadata` is enabled:

```typescript
import { Metadata } from '@expressive-tea/metadata';

class UserRepository {}
class Logger {}

class UserService {
  constructor(
    private repo: UserRepository,
    private logger: Logger
  ) {}
  
  getUser(id: string): Promise<User> {
    return Promise.resolve(new User());
  }
}

// TypeScript automatically stores type information
const paramTypes = Metadata.getParamTypes(UserService);
console.log(paramTypes); // [UserRepository, Logger]

const returnType = Metadata.getReturnType(UserService.prototype, 'getUser');
console.log(returnType); // Promise
```

## Comparison with Other Libraries

### vs. reflect-metadata

`@expressive-tea/metadata` is built on top of `reflect-metadata` and provides:

- ✅ Simplified API with consistent naming
- ✅ High-level decorator utilities
- ✅ Better TypeScript type inference
- ✅ Parameter metadata support
- ✅ Comprehensive test coverage

### vs. class-transformer / class-validator

While `class-transformer` and `class-validator` focus on data transformation and validation, `@expressive-tea/metadata` is a general-purpose metadata library that can be used to build transformation, validation, or any other decorator-based functionality.

### vs. TypeORM / TypeGraphQL decorators

TypeORM and TypeGraphQL include their own metadata management for specific use cases (ORM and GraphQL). `@expressive-tea/metadata` is framework-agnostic and can be used to build similar functionality for any domain.

## Best Practices

### 1. Use Consistent Metadata Keys

Use namespaced keys to avoid collisions:

```typescript
// Good
Metadata.set('myapp:controller:basePath', '/api', MyClass);
Metadata.set('myapp:validation:required', true, MyClass.prototype, 'username');

// Avoid
Metadata.set('basePath', '/api', MyClass);
Metadata.set('required', true, MyClass.prototype, 'username');
```

### 2. Type Your Metadata

Always specify generic types when retrieving metadata:

```typescript
// Good
const basePath = Metadata.get<string>('basePath', MyClass);

// Avoid
const basePath = Metadata.get('basePath', MyClass); // Type: unknown
```

### 3. Check Before Use

Always check if metadata exists before using it:

```typescript
if (Metadata.has('config', MyClass)) {
  const config = Metadata.get<Config>('config', MyClass);
  // Use config safely
}
```

### 4. Document Your Decorators

Create well-documented decorator factories:

```typescript
/**
 * Marks a class as a controller with a base path.
 * 
 * @param basePath - The base path for all routes in this controller
 * @example
 * ```typescript
 * @Controller('/api/users')
 * class UserController {}
 * ```
 */
function Controller(basePath: string) {
  return Meta({ 
    controller: true, 
    basePath 
  });
}
```

### 5. Use Inheritance Carefully

When using `@InheritMetadata`, be explicit about which keys to inherit:

```typescript
// Good - explicit inheritance
@InheritMetadata(BaseController, ['basePath', 'middleware'])
class UserController extends BaseController {}

// Risky - inherits all metadata
@InheritMetadata(BaseController)
class UserController extends BaseController {}
```

## Testing

This package includes comprehensive test coverage (90%+). Run tests with:

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- metadata.spec.ts

# Watch mode
npm test -- --watch
```

## Contributing

Contributions are welcome! Please see our [Contributing Guide](../../CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Versioning

This package uses **Calendar Versioning (CalVer)** in the format `YYYY.MM.MICRO`:

- **YYYY** - Year of release (e.g., 2026)
- **MM** - Month of release (1-12, not zero-padded)
- **MICRO** - Incremental release number within that month

**Example:** `2026.1.0` = First release in January 2026

### Why CalVer?

Since `@expressive-tea/metadata` is framework-agnostic and independent of Expressive Tea's release cycle, CalVer provides:

- ✅ Clear release timeline
- ✅ Framework independence
- ✅ No breaking change ambiguity
- ✅ Easy deprecation communication

### Version Ranges (package.json)

```json
{
  "dependencies": {
    "@expressive-tea/metadata": "~2026.1.0"  // Recommended: updates within same month
  }
}
```

**Learn more:** See [VERSIONING.md](./VERSIONING.md) for complete details on versioning policy, breaking changes, and upgrade strategies.

## License

Apache-2.0 © [Zero One IT](https://github.com/Expressive-Tea)

## Related Packages

- [@expressive-tea/commons](../commons) - Common utilities and types for Expressive Tea (re-exports this package)
- [@expressive-tea/plugin](../plugin) - Plugin architecture system (uses this package)
- [reflect-metadata](https://www.npmjs.com/package/reflect-metadata) - Metadata Reflection API

## Support

- 📖 [Documentation](https://github.com/Expressive-Tea/packages)
- 🐛 [Issue Tracker](https://github.com/Expressive-Tea/packages/issues)
- 💬 [Discussions](https://github.com/Expressive-Tea/packages/discussions)
- 📧 Email: project@zero-oneit.com

---

Made with ❤️ by the Expressive Tea team

# @expressive-tea/plugin

> 🔌 Build once, reuse everywhere - The plugin system that scales with your dreams

[![npm version](https://img.shields.io/npm/v/@expressive-tea/plugin?style=flat-square)](https://www.npmjs.com/package/@expressive-tea/plugin)
[![npm downloads](https://img.shields.io/npm/dw/@expressive-tea/plugin?style=flat-square)](https://www.npmjs.com/package/@expressive-tea/plugin)
[![license](https://img.shields.io/github/license/Expressive-Tea/packages?style=flat-square)](https://github.com/Expressive-Tea/packages/blob/main/LICENSE)

> **📅 Versioning:** This package uses [Calendar Versioning (CalVer)](./VERSIONING.md) in the format `YYYY.MM.MICRO` (e.g., `2026.1.0`). [Learn more →](../../VERSIONING.md)

---

> [!IMPORTANT]
> ### 🔄 Version Compatibility
> 
> **This package (v2026.1.0) requires `@expressive-tea/core` >= 2.0.0**
> 
> - ✅ **Compatible**: `@expressive-tea/core@2.x.x` and above
> - ❌ **Not compatible**: `@expressive-tea/core@1.x.x` or below
> 
> Using Expressive Tea Core v1.x? You'll need `@expressive-tea/plugin@1.0.3` (last SemVer version for Core v1.x).
> 
> **📦 Expressive Tea Core Reference**: This package is designed to work with [Expressive Tea Core](https://github.com/Expressive-Tea/expresive-tea) - the main framework.

---

## The Plugin Problem, Solved

**Ever copy-pasted your database config across 10 projects?** 😱  
**Ever wished you could share your auth setup between apps?** 🤔  
**Ever wanted to publish reusable middleware bundles to npm?** 📦

**Say hello to the plugin system that makes code reuse actually enjoyable!**

## ⚡ Features That'll Blow Your Mind

- 🔌 **True Plugin Architecture** - Write once, drop into any Expressive Tea app
- 🎯 **Lifecycle Hooks (Boot Stages)** - Control exactly when your code runs
- 🔗 **Smart Dependencies** - Plugins can depend on other plugins (no spaghetti!)
- ⚡ **Priority-Based** - Fine-tune execution order with simple numbers
- 🎨 **Decorator Magic** - Just `@Stage` and you're done
- 🧪 **Battle-Tested** - 93%+ coverage - we don't ship bugs
- 📚 **Self-Documenting** - Every API has JSDoc with examples
- 🔒 **Type-Safe** - TypeScript strict mode = fewer runtime surprises

## 🚀 Installation

```bash
# npm
npm install @expressive-tea/plugin reflect-metadata

# yarn  
yarn add @expressive-tea/plugin reflect-metadata

# pnpm
pnpm add @expressive-tea/plugin reflect-metadata
```

## 💻 Requirements

- **Node.js** ≥ 18.0.0 (LTS recommended)
- **TypeScript** ≥ 5.0.0 (if you're using TypeScript)
- **reflect-metadata** 0.2.x
- **@expressive-tea/commons** 2.0.0 (auto-installed as peer dep)

## ⚙️ TypeScript Setup

Enable decorators in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,     // 🎨 Required for @Stage
    "emitDecoratorMetadata": true,       // 📊 Required for metadata
    "target": "ES2017",
    "module": "commonjs"
  }
}
```

## 🎯 Quick Start (60 seconds)

### 1. Create a Plugin

```typescript
import 'reflect-metadata';
import { Plugin, BOOT_STAGES, Stage } from '@expressive-tea/plugin';
import { Express } from 'express';

export class SuperAwesomePlugin extends Plugin {
  // Metadata (who are you?)
  protected name = 'SuperAwesomePlugin';
  protected priority = 100;              // Lower = runs first
  protected dependencies: string[] = []; // Other plugins you need

  // Hook into BOOT_DEPENDENCIES stage
  @Stage(BOOT_STAGES.BOOT_DEPENDENCIES)
  async connectDatabase(server: Express): Promise<void> {
    console.log('🗄️  Connecting to database...');
    // await db.connect();
  }

  // Hook into APPLICATION stage
  @Stage(BOOT_STAGES.APPLICATION)
  setupMiddleware(server: Express): void {
    console.log('🛠️  Adding middleware...');
    server.use((req, res, next) => {
      console.log(`${req.method} ${req.path}`);
      next();
    });
  }
}
```

### 2. Use Your Plugin

```typescript
import { Boot, ServerSettings, Pour } from '@expressive-tea/core';
import { SuperAwesomePlugin } from './plugins/awesome.plugin';

@ServerSettings({ port: 3000 })
@Pour(new SuperAwesomePlugin())
class MyApp extends Boot {}

const app = new MyApp();
app.start();

// Output:
// 🗄️  Connecting to database...
// 🛠️  Adding middleware...
// 🎉 Server running on http://localhost:3000
```

**BOOM! 💥** You just created a reusable plugin!

## 🎭 Understanding Boot Stages

Think of boot stages as **lifecycle hooks** - your plugin methods run at specific points during app startup:

| # | Stage | When | Perfect For |
|---|-------|------|-------------|
| **1** | `BOOT_DEPENDENCIES` | Very first | Database, Redis, external APIs |
| **2** | `APPLICATION` | Express setup | Body parsers, CORS, Helmet |
| **3** | `CONTROLLERS` | Route registration | REST endpoints, GraphQL |
| **4** | `APPLICATION_MIDDLEWARES` | Before routes | Auth, validation, rate limiting |
| **5** | `ROUTE_MIDDLEWARES` | Route-specific | Per-route guards |
| **6** | `SERVER_SETTINGS` | Final setup | Port, SSL, clustering |
| **7** | `AFTER_APPLICATION_MIDDLEWARES` | Post-routing | Error handlers, 404 |

### Real-World Boot Stage Example

```typescript
export class DatabasePlugin extends Plugin {
  protected name = 'DatabasePlugin';
  protected priority = 10; // Run early!
  
  @Stage(BOOT_STAGES.BOOT_DEPENDENCIES)
  async connectDB(server: Express) {
    console.log('1️⃣ Connecting to PostgreSQL...');
    // await pool.connect();
  }

  @Stage(BOOT_STAGES.APPLICATION)
  addDBMiddleware(server: Express) {
    console.log('2️⃣ Adding database middleware...');
    // server.use((req, res, next) => {
    //   req.db = pool;
    //   next();
    // });
  }

  @Stage(BOOT_STAGES.AFTER_APPLICATION_MIDDLEWARES)
  addErrorHandler(server: Express) {
    console.log('3️⃣ Adding DB error handler...');
    // server.use((err, req, res, next) => {
    //   if (err.code === 'ECONNREFUSED') {
    //     res.status(503).json({ error: 'Database unavailable' });
    //   }
    // });
  }
}
```

## 🔗 Plugin Dependencies (The Cool Part)

Plugins can depend on other plugins - the system ensures they load in the right order!

```typescript
export class SessionPlugin extends Plugin {
  protected name = 'SessionPlugin';
  protected dependencies = ['DatabasePlugin']; // Needs DB first!

  @Stage(BOOT_STAGES.APPLICATION)
  setupSessions(server: Express) {
    console.log('💾 Setting up sessions (DB already connected!)');
    // session logic here
  }
}

export class AuthPlugin extends Plugin {
  protected name = 'AuthPlugin';
  protected dependencies = ['DatabasePlugin', 'SessionPlugin'];

  @Stage(BOOT_STAGES.APPLICATION)
  setupAuth(server: Express) {
    console.log('🔐 Setting up auth (DB + sessions ready!)');
    // passport.js setup
  }
}

// When you use them:
@Pour(new DatabasePlugin())
@Pour(new SessionPlugin())
@Pour(new AuthPlugin())
class MyApp extends Boot {}

// They'll execute in the correct order automatically!
// Output:
// 1. DatabasePlugin methods
// 2. SessionPlugin methods  
// 3. AuthPlugin methods
```

**Missing a dependency?** You'll get a helpful `DependencyNotFound` error at startup!

## ⚡ Priority System (Fine-Grained Control)

Within the **same boot stage**, lower priority = runs first:

```typescript
// Runs FIRST (priority: 10)
export class CorePlugin extends Plugin {
  protected priority = 10;
}

// Runs SECOND (priority: 100)
export class MiddlewarePlugin extends Plugin {
  protected priority = 100;
}

// Runs LAST (priority: 999 - the default)
export class OptionalPlugin extends Plugin {
  protected priority = 999;
}
```

**Pro tip:** Use priority 1-100 for critical infrastructure, 100-500 for features, 500+ for optional stuff.

## 🎨 Advanced Patterns

### Pattern 1: Configurable Plugins

```typescript
interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  ssl: boolean;
}

export class DatabasePlugin extends Plugin {
  private config: DatabaseConfig;

  constructor(config: DatabaseConfig) {
    super();
    this.config = config;
  }

  @Stage(BOOT_STAGES.BOOT_DEPENDENCIES)
  async connect(server: Express) {
    console.log(`Connecting to ${this.config.host}:${this.config.port}...`);
    // await createConnection(this.config);
  }
}

// Usage with environment variables
@Pour(new DatabasePlugin({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'myapp',
  ssl: process.env.DB_SSL === 'true'
}))
class MyApp extends Boot {}
```

### Pattern 2: Multi-Stage Plugins

```typescript
export class FullStackPlugin extends Plugin {
  protected name = 'FullStackPlugin';

  @Stage(BOOT_STAGES.BOOT_DEPENDENCIES)
  loadExternalServices(server: Express) {
    console.log('📡 Loading external APIs...');
  }

  @Stage(BOOT_STAGES.APPLICATION)
  setupCORS(server: Express) {
    console.log('🌐 Configuring CORS...');
    // server.use(cors());
  }

  @Stage(BOOT_STAGES.CONTROLLERS)
  registerAPIRoutes(server: Express) {
    console.log('🛣️  Registering API routes...');
    // Register your routes
  }

  @Stage(BOOT_STAGES.APPLICATION_MIDDLEWARES)
  addAuthMiddleware(server: Express) {
    console.log('🔒 Adding authentication...');
    // server.use(passport.authenticate());
  }

  @Stage(BOOT_STAGES.AFTER_APPLICATION_MIDDLEWARES)
  addErrorHandlers(server: Express) {
    console.log('🚨 Adding error handlers...');
    // Global error handling
  }
}
```

### Pattern 3: Conditional Logic

```typescript
export class MonitoringPlugin extends Plugin {
  protected name = 'MonitoringPlugin';
  private enableMetrics: boolean;

  constructor(options: { enableMetrics?: boolean } = {}) {
    super();
    this.enableMetrics = options.enableMetrics ?? true;
  }

  @Stage(BOOT_STAGES.APPLICATION)
  setupMonitoring(server: Express) {
    if (this.enableMetrics) {
      console.log('📊 Enabling metrics endpoint...');
      // server.get('/metrics', metricsHandler);
    }

    if (process.env.NODE_ENV === 'production') {
      console.log('🔍 Enabling APM monitoring...');
      // Initialize APM
    }
  }
}
```

### Pattern 4: Publish to npm

```typescript
// my-awesome-plugin/index.ts
import { Plugin, BOOT_STAGES, Stage } from '@expressive-tea/plugin';
import { Express } from 'express';

export class MyAwesomePlugin extends Plugin {
  protected name = 'MyAwesomePlugin';
  
  @Stage(BOOT_STAGES.APPLICATION)
  setup(server: Express) {
    // Your awesome logic
  }
}

// Publish to npm as @yourname/awesome-plugin
// Others can use it:
// yarn add @yourname/awesome-plugin
// @Pour(new MyAwesomePlugin())
```

## 📖 Complete API Reference

### Plugin Class (Abstract)

Extend this to create your plugins:

| Property | Type | Default | What It Does |
|----------|------|---------|-------------|
| `name` | `string` | Class name | Unique plugin identifier |
| `priority` | `number` | `999` | Execution order (lower = first) |
| `dependencies` | `string[]` | `[]` | Required plugin names |

| Method | Returns | What It Does |
|--------|---------|-------------|
| `getRegisteredStage(stage)` | `Array` | Get methods for a boot stage |

### @Stage Decorator

```typescript
@Stage(stage: BOOT_STAGES, required?: boolean)
```

- `stage` - When to run this method
- `required` - (Optional) Throw error if fails (default: `false`)

### BOOT_STAGES Enum

```typescript
enum BOOT_STAGES {
  BOOT_DEPENDENCIES = 'Bootstrap Dependencies',
  APPLICATION = 'Bootstrap Application',
  CONTROLLERS = 'Bootstrap Controllers',
  APPLICATION_MIDDLEWARES = 'Bootstrap Application Middlewares',
  ROUTE_MIDDLEWARES = 'Bootstrap Route Middlewares',
  SERVER_SETTINGS = 'Bootstrap Server Settings',
  AFTER_APPLICATION_MIDDLEWARES = 'After Bootstrap Application Middlewares'
}
```

### DependencyNotFound Exception

```typescript
import { DependencyNotFound } from '@expressive-tea/plugin';

try {
  // Plugin initialization
} catch (error) {
  if (error instanceof DependencyNotFound) {
    console.error(`Missing plugin: ${error.message}`);
  }
}
```

## 🛠️ Development

```bash
# Install dependencies
yarn install

# Build
yarn build

# Test
yarn test

# Watch mode
yarn test:watch

# Lint
yarn lint

# Format
yarn format
```

## 📁 Project Structure

```
@expressive-tea/plugin/
├── src/
│   ├── classes/
│   │   └── Plugin.ts              # 🎯 Abstract Plugin class
│   ├── decorators/
│   │   └── stage.ts               # 🎨 @Stage decorator
│   ├── helpers/
│   │   ├── storage-helper.ts      # 💾 WeakMap metadata storage
│   │   └── object-helper.ts       # 🛠️ Stage helpers
│   ├── libs/
│   │   └── utilities.ts           # ⚡ Native utilities (no lodash!)
│   ├── exceptions/
│   │   └── dependency.ts          # ❌ DependencyNotFound error
│   ├── constants.ts               # 📋 BOOT_STAGES enum
│   ├── __test__/
│   │   └── unit/                  # 🧪 Comprehensive tests
│   └── index.ts                   # 📦 Public API
├── dist/                          # 🏗️ Compiled output
└── README.md                      # 📖 You are here!
```

## 💡 Real-World Plugin Examples

### Security Plugin

```typescript
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

export class SecurityPlugin extends Plugin {
  protected name = 'SecurityPlugin';
  protected priority = 50;

  @Stage(BOOT_STAGES.APPLICATION)
  enableSecurity(server: Express) {
    console.log('🛡️  Enabling security features...');
    
    server.use(helmet());
    server.use(cors({ origin: process.env.ALLOWED_ORIGINS?.split(',') }));
    server.use(rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100
    }));
  }
}
```

### Logging Plugin

```typescript
import morgan from 'morgan';
import winston from 'winston';

export class LoggingPlugin extends Plugin {
  protected name = 'LoggingPlugin';
  private logger: winston.Logger;

  constructor() {
    super();
    this.logger = winston.createLogger({
      transports: [new winston.transports.Console()]
    });
  }

  @Stage(BOOT_STAGES.APPLICATION)
  setupRequestLogging(server: Express) {
    console.log('📝 Setting up request logging...');
    server.use(morgan('combined'));
  }

  @Stage(BOOT_STAGES.AFTER_APPLICATION_MIDDLEWARES)
  setupErrorLogging(server: Express) {
    server.use((err, req, res, next) => {
      this.logger.error('Error occurred:', err);
      next(err);
    });
  }
}
```

## 🤝 Contributing

We'd love your plugin ideas and improvements!

1. 🍴 Fork it
2. 🌿 Create your feature branch: `git checkout -b feature/epic-plugin`
3. ✍️ Add tests (we love tests!)
4. ✅ Run `yarn test` - green is good!
5. 🎨 Run `yarn lint` - make it pretty
6. 💾 Commit: `git commit -m "feat: add epic plugin feature"`
7. 🚀 Push and PR!

Check our [Contributing Guide](../../CONTRIBUTING.md) for the full details!

## 🔗 Related Packages

- **[@expressive-tea/commons](../commons)** - The metadata foundation
- **[@expressive-tea/core](https://www.npmjs.com/package/@expressive-tea/core)** - The full framework

## 📝 Changelog

Check [CHANGELOG.md](../../CHANGELOG.md) for what's cooking in each release!

## 🔄 Upgrading from v0.0.x?

Our [Migration Guide](../../MIGRATION.md) makes it painless!

## 💬 Support

Stuck? We've got your back:

- 📖 [Documentation](https://zero-oneit.github.io/expresive-tea/)
- 💬 [Gitter Chat](https://gitter.im/Expressive-Tea/expresive-tea) - Real-time help
- 🐛 [GitHub Issues](https://github.com/Expressive-Tea/packages/issues) - Report bugs
- 💡 [Discussions](https://github.com/Expressive-Tea/packages/discussions) - Ask anything
- 📧 [Email](mailto:support@expressive-tea.io) - Direct line

## 📄 License

Apache-2.0 - Free to use, free to share, free to build amazing things! See [LICENSE](../../LICENSE).

## 👨‍💻 Author

**Zero One IT** - [https://zerooneit.com](https://zerooneit.com)

## 🌟 Contributors

- **Diego Resendez** - *Original Author* - [@chrnx-dev](https://github.com/chrnx-dev)

See all the awesome [contributors](https://github.com/Expressive-Tea/packages/contributors) who helped build this!

---

<p align="center">
  <strong>Made with ☕ and 🍵 by the Expressive Tea Team</strong>
  <br />
  <sub>Build plugins. Share plugins. Change the world. 🚀</sub>
</p>

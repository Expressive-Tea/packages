/**
 * @fileoverview Tests for metadata decorator utilities
 */

import 'reflect-metadata';
import Metadata from '../../classes/Metadata';
import { SetMetadata, Meta, InheritMetadata, CacheInMetadata, Deprecated } from '../../decorators/metadata';

describe('Metadata Decorators', () => {
  beforeEach(() => {
    // Clear any existing metadata between tests
    jest.clearAllMocks();
  });

  describe('@SetMetadata', () => {
    it('should set metadata on a class', () => {
      @SetMetadata('role', 'admin')
      class TestClass {}

      const role = Metadata.get('role', TestClass);
      expect(role).toBe('admin');
    });

    it('should set metadata on a method', () => {
      class TestClass {
        @SetMetadata('route:path', '/users')
        getUsers() {
          return [];
        }
      }

      const path = Metadata.get('route:path', TestClass.prototype, 'getUsers');
      expect(path).toBe('/users');
    });

    it('should set metadata on a property', () => {
      class TestClass {
        @SetMetadata('validation:required', true)
        name!: string;
      }

      const required = Metadata.get('validation:required', TestClass.prototype, 'name');
      expect(required).toBe(true);
    });

    it('should support factory functions for dynamic values', () => {
      const factory = jest.fn(() => 'computed-value');

      class TestClass {
        @SetMetadata('dynamic', factory)
        method() {}
      }

      expect(factory).toHaveBeenCalled();
      const value = Metadata.get('dynamic', TestClass.prototype, 'method');
      expect(value).toBe('computed-value');
    });

    it('should pass target and propertyKey to factory function', () => {
      let capturedTarget: any;
      let capturedKey: any;

      const factory = (target: any, key?: string | symbol) => {
        capturedTarget = target;
        capturedKey = key;
        return 'value';
      };

      class TestClass {
        @SetMetadata('test', factory)
        myMethod() {}
      }

      expect(capturedTarget).toBe(TestClass.prototype);
      expect(capturedKey).toBe('myMethod');
    });

    it('should allow stacking multiple @SetMetadata decorators', () => {
      class TestClass {
        @SetMetadata('first', 'value1')
        @SetMetadata('second', 'value2')
        @SetMetadata('third', 'value3')
        method() {}
      }

      expect(Metadata.get('first', TestClass.prototype, 'method')).toBe('value1');
      expect(Metadata.get('second', TestClass.prototype, 'method')).toBe('value2');
      expect(Metadata.get('third', TestClass.prototype, 'method')).toBe('value3');
    });
  });

  describe('@Meta', () => {
    it('should set multiple metadata key-value pairs on a class', () => {
      @Meta({
        controller: true,
        basePath: '/api',
        version: 'v1'
      })
      class TestController {}

      expect(Metadata.get('controller', TestController)).toBe(true);
      expect(Metadata.get('basePath', TestController)).toBe('/api');
      expect(Metadata.get('version', TestController)).toBe('v1');
    });

    it('should set multiple metadata key-value pairs on a method', () => {
      class TestClass {
        @Meta({
          'route:path': '/products',
          'route:method': 'GET',
          'cache:ttl': 3600
        })
        getProducts() {}
      }

      expect(Metadata.get('route:path', TestClass.prototype, 'getProducts')).toBe('/products');
      expect(Metadata.get('route:method', TestClass.prototype, 'getProducts')).toBe('GET');
      expect(Metadata.get('cache:ttl', TestClass.prototype, 'getProducts')).toBe(3600);
    });

    it('should handle empty metadata object', () => {
      @Meta({})
      class TestClass {}

      // Should not throw, just set no metadata
      expect(TestClass).toBeDefined();
    });

    it('should support complex nested objects as values', () => {
      @Meta({
        config: {
          timeout: 5000,
          retries: 3,
          headers: { 'Content-Type': 'application/json' }
        }
      })
      class TestClass {}

      const config = Metadata.get('config', TestClass);
      expect(config).toEqual({
        timeout: 5000,
        retries: 3,
        headers: { 'Content-Type': 'application/json' }
      });
    });

    it('should work with @SetMetadata decorator', () => {
      class TestClass {
        @Meta({ a: 1, b: 2 })
        @SetMetadata('c', 3)
        method() {}
      }

      expect(Metadata.get('a', TestClass.prototype, 'method')).toBe(1);
      expect(Metadata.get('b', TestClass.prototype, 'method')).toBe(2);
      expect(Metadata.get('c', TestClass.prototype, 'method')).toBe(3);
    });
  });

  describe('@InheritMetadata', () => {
    it('should inherit specific metadata keys from source class', () => {
      @Meta({ timeout: 5000, retries: 3, maxSize: 100 })
      class BaseController {}

      @InheritMetadata(BaseController, ['timeout', 'retries'])
      class UserController {}

      expect(Metadata.get('timeout', UserController)).toBe(5000);
      expect(Metadata.get('retries', UserController)).toBe(3);
      expect(Metadata.get('maxSize', UserController)).toBeUndefined();
    });

    it('should not inherit keys that do not exist on source', () => {
      @Meta({ timeout: 5000 })
      class BaseController {}

      @InheritMetadata(BaseController, ['timeout', 'nonexistent'])
      class UserController {}

      expect(Metadata.get('timeout', UserController)).toBe(5000);
      expect(Metadata.get('nonexistent', UserController)).toBeUndefined();
    });

    it('should warn when inheriting all metadata without specific keys', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

      @Meta({ timeout: 5000 })
      class BaseController {}

      @InheritMetadata(BaseController)
      class UserController {}

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('InheritMetadata: Inheriting all metadata is limited')
      );

      consoleWarnSpy.mockRestore();
    });

    it('should handle empty keys array', () => {
      @Meta({ timeout: 5000 })
      class BaseController {}

      @InheritMetadata(BaseController, [])
      class UserController {}

      // Should not throw, but won't inherit anything
      expect(UserController).toBeDefined();
    });

    it('should allow overriding inherited metadata', () => {
      @Meta({ timeout: 5000 })
      class BaseController {}

      @Meta({ timeout: 10000 }) // Applied second (top-down in execution)
      @InheritMetadata(BaseController, ['timeout']) // Applied first (bottom-up in execution)
      class UserController {}

      // @Meta applied after @InheritMetadata, so @Meta value wins
      expect(Metadata.get('timeout', UserController)).toBe(10000);
    });
  });

  describe('@CacheInMetadata', () => {
    it('should cache method return value in metadata', () => {
      let callCount = 0;

      class ConfigProvider {
        @CacheInMetadata('computed:config')
        getConfig() {
          callCount++;
          return { apiKey: 'secret', timeout: 5000 };
        }
      }

      const provider = new ConfigProvider();
      const config1 = provider.getConfig();
      const config2 = provider.getConfig();

      expect(callCount).toBe(1); // Method called only once
      expect(config1).toEqual(config2);
      expect(config1).toEqual({ apiKey: 'secret', timeout: 5000 });
    });

    it('should store cached value in metadata', () => {
      class ConfigProvider {
        @CacheInMetadata('computed:result')
        compute() {
          return 42;
        }
      }

      const provider = new ConfigProvider();
      provider.compute();

      const cached = Metadata.get('computed:result', ConfigProvider.prototype, 'compute');
      expect(cached).toBe(42);
    });

    it('should not call method again if cache exists', () => {
      const mockFn = jest.fn(() => 'result');

      class TestClass {
        @CacheInMetadata('cache:key')
        method() {
          return mockFn();
        }
      }

      const instance = new TestClass();
      instance.method();
      instance.method();
      instance.method();

      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should handle methods with parameters', () => {
      class Calculator {
        @CacheInMetadata('cache:sum')
        add(a: number, b: number) {
          return a + b;
        }
      }

      const calc = new Calculator();
      const result1 = calc.add(5, 3);
      const result2 = calc.add(10, 20); // Different args, but cached value returned

      expect(result1).toBe(8);
      expect(result2).toBe(8); // Returns cached value, not 30
    });

    it('should preserve method context (this)', () => {
      class TestClass {
        value = 100;

        @CacheInMetadata('cache:result')
        getValue() {
          return this.value;
        }
      }

      const instance = new TestClass();
      expect(instance.getValue()).toBe(100);
    });
  });

  describe('@Deprecated', () => {
    it('should mark class as deprecated in metadata', () => {
      @Deprecated('Use NewClass instead')
      class OldClass {}

      expect(Metadata.get('deprecated', OldClass)).toBe(true);
      expect(Metadata.get('deprecated:message', OldClass)).toBe('Use NewClass instead');
    });

    it('should mark method as deprecated in metadata', () => {
      class TestClass {
        @Deprecated('Use newMethod() instead')
        oldMethod() {
          return 'old';
        }
      }

      expect(Metadata.get('deprecated', TestClass.prototype, 'oldMethod')).toBe(true);
      expect(Metadata.get('deprecated:message', TestClass.prototype, 'oldMethod')).toBe(
        'Use newMethod() instead'
      );
    });

    it('should log warning when deprecated method is called', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

      class TestClass {
        @Deprecated('Use newMethod() instead', true)
        oldMethod() {
          return 'result';
        }
      }

      const instance = new TestClass();
      instance.oldMethod();

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('[DEPRECATED]')
      );
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Use newMethod() instead')
      );

      consoleWarnSpy.mockRestore();
    });

    it('should not log warning when logWarning is false', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

      class TestClass {
        @Deprecated('Silent deprecation', false)
        method() {
          return 'result';
        }
      }

      const instance = new TestClass();
      instance.method();

      expect(consoleWarnSpy).not.toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });

    it('should still execute deprecated method correctly', () => {
      class TestClass {
        @Deprecated('Old method', false)
        calculate(a: number, b: number) {
          return a + b;
        }
      }

      const instance = new TestClass();
      const result = instance.calculate(5, 3);

      expect(result).toBe(8);
    });

    it('should work without message parameter', () => {
      @Deprecated()
      class TestClass {}

      expect(Metadata.get('deprecated', TestClass)).toBe(true);
      expect(Metadata.get('deprecated:message', TestClass)).toBeUndefined();
    });

    it('should preserve method descriptor', () => {
      class TestClass {
        @Deprecated('Old', false)
        method() {
          return 42;
        }
      }

      const descriptor = Object.getOwnPropertyDescriptor(TestClass.prototype, 'method');
      expect(descriptor).toBeDefined();
      expect(typeof descriptor?.value).toBe('function');
    });
  });

  describe('Integration tests', () => {
    it('should combine multiple decorators on same target', () => {
      @Meta({ type: 'controller' })
      @SetMetadata('version', 'v2')
      @Deprecated('Use V3Controller instead', false)
      class ApiController {
        @SetMetadata('route:path', '/api/users')
        @Meta({ method: 'GET', auth: true })
        @CacheInMetadata('cache:users')
        getUsers() {
          return [];
        }
      }

      // Class metadata
      expect(Metadata.get('type', ApiController)).toBe('controller');
      expect(Metadata.get('version', ApiController)).toBe('v2');
      expect(Metadata.get('deprecated', ApiController)).toBe(true);

      // Method metadata
      expect(Metadata.get('route:path', ApiController.prototype, 'getUsers')).toBe('/api/users');
      expect(Metadata.get('method', ApiController.prototype, 'getUsers')).toBe('GET');
      expect(Metadata.get('auth', ApiController.prototype, 'getUsers')).toBe(true);
    });

    it('should work with inheritance chains', () => {
      @Meta({ baseConfig: true })
      class BaseClass {}

      @InheritMetadata(BaseClass, ['baseConfig'])
      @Meta({ childConfig: true })
      class ChildClass extends BaseClass {}

      expect(Metadata.get('baseConfig', ChildClass)).toBe(true);
      expect(Metadata.get('childConfig', ChildClass)).toBe(true);
    });
  });
});

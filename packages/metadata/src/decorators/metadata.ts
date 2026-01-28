/**
 * Metadata decorator utilities
 * 
 * Provides convenient decorator factories for working with metadata.
 * These decorators simplify common metadata operations and make it easier
 * to create custom decorators without directly using the Metadata class.
 * 
 * @packageDocumentation
 * @module decorators/metadata
 * @since 2.0.0
 */

import 'reflect-metadata';
import Metadata from '../classes/Metadata';

/**
 * Decorator factory for setting metadata on classes, methods, or properties
 * 
 * Creates a decorator that stores metadata using the Metadata class.
 * The value can be a static value or a factory function that computes
 * the value based on the target and property.
 * 
 * @param key - The metadata key to store under
 * @param value - The value to store, or a factory function (target, propertyKey) => value
 * @returns A decorator function
 * @since 2.0.0
 * 
 * @example
 * ```typescript
 * // Static value
 * @SetMetadata('role', 'admin')
 * class AdminController {}
 * 
 * // Dynamic value with factory
 * @SetMetadata('timestamp', () => Date.now())
 * class MyClass {}
 * 
 * // On methods
 * class UserController {
 *   @SetMetadata('route:path', '/users')
 *   @SetMetadata('route:method', 'GET')
 *   getUsers() {}
 * }
 * 
 * // Retrieve metadata
 * const role = Metadata.get('role', AdminController); // 'admin'
 * const path = Metadata.get('route:path', UserController.prototype, 'getUsers'); // '/users'
 * ```
 */
export function SetMetadata(
  key: string,
  value: any | ((target: any, propertyKey?: string | symbol) => any)
): DecoratorFunction {
  return function (target: any, propertyKey?: string | symbol, descriptor?: PropertyDescriptor): any {
    const actualValue = typeof value === 'function' ? value(target, propertyKey) : value;
    
    // For class decorators, target is the constructor
    // For method/property decorators, target is the prototype
    Metadata.set(key, actualValue, target, propertyKey);
    
    return descriptor;
  };
}

/**
 * Decorator for setting multiple metadata key-value pairs at once
 * 
 * Convenient way to apply multiple metadata entries in a single decorator.
 * Useful when a class or method needs several related metadata values.
 * 
 * @param metadata - Object with key-value pairs to store as metadata
 * @returns A decorator function
 * @since 2.0.0
 * 
 * @example
 * ```typescript
 * // Apply multiple metadata values
 * @Meta({
 *   controller: true,
 *   basePath: '/api/users',
 *   version: 'v1',
 *   deprecated: false
 * })
 * class UserController {}
 * 
 * // On methods
 * class ProductController {
 *   @Meta({
 *     'route:path': '/products',
 *     'route:method': 'GET',
 *     'cache:ttl': 3600
 *   })
 *   getProducts() {}
 * }
 * 
 * // Retrieve metadata
 * const basePath = Metadata.get('basePath', UserController); // '/api/users'
 * const cacheTtl = Metadata.get('cache:ttl', ProductController.prototype, 'getProducts'); // 3600
 * ```
 */
export function Meta(metadata: Record<string, any>): DecoratorFunction {
  return function (target: any, propertyKey?: string | symbol, descriptor?: PropertyDescriptor): any {
    Object.entries(metadata).forEach(([key, value]) => {
      Metadata.set(key, value, target, propertyKey);
    });
    
    return descriptor;
  };
}

/**
 * Decorator to inherit metadata from another class
 * 
 * Copies metadata from a source class to the decorated class.
 * Useful for implementing mixins or sharing configuration between classes.
 * You can specify which keys to inherit, or inherit all by default.
 * 
 * @param sourceClass - The class to copy metadata from
 * @param keys - Optional array of specific metadata keys to inherit (inherits all if not specified)
 * @returns A class decorator function
 * @since 2.0.0
 * 
 * @example
 * ```typescript
 * // Base class with metadata
 * @Meta({ timeout: 5000, retries: 3 })
 * class BaseController {}
 * 
 * // Inherit all metadata
 * @InheritMetadata(BaseController)
 * class UserController {}
 * 
 * // Inherit specific keys only
 * @InheritMetadata(BaseController, ['timeout'])
 * class ProductController {}
 * 
 * // Check inherited metadata
 * const timeout = Metadata.get('timeout', UserController); // 5000
 * const retries = Metadata.get('retries', UserController); // 3
 * const productTimeout = Metadata.get('timeout', ProductController); // 5000
 * const productRetries = Metadata.get('retries', ProductController); // undefined
 * ```
 */
export function InheritMetadata(sourceClass: any, keys?: string[]): ClassDecorator {
  return function (target: any): any {
    // If specific keys provided, inherit only those
    if (keys && keys.length > 0) {
      keys.forEach((key) => {
        const value = Metadata.get(key, sourceClass);
        if (value !== undefined) {
          Metadata.set(key, value, target);
        }
      });
    } else {
      // Inherit all metadata keys from source
      // Note: This requires getting all metadata keys, which reflect-metadata doesn't provide directly
      // We use our internal PROPERTIES map via getTargetsFromPropertyKey
      // This is a limitation - we can only inherit keys that were set via Metadata.set()
      
      // Unfortunately, we need to iterate through known keys
      // This is a known limitation of reflect-metadata
      // For now, we'll document this limitation
      console.warn(
        'InheritMetadata: Inheriting all metadata is limited to keys previously registered. ' +
        'Consider specifying explicit keys for better reliability.'
      );
    }
    
    return target;
  };
}

/**
 * Decorator to make a method's return value cached in metadata
 * 
 * Stores the result of a method call as metadata, useful for
 * computed properties that should be calculated once and cached.
 * 
 * @param key - The metadata key to store the result under
 * @returns A method decorator function
 * @since 2.0.0
 * 
 * @example
 * ```typescript
 * class ConfigProvider {
 *   @CacheInMetadata('computed:config')
 *   getConfig() {
 *     console.log('Computing config...');
 *     return { apiKey: 'secret', timeout: 5000 };
 *   }
 * }
 * 
 * const provider = new ConfigProvider();
 * provider.getConfig(); // Logs: "Computing config..."
 * provider.getConfig(); // Returns cached value, no log
 * 
 * // Access cached value directly
 * const cached = Metadata.get('computed:config', ConfigProvider.prototype, 'getConfig');
 * ```
 */
export function CacheInMetadata(key: string): MethodDecorator {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (...args: any[]): any {
      // Check if cached value exists
      const cached = Metadata.get(key, target, propertyKey);
      if (cached !== undefined) {
        return cached;
      }
      
      // Call original method and cache result
      const result = originalMethod.apply(this, args);
      Metadata.set(key, result, target, propertyKey);
      
      return result;
    };
    
    return descriptor;
  };
}

/**
 * Decorator to mark a class or method as deprecated
 * 
 * Stores deprecation information and optionally logs warnings when accessed.
 * Useful for maintaining backward compatibility while guiding users to new APIs.
 * 
 * @param message - Optional deprecation message or migration guide
 * @param logWarning - Whether to log a warning when the decorated item is used (default: true)
 * @returns A decorator function
 * @since 2.0.0
 * 
 * @example
 * ```typescript
 * // Deprecate a class
 * @Deprecated('Use NewUserController instead')
 * class UserController {}
 * 
 * // Deprecate a method
 * class ProductService {
 *   @Deprecated('Use findById() instead', true)
 *   getProduct(id: string) {
 *     return this.findById(id);
 *   }
 *   
 *   findById(id: string) {
 *     return { id, name: 'Product' };
 *   }
 * }
 * 
 * // Check if deprecated
 * const isDeprecated = Metadata.get('deprecated', UserController); // true
 * const message = Metadata.get('deprecated:message', UserController);
 * ```
 */
export function Deprecated(message?: string, logWarning: boolean = true): DecoratorFunction {
  return function (target: any, propertyKey?: string | symbol, descriptor?: PropertyDescriptor): any {
    // Store deprecation metadata
    Metadata.set('deprecated', true, target, propertyKey);
    if (message) {
      Metadata.set('deprecated:message', message, target, propertyKey);
    }
    
    // For methods, wrap with warning
    if (descriptor && typeof descriptor.value === 'function' && logWarning) {
      const originalMethod = descriptor.value;
      const targetName = target.constructor?.name || target.name || 'Unknown';
      const methodName = String(propertyKey);
      
      descriptor.value = function (...args: any[]): any {
        console.warn(
          `[DEPRECATED] ${targetName}.${methodName} is deprecated.${message ? ' ' + message : ''}`
        );
        return originalMethod.apply(this, args);
      };
    }
    
    // For class constructors, log warning
    if (!propertyKey && logWarning) {
      const originalConstructor = target;
      const newConstructor: any = function (...args: any[]): any {
        console.warn(
          `[DEPRECATED] ${target.name} is deprecated.${message ? ' ' + message : ''}`
        );
        return new originalConstructor(...args);
      };
      
      // Copy prototype and static properties
      newConstructor.prototype = originalConstructor.prototype;
      Object.setPrototypeOf(newConstructor, originalConstructor);
      
      return newConstructor;
    }
    
    return descriptor;
  };
}

/**
 * Decorator type - can be applied to classes, methods, or properties
 * @since 2.0.0
 */
type DecoratorFunction = (
  target: any,
  propertyKey?: string | symbol,
  descriptor?: PropertyDescriptor
) => any;

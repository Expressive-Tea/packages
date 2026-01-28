/**
 * Metadata utility module for managing decorator metadata
 * 
 * Provides a clean API over TypeScript's reflect-metadata for storing
 * and retrieving metadata on classes and properties. This module is used
 * extensively by decorators throughout the Expressive Tea framework.
 * 
 * @packageDocumentation
 * @module classes/Metadata
 * @since 2.0.0
 */

import 'reflect-metadata';

/**
 * Internal helper function to get metadata
 * @private
 * @param key - Metadata key
 * @param target - Target class or object
 * @param propertyKey - Property name if getting property metadata
 * @param own - If true, only get own metadata (not inherited)
 * @returns The metadata value
 */
function get(key: string, target: any, propertyKey?: string | symbol, own: boolean = false) {
  return own ? Reflect.getOwnMetadata(key, target, propertyKey!) : Reflect.getMetadata(key, target, propertyKey!);
}

/**
 * Metadata management class
 * 
 * Wraps reflect-metadata API to provide type-safe metadata storage for decorators.
 * Supports both class-level and property-level metadata with methods for getting,
 * setting, checking existence, and deleting metadata.
 * 
 * @class Metadata
 * @summary Provides utilities for managing decorator metadata
 * @since 2.0.0
 * 
 * @example
 * ```typescript
 * // Store class metadata
 * class MyClass {}
 * Metadata.set('my-key', 'my-value', MyClass);
 * 
 * // Retrieve class metadata
 * const value = Metadata.get('my-key', MyClass); // 'my-value'
 * 
 * // Store property metadata
 * class MyClass {
 *   myProperty: string;
 * }
 * Metadata.set('prop-key', 'prop-value', MyClass.prototype, 'myProperty');
 * 
 * // Check if metadata exists
 * if (Metadata.has('my-key', MyClass)) {
 *   console.log('Metadata exists');
 * }
 * ```
 */
export default class Metadata {
  /**
   * Get metadata value for a key
   * 
   * Retrieves metadata stored on a class or property, including inherited metadata.
   * 
   * @static
   * @param key - The metadata key
   * @param target - The target class or prototype
   * @param propertyKey - Optional property name for property-level metadata
   * @returns The metadata value, or undefined if not found
   * @memberof Metadata
   * @since 2.0.0
   * 
   * @example
   * ```typescript
   * const value = Metadata.get('my-key', MyClass);
   * const propValue = Metadata.get('prop-key', MyClass.prototype, 'myProperty');
   * ```
   */
  static get(key: string, target: any, propertyKey?: string | symbol): any {
    return get(key, target, propertyKey!);
  }

  /**
   * Get own metadata value for a key (not inherited)
   * 
   * Retrieves metadata stored directly on a class or property,
   * excluding inherited metadata from parent classes.
   * 
   * @static
   * @param key - The metadata key
   * @param target - The target class or prototype
   * @param propertyKey - Optional property name for property-level metadata
   * @returns The metadata value, or undefined if not found
   * @memberof Metadata
   * @since 2.0.0
   * 
   * @example
   * ```typescript
   * const value = Metadata.getOwn('my-key', MyClass);
   * ```
   */
  static getOwn(key: string, target: any, propertyKey?: string | symbol): any {
    return get(key, target, propertyKey!, true);
  }

  /**
   * Get the design-time type of a property
   * 
   * Retrieves the TypeScript type information stored by the compiler
   * when emitDecoratorMetadata is enabled.
   * 
   * @static
   * @param target - The target class or prototype
   * @param propertyKey - Optional property name
   * @returns The type constructor
   * @memberof Metadata
   * @since 2.0.0
   * 
   * @example
   * ```typescript
   * class MyClass {
   *   name: string;
   * }
   * const type = Metadata.getType(MyClass.prototype, 'name'); // String constructor
   * ```
   */
  static getType(target: any, propertyKey?: string | symbol): any {
    return Reflect.getMetadata(DESIGN_TYPE, target, propertyKey!);
  }

  /**
   * Get the own design-time type of a property (not inherited)
   * 
   * @static
   * @param target - The target class or prototype
   * @param propertyKey - Optional property name
   * @returns The type constructor
   * @memberof Metadata
   * @since 2.0.0
   */
  static getOwnType(target: any, propertyKey?: string | symbol): any {
    return Reflect.getMetadata(DESIGN_TYPE, target, propertyKey!);
  }

  /**
   * Get the design-time return type of a method
   * 
   * Retrieves the return type information stored by the TypeScript compiler
   * for methods when emitDecoratorMetadata is enabled.
   * 
   * @static
   * @param target - The target class or prototype
   * @param propertyKey - Optional method name
   * @returns The return type constructor
   * @memberof Metadata
   * @since 2.0.0
   * 
   * @example
   * ```typescript
   * class MyClass {
   *   getName(): string { return 'test'; }
   * }
   * const returnType = Metadata.getReturnType(MyClass.prototype, 'getName'); // String
   * ```
   */
  static getReturnType(target: any, propertyKey?: string | symbol): any {
    return Reflect.getMetadata(DESIGN_RETURN_TYPE, target, propertyKey!);
  }

  /**
   * Get the own design-time return type of a method (not inherited)
   * 
   * @static
   * @param target - The target class or prototype
   * @param propertyKey - Optional method name
   * @returns The return type constructor
   * @memberof Metadata
   * @since 2.0.0
   */
  static getOwnReturnType(target: any, propertyKey?: string | symbol): any {
    return Reflect.getOwnMetadata(DESIGN_RETURN_TYPE, target, propertyKey!);
  }

  /**
   * Check if metadata exists for a key
   * 
   * Determines whether metadata has been set for the specified key,
   * including inherited metadata.
   * 
   * @static
   * @param key - The metadata key
   * @param target - The target class or prototype
   * @param propertyKey - Optional property name
   * @returns True if metadata exists, false otherwise
   * @memberof Metadata
   * @since 2.0.0
   * 
   * @example
   * ```typescript
   * if (Metadata.has('my-key', MyClass)) {
   *   console.log('Metadata exists');
   * }
   * ```
   */
  static has(key: string, target: any, propertyKey?: string | symbol): boolean {
    try {
      return Reflect.hasMetadata(key, target, propertyKey!);
    } catch {
      // Ignore errors and return false
    }

    return false;
  }

  /**
   * Check if own metadata exists for a key (not inherited)
   * 
   * @static
   * @param key - The metadata key
   * @param target - The target class or prototype
   * @param propertyKey - Optional property name
   * @returns True if own metadata exists, false otherwise
   * @memberof Metadata
   * @since 2.0.0
   */
  static hasOwn(key: string, target: any, propertyKey?: string | symbol): boolean {
    return Reflect.hasOwnMetadata(key, target, propertyKey!);
  }

  /**
   * Set parameter types metadata for a method
   * 
   * Stores the parameter types for a method, useful for dependency injection
   * and runtime type checking.
   * 
   * @static
   * @param target - The target class
   * @param propertyKey - The method name
   * @param value - The parameter types array
   * @memberof Metadata
   * @since 2.0.0
   * 
   * @example
   * ```typescript
   * Metadata.setParamTypes(MyClass, 'myMethod', [String, Number]);
   * ```
   */
  static setParamTypes(target: any, propertyKey: string | symbol, value: any): void {
    return this.set(DESIGN_PARAM_TYPES, value, target.prototype, propertyKey);
  }

  /**
   * Delete metadata for a key
   * 
   * Removes metadata associated with the specified key.
   * 
   * @static
   * @param key - The metadata key
   * @param target - The target class or prototype
   * @param propertyKey - Optional property name
   * @returns True if metadata was deleted, false otherwise
   * @memberof Metadata
   * @since 2.0.0
   * 
   * @example
   * ```typescript
   * Metadata.delete('my-key', MyClass);
   * ```
   */
  static delete(key: string, target: any, propertyKey?: string | symbol): boolean {
    return Reflect.deleteMetadata(key, target, propertyKey!);
  }

  /**
   * Get all targets associated with a metadata key
   * 
   * Returns an array of all classes/targets that have metadata
   * registered for the specified key.
   * 
   * @static
   * @param metadataKey - The metadata key
   * @returns Array of targets with this metadata key
   * @memberof Metadata
   * @since 2.0.0
   */
  static getTargetsFromPropertyKey = (metadataKey: string | symbol): any[] =>
    PROPERTIES.has(metadataKey) ? PROPERTIES.get(metadataKey) || [] : [];

  /**
   * Set metadata value for a key
   * 
   * Stores metadata on a class or property and tracks the target
   * for later retrieval via getTargetsFromPropertyKey.
   * 
   * @static
   * @param key - The metadata key
   * @param value - The metadata value to store
   * @param target - The target class or prototype
   * @param propertyKey - Optional property name for property-level metadata
   * @memberof Metadata
   * @since 2.0.0
   * 
   * @example
   * ```typescript
   * // Set class metadata
   * Metadata.set('my-key', { config: true }, MyClass);
   * 
   * // Set property metadata
   * Metadata.set('prop-key', 'value', MyClass.prototype, 'myProperty');
   * ```
   */
  static set(key: string, value: any, target: any, propertyKey?: string | symbol): void {
    const targets: any[] = PROPERTIES.has(key) ? PROPERTIES.get(key) || [] : [];
    const classConstructor = target;

    if (targets.indexOf(classConstructor) === -1) {
      targets.push(classConstructor);
      PROPERTIES.set(key, targets);
    }

    Reflect.defineMetadata(key, value, target, propertyKey!);
  }

  /**
   * Get parameter types for a method
   * 
   * Retrieves the design-time parameter types stored by the TypeScript compiler
   * when emitDecoratorMetadata is enabled.
   * 
   * @static
   * @param targetPrototype - The target class prototype
   * @param propertyKey - Optional method name
   * @returns Array of parameter type constructors
   * @memberof Metadata
   * @since 2.0.0
   * 
   * @example
   * ```typescript
   * class MyClass {
   *   myMethod(name: string, age: number) {}
   * }
   * const paramTypes = Metadata.getParamTypes(MyClass.prototype, 'myMethod');
   * // Returns [String, Number]
   * ```
   */
  static getParamTypes(targetPrototype: any, propertyKey?: string | symbol): any[] {
    return get(DESIGN_PARAM_TYPES, targetPrototype, propertyKey!) || [];
  }

  /**
   * Get own parameter types for a method (not inherited)
   * 
   * @static
   * @param target - The target class
   * @param propertyKey - Optional method name
   * @returns Array of parameter type constructors
   * @memberof Metadata
   * @since 2.0.0
   */
  static getOwnParamTypes(target: any, propertyKey?: string | symbol): any[] {
    return get(DESIGN_PARAM_TYPES, target, propertyKey!, true) || [];
  }
}

/**
 * TypeScript design-time metadata keys
 * @private
 */
const DESIGN_PARAM_TYPES = 'design:paramtypes';
const DESIGN_TYPE = 'design:type';
const DESIGN_RETURN_TYPE = 'design:returntype';

/**
 * Internal storage for tracking which classes have metadata keys
 * @private
 */
const PROPERTIES: Map<string | symbol, any[]> = new Map<string | symbol, any[]>();

/**
 * Object helper utilities
 * 
 * Provides utility functions for working with objects and classes,
 * particularly useful for decorator implementations.
 * 
 * @packageDocumentation
 * @module helpers/object-helper
 * @since 2.0.0
 */

/**
 * Get the constructor from a class or instance
 * 
 * Returns the constructor function regardless of whether the input
 * is a class constructor or an instance of a class. This is useful
 * when decorators need to work with both.
 * 
 * @param target - A class constructor or instance
 * @returns The class constructor
 * @since 2.0.0
 * 
 * @example
 * ```typescript
 * class MyClass {}
 * const instance = new MyClass();
 * 
 * getClass(MyClass);     // Returns MyClass
 * getClass(instance);    // Returns MyClass
 * ```
 */
export function getClass(target: any): any {
  return target.prototype ? target : target.constructor;
}

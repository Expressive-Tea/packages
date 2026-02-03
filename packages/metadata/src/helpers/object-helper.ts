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

// Regular expressions for parsing function arguments
const argumentsRegExp = /\(([\s\S]*?)\)/;
const replaceRegExp = /[ ,\n\r\t]+/;

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

/**
 * Get the name of a class
 * 
 * Returns the name of a class constructor or instance's constructor.
 * Useful for debugging and logging purposes.
 * 
 * @param targetClass - A class constructor or instance
 * @returns The name of the class
 * @since 2.0.0
 * 
 * @example
 * ```typescript
 * class MyClass {}
 * const instance = new MyClass();
 * 
 * nameOfClass(MyClass);     // Returns 'MyClass'
 * nameOfClass(instance);    // Returns 'MyClass'
 * ```
 */
export function nameOfClass(targetClass: any): string {
  return typeof targetClass === 'function' ? targetClass.name : targetClass.constructor.name;
}

/**
 * Check if a function is async
 * 
 * Determines whether a function is an async function or uses async/await.
 * Works with both native async functions and transpiled code.
 * 
 * @param fn - The function to check
 * @returns True if the function is async
 * @since 2.0.0
 * 
 * @example
 * ```typescript
 * async function asyncFn() {}
 * function normalFn() {}
 * 
 * isAsyncFunction(asyncFn);   // Returns true
 * isAsyncFunction(normalFn);  // Returns false
 * ```
 */
export function isAsyncFunction(fn: () => any): boolean {
  return fn.constructor.name === 'AsyncFunction' || fn.constructor.name.includes('__awaiter');
}

/**
 * Extract parameter names from a function
 * 
 * Parses a function's toString() representation to extract parameter names.
 * Useful for introspecting function signatures at runtime.
 * 
 * @param fn - The function to introspect
 * @returns Array of parameter names
 * @since 2.0.0
 * 
 * @example
 * ```typescript
 * function myFunction(req, res, next) {}
 * 
 * getOwnArgumentNames(myFunction);  // Returns ['req', 'res', 'next']
 * ```
 */
export function getOwnArgumentNames(fn: Function): string[] {
  const match = argumentsRegExp.exec(fn.toString());
  if (!match || !match[1]) {
    return [];
  }
  
  const fnArguments = match[1].trim();
  return fnArguments && fnArguments.length ? fnArguments.split(replaceRegExp) : [];
}

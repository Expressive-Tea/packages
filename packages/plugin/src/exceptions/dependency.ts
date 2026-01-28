/**
 * Plugin dependency exception
 * 
 * Custom error class for handling missing plugin dependencies.
 * 
 * @packageDocumentation
 * @module exceptions/dependency
 * @since 2.0.0
 */

/**
 * Exception thrown when a plugin dependency is not found
 * 
 * This error is thrown during plugin registration when a declared
 * dependency has not been registered with the application.
 * 
 * @class DependencyNotFound
 * @extends Error
 * @summary Error thrown for missing plugin dependencies
 * @since 2.0.0
 * 
 * @example
 * ```typescript
 * class MyPlugin extends Plugin {
 *   constructor() {
 *     super();
 *     this.dependencies = ['cors-plugin'];
 *   }
 * }
 * 
 * // If 'cors-plugin' is not registered, throws:
 * // DependencyNotFound: Dependency cors-plugin was not satisfied
 * ```
 */
export class DependencyNotFound extends Error {
  /**
   * Error message
   * @type {string}
   * @memberof DependencyNotFound
   */
  message: string = 'Unknown Dependency';

  /**
   * Name of the missing dependency
   * @type {string}
   * @memberof DependencyNotFound
   */
  dependencyName: string = 'Unknown';

  /**
   * Create a new DependencyNotFound error
   * 
   * @param dependencyName - Name of the missing dependency
   * @memberof DependencyNotFound
   * @since 2.0.0
   * 
   * @example
   * ```typescript
   * throw new DependencyNotFound('cors-plugin');
   * ```
   */
  constructor(dependencyName = 'Unknown') {
    super();
    this.dependencyName = dependencyName;
    this.message = `Dependency ${dependencyName} was not satisfied`;
  }
}

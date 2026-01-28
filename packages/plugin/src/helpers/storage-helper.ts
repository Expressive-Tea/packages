/**
 * Storage management utilities
 * 
 * Provides WeakMap-based storage for plugin metadata to avoid memory leaks.
 * Used internally by the Stage decorator to store lifecycle stage information.
 * 
 * @packageDocumentation
 * @module helpers/storage-helper
 * @since 2.0.0
 */

/**
 * Internal storage for class-level metadata
 * @private
 */
const classStorage: WeakMap<any, any> = new WeakMap();

/**
 * Internal storage for property-level metadata
 * @private
 */
const propertiesStorage: WeakMap<any, any> = new WeakMap();

/**
 * Storage manager for plugin metadata
 * 
 * Manages storage of metadata using WeakMaps to prevent memory leaks.
 * Supports both class-level and property-level storage.
 * 
 * @class StorageManager
 * @summary WeakMap-based metadata storage
 * @since 2.0.0
 * 
 * @example
 * ```typescript
 * // Store class-level data
 * StorageManager.set('my-key', { data: 'value' }, MyClass);
 * 
 * // Store property-level data
 * StorageManager.set('prop-key', 'value', MyClass.prototype, 'myProperty');
 * 
 * // Retrieve data
 * const data = StorageManager.get('my-key', MyClass);
 * ```
 */
export class StorageManager {
  /**
   * Store metadata for a class or property
   * 
   * @static
   * @param key - The metadata key
   * @param value - The value to store
   * @param target - The target class or prototype
   * @param propertyKey - Optional property name for property-level storage
   * @memberof StorageManager
   * @since 2.0.0
   * 
   * @example
   * ```typescript
   * StorageManager.set('stages', stageData, MyPlugin);
   * ```
   */
  static set(key: string, value: any, target: any, propertyKey?: string | symbol) {
    if (propertyKey) {
      const targetPropertiesStorage: WeakMap<any, any> = propertiesStorage.get(target);
      targetPropertiesStorage.set(propertyKey, value);
    } else {
      classStorage.set(target, value);
      propertiesStorage.set(target, new WeakMap());
    }
  }

  /**
   * Retrieve metadata for a class or property
   * 
   * @static
   * @param key - The metadata key
   * @param target - The target class or prototype
   * @param propertyKey - Optional property name for property-level storage
   * @returns The stored value, or undefined if not found
   * @memberof StorageManager
   * @since 2.0.0
   * 
   * @example
   * ```typescript
   * const stages = StorageManager.get('stages', MyPlugin);
   * ```
   */
  static get(key: string, target: any, propertyKey?: string | symbol) {
    if (!classStorage.has(target)) {
      return;
    }

    if (propertyKey) {
      if (!propertiesStorage.has(target)) {
        return;
      }

      const propertyStorage: WeakMap<any, any> = propertiesStorage.get(target);
      return propertyStorage.get(propertyKey);
    }

    return classStorage.get(target);
  }
}

/**
 * Native Utility Functions
 * 
 * Lightweight replacements for lodash functions using native JavaScript/TypeScript.
 * These utilities provide common array and collection manipulation functions
 * without external dependencies.
 * 
 * @module libs/utilities
 * @since 2.0.0
 */

/**
 * Find the index of the first element in an array that matches a predicate or object pattern
 * 
 * @param {any[]} array - The array to search
 * @param {((item: any) => boolean) | [string, any] | Partial<T>} predicate - The function, lodash-style tuple, or object pattern to match
 * @returns {number} Returns the index of the matched element, else -1
 * 
 * @example
 * findIndex([1, 2, 3, 4], n => n > 2) // => 2
 * findIndex([{ a: 1 }, { a: 2 }], { a: 2 }) // => 1
 * findIndex([{ name: 'foo' }, { name: 'bar' }], ['name', 'bar']) // => 1
 */
export function findIndex<T = any>(
  array: T[],
  predicate: ((item: T) => boolean) | [string, any] | Partial<T>
): number {
  if (!Array.isArray(array)) {
    return -1;
  }

  // If predicate is a function, use it directly
  if (typeof predicate === 'function') {
    return array.findIndex(predicate);
  }

  // If predicate is a lodash-style tuple like ['name', 'value']
  if (Array.isArray(predicate) && predicate.length === 2) {
    const [key, value] = predicate;
    return array.findIndex((item) => {
      if (!item || typeof item !== 'object') {
        return false;
      }
      return (item as any)[key] === value;
    });
  }

  // If predicate is an object, match properties
  if (predicate && typeof predicate === 'object') {
    return array.findIndex((item) => {
      if (!item || typeof item !== 'object') {
        return false;
      }
      return Object.keys(predicate).every((key) => (item as any)[key] === (predicate as any)[key]);
    });
  }

  return -1;
}

/**
 * Get the size of a collection
 * 
 * @param {any} collection - The collection to inspect
 * @returns {number} Returns the collection size
 * 
 * @example
 * size([1, 2, 3]) // => 3
 * size({ a: 1, b: 2 }) // => 2
 * size('hello') // => 5
 * size(null) // => 0
 */
export function size(collection: any): number {
  if (!collection) {
    return 0;
  }

  if (Array.isArray(collection) || typeof collection === 'string') {
    return collection.length;
  }

  if (typeof collection === 'object') {
    return Object.keys(collection).length;
  }

  return 0;
}

/**
 * Iterate over elements of a collection and invoke a callback for each element
 * 
 * @param {any[]} array - The array to iterate over
 * @param {(item: T, index: number, array: T[]) => void} callback - The function invoked per iteration
 * @returns {void}
 * 
 * @example
 * each([1, 2, 3], (n) => console.log(n))
 * // => Logs 1, 2, 3
 */
export function each<T = any>(
  array: T[],
  callback: (item: T, index: number, array: T[]) => void
): void {
  if (!Array.isArray(array)) {
    return;
  }

  array.forEach(callback);
}

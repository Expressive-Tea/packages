/**
 * Unit tests for libs/utilities.ts
 * 
 * Tests native TypeScript utility functions that replace lodash
 */

import { findIndex, size, each } from '../../libs/utilities';

describe('Utility Functions', () => {
  describe('findIndex()', () => {
    describe('with predicate function', () => {
      test('should find index with predicate function', () => {
        const arr = [1, 2, 3, 4];
        expect(findIndex(arr, (n) => n > 2)).toBe(2);
      });

      test('should return -1 when not found with predicate', () => {
        const arr = [1, 2, 3];
        expect(findIndex(arr, (n) => n > 10)).toBe(-1);
      });

      test('should find first matching element', () => {
        const arr = [1, 2, 3, 4, 5];
        expect(findIndex(arr, (n) => n > 2)).toBe(2); // Returns index of 3, not 4 or 5
      });
    });

    describe('with object matching', () => {
      test('should find index with object matching', () => {
        const arr = [{ a: 1 }, { a: 2 }, { a: 3 }];
        expect(findIndex(arr, { a: 2 })).toBe(1);
      });

      test('should find index with multiple properties', () => {
        const arr = [
          { a: 1, b: 2 },
          { a: 2, b: 2 },
          { a: 2, b: 3 }
        ];
        expect(findIndex(arr, { a: 2, b: 3 })).toBe(2);
      });

      test('should return -1 when not found with object', () => {
        const arr = [{ a: 1 }, { a: 2 }];
        expect(findIndex(arr, { a: 3 })).toBe(-1);
      });

      test('should handle partial object matching', () => {
        const arr = [
          { a: 1, b: 2, c: 3 },
          { a: 2, b: 2, c: 4 }
        ];
        expect(findIndex(arr, { a: 2 })).toBe(1); // Only matches a property
      });
    });

    describe('with lodash-style tuple syntax', () => {
      test('should find index with lodash tuple syntax', () => {
        const arr = [{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }];
        expect(findIndex(arr, ['name', 'bar'])).toBe(1);
      });

      test('should return -1 when not found with tuple syntax', () => {
        const arr = [{ name: 'foo' }, { name: 'bar' }];
        expect(findIndex(arr, ['name', 'qux'])).toBe(-1);
      });

      test('should work with numeric values in tuple', () => {
        const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
        expect(findIndex(arr, ['id', 2])).toBe(1);
      });

      test('should work with string values in tuple', () => {
        const arr = [{ status: 'pending' }, { status: 'active' }];
        expect(findIndex(arr, ['status', 'active'])).toBe(1);
      });
    });

    describe('edge cases', () => {
      test('should return -1 for non-array', () => {
        expect(findIndex(null as any, (_x) => true)).toBe(-1);
        expect(findIndex(undefined as any, (_x) => true)).toBe(-1);
        expect(findIndex('string' as any, (_x) => true)).toBe(-1);
      });

      test('should return -1 for empty array', () => {
        expect(findIndex([], (_x) => true)).toBe(-1);
      });

      test('should handle array with non-object items when using object predicate', () => {
        const arr = [1, 2, 3, { a: 1 }];
        expect(findIndex(arr, { a: 1 })).toBe(3);
      });

      test('should handle array with null/undefined items', () => {
        const arr = [null, undefined, { a: 1 }];
        expect(findIndex(arr, { a: 1 })).toBe(2);
      });
    });
  });

  describe('size()', () => {
    describe('arrays', () => {
      test('should return size of array', () => {
        expect(size([1, 2, 3])).toBe(3);
      });

      test('should return 0 for empty array', () => {
        expect(size([])).toBe(0);
      });

      test('should handle array with various elements', () => {
        expect(size([1, 'two', null, undefined, { a: 1 }])).toBe(5);
      });
    });

    describe('objects', () => {
      test('should return size of object', () => {
        expect(size({ a: 1, b: 2 })).toBe(2);
      });

      test('should return 0 for empty object', () => {
        expect(size({})).toBe(0);
      });

      test('should count enumerable properties only', () => {
        const obj = { a: 1, b: 2 };
        Object.defineProperty(obj, 'c', {
          value: 3,
          enumerable: false
        });
        expect(size(obj)).toBe(2);
      });
    });

    describe('strings', () => {
      test('should return size of string', () => {
        expect(size('hello')).toBe(5);
      });

      test('should return 0 for empty string', () => {
        expect(size('')).toBe(0);
      });
    });

    describe('null and undefined', () => {
      test('should return 0 for null', () => {
        expect(size(null)).toBe(0);
      });

      test('should return 0 for undefined', () => {
        expect(size(undefined)).toBe(0);
      });
    });

    describe('other types', () => {
      test('should return 0 for number', () => {
        expect(size(42)).toBe(0);
      });

      test('should return 0 for boolean', () => {
        expect(size(true)).toBe(0);
      });

      test('should return 0 for function', () => {
        expect(size(() => {})).toBe(0);
      });
    });
  });

  describe('each()', () => {
    describe('basic iteration', () => {
      test('should iterate over array elements', () => {
        const arr = [1, 2, 3];
        const results: number[] = [];
        each(arr, (n) => results.push(n));
        expect(results).toEqual([1, 2, 3]);
      });

      test('should pass index to callback', () => {
        const arr = ['a', 'b', 'c'];
        const indices: number[] = [];
        each(arr, (_item, index) => indices.push(index));
        expect(indices).toEqual([0, 1, 2]);
      });

      test('should pass array to callback', () => {
        const arr = [1, 2, 3];
        let receivedArray: number[] | undefined;
        each(arr, (_item, _index, array) => {
          receivedArray = array;
        });
        expect(receivedArray).toBe(arr);
      });
    });

    describe('callback execution', () => {
      test('should execute callback for each element', () => {
        const arr = [1, 2, 3, 4];
        let count = 0;
        each(arr, () => count++);
        expect(count).toBe(4);
      });

      test('should handle callback that modifies external state', () => {
        const arr = [1, 2, 3];
        let sum = 0;
        each(arr, (n) => {
          sum += n;
        });
        expect(sum).toBe(6);
      });

      test('should work with object arrays', () => {
        const arr = [{ a: 1 }, { a: 2 }, { a: 3 }];
        const values: number[] = [];
        each(arr, (item) => values.push(item.a));
        expect(values).toEqual([1, 2, 3]);
      });
    });

    describe('edge cases', () => {
      test('should not execute callback for empty array', () => {
        let called = false;
        each([], () => {
          called = true;
        });
        expect(called).toBe(false);
      });

      test('should handle non-array gracefully', () => {
        expect(() => {
          each(null as any, () => {});
        }).not.toThrow();

        expect(() => {
          each(undefined as any, () => {});
        }).not.toThrow();
      });

      test('should handle array with null/undefined elements', () => {
        const arr = [1, null, undefined, 2];
        const results: any[] = [];
        each(arr, (item) => results.push(item));
        expect(results).toEqual([1, null, undefined, 2]);
      });
    });

    describe('return value', () => {
      test('should return undefined', () => {
        const result = each([1, 2, 3], () => {});
        expect(result).toBeUndefined();
      });
    });
  });
});

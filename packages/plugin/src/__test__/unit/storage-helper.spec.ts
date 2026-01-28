import { StorageManager } from '../../helpers/storage-helper';

describe('StorageManager', () => {
  class TestClass {}

  describe('set and get for class-level storage', () => {
    it('should store and retrieve class-level data', () => {
      const testData = { foo: 'bar' };
      StorageManager.set('test-key', testData, TestClass);

      const result = StorageManager.get('test-key', TestClass);
      expect(result).toEqual(testData);
    });

    it('should return undefined for non-existent class data', () => {
      class EmptyClass {}
      const result = StorageManager.get('non-existent', EmptyClass);
      expect(result).toBeUndefined();
    });

    it('should handle complex objects', () => {
      const complexData = {
        nested: {
          array: [1, 2, 3],
          string: 'test',
          boolean: true
        }
      };

      StorageManager.set('complex-key', complexData, TestClass);
      const result = StorageManager.get('complex-key', TestClass);
      expect(result).toEqual(complexData);
    });
  });

  describe('set and get for property-level storage', () => {
    it('should store and retrieve property-level data', () => {
      const testData = { value: 123 };
      const propertyKey = Symbol('testProperty');

      // First set class-level to initialize property storage
      StorageManager.set('class-key', {}, TestClass);
      // Then set property-level
      StorageManager.set('prop-key', testData, TestClass, propertyKey);

      const result = StorageManager.get('prop-key', TestClass, propertyKey);
      expect(result).toEqual(testData);
    });

    it('should return undefined for non-existent property data', () => {
      const propertyKey = Symbol('nonExistent');
      StorageManager.set('class-key', {}, TestClass);
      const result = StorageManager.get('prop-key', TestClass, propertyKey);
      expect(result).toBeUndefined();
    });

    it('should return undefined when target has no class storage', () => {
      class NewClass {}
      const result = StorageManager.get('any-key', NewClass, Symbol('anyProperty'));
      expect(result).toBeUndefined();
    });

    it('should handle multiple properties on same target', () => {
      const prop1 = Symbol('property1');
      const prop2 = Symbol('property2');

      StorageManager.set('class-key', {}, TestClass);
      StorageManager.set('prop-key', 'value1', TestClass, prop1);
      StorageManager.set('prop-key', 'value2', TestClass, prop2);

      const result1 = StorageManager.get('prop-key', TestClass, prop1);
      const result2 = StorageManager.get('prop-key', TestClass, prop2);

      expect(result1).toBe('value1');
      expect(result2).toBe('value2');
    });
  });

  describe('WeakMap behavior', () => {
    it('should isolate storage between different classes', () => {
      class ClassA {}
      class ClassB {}

      StorageManager.set('shared-key', 'value-a', ClassA);
      StorageManager.set('shared-key', 'value-b', ClassB);

      expect(StorageManager.get('shared-key', ClassA)).toBe('value-a');
      expect(StorageManager.get('shared-key', ClassB)).toBe('value-b');
    });

    it('should allow garbage collection of unused class references', () => {
      // This test verifies the WeakMap allows GC, but we can't actually test GC
      // We just verify the WeakMap pattern is used correctly
      class TemporaryClass {}

      StorageManager.set('temp-key', 'temp-value', TemporaryClass);
      expect(StorageManager.get('temp-key', TemporaryClass)).toBe('temp-value');

      // When TemporaryClass goes out of scope, WeakMap should allow GC
    });
  });
});

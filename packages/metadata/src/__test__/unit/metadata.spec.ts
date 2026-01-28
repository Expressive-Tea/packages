import 'reflect-metadata';
import Metadata from '../../classes/Metadata';

describe('Metadata', () => {
  class TestClass {
    testProperty: string = '';
    testMethod() {
      return 'test';
    }
  }

  beforeEach(() => {
    // Clear metadata between tests
    Reflect.deleteMetadata('test-key', TestClass);
    Reflect.deleteMetadata('test-key', TestClass.prototype);
  });

  describe('set and get', () => {
    it('should store and retrieve class-level metadata', () => {
      Metadata.set('test-key', 'test-value', TestClass);
      const result = Metadata.get('test-key', TestClass);
      expect(result).toBe('test-value');
    });

    it('should store and retrieve property-level metadata', () => {
      Metadata.set('test-key', 'test-value', TestClass.prototype, 'testProperty');
      const result = Metadata.get('test-key', TestClass.prototype, 'testProperty');
      expect(result).toBe('test-value');
    });

    it('should return undefined for non-existent metadata', () => {
      const result = Metadata.get('non-existent', TestClass);
      expect(result).toBeUndefined();
    });

    it('should handle complex values', () => {
      const complexValue = { foo: 'bar', nested: { value: 123 } };
      Metadata.set('complex-key', complexValue, TestClass);
      const result = Metadata.get('complex-key', TestClass);
      expect(result).toEqual(complexValue);
    });
  });

  describe('getOwn', () => {
    it('should retrieve only own metadata', () => {
      Metadata.set('own-key', 'own-value', TestClass);
      const result = Metadata.getOwn('own-key', TestClass);
      expect(result).toBe('own-value');
    });
  });

  describe('has and hasOwn', () => {
    it('should return true when metadata exists', () => {
      Metadata.set('exists-key', 'value', TestClass);
      expect(Metadata.has('exists-key', TestClass)).toBe(true);
    });

    it('should return false when metadata does not exist', () => {
      expect(Metadata.has('does-not-exist', TestClass)).toBe(false);
    });

    it('should return true for hasOwn when metadata exists', () => {
      Metadata.set('exists-key', 'value', TestClass);
      expect(Metadata.hasOwn('exists-key', TestClass)).toBe(true);
    });

    it('should handle errors gracefully in has method', () => {
      // has method should catch errors and return false
      expect(Metadata.has('any-key', null)).toBe(false);
    });
  });

  describe('delete', () => {
    it('should delete existing metadata', () => {
      Metadata.set('delete-key', 'value', TestClass);
      expect(Metadata.has('delete-key', TestClass)).toBe(true);
      Metadata.delete('delete-key', TestClass);
      expect(Metadata.has('delete-key', TestClass)).toBe(false);
    });

    it('should return true when metadata was deleted', () => {
      Metadata.set('delete-key', 'value', TestClass);
      const result = Metadata.delete('delete-key', TestClass);
      expect(result).toBe(true);
    });
  });

  describe('getTargetsFromPropertyKey', () => {
    it('should return targets that have the metadata key', () => {
      Metadata.set('target-key', 'value1', TestClass);
      const targets = Metadata.getTargetsFromPropertyKey('target-key');
      expect(targets).toContain(TestClass);
    });

    it('should return empty array for non-existent key', () => {
      const targets = Metadata.getTargetsFromPropertyKey('non-existent-key');
      expect(targets).toEqual([]);
    });

    it('should track multiple targets with same metadata key', () => {
      class AnotherClass {}
      Metadata.set('shared-key', 'value1', TestClass);
      Metadata.set('shared-key', 'value2', AnotherClass);
      const targets = Metadata.getTargetsFromPropertyKey('shared-key');
      expect(targets).toContain(TestClass);
      expect(targets).toContain(AnotherClass);
    });
  });

  describe('getType and getOwnType', () => {
    it('should retrieve design:type metadata', () => {
      class TypeTestClass {
        @Reflect.metadata('design:type', String)
        stringProp: string = '';
      }

      const type = Metadata.getType(TypeTestClass.prototype, 'stringProp');
      expect(type).toBe(String);
    });
  });

  describe('getReturnType and getOwnReturnType', () => {
    it('should retrieve design:returntype metadata', () => {
      class ReturnTypeTestClass {
        @Reflect.metadata('design:returntype', String)
        getStringMethod(): string {
          return 'test';
        }
      }

      const returnType = Metadata.getReturnType(ReturnTypeTestClass.prototype, 'getStringMethod');
      expect(returnType).toBe(String);
    });

    it('should retrieve own design:returntype metadata', () => {
      class ReturnTypeTestClass {
        @Reflect.metadata('design:returntype', Number)
        getNumberMethod(): number {
          return 42;
        }
      }

      const returnType = Metadata.getOwnReturnType(ReturnTypeTestClass.prototype, 'getNumberMethod');
      expect(returnType).toBe(Number);
    });
  });

  describe('getParamTypes and getOwnParamTypes', () => {
    it('should return empty array when no param types metadata exists', () => {
      const paramTypes = Metadata.getParamTypes(TestClass.prototype);
      expect(paramTypes).toEqual([]);
    });

    it('should return param types when metadata exists', () => {
      Reflect.defineMetadata('design:paramtypes', [String, Number], TestClass.prototype, 'testMethod');
      const paramTypes = Metadata.getParamTypes(TestClass.prototype, 'testMethod');
      expect(paramTypes).toEqual([String, Number]);
    });

    it('should return own param types', () => {
      Reflect.defineMetadata('design:paramtypes', [Boolean], TestClass.prototype, 'testMethod');
      const paramTypes = Metadata.getOwnParamTypes(TestClass.prototype, 'testMethod');
      expect(paramTypes).toEqual([Boolean]);
    });
  });

  describe('setParamTypes', () => {
    it('should set param types metadata on prototype', () => {
      Metadata.setParamTypes(TestClass, 'testMethod', [String, Number]);
      const paramTypes = Metadata.getParamTypes(TestClass.prototype, 'testMethod');
      expect(paramTypes).toEqual([String, Number]);
    });
  });
});

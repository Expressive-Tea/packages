import { getClass } from '../../helpers/object-helper';

describe('object-helper', () => {
  describe('getClass', () => {
    it('should return the constructor when target is a class', () => {
      class TestClass {}
      const result = getClass(TestClass);
      expect(result).toBe(TestClass);
    });

    it('should return the constructor when target is an instance', () => {
      class TestClass {}
      const instance = new TestClass();
      const result = getClass(instance);
      expect(result).toBe(TestClass);
    });

    it('should handle built-in types', () => {
      const str = 'test';
      const result = getClass(str);
      expect(result).toBe(String);
    });

    it('should handle objects', () => {
      const obj = {};
      const result = getClass(obj);
      expect(result).toBe(Object);
    });

    it('should return constructor for functions', () => {
      function TestFunction() {}
      const result = getClass(TestFunction);
      expect(result).toBe(TestFunction);
    });
  });
});

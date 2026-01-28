import { getClass, getStages, getStage, setStage } from '../../helpers/object-helper';
import { BOOT_STAGES } from '../../constants';

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
  });

  describe('getStages', () => {
    it('should return empty object for class without stages', () => {
      class EmptyPlugin {}
      const stages = getStages(new EmptyPlugin());
      expect(stages).toEqual({});
    });

    it('should return stages object after setting stages', () => {
      class TestPlugin {}
      const plugin = new TestPlugin();

      setStage(BOOT_STAGES.APPLICATION, [{ method: () => {}, name: 'test', required: false }], plugin);

      const stages = getStages(plugin);
      expect(stages[BOOT_STAGES.APPLICATION]).toBeDefined();
    });
  });

  describe('getStage', () => {
    it('should return empty array for non-existent stage', () => {
      class TestPlugin {}
      const plugin = new TestPlugin();

      const stage = getStage(BOOT_STAGES.APPLICATION, plugin);
      expect(stage).toEqual([]);
    });

    it('should initialize stage array if it does not exist', () => {
      class TestPlugin {}
      const plugin = new TestPlugin();

      const stage = getStage(BOOT_STAGES.APPLICATION, plugin);
      expect(Array.isArray(stage)).toBe(true);
      expect(stage).toHaveLength(0);
    });

    it('should return existing stage data', () => {
      class TestPlugin {}
      const plugin = new TestPlugin();

      const stageData = [{ method: () => 'test', name: 'test', required: false }];
      setStage(BOOT_STAGES.APPLICATION, stageData, plugin);

      const stage = getStage(BOOT_STAGES.APPLICATION, plugin);
      expect(stage).toEqual(stageData);
    });
  });

  describe('setStage', () => {
    it('should set stage data for a plugin', () => {
      class TestPlugin {}
      const plugin = new TestPlugin();

      const stageData = [{ method: () => 'test', name: 'test', required: true }];
      setStage(BOOT_STAGES.BOOT_DEPENDENCIES, stageData, plugin);

      const stage = getStage(BOOT_STAGES.BOOT_DEPENDENCIES, plugin);
      expect(stage).toEqual(stageData);
    });

    it('should update existing stage data', () => {
      class TestPlugin {}
      const plugin = new TestPlugin();

      const initialData = [{ method: () => 'first', name: 'first', required: false }];
      const updatedData = [
        { method: () => 'second', name: 'second', required: true },
        { method: () => 'third', name: 'third', required: false }
      ];

      setStage(BOOT_STAGES.APPLICATION, initialData, plugin);
      setStage(BOOT_STAGES.APPLICATION, updatedData, plugin);

      const stage = getStage(BOOT_STAGES.APPLICATION, plugin);
      expect(stage).toEqual(updatedData);
      expect(stage).toHaveLength(2);
    });

    it('should maintain separate stages for different boot stages', () => {
      class TestPlugin {}
      const plugin = new TestPlugin();

      const appData = [{ method: () => 'app', name: 'app', required: false }];
      const bootData = [{ method: () => 'boot', name: 'boot', required: true }];

      setStage(BOOT_STAGES.APPLICATION, appData, plugin);
      setStage(BOOT_STAGES.BOOT_DEPENDENCIES, bootData, plugin);

      expect(getStage(BOOT_STAGES.APPLICATION, plugin)).toEqual(appData);
      expect(getStage(BOOT_STAGES.BOOT_DEPENDENCIES, plugin)).toEqual(bootData);
    });
  });
});

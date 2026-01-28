import { Stage } from '../../decorators/stage';
import { BOOT_STAGES } from '../../constants';
import { getStage } from '../../helpers/object-helper';

describe('Stage Decorator', () => {
  it('should register a method to a boot stage', () => {
    class TestPlugin {
      @Stage(BOOT_STAGES.APPLICATION)
      onApplication() {
        return 'app';
      }
    }

    const plugin = new TestPlugin();
    const applicationStage = getStage(BOOT_STAGES.APPLICATION, plugin);

    expect(applicationStage).toBeDefined();
    expect(Array.isArray(applicationStage)).toBe(true);
  });

  it('should mark stage as required when specified', () => {
    class TestPlugin {
      @Stage(BOOT_STAGES.APPLICATION, true)
      onApplicationRequired() {
        return 'required';
      }
    }

    const plugin = new TestPlugin();
    const applicationStage = getStage(BOOT_STAGES.APPLICATION, plugin);

    expect(applicationStage[0]).toHaveProperty('required', true);
  });

  it('should mark stage as not required by default', () => {
    class TestPlugin {
      @Stage(BOOT_STAGES.APPLICATION)
      onApplicationOptional() {
        return 'optional';
      }
    }

    const plugin = new TestPlugin();
    const applicationStage = getStage(BOOT_STAGES.APPLICATION, plugin);

    expect(applicationStage[0]).toHaveProperty('required', false);
  });

  it('should store method reference in stage', () => {
    class TestPlugin {
      @Stage(BOOT_STAGES.APPLICATION)
      onApplication() {
        return 'test-result';
      }
    }

    const plugin = new TestPlugin();
    const applicationStage = getStage(BOOT_STAGES.APPLICATION, plugin);

    expect(applicationStage[0]).toHaveProperty('method');
    expect(typeof applicationStage[0].method).toBe('function');
    expect(applicationStage[0].method()).toBe('test-result');
  });

  it('should create stage name from class and method name', () => {
    class MyPlugin {
      @Stage(BOOT_STAGES.APPLICATION)
      myMethod() {
        return 'test';
      }
    }

    const plugin = new MyPlugin();
    const applicationStage = getStage(BOOT_STAGES.APPLICATION, plugin);

    expect(applicationStage[0]).toHaveProperty('name', 'MyPlugin:myMethod');
  });

  it('should handle multiple methods for the same stage', () => {
    class TestPlugin {
      @Stage(BOOT_STAGES.APPLICATION)
      firstMethod() {
        return 'first';
      }

      @Stage(BOOT_STAGES.APPLICATION)
      secondMethod() {
        return 'second';
      }
    }

    const plugin = new TestPlugin();
    const applicationStage = getStage(BOOT_STAGES.APPLICATION, plugin);

    expect(applicationStage).toHaveLength(2);
    expect(applicationStage[0].name).toBe('TestPlugin:secondMethod');
    expect(applicationStage[1].name).toBe('TestPlugin:firstMethod');
  });

  it('should handle different stages on different methods', () => {
    class TestPlugin {
      @Stage(BOOT_STAGES.APPLICATION)
      onApplication() {
        return 'app';
      }

      @Stage(BOOT_STAGES.BOOT_DEPENDENCIES)
      onBootDependencies() {
        return 'boot';
      }

      @Stage(BOOT_STAGES.START)
      onStart() {
        return 'start';
      }
    }

    const plugin = new TestPlugin();

    const applicationStage = getStage(BOOT_STAGES.APPLICATION, plugin);
    const bootDepsStage = getStage(BOOT_STAGES.BOOT_DEPENDENCIES, plugin);
    const startStage = getStage(BOOT_STAGES.START, plugin);

    expect(applicationStage).toHaveLength(1);
    expect(bootDepsStage).toHaveLength(1);
    expect(startStage).toHaveLength(1);
  });
});

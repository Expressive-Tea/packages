const classStorage: WeakMap<any, any> = new WeakMap();
const propertiesStorage: WeakMap<any, any> = new WeakMap();

export class StorageManager {
  static set(key: string, value: any, target: any, propertyKey?: string | symbol) {
    if (propertyKey) {
      const targetPropertiesStorage: WeakMap<any, any> = propertiesStorage.get(target);
      targetPropertiesStorage.set(propertyKey, value);
    } else {
      classStorage.set(target, value);
      propertiesStorage.set(target, new WeakMap());
    }
  }

  static get(key: string, target: any, propertyKey?: string | symbol) {
    if (!classStorage.has(target)) {
      return;
    }

    if (propertyKey) {
      if (!propertiesStorage.has(target)) { return; }

      const propertyStorage: WeakMap<any, any> = propertiesStorage.get(target);
      return propertyStorage.get(propertyKey);
    }

    return classStorage.get(target);
  }
}

/**
 * Get the provide constructor if target is an instance.
 * @param target
 * @returns {*}
 * @ignore
 */
export function getClass(target: any): any {
  return target.prototype ? target : target.constructor;
}

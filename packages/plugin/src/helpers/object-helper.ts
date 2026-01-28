/**
 * Object and stage management helpers
 * 
 * Provides utility functions for managing plugin lifecycle stages
 * and working with class constructors.
 * 
 * @packageDocumentation
 * @module helpers/object-helper
 * @since 2.0.0
 */

import { PLUGIN_STAGES_KEY } from '../constants';
import { StorageManager } from './storage-helper';

/**
 * Get the constructor from a class or instance
 * 
 * Returns the constructor function regardless of whether the input
 * is a class constructor or an instance of a class.
 * 
 * @param target - A class constructor or instance
 * @returns The class constructor
 * @since 2.0.0
 * 
 * @example
 * ```typescript
 * class MyPlugin {}
 * const instance = new MyPlugin();
 * 
 * getClass(MyPlugin);    // Returns MyPlugin
 * getClass(instance);    // Returns MyPlugin
 * ```
 */
export function getClass(target: any): any {
  return target.prototype ? target : target.constructor;
}

/**
 * Get all registered stages for a plugin
 * 
 * Retrieves the complete stage configuration for a plugin,
 * including all methods decorated with @Stage.
 * 
 * @param target - The plugin class or instance
 * @returns Object mapping stage names to arrays of stage items
 * @since 2.0.0
 * 
 * @example
 * ```typescript
 * const stages = getStages(myPlugin);
 * // Returns: { [BOOT_STAGES.APPLICATION]: [...], [BOOT_STAGES.START]: [...] }
 * ```
 */
export function getStages(target: any): any {
  return StorageManager.get(PLUGIN_STAGES_KEY, getClass(target)) || {};
}

/**
 * Get methods registered for a specific stage
 * 
 * Returns an array of methods that have been decorated with @Stage
 * for the specified boot stage. Creates an empty array if none exist.
 * 
 * @param stage - The boot stage to query
 * @param target - The plugin class or instance
 * @returns Array of stage items for the specified stage
 * @since 2.0.0
 * 
 * @example
 * ```typescript
 * const appMethods = getStage(BOOT_STAGES.APPLICATION, myPlugin);
 * ```
 */
export function getStage(stage: any, target: any): any {
  const stages = getStages(target);
  if (!stages[stage]) {
    stages[stage] = [];
  }

  return stages[stage];
}

/**
 * Set methods for a specific stage
 * 
 * Stores the methods that should be executed for a specific boot stage.
 * This is used internally by the @Stage decorator.
 * 
 * @param stage - The boot stage
 * @param value - Array of stage items to set
 * @param target - The plugin class or instance
 * @since 2.0.0
 * 
 * @example
 * ```typescript
 * setStage(BOOT_STAGES.APPLICATION, [{ method: fn, name: 'MyPlugin:setup' }], myPlugin);
 * ```
 */
export function setStage(stage: any, value: any, target: any): void {
  const stages = getStages(target);
  stages[stage] = value;
  StorageManager.set(PLUGIN_STAGES_KEY, stages, getClass(target));
}

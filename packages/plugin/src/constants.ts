/**
 * Plugin system constants
 * 
 * Defines boot stages and internal metadata keys used by the plugin system.
 * 
 * @packageDocumentation
 * @module constants
 * @since 2.0.0
 */

/**
 * Application boot stages enum
 * 
 * Defines the lifecycle stages during application bootstrap.
 * Plugins can register methods to execute at each stage using the @Stage decorator.
 * 
 * @enum {number}
 * @summary Boot lifecycle stages for plugin execution
 * @since 2.0.0
 * 
 * @example
 * ```typescript
 * import { Stage, BOOT_STAGES } from '@expressive-tea/plugin';
 * 
 * class MyPlugin extends Plugin {
 *   @Stage(BOOT_STAGES.BOOT_DEPENDENCIES)
 *   loadDependencies() {
 *     // Runs first - load required dependencies
 *   }
 * 
 *   @Stage(BOOT_STAGES.INITIALIZE_MIDDLEWARES)
 *   setupMiddleware() {
 *     // Configure middleware
 *   }
 * 
 *   @Stage(BOOT_STAGES.APPLICATION)
 *   configureApp() {
 *     // Main application configuration
 *   }
 * 
 *   @Stage(BOOT_STAGES.AFTER_APPLICATION_MIDDLEWARES)
 *   setupErrorHandlers() {
 *     // Error handlers and final middleware
 *   }
 * 
 *   @Stage(BOOT_STAGES.START)
 *   onServerStart() {
 *     // Runs when server starts listening
 *   }
 * }
 * ```
 */
export enum BOOT_STAGES {
  /**
   * First stage - load plugin dependencies and external resources
   */
  BOOT_DEPENDENCIES,

  /**
   * Second stage - initialize middleware before application setup
   */
  INITIALIZE_MIDDLEWARES,

  /**
   * Third stage - main application configuration (routes, controllers, etc.)
   */
  APPLICATION,

  /**
   * Fourth stage - configure middleware after application (error handlers, etc.)
   */
  AFTER_APPLICATION_MIDDLEWARES,

  /**
   * Final stage - executed when server starts listening
   */
  START
}

/**
 * Internal metadata key for storing plugin stages
 * 
 * Used by the StorageManager to store stage information for plugins.
 * 
 * @constant
 * @type {string}
 * @since 2.0.0
 */
export const PLUGIN_STAGES_KEY = 'expressive-tea:plugin:stages';

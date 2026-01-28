/**
 * Plugin base class
 * 
 * Provides the foundation for creating plugins in the Expressive Tea framework.
 * Plugins can register lifecycle stages, declare dependencies, and configure
 * themselves using the settings object.
 * 
 * @packageDocumentation
 * @module classes/Plugin
 * @since 2.0.0
 */

import { getStages, getClass } from '../helpers';
import { BOOT_STAGES } from '../constants';
import { ExpressiveTeaServerProps, ExpressiveTeaPluginProps, ExpressiveTeaPluginSettings } from '../interfaces';
import { findIndex, size, each } from '../libs/utilities';
import { DependencyNotFound } from '../exceptions';

/**
 * Base Plugin class for Expressive Tea
 * 
 * Abstract base class for creating plugins that integrate with the Expressive Tea
 * framework. Plugins can define lifecycle stages using decorators, declare dependencies
 * on other plugins, and receive configuration through settings.
 * 
 * @abstract
 * @class Plugin
 * @summary Base class for creating Expressive Tea plugins
 * @since 2.0.0
 * 
 * @example
 * ```typescript
 * import { Plugin, Stage, BOOT_STAGES } from '@expressive-tea/plugin';
 * 
 * class MyPlugin extends Plugin {
 *   constructor() {
 *     super({ apiKey: 'secret' });
 *     this.name = 'my-plugin';
 *     this.dependencies = ['cors-plugin'];
 *   }
 * 
 *   @Stage(BOOT_STAGES.APPLICATION)
 *   initialize() {
 *     console.log('Plugin initialized with settings:', this.settings);
 *   }
 * }
 * ```
 */
export abstract class Plugin {
  /**
   * Plugin configuration settings
   * @readonly
   * @type {ExpressiveTeaPluginSettings}
   * @memberof Plugin
   */
  readonly settings: ExpressiveTeaPluginSettings = {};

  /**
   * Plugin name identifier
   * @protected
   * @type {string}
   * @memberof Plugin
   */
  protected name: string = '';

  /**
   * Plugin execution priority (lower numbers execute first)
   * @protected
   * @type {number}
   * @default 999
   * @memberof Plugin
   */
  protected priority: number = 999;

  /**
   * Array of plugin names this plugin depends on
   * @protected
   * @type {string[]}
   * @memberof Plugin
   */
  protected dependencies: string[] = [];

  /**
   * Check if a dependency is registered
   * 
   * @private
   * @static
   * @param dependencyName - Name of the dependency to check
   * @param dependencies - Array of registered dependency names
   * @returns True if dependency is found, false otherwise
   * @memberof Plugin
   */
  private static isDependencyRegistered(dependencyName: string, dependencies: string[]): boolean {
    // tslint:disable-next-line:no-bitwise
    return !!~findIndex(dependencies, ['name', dependencyName]);
  }

  /**
   * Create a new plugin instance
   * 
   * @param settings - Configuration settings for the plugin
   * @memberof Plugin
   * @since 2.0.0
   * 
   * @example
   * ```typescript
   * constructor() {
   *   super({ apiKey: 'secret', enabled: true });
   * }
   * ```
   */
  constructor(settings: ExpressiveTeaPluginSettings = {}) {
    this.settings = Object.assign({}, settings);
  }

  /**
   * Get methods registered for a specific boot stage
   * 
   * Returns an array of methods decorated with the @Stage decorator
   * for the specified boot stage.
   * 
   * @param stage - The boot stage to query
   * @returns Array of stage items with method references
   * @memberof Plugin
   * @since 2.0.0
   * 
   * @example
   * ```typescript
   * const appStageMethods = plugin.getRegisteredStage(BOOT_STAGES.APPLICATION);
   * appStageMethods.forEach(item => item.method.call(plugin));
   * ```
   */
  getRegisteredStage(stage: BOOT_STAGES) {
    const stages = getStages(this);
    return stages[stage] || [];
  }

  /**
   * Register the plugin with the application
   * 
   * Validates that all dependencies are satisfied and adds this plugin
   * to the list of registered plugins. This method is called automatically
   * by the Expressive Tea framework during the boot process.
   * 
   * @param appSettings - Application settings
   * @param registeredPlugins - Array of already registered plugins
   * @returns Updated array of registered plugins including this one
   * @throws {DependencyNotFound} If a required dependency is not registered
   * @memberof Plugin
   * @since 2.0.0
   * 
   * @example
   * ```typescript
   * const plugins = [];
   * const updatedPlugins = myPlugin.register(appSettings, plugins);
   * ```
   */
  register(
    appSettings: ExpressiveTeaServerProps,
    registeredPlugins: ExpressiveTeaPluginProps[]
  ): ExpressiveTeaPluginProps[] {
    if (size(this.dependencies)) {
      each(this.dependencies, (dependency) => {
        if (
          !Plugin.isDependencyRegistered(
            dependency,
            registeredPlugins.map((d) => d.name)
          )
        ) {
          throw new DependencyNotFound(dependency);
        }
      });
    }
    registeredPlugins.push({
      name: this.name || getClass(this).name,
      priority: this.priority || 999
    });

    return registeredPlugins;
  }
}

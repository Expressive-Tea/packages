/**
 * @expressive-tea/plugin
 * 
 * Plugin architecture system for the Expressive Tea framework.
 * Provides a lifecycle-based plugin system with dependency management,
 * boot stages, and decorator-based configuration.
 * 
 * @packageDocumentation
 * @module @expressive-tea/plugin
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
 *     this.priority = 100;
 *     this.dependencies = ['cors-plugin'];
 *   }
 * 
 *   @Stage(BOOT_STAGES.APPLICATION)
 *   setup() {
 *     console.log('Plugin initialized!');
 *   }
 * }
 * ```
 */

import 'reflect-metadata';

export * from './classes/Plugin';
export * from './decorators';
export * from './constants';
export * from './interfaces';
export * from './exceptions';

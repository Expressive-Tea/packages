/**
 * Plugin system constants
 * 
 * Defines boot stages and internal metadata keys used by the plugin system.
 * 
 * @packageDocumentation
 * @module constants
 * @since 2.0.0
 */

// Re-export BOOT_STAGES from commons to ensure type compatibility
export { BOOT_STAGES } from '@expressive-tea/commons';

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

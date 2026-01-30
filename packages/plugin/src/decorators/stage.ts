/**
 * Stage decorator for plugin lifecycle methods
 *
 * Provides the @Stage decorator for marking plugin methods to execute
 * at specific points in the application boot lifecycle.
 *
 * @packageDocumentation
 * @module decorators/stage
 * @since 2.0.0
 */

import { BOOT_STAGES } from '../constants';
import { getClass, getStage, setStage } from '../helpers/object-helper';

/**
 * Stage method decorator
 *
 * Marks a plugin method to be executed at a specific boot stage.
 * Methods decorated with @Stage will be automatically invoked during
 * the corresponding lifecycle phase.
 *
 * @decorator {MethodDecorator} Stage
 * @param stage - The boot stage when this method should execute
 * @param required - Whether this stage is required (default: false)
 * @returns Method decorator function
 * @summary Register a plugin method for a specific boot stage
 * @since 2.0.0
 *
 * @example
 * ```typescript
 * import { Plugin, Stage, BOOT_STAGES } from '@expressive-tea/plugin';
 *
 * class MyPlugin extends Plugin {
 *   @Stage(BOOT_STAGES.BOOT_DEPENDENCIES)
 *   loadDependencies() {
 *     // This runs during the BOOT_DEPENDENCIES stage
 *     console.log('Loading dependencies...');
 *   }
 *
 *   @Stage(BOOT_STAGES.APPLICATION, true)
 *   setupApp() {
 *     // This runs during APPLICATION stage and is marked as required
 *     console.log('Setting up application...');
 *   }
 *
 *   @Stage(BOOT_STAGES.START)
 *   onStart() {
 *     // This runs when the server starts
 *     console.log('Server started!');
 *   }
 * }
 * ```
 */
export function Stage(
  stage: BOOT_STAGES,
  required: boolean = false
): (target: any, propertyKey: any, descriptor: any) => void {
  return (target: any, propertyKey: any, descriptor: any) => {
    const selectedStage = getStage(stage, target);
    const originalMethod = descriptor.value;
    
    const item = {
      method: originalMethod,
      propertyKey, // Store the property key to allow late binding
      name: [getClass(target).name, propertyKey].join(':'),
      required
    };

    selectedStage.unshift(item);
    setStage(stage, selectedStage, target);
  };
}

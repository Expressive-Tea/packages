/**
 * @expressive-tea/metadata
 * 
 * Powerful metadata management utilities for TypeScript decorators.
 * Framework-agnostic package for storing and retrieving metadata on classes,
 * methods, properties, and parameters using reflect-metadata.
 * 
 * @packageDocumentation
 * @module @expressive-tea/metadata
 * @since 2.0.0
 * 
 * @example
 * ```typescript
 * import { Metadata, SetMetadata, Meta } from '@expressive-tea/metadata';
 * 
 * // Use decorator utilities
 * @Meta({ controller: true, basePath: '/api' })
 * class ApiController {
 *   @SetMetadata('route:path', '/users')
 *   getUsers() {}
 * }
 * 
 * // Or use Metadata class directly
 * const basePath = Metadata.get('basePath', ApiController);
 * ```
 */

import 'reflect-metadata';

// Core Metadata class
export { default as Metadata } from './classes/Metadata';

// Decorator utilities
export * from './decorators';

// Helper utilities
export * from './helpers/object-helper';

// Types (if any in the future)
export * from './types';

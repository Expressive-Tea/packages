/**
 * @expressive-tea/commons
 * 
 * Common utilities and types for the Expressive Tea framework.
 * Provides shared functionality used across packages including metadata
 * management, type definitions, and helper utilities.
 * 
 * @packageDocumentation
 * @module @expressive-tea/commons
 * @since 2.0.0
 */

import 'reflect-metadata';

// Re-export from @expressive-tea/metadata for backward compatibility
export { 
  Metadata, 
  SetMetadata, 
  Meta, 
  InheritMetadata, 
  CacheInMetadata, 
  Deprecated,
  getClass 
} from '@expressive-tea/metadata';

export * from './interfaces';
export * from './types';

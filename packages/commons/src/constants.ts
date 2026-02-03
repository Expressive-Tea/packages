/**
 * Expressive Tea Framework Constants
 * 
 * Core constants, enums, and metadata keys used throughout the framework.
 * These values should not be modified as they are used internally for
 * metadata storage and application lifecycle management.
 * 
 * @packageDocumentation
 * @module constants
 * @since 2.0.0
 */

/**
 * Application boot stages enum
 * 
 * Defines the lifecycle stages during application bootstrap.
 * Plugins and modules can hook into these stages to execute code
 * at specific points in the application lifecycle.
 * 
 * @enum {number}
 * @summary Boot lifecycle stages
 * @since 2.0.0
 * 
 * @example
 * ```typescript
 * import { BOOT_STAGES } from '@expressive-tea/commons';
 * 
 * // Hook into application stage
 * @Stage(BOOT_STAGES.APPLICATION)
 * configureApp() {
 *   // Configure application
 * }
 * ```
 */
export enum BOOT_STAGES {
  /** Load plugin dependencies and external resources */
  BOOT_DEPENDENCIES,
  /** Initialize middleware before application setup */
  INITIALIZE_MIDDLEWARES,
  /** Main application configuration (routes, controllers) */
  APPLICATION,
  /** Configure middleware after application (error handlers) */
  AFTER_APPLICATION_MIDDLEWARES,
  /** Executed when server starts listening */
  START,
  /** Executed when HTTP server is created */
  ON_HTTP_CREATION
}

/**
 * Boot stage execution order
 * 
 * Defines the order in which boot stages are executed during startup.
 * This determines the initialization sequence of the application.
 * 
 * @constant
 * @type {BOOT_STAGES[]}
 * @since 2.0.0
 */
export const BOOT_ORDER = [
  BOOT_STAGES.BOOT_DEPENDENCIES,
  BOOT_STAGES.INITIALIZE_MIDDLEWARES,
  BOOT_STAGES.APPLICATION
];

/**
 * Complete list of boot stages
 * 
 * All available boot stages in execution order.
 * 
 * @constant
 * @type {BOOT_STAGES[]}
 * @since 2.0.0
 */
export const BOOT_STAGES_LIST = [
  BOOT_STAGES.BOOT_DEPENDENCIES,
  BOOT_STAGES.INITIALIZE_MIDDLEWARES,
  BOOT_STAGES.APPLICATION,
  BOOT_STAGES.AFTER_APPLICATION_MIDDLEWARES,
  BOOT_STAGES.START
];

/**
 * Initial stages configuration
 * 
 * Default empty configuration for all boot stages.
 * Used to initialize the stages metadata.
 * 
 * @constant
 * @since 2.0.0
 */
export const STAGES_INIT = {
  [BOOT_STAGES.BOOT_DEPENDENCIES]: [],
  [BOOT_STAGES.INITIALIZE_MIDDLEWARES]: [],
  [BOOT_STAGES.APPLICATION]: [],
  [BOOT_STAGES.AFTER_APPLICATION_MIDDLEWARES]: [],
  [BOOT_STAGES.START]: []
};

/**
 * Express.js application settings directives
 * 
 * List of valid Express.js application settings that can be configured.
 * 
 * @constant
 * @type {string[]}
 * @since 2.0.0
 */
export const EXPRESS_DIRECTIVES = [
  'case sensitive routing',
  'env',
  'etag',
  'jsonp callback name',
  'json escape',
  'json replacer',
  'json spaces',
  'query parser',
  'strict routing',
  'subdomain offset',
  'trust proxy',
  'views',
  'view cache',
  'view engine',
  'x-powered-by'
];

/**
 * Metadata storage keys
 * 
 * Internal keys used for storing metadata on classes and methods.
 * These keys are used with the Metadata class to store and retrieve
 * framework-specific information.
 * 
 * @since 2.0.0
 */

/** Key for boot stage settings metadata */
export const BOOT_STAGES_KEY = 'boot:stage-settings';

/** Key for route handlers metadata */
export const ROUTER_HANDLERS_KEY = 'app:routes:handlers';

/** Key for route middlewares metadata */
export const ROUTER_MIDDLEWARES_KEY = 'app:routes:middlewares';

/** Key for route proxies metadata */
export const ROUTER_PROXIES_KEY = 'app:routes:proxies';

/** Key for proxy settings metadata */
export const PROXY_SETTING_KEY = 'app:proxy:settings';

/** Key for registered models metadata */
export const REGISTERED_MODEL_KEY = 'app:models:registered';

/** Key for registered modules metadata */
export const REGISTERED_MODULE_KEY = 'app:modules:registered';

/** Key for plugins metadata */
export const PLUGINS_KEY = 'boot:app-plugins';

/** Key for static file settings metadata */
export const REGISTERED_STATIC_KEY = 'app:statics';

/** Key for Express directives metadata */
export const REGISTERED_DIRECTIVES_KEY = 'app:directives';

/** Key for route arguments metadata */
export const ARGUMENTS_KEY = 'app:routes:arguments';

/** Key for route annotations metadata */
export const ROUTER_ANNOTATIONS_KEY = 'app:routes:annotations';

/** Key for Teapot gateway assignment */
export const ASSIGN_TEAPOT_KEY = 'app:gateway:teapot';

/** Key for Teacup gateway assignment */
export const ASSIGN_TEACUP_KEY = 'app:gateway:teacup';

/**
 * Argument type symbols
 * 
 * Symbols used to identify different types of arguments in route handlers.
 * These are used by parameter decorators to inject request data.
 * 
 * @constant
 * @since 2.0.0
 * 
 * @example
 * ```typescript
 * import { ARGUMENT_TYPES } from '@expressive-tea/commons';
 * 
 * // Used internally by decorators like @Req(), @Res(), @Body(), etc.
 * ```
 */
export const ARGUMENT_TYPES = {
  /** Express Request object */
  REQUEST: Symbol('REQUEST'),
  /** Express Response object */
  RESPONSE: Symbol('RESPONSE'),
  /** Express Next function */
  NEXT: Symbol('NEXT'),
  /** Request query parameters */
  QUERY: Symbol('QUERY'),
  /** Request body */
  BODY: Symbol('BODY'),
  /** URL route parameters */
  GET_PARAM: Symbol('GET_PARAM')
};

/**
 * Proxy method names enum
 * 
 * Available proxy configuration methods for the @Proxy decorator.
 * 
 * @enum {string}
 * @since 2.0.0
 */
export enum PROXY_METHODS {
  HOST = 'host',
  PROXY_REQ_PATH_RESOLVER = 'proxyReqPathResolver',
  FILTER = 'filter',
  USER_RES_DECORATOR = 'userResDecorator',
  USER_RES_HEADER_DECORATOR = 'userResHeaderDecorator',
  SKIP_TO_NEXT_HANDLER_FILTER = 'skipToNextHandlerFilter',
  PROXY_ERROR_HANDLER = 'proxyErrorHandler',
  PROXY_REQ_OPT_DECORATOR = 'proxyReqOptDecorator',
  PROXY_REQ_BODY_DECORATOR = 'proxyReqBodyDecorator'
}

/**
 * Proxy property names enum
 * 
 * Available proxy configuration properties.
 * 
 * @enum {string}
 * @since 2.0.0
 */
export enum PROXY_PROPERTIES {
  LIMIT = 'limit',
  MEMOIZE_HOST = 'memoizeHost',
  HTTPS = 'https',
  PRESERVE_HOST_HDR = 'preserveHostHdr',
  PARSE_REQ_BODY = 'parseReqBody',
  REQ_AS_BUFFER = 'reqAsBuffer',
  REQ_BODY_ENCODING = 'reqBodyEncoding',
  TIMEOUT = 'timeout'
}

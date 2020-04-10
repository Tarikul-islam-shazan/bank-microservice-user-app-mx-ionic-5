import { GlobalErrorHandler } from './error-handler';
import { AppPlatform } from './app-platform';

export const GLOBAL_ERROR_HANDLER: any[] = [GlobalErrorHandler];
export const APP_PLATFORM: any[] = [AppPlatform];

export * from './error-handler';
export * from './app-platform';
export * from './signup-validators';
export * from './common-validators';

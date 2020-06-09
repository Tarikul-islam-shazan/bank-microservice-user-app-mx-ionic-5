import { TokenInterceptor } from './token-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { LoggingInterceptor } from './logging-interceptor';
import { LoaderInterceptor } from './loader-interceptor';
import { RequestHeadersInterceptor } from './request-headers.interceptor';

export const MEED_HTTP_INTERCETPORS: any[] = [
  TokenInterceptor,
  ErrorInterceptor,
  LoggingInterceptor,
  LoaderInterceptor,
  RequestHeadersInterceptor
];

export * from './error-interceptor';
export * from './token-interceptor';
export * from './logging-interceptor';
export * from './loader-interceptor';
export * from './request-headers.interceptor';

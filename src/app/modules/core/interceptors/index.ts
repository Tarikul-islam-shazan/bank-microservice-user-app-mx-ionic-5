import { TokenInterceptor } from './token-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { LoggingInterceptor } from './logging-interceptor';
import { LoaderInterceptor } from './loader-interceptor';
import { AppVersionInterceptor } from './app-version.interceptor';
import { CorrelationIdInterceptor } from './correlation-id.interceptor';

export const MEED_HTTP_INTERCETPORS: any[] = [
  TokenInterceptor,
  ErrorInterceptor,
  LoggingInterceptor,
  LoaderInterceptor,
  AppVersionInterceptor,
  CorrelationIdInterceptor
];

export * from './error-interceptor';
export * from './token-interceptor';
export * from './logging-interceptor';
export * from './loader-interceptor';
export * from './app-version.interceptor';
export * from './correlation-id.interceptor';

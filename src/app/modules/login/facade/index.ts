import { LoginFacade } from './login-facade';
import { LoginState } from './login-state';

export * from './login-facade';

export const FACADE_SERVICE: any[] = [LoginFacade, LoginState];

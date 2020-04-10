import { SignupEmailFacade } from './facade';
import { SignupEmailState } from './state';

export const FACADE_SERVICE: any[] = [SignupEmailFacade, SignupEmailState];

export * from './facade';
export * from './state';

import { OtpVerificationModalFacade } from './otp-verification-modal.facade';
export const FACADE_SERVICE = [OtpVerificationModalFacade];
export * from './otp-verification-modal.facade';

export enum OtpResponseType {
  invalid = '704',
  tooManyAttempts = '705'
}

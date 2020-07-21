export interface MeedErrorResponse {
  code: string;
  message?: string;
}

export interface UIError {
  name: string;
  label: string;
  deployment: string;
  user: string;
  time: number;
  url: string;
  message: string;
  stackTrace: any;
}

// converted the existing error code to enum
export enum ErrorCode {
  SessionTimeout = '303',
  LockedAccount = '401',
  OTPrequired = '403',
  SamePassword = '404',
  AccountRecoveryInformationDoesNotMatch = '410',
  TexPayerIdAlreadyAssigned = '610',
  InviteeMemeber = '901',
  FaildInvitation = '902',
  InvalidInviteeEmail = '903',
  InvalidEmailAddress = '1100',
  InvalidEmailAddressAtVerificationCode = '1101',
  NewVerificationCodeRequired = '1102',
  InvalidEmailVarificationCode = '1103',
  VerificationCodeExpired = '1104',
  VerificationCodeAlreadyUsed = '1105',
  RequestParameterInvalid = '1201',
  ServiceUnavilableOnCountry = '1202',
  UsernameOrPasswordIncorrect = '1203',
  LanguageUnsupported = '1204',
  InvalidInviterData = '1205',
  AuthenticationTokenMissing = '1501',
  AuthenticationTokenInvalidOrExpired = '1502',
  UnableJumioData = '2001',
  FailedJumioVerification = '2002',
  PendingJumioVerification = '2003',
  InternalError = '5000',
  UnknownErrorFromBank = '5001',
  NetworkNotAvailable = '0'
}

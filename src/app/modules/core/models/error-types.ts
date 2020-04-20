export interface MeedErrorResponse {
  code: string;
  message?: string;
}

export interface UIError {
  name: string;
  appId: string;
  releaseDate: string;
  label: string;
  deployment: string;
  user: string;
  time: number;
  id: string;
  url: string;
  message: string;
  stack: any;
}

// converted the existing error code to enum
export enum ErrorCode {
  SessionTimeout = '303',
  LockedAccount = '401',
  OTPrequired = '403',
  SamePassword = '404',
  UserNameAlreadyExists = '602',
  AlreadyExists = '603',
  NotEligible = '604',
  Deceased = '605',
  NotAcceptable = '606',
  NotFound = '607',
  Denied = '608',
  CreditReportFailure = '609',
  IdaTransactionFailed = '610',
  NotEligibleForQuestion = '611',
  IdentityVerificationFailed = '612',
  InviteeMemeber = '901',
  FaildInvitation = '902',
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
  AuthenticationTokenInvalidOrExpire = '1502',
  UnableJumioData = '2001',
  FailedJumioVerification = '2002',
  PendingJumioVerification = '2003',
  InternalError = '5000',
  UnknownErrorFromBank = '5001',
  NetworkNotAvailable = '0'
}

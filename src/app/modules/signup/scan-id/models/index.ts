export interface IJumioSuccessResponse {
  selectedCountry?: string;
  selectedDocumentType?: DocumentType;
  idNumber?: string;
  expiryDate?: Date;
  issuingCountry?: string;
  lastName?: string;
  firstName?: string;
  dob?: Date;
  gender?: string;
  originatingCountry?: string;
  scanReference: string;
  extractionMethod?: string;
  status: JumioResponseType;
  jumioPlatform: JumioPlatformType;
}
export interface IJumioErrorResponse {
  scanReference?: string;
  errorMessage?: string;
  errorCode?: string;
  status?: JumioResponseType;
}
export enum JumioResponseType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
export enum JumioPlatformType {
  WEB = 'WEB',
  NATIVE = 'NATIVE'
}
export enum DocumentType {
  DRIVER_LICENSE = 'DRIVER_LICENSE',
  DRIVING_LICENSE = 'DRIVING_LICENSE',
  PASSPORT = 'PASSPORT',
  IDENTITY_CARD = 'IDENTITY_CARD'
}

export interface IJumioWebInitiate {
  customerInternalReference: string;
  userReference: string;
  callbackUrl: string;
}
export interface IJumioWebInitiateResponse {
  timestamp: string;
  transactionReference: string;
  redirectUrl: string;
}

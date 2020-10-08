import { IAccount, AccountLevel } from './account';

import { IStaticData } from './static-data';

export interface IRegisteredMember extends IMember {
  accountSummary: IAccount[];
  meedRewardsEarned: number;
  configurationData?: IStaticData[];
  preferences: IPreference[];
}
export type IPreference = {
  [key in PreferenceKey]?: boolean;
};

export enum PreferenceKey {
  DirectDepositPopupShown = 'DirectDepositPopupShown',
  MeedExtraIntroPopupShown = 'MeedExtraIntroPopupShown'
}

export interface IMember {
  _id?: any;
  email?: string;
  priorEmails?: [string];
  inviter?: IMember['_id'] | string | null;
  inviterCode?: string;
  inviterEmail?: string;
  corporateTncAccepted?: boolean;
  nickname?: string;
  applicationStatus?: ApplicationStatus;
  applicationProgress?: ApplicationProgress;
  accountStatus?: MemberAccountStatus;
  accountLevel?: AccountLevel;
  memberType?: MemberType;
  fundingType?: FundingType;
  bank?: string | any;
  country?: string;
  username?: string;
  memberStatusHistory?: [string];
  customerId?: string;
  language?: string;
  createdDate?: string;
  updatedDate?: string;
  meedExtraIntroPopupShown?: boolean;
}

export enum FundingType {
  SPEI = 'spei',
  OXXO = 'oxxo'
}

/**
 * Issue:  Fix/GMA-4637
 * Details:  added EmailVerified, ProductOnboarded and removed security SecurityQuestionsViewed and SecurityQuestionsAnswered
 * keeping ApplicationProgress same with the backend
 * Date: March 03, 2020
 * Developer: Raihan <raihanuzzaman@bs-23.net>
 */

export enum ApplicationProgress {
  EmailRegistered = 'email-registered',
  InviterChosen = 'inviter-chosen',
  CountrySelected = 'country-selected',
  BankIdentified = 'bank-identified',
  EmailVerified = 'email-verified',
  CredentialsCreated = 'credentials-created',
  JumioScanStarted = 'jumio-scan-started',
  JumioScanFailed = 'jumio-scan-failed',
  JumioScanSucceeded = 'jumio-scan-succeeded',
  JumioVerifyApproved = 'jumio-verify-approved',
  JumioVerifyDenied = 'jumio-verify-denied',
  GeneralInfoCompleted = 'general-info-completed',
  AddressInfoCompleted = 'address-info-completed',
  BeneficiaryInfoCompleted = 'beneficiary-info-completed',
  AccountLevelSelected = 'account-level-selected',
  PersonalInfoCompleted = 'personal-info-completed',
  FundSourceInfoCompleted = 'fund-source-info-completed',
  GovDisclosureCompleted = 'gov-disclosure-completed',
  IdentityConfirmationCompleted = 'identify-confirmation-completed',
  BankApplicationSubmitted = 'bank-application-submitted',
  IdentityQuestionsViewed = 'identity-questions-viewed',
  IdentityQuestionsAnswered = 'identity-questions-answered',
  ProductOnboarded = 'product-onboarded',
  TermsAndConditionAccepted = 'tnc-accepted',
  AccountFunded = 'account-funded',
  DirectDeposit = 'direct-deposit-performed',
  RegistrationCompleted = 'registration-completed'
}

export enum ApplicationStatus {
  Started = 'started',
  Completed = 'completed',
  Denied = 'denied'
}

export enum MemberAccountStatus {
  Opened = 'opened',
  Inactive = 'inactive',
  Closed = 'closed',
  Pending = 'pending'
}

export enum MemberType {
  Individual = 'individual',
  Corporate = 'corporate'
}

export interface ICustomer {
  customerId?: string;
  firstName?: string;
  secondName?: string;
  dateOfBirth?: string;
  paternalLastName?: string;
  maternalLastName?: string;
  nickname?: string;
  curp?: string;
  email?: string;
  salutation?: string;
  middleName?: string;
  oldName?: string;
  lastName?: string;
  addresses?: IAddress[];
  city?: string;
  state?: string;
  country?: string;
  stateName?: string;
  zipCode?: number;
  mobilePhone?: number;
  workPhone?: number;
  otpID?: string;
  otpToken?: number;
  reason?: string;
  requiredDocument?: string;
}

export interface IOtp {
  otpId?: string;
  otpToken?: string;
}

export interface IBillPayee {
  biller?: IBiller;
  accountNumber?: string;
  phoneNumber?: string;
  _id?: string;
  referenceId?: string;
}

export enum BillerCategory {
  Utility = 'Utility',
  Topup = 'Topup',
  Giftcard = 'Giftcard'
}

export interface IBiller {
  category?: BillerCategory;
  id?: number;
  type?: string;
  name?: string;
  billerType?: string;
  billType?: string;
  country?: string;
  currency?: string;
  requiresNameOnAccount?: boolean;
  hoursToFulfill?: number;
  accountNumberDigits?: string;
  mask?: string;
  canCheckBalance?: boolean;
  supportsPartialPayments?: boolean;
  hasXdata?: boolean;
  availableTopupAmounts?: string[];
  topupCommission?: number;
  availableGiftCardAmounts?: string[];
  giftCardCommission?: number;
}
export enum PaymentFrequency {
  Once = 'Once',
  Monthly = 'Monthly'
}
export interface IBillPayment {
  paymentId?: string;
  payeeId?: string;
  amount?: number;
  category?: string;
  accountNumber?: string;
  phoneNumber?: string;
  currency?: string;
  executionDate?: string;
  frequency?: PaymentFrequency;
  recurringPaymentDate?: string;
  email?: string;
}
export enum BillPayProvider {
  IPAY = 'IPAY',
  Q2 = 'Q2'
}

export interface IGeneralInfo {
  firstName: string;
  secondName?: string;
  dateOfBirth: string;
  paternalLastName: string;
  maternalLastName?: string;
  curp: string;
  mobileNumber: string;
  email: string;
}

export interface IAddress {
  addressType?: string;
  propertyType?: string;
  street?: string;
  outdoorNumber?: string;
  interiorNumber?: string;
  postCode?: string;
  state?: string;
  municipality?: string;
  city?: string;
  suburb?: string;
  dateOfResidence?: string;
}

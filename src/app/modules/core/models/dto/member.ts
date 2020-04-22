import { IAccount, AccountLevel } from './account';

import { IStaticData } from './static-data';

export interface IRegisteredMember extends IMember {
  accountSummary: IAccount[];
  meedRewardsEarned: number;
  configurationData?: IStaticData[];
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
  bank?: string | any;
  country?: string;
  username?: string;
  memberStatusHistory?: [string];
  customerId?: string;
  language?: string;
  createdDate?: string;
  updatedDate?: string;
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
  IdentityQuestionsViewed = 'identity-questions-viewed',
  IdentityQuestionsAnswered = 'identity-questions-answered',
  BankApplicationSubmitted = 'bank-application-submitted',
  ProductOnboarded = 'product-onboarded',
  TermsAndConditionAccepted = 'tnc-accepted',
  AccountFunded = 'account-funded',
  DirectDeposit = 'direct-deposit-performed',
  RegistrationCompleted = 'registration-completed'
}

export enum ApplicationStatus {
  Started = 'application-started',
  Completed = 'application-completed',
  OnHold = 'application-onhold',
  Denied = 'application-denied'
}

export enum MemberAccountStatus {
  Opened = 'account-opened',
  Closed = 'account-closed',
  InProgress = 'account-in-progress'
}

export enum MemberType {
  Individual = 'individual',
  Corporate = 'corporate'
}

export interface ICustomer {
  salutation?: string;
  firstName?: string;
  middleName?: string;
  nickname?: string;
  oldName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
  address?: string;
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

export enum BillPayeeType {
  Individual = 'Individual',
  Company = 'Company'
}
export enum BillPaymentType {
  Electronic = 'Electronic',
  Check = 'Check'
}

export enum BillPaymentDeliveryInterval {
  Electronic = '1',
  Check = '5'
}

export interface IBillPayee extends IBillPayment {
  payeeId?: string;
  fullName?: string;
  nickName?: string;
  phone?: string;
  type?: BillPayeeType;
  street?: string;
  postCode?: string;
  city?: string;
  state?: string;
  accountNumber?: string;
  paymentMethodType?: BillPaymentType;
  firstAvailableProcessDate?: string;
}
export enum PaymentFrequency {
  Once = 'Once',
  Monthly = 'Monthly'
}
export interface IBillPayment {
  paymentId?: string;
  payeeId?: string;
  amount?: number;
  currency?: string;
  executionDate?: string;
  frequency?: PaymentFrequency;
  recurringPaymentDate?: string;
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

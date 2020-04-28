import { AccountType } from './index';
import { IAccount } from './account';

export interface SecurityQuestion {
  question: string;
  id?: string;
  order: number;
  answer?: string;
}

export interface BankApplication {
  memberApplication: IMemberApplication;
  scannedIdData: IScannedIdData;
}

export interface IScannedIdData {
  reference?: string;
  extractionMethod?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: string;
  addressLine?: string;
  postCode?: string;
  subdivision?: string;
  country?: string;
  identificationType?: IdentityType;
  idNumber?: string;
  issuer?: string;
  issuingDate?: string;
  expiryDate?: string;
  issuingCountry?: string;
  city?: string;
}

export interface IMemberApplication {
  email?: string;
  prefix?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dateOfBirth?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  mobilePhone?: string;
  workPhone?: string;
  zipCode?: string;
  state?: string;
  identityType?: IdentityType;
  identityNumber?: string;
  socialSecurityNo?: string;
  country?: string;
  occupation?: Occupations;
  isRelatedToArmedForces?: string;
  armedForcesMemberFirstName?: string;
  armedForcesMemberLastName?: string;
  armedForcesSocialSecurityPin?: string;
  armedForcesDob?: string;
  sourceOfIncome?: SourceOfIncomes;
  monthlyWithdrawal?: MonthlyTransactionRange;
  monthlyDeposit?: MonthlyTransactionRange;
  monthlyIncome?: string;
  workPhoneExtension?: string;
}

export interface ApplyForBankResponse {
  customerId?: string;
  questions?: IdentityQuestion[];
}
export interface IdentityQuestion {
  id: string;
  question: string;
  availableAnswers: AvailableAnswer[];
}

export interface AvailableAnswer {
  answer: string;
  id: string;
}
export interface IdentityAnswer {
  questionId: string;
  answerId: string;
}

export interface TncResponse {
  processId: string;
  showCorporateTnc: boolean;
  termsAndConditions: TncDocument[];
}

export interface TncDocument {
  title: string;
  documents: Document[];
}

interface Document {
  title: string;
  pdf: string;
}

export interface AccountId {
  accountNumber: string;
  accountType: AccountType;
}

export interface ProductOnboardedResponse {
  accounts: IAccount[];
}

export enum IdentityType {
  DrivingLicence = 'DrivingLicence',
  Passport = 'Passport',
  MilitaryId = 'MilitaryId',
  StateId = 'StateId'
}

export enum MonthlyTransactionRange {
  RANGE_0_1T = '0-1T',
  RANGE_1T_5T = '1T-5T',
  RANGE_5T_15T = '5T-15T',
  RANGE_GT_15T = 'GT-15T'
}

export enum Occupations {
  ManagementBusinessFinancial = 'ManagementBusinessFinancial',
  ComputerMathematical = 'ComputerMathematical',
  ArchitectureEngineering = 'ArchitectureEngineering',
  Science = 'Science',
  Legal = 'Legal',
  Education = 'Education',
  Arts = 'Arts',
  HealthcarePractitioners = 'HealthcarePractitioners',
  HealthcareSupport = 'HealthcareSupport',
  ProtectiveService = 'ProtectiveService',
  FoodPrep = 'FoodPrep',
  BuildingCleaningMaintenance = 'BuildingCleaningMaintenance',
  PersonalCare = 'PersonalCare',
  Sales = 'Sales',
  Office = 'Office',
  FarmingFishingForestry = 'FarmingFishingForestry',
  ConstructionExtraction = 'ConstructionExtraction',
  InstallationMaintenanceRepair = 'InstallationMaintenanceRepair',
  Production = 'Production',
  Transportation = 'Transportation',
  Military = 'Military',
  Fire = 'Fire',
  Law = 'Law',
  Homemaker = 'Homemaker',
  Student = 'Student',
  PrivateInvestor = 'PrivateInvestor',
  RealEstate = 'RealEstate',
  Religious = 'Religious',
  Retired = 'Retired',
  Unemployed = 'Unemployed'
}

export enum SourceOfIncomes {
  SalaryWages = 'SalaryWages',
  Inheritance = 'Inheritance',
  PropertyCompanySale = 'PropertyCompanySale',
  Investments = 'Investments',
  DivorceSettlement = 'DivorceSettlement',
  Other = 'Other'
}
export interface ICountry {
  _id?: any;
  countryName?: string;
  countryAbv?: string;
  unitOfMeasure?: string;
}

export interface IStates {
  stateName: string;
  stateAbv: string;
}

export interface SecurityQuestions {
  questions: SecurityQuestion[];
}

export interface RegistrationFee extends AccountId {
  amount: number;
}

export enum RegistrationFeePaymentType {
  ACH = 'ACH',
  ECHECK = 'ECHECK',
  CREDITCARD = 'CREDITCARD',
  DEBITCARD = 'DEBITCARD'
}

export interface RegistrationFeeRequest {
  totalAmount: number;
  deposits: RegistrationFee[];
  paymentMethod: string;
  paymentTrackingId: string;
  currency: string;
}

export interface FundAccountResponse {
  paymentTrackingID: string;
}

export interface DepositFund {
  email: string;
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  accountNumber: string;
  bankRoutingNumber: string;
  businessName: string;
}

export interface ISignUpDirectDepositAccounts {
  registrationFeePaymentType?: string;
  accounts?: IAccount[];
  memberApplication?: IMemberApplication;
  routingNumber?: string;
  bankAccountNumber?: string;
  registrationFeeRequest?: RegistrationFeeRequest;
}

export interface IAddressInfo {
  addressType: string;
  propertyType: string;
  street: string;
  outdoorNumber: string;
  interiorNumber: string;
  postCode: string;
  state: string;
  stateName?: string;
  municipality: string;
  municipalityName?: string;
  city: string;
  cityName?: string;
  suburb: string;
  suburbName?: string;
  dateOfResidence: string;
}

export interface IAccountLevel {
  _id: any;
  email: string;
  username: string;
  nickname: string;
  applicationStatus: string;
  applicationProgress: string;
  accountStatus: string;
  country: string;
  language: string;
  inviter: string;
  bank: string;
  identifier: string;
  createdDate: string;
  updatedDate: string;
  customerId: string;
  accountLevel: string;
}
// interface for beneficiary
export interface IBeneficiaryInfo {
  firstName: string;
  secondName?: string;
  dateOfBirth: string;
  paternalLastName: string;
  maternalLastName?: string;
  relationship: string;
}
export interface IPersonalInfo {
  countryOfBirth: string;
  nationality: string;
  placeOfBirth: string;
  sex: string;
  maritalStatus: string;
  highestLevelOfEducation: string;
  profession: string;
  occupation: string;
  economicActivity: string;
  banxicoActivity: string;
}
export interface IGovtPositionInfo {
  position: string;
  association: string;
}
export interface IRelativeGovtPositionInfo {
  firstName: string;
  secondName?: string;
  paternalLastName: string;
  maternalLastName?: string;
  position: string;
  homeAddress: string;
  phone: string;
  participation: string;
}

export interface IGovtDisclosureApplication {
  holdGovPosition?: boolean;
  positionInfo?: IGovtPositionInfo;
  relativeHoldGovPosition?: boolean;
  relativeInfo?: IRelativeGovtPositionInfo;
}

export interface IGovtDisclosureResponse {
  _id: string;
  email: string;
  username: string;
  nickname: string;
  applicationStatus: string;
  applicationProgress: string;
  accountStatus: string;
  country: string;
  language: string;
  inviter: string;
  bank: string;
  identifier: string;
  createdDate: string;
  updatedDate: string;
  customerId: string;
  accountLevel: string;
}

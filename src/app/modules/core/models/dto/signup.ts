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
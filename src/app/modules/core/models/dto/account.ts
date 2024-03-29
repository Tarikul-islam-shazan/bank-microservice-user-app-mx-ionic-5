export interface ITransaction {
  transactionType: string;
  amount: number;
  notes: string;
  dateTime: string;
  referenceNumber: string;
  fromAccount?: string;
  toAccount?: string;
  status: TransactionStatus;
  country: string;
  city: string;
  state: string;
}

enum TransactionStatus {
  Pending,
  Booked
}

export interface IAccount {
  accountId?: string;
  accountNickname?: string;
  status?: BankAccountStatus;
  accountLock?: AccountLock;
  accountNumber: string;
  accountType: AccountType;
  balanceOwed?: number;
  currentBalance?: number;
  holdBalance?: number;
  availableBalance?: number;
  minimumDue?: number;
  routingNumber?: string;
  isHold?: boolean;
  interestEarned?: number;
  creditLimitExceeded?: boolean;
  minimumPaymentDue?: number;
  paymentDueDate?: string;
}

export enum AccountType {
  DDA = 'DDA',
  SSA = 'SSA',
  LOC = 'LOC'
}

export enum BankAccountStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  NotFunded = 'NOT-FUNDED'
}

export enum AccountLock {
  DeathOfAccountHolder,
  ServicingOfAccountHolder,
  ManualSignatureCheck,
  Garnishment,
  OFACFailed,
  MLACheck,
  FreezeCardInDDAAccount,
  Customer,
  PaymentFormManualProcessing,
  NoticeOnRemittanceAmount,
  AccountOpening,
  CourtOrderGarnishment,
  Fraud,
  PendingAccountClosure,
  DebitCard,
  DebitCardRenewal,
  DebitCardsAllLocked,
  PaymentFormQualified,
  DebitMemoSEPA,
  Mandate,
  PaymentRecipient,
  BearerCheckAmount,
  OrderCheckAmount,
  DebitMemoAmount,
  TransferOrder,
  MandateUCI,
  Dunning,
  Loan,
  Rescission,
  Disbursement,
  PaymentPlanChange,
  Skip,
  LoanPayoff,
  Waiver,
  FollowUpActionsRescission,
  FollowUpActionsForNotice,
  FollowUpActionsForRollover,
  Technical,
  ParticipantAccount,
  ParticipantPrenote,
  Frozen = 'Frozen',
  CreditsOnly = 'CreditsOnly'
}
export interface IQuestionAndAnswer {
  id: string;
  question?: string;
  answer?: string;
}
export interface IChallengeQuestions {
  key: string;
  questions: IQuestionAndAnswer[];
}

export interface IChallengeAnswers {
  username?: string;
  key: string;
  answers: IQuestionAndAnswer[];
}

export interface ITemporaryPasswordRequest {
  username: string;
  debitCardNumber: number;
  dateOfBirth: string;
}
export interface ITemporaryPassword {
  temporaryPassword: string;
}

export interface IRecoverPassword {
  username: string;
  temporaryPassword: string;
  newPassword: string;
}

export enum SweepState {
  Activate = 'activate',
  Deactivate = 'deactivate'
}

export interface ISweepState {
  state: SweepState;
}
export interface ITransactionQueries {
  accountType?: AccountType;
  dateFrom?: string;
  dateTo?: string;
  amountFrom?: number;
  amountTo?: number;
}

export enum AccountLevel {
  Full = 'Full',
  Express = 'Express'
}

export interface IFundingInfo {
  accountNumber: string;
  interbankClabe: string;
  bankCode: string;
  bankName: string;
  cardNumber: string;
  oxxoNumber: string;
}

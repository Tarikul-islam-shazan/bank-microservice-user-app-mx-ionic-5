import { IAccount } from './dto';

export interface IRegistrationFeeTransferableAccounts {
  checking?: IAccount;
  savings?: IAccount;
}
export interface IAccountsAmount {
  checkingAmount: number;
  savingsAmount: number;
}

/**
 * Issue:  GMA-4690
 * Details:   Signup: In Paystand screen the user can edit the money.
 * Date: March 11, 2020
 * Developer: Raihan <raihanuzzaman@bs-23.net>
 */

export interface IPaystandOptions {
  elementID: string;
  amount: number;
  enableAmountInputField: amountInputField;
}

export interface IPayStandTransactionInfo {
  transactionReference: string;
  date: string;
  sourceType: SourceType;
  currency: string;
}

export enum SourceType {
  card = 'Card',
  bank = 'Bank'
}

export enum amountInputField {
  enable = 'true',
  disable = 'false'
}

export enum viewFunds {
  card = 'card',
  echeck = 'echeck'
}

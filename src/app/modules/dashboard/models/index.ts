import { ITransaction } from '@app/core';
export interface AccountTransaction {
  postedTransactions: ITransaction[];
  pendingTransactions: ITransaction[];
}

export interface TransactionSummary {
  title: string;
  amount: number;
}

export interface IAccountOverview {
  title: string;
  amount: number;
}

export interface ISavingTarget {
  monthly: number;
  weekly: number;
  daily: number;
}

export interface ISegmentContainer {
  reference: string;
  name: string;
}
export interface ISavingsGoal {
  _id?: any;
  name: string;
  targetAmount: number;
  startDate: Date;
  endDate: Date;
  yearOfSaving: number;
  memberId: string;
  createdDate?: Date;
}

export enum TabPage {
  TargetTab = 'tab-target',
  GoalTab = 'tab-goal',
  HistoryTab = 'tab-history'
}
export interface IInterestRate {
  amount: number;
}

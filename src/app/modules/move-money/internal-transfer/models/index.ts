export interface ITransfer {
  transferId?: string;
  debtorAccount: string;
  creditorAccount: string;
  amount: number;
  notes: string;
  transferDate: string;
  transferType: TransferType;
  frequency: TransferFrequency;
}

export enum TransferFrequency {
  Once = 'ONCE',
  Daily = 'DAILY',
  Weekly = 'WEEKLY',
  BiWeekly = 'BIWEEKLY',
  Monthly = 'MONTHLY',
  Yearly = 'YEARLY'
}

export enum TransferType {
  Immediate = 'Immediate',
  Scheduled = 'Scheduled',
  Recurring = 'Recurring'
}

export enum TransferFor {
  FromAccount = 'fromAccount',
  ToAccount = 'toAccount'
}

export interface ITransferSuccessModalObject extends ITransfer {
  fromAccountType: string;
  toAccountType: string;
}
export interface IScheduleTypeModalObject {
  frequency: TransferFrequency;
  transferDate: string;
}

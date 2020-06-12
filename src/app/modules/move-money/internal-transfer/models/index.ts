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
  Once = 'U',
  Daily = 'D',
  Weekly = 'S',
  BiWeekly = 'Q',
  Monthly = 'M',
  Yearly = 'A'
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
export enum LocPaymentOption {
  Minimum = 'minimum',
  Full = 'full',
  Custom = 'custom'
}

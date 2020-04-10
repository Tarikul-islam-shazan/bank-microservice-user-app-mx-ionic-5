export interface ITransfer {
  transferId?: string;
  debtorAccount: string;
  creditorAccount: string;
  amount: number;
  currency: string;
  notes: string;
  transferDate: string;
  transferType?: TransferType;
  previousTransferType?: TransferType;
  frequency: TransferFrequency;
}

export enum TransferFrequency {
  Once = 'Once',
  Weekly = 'Weekly',
  Monthly = 'Monthly',
  Yearly = 'Yearly'
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

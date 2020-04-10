export interface IDepositCheck {
  amount: any;
  currency: string;
  depositDate: string;
  notes: string;
  accountNumber: string;
  deviceKey: string;
  deviceDescription: string;
  businessName?: string;
  identification?: string;
  secondaryIdentification?: string;
}
export enum DepositFormDataKey {
  Amount = 'amount',
  Notes = 'notes',
  DepositDate = 'depositDate',
  Currency = 'currency',
  AccountNumber = 'accountNumber',
  DeviceKey = 'deviceKey',
  DeviceDescription = 'deviceDescription',
  FrontCheckImage = 'frontCheckImage',
  BackCheckImage = 'backCheckImage'
}
export interface IDepositCheckResponse {
  depositCheckConfirmationNumber: string;
  processingStatus: boolean;
}

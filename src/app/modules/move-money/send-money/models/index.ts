export enum P2PTransferType {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL'
}
export enum ContactType {
  MEED = 'MEED',
  IPAY = 'IPAY'
}
export interface IP2PTransfer {
  senderAccountId: string;
  senderEmail: string;
  receiverCustomerId?: string;
  receiverEmail: string;
  receiverCurrency?: string;
  sharedSecret?: string;
  amount: string;
  message: string;
  confirmationCode?: string;
  transferType: P2PTransferType;
  createdAt?: string;
}
export interface IContact {
  _id?: string;
  name: string;
  nickName: string;
  phone: string;
  email: string;
  sharedSecret: string;
  customerId?: string;
  status?: string;
  contactType: ContactType;
}

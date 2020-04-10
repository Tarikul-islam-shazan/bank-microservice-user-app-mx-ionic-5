export interface IFundRequest {
  _id?: string;
  senderEmail?: string;
  receiverEmail?: string;
  amount?: number;
  message?: string;
  confirmationCode?: string;
  requestStatus?: RequestStatus;
  createdAt?: string;
  updatedAt?: string;
}

export enum RequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  CANCELLED = 'CANCELLED',
  DECLINED = 'DECLINED'
}

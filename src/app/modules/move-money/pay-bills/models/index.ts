import { ApplicationStatus, MemberAccountStatus } from '@app/core/models/dto/member';
export enum PayBillsOptions {
  BillerDirect = 'billerdirect',
  BillPay = 'billpay',
  CardSwap = 'cardswap'
}

export interface IQ2CreateTokenRequest {
  memberEmail: string;
  accountStatus: ApplicationStatus;
  nickname: string;
  memberStatus: MemberAccountStatus; // required by Backend
}

export interface IQ2CreateTokenResponse {
  token: string;
  connectSSOUrl: string;
  cardSwapSSOUrl: string;
  billerDirectSSOUrl: string;
}

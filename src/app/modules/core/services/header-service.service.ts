import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { IMember, IOtp } from '../models';
import { MemberService } from './member.service';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  constructor(private memberService: MemberService, private settingService: SettingsService) {}

  get member(): IMember {
    return this.memberService.getCachedMember();
  }

  getMemberIdHeader(): HttpHeaders {
    return new HttpHeaders({
      'meedbankingclub-bank-identifier': this.settingService.getSettings().userSettings.bankIdentifier,
      'meedbankingclub-memberid': this.member._id
    });
  }
  getUserNameHeader(): HttpHeaders {
    return new HttpHeaders({
      'meedbankingclub-bank-identifier': this.settingService.getSettings().userSettings.bankIdentifier,
      'MeedBankingclub-username': this.member.username
    });
  }
  getUserNameMemberIdHeader(): HttpHeaders {
    return new HttpHeaders({
      'meedbankingclub-bank-identifier': this.settingService.getSettings().userSettings.bankIdentifier,
      'MeedBankingclub-username': this.member.username,
      'meedbankingclub-memberid': this.member._id
    });
  }

  getUserNameCustomerIdHeader(): HttpHeaders {
    return new HttpHeaders({
      'meedbankingclub-bank-identifier': this.settingService.getSettings().userSettings.bankIdentifier,
      'MeedBankingclub-username': this.member.username,
      'meedbankingclub-customerid': this.member.customerId
    });
  }
  getUserNameMemberICustomerIdHeader(): HttpHeaders {
    return new HttpHeaders({
      'meedbankingclub-bank-identifier': this.settingService.getSettings().userSettings.bankIdentifier,
      'MeedBankingclub-username': this.member.username,
      'meedbankingclub-memberid': this.member._id,
      'meedbankingclub-customerid': this.member.customerId
    });
  }

  getMemberIdCustomerIdHeader(): HttpHeaders {
    return new HttpHeaders({
      'meedbankingclub-bank-identifier': this.settingService.getSettings().userSettings.bankIdentifier,
      'meedbankingclub-memberid': this.member._id,
      'meedbankingclub-customerid': this.member.customerId
    });
  }

  getOtpHeader(otpId: string, otpToken: string) {
    return new HttpHeaders({
      'meedbankingclub-bank-identifier': this.settingService.getSettings().userSettings.bankIdentifier,
      'MeedBankingclub-username': this.member.username,
      'meedbankingclub-memberid': this.member._id,
      'meedbankingclub-customerid': this.member.customerId,
      'meedbankingclub-otp-id': otpId,
      'meedbankingclub-otp-token': otpToken
    });
  }
  getSavingGoalHeader(): HttpHeaders {
    return new HttpHeaders({
      'meedbankingclub-memberid': this.member._id
    });
  }

  getAccountRecoveryOtpHeader(otp: IOtp, bankIdentifier: string) {
    return new HttpHeaders({
      'meedbankingclub-bank-identifier': bankIdentifier,
      'meedbankingclub-otp-id': otp.otpId,
      'meedbankingclub-otp-token': otp.otpToken
    });
  }

  getQ2Headers(): HttpHeaders {
    return new HttpHeaders({
      'meedbankingclub-bank-identifier': this.settingService.getSettings().userSettings.bankIdentifier,
      'meedbankingclub-customerid': this.member.customerId,
      'meedbankingclub-billpay-provider': 'Q2'
    });
  }

  getBillPayProviderHeader(): HttpHeaders {
    return new HttpHeaders({
      'meedbankingclub-bank-identifier': this.settingService.getSettings().userSettings.bankIdentifier,
      'MeedBankingclub-username': this.member.username,
      'meedbankingclub-customerid': this.member.customerId,
      'meedbankingclub-billpay-provider': this.settingService.getSettings().userSettings.billPayProvider
    });
  }
  getBillPayProviderOtpHeader(otp: IOtp): HttpHeaders {
    return new HttpHeaders({
      'meedbankingclub-bank-identifier': this.settingService.getSettings().userSettings.bankIdentifier,
      'MeedBankingclub-username': this.member.username,
      'meedbankingclub-customerid': this.member.customerId,
      'meedbankingclub-billpay-provider': this.settingService.getSettings().userSettings.billPayProvider,
      'meedbankingclub-otp-id': otp.otpId,
      'meedbankingclub-otp-token': otp.otpToken
    });
  }

  getUserCustomerIdHeader(): HttpHeaders {
    return new HttpHeaders({
      'meedbankingclub-customerid': this.member.customerId
    });
  }

  getBankIdentifierHeader(): HttpHeaders {
    return new HttpHeaders({
      'meedbankingclub-bank-identifier': this.settingService.getSettings().userSettings.bankIdentifier
    });
  }

  getMemberICustomerIdHeader(): HttpHeaders {
    return new HttpHeaders({
      'meedbankingclub-bank-identifier': this.settingService.getSettings().userSettings.bankIdentifier,
      'meedbankingclub-memberid': this.member._id,
      'meedbankingclub-customerid': this.member.customerId
    });
  }
}

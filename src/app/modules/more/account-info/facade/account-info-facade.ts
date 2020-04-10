import { Injectable } from '@angular/core';
import { MemberService, AccountService, AccountType, IAccount, IMember } from '@app/core';
@Injectable()
export class AccountInfoFacade {
  accountInfo: IAccount;
  memberInfo: IMember;
  constructor(private memberService: MemberService, private accountService: AccountService) {
    this.loadMember();
    this.loadAccountInfo();
  }

  loadMember() {
    this.memberInfo = this.memberService.getCachedMember();
  }

  loadAccountInfo() {
    this.accountInfo = this.accountService
      .getCachedAccountSummary()
      .find(account => account.accountType === AccountType.DDA);
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService, FundingType, IFundingInfo, IMember, ApplicationProgress, MemberService } from '@app/core';
@Injectable()
export class FundingOption {
  constructor(private router: Router, private signupService: SignUpService, private memberService: MemberService) {}

  get member(): IMember {
    return this.memberService.getCachedMember();
  }

  get applicationProgress(): typeof ApplicationProgress {
    return ApplicationProgress;
  }

  get accountFundType(): FundingType {
    return this.signupService.accountFundType;
  }

  get type(): typeof FundingType {
    return FundingType;
  }

  get accountFundInfo(): IFundingInfo {
    return this.signupService.fundingInfo;
  }

  get isDirectDepositActive(): boolean {
    if (this.member && this.member.applicationProgress === this.applicationProgress.DirectDeposit) {
      return false;
    } else {
      return true;
    }
  }

  get isLoginActive(): boolean {
    if (
      (this.member && this.member.applicationProgress === this.applicationProgress.AccountFunded) ||
      (this.member && this.member.applicationProgress === this.applicationProgress.DirectDeposit)
    ) {
      return true;
    } else {
      return false;
    }
  }

  goToDirectDeposit() {
    this.router.navigate(['/signup/deposit/direct-deposit']);
  }

  goToLogin() {
    this.router.navigate(['/login-user']);
  }
}

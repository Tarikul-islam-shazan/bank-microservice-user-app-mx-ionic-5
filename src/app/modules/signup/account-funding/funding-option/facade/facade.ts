import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService, DepositType, IDepositInfo, IMember, ApplicationProgress, MemberService } from '@app/core';
@Injectable()
export class FundingOption {
  constructor(private router: Router, private signupService: SignUpService, private memberService: MemberService) {}

  get member(): IMember {
    return this.memberService.getCachedMember();
  }

  get applicationProgress(): typeof ApplicationProgress {
    return ApplicationProgress;
  }

  get accountFundType(): DepositType {
    return this.signupService.accountFundType;
  }

  get type(): typeof DepositType {
    return DepositType;
  }

  get accountFundInfo(): IDepositInfo {
    return this.signupService.depositInfo;
  }

  goToDirectDeposit() {
    this.router.navigate(['/signup/deposit/direct-deposit']);
  }

  goToLogin() {
    this.router.navigate(['/login-user']);
  }
}

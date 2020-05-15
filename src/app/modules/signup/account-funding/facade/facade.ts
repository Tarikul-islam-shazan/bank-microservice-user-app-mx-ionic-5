import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService, FundingType, IMember, MemberService, ApplicationProgress } from '@app/core';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { ModalService, IMeedModalContent } from '@app/shared';
@Injectable()
export class AccountFunding {
  fundingType = FundingType.SPEI;
  constructor(
    private router: Router,
    private signupService: SignUpService,
    private analytics: AnalyticsService,
    private memberService: MemberService,
    private modalService: ModalService
  ) {}

  get type(): typeof FundingType {
    return FundingType;
  }

  get member(): IMember {
    return this.memberService.getCachedMember();
  }

  get applicationProgress(): typeof ApplicationProgress {
    return ApplicationProgress;
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

  async openSPEIModal() {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'signup-module.account-funding-page.spei-modal.title',
          details: [
            'signup-module.account-funding-page.spei-modal.details.content1',
            'signup-module.account-funding-page.spei-modal.details.content2'
          ]
        }
      ]
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }
  async openOXXOModal() {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'signup-module.account-funding-page.oxxo-modal.title',
          details: [
            'signup-module.account-funding-page.oxxo-modal.details.content1',
            'signup-module.account-funding-page.oxxo-modal.details.content2'
          ]
        }
      ]
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }

  goToNext() {
    this.signupService.getDeposistInfo(this.fundingType).subscribe(data => {
      this.signupService.accountFundType = this.fundingType;
      this.analytics.logEvent(AnalyticsEventTypes.AccountFunded, { accountFundType: this.fundingType });
      this.router.navigate(['/signup/account-funding/funding-option']);
    });
  }

  goToLogin() {
    this.router.navigate(['/login-user']);
  }
}

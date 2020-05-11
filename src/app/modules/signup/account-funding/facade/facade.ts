import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService, DepositType, IMember, MemberService, ApplicationProgress } from '@app/core';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { ModalService, IMeedModalContent } from '@app/shared';
@Injectable()
export class AccountFunding {
  depositType = DepositType.SPEI;
  constructor(
    private router: Router,
    private signupService: SignUpService,
    private analytics: AnalyticsService,
    private memberService: MemberService,
    private modalService: ModalService
  ) {}

  get type(): typeof DepositType {
    return DepositType;
  }

  get member(): IMember {
    return this.memberService.getCachedMember();
  }

  get applicationProgress(): typeof ApplicationProgress {
    return ApplicationProgress;
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
    this.signupService.getDeposistInfo(this.depositType).subscribe(data => {
      this.signupService.accountFundType = this.depositType;
      this.analytics.logEvent(AnalyticsEventTypes.AccountFundTypeSelected, { accountFundType: this.depositType });
      this.router.navigate(['/signup/account-funding/funding-option']);
    });
  }

  goToLogin() {
    this.router.navigate(['/login-user']);
  }
}

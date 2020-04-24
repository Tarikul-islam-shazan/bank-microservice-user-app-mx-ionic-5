import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService, IMeedModalContent } from '@app/shared';
import { SignUpService, IAccountLevel } from '@app/core';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';

enum AccountLevel {
  Full = 'Full',
  Express = 'Express'
}

@Injectable()
export class AccountSelectionFacade {
  accountLevel = AccountLevel.Full;

  constructor(
    private router: Router,
    private modalService: ModalService,
    private signupService: SignUpService,
    private analytics: AnalyticsService
  ) {}

  get level(): typeof AccountLevel {
    return AccountLevel;
  }

  /**
   * This method show Info Modal on each radio button
   * question button click
   *
   * @param account { string }
   * @returns null { void }
   */
  openInfoModal(account: string): void {
    let componentProps: IMeedModalContent;
    if (account === AccountLevel.Full) {
      componentProps = {
        contents: [
          {
            title: 'signup-module.signup-account-selection.account-level-full-modal-title',
            details: ['signup-module.signup-account-selection.account-level-full-model-details']
          }
        ]
      };
    } else {
      componentProps = {
        contents: [
          {
            title: 'signup-module.signup-account-selection.account-level-express-modal-title',
            details: ['signup-module.signup-account-selection.account-level-express-model-details']
          }
        ]
      };
    }
    this.modalService.openInfoModalComponent({ componentProps });
  }

  /**
   * This method request a API call after that it will
   * navigate user to the Personal Information Page if Account Level is Full
   * for Account Level Express user navigated to Terms & Conditions Page.
   *
   * @param null
   * @returns null
   */
  onClickNext(): void {
    this.signupService.selectAccountLevel(this.accountLevel).subscribe((response: IAccountLevel) => {
      this.analytics.logEvent(AnalyticsEventTypes.SignupAccountLevelSelected, { accountLevel: response.accountLevel });
      switch (response.accountLevel) {
        case AccountLevel.Full:
          this.router.navigate(['/signup/personal-information']);
          break;
        case AccountLevel.Express:
          this.router.navigate(['/signup/terms-conditions']);
          break;
      }
    });
  }
}

import { Injectable } from '@angular/core';
import { PaystandService } from '@app/deposit/paystand/services';
import { DepositThankYouPage } from '@app/deposit/deposit-thank-you/container';
import { SignUpService, AccountService } from '@app/core';
import { ModalService } from '@app/shared';
import { Router } from '@angular/router';
import { IPaystandOptions, IPayStandTransactionInfo, amountInputField, viewFunds } from '@app/deposit/paystand/models';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
@Injectable()
export class CreditDebitCardFacade {
  constructor(
    private payStandService: PaystandService,
    private signUpService: SignUpService,
    private accountService: AccountService,
    private modalService: ModalService,
    protected router: Router,
    private analytics: AnalyticsService
  ) {}

  openSuccessModal() {
    this.modalService.openModal(DepositThankYouPage, {}, onDidDismiss => {
      this.analytics.logEvent(AnalyticsEventTypes.PayStandCompleted);
      this.router.navigateByUrl('/dashboard/move-money');
    });
  }

  /**
   * Calls the paystand service to initialize the paystand page with required parameter
   *
   * @memberof DepositMoneyPayStandFacade
   */

  /**
   * Issue:  GMA-4690
   * Details: Signup: In Paystand screen the user can edit the money.
   * And refactored the code.
   * Date: March 11, 2020
   * Developer: Raihan <raihanuzzaman@bs-23.net>
   */

  initPayStandService() {
    this.payStandService.viewFunds = viewFunds.card;
    const paystandOptions: IPaystandOptions = {
      elementID: 'ps_container_id',
      amount: 0,
      enableAmountInputField: amountInputField.disable
    };

    this.payStandService.initilize(paystandOptions, checkoutSuccessResponse => {
      this.psCheckoutSuccess(checkoutSuccessResponse);
    });
  }
  psCheckoutSuccess(checkoutSuccessResponse: IPayStandTransactionInfo) {
    this.signUpService.payStandTransactionInfo = checkoutSuccessResponse;
    this.updateAccountSummary();
    this.openSuccessModal();
  }
  payStandViewportReset() {
    this.payStandService.viewportReset();
  }

  /**
   * Issue:  GMA-4362
   * Details:  calling the account summary api to get the updated status of the account for credit limit exceeded,
   * this method has a pipe function which updates account summary model
   * Date: February 24, 2020
   * Developer: Raihan <raihanuzzaman@bs-23.net>
   */

  private updateAccountSummary(): void {
    this.accountService.fetchAccountSummary().subscribe();
  }
}

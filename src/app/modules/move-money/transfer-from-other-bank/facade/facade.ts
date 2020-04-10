import { Injectable } from '@angular/core';
import { PaystandService } from '@app/deposit/paystand/services';
import { DepositThankYouPage } from '@app/deposit/deposit-thank-you/container';
import { SignUpService, MemberService, IMember } from '@app/core';
import { AccountService } from '@app/core/services/account.service';
import { IAccount, AccountType } from '@app/core/models/dto/account';
import { ModalService } from '@app/shared';
import { noop } from 'rxjs';
import { Router } from '@angular/router';
import { IPaystandOptions, IPayStandTransactionInfo, amountInputField, viewFunds } from '@app/deposit/paystand/models';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
@Injectable()
export class TransferFromOtherBankFacade {
  constructor(
    private payStandService: PaystandService,
    private signUpService: SignUpService,
    private memberService: MemberService,
    private accountService: AccountService,
    private modalService: ModalService,
    protected router: Router,
    private analytics: AnalyticsService
  ) {}

  get member(): IMember {
    return this.memberService.member;
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
    this.payStandService.viewFunds = viewFunds.echeck;
    const paystandOptions: IPaystandOptions = {
      elementID: 'ps_container_id',
      amount: 0,
      enableAmountInputField: amountInputField.disable
    };

    this.payStandService.initilize(paystandOptions, checkoutSuccessResponse => {
      this.psCheckoutSuccess(checkoutSuccessResponse);
    });
  }

  psCheckoutSuccess(res: IPayStandTransactionInfo) {
    this.signUpService.payStandTransactionInfo = res;
    this.updateAccountSummary();
    this.openSuccessModal();
  }

  openSuccessModal() {
    this.modalService.openModal(DepositThankYouPage, {}, onDidDismiss => {
      this.analytics.logEvent(AnalyticsEventTypes.PayStandCompleted);
      this.router.navigateByUrl('/dashboard/move-money');
    });
  }

  payStandViewportReset() {
    this.payStandService.viewportReset();
  }

  // checks if the DDA account has exceeded the limit
  checkCreditLimitExceeded(): boolean {
    const accounts = this.accountService.getCachedAccountSummary() as IAccount[];
    const ddaAccount = accounts.find((account: IAccount) => account.accountType === AccountType.DDA);
    return ddaAccount.creditLimitExceeded;
  }

  /**
   * Issue:  GMA-4362
   * Details:  calling the account summary api to get the updated status of the account for credit limit exceeded,
   * this method has a pipe function which updates account summary model
   * Date: February 24, 2020
   * Developer: Raihan <raihanuzzaman@bs-23.net>
   */

  private updateAccountSummary(): void {
    this.accountService.fetchAccountSummary().subscribe(noop);
  }
}

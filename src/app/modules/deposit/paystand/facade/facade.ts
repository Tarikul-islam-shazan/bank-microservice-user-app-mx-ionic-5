import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService, RegistrationFeeRequest, RegistrationFeePaymentType } from '@app/core';
import { DepositThankYouPage } from '@app/deposit/deposit-thank-you/container';
import { PaystandService } from '../services';
import { IPaystandOptions, IPayStandTransactionInfo, SourceType, amountInputField, viewFunds } from '../models';
import { ModalService } from '@app/shared/services/modal.service';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
@Injectable()
export class DepositMoneyPayStandFacade {
  private _registrationFeeRequest: RegistrationFeeRequest;
  constructor(
    private router: Router,
    private signupService: SignUpService,
    private payStandService: PaystandService,
    private modalService: ModalService,
    private analytics: AnalyticsService,
    private ngZone: NgZone
  ) {}

  get registrationFeeRequest(): RegistrationFeeRequest {
    return this._registrationFeeRequest;
  }

  set registrationFeeRequest(registrationFeeRequest: RegistrationFeeRequest) {
    this._registrationFeeRequest = registrationFeeRequest;
  }

  registrationFee() {
    this.signupService.registrationFee(this.registrationFeeRequest).subscribe(res => {
      this.openSuccessModal();
    });
  }
  openSuccessModal() {
    this.modalService.openModal(DepositThankYouPage, {}, onDidDismiss => {
      this.analytics.logEvent(AnalyticsEventTypes.PayStandCompleted);
      /**
       * Paystand service based on iframe events.
       * This service execute outside the angular zone.
       * So angular routing inside Paystand service should trigger angular zone
       * Ticket: GMA-4755
       * Issue: After completing sign up login page not working properly
       * Date: March 27 2020
       * @author sanitul hassan <sanitul@bs-23.com>
       */
      this.ngZone.run(() => {
        this.router.navigate(['/signup/deposit/direct-deposit-setup']);
      });
    });
  }

  getRegistrationFeeRequest(): RegistrationFeeRequest {
    return (this.registrationFeeRequest = this.signupService.signUpDirectDepositAccounts.registrationFeeRequest);
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
    this.getRegistrationFeeRequest();
    this.payStandService.viewFunds =
      this.registrationFeeRequest.paymentMethod === RegistrationFeePaymentType.DEBITCARD
        ? viewFunds.card
        : viewFunds.echeck;

    const paystandOption: IPaystandOptions = {
      elementID: 'ps_container_id',
      amount: this.registrationFeeRequest.totalAmount,
      enableAmountInputField: amountInputField.enable
    };

    this.payStandService.initilize(paystandOption, checkoutSuccessResponse => {
      this.psCheckoutSuccess(checkoutSuccessResponse);
    });
  }
  psCheckoutSuccess(paystandResponse: IPayStandTransactionInfo) {
    const { sourceType, currency, transactionReference: paymentTrackingId } = paystandResponse;
    this.registrationFeeRequest.paymentMethod =
      sourceType === SourceType.card ? RegistrationFeePaymentType.DEBITCARD : RegistrationFeePaymentType.ECHECK;
    this.registrationFeeRequest = { ...this.registrationFeeRequest, currency, paymentTrackingId };
    this.signupService.payStandTransactionInfo = paystandResponse;
    this.registrationFee();
  }
  payStandViewportReset() {
    this.payStandService.viewportReset();
  }

  getRegistrationFeePaymentType(): string {
    return this.signupService.signUpDirectDepositAccounts.registrationFeePaymentType;
  }
}

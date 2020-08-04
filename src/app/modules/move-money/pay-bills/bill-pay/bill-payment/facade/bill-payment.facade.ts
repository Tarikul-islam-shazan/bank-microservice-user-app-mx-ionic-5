import * as moment from 'moment';
import { AnalyticsEventTypes, AnalyticsService } from '@app/analytics';
import { CurrencyPipe } from '@angular/common';
import { IBillPayee, IBillPayment, PaymentFrequency } from '@app/core';
import { IMeedModalContent, ModalService, SuccessModalPage } from '@app/shared';
import { Injectable } from '@angular/core';
import { noop, Observable, Subscription } from 'rxjs';
import { OtpVerificationModalPage } from '@app/shared/components/otp-verification-modal/container';
import { PayBillService } from '@app/core/services/pay-bill.service';
import { Router } from '@angular/router';

@Injectable()
export class BillPaymentFacade {
  billPayment: IBillPayment;
  otpCodeSubscription: Subscription;

  constructor(
    private analyticsService: AnalyticsService,
    private currencyPipe: CurrencyPipe,
    private modalService: ModalService,
    private payBillService: PayBillService,
    private router: Router
  ) {}

  /**
   * @summary navigates to the specified route.
   *
   * @param {string} _pageToNavigate
   * @memberOf BillPaymentPage
   */
  navigateToPage(_pageToNavigate: string): void {
    this.router.navigate([_pageToNavigate]);
  }

  /**
   * @summary gets bill payee from payee service.
   *
   * @returns {IBillPayee}
   * @memberOf BillPaymentFacade
   */
  getBillPayee(): IBillPayee {
    return this.payBillService.billPayee;
  }

  /**
   * @summary gets component props for success modal.
   *
   * @private
   * @param {IBillPayment} _paymentInfo
   * @returns {IMeedModalContent}
   *
   * @memberOf BillPaymentFacade
   */
  private getPaymentSuccessModalCompProps(_paymentInfo: IBillPayment, referenceNumber: string): IMeedModalContent {
    const { amount, executionDate } = _paymentInfo,
      payeeName = this.getBillPayee().biller.name,
      paymentAmount = this.currencyPipe.transform(amount),
      paymentExecutionDate = moment(executionDate).format('MMM DD, YYYY'),
      componentProps: IMeedModalContent = {
        contents: [
          {
            title: 'move-money-module.pay-bills.bill-payment.modal.title',
            details: ['move-money-module.pay-bills.bill-payment.modal.content-1'],
            reference: 'move-money-module.pay-bills.bill-payment.modal.reference-text',
            values: {
              paymentAmount,
              payeeName,
              paymentExecutionDate,
              referenceNumber
            }
          }
        ],
        actionButtons: [
          {
            text: 'move-money-module.pay-bills.bill-payment.modal.btn-done',
            cssClass: 'white-button',
            handler: () => {
              // this.analyticsService.logEvent(AnalyticsEventTypes.BillPaymentDone);
              this.modalService.close();
            }
          }
        ],
        onDidDismiss: () => this.navigateToPage('/move-money/pay-bills/bill-pay')
      };

    return componentProps;
  }

  /**
   * @summary opens success modal after updating payment info
   *
   * @param {IBillPayment} _paymentInfo
   * @memberOf BillPaymentFacade
   */
  payBill(_paymentInfo: IBillPayment): void {
    this.payBillService.createUtilityPayment(_paymentInfo).subscribe(payee => {
      const componentProps = this.getPaymentSuccessModalCompProps(_paymentInfo, payee.referenceId);
      this.modalService.openModal(SuccessModalPage, componentProps);
    });
  }
}

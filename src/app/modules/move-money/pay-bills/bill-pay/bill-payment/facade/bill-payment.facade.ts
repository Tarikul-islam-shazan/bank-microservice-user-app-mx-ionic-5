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
  private getPaymentSuccessModalCompProps(_paymentInfo: IBillPayment): IMeedModalContent {
    const { amount, executionDate } = _paymentInfo,
      payeeName = this.getBillPayee().biller.name,
      referenceNumber = '12345678910',
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
  update(_paymentInfo: IBillPayment): void {
    // this.updateBillPayment(_paymentInfo).subscribe(() => {
    //   const componentProps = this.getEditSuccessCompProp();
    //   this.modalService.openInfoModalComponent({ componentProps });
    // });
    const componentProps = this.getPaymentSuccessModalCompProps(_paymentInfo);
    this.modalService.openModal(SuccessModalPage, componentProps);
  }

  /**
   * @summary calls delete payment api. navifates to mail check if deleted.
   *
   * @param {string} _paymentId
   * @returns {void}
   * @memberOf BillPaymentFacade
   */
  private deletePayment(_paymentId: string): void {
    this.payBillService.deletePayment(_paymentId).subscribe(() => {
      this.navigateToPage('/move-money/pay-bills/bill-pay');
    });
  }

  /**
   * @summary gets component props for payment delete modal.
   *
   * @private
   * @returns {IMeedModalContent}
   * @memberOf BillPaymentFacade
   */
  private getDeleteCompProp(): IMeedModalContent {
    const paymentId = '2971237';
    const componentProps: IMeedModalContent = {
      contents: [
        {
          details: ['move-money-module.pay-bills.bill-payment.modal.payment-delete-text']
        }
      ],
      actionButtons: [
        {
          text: 'move-money-module.pay-bills.bill-payment.buttons.yes-button-text',
          cssClass: 'white-button',
          handler: () => {
            this.deletePayment(paymentId);
            this.modalService.close();
          }
        },
        {
          text: 'move-money-module.pay-bills.bill-payment.buttons.no-button-text',
          cssClass: 'grey-outline-button',
          handler: () => {
            this.modalService.close();
          }
        }
      ]
    };

    return componentProps;
  }

  /**
   * @summary opens info modal to delete payment.
   *
   * @returns {void}
   * @memberOf BillPaymentFacade
   */
  delete(): void {
    const componentProps = this.getDeleteCompProp();
    this.modalService.openInfoModalComponent({ componentProps });
  }
}

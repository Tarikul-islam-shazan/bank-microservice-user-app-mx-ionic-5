import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { IBiller, IBillPayee, IBillPayment } from '@app/core/models/dto';
import { IMeedModalContent, ModalService, SuccessModalPage, DropdownModalComponent, PhonePipe } from '@app/shared';
import { Injectable } from '@angular/core';
import { PayBillService } from '@app/core/services/pay-bill.service';
import { Router } from '@angular/router';
import { IDropdownOption } from '@app/core/models/static-data';

@Injectable()
export class TopUpPaymentFacade {
  billPayment: IBillPayment;
  availableAmountsOptions: IDropdownOption[] = [];

  constructor(
    private currencyPipe: CurrencyPipe,
    private modalService: ModalService,
    private payBillService: PayBillService,
    private router: Router,
    private phonePipe: PhonePipe
  ) {}
  /**
   * @summary navigates to the specified route.
   *
   * @param {string} _pageToNavigate
   * @memberOf TopUpPaymentFacade
   */
  navigateToPage(_pageToNavigate: string): void {
    this.router.navigate([_pageToNavigate]);
  }

  /**
   * @summary
   * A function to convert a string amount list to IDropdownOption list & init
   *
   * @memberof TopUpPaymentFacade
   */
  initAvailableDropDownAmountOptions() {
    this.availableAmountsOptions = [];
    const { availableTopupAmounts } = this.payBillService.billPayee.biller as IBiller;
    if (availableTopupAmounts && availableTopupAmounts.length > 0) {
      availableTopupAmounts
        .sort((a, b) => parseFloat(a) - parseFloat(b))
        .forEach((amount: string) => {
          const text = this.currencyPipe.transform(parseFloat(amount)).toString();
          this.availableAmountsOptions.push({ text, value: amount });
        });
    }
  }

  /**
   * @summary gets bill payee from payee service.
   *
   * @returns {IBillPayee}
   * @memberOf TopUpPaymentFacade
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
   * @memberOf TopUpPaymentFacade
   */
  private getPaymentSuccessModalCompProps(_paymentInfo: IBillPayment, referenceNumber: string): IMeedModalContent {
    let { phoneNumber } = _paymentInfo;
    phoneNumber = this.phonePipe.transform(phoneNumber);
    const { amount, executionDate } = _paymentInfo,
      paymentAmount = this.currencyPipe.transform(amount),
      paymentExecutionDate = moment(executionDate).format('MMM DD, YYYY'),
      componentProps: IMeedModalContent = {
        contents: [
          {
            title: 'move-money-module.pay-bills.top-up-payment.modal.title',
            details: ['move-money-module.pay-bills.top-up-payment.modal.content-1'],
            reference: 'move-money-module.pay-bills.top-up-payment.modal.reference-text',
            values: {
              paymentAmount,
              phoneNumber,
              paymentExecutionDate,
              referenceNumber
            }
          }
        ],
        actionButtons: [
          {
            text: 'move-money-module.pay-bills.top-up-payment.modal.btn-done',
            cssClass: 'white-button',
            handler: () => {
              this.modalService.close();
            }
          }
        ],
        onDidDismiss: () => this.navigateToPage('/move-money/pay-bills/top-up-mobile')
      };

    return componentProps;
  }

  /**
   * @summary opens success modal after updating payment info
   *
   * @param {IBillPayment} _paymentInfo
   * @memberOf TopUpPaymentFacade
   */
  payBill(_paymentInfo: IBillPayment): void {
    this.payBillService.createTopUpPayment(_paymentInfo).subscribe(payment => {
      const componentProps = this.getPaymentSuccessModalCompProps(_paymentInfo, payment.referenceId);
      this.modalService.openModal(SuccessModalPage, componentProps);
    });
  }

  openAvailableAmountsModal(callback: (data) => void): void {
    this.modalService.openModal(
      DropdownModalComponent,
      {
        data: this.availableAmountsOptions
      },
      (resp: any) => {
        const { data } = resp;
        if (data) {
          callback(data);
        }
      }
    );
  }
}

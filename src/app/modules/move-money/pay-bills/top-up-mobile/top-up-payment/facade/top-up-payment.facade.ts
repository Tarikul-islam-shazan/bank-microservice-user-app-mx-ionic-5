import * as moment from 'moment';
import { CurrencyPipe } from '@angular/common';
import { IBillPayee, IBillPayment } from '@app/core/models/dto';
import { IMeedModalContent, ModalService, SuccessModalPage, DropdownModalComponent } from '@app/shared';
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
    private router: Router
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
    this.payBillService.billPayee.biller.available_topup_amounts.forEach((amount: string) => {
      const text = this.currencyPipe.transform(parseFloat(amount)).toString();
      this.availableAmountsOptions.push({ text, value: amount });
    });
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
  private getPaymentSuccessModalCompProps(_paymentInfo: IBillPayment): IMeedModalContent {
    const { amount, executionDate } = _paymentInfo,
      accountNumber = this.getBillPayee().accountNumber,
      referenceNumber = '12345678910',
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
              accountNumber,
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
  update(_paymentInfo: IBillPayment): void {
    const componentProps = this.getPaymentSuccessModalCompProps(_paymentInfo);
    this.modalService.openModal(SuccessModalPage, componentProps);
  }

  /**
   * @summary calls delete payment api. navifates to mail check if deleted.
   *
   * @param {string} _paymentId
   * @returns {void}
   * @memberOf TopUpPaymentFacade
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
   * @memberOf TopUpPaymentFacade
   */
  private getDeleteCompProp(): IMeedModalContent {
    const paymentId = '2971237';
    const componentProps: IMeedModalContent = {
      contents: [
        {
          details: ['move-money-module.pay-bills.top-up-payment.modal.payment-delete-text']
        }
      ],
      actionButtons: [
        {
          text: 'move-money-module.pay-bills.top-up-payment.buttons.yes-button-text',
          cssClass: 'white-button',
          handler: () => {
            this.deletePayment(paymentId);
            this.modalService.close();
          }
        },
        {
          text: 'move-money-module.pay-bills.top-up-payment.buttons.no-button-text',
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
   * @memberOf TopUpPaymentFacade
   */
  delete(): void {
    const componentProps = this.getDeleteCompProp();
    this.modalService.openInfoModalComponent({ componentProps });
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

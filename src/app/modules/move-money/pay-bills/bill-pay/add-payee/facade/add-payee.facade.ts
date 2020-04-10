import { AnalyticsEventTypes, AnalyticsService } from '@app/analytics';
import { IBillPayee } from '@app/core';
import { IMeedModalContent, ModalService } from '@app/shared';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PayBillService } from '@app/core/services/pay-bill.service';
import { Router } from '@angular/router';

@Injectable()
export class AddPayeeFacade {
  constructor(
    private analyticsService: AnalyticsService,
    private modalService: ModalService,
    private payBillService: PayBillService,
    private router: Router
  ) {}

  /**
   * @summary gets payee info from service
   *
   * @returns {IBillPayee}
   * @memberOf AddPayeeFacade
   */
  getBillPayee(): IBillPayee {
    return this.payBillService.billPayee;
  }

  /**
   * @summary returns payee details.
   *
   * @returns {Observable<IBillPayee>}
   * @memberOf AddPayeeFacade
   */
  getPayeeDetails(): Observable<IBillPayee> {
    return this.payBillService.getPayeeDetails();
  }

  /**
   * @summary naviagtes to payee address page.
   *
   * @param {IBillPayee} billPayee
   * @returns {void}
   * @memberOf AddPayeeFacade
   */
  continue(billPayee: IBillPayee): void {
    this.payBillService.billPayee = billPayee;
    this.navigateToPage('/move-money/pay-bills/add-payee-address');
  }

  /**
   * @summary navigates to the passed route
   *
   * @private
   * @param {string} pageToNavigate
   * @returns {void}
   * @memberOf AddPayeeFacade
   */
  private navigateToPage(pageToNavigate: string): void {
    this.router.navigate([pageToNavigate]);
  }

  /**
   * @sumamry logs AnalyticsEventTypes.BillPayPayeeDeleted event to analytics after
   * deleting payee. Later navigates to bill pay home page.
   *
   * @private
   * @returns {void}
   * @memberOf AddPayeeFacade
   */
  private deletePayee(): void {
    this.payBillService.deletePayee().subscribe(() => {
      this.analyticsService.logEvent(AnalyticsEventTypes.BillPayeeDeleted);
      this.navigateToPage('/move-money/pay-bills/bill-pay');
    });
  }

  /**
   * @summary generates component props for openInfoModalComponent component.
   *
   * @returns {IMeedModalContent}
   * @memberOf AddPayeeFacade
   */
  private generateDeleteConfirmationComponentProp(): IMeedModalContent {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: '',
          details: ['move-money-module.pay-bills.add-payee.modal.delete-payee-title']
        }
      ],
      actionButtons: [
        {
          text: 'move-money-module.pay-bills.add-payee.modal.yes-button',
          cssClass: 'white-button',
          handler: () => {
            this.deletePayee();
            this.modalService.close();
          }
        },
        {
          text: 'move-money-module.pay-bills.add-payee.modal.no-button',
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
   * @sumamry opens openInfoModalComponent modal.
   * deletes the payee if Yes chosen or
   * closes modal if No chosen.
   *
   * @returns {Promise<void>}
   * @memberOf AddPayeeFacade
   */
  openInfoModalComponent(): void {
    this.analyticsService.logEvent(AnalyticsEventTypes.BillPayeeAdded);
    const componentProps = this.generateDeleteConfirmationComponentProp();
    this.modalService.openInfoModalComponent({ componentProps });
  }

  /**
   * @summary opens delete modal
   *
   * @returns {void}
   * @memberOf AddPayeeFacade
   */
  delete(): void {
    this.openInfoModalComponent();
  }

  /**
   * @summary navigates to bill pay home page.
   *
   * @returns {void}
   * @memberOf AddPayeeFacade
   */
  cancel(): void {
    this.navigateToPage('/move-money/pay-bills/bill-pay');
  }
}

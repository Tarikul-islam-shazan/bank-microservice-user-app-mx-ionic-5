import { Component } from '@angular/core';
import { AccountType, ITransactionQueries } from '@app/core';
import { ModalService, IMeedModalContent } from '@app/shared';
import { LineOfCreditFacade, LOC_FACADE_SERVICE } from '../facade';

@Component({
  selector: 'app-loc-transactions',
  templateUrl: './line-of-credit.page.html',
  styleUrls: ['./line-of-credit.page.scss'],
  providers: [...LOC_FACADE_SERVICE]
})
export class LineOfCreditPage {
  public searchAccordion = false;
  constructor(public lineOfCreditFacade: LineOfCreditFacade, private modalService: ModalService) {}

  /**
   * @description Show the LOC Modal on tapping the question mark
   * @async
   * @param {*} accountType
   * @memberof LineOfCreditPage
   */
  async showModal(accountType) {
    if (accountType === AccountType.LOC) {
      const componentProps: IMeedModalContent = {
        contents: [
          {
            title: 'info-modal-module.line-of-credit-page.title',
            details: [
              'info-modal-module.line-of-credit-page.details.content1',
              'info-modal-module.line-of-credit-page.details.content2',
              'info-modal-module.line-of-credit-page.details.content3',
              'info-modal-module.line-of-credit-page.details.content4',
              'info-modal-module.line-of-credit-page.details.content5'
            ]
          }
        ]
      };
      await this.modalService.openInfoModalComponent({ componentProps });
    }
  }

  /**
   * @description To show or hide the Advanced search component
   * @memberof LineOfCreditPage
   */
  toggleSearchAccordion() {
    this.searchAccordion = !this.searchAccordion;
  }

  /**
   * @description Hide the Advanced search component and call to facade to get the search result on submit the search
   *
   * @param {ITransactionQueries} transactionQueries
   * @memberof LineOfCreditPage
   */
  submitSearch(transactionQueries: ITransactionQueries) {
    this.toggleSearchAccordion();
    this.lineOfCreditFacade.setSearchedTransactionsSummary(transactionQueries);
  }
}

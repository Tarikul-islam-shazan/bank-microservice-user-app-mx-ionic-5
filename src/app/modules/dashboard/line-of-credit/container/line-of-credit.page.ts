import { Component } from '@angular/core';
import { LineOfCreditFacade, LOC_FACADE_SERVICE } from '../facade';
import { ITransactionQueries } from '@app/core/models/dto/account';

@Component({
  selector: 'app-loc-transactions',
  templateUrl: './line-of-credit.page.html',
  styleUrls: ['./line-of-credit.page.scss'],
  providers: [...LOC_FACADE_SERVICE]
})
export class LineOfCreditPage {
  public searchAccordion = false;
  constructor(public lineOfCreditFacade: LineOfCreditFacade) {}

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

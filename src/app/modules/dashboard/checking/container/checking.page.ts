import { ITransactionQueries } from '@app/core/models/dto/account';
import { Component } from '@angular/core';
import { CheckingFacade } from '../facade/checking-facade';
import { CHECKING_FACADE_SERVICE } from '../facade';

@Component({
  selector: 'app-checking-transactions',
  templateUrl: './checking.page.html',
  styleUrls: ['./checking.page.scss'],
  providers: [...CHECKING_FACADE_SERVICE]
})
export class CheckingPage {
  public searchAccordion = false;
  constructor(public checkingFacade: CheckingFacade) {}

  /**
   * @description To show or hide the Advanced search component
   * @memberof CheckingPage
   */
  toggleSearchAccordion() {
    this.searchAccordion = !this.searchAccordion;
  }

  /**
   * @description Hide the Advanced search component and call to facade to get the search result on submit the search
   *
   * @param {ITransactionQueries} transactionQueries
   * @memberof CheckingPage
   */
  submitSearch(transactionQueries: ITransactionQueries) {
    this.toggleSearchAccordion();
    this.checkingFacade.getSearchedTransactions(transactionQueries);
  }
}

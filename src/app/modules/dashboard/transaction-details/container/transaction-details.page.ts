import { Component, OnDestroy, HostListener } from '@angular/core';
import { TransactionDetailsFacade } from '../facade/transaction-details-facade';

@Component({
  selector: 'transaction-details',
  templateUrl: './transaction-details.page.html',
  styleUrls: ['./transaction-details.page.scss']
})
export class TransactionDetailsPage implements OnDestroy {
  constructor(public transactionDetailsFacade: TransactionDetailsFacade) {}

  @HostListener('window:beforeunload')
  ngOnDestroy() {
    this.transactionDetailsFacade.unsetTransaction();
  }
}

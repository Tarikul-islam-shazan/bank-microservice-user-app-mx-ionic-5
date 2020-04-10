import { Component, OnInit } from '@angular/core';
import { TransactionDetailsFacade } from '../facade/transaction-details-facade';

@Component({
  selector: 'mbc-transaction-details',
  templateUrl: './transaction-details.page.html',
  styleUrls: ['./transaction-details.page.scss']
})
export class TransactionDetailsPage implements OnInit {
  constructor(public transactionDetailsFacade: TransactionDetailsFacade) {}

  ngOnInit() {}
}

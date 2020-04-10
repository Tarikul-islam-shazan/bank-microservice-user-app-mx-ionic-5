import { Component, Input, OnInit } from '@angular/core';
import { TransactionSummary } from '@app/dashboard/models';

@Component({
  selector: 'transaction-summary',
  templateUrl: './transaction-summary.component.html',
  styleUrls: ['./transaction-summary.component.scss']
})
export class TransactionSummaryComponent implements OnInit {
  isHide = false;
  @Input() summary: TransactionSummary[] = [];
  @Input() summaryOption? = 1;
  constructor() {}

  ngOnInit() {}

  showHideAccountSummary() {
    this.isHide = !this.isHide;
  }
}

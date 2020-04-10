import { Component, OnInit, Input } from '@angular/core';
import { ITransaction } from '@app/core/models/dto/account';

@Component({
  selector: 'mbc-transaction-details-content',
  templateUrl: './transaction-details-content.component.html',
  styleUrls: ['./transaction-details-content.component.scss']
})
export class TransactionDetailsContentComponent implements OnInit {
  @Input() transaction: ITransaction;
  constructor() {}

  ngOnInit() {}
}

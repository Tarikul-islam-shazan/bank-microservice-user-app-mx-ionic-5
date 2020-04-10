import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ITransaction } from '@app/core';

@Component({
  selector: 'transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss']
})
export class TransactionCardComponent implements OnInit {
  @Input() transactions: ITransaction[];
  @Input() notFound: string;
  @Output() selectedTransaction? = new EventEmitter<ITransaction>();

  constructor() {}

  ngOnInit() {}

  selectTransaction(transaction: ITransaction) {
    this.selectedTransaction.emit(transaction);
  }
}

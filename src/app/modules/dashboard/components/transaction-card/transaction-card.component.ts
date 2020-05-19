import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITransaction } from '@app/core';

@Component({
  selector: 'transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss']
})
export class TransactionCardComponent {
  @Input() transactions: ITransaction[];
  @Input() notFound: string;
  @Output() selectedTransaction = new EventEmitter<ITransaction>();

  selectTransaction(transaction: ITransaction) {
    this.selectedTransaction.emit(transaction);
  }
}

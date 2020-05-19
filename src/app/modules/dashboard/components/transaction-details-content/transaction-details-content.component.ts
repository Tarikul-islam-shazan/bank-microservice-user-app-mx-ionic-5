import { Component, Input } from '@angular/core';
import { ITransaction } from '@app/core/models/dto/account';

@Component({
  selector: 'transaction-details-content',
  templateUrl: './transaction-details-content.component.html',
  styleUrls: ['./transaction-details-content.component.scss']
})
export class TransactionDetailsContentComponent {
  @Input() transaction: ITransaction;
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAccount } from '@app/core';

@Component({
  selector: 'account-transaction-header',
  templateUrl: './account-transaction-header.component.html',
  styleUrls: ['./account-transaction-header.component.scss']
})
export class AccountTransactionHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() accountInfo: IAccount;
  @Input() iconName? = '';
  @Input() iconColor? = '#FFFFFF';
  @Output() showModal? = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  showInfoModal(accountType) {
    this.showModal.emit(accountType);
  }
}

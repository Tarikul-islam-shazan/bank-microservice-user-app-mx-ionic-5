import { Component, Input } from '@angular/core';

@Component({
  selector: 'account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.scss']
})
export class AccountBalanceComponent {
  @Input() title: string;
  @Input() amount: number;
  @Input() balanceColor? = '#070A18';
}

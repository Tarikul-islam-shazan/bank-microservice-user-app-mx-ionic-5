import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.scss']
})
export class AccountBalanceComponent implements OnInit {
  @Input() title;
  @Input() amount;
  @Input() balanceColor? = '#070A18';
  constructor() {}

  ngOnInit() {}
}

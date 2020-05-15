import { Component, OnInit } from '@angular/core';
import { AccountFunding } from '../facade';

@Component({
  selector: 'account-funding',
  templateUrl: './account-funding.page.html',
  styleUrls: ['./account-funding.page.scss']
})
export class AccountFundingPage implements OnInit {
  constructor(public facade: AccountFunding) {}

  ngOnInit() {}
}

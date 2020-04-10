/**
 * Component: <accounts-card> </accounts-card>
 * Details: Account info summery showing;
 * Date: April 8th, 2020
 * Developer: Md. Kausar <md.kausar@brainstation23.com>
 * Included Ticket:GMA-4848 with Refractoring some code.
 */
import { Component, Input, OnInit } from '@angular/core';
import { AccountType, IAccount } from '@app/core/models/dto/account';
export interface IAccountInfo {
  accountType: AccountType;
  imageClass: string;
  title: string;
}
@Component({
  selector: 'accounts-card',
  templateUrl: './accounts-card.component.html',
  styleUrls: ['./accounts-card.component.scss']
})
export class AccountsCardComponent implements OnInit {
  @Input() accountData: IAccount;
  accountInfo: IAccountInfo;
  accountInfoList: IAccountInfo[] = [
    {
      accountType: AccountType.DDA,
      imageClass: 'img-checking',
      title: 'dashboard-module.account-card-component.checking-text'
    },
    {
      accountType: AccountType.LOC,
      imageClass: 'img-loc',
      title: 'dashboard-module.account-card-component.loc-text'
    },
    {
      accountType: AccountType.SSA,
      imageClass: 'img-savings',
      title: 'dashboard-module.account-card-component.savings-text'
    }
  ];
  ngOnInit() {
    // Finding the current account info
    this.accountInfo = this.accountInfoList.find(
      (accountInfo: IAccountInfo) => accountInfo.accountType === this.accountData.accountType
    );
  }
}

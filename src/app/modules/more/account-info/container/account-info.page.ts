import { Component } from '@angular/core';
import { AccountInfoFacade } from '../facade';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.page.html',
  styleUrls: ['./account-info.page.scss']
})
export class AccountInfoPage {
  constructor(public accountInfoFacade: AccountInfoFacade) {}
}

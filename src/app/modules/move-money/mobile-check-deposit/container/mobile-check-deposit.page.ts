/**
 * Container: Mobile Check Deposit Page
 * Details: Checks image preview did not showing problem is fixed and resetting form when user enter again.
 * Date:February 12,2020
 * Developer: Md.Kausar <md.kausar@brainstation23.com>
 */
import { Component } from '@angular/core';
import { MobileCheckDepositFacade } from '@app/move-money/mobile-check-deposit/facade';
@Component({
  selector: 'app-mobile-check-deposit',
  templateUrl: './mobile-check-deposit.page.html',
  styleUrls: ['./mobile-check-deposit.page.scss']
})
export class MobileCheckDepositPage {
  constructor(public mobileCheckDepositFacade: MobileCheckDepositFacade) {}

  ionViewDidEnter() {
    this.mobileCheckDepositFacade.resetMobileCheckDepositForm();
  }
}

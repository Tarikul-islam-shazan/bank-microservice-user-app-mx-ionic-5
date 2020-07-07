import { Component, OnInit } from '@angular/core';
import { HomeFacade } from '../facade/home-facade';
import { IAccount } from '@app/core/models/dto/account';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  constructor(public homeFacade: HomeFacade) {}

  ngOnInit() {
    this.homeFacade.initialize();
  }

  goToDetailsPage(account: IAccount) {
    this.homeFacade.pageTransaction(account);
  }
  /**
   * Issue: GMA-4452:  [ionic 4] Dashboard> Tapping available balance and surrounding area does not open info modal
   * Date: February 19, 2020
   * Developer: M G Muntaqeem <muntaqeem@bs-23.net>
   *
   * Problem:  Tapping available balance and surrounding area does not open info modal
   * Reason: This was not implemented
   * Solution:  Added click event on the amount div. Called openInfoModal method.
   */
  async openInfoModal() {
    await this.homeFacade.openInfoModal();
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '@app/shared';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { DirectDepositInfoComponent } from '../components/direct-deposit-info';
@Injectable()
export class DirectDepositSetupFacade {
  constructor(
    private router: Router,
    private modalService: ModalService,
    private readonly analyticsService: AnalyticsService
  ) {}
  /**
   * Fix: GMA-4663
   *  Direct Deposit Modal implemented for question mark.
   */
  openInfoModal() {
    this.modalService.openModal(DirectDepositInfoComponent);
  }

  /**
   * Issue: GMA-4820
   * Details:  Signup > Direct Deposit: If the user taps on the "Set up Direct Deposit"
   * button instead of modal Direct deposit screen should show.
   * Date: April 06, 2020
   * Developer: Raihan <raihanuzzaman@bs-23.net>
   */

  setupDirectDeposit() {
    this.analyticsService.logEvent(AnalyticsEventTypes.DirectDepositSelected);
    this.router.navigate(['/signup/deposit/direct-deposit']);
  }

  exploreApp() {
    this.router.navigate(['/login-user']);
  }
}

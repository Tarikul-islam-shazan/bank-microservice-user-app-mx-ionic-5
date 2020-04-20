import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsEventTypes, AnalyticsService } from '@app/analytics';
import { RouteListenerService } from '@app/core/services/route-listener.service';

@Injectable()
export class DirectDepositFacade {
  constructor(
    private router: Router,
    private analytics: AnalyticsService,
    private routerListener: RouteListenerService
  ) {}

  /**
   * DetailS: This function route to respective page depends on routerlisten
   * Problem: Direct Deposit: Showing data used on the signup "Direct Deposit" screen even after login.
   * Ticket: GMA-4882
   * Utpaul sarkar<Utpal.Sarker@brainstation23.com>
   * @memberof DirectDepositFacade
   */
  continue() {
    this.analytics.logEvent(AnalyticsEventTypes.DirectDepositViewed);
    if (this.routerListener.getPreviousUrl() === '/dashboard/move-money') {
      this.router.navigate(['/move-money/deposit/direct-deposit']);
    } else {
      this.router.navigate(['/signup/deposit/direct-deposit']);
    }
  }
}

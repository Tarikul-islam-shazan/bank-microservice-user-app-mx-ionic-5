import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { LogInSuccessFacade } from '../facade';

/**
 * *Issue: GMA-4425
 * *Issue Details: Login Success Screen> Nick Name should be shown at the place holder position.
 * Developer: Zahidul Islam<zahidul@bs-23.net>
 *
 * @export
 * @class LogInSuccessPage
 */
@Component({
  selector: 'app-log-in-success',
  templateUrl: './log-in-success.page.html',
  styleUrls: ['./log-in-success.page.scss']
})
export class LogInSuccessPage {
  constructor(public facade: LogInSuccessFacade) {}

  continue() {
    this.facade.continue();
  }
}

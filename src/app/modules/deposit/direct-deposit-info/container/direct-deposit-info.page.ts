import { Component, OnInit } from '@angular/core';
import { PAGES } from '@app/core';
import { Router } from '@angular/router';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
@Component({
  selector: 'app-direct-deposit-info',
  templateUrl: './direct-deposit-info.page.html',
  styleUrls: ['./direct-deposit-info.page.scss']
})
export class DirectDepositInfoPage implements OnInit {
  constructor(private router: Router, private analytics: AnalyticsService) {}

  ngOnInit() {}

  continue() {
    this.analytics.logEvent(AnalyticsEventTypes.DirectDepositViewed);
    this.router.navigate(['/signup/deposit/direct-deposit']);
  }
}

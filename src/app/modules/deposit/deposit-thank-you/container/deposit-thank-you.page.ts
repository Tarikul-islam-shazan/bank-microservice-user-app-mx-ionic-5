import { Component, OnInit } from '@angular/core';
import { DepositThankYouFacade } from '../facade';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { ModalService } from '@app/shared';
import { IPayStandTransactionInfo } from '@app/deposit/paystand/models';
@Component({
  selector: 'app-deposit-thank-you',
  templateUrl: './deposit-thank-you.page.html',
  styleUrls: ['./deposit-thank-you.page.scss']
})
export class DepositThankYouPage implements OnInit {
  transactionInfo: IPayStandTransactionInfo;
  constructor(
    private facade: DepositThankYouFacade,
    private analytics: AnalyticsService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.getTransactionInfo();
  }

  getTransactionInfo() {
    this.transactionInfo = this.facade.getPayStandTransactionInfo();
  }

  done() {
    this.analytics.logEvent(AnalyticsEventTypes.FundingCompleted);
    this.modalService.close();
  }
}

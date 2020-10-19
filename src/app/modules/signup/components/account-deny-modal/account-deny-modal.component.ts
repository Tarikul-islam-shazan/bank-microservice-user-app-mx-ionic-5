import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
@Component({
  selector: 'mbc-account-deny-modal',
  templateUrl: './account-deny-modal.component.html',
  styleUrls: ['./account-deny-modal.component.scss']
})
export class AccountDenyModalComponent {
  constructor(private modalCtrl: ModalController, private readonly analyticsService: AnalyticsService) {}

  async dismiss() {
    return await this.modalCtrl.dismiss();
  }

  next() {
    this.analyticsService.logEvent(AnalyticsEventTypes.ApplicationStatusDetermined, { status: 'denied' });
    this.dismiss();
  }
}

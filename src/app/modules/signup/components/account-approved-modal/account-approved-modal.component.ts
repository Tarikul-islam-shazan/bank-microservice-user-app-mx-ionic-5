import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
@Component({
  selector: 'mbc-account-approved-modal',
  templateUrl: './account-approved-modal.component.html',
  styleUrls: ['./account-approved-modal.component.scss']
})
export class AccountApprovedModalComponent {
  constructor(private modalCtrl: ModalController, private analytics: AnalyticsService) {}

  async dismiss() {
    return await this.modalCtrl.dismiss();
  }

  next() {
    this.analytics.logEvent(AnalyticsEventTypes.ApplicationStatusDetermined, { status: 'approved' });
    this.dismiss();
  }
}

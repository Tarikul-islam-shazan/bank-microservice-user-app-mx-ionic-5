import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmDetailsFacade } from '@app/move-money/internal-transfer/confirm-details/facade/';

@Component({
  selector: 'mbc-confirm-details',
  templateUrl: './confirm-details.page.html',
  styleUrls: ['./confirm-details.page.scss']
})
export class ConfirmDetailsPage {
  constructor(private router: Router, public facade: ConfirmDetailsFacade) {}
  ionViewWillEnter() {
    this.facade.initialize();
  }
  backToEdit() {
    this.router.navigate(['move-money/internal-transfer']);
  }
  backToEditScheduledModify() {
    this.facade.backToEditScheduledModify();
  }
  moveMoney() {
    this.facade.submitInternalTransfer();
  }
  updateScheduledTransfer() {
    this.facade.updateScheduledTransfer();
  }
  cancelTransection() {
    this.router.navigate(['dashboard/move-money']);
  }
}

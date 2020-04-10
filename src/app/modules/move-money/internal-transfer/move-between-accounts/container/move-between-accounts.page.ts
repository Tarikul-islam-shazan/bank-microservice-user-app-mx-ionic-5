/**
 * Container: Internal transfer move between account
 * Details: Internal transfer move between account landing page
 * Date: March 7, 2020
 * Developer: Sanitul <sanitul@bs-23.com>
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { InternalTransferFacade } from '@app/move-money/internal-transfer/move-between-accounts/facade';
@Component({
  selector: 'app-move-between-accounts',
  templateUrl: './move-between-accounts.page.html',
  styleUrls: ['./move-between-accounts.page.scss']
})
export class MoveBetweenAccountsPage implements OnInit, OnDestroy {
  constructor(public facade: InternalTransferFacade) {}

  // Initialize the transfer service
  ngOnInit() {
    this.facade.initialize();
  }
  // Open schedule modal for data and frequency update
  openScheduleModal(): void {
    this.facade.openScheduleModal();
  }
  // goto confirm page
  goToConfirm(): void {
    this.facade.goToConfirm();
  }

  // goto cancel page
  goToCancel(): void {
    this.facade.goToCancel();
  }

  // Reset transfer object when page/ componet destroy
  ngOnDestroy() {
    this.facade.resetTransferService();
  }
}

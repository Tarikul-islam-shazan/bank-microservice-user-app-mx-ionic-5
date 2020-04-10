import { Component } from '@angular/core';
import { ScheduledTransferFacade } from '@app/move-money/internal-transfer/scheduled-transfers/facade';
@Component({
  selector: 'mbc-scheduled-transfers',
  templateUrl: './scheduled-transfers.page.html',
  styleUrls: ['./scheduled-transfers.page.scss']
})
export class ScheduledTransfersPage {
  constructor(public scheduledTransferFacade: ScheduledTransferFacade) {
    this.scheduledTransferFacade.fetchScheduledTransfers();
  }
}

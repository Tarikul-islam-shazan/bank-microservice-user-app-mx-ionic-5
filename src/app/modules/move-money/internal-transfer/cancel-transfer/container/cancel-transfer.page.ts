import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CancelTransferFacade } from '../facade';

@Component({
  selector: 'mbc-cancel-transfer',
  templateUrl: './cancel-transfer.page.html',
  styleUrls: ['./cancel-transfer.page.scss']
})
export class CancelTransferPage {
  constructor(private router: Router, public facade: CancelTransferFacade) {}
  ionViewWillEnter() {
    this.facade.initialize();
  }
  backToEdit() {
    this.router.navigate(['move-money/internal-transfer']);
  }
  cancelInternalTransfer() {
    this.facade.deleteInternalTransfer();
  }
  translation(data: string): string {
    return this.facade.translation(data);
  }
}

import { Component } from '@angular/core';
import { ModalService } from '@app/shared/services/modal.service';

@Component({
  selector: 'mbc-direct-deposit-info-modal',
  templateUrl: './direct-deposit-info-modal.component.html',
  styleUrls: ['./direct-deposit-info-modal.component.scss']
})
export class DirectDepositInfoModalComponent {
  constructor(private modalService: ModalService) {}

  dismiss() {
    this.modalService.close();
  }
  continue() {
    this.dismiss();
  }
}

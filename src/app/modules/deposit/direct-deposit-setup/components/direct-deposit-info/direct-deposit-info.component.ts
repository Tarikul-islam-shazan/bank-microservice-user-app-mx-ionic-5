import { Component } from '@angular/core';
import { ModalService } from '@app/shared';

@Component({
  selector: 'mbc-direct-deposit-info',
  templateUrl: './direct-deposit-info.component.html',
  styleUrls: ['./direct-deposit-info.component.scss']
})
export class DirectDepositInfoComponent {
  constructor(private modalService: ModalService) {}

  dismiss() {
    this.modalService.close();
  }
  continue() {
    this.dismiss();
  }
}

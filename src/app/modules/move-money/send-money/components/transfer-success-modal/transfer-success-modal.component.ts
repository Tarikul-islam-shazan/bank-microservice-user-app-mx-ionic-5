import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IP2PTransfer } from '@app/move-money/send-money/models';

@Component({
  selector: 'mbc-transfer-success-modal',
  templateUrl: './transfer-success-modal.component.html',
  styleUrls: ['./transfer-success-modal.component.scss']
})
export class TransferSuccessModalComponent {
  @Input() data: IP2PTransfer;
  constructor(private modalCtrl: ModalController) {}
  async dismiss(option?: any): Promise<any> {
    return await this.modalCtrl.dismiss(option);
  }
}

import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ITransfer } from '@app/move-money/internal-transfer/models';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'mbc-cancel-transfer-success-modal',
  templateUrl: './cancel-transfer-success-modal.component.html',
  styleUrls: ['./cancel-transfer-success-modal.component.scss']
})
export class CancelTransferSuccessModalComponent {
  @Input() data: ITransfer;

  constructor(private modalCtrl: ModalController, private translate: TranslateService) {}

  async dismiss(option?: any): Promise<any> {
    return await this.modalCtrl.dismiss(option);
  }

  // We get data in modal as data input, so need to rename with appropriate object name
  get transferModalData(): ITransfer {
    return this.data;
  }
}

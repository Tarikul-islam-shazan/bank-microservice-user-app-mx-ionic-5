import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IFundRequest } from '@app/move-money/request-money/models';

@Component({
  selector: 'mbc-transfer-success-modal',
  templateUrl: './transfer-success-modal.component.html',
  styleUrls: ['./transfer-success-modal.component.scss']
})
export class TransferSuccessModalComponent {
  @Input() data: IFundRequest[];
  constructor(private modalCtrl: ModalController) {}
  get fundRequestFirstElement(): IFundRequest {
    const [first] = this.data;
    return first;
  }
  get amount(): number {
    return this.fundRequestFirstElement.amount;
  }

  get createdAt(): string {
    return this.fundRequestFirstElement.createdAt;
  }

  get totalRequestCount(): number {
    return this.data.length;
  }
  async dismiss(option?: any): Promise<any> {
    return await this.modalCtrl.dismiss(option);
  }
}
